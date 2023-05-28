import { Box, Typography } from '@mui/material'

import PoolStatusBox from '../PoolStatus'
import { FixedSwapPoolProp } from 'api/pool/type'
const Header = ({
  poolInfo,
  getPoolInfo,
  isJoined
}: {
  poolInfo: FixedSwapPoolProp
  getPoolInfo: () => void
  isJoined: boolean
}) => {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h2">{!!isJoined ? 'You Joined' : 'Join The Pool'}</Typography>
      {poolInfo && (
        <PoolStatusBox
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
