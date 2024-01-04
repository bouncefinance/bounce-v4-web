import { Box, Button, OutlinedInput, Stack } from '@mui/material'

import FormItem from 'bounceComponents/common/FormItem'

import { RANDOM_SELECTION_MULTI_TOKEN_CONTRACT_ADDRESSES } from 'constants/index'
import { Currency, CurrencyAmount } from 'constants/token'

import { Formik } from 'formik'
import { useActiveWeb3React } from 'hooks'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { useRandomSelectionMultiTokenContract } from 'hooks/useContract'
import { useTransactionModalWrapper } from 'hooks/useTransactionModalWrapper'
import { useCallback, useMemo, useState } from 'react'
import { useCurrencyBalance, useToken } from 'state/wallet/hooks'

interface IParam {
  token0: string
  amountTotal0: string
  quoteAmountTotal1: number
  openAt: number
  closeAt: number
  releaseAt: number
  releaseDuration: number
  token1s: string[]
  amount1s: number[]
}

const initParams: IParam = {
  token0: '0x5c58eC0b4A18aFB85f9D6B02FE3e6454f988436E',
  amountTotal0: '10',
  quoteAmountTotal1: 1000,
  openAt: 0,
  closeAt: 0,
  releaseAt: 0,
  releaseDuration: 1,
  token1s: [
    '0xc390E699b38F14dB884C635bbf843f7B135113ad',
    '0x5c58eC0b4A18aFB85f9D6B02FE3e6454f988436E',
    '0xB5D1924aD11D90ED1caaCE7C8792E8B5F6171C7E',
    '0xe5260f95BCDe8E2727eaE13f6B17039E910c43F7',
    '0xb575400Da99E13e2d1a2B21115290Ae669e361f0'
  ],
  amount1s: [500, 200, 1000, 10000, 50]
}

const useCreatePool = () => {
  const { chainId } = useActiveWeb3React()
  const contractAddress = RANDOM_SELECTION_MULTI_TOKEN_CONTRACT_ADDRESSES[chainId || 5]
  const contract = useRandomSelectionMultiTokenContract(contractAddress, chainId || 5)

  return useCallback(
    async ({ body }: { body: IParam }) => {
      if (!contract) {
        return
      }
      console.log('body', Object.values(body))
      try {
        await contract.create(Object.values(body))
        // localStorage.setItem('NFT_RANDOM_POOL_ID', JSON.stringify(id))
      } catch (error) {
        console.error(error)
      }
    },
    [contract]
  )
}
const useToCreate = (body: IParam) => {
  const create = useCreatePool()

  return useCallback(() => {
    create({ body: body })
  }, [body, create])
}

const CreateNFTLotteryPool = () => {
  const [values, setValues] = useState(initParams)
  const create = useToCreate(values)
  const { chainId, account } = useActiveWeb3React()
  const token0 = useToken(values.token0, chainId)

  const token0Balance = useCurrencyBalance(account, token0 as Currency | undefined)

  const token0Amount = useMemo(() => {
    if (!token0) return undefined
    return CurrencyAmount.fromAmount(token0, values.amountTotal0)
  }, [token0, values.amountTotal0])
  const isInsufficientBalance = useMemo(() => {
    if (!token0Balance || !token0Amount) return false
    return token0Amount.greaterThan(token0Balance)
  }, [token0Amount, token0Balance])
  const contractAddress = RANDOM_SELECTION_MULTI_TOKEN_CONTRACT_ADDRESSES[chainId || 5]
  const [approvalState, approveCallback] = useApproveCallback(token0Amount, contractAddress)

  const approveFn = useTransactionModalWrapper(approveCallback as (...arg: any) => Promise<any>)
  const changeValue = (values: IParam) => {
    setValues(values)
  }
  const onSubmit = () => {
    create()
  }
  const btnsCallback = (newValues: IParam) => {
    if (values !== newValues) {
      return (
        <Button sx={{ flex: 1 }} onClick={() => changeValue(newValues)}>
          Save
        </Button>
      )
    }
    if (isInsufficientBalance) {
      return (
        <Button sx={{ flex: 1 }} disabled>
          insufficient balance
        </Button>
      )
    }
    if (approvalState !== ApprovalState.APPROVED) {
      return (
        <Button sx={{ flex: 1 }} onClick={() => approveFn()}>
          Approval
        </Button>
      )
    }
    return (
      <Button type="submit" sx={{ flex: 1 }}>
        Submit
      </Button>
    )
  }
  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', mt: 50 }}>
      <Formik onSubmit={onSubmit} initialValues={initParams}>
        {({ handleSubmit, values: _values }) => {
          return (
            <Box component={'form'} onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <FormItem name={'token0'} label="token0 address">
                <OutlinedInput placeholder={''} />
              </FormItem>
              {/* <FormItem name={'token0'} label="token0 address">
                <OutlinedInput placeholder={''} />
              </FormItem> */}
              <FormItem name={'amountTotal0'} label="total amount0 ">
                <OutlinedInput placeholder={''} />
              </FormItem>
              <FormItem name={'quoteAmountTotal1'} label="quoteAmountTotal1">
                <OutlinedInput placeholder={''} />
              </FormItem>
              <FormItem name={'openAt'} label="openAt">
                <OutlinedInput placeholder={''} type="number" />
              </FormItem>
              <FormItem name={'closeAt'} label="closeAt">
                <OutlinedInput placeholder={''} type="number" />
              </FormItem>
              <FormItem name={'releaseAt'} label="releaseAt">
                <OutlinedInput placeholder={''} type="number" />
              </FormItem>
              <FormItem name={'releaseDuration'} label="releaseDuration">
                <OutlinedInput placeholder={''} type="number" />
              </FormItem>
              <FormItem name={'token1s'} label="token1s">
                <OutlinedInput placeholder={''} />
              </FormItem>
              <FormItem name={'amount1s'} label="amount1s">
                <OutlinedInput placeholder={''} />
              </FormItem>
              <Stack flexDirection={'row'} gap={20}>
                {btnsCallback(_values)}
              </Stack>
            </Box>
          )
        }}
      </Formik>
    </Box>
  )
}

export default CreateNFTLotteryPool
