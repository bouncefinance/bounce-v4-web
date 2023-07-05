import { useCallback, useMemo } from 'react'
import { Typography, styled } from '@mui/material'
import TokenImage from 'bounceComponents/common/TokenImage'
// import { formatNumber } from 'utils/number'
import NumberInput from 'bounceComponents/common/NumberInput'
import { DutchAuctionPoolProp } from 'api/pool/type'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks'
import { BigNumber } from 'bignumber.js'
import { PoolStatus } from 'api/pool/type'

export interface RegretAmountInputProps {
  amount: string
  setAmount: (value: string) => void
  poolInfo: DutchAuctionPoolProp
}
const NumInput = styled(NumberInput)(() => ({
  background: '#121212',
  maxWidth: 'calc(100% - 48px)',
  margin: '0 auto',
  border: '1px solid #121212',
  color: '#fff',
  '.MuiOutlinedInput.Mui-focused': {
    border: '1px solid #E1F25C !important'
  },
  '.MuiOutlinedInput-notchedOutline': {
    border: '1px solid #121212 !important'
  },
  '.MuiOutlinedInput-notchedOutline:hover': {
    border: '1px solid #121212 !important'
  }
}))
const AmountInput = ({ amount, setAmount, poolInfo }: RegretAmountInputProps) => {
  const { account } = useActiveWeb3React()
  const userToken1Balance = useCurrencyBalance(account || undefined, poolInfo.currencyAmountTotal1?.currency)
  // max amount of token0 by token1 banlance
  const userToken0limit = useMemo(() => {
    const highestPrice = poolInfo.highestPrice?.toExact() || 0
    const currencyCurrentPrice = poolInfo.currencyCurrentPrice?.toExact() || 0
    return BigNumber(userToken1Balance?.toExact() || 0)
      .div(poolInfo.status === PoolStatus.Upcoming ? highestPrice : currencyCurrentPrice)
      .toString()
  }, [userToken1Balance, poolInfo.currencyCurrentPrice, poolInfo.status, poolInfo.highestPrice])
  const maxValue = useMemo(() => {
    // MaxAmount0PerWallet from contract, not from http
    const currencyMaxAmount0PerWallet =
      Number(poolInfo.currencyMaxAmount0PerWallet?.toExact()) > 0
        ? poolInfo.currencyMaxAmount0PerWallet?.toExact()
        : poolInfo.currencyAmountTotal0?.toExact()
    // All tradable quantities for token0
    const swappedAmount0 =
      poolInfo?.currencySwappedAmount0 &&
      poolInfo?.currencyAmountTotal0 &&
      poolInfo?.currencyAmountTotal0?.subtract(poolInfo?.currencySwappedAmount0)
    const result = Math.min(
      Number(swappedAmount0?.toExact()),
      Number(userToken0limit),
      Number(currencyMaxAmount0PerWallet)
    )
    return result
  }, [
    poolInfo.currencyAmountTotal0,
    poolInfo.currencyMaxAmount0PerWallet,
    poolInfo?.currencySwappedAmount0,
    userToken0limit
  ])
  const handleMaxButtonClick = useCallback(() => {
    setAmount(maxValue + '')
  }, [maxValue, setAmount])

  return (
    <NumInput
      sx={{ mt: 12 }}
      fullWidth
      placeholder="Enter"
      value={amount}
      onUserInput={value => {
        if (Number(value) >= Number(maxValue)) {
          setAmount(maxValue + '')
        } else {
          setAmount(value)
        }
      }}
      endAdornment={
        <>
          <Typography
            sx={{
              mr: 20,
              fontFamily: `'Inter'`,
              cursor: 'pointer',
              color: '#2B51DA',
              fontSize: '16px',
              textDecoration: 'underline'
            }}
            onClick={handleMaxButtonClick}
          >
            max
          </Typography>
          <TokenImage alt={poolInfo.token0.symbol} src={poolInfo.token0.largeUrl} size={24} />
          <Typography sx={{ ml: 8 }}>{poolInfo.token0.symbol}</Typography>
        </>
      }
    />
  )
}

export default AmountInput
