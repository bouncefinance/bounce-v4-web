import { useCallback } from 'react'
import { Button, Typography } from '@mui/material'
import { BigNumber } from 'bignumber.js'
import PoolInfoItem from '../../PoolInfoItem'
import TokenImage from 'bounceComponents/common/TokenImage'
import NumberInput from 'bounceComponents/common/NumberInput'
import { formatNumber } from 'utils/number'
import { FixedSwapPoolProp } from 'api/pool/type'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks'
import { useMaxSwapAmount1Limit } from 'bounceHooks/auction/useIsLimitExceeded'

interface BidAmountInputProps {
  bidAmount: string
  setBidAmount: (value: string) => void
  poolInfo: FixedSwapPoolProp
}

const BidAmountInput = ({ bidAmount, setBidAmount, poolInfo }: BidAmountInputProps) => {
  const { account } = useActiveWeb3React()
  const userToken1Balance = useCurrencyBalance(account || undefined, poolInfo.currencyAmountTotal1.currency)

  const maxSwapAmount1Limit = useMaxSwapAmount1Limit(poolInfo)

  const handleMaxButtonClick = useCallback(() => {
    if (!userToken1Balance) {
      setBidAmount('0')
      return
    }
    const minimum = [userToken1Balance, maxSwapAmount1Limit].reduce((pre, cur) => {
      return !pre ? cur : cur.greaterThan(pre) ? pre : cur
    }, userToken1Balance)

    setBidAmount(minimum?.toSignificant(64, { groupSeparator: '' }) || '0')
  }, [maxSwapAmount1Limit, setBidAmount, userToken1Balance])

  const formattedTokenWillGet = bidAmount
    ? formatNumber(new BigNumber(bidAmount).div(poolInfo.ratio), { unit: 0 })
    : '0'

  return (
    <>
      <NumberInput
        sx={{ mt: 12 }}
        fullWidth
        value={bidAmount}
        placeholder={`Enter ${poolInfo.token1.symbol} amount`}
        onUserInput={value => {
          setBidAmount(value)
        }}
        endAdornment={
          <>
            <Button size="small" variant="outlined" sx={{ mr: 20, minWidth: 60 }} onClick={handleMaxButtonClick}>
              Max
            </Button>
            <TokenImage alt={poolInfo.token1.symbol} src={poolInfo.token1.largeUrl} size={24} />
            <Typography sx={{ ml: 8, whiteSpace: 'nowrap' }}>{poolInfo.token1.symbol}</Typography>
          </>
        }
      />

      <PoolInfoItem title="Token you will receive" sx={{ mt: 8 }}>
        {formattedTokenWillGet} {poolInfo.token0.symbol}
      </PoolInfoItem>
    </>
  )
}

export default BidAmountInput
