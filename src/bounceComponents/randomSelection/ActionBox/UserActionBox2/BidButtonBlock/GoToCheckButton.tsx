import { Button } from '@mui/material'
import { FixedSwapPoolProp } from 'api/pool/type'
import useIsUserInWhitelist from 'bounceHooks/auction/useIsUserInWhitelist'

export interface GoToCheckButtonProps {
  onClick: () => void
  bidAmount: string
  poolInfo: FixedSwapPoolProp
}

const GoToCheckButton = ({ onClick, bidAmount, poolInfo }: GoToCheckButtonProps) => {
  const { data: isUserInWhitelist, loading: isCheckingWhitelist } = useIsUserInWhitelist(poolInfo, poolInfo.category)

  return (
    <Button
      variant="contained"
      fullWidth
      sx={{ mt: 24 }}
      onClick={onClick}
      disabled={!bidAmount || !isUserInWhitelist || isCheckingWhitelist}
    >
      Place a Bid
    </Button>
  )
}

export default GoToCheckButton
