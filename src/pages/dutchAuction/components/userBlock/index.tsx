import { Box } from '@mui/material'
import UserPoolStatusBox from './poolStatus'
import LeftBox from '../creatorBlock/left'
import RightBox from './right'
const UserBlock = ({ poolInfo }: { poolInfo: any }) => {
  return (
    <Box
      sx={{
        width: '100%',
        background: '#121212',
        borderRadius: '24px',
        padding: '30px'
      }}
      mb={'40px'}
    >
      <UserPoolStatusBox
        status={poolInfo.status}
        currentTotal0={poolInfo.currentTotal0}
        hiddenStatus={poolInfo.participant.claimed}
      />
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center',
          alignItems: 'flex-start',
          paddingTop: '30px'
        }}
        gap={'30px'}
      >
        <Box
          sx={{
            flex: 400
          }}
        >
          <LeftBox poolInfo={poolInfo} />
        </Box>
        <Box
          sx={{
            flex: 474
          }}
        >
          <RightBox poolInfo={poolInfo} />
        </Box>
      </Box>
    </Box>
  )
}
export default UserBlock
