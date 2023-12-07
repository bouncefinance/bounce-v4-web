import { useCallback, useMemo } from 'react'
import { Button } from '@mui/material'
import { BigNumber } from 'bignumber.js'
import NumberInput from 'bounceComponents/common/NumberInput'
import { FixedSwapPoolParams } from 'bounceComponents/fixed-swap-nft/MainBlock/UserMainBlock'
import { useActiveWeb3React } from 'hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import PoolInfoItem from 'bounceComponents/fixed-swap/PoolInfoItem'
import { formatNumber } from 'utils/number'

interface BidAmountInputProps {
  bidAmount: string
  setBidAmount: (value: string) => void
}

const BidAmountInput = ({ bidAmount, setBidAmount, poolInfo }: BidAmountInputProps & FixedSwapPoolParams) => {
  const { account } = useActiveWeb3React()
  const userToken1Balance = useCurrencyBalance(account || undefined, poolInfo.currencyAmountTotal1.currency)

  const availableAmount0 = useMemo(() => poolInfo.currentTotal0, [poolInfo.currentTotal0])

  const hasBidLimit = new BigNumber(poolInfo.maxAmount1PerWallet).gt(0)

  const userSwappedAmount0Units = useMemo(() => {
    return poolInfo.participant.swappedAmount0 || 0
  }, [poolInfo.participant.swappedAmount0])

  const leftAllocationToken0 = useMemo(
    () =>
      hasBidLimit
        ? new BigNumber(poolInfo.maxAmount1PerWallet).gt(userSwappedAmount0Units)
          ? new BigNumber(poolInfo.maxAmount1PerWallet).minus(userSwappedAmount0Units)
          : 0
        : new BigNumber(poolInfo.currentTotal0),
    [hasBidLimit, poolInfo.currentTotal0, poolInfo.maxAmount1PerWallet, userSwappedAmount0Units]
  )

  const handleMaxButtonClick = useCallback(() => {
    if (!userToken1Balance) {
      setBidAmount('0')
      return
    }

    const minimum = BigNumber.minimum(
      new BigNumber(userToken1Balance.toExact()).div(poolInfo.ratio).integerValue(),
      availableAmount0,
      poolInfo.amountTotal0,
      leftAllocationToken0
    )
    const amount = minimum.toString()
    setBidAmount(amount)
  }, [availableAmount0, leftAllocationToken0, poolInfo.amountTotal0, poolInfo.ratio, setBidAmount, userToken1Balance])

  const setValueAble = useCallback(
    (value: string) => {
      if (!userToken1Balance) {
        setBidAmount('')
        return
      }
      const result = Math.round(Number(value)) + ''
      const minimum = BigNumber.minimum(
        new BigNumber(userToken1Balance.toExact()).div(poolInfo.ratio).integerValue(),
        availableAmount0,
        leftAllocationToken0,
        new BigNumber(result)
      )
      const amount = minimum.toString()
      setBidAmount(amount)
    },
    [availableAmount0, leftAllocationToken0, poolInfo.ratio, setBidAmount, userToken1Balance]
  )
  const formattedTokenWillPay = bidAmount
    ? formatNumber(new BigNumber(bidAmount).times(poolInfo.ratio), { unit: 0 })
    : '0'

  return (
    <>
      <NumberInput
        sx={{ mt: 12 }}
        fullWidth
        value={bidAmount}
        placeholder="Enter"
        onUserInput={value => {
          setValueAble(value)
        }}
        endAdornment={
          <>
            <Button size="small" variant="outlined" sx={{ minWidth: 60 }} onClick={handleMaxButtonClick}>
              Max
            </Button>
          </>
        }
      />

      <PoolInfoItem title="Token you will pay" sx={{ mt: 8 }}>
        {formattedTokenWillPay} {poolInfo.token1.symbol}
      </PoolInfoItem>
    </>
  )
}

export default BidAmountInput
