import { Box } from '@mui/material'
import InputAmount, { RegretAmountInputProps } from './userBlock/inputAmount'
const Bid = ({ amount, setAmount, poolInfo }: RegretAmountInputProps) => {
  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center'
      }}
    >
      <InputAmount poolInfo={poolInfo} amount={amount} setAmount={setAmount} />
    </Box>
  )
}
export default Bid
