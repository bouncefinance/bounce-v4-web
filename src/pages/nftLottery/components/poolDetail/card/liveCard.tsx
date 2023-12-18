import { Box, Stack } from '@mui/material'
import Info from './components/info'
import ManBox from './components/manBox'
import Barcode from './components/barcode'

const LiveCard = () => {
  return (
    <Box width={1076} height={412} sx={{ margin: '0 auto', overflow: 'hidden' }}>
      <Stack flexDirection={'row'}>
        <Info />
        <ManBox />
        <Barcode />
      </Stack>
    </Box>
  )
}

export default LiveCard
