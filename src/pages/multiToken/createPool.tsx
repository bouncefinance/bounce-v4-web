import { Box, Button, OutlinedInput, Stack } from '@mui/material'

import FormItem from 'bounceComponents/common/FormItem'
import { ChainId } from 'constants/chain'

import { RANDOM_SELECTION_MULTI_TOKEN_CONTRACT_ADDRESSES } from 'constants/index'
import { Currency, CurrencyAmount } from 'constants/token'

import { Formik } from 'formik'
import { useActiveWeb3React } from 'hooks'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { useRandomSelectionMultiTokenContract } from 'hooks/useContract'
import { useTransactionModalWrapper } from 'hooks/useTransactionModalWrapper'
import { useCallback, useMemo, useState } from 'react'
import { useCurrencyBalance, useToken, useTokens } from 'state/wallet/hooks'
import _ from 'lodash'
interface IParam {
  token0: string
  amountTotal0: string
  quoteAmountTotal1: string
  openAt: number
  closeAt: number
  releaseAt: number
  releaseDuration: number
  token1s: string[]
  amount1s: string[]
}

const initParams: IParam = {
  token0: '0x5c58eC0b4A18aFB85f9D6B02FE3e6454f988436E',
  amountTotal0: '10',
  quoteAmountTotal1: '1000',
  openAt: 0,
  closeAt: 0,
  releaseAt: 0,
  releaseDuration: 1,
  token1s: [
    '0xc390E699b38F14dB884C635bbf843f7B135113ad',
    '0x21C3ac8c6E5079936A59fF01639c37F36CE5ed9E',
    '0xB5D1924aD11D90ED1caaCE7C8792E8B5F6171C7E',
    '0xe5260f95BCDe8E2727eaE13f6B17039E910c43F7',
    '0xb575400Da99E13e2d1a2B21115290Ae669e361f0'
  ],
  amount1s: ['500', '200', '1000', '10000', '50']
}

const useCreatePool = () => {
  const { chainId } = useActiveWeb3React()
  const contractAddress = RANDOM_SELECTION_MULTI_TOKEN_CONTRACT_ADDRESSES[chainId || 5]
  const contract = useRandomSelectionMultiTokenContract(contractAddress, chainId || 5)

  return useCallback(
    async (body: IParam) => {
      console.log('contract', contract)

      if (!contract) {
        return
      }

      console.log('body', body)
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
  const { chainId } = useActiveWeb3React()
  const token0 = useToken(body.token0, chainId)
  const token0Amount = useMemo(() => {
    if (!token0) return undefined
    return CurrencyAmount.fromAmount(token0, body.amountTotal0)
  }, [token0, body.amountTotal0])
  const quoteAmountTotal1 = CurrencyAmount.fromAmount(Currency.getNativeCurrency(), body.quoteAmountTotal1)
  const token1Arr = useTokens(body.token1s as string[], chainId || ChainId.SEPOLIA)
  console.log('token0Amount', token0Amount?.raw.toString())

  const token1CurrencyAmount = useMemo(() => {
    if (!token1Arr || token1Arr.includes(undefined)) return undefined
    return token1Arr?.map((i, d) => CurrencyAmount.fromAmount(i as Currency, body.amount1s[d])?.raw.toString())
  }, [body.amount1s, token1Arr])

  return useCallback(() => {
    if (!token1CurrencyAmount || token1CurrencyAmount.some(i => !i) || !token0Amount || !quoteAmountTotal1) return
    const params: IParam = {
      ...body,
      amount1s: token1CurrencyAmount as string[],
      amountTotal0: token0Amount.raw.toString(),
      quoteAmountTotal1: quoteAmountTotal1.raw.toString()
    }

    create(params)
  }, [body, create, quoteAmountTotal1, token0Amount, token1CurrencyAmount])
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
  const [approvalState, , approveCallback] = useApproveCallback(token0Amount, contractAddress)

  const approveFn = useTransactionModalWrapper(approveCallback, { isApprove: true })
  const token1Arr = useTokens(values.token1s as string[], chainId || ChainId.SEPOLIA)
  const changeValue = (values: IParam) => {
    setValues(values)
  }
  const onSubmit = () => {
    create()
  }
  const btnsCallback = (newValues: IParam) => {
    if (!_.eq(values, newValues)) {
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
      <Button type="submit" sx={{ flex: 1 }} disabled={!token1Arr}>
        Submit
      </Button>
    )
  }
  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', mt: 50 }}>
      <Formik onSubmit={onSubmit} initialValues={initParams}>
        {({ handleSubmit, values: _values, setFieldValue }) => {
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
              <FormItem
                name={'token1s'}
                label="token1s"
                onChange={e => {
                  const _e = e.target as any as HTMLInputElement
                  const v = _e.value.split(',')
                  setFieldValue('token1s', v)
                }}
              >
                <OutlinedInput placeholder={''} />
              </FormItem>
              <FormItem
                name={'amount1s'}
                label="amount1s"
                onChange={e => {
                  const _e = e.target as any as HTMLInputElement
                  const v = _e.value.split(',')
                  setFieldValue('amount1s', v)
                }}
              >
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
