import { Box } from '@mui/material'
import { MobileInfo } from './components/info'
import { MobileManBox } from './components/manBox'
import { MobileBarcode } from './components/barcode'
import { useEffect, useState } from 'react'
import { RandomPoolStatus, RandomSelectionNFTProps, RandomSelectionNFTResultProps } from 'api/pool/type'
const MobileLiveCard = ({
  isZoom,
  poolInfo,
  allStatus
}: {
  isZoom?: boolean
  poolInfo: RandomSelectionNFTProps
  allStatus: RandomSelectionNFTResultProps
}) => {
  const [zoom, setZoom] = useState(1)
  const setZoomHandle = () => {
    const w = window.innerWidth
    if (w <= 360) {
      const z = (w - 66) / 294
      setZoom(z)
    }
  }
  useEffect(() => {
    setZoomHandle()
    window.addEventListener('resize', setZoomHandle)
    return () => {
      window.removeEventListener('resize', setZoomHandle)
    }
  }, [])
  const packMobileInfo = <MobileInfo poolInfo={poolInfo} />
  const packMobileManBox = <MobileManBox poolInfo={poolInfo} allStatus={allStatus} />
  // Already participated or max number
  if (
    (allStatus.isUserJoined && allStatus.poolStatus === RandomPoolStatus.Live) ||
    (allStatus.poolStatus === RandomPoolStatus.Live && poolInfo.curPlayer === poolInfo.maxPlayere)
  ) {
    return (
      <Box sx={{ padding: '0 33px', mt: 20 }}>
        <Box
          sx={{
            width: 294,
            zoom: 1,
            margin: '0 auto'
          }}
        >
          <Box sx={{ transform: 'rotate(-12deg)', zIndex: 3, position: 'relative', top: 1, left: 1 }}>
            {packMobileInfo}
          </Box>

          {/* <div style={{ transform: 'translateX(-15px) rotate(7deg)', position: 'relative', zIndex: 0 }}> */}
          {packMobileManBox}
          <MobileBarcode />
          {/* </div> */}
        </Box>
      </Box>
    )
  }
  // close and No participants
  else if (allStatus.poolStatus === RandomPoolStatus.Waiting && !poolInfo.curPlayer) {
    return (
      <Box sx={{ padding: '0 33px', mt: 90 }}>
        <Box
          sx={{
            width: 294,
            zoom: 1,
            margin: '0 auto',
            transform: 'rotate(5deg)'
          }}
        >
          {packMobileInfo}
          {packMobileManBox}
          <MobileBarcode />
        </Box>
      </Box>
    )
  } else if (
    allStatus.poolStatus === RandomPoolStatus.Waiting ||
    (allStatus.poolStatus === RandomPoolStatus.Closed && !allStatus.isUserJoined)
  ) {
    return (
      <Box sx={{ padding: '0 33px', mt: allStatus.poolStatus === RandomPoolStatus.Waiting ? 41.5 : 90 }}>
        <Box
          sx={{
            width: 294,
            zoom: 1,
            margin: '0 auto'
          }}
        >
          <Box sx={{ position: 'relative', right: -20, top: 5, transform: 'rotate(-4.64deg)', zIndex: 3 }}>
            {packMobileInfo}
          </Box>
          <Box sx={{ position: 'relative', left: -12, top: 0, transform: 'rotate(7.64deg)', zIndex: 2 }}>
            {packMobileManBox}
            <MobileBarcode />
          </Box>
        </Box>
      </Box>
    )
  }
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
        {packMobileInfo}
        <div style={{ position: 'relative', zIndex: 0 }}>
          {packMobileManBox}
          <MobileBarcode />
        </div>
      </Box>
    </Box>
  )
}
export default MobileLiveCard
