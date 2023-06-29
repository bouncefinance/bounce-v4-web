import { Box, Typography } from '@mui/material'

import PoolStatusBox from '../PoolStatus'
import UpcomingPoolCreatorAlert from '../../Alerts/UpcomingPoolCreatorAlert'
import LivePoolCreatorAlert from '../../Alerts/LivePoolCreatorAlert'
import SuccessfullyClaimedAlert from '../../Alerts/SuccessfullyClaimedAlert'
import FundInfoList from './FundInfoList'
import ButtonBlock from './ButtonBlock'
import { FixedSwapPoolProp, PoolStatus } from 'api/pool/type'

const CreatorActionBox = ({
  poolInfo,
  getPoolInfo
}: {
  poolInfo: FixedSwapPoolProp
  getPoolInfo: () => void
}): JSX.Element => {
  return (
    <Box sx={{ flex: 1, pt: 28 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h2">My Pool</Typography>
        <PoolStatusBox
          showCreatorClaim={poolInfo.creatorClaimed === false}
          status={poolInfo.status}
          openTime={poolInfo.openAt}
          closeTime={poolInfo.closeAt}
          claimAt={poolInfo.claimAt}
          onEnd={getPoolInfo}
        />
      </Box>

      <FundInfoList poolInfo={poolInfo} />

      {poolInfo.contract && <ButtonBlock poolInfo={poolInfo} />}

      {poolInfo.status === PoolStatus.Upcoming && <UpcomingPoolCreatorAlert />}
      {poolInfo.status === PoolStatus.Live && <LivePoolCreatorAlert />}
      {(poolInfo.status === PoolStatus.Closed || poolInfo.status === PoolStatus.Cancelled) &&
        poolInfo.creatorClaimed && <SuccessfullyClaimedAlert />}
    </Box>
  )
}

export default CreatorActionBox
