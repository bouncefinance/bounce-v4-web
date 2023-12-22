import { Box } from '@mui/material'
import LeftBox from './LeftBox'
import UserActionBox2 from '../../ActionBox/UserActionBox2'
import Alert from './Alert'
import { FixedSwapPoolProp } from 'api/pool/type'
import PoolStepper from 'bounceComponents/randomSelection/Stepper'

const UserMainBlock = ({
  poolInfo,
  getPoolInfo,
  isWinnerSeedDone
}: {
  poolInfo: FixedSwapPoolProp
  getPoolInfo: () => void
  isWinnerSeedDone?: boolean
}): JSX.Element => {
  return (
    <Box
      sx={{
        borderRadius: 20,
        padding: { xs: 20, md: 48 },
        bgcolor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        rowGap: 12
      }}
    >
      <Alert poolInfo={poolInfo} />
      <Box display={'grid'} sx={{ gridTemplateColumns: { xs: '100%', md: '44% 1fr' } }} gap={20} mt={20}>
        <LeftBox poolInfo={poolInfo} />
        {/* <UserActionBox /> */}
        <UserActionBox2 poolInfo={poolInfo} getPoolInfo={getPoolInfo} isWinnerSeedDone={isWinnerSeedDone} />
      </Box>
      <PoolStepper poolInfo={poolInfo} />
    </Box>
  )
}

export default UserMainBlock
