import { Box } from '@mui/material'
import InputAmount from './userBlock/inputAmount'
import { DutchAuctionPoolProp } from 'api/pool/type'
import { useState } from 'react'
const Bid = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
  const [amount, setAmount] = useState('')
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
