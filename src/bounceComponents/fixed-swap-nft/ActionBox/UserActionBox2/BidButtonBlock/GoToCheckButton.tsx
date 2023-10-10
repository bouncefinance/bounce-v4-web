import { Button } from '@mui/material'
import { PoolType } from 'api/pool/type'
import { FixedSwapPoolParams } from 'bounceComponents/fixed-swap-nft/MainBlock/UserMainBlock'
import { useIsUserInAllWhitelist } from 'bounceHooks/auction/useIsUserInWhitelist'

export interface GoToCheckButtonProps {
  onClick: () => void
  bidAmount: string
}

const GoToCheckButton = ({ onClick, bidAmount, poolInfo }: GoToCheckButtonProps & FixedSwapPoolParams) => {
  const { isUserInWhitelist, loading: isCheckingWhitelist } = useIsUserInAllWhitelist(
    poolInfo.chainId,
    poolInfo.poolId,
    poolInfo.enableWhiteList,
    PoolType.fixedSwapNft
  )

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
