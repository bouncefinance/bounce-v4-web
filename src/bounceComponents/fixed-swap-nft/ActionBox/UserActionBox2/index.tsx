import { Box } from '@mui/material'

import InfoList from './InfoList'
import ActionBlock from './ActionBlock'
import { FixedSwapPoolParams } from 'bounceComponents/fixed-swap-nft/MainBlock/UserMainBlock'
import Header from './Header'

const UserActionBox2 = ({ poolInfo, getPoolInfo }: FixedSwapPoolParams) => {
  return (
    <Box sx={{ flex: 1, pt: 28 }}>
      <Header poolInfo={poolInfo} getPoolInfo={getPoolInfo} />

      <InfoList poolInfo={poolInfo} getPoolInfo={getPoolInfo} />

      {poolInfo.contract && <ActionBlock poolInfo={poolInfo} getPoolInfo={getPoolInfo} />}
    </Box>
  )
}

export default UserActionBox2
