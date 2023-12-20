import { Box } from '@mui/material'
import MobileBanner from './mobileBanner'
const PcBanner = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        overflowX: 'hidden',
        background: '#eeece6'
      }}
    >
      <MobileBanner />
    </Box>
  )
}
export default PcBanner
