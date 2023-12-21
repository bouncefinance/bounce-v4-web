import { Box } from '@mui/material'
import { MobileInfo } from './components/info'
import { MobileManBox } from './components/manBox'
import { MobileBarcode } from './components/barcode'
import { useEffect, useState } from 'react'
const MobileLiveCard = () => {
  const [zoom, setZoom] = useState(1)
  const setZoomHandle = () => {
    const w = window.innerWidth
    const z = (w - 66) / 294
    setZoom(z)
  }
  useEffect(() => {
    setZoomHandle()
    window.addEventListener('resize', setZoomHandle)
    return () => {
      window.removeEventListener('resize', setZoomHandle)
    }
  }, [])
  return (
    <Box sx={{ padding: '0 33px' }} mt={24}>
      <div style={{ width: 294, zoom: zoom }}>
        <MobileInfo />
        <MobileManBox />
        <MobileBarcode />
      </div>
    </Box>
  )
}
export default MobileLiveCard
