import { Box, Typography } from '@mui/material'

import PoolStatusBox from '../PoolStatus'
import { FixedSwapPoolProp } from 'api/pool/type'
import useIsUserJoinedPool from 'bounceHooks/auction/useIsUserJoinedPool'

const Header = ({ poolInfo, getPoolInfo }: { poolInfo: FixedSwapPoolProp; getPoolInfo: () => void }) => {
  const isUserJoinedPool = useIsUserJoinedPool(poolInfo)

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="h2">{isUserJoinedPool ? 'You Joined' : 'Join The Pool'}</Typography>

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
