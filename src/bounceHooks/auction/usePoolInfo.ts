import { useRequest } from 'ahooks'

import useChainConfigInBackend from '../web3/useChainConfigInBackend'
import { getPoolInfo } from 'api/pool'
import { FixedSwapPool, FixedSwapPoolProp, PoolType } from 'api/pool/type'
import { useQueryParams } from 'hooks/useQueryParams'
import { Currency, CurrencyAmount } from 'constants/token'
import { useActiveWeb3React } from 'hooks'
import { ChainId } from 'constants/chain'
import { useSingleCallResult, useSingleContractMultipleData } from 'state/multicall/hooks'
import { useFixedSwapERC20Contract } from 'hooks/useContract'
import { useMemo } from 'react'
import { IReleaseType } from 'bounceComponents/create-auction-pool/types'
import { useIsUserInAllWhitelist } from './useIsUserInWhitelist'
// import { FIXED_SWAP_ERC20_ADDRESSES, OLD_FIXED_SWAP_ERC20_ADDRESSES } from '../../constants'
import getBackedTokenType from 'utils/auction/getBackedTokenType'
import { useOptionDatas } from 'state/configOptions/hooks'
import { getLabelById } from 'utils'

export const useBackedPoolInfo = (category: PoolType = PoolType.FixedSwap) => {
  const { poolId, chainShortName, sysId } = useQueryParams()
  const { account } = useActiveWeb3React()
  const { chainInfoOpt } = useOptionDatas()

  const chainConfigInBackend = useChainConfigInBackend('shortName', chainShortName || '')

  return useRequest(
    async (): Promise<FixedSwapPool & { ethChainId: ChainId }> => {
      if (!sysId) {
        if (typeof poolId !== 'string' || !chainConfigInBackend?.id) {
          return Promise.reject(new Error('Invalid poolId'))
        }
      }
      const args = sysId
        ? { id: Number(sysId), tokenType: getBackedTokenType(category) }
        : {
            poolId,
            category,
            tokenType: getBackedTokenType(category),
            chainId: chainConfigInBackend?.id as number,
            address: account || ''
          }

      const response = await getPoolInfo(args)

      const rawPoolInfo = response.data.fixedSwapPool || response.data.fixedSwapNftPool

      return {
        ...rawPoolInfo,
        poolVersion: response.data.poolVersion,
        token0: {
          ...rawPoolInfo.token0,
          symbol: rawPoolInfo.token0.symbol.toUpperCase()
        },
        token1: {
          ...rawPoolInfo.token1,
          symbol: rawPoolInfo.token1.symbol.toUpperCase()
        },
        ethChainId: getLabelById(rawPoolInfo.chainId, 'ethChainId', chainInfoOpt || []),
        swappedAmount0: Number(rawPoolInfo.swappedAmount0) > 0 ? rawPoolInfo.swappedAmount0 : '0'
      }
    },
    {
      // cacheKey: `POOL_INFO_${poolId}`,
      ready: (!!poolId && !!chainConfigInBackend?.id) || !!(sysId && chainInfoOpt),
      pollingInterval: 30000,
      refreshDeps: [account, poolId, sysId, chainInfoOpt],
      retryInterval: 10000,
      retryCount: 20
    }
  )
}

// const getCurrentFixedSwapERC20Contract = (poolId?: number | string, chainId?: ChainId) => {
//   if (!poolId || !chainId) return undefined

//   poolId = Number(poolId)
//   const old = OLD_FIXED_SWAP_ERC20_ADDRESSES[chainId]
//   if (old && old.maxId >= poolId) {
//     return old.address
//   }
//   return FIXED_SWAP_ERC20_ADDRESSES[chainId]
// }

const usePoolInfo = () => {
  const { data: poolInfo, run: getPoolInfo, loading } = useBackedPoolInfo()

  const currentBounceContractAddress = useMemo(() => poolInfo?.contract, [poolInfo?.contract])
  const fixedSwapERC20Contract = useFixedSwapERC20Contract(currentBounceContractAddress || '', poolInfo?.ethChainId)
  const { account } = useActiveWeb3React()
  const amountSwap0PRes = useSingleCallResult(
    fixedSwapERC20Contract,
    'amountSwap0P',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const amountSwap1PRes = useSingleCallResult(
    fixedSwapERC20Contract,
    'amountSwap1P',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const creatorClaimedPRes = useSingleCallResult(
    fixedSwapERC20Contract,
    'creatorClaimedP',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const myAmountSwapped0Res = useSingleCallResult(
    fixedSwapERC20Contract,
    'myAmountSwapped0',
    [account || undefined, poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const myAmountSwapped1Res = useSingleCallResult(
    fixedSwapERC20Contract,
    'myAmountSwapped1',
    [account || undefined, poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const myClaimedRes = useSingleCallResult(
    fixedSwapERC20Contract,
    'myClaimed',
    [account || undefined, poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result

  const v2FixedSwapData = useV2FixedSwapData(poolInfo?.poolVersion === 2, poolInfo?.poolId, poolInfo)
  const whitelistData = useIsUserInAllWhitelist(
    poolInfo?.chainId,
    poolInfo?.poolId,
    poolInfo?.enableWhiteList || false,
    poolInfo?.category
  )

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
      whitelistData,
      participant: {
        ...poolInfo.participant,
        claimed: myClaimedRes?.[0] === undefined ? poolInfo.participant.claimed : myClaimedRes?.[0],
        swappedAmount0: myAmountSwapped0Res?.[0].toString() || poolInfo.participant.swappedAmount0,
        currencySwappedAmount0: CurrencyAmount.fromRawAmount(
          t0,
          myAmountSwapped0Res?.[0].toString() || poolInfo.participant.swappedAmount0 || '0'
        ),
        currencySwappedAmount1: CurrencyAmount.fromRawAmount(t1, myAmountSwapped1Res?.[0].toString() || '0'),
        currencyCurReleasableAmount:
          v2FixedSwapData.releaseType === IReleaseType.Instant
            ? CurrencyAmount.fromRawAmount(t0, myAmountSwapped0Res?.[0].toString() || '0')
            : v2FixedSwapData.curReleasableAmount
            ? CurrencyAmount.fromRawAmount(t0, v2FixedSwapData.curReleasableAmount)
            : undefined,
        currencyCurClaimableAmount: v2FixedSwapData.curReleasableAmount
          ? CurrencyAmount.fromRawAmount(t0, v2FixedSwapData.curReleasableAmount).subtract(
              CurrencyAmount.fromRawAmount(t0, v2FixedSwapData.myReleased || '0')
            )
          : undefined,
        currencyMyReleased: v2FixedSwapData.myReleased
          ? CurrencyAmount.fromRawAmount(t0, v2FixedSwapData.myReleased)
          : undefined
      },
      creatorClaimed: creatorClaimedPRes?.[0] || poolInfo.creatorClaimed,
      currencyAmountTotal0: CurrencyAmount.fromRawAmount(t0, poolInfo.amountTotal0),
      currencyAmountTotal1: CurrencyAmount.fromRawAmount(t1, poolInfo.amountTotal1),
      currencySwappedAmount0: CurrencyAmount.fromRawAmount(
        t0,
        amountSwap0PRes?.[0].toString() || poolInfo.swappedAmount0
      ),
      currencyMaxAmount1PerWallet: CurrencyAmount.fromRawAmount(t1, poolInfo.maxAmount1PerWallet),
      currencySurplusTotal0: CurrencyAmount.fromRawAmount(t0, poolInfo.amountTotal0).subtract(
        CurrencyAmount.fromRawAmount(t0, amountSwap0PRes?.[0].toString() || poolInfo.swappedAmount0)
      ),
      currencySwappedTotal1: CurrencyAmount.fromRawAmount(
        t1,
        amountSwap1PRes?.[0].toString() || poolInfo.currentTotal1
      ),
      enableReverses: v2FixedSwapData.enableReverses,
      releaseType: v2FixedSwapData.releaseType,
      releaseData: v2FixedSwapData.releaseData
    }
  }, [
    amountSwap0PRes,
    amountSwap1PRes,
    creatorClaimedPRes,
    currentBounceContractAddress,
    myAmountSwapped0Res,
    myAmountSwapped1Res,
    myClaimedRes,
    poolInfo,
    v2FixedSwapData,
    whitelistData
  ])

  return {
    loading,
    run: getPoolInfo,
    data
  }
}

export default usePoolInfo

function useV2FixedSwapData(
  isV2: boolean,
  poolId: string | undefined,
  poolInfo:
    | (FixedSwapPool & {
        ethChainId: ChainId
      })
    | undefined
): {
  enableReverses: boolean
  myAmountSwapped0: string | undefined
  curReleasableAmount: string | undefined
  myReleased: string | undefined
  releaseType: IReleaseType | undefined
  releaseData: { startAt: number; endAt: number | undefined; ratio: string | undefined }[]
} {
  const _fixedSwapERC20Contract = useFixedSwapERC20Contract(poolInfo?.contract, poolInfo?.ethChainId)
  const fixedSwapERC20Contract = useMemo(() => (isV2 ? _fixedSwapERC20Contract : null), [_fixedSwapERC20Contract, isV2])
  const { account } = useActiveWeb3React()

  const myAmountSwapped0Res = useSingleCallResult(
    account ? fixedSwapERC20Contract : null,
    'myAmountSwapped0',
    [account || undefined, poolId],
    undefined,
    poolInfo?.ethChainId
  ).result

  const enableReversesRes = useSingleCallResult(
    account ? fixedSwapERC20Contract : null,
    'enableReverses',
    [poolId],
    undefined,
    poolInfo?.ethChainId
  ).result

  const myReleasedRes = useSingleCallResult(
    account ? fixedSwapERC20Contract : null,
    'myReleased',
    [account || undefined, poolId],
    undefined,
    poolInfo?.ethChainId
  ).result

  const curReleasableAmountRes = useSingleCallResult(
    myAmountSwapped0Res ? fixedSwapERC20Contract : null,
    'computeReleasableAmount',
    [poolId, myAmountSwapped0Res?.[0].toString()],
    undefined,
    poolInfo?.ethChainId
  ).result

  const releaseTypesRes = useSingleCallResult(
    fixedSwapERC20Contract,
    'releaseTypes',
    [poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const getReleaseDataListLengthRes = useSingleCallResult(
    fixedSwapERC20Contract,
    'getReleaseDataListLength',
    [poolId],
    undefined,
    poolInfo?.ethChainId
  ).result

  const queryReleaseDataListParams = useMemo(() => {
    if (getReleaseDataListLengthRes?.[0] === undefined) return undefined
    return Array.from({ length: Number(getReleaseDataListLengthRes[0]) }, (_, i) => i).map(item => [poolId, item])
  }, [getReleaseDataListLengthRes, poolId])

  const releaseDataListRes = useSingleContractMultipleData(
    queryReleaseDataListParams ? fixedSwapERC20Contract : null,
    'releaseDataList',
    queryReleaseDataListParams || [],
    undefined,
    poolInfo?.ethChainId
  )

  return useMemo(() => {
    if (!isV2 || !releaseTypesRes || !releaseDataListRes) {
      return {
        enableReverses: true,
        myAmountSwapped0: myAmountSwapped0Res?.[0].toString(),
        curReleasableAmount: curReleasableAmountRes?.[0].toString(),
        myReleased: myReleasedRes?.[0].toString(),
        releaseType: undefined,
        releaseData: []
      }
    }
    const releaseType: IReleaseType = Number(releaseTypesRes?.[0])
    return {
      enableReverses: enableReversesRes?.[0],
      myAmountSwapped0: myAmountSwapped0Res?.[0].toString(),
      curReleasableAmount: curReleasableAmountRes?.[0].toString(),
      myReleased: myReleasedRes?.[0].toString(),
      releaseType,
      releaseData: releaseDataListRes.map(item => ({
        startAt: Number(item.result?.[0]),
        endAt: releaseType === IReleaseType.Fragment ? undefined : Number(item.result?.[1]),
        ratio: releaseType === IReleaseType.Fragment ? item.result?.[1].toString() : undefined
      }))
    }
  }, [
    curReleasableAmountRes,
    enableReversesRes,
    isV2,
    myAmountSwapped0Res,
    myReleasedRes,
    releaseDataListRes,
    releaseTypesRes
  ])
}
