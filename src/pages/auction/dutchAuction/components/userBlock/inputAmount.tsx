import { useCallback } from 'react'
import { Typography, styled } from '@mui/material'
import TokenImage from 'bounceComponents/common/TokenImage'
// import { formatNumber } from 'utils/number'
import NumberInput from 'bounceComponents/common/NumberInput'
import { DutchAuctionPoolProp } from 'api/pool/type'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks'
// import { BigNumber } from 'bignumber.js'
interface RegretAmountInputProps {
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
  //   const maxAmount1PerWallet = Number(poolInfo.maxAmount0PerWallet)
  const maxAmount0PerWallet = poolInfo?.maxAmount1PerWallet || 10 // TODO: new param is maxAmount0PerWallet that take place of maxAmount1PerWallet
  const userToken0Balance = useCurrencyBalance(account || undefined, poolInfo.currencyAmountTotal0?.currency)
  const handleMaxButtonClick = useCallback(() => {
    // const currentPrice = poolInfo.currencyCurrentPrice?.toSignificant() || 0
    // const maxAmount0PerWallet = formatNumber(BigNumber(20).times(currentPrice).toString(), {
    //   unit: poolInfo.token0.decimals,
    //   decimalPlaces: poolInfo.token0.decimals
    // })

    const swappedAmount0 =
      poolInfo?.currencySwappedAmount0 &&
      poolInfo?.currencyAmountTotal0 &&
      poolInfo?.currencyAmountTotal0?.subtract(poolInfo?.currencySwappedAmount0)
    const result = Math.min(
      Number(swappedAmount0?.toSignificant()),
      Number(userToken0Balance?.toSignificant()),
      Number(maxAmount0PerWallet)
    )
    console.log(
      'swappedAmount0 userToken0Balance, maxAmount0PerWallet',
      swappedAmount0,
      userToken0Balance?.toSignificant(),
      maxAmount0PerWallet
    )
    setAmount(result + '')
  }, [
    poolInfo?.currencySwappedAmount0,
    poolInfo?.currencyAmountTotal0,
    userToken0Balance,
    maxAmount0PerWallet,
    setAmount
  ])

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
          <TokenImage alt={poolInfo.token0.symbol} src={poolInfo.token0.largeUrl} size={24} />
          <Typography sx={{ ml: 8 }}>{poolInfo.token0.symbol}</Typography>
        </>
      }
    />
  )
}

export default AmountInput
