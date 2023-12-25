import { Box } from '@mui/material'
import BeforeOpenLottery from './beforeOpenLottery'
import AfterOpenLottery from './afterOpenLottery'
import useBreakpoint from 'hooks/useBreakpoint'
import BgImg from 'assets/imgs/nftLottery/banner/globalBg.png'
const PoolDetail = () => {
  const isMd = useBreakpoint('md')
  return (
    <Box
      sx={{
        background: `url(${BgImg}) repeat`,
        padding: isMd ? '48px 0' : '20px 0'
      }}
    >
      {false && <BeforeOpenLottery />}
      {true && <AfterOpenLottery />}
    </Box>
  )
}
export default PoolDetail
