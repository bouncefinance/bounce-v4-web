import { Box, Stack, Typography } from '@mui/material'
import PoolInformation from './components/poolInformation'
import PoolDetail from './components/poolDetail'
import { RandomSelectionLPProps } from 'api/pool/type'
const AuctionCard = ({ poolInfo }: { poolInfo: RandomSelectionLPProps }) => {
  return (
    <Box sx={{ width: '100%', background: '#F6F6F3' }}>
      <Box sx={{ width: '100%', maxWidth: 1440, margin: '0 auto', px: 72, pt: 84, mt: 9 }}>
        <Stack flexDirection={'row'} justifyContent={'space-between'} mb={40}>
          <Typography
            sx={{
              fontFamily: 'Public Sans',
              fontSize: 36,
              fontStyle: 'normal',
              fontWeight: 600,
              lineHeight: '130%' /* 46.8px */,
              letterSpacing: '-0.72px'
            }}
          >
            Join The Pool
          </Typography>
          {/* <Box sx={{ padding: '12px 14px', borderRadius: 100, border: '1px solid  #20201E' }}>
            <Typography
              sx={{ fontFamily: 'Inter', fontSize: 14, fontStyle: 'normal', fontWeight: 400, lineHeight: '150%' }}
            >
              My private launchpad
            </Typography>
          </Box> */}
        </Stack>
        <Stack flexDirection={'row'} gap={40} sx={{ padding: '48px 56px', borderRadius: 24, background: '#FFF' }}>
          <Box flex="1">
            <PoolInformation poolInfo={poolInfo} />
          </Box>
          <Box flex="1">
            <PoolDetail poolInfo={poolInfo} />
          </Box>
        </Stack>
      </Box>
    </Box>
  )
}
export default AuctionCard
