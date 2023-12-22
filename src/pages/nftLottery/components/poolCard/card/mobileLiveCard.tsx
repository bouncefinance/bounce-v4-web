import { Box } from '@mui/material'
import { MobileInfo } from './components/info'
import { MobileManBox } from './components/manBox'
import { MobileBarcode } from './components/barcode'
import { useEffect, useState } from 'react'
const MobileLiveCard = ({ isZoom }: { isZoom: boolean }) => {
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
      <Box
        sx={{
          width: 294,
          zoom: isZoom ? zoom - 0.34 : zoom,
          margin: '0 auto',
          '&.rotate': { transform: 'rotate(5deg)' }
        }}
        // className={'rotate'}
      >
        <MobileInfo />
        <div style={{ transform: 'translateX(-15px) rotate(7deg)', position: 'relative', zIndex: 0 }}>
          <MobileManBox />
          <MobileBarcode />
        </div>
      </Box>
    </Box>
  )
}
export default MobileLiveCard
