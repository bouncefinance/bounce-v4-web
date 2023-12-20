import { Box } from '@mui/material'
import BeforeOpenLottery from './beforeOpenLottery'
import AfterOpenLottery from './afterOpenLottery'
import useBreakpoint from 'hooks/useBreakpoint'

const PoolDetail = () => {
  const isMd = useBreakpoint('md')
  return (
    <Box
      sx={{
        background: '#eeece6',
        padding: isMd ? '48px 0' : '120px 0'
      }}
    >
      {true && <BeforeOpenLottery />}
      {false && <AfterOpenLottery />}
    </Box>
  )
}
export default PoolDetail
