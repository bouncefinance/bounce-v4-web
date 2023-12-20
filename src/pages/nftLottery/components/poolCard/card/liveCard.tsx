import { Box, Stack } from '@mui/material'
import Info from './components/info'
import ManBox from './components/manBox'
import Barcode from './components/barcode'
import useBreakpoint from 'hooks/useBreakpoint'
import { useCallback, useEffect, useState } from 'react'

const LiveCard = ({ isZoom }: { isZoom: boolean }) => {
  const isMd = useBreakpoint('md')
  const isSm = useBreakpoint('sm')
  const [zoom, setZoom] = useState(1)
  const setZoomHandle = useCallback(() => {
    const w = window.innerWidth
    if (w <= 1100 && !isSm) {
      const z = (w - 40) / 1076
      setZoom(z)
    }
  }, [isSm])
  useEffect(() => {
    setZoomHandle()
    window.addEventListener('resize', setZoomHandle)
    return () => {
      window.removeEventListener('resize', setZoomHandle)
    }
  }, [setZoomHandle])
  return (
    <Box sx={{ width: 'max-content', margin: '0 auto', marginTop: isMd ? 24 : 64, overflow: 'hidden' }}>
      <Stack flexDirection={'row'} sx={{ zoom: isZoom ? 0.7 : zoom }}>
        <Info />
        <ManBox />
        <Barcode />
      </Stack>
    </Box>
  )
}

export default LiveCard
