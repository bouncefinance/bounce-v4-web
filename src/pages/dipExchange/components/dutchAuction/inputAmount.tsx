import { useCallback } from 'react'
import { Typography, styled } from '@mui/material'
import TokenImage from 'bounceComponents/common/TokenImage'
// import { formatNumber } from 'utils/number'
import NumberInput from 'bounceComponents/common/NumberInput'
import { DutchAuctionPoolProp } from 'api/pool/type'
import { DisplayTokenType } from './bidInput'
export interface RegretAmountInputProps {
  amount: string
  setAmount: (value: string) => void
  poolInfo: DutchAuctionPoolProp
  tokenType?: DisplayTokenType
  maxValue: number | string
}
const NumInput = styled(NumberInput)(() => ({
  background: '#F6F6F3',
  width: '100%',
  border: '1px solid #F6F6F3',
  color: '#121212',
  borderRadius: '8px',
  '.MuiOutlinedInput.Mui-focused': {
    border: '1px solid #F6F6F3 !important'
  },
  '.MuiOutlinedInput-notchedOutline': {
    border: '1px solid #F6F6F3 !important'
  },
  '.MuiOutlinedInput-notchedOutline:hover': {
    border: '1px solid #F6F6F3 !important'
  }
}))
const AmountInput = ({ amount, setAmount, poolInfo, maxValue, tokenType }: RegretAmountInputProps) => {
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
          <TokenImage
            alt={tokenType === DisplayTokenType.token0 ? poolInfo.token0.symbol : poolInfo.token1.symbol}
            src={tokenType === DisplayTokenType.token0 ? poolInfo.token0.largeUrl : poolInfo.token1.largeUrl}
            size={24}
          />
          <Typography sx={{ ml: 8 }}>
            {tokenType === DisplayTokenType.token0
              ? poolInfo.token0.symbol.toUpperCase()
              : poolInfo.token1.symbol.toUpperCase()}
          </Typography>
        </>
      }
    />
  )
}

export default AmountInput
