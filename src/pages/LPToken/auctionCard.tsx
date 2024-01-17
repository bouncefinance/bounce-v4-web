import { Box, Stack, Typography } from '@mui/material'
import PoolInformation from './components/poolInformation'
import PoolDetail from './components/poolDetail'
import { RandomSelectionLPProps } from 'api/pool/type'
import useBreakpoint from 'hooks/useBreakpoint'
const AuctionCard = ({ poolInfo }: { poolInfo: RandomSelectionLPProps }) => {
  const isSm = useBreakpoint('sm')
  return (
    <Box sx={{ width: '100%', background: '#F6F6F3' }}>
      <Box sx={{ width: '100%', maxWidth: 1440, margin: '0 auto', px: isSm ? 0 : 72, pt: isSm ? 20 : 84, mt: 9 }}>
        <Stack flexDirection={'row'} justifyContent={'space-between'} mb={40}>
          <Typography
            sx={{
              fontFamily: 'Public Sans',
              fontSize: isSm ? 22 : 36,
              fontStyle: 'normal',
              fontWeight: 600,
              paddingLeft: isSm ? 16 : 0,
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
        <Stack
          flexDirection={isSm ? 'column-reverse' : 'row'}
          gap={isSm ? 20 : 40}
          sx={{
            padding: isSm ? '24px 16px' : '48px 56px',
            borderRadius: isSm ? '24px 24px 0 0' : 24,
            background: '#FFF'
          }}
        >
          <Box flex="1" mt={0}>
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
