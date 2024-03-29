import { Box, Button, OutlinedInput, Stack } from '@mui/material'
import { getPoolBurningCreationSignature, getWhitelistMerkleTreeRoot } from 'api/pool'
import { GetWhitelistMerkleTreeRootParams, PoolType } from 'api/pool/type'
import FormItem from 'bounceComponents/common/FormItem'
import { IReleaseType } from 'bounceComponents/create-auction-pool/types'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
import { ChainId } from 'constants/chain'
import { NULL_BYTES, RANDOM_SELECTION_NFT_BURNING_CONTRACT_ADDRESSES } from 'constants/index'
import { Currency, CurrencyAmount } from 'constants/token'
import { Formik } from 'formik'
import { useActiveWeb3React } from 'hooks'
import { useRandomSelectionNFTBurningContract } from 'hooks/useContract'
import { useCallback, useMemo, useState } from 'react'
import { useTokens } from 'state/wallet/hooks'

interface IParam {
  name: string
  token0: string
  token1s: string[]
  amountTotal0: string
  amount1PerWallets: string[]
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
  token0: '0xE684c11F6E90905EF63B16A4FAD3851AC8f432Be',
  token1s: [],
  amountTotal0: '10',
  amount1PerWallets: [],
  openAt: 1703735918,
  closeAt: 1703735978,
  claimAt: 1703735978,
  maxPlayer: 15,
  nShare: 10,
  mintContract: '',
  whitelistRoot: ''
}

const useCreatePool = () => {
  const { chainId } = useActiveWeb3React()
  const contractAddress = RANDOM_SELECTION_NFT_BURNING_CONTRACT_ADDRESSES[chainId || 5]
  const contract = useRandomSelectionNFTBurningContract(contractAddress, chainId || 5)
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
          category: PoolType.LOTTERY_BURNING,
          chainId: chainConfigInBackend.id
        }
        const { data } = await getWhitelistMerkleTreeRoot(whitelistParams)
        merkleroot = data.merkleroot
      }
      merkleroot = merkleroot || NULL_BYTES

      const signatureParams = {
        amountMin1: '',
        amountTotal0: body.amountTotal0,
        category: PoolType.LOTTERY_BURNING,
        chainId: optId,
        claimAt: body.claimAt,
        closeAt: body.closeAt,
        creator: creator,
        maxAmount1PerWallet: '',
        merkleroot: '',
        maxPlayer: body.maxPlayer,
        name: body.name,
        openAt: body.openAt,
        token0: body.token0,
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
      } = await getPoolBurningCreationSignature(signatureParams)
      const _body = { ...body, whitelistRoot: merkleroot }
      const arg = [id, _body, false, expiredTime, signature]
      try {
        console.log('pool id', id, arg)
        await contract.createV2(...arg)
        localStorage.setItem('NFT_RANDOM_POOL_ID', JSON.stringify(id))
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

  const token1Arr = useTokens(body.token1s as string[], chainId || ChainId.MAINNET)

  const token1CurrencyAmount = useMemo(() => {
    if (!token1Arr || token1Arr.some(i => !i) || !token1Arr || token1Arr.includes(undefined)) return undefined
    return token1Arr?.map((i, d) => CurrencyAmount.fromAmount(i as Currency, body.amount1PerWallets[d])?.raw.toString())
  }, [body.amount1PerWallets, token1Arr])

  return useCallback(() => {
    if (!token1CurrencyAmount || !chainConfigInBackend || token1CurrencyAmount.some(i => !i)) return
    const _body = {
      ...body,
      mintContract: body.token0,
      amount1PerWallet: token1CurrencyAmount
    } as IParam
    create({ body: _body, creator, optId: chainConfigInBackend.id })
  }, [body, chainConfigInBackend, create, creator, token1CurrencyAmount])
}

const CreateNFTLotteryPool = () => {
  const { account, chainId } = useActiveWeb3React()
  const [values, setValues] = useState(initParams)
  const create = useToCreate(values, account || '')
  const changeValue = (values: IParam) => {
    setValues(values)
  }
  const onSubmit = () => {
    create()
  }
  const token1Arr = useTokens(values.token1s, chainId)
  return (
    <Box sx={{ maxWidth: 800, margin: '0 auto', mt: 50 }}>
      <Formik onSubmit={onSubmit} initialValues={initParams}>
        {({ handleSubmit, values: _values, setFieldValue }) => {
          return (
            <Box component={'form'} onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <FormItem name={'name'} label="pool name">
                <OutlinedInput placeholder={''} />
              </FormItem>
              <FormItem
                name={'token1s'}
                label="token1 address"
                onChange={e => {
                  const _e = e.target as any as HTMLInputElement
                  const v = _e.value.split(',')
                  setFieldValue('token1s', v)
                }}
              >
                <OutlinedInput placeholder={''} />
              </FormItem>
              <FormItem name={'amountTotal0'} label="nft number">
                <OutlinedInput placeholder={''} />
              </FormItem>
              <FormItem
                name={'amount1PerWallets'}
                label="token1 perWallet number"
                onChange={e => {
                  const _e = e.target as any as HTMLInputElement
                  const v = _e.value.split(',')
                  setFieldValue('amount1PerWallets', v)
                }}
              >
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
                  <Button disabled={!token1Arr} type="submit" sx={{ flex: 1 }}>
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
