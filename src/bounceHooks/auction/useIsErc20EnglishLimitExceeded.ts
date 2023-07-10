import { useMemo } from 'react'
import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'
import { CurrencyAmount } from 'constants/token'

export function useMaxSwapAmount1Limit(poolInfo: Erc20EnglishAuctionPoolProp) {
  return useMemo(() => {
    if (!poolInfo.currencyMaxAmount1PerWallet) return
    const hasBidLimit = poolInfo.currencyMaxAmount1PerWallet.greaterThan('0')

    return hasBidLimit
      ? poolInfo.participant.currencySwappedAmount1
        ? poolInfo.currencyMaxAmount1PerWallet.subtract(poolInfo.participant.currencySwappedAmount1)
        : poolInfo.currencyMaxAmount1PerWallet
      : poolInfo.currencySwappedAmount0 && poolInfo.currencyAmountTotal0.subtract(poolInfo.currencySwappedAmount0)
  }, [
    poolInfo.currencyAmountTotal0,
    poolInfo.currencyMaxAmount1PerWallet,
    poolInfo.currencySwappedAmount0,
    poolInfo.participant.currencySwappedAmount1
  ])
}

const useIsLimitExceeded = (bidAmount: string, poolInfo: Erc20EnglishAuctionPoolProp) => {
  const token1Allocation = useMaxSwapAmount1Limit(poolInfo)

  const currencyBidAmount =
    poolInfo.currencyAmountStartPrice &&
    CurrencyAmount.fromAmount(poolInfo.currencyAmountStartPrice.currency, bidAmount)

  return useMemo(
    () => token1Allocation && currencyBidAmount?.greaterThan(token1Allocation),
    [currencyBidAmount, token1Allocation]
  )
}

export default useIsLimitExceeded
