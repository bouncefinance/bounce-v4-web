import { Button } from '@mui/material'
import { FixedSwapPoolProp } from 'api/pool/type'

export interface GoToCheckButtonProps {
  onClick: () => void
  bidAmount: string
  poolInfo: FixedSwapPoolProp
}

const GoToCheckButton = ({ onClick, bidAmount, poolInfo }: GoToCheckButtonProps) => {
  return (
    <Button
      variant="contained"
      fullWidth
      sx={{ mt: 24 }}
      onClick={onClick}
      disabled={!bidAmount || !poolInfo.whitelistData?.isUserInWhitelist || poolInfo.whitelistData?.loading}
    >
      Place a Bid
    </Button>
  )
}

export default GoToCheckButton
