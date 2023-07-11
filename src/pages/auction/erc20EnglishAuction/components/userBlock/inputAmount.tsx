import { useCallback } from 'react'
import { Typography, styled } from '@mui/material'
import TokenImage from 'bounceComponents/common/TokenImage'
// import { formatNumber } from 'utils/number'
import NumberInput from 'bounceComponents/common/NumberInput'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks'
import { useErc20EnglishAuctionPoolInfo } from '../../ValuesProvider'
import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'
export interface RegretAmountInputProps {
  amount: string
  setAmount: (value: string) => void
  poolInfo: Erc20EnglishAuctionPoolProp
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
const AmountInput = ({ amount, setAmount }: RegretAmountInputProps) => {
  const { account } = useActiveWeb3React()
  const { data: poolInfo } = useErc20EnglishAuctionPoolInfo()
  // banlance
  const userToken0Balance = useCurrencyBalance(account || undefined, poolInfo?.currencyAmountTotal0?.currency)
  // MaxAmount0PerWallet from contract, not from http
  const currencyMaxAmount0PerWallet =
    Number(poolInfo?.currencyMaxAmount1PerWallet?.toExact()) > 0
      ? poolInfo?.currencyMaxAmount1PerWallet?.toExact()
      : poolInfo?.currencyAmountTotal0?.toExact()
  // All tradable quantities for token0
  const swappedAmount0 =
    poolInfo?.currencySwappedAmount0 &&
    poolInfo?.currencyAmountTotal0 &&
    poolInfo?.currencyAmountTotal0?.subtract(poolInfo?.currencySwappedAmount0)
  const handleMaxButtonClick = useCallback(() => {
    const result = Math.min(
      Number(swappedAmount0?.toExact()),
      Number(userToken0Balance?.toExact()),
      Number(currencyMaxAmount0PerWallet)
    )
    setAmount(result + '')
  }, [swappedAmount0, userToken0Balance, currencyMaxAmount0PerWallet, setAmount])

  return (
    <NumInput
      sx={{ mt: 12 }}
      fullWidth
      placeholder="Enter"
      value={amount}
      onUserInput={value => {
        setAmount(value)
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
          <TokenImage alt={poolInfo?.token1.symbol} src={poolInfo?.token1.largeUrl} size={24} />
          <Typography sx={{ ml: 8 }}>{poolInfo?.token1.symbol}</Typography>
        </>
      }
    />
  )
}

export default AmountInput
