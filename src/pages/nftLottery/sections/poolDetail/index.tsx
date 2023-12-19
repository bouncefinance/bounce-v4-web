import { Box } from '@mui/material'
import BeforeOpenLottery from './beforeOpenLottery'
import AfterOpenLottery from './afterOpenLottery'

const PoolDetail = () => {
  return (
    <Box
      sx={{
        background: '#eeece6',
        padding: '120px 0'
      }}
    >
      {false && <BeforeOpenLottery />}
      <AfterOpenLottery />
    </Box>
  )
}
export default PoolDetail
