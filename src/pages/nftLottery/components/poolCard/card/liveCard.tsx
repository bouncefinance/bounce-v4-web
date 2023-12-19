import { Box, Stack } from '@mui/material'
import Info from './components/info'
import ManBox from './components/manBox'
import Barcode from './components/barcode'

const LiveCard = ({ isZoom }: { isZoom: boolean }) => {
  return (
    <Box sx={{ width: 'max-content', margin: '0 auto', marginTop: 64, overflow: 'hidden' }}>
      <Stack flexDirection={'row'} sx={{ zoom: isZoom ? 0.7 : 1 }}>
        <Info />
        <ManBox />
        <Barcode />
      </Stack>
    </Box>
  )
}

export default LiveCard
