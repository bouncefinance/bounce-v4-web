import { Box } from '@mui/material'
import { MobileInfo } from './components/info'
import { MobileManBox } from './components/manBox'
import { MobileBarcode } from './components/barcode'

const MobileLiveCard = () => {
  return (
    <Box sx={{ padding: '0 33px' }} mt={24}>
      <MobileInfo />
      <MobileManBox />
      <MobileBarcode />
    </Box>
  )
}
export default MobileLiveCard
