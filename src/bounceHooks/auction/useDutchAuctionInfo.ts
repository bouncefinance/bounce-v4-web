import { DutchAuctionPoolProp, PoolType } from 'api/pool/type'
import { useBackedPoolInfo } from './usePoolInfo'
import { useDutchAuctionContract } from 'hooks/useContract'
import { useSingleCallResult, useSingleContractMultipleData } from 'state/multicall/hooks'
import { useMemo } from 'react'
import { useActiveWeb3React } from 'hooks'
import { IReleaseType } from 'bounceComponents/create-auction-pool/types'
import { Currency, CurrencyAmount } from 'constants/token'
import { useIsUserInAllWhitelist } from './useIsUserInWhitelist'
import { useQueryParams } from 'hooks/useQueryParams'

export function useDutchAuctionInfo() {
  const { sysId } = useQueryParams()
  const { data: poolInfo, run: getPoolInfo, loading } = useBackedPoolInfo(PoolType.DUTCH_AUCTION, Number(sysId))
  const { account } = useActiveWeb3React()
  const dutchAuctionContract = useDutchAuctionContract(poolInfo?.contract || '', poolInfo?.ethChainId)

  const amountSwap0PRes = useSingleCallResult(
    dutchAuctionContract,
    'amountSwap0',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const amountSwap0Data = useMemo(() => amountSwap0PRes?.[0].toString(), [amountSwap0PRes])

  const currentPriceRes = useSingleCallResult(
    dutchAuctionContract,
    'currentPrice',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const currentPrice = useMemo(() => currentPriceRes?.[0].toString(), [currentPriceRes])

  const lowestBidPriceRes = useSingleCallResult(
    dutchAuctionContract,
    'lowestBidPrice',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const lowestBidPrice = useMemo(() => lowestBidPriceRes?.[0].toString(), [lowestBidPriceRes])

  const nextRoundInSecondsRes = useSingleCallResult(
    dutchAuctionContract,
    'nextRoundInSeconds',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const nextRoundInSeconds = useMemo(
    () => (nextRoundInSecondsRes?.[0] !== undefined ? Number(nextRoundInSecondsRes?.[0].toString()) : undefined),
    [nextRoundInSecondsRes]
  )

  const amountSwap1PRes = useSingleCallResult(
    dutchAuctionContract,
    'amountSwap1',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const amountSwap1Data = useMemo(() => amountSwap1PRes?.[0].toString(), [amountSwap1PRes])

  const myAmountSwapped0Res = useSingleCallResult(
    dutchAuctionContract,
    'myAmountSwap0',
    [account || undefined, poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const myAmountSwapped0Data = useMemo(() => myAmountSwapped0Res?.[0].toString(), [myAmountSwapped0Res])

  const myAmountSwapped1Res = useSingleCallResult(
    dutchAuctionContract,
    'myAmountSwap1',
    [account || undefined, poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const myAmountSwapped1Data = useMemo(() => myAmountSwapped1Res?.[0].toString(), [myAmountSwapped1Res])

  const poolsRes = useSingleCallResult(
    dutchAuctionContract,
    'pools',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const poolsData: {
    highestPrice: string | undefined
    lowestPrice: string | undefined
    times: number | undefined
  } = useMemo(
    () => ({
      highestPrice: poolsRes?.amountMax1.toString(),
      lowestPrice: poolsRes?.amountMin1.toString(),
      times: poolsRes?.times ? Number(poolsRes?.times) : undefined
    }),
    [poolsRes]
  )

  const creatorClaimedRes = useSingleCallResult(
    dutchAuctionContract,
    'creatorClaimed',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const creatorClaimed = useMemo(() => creatorClaimedRes?.[0], [creatorClaimedRes])

  const myClaimedRes = useSingleCallResult(
    dutchAuctionContract,
    'myClaimed',
    [account || undefined, poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const myClaimed = useMemo(() => myClaimedRes?.[0], [myClaimedRes])

  const myReleasedRes = useSingleCallResult(
    account ? dutchAuctionContract : null,
    'myReleased',
    [account || undefined, poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const myReleased = useMemo(() => myReleasedRes?.[0].toString(), [myReleasedRes])

  const curReleasableAmountRes = useSingleCallResult(
    myAmountSwapped0Data ? dutchAuctionContract : null,
    'computeReleasableAmount',
    [poolInfo?.poolId, myAmountSwapped0Data],
    undefined,
    poolInfo?.ethChainId
  ).result
  const curReleasableAmount = useMemo(() => curReleasableAmountRes?.[0].toString(), [curReleasableAmountRes])

  const releaseTypesRes = useSingleCallResult(
    dutchAuctionContract,
    'releaseTypes',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const releaseType = useMemo(
    () => (releaseTypesRes?.[0] ? Number(releaseTypesRes?.[0]) : undefined),
    [releaseTypesRes]
  )

  const getReleaseDataListLengthRes = useSingleCallResult(
    dutchAuctionContract,
    'getReleaseDataListLength',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const queryReleaseDataListParams = useMemo(() => {
    if (getReleaseDataListLengthRes?.[0] === undefined) return undefined
    return Array.from({ length: Number(getReleaseDataListLengthRes[0]) }, (_, i) => i).map(item => [
      poolInfo?.poolId,
      item
    ])
  }, [getReleaseDataListLengthRes, poolInfo?.poolId])
  const releaseDataListRes = useSingleContractMultipleData(
    queryReleaseDataListParams ? dutchAuctionContract : null,
    'releaseDataList',
    queryReleaseDataListParams || [],
    undefined,
    poolInfo?.ethChainId
  )
  const releaseData = useMemo(() => {
    return releaseDataListRes.map(item => ({
      startAt: Number(item.result?.[0]),
      endAt: releaseType === IReleaseType.Fragment ? undefined : Number(item.result?.[1]),
      ratio: releaseType === IReleaseType.Fragment ? item.result?.[1].toString() : undefined
    }))
  }, [releaseDataListRes, releaseType])

  const whitelistData = useIsUserInAllWhitelist(
    poolInfo?.chainId,
    poolInfo?.poolId,
    poolInfo?.enableWhiteList || false,
    poolInfo?.category
  )

  const poolInfoRet: DutchAuctionPoolProp | undefined = useMemo(() => {
    if (!poolInfo) return undefined
    const _t0 = poolInfo.token0
    const t0 = new Currency(poolInfo.ethChainId, _t0.address, _t0.decimals, _t0.symbol, _t0.name, _t0.smallUrl)
    const _t1 = poolInfo.token1
    const t1 = new Currency(poolInfo.ethChainId, _t1.address, _t1.decimals, _t1.symbol, _t1.name, _t1.smallUrl)

    return {
      ...poolInfo,
      whitelistData,
      currencyAmountTotal0: CurrencyAmount.fromRawAmount(t0, poolInfo.amountTotal0),
      currencyAmountTotal1: CurrencyAmount.fromRawAmount(t0, poolInfo.amountTotal1),
      currencySwappedAmount0: CurrencyAmount.fromRawAmount(t0, amountSwap0Data || poolInfo.swappedAmount0),
      currencySwappedTotal1: CurrencyAmount.fromRawAmount(t1, amountSwap1Data || poolInfo.currentTotal1),
      creatorClaimed: creatorClaimed || poolInfo.creatorClaimed,
      highestPrice: poolsData.highestPrice ? CurrencyAmount.fromRawAmount(t1, poolsData.highestPrice) : undefined,
      lowestPrice: poolsData.lowestPrice ? CurrencyAmount.fromRawAmount(t1, poolsData.lowestPrice) : undefined,
      times: poolsData.times,
      currencyCurrentPrice: currentPrice ? CurrencyAmount.fromRawAmount(t1, currentPrice) : undefined,
      currencyLowestBidPrice: lowestBidPrice ? CurrencyAmount.fromRawAmount(t1, lowestBidPrice) : undefined,
      nextRoundInSeconds,
      releaseType,
      releaseData,
      participant: {
        ...poolInfo.participant,
        claimed: myClaimed === undefined ? poolInfo.participant.claimed : myClaimed,
        swappedAmount0: myAmountSwapped0Data || poolInfo.participant.swappedAmount0,
        currencySwappedAmount0: CurrencyAmount.fromRawAmount(
          t0,
          myAmountSwapped0Data || poolInfo.participant.swappedAmount0 || '0'
        ),
        currencySwappedAmount1: CurrencyAmount.fromRawAmount(t1, myAmountSwapped1Data || '0'),
        currencyCurReleasableAmount:
          releaseType === IReleaseType.Instant
            ? CurrencyAmount.fromRawAmount(t0, myAmountSwapped0Data || '0')
            : curReleasableAmount
            ? CurrencyAmount.fromRawAmount(t0, curReleasableAmount)
            : undefined,
        currencyCurClaimableAmount: curReleasableAmount
          ? CurrencyAmount.fromRawAmount(t0, curReleasableAmount).subtract(
              CurrencyAmount.fromRawAmount(t0, myReleased || '0')
            )
          : undefined,
        currencyMyReleased: myReleased ? CurrencyAmount.fromRawAmount(t0, myReleased) : undefined
      }
    }
  }, [
    amountSwap0Data,
    amountSwap1Data,
    creatorClaimed,
    curReleasableAmount,
    currentPrice,
    lowestBidPrice,
    myAmountSwapped0Data,
    myAmountSwapped1Data,
    myClaimed,
    myReleased,
    nextRoundInSeconds,
    poolInfo,
    poolsData.highestPrice,
    poolsData.lowestPrice,
    poolsData.times,
    releaseData,
    releaseType,
    whitelistData
  ])

  return {
    poolInfo: poolInfoRet,
    loading,
    run: getPoolInfo
  }
}
