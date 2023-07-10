import { Box } from '@mui/material'

import JoinStatus from '../JoinStatus'
import { FixedSwapPoolParams } from 'bounceComponents/fixed-swap-nft/MainBlock/UserMainBlock'
import PoolStatusBox from 'bounceComponents/fixed-swap/ActionBox/PoolStatus'

const Header = (props: FixedSwapPoolParams) => {
  const { poolInfo, getPoolInfo } = props

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
      <JoinStatus poolInfo={poolInfo} />
      <PoolStatusBox
        status={poolInfo.status}
        showParticipantClaim={!!Number(poolInfo.participant.swappedAmount0) && !poolInfo.participant.claimed}
        claimAt={poolInfo.claimAt}
        openTime={poolInfo.openAt}
        closeTime={poolInfo.closeAt}
        onEnd={getPoolInfo}
      />
    </Box>
  )
}

export default Header
