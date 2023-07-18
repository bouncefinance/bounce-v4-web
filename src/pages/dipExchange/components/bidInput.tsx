import { Box } from '@mui/material'
import InputAmount, { RegretAmountInputProps } from './inputAmount'
export enum DisplayTokenType {
  'token0' = 0,
  'token1' = 1
}
const BidInput = ({ amount, setAmount, poolInfo, maxValue, tokenType }: RegretAmountInputProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center'
      }}
    >
      <InputAmount
        maxValue={maxValue}
        poolInfo={poolInfo}
        amount={amount}
        setAmount={setAmount}
        tokenType={tokenType}
      />
    </Box>
  )
}
export default BidInput
