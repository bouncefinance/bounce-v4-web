import { Box, Button, Stack } from '@mui/material'

export interface BidOrRegretBlockProps {
  onBidButtonClick: () => void
  onRegretButtonClick: () => void
  hideRegret?: boolean
}

const BidOrRegret = ({ onBidButtonClick, onRegretButtonClick, hideRegret }: BidOrRegretBlockProps) => {
  return (
    <Box>
      <Stack spacing={16}>
        <Button variant="contained" fullWidth onClick={onBidButtonClick}>
          Place a Bid
        </Button>

        {!hideRegret && (
          <Button variant="outlined" fullWidth onClick={onRegretButtonClick}>
            Regret and Get fund back
          </Button>
        )}
      </Stack>
    </Box>
  )
}

export default BidOrRegret
