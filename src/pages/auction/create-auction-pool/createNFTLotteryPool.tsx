import { Box, Button, OutlinedInput, Stack } from '@mui/material'
import { getPoolCreationSignature, getWhitelistMerkleTreeRoot } from 'api/pool'
import { GetWhitelistMerkleTreeRootParams, PoolType } from 'api/pool/type'
import FormItem from 'bounceComponents/common/FormItem'
import { IReleaseType } from 'bounceComponents/create-auction-pool/types'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
import { NULL_BYTES, RANDOM_SELECTION_NFT_CONTRACT_ADDRESSES } from 'constants/index'
import { CurrencyAmount } from 'constants/token'
import { Formik } from 'formik'
import { useActiveWeb3React } from 'hooks'
import { useRandomSelectionNFTContract } from 'hooks/useContract'
import { useCallback, useMemo, useState } from 'react'
import { useToken } from 'state/wallet/hooks'

interface IParam {
  name: string
  token0: string
  token1: string
  amountTotal0: string
  amount1PerWallet: string
  openAt: number
  closeAt: number
  claimAt: number
  maxPlayer: number
  nShare: number
  mintContract: string
  whitelistRoot: string
}

const initParams: IParam = {
  name: 'test',
  token0: '0x5c58eC0b4A18aFB85f9D6B02FE3e6454f988436E',
  token1: '0xc390E699b38F14dB884C635bbf843f7B135113ad',
  amountTotal0: '10',
  amount1PerWallet: '20',
  openAt: 1703735918,
  closeAt: 1703735978,
  claimAt: 1703735978,
  maxPlayer: 15,
  nShare: 10,
  mintContract: '0x4EE6f702aa8d95b23DCb845dBd4eaA73b88791E8',
  whitelistRoot: ''
}

const useCreatePool = () => {
  const { chainId } = useActiveWeb3React()
  const contractAddress = RANDOM_SELECTION_NFT_CONTRACT_ADDRESSES[chainId || 5]
  const contract = useRandomSelectionNFTContract(contractAddress, chainId || 5)
  const chainConfigInBackend = useChainConfigInBackend('ethChainId', chainId || 5)

  return useCallback(
    async ({ body, creator, optId }: { body: IParam; creator: string; optId: number }) => {
      if (!contract || !chainConfigInBackend) {
        return
      }

      let merkleroot = ''

      if (body.whitelistRoot && body.whitelistRoot.split(',').length > 0) {
        const whitelistParams: GetWhitelistMerkleTreeRootParams = {
          addresses: body.whitelistRoot.split(','),
          category: PoolType.LOTTERY_NFT,
          chainId: chainConfigInBackend.id
        }
        const { data } = await getWhitelistMerkleTreeRoot(whitelistParams)
        merkleroot = data.merkleroot
      }
      merkleroot = merkleroot || NULL_BYTES

      const signatureParams = {
        amountMin1: body.amount1PerWallet,
        amountTotal0: body.amountTotal0,
        category: PoolType.LOTTERY_NFT,
        chainId: optId,
        claimAt: body.claimAt,
        closeAt: body.closeAt,
        creator: creator,
        maxAmount1PerWallet: body.amount1PerWallet,
        merkleroot: '',
        maxPlayer: body.maxPlayer,
        name: body.name,
        openAt: body.openAt,
        token0: body.token0,
        token1: body.token1,
        totalShare: body.nShare,
        releaseType: IReleaseType.Cliff,
        releaseData: [
          {
            startAt: body.openAt,
            endAtOrRatio: 0
          }
        ]
      }

      const {
        data: { id, expiredTime, signature }
      } = await getPoolCreationSignature(signatureParams)
      const _body = { ...body, whitelistRoot: merkleroot }
      const arg = [id, _body, false, expiredTime, signature]
      try {
        console.log('pool id', id, arg)
        await contract.createV2(...arg)
        alert(id)
      } catch (error) {
        console.error(error)
      }
    },
    [chainConfigInBackend, contract]
  )
}
const useToCreate = (body: IParam, creator: string) => {
  const create = useCreatePool()
  const { chainId } = useActiveWeb3React()
  const chainConfigInBackend = useChainConfigInBackend('ethChainId', chainId || '')
  const token0 = useToken(body.token0, chainId)
  const token1 = useToken(body.token1, chainId)
  const [token0CurrencyAmount, token1CurrencyAmount] = useMemo(() => {
    if (!token0 || !token1 || !body.amountTotal0 || !body.amount1PerWallet) {
      return []
    }
    return [
      CurrencyAmount.fromAmount(token0, body.amountTotal0),
      CurrencyAmount.fromAmount(token1, body.amount1PerWallet)
    ]
  }, [body.amount1PerWallet, body.amountTotal0, token0, token1])

  return useCallback(() => {
    if (!token0CurrencyAmount || !token1CurrencyAmount || !chainConfigInBackend) return
    const _body = {
      ...body,
      amountTotal0: token0CurrencyAmount.raw.toString(),
      amount1PerWallet: token1CurrencyAmount.raw.toString()
    } as IParam
    create({ body: _body, creator, optId: chainConfigInBackend.id })
  }, [body, chainConfigInBackend, create, creator, token0CurrencyAmount, token1CurrencyAmount])
}

const CreateNFTLotteryPool = () => {
  const { account } = useActiveWeb3React()
  const [values, setValues] = useState(initParams)
  const create = useToCreate(values, account || '')
  const changeValue = (values: IParam) => {
    setValues(values)
  }
  const onSubmit = () => {
    create()
  }

  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', mt: 50 }}>
      <Formik onSubmit={onSubmit} initialValues={initParams}>
        {({ handleSubmit, values: _values }) => {
          return (
            <Box component={'form'} onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <FormItem name={'name'} label="pool name">
                <OutlinedInput placeholder={''} />
              </FormItem>
              <FormItem name={'token0'} label="token0 address">
                <OutlinedInput placeholder={''} />
              </FormItem>
              <FormItem name={'token1'} label="token1 address">
                <OutlinedInput placeholder={''} />
              </FormItem>
              <FormItem name={'amountTotal0'} label="nft number">
                <OutlinedInput placeholder={''} />
              </FormItem>
              <FormItem name={'amount1PerWallet'} label="token1 perWallet number">
                <OutlinedInput placeholder={''} />
              </FormItem>
              <FormItem name={'openAt'} label="openAt">
                <OutlinedInput placeholder={''} type="number" />
              </FormItem>
              <FormItem name={'closeAt'} label="closeAt">
                <OutlinedInput placeholder={''} type="number" />
              </FormItem>
              <FormItem name={'claimAt'} label="claimAt">
                <OutlinedInput placeholder={''} type="number" />
              </FormItem>
              <FormItem name={'maxPlayer'} label="Max Participant Allowed">
                <OutlinedInput placeholder={''} type="number" />
              </FormItem>
              <FormItem name={'nShare'} label="Number Of Winners">
                <OutlinedInput placeholder={''} type="number" />
              </FormItem>
              <FormItem name={'whitelistRoot'} label="whitelistRoot">
                <OutlinedInput placeholder={''} />
              </FormItem>
              <Stack flexDirection={'row'} gap={20}>
                {_values !== values && (
                  <Button sx={{ flex: 1 }} onClick={() => changeValue(_values)}>
                    Save
                  </Button>
                )}

                {_values === values && (
                  <Button type="submit" sx={{ flex: 1 }}>
                    Submit
                  </Button>
                )}
              </Stack>
            </Box>
          )
        }}
      </Formik>
    </Box>
  )
}

export default CreateNFTLotteryPool
