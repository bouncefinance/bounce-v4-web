import { useRequest } from 'ahooks'

import useChainConfigInBackend from '../web3/useChainConfigInBackend'
import { getPoolInfo } from 'api/pool'
import { FixedSwapPool, FixedSwapPoolProp, PoolType } from 'api/pool/type'
import { useQueryParams } from 'hooks/useQueryParams'
import { Currency, CurrencyAmount } from 'constants/token'
import { useActiveWeb3React } from 'hooks'
import { ChainId } from 'constants/chain'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useFixedSwapERC20Contract } from 'hooks/useContract'
import { useMemo } from 'react'
import { FIXED_SWAP_ERC20_ADDRESSES, OLD_FIXED_SWAP_ERC20_ADDRESSES } from '../../constants'

export const useBackedPoolInfo = (category: PoolType = PoolType.FixedSwap) => {
  const { poolId, chainShortName } = useQueryParams()
  const { account } = useActiveWeb3React()

  const chainConfigInBackend = useChainConfigInBackend('shortName', chainShortName || '')

  return useRequest(
    async (): Promise<FixedSwapPool & { ethChainId: ChainId }> => {
      if (typeof poolId !== 'string' || !chainConfigInBackend?.id) {
        return Promise.reject(new Error('Invalid poolId'))
      }
      // tokenType erc20:1 , erc1155:2
      const tokenType = category === PoolType.fixedSwapNft ? 2 : 1
      const response = await getPoolInfo({
        poolId,
        category,
        tokenType,
        chainId: chainConfigInBackend.id,
        address: account || ''
      })

      const rawPoolInfo = category === PoolType.FixedSwap ? response.data.fixedSwapPool : response.data.fixedSwapNftPool

      return {
        ...rawPoolInfo,
        token0: {
          ...rawPoolInfo.token0,
          symbol: rawPoolInfo.token0.symbol.toUpperCase()
        },
        token1: {
          ...rawPoolInfo.token1,
          symbol: rawPoolInfo.token1.symbol.toUpperCase()
        },
        ethChainId: chainConfigInBackend.ethChainId
      }
    },
    {
      // cacheKey: `POOL_INFO_${poolId}`,
      ready: !!poolId && !!chainConfigInBackend?.id,
      pollingInterval: 30000,
      refreshDeps: [account, poolId],
      retryInterval: 10000,
      retryCount: 20
    }
  )
}

const getCurrentFixedSwapERC20Contract = (poolId?: number | string, chainId?: ChainId) => {
  if (!poolId || !chainId) return undefined

  poolId = Number(poolId)
  const old = OLD_FIXED_SWAP_ERC20_ADDRESSES[chainId]
  if (old && old.maxId >= poolId) {
    return old.address
  }
  return FIXED_SWAP_ERC20_ADDRESSES[chainId]
}

const usePoolInfo = () => {
  const { poolId } = useQueryParams()
  const { data: poolInfo, run: getPoolInfo, loading } = useBackedPoolInfo()

  const currentBounceContractAddress = useMemo(
    () => getCurrentFixedSwapERC20Contract(poolInfo?.poolId, poolInfo?.ethChainId),
    [poolInfo?.ethChainId, poolInfo?.poolId]
  )
  const fixedSwapERC20Contract = useFixedSwapERC20Contract(currentBounceContractAddress)
  const { account } = useActiveWeb3React()
  const amountSwap0PRes = useSingleCallResult(
    fixedSwapERC20Contract,
    'amountSwap0P',
    [poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const amountSwap1PRes = useSingleCallResult(
    fixedSwapERC20Contract,
    'amountSwap1P',
    [poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const creatorClaimedPRes = useSingleCallResult(
    fixedSwapERC20Contract,
    'creatorClaimedP',
    [poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const myAmountSwapped0Res = useSingleCallResult(
    fixedSwapERC20Contract,
    'myAmountSwapped0',
    [account || undefined, poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const myAmountSwapped1Res = useSingleCallResult(
    fixedSwapERC20Contract,
    'myAmountSwapped1',
    [account || undefined, poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const myClaimedRes = useSingleCallResult(
    fixedSwapERC20Contract,
    'myClaimed',
    [account || undefined, poolId],
    undefined,
    poolInfo?.ethChainId
  ).result

  const data: FixedSwapPoolProp | undefined = useMemo(() => {
    if (!poolInfo) return undefined
    const _t0 = poolInfo.token0
    const t0 = new Currency(poolInfo.ethChainId, _t0.address, _t0.decimals, _t0.symbol, _t0.name, _t0.smallUrl)
    const _t1 = poolInfo.token1
    const t1 = new Currency(poolInfo.ethChainId, _t1.address, _t1.decimals, _t1.symbol, _t1.name, _t1.smallUrl)

    return {
      ...poolInfo,
      currentBounceContractAddress,
      token0: {
        ...poolInfo.token0,
        symbol: poolInfo.token0.symbol.toUpperCase()
      },
      token1: {
        ...poolInfo.token1,
        symbol: poolInfo.token1.symbol.toUpperCase()
      },
      participant: {
        ...poolInfo.participant,
        claimed: myClaimedRes?.[0] || poolInfo.participant.claimed,
        swappedAmount0: myAmountSwapped0Res?.[0].toString() || poolInfo.participant.swappedAmount0,
        currencySwappedAmount0: CurrencyAmount.fromRawAmount(
          t0,
          myAmountSwapped0Res?.[0].toString() || poolInfo.participant.swappedAmount0 || '0'
        ),
        currencySwappedAmount1: CurrencyAmount.fromRawAmount(t1, myAmountSwapped1Res?.[0].toString() || '0')
      },
      creatorClaimed: creatorClaimedPRes?.[0] || poolInfo.creatorClaimed,
      currencyAmountTotal0: CurrencyAmount.fromRawAmount(t0, poolInfo.amountTotal0),
      currencyAmountTotal1: CurrencyAmount.fromRawAmount(t1, poolInfo.amountTotal1),
      currencySwappedAmount0: CurrencyAmount.fromRawAmount(
        t0,
        amountSwap0PRes?.[0].toString() || (Number(poolInfo.swappedAmount0) > 0 ? poolInfo.swappedAmount0 : '0')
      ),
      currencyMaxAmount1PerWallet: CurrencyAmount.fromRawAmount(t1, poolInfo.maxAmount1PerWallet),
      currencySurplusTotal0: CurrencyAmount.fromRawAmount(t0, poolInfo.currentTotal0),
      currencySwappedTotal1: CurrencyAmount.fromRawAmount(t1, amountSwap1PRes?.[0].toString() || poolInfo.currentTotal1)
    }
  }, [
    amountSwap0PRes,
    amountSwap1PRes,
    creatorClaimedPRes,
    currentBounceContractAddress,
    myAmountSwapped0Res,
    myAmountSwapped1Res,
    myClaimedRes,
    poolInfo
  ])

  return {
    loading,
    run: getPoolInfo,
    data
  }
}

export default usePoolInfo
