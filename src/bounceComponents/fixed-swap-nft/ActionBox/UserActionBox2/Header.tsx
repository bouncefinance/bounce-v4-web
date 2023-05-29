import { Box } from '@mui/material'

import PoolStatusBox from '../PoolStatus'
import JoinStatus from '../JoinStatus'
import { FixedSwapPoolParams } from 'bounceComponents/fixed-swap-nft/MainBlock/UserMainBlock'

const Header = (props: FixedSwapPoolParams) => {
  const { poolInfo, getPoolInfo } = props

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
      <JoinStatus poolInfo={poolInfo} />
      <PoolStatusBox
        status={poolInfo.status}
        openTime={poolInfo.openAt}
        closeTime={poolInfo.closeAt}
        onEnd={getPoolInfo}
      />
    </Box>
  )
}

export default Header
