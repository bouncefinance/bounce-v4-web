import { Erc20EnglishAuctionPoolProp, PoolType } from 'api/pool/type'
import { useBackedPoolInfo } from './usePoolInfo'
import { useEnglishAuctionErc20Contract } from 'hooks/useContract'
import { useSingleCallResult, useSingleContractMultipleData } from 'state/multicall/hooks'
import { useMemo } from 'react'
import { useActiveWeb3React } from 'hooks'
import { IReleaseType } from 'bounceComponents/create-auction-pool/types'
import { Currency, CurrencyAmount } from 'constants/token'
import { useIsUserInAllWhitelist } from './useIsUserInWhitelist'
import { useQueryParams } from 'hooks/useQueryParams'
import JSBI from 'jsbi'

export function useErc20EnglishAuctionInfo(backedId?: number | undefined) {
  const { sysId: _sysId } = useQueryParams()
  const sysId = useMemo(() => (backedId ? Number(backedId) : Number(_sysId) || 0), [_sysId, backedId])
  const { data: poolInfo, run: getPoolInfo, loading } = useBackedPoolInfo(PoolType.ENGLISH_AUCTION, sysId)
  const { account } = useActiveWeb3React()
  const englishAuctionErc20Contract = useEnglishAuctionErc20Contract(poolInfo?.contract || '', poolInfo?.ethChainId)

  const amountSwap0PRes = useSingleCallResult(
    englishAuctionErc20Contract,
    'amountSwap0',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const amountSwap0Data = useMemo(() => amountSwap0PRes?.[0].toString(), [amountSwap0PRes])

  const amountSwap1PRes = useSingleCallResult(
    englishAuctionErc20Contract,
    'amountSwap1',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const amountSwap1Data = useMemo(() => amountSwap1PRes?.[0].toString(), [amountSwap1PRes])

  const currentPriceRes = useSingleCallResult(
    englishAuctionErc20Contract,
    'currentAmount1',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const currentPrice = useMemo(() => currentPriceRes?.[0].toString(), [currentPriceRes])

  const maxAmount1PerWalletRes = useSingleCallResult(
    englishAuctionErc20Contract,
    'maxAmount1PerWallet',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const maxAmount1PerWallet = useMemo(() => maxAmount1PerWalletRes?.[0].toString(), [maxAmount1PerWalletRes])

  const myAmountSwapped0Res = useSingleCallResult(
    englishAuctionErc20Contract,
    'myAmountSwapped0',
    [account || undefined, poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const myAmountSwapped0Data = useMemo(() => myAmountSwapped0Res?.[0].toString(), [myAmountSwapped0Res])

  const myAmountSwapped1Res = useSingleCallResult(
    englishAuctionErc20Contract,
    'myAmountSwapped1',
    [account || undefined, poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const myAmountSwapped1Data = useMemo(() => myAmountSwapped1Res?.[0].toString(), [myAmountSwapped1Res])

  const poolsRes = useSingleCallResult(
    englishAuctionErc20Contract,
    'pools',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  console.log('contract poolsRes >>>', poolsRes)
  const poolsData: {
    fragments: number | undefined
    amountStart1: string | undefined
    amountEnd1: string | undefined
  } = useMemo(
    () => ({
      fragments: poolsRes?.fragments.toString() ? Number(poolsRes?.fragments.toString()) : undefined,
      amountStart1: poolsRes?.amountStart1.toString(),
      amountEnd1: poolsRes?.amountEnd1.toString()
    }),
    [poolsRes]
  )

  const creatorClaimedRes = useSingleCallResult(
    englishAuctionErc20Contract,
    'creatorClaimed',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const creatorClaimed = useMemo(() => creatorClaimedRes?.[0], [creatorClaimedRes])

  const myClaimedRes = useSingleCallResult(
    englishAuctionErc20Contract,
    'myClaimed',
    [account || undefined, poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const myClaimed = useMemo(() => myClaimedRes?.[0], [myClaimedRes])

  const myReleasedRes = useSingleCallResult(
    account ? englishAuctionErc20Contract : null,
    'myReleased',
    [account || undefined, poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const myReleased = useMemo(() => myReleasedRes?.[0].toString(), [myReleasedRes])

  const curReleasableAmountRes = useSingleCallResult(
    myAmountSwapped0Data ? englishAuctionErc20Contract : null,
    'computeReleasableAmount',
    [poolInfo?.poolId, myAmountSwapped0Data],
    undefined,
    poolInfo?.ethChainId
  ).result
  const curReleasableAmount = useMemo(() => curReleasableAmountRes?.[0].toString(), [curReleasableAmountRes])

  const releaseTypesRes = useSingleCallResult(
    englishAuctionErc20Contract,
    'releaseTypes',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const releaseType = useMemo(
    () => (releaseTypesRes?.[0] !== undefined ? Number(releaseTypesRes?.[0]) : undefined),
    [releaseTypesRes]
  )

  const getReleaseDataListLengthRes = useSingleCallResult(
    englishAuctionErc20Contract,
    'getReleaseDataListLength',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const getReleaseDataListLength = useMemo(
    () => (getReleaseDataListLengthRes?.[0] ? Number(getReleaseDataListLengthRes[0]) : undefined),
    [getReleaseDataListLengthRes]
  )

  const queryReleaseDataListParams = useMemo(() => {
    if (getReleaseDataListLength === undefined) return undefined
    return Array.from({ length: Number(getReleaseDataListLength) }, (_, i) => i).map(item => [poolInfo?.poolId, item])
  }, [getReleaseDataListLength, poolInfo?.poolId])

  const releaseDataListRes = useSingleContractMultipleData(
    queryReleaseDataListParams ? englishAuctionErc20Contract : null,
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

  const poolInfoRet: Erc20EnglishAuctionPoolProp | undefined = useMemo(() => {
    if (!poolInfo) return undefined
    const _t0 = poolInfo.token0
    const t0 = new Currency(poolInfo.ethChainId, _t0.address, _t0.decimals, _t0.symbol, _t0.name, _t0.smallUrl)
    const _t1 = poolInfo.token1
    const t1 = new Currency(poolInfo.ethChainId, _t1.address, _t1.decimals, _t1.symbol, _t1.name, _t1.smallUrl)
    return {
      ...poolInfo,
      whitelistData: {
        isUserInWhitelist: whitelistData.isUserInWhitelist,
        isPermit: whitelistData.isPermit,
        loading: whitelistData.loading
      },
      currencyAmountTotal0: CurrencyAmount.fromRawAmount(t0, poolInfo.amountTotal0),
      currencySwappedAmount0: CurrencyAmount.fromRawAmount(t0, amountSwap0Data || poolInfo.swappedAmount0),
      currencySwappedAmount1: CurrencyAmount.fromRawAmount(t1, amountSwap1Data || poolInfo.currentTotal1),
      creatorClaimed: creatorClaimed || poolInfo.creatorClaimed,
      fragments: poolsData.fragments,
      currencyCurrentPrice: currentPrice
        ? CurrencyAmount.fromRawAmount(
            t1,
            JSBI.divide(
              JSBI.multiply(JSBI.BigInt(currentPrice), JSBI.BigInt(Number(`1e${t0.decimals}`))),
              JSBI.BigInt(poolInfo.amountTotal0)
            )
          )
        : undefined,
      currencyAmountStartPrice: poolsData.amountStart1
        ? CurrencyAmount.fromRawAmount(
            t1,
            JSBI.divide(
              JSBI.multiply(JSBI.BigInt(poolsData.amountStart1), JSBI.BigInt(Number(`1e${t0.decimals}`))),
              JSBI.BigInt(poolInfo.amountTotal0)
            )
          )
        : undefined,
      currencyAmountEndPrice: poolsData.amountEnd1
        ? CurrencyAmount.fromRawAmount(
            t1,
            JSBI.divide(
              JSBI.multiply(JSBI.BigInt(poolsData.amountEnd1), JSBI.BigInt(Number(`1e${t0.decimals}`))),
              JSBI.BigInt(poolInfo.amountTotal0)
            )
          )
        : undefined,
      currencyMaxAmount1PerWallet: maxAmount1PerWallet
        ? CurrencyAmount.fromRawAmount(t1, maxAmount1PerWallet)
        : undefined,
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
    maxAmount1PerWallet,
    myAmountSwapped0Data,
    myAmountSwapped1Data,
    myClaimed,
    myReleased,
    poolInfo,
    poolsData.amountEnd1,
    poolsData.amountStart1,
    poolsData.fragments,
    releaseData,
    releaseType,
    whitelistData.isPermit,
    whitelistData.isUserInWhitelist,
    whitelistData.loading
  ])

  console.log('279', poolInfoRet?.currencyMaxAmount1PerWallet?.toExact())

  return {
    poolInfo: poolInfoRet,
    loading,
    run: getPoolInfo
  }
}
