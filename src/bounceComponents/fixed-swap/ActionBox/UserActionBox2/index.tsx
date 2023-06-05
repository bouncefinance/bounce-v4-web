import { Box } from '@mui/material'

import Header from './Header'
import InfoList from './InfoList'
import ActionBlock from './ActionBlock'
import { FixedSwapPoolProp } from 'api/pool/type'

const UserActionBox2 = ({ poolInfo, getPoolInfo }: { poolInfo: FixedSwapPoolProp; getPoolInfo: () => void }) => {
  return (
    <Box sx={{ flex: 1, pt: 28 }}>
      <Header poolInfo={poolInfo} getPoolInfo={getPoolInfo} />

      <InfoList poolInfo={poolInfo} getPoolInfo={getPoolInfo} />

      {poolInfo.contract && <ActionBlock poolInfo={poolInfo} getPoolInfo={getPoolInfo} />}
    </Box>
  )
}

export default UserActionBox2
