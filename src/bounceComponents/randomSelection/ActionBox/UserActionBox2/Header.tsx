import { Box, Typography } from '@mui/material'

import { FixedSwapPoolProp } from 'api/pool/type'
import PoolStatusBox from 'bounceComponents/fixed-swap/ActionBox/PoolStatus'
const Header = ({
  poolInfo,
  getPoolInfo,
  isJoined,
  isWinnerSeedDone
}: {
  poolInfo: FixedSwapPoolProp
  getPoolInfo: () => void
  isJoined: boolean
  isWinnerSeedDone: boolean
}) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h2">{!!isJoined ? 'You Joined' : 'Join The Pool'}</Typography>
      {poolInfo && (
        <PoolStatusBox
          showParticipantClaim={isJoined && isWinnerSeedDone && !poolInfo.participant.claimed}
          status={poolInfo.status}
          claimAt={poolInfo.claimAt}
          openTime={poolInfo.openAt}
          closeTime={poolInfo.closeAt}
          onEnd={getPoolInfo}
        />
      )}
    </Box>
  )
}

export default Header
