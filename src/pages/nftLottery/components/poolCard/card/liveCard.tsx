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

  if (false) {
    /* Already participated */
    return (
      <Box sx={{ width: 'max-content', margin: '0 auto', marginTop: isMd ? 24 : 64 }}>
        <Stack flexDirection={'row'} sx={{ zoom: isZoom ? 0.7 : zoom }}>
          <Box sx={{ transform: 'rotate(-10.428deg)', zIndex: 3, position: 'relative', top: 11, left: 27 }}>
            <Info />
          </Box>
          <ManBox />
          <Barcode />
        </Stack>
      </Box>
    )
  } else if (false) {
    // close and not have partner
    return (
      <Box sx={{ width: 'max-content', margin: '0 auto', marginTop: isMd ? 24 : 64 }}>
        <Stack
          flexDirection={'row'}
          sx={{
            zoom: isZoom ? 0.7 : zoom,
            transform: 'rotate(-6deg)',
            paddingBottom: 22,
            position: 'relative',
            top: 22
          }}
        >
          <Box>
            <Info />
          </Box>
          <ManBox />
          <Barcode />
        </Stack>
      </Box>
    )
  } else if (false) {
    // close and  have partner
    return (
      <Box sx={{ width: 'max-content', margin: '0 auto', marginTop: isMd ? 24 : 64 }}>
        <Stack
          flexDirection={'row'}
          sx={{
            zoom: isZoom ? 0.7 : zoom,
            transform: 'rotate(-6deg)',
            paddingBottom: 22,
            position: 'relative',
            top: 22
          }}
        >
          <Box sx={{ transform: 'rotate(-10.428deg)', zIndex: 3, position: 'relative', top: 11, left: 27 }}>
            <Info />
          </Box>
          <ManBox />
          <Barcode />
        </Stack>
      </Box>
    )
  }
  return (
    <Box sx={{ width: 'max-content', margin: '0 auto', marginTop: isMd ? 24 : 64 }}>
      <Stack flexDirection={'row'} sx={{ zoom: isZoom ? 0.7 : zoom }}>
        <Box>
          <Info />
        </Box>
        <ManBox />
        <Barcode />
      </Stack>
    </Box>
  )
}

export default LiveCard
