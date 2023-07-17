import { Box } from '@mui/material'
import InputAmount, { RegretAmountInputProps } from './inputAmount'
const BidInput = ({ amount, setAmount, poolInfo, maxValue }: RegretAmountInputProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center'
      }}
    >
      <InputAmount maxValue={maxValue} poolInfo={poolInfo} amount={amount} setAmount={setAmount} />
    </Box>
  )
}
export default BidInput
