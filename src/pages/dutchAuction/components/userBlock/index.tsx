import { Box } from '@mui/material'
import UserPoolStatusBox from './poolStatus'
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
    </Box>
  )
}
export default UserBlock
