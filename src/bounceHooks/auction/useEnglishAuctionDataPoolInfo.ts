import { Currency } from 'constants/token/currency'
import { CurrencyAmount } from 'constants/token/fractions/currencyAmount'
import { useQueryParams } from 'hooks/useQueryParams'
import { useMemo } from 'react'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useBackedPoolInfo } from './usePoolInfo'
import { useActiveWeb3React } from 'hooks'
import { useEnglishAuctionNftContract } from 'hooks/useContract'
import { EnglishAuctionNFTPoolProp, PoolType } from 'api/pool/type'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'

export function useEnglishAuctionDataPoolInfo() {
  const { poolId, chainShortName } = useQueryParams()
  const { account } = useActiveWeb3React()

  const chainConfigInBackend = useChainConfigInBackend('shortName', chainShortName || '')
  const { data: poolInfo, run: getPoolInfo, loading } = useBackedPoolInfo(PoolType.ENGLISH_AUCTION_NFT)

  const englishAuctionNftContract = useEnglishAuctionNftContract()

  const poolsRes = useSingleCallResult(
    englishAuctionNftContract,
    'pools',
    [poolId],
    undefined,
    chainConfigInBackend?.ethChainId
  ).result
  const poolsData = useMemo(
    () => ({
      amountTotal0: poolsRes?.amountTotal0.toString(),
      amountMin1: poolsRes?.amountMin1.toString(),
      amountMinIncr1: poolsRes?.amountMinIncr1.toString()
    }),
    [poolsRes]
  )

  const creatorClaimedRes = useSingleCallResult(
    englishAuctionNftContract,
    'creatorClaimed',
    [poolId],
    undefined,
    chainConfigInBackend?.ethChainId
  ).result
  const creatorClaimed = useMemo(() => creatorClaimedRes?.[0], [creatorClaimedRes])

  const currentBidderRes = useSingleCallResult(
    englishAuctionNftContract,
    'currentBidder',
    [poolId],
    undefined,
    chainConfigInBackend?.ethChainId
  ).result
  const currentBidder = useMemo(() => currentBidderRes?.[0].toString(), [currentBidderRes])

  const currentBidderAmount1Res = useSingleCallResult(
    englishAuctionNftContract,
    'currentBidderAmount1',
    [poolId],
    undefined,
    chainConfigInBackend?.ethChainId
  ).result
  const currentBidderAmount1 = useMemo(() => currentBidderAmount1Res?.[0].toString(), [currentBidderAmount1Res])

  const currentBidderMinAmountRes = useSingleCallResult(
    englishAuctionNftContract,
    'currentBidderAmount',
    [poolId],
    undefined,
    chainConfigInBackend?.ethChainId
  ).result
  const currentBidderMinAmount = useMemo(() => currentBidderMinAmountRes?.[0].toString(), [currentBidderMinAmountRes])

  const gasFeeRes = useSingleCallResult(
    englishAuctionNftContract,
    'gasFee',
    [poolId],
    undefined,
    chainConfigInBackend?.ethChainId
  ).result
  const gasFee = useMemo(() => gasFeeRes?.[0].toString(), [gasFeeRes])

  const myClaimedRes = useSingleCallResult(
    englishAuctionNftContract,
    'myClaimed',
    [account || undefined, poolId],
    undefined,
    chainConfigInBackend?.ethChainId
  ).result
  const myClaimed = useMemo(() => myClaimedRes?.[0], [myClaimedRes])

  const data = useMemo(() => {
    if (!poolInfo || !chainConfigInBackend?.ethChainId) return undefined
    const _t1 = poolInfo?.token1
    const t1 = new Currency(
      chainConfigInBackend?.ethChainId,
      _t1.address,
      _t1.decimals,
      _t1.symbol,
      _t1.name,
      _t1.smallUrl
    )

    const _pools = {
      amountTotal0: poolsData.amountTotal0 || poolInfo.amountTotal0,
      currencyAmountMin1: poolsData.amountMin1 ? CurrencyAmount.fromRawAmount(t1, poolsData.amountMin1) : undefined,
      currencyAmountMinIncr1: poolsData.amountMinIncr1
        ? CurrencyAmount.fromRawAmount(t1, poolsData.amountMinIncr1)
        : undefined
    }

    const result: EnglishAuctionNFTPoolProp = {
      ...poolInfo,
      ..._pools,
      participant: {
        ...poolInfo.participant,
        claimed: myClaimed
      },
      creatorClaimed: creatorClaimed || poolInfo.creatorClaimed,
      currentBidder: currentBidder,
      currentBidderAmount1: currentBidderAmount1 ? CurrencyAmount.fromRawAmount(t1, currentBidderAmount1) : undefined,
      currentBidderMinAmount: currentBidderMinAmount
        ? CurrencyAmount.fromRawAmount(t1, currentBidderMinAmount)
        : undefined,
      gasFee: gasFee
        ? CurrencyAmount.fromRawAmount(Currency.getNativeCurrency(chainConfigInBackend.ethChainId), gasFee)
        : undefined,
      isWinner: !!account && currentBidder?.toLowerCase() === account.toLowerCase(),
      isUserJoinedPool: false
    }

    return result
  }, [
    account,
    chainConfigInBackend?.ethChainId,
    creatorClaimed,
    currentBidder,
    currentBidderAmount1,
    currentBidderMinAmount,
    gasFee,
    myClaimed,
    poolInfo,
    poolsData.amountMin1,
    poolsData.amountMinIncr1,
    poolsData.amountTotal0
  ])

  return useMemo(
    () => ({
      loading,
      run: getPoolInfo,
      data
    }),
    [data, getPoolInfo, loading]
  )
}
