import { Box, Stack } from '@mui/material'
import PoolInformation from './components/poolInformation'
import PoolDetail from './components/poolDetail'
import { RandomSelectionLPProps } from 'api/pool/type'
import useBreakpoint from 'hooks/useBreakpoint'
const AuctionCard = ({ poolInfo }: { poolInfo: RandomSelectionLPProps }) => {
  const isSm = useBreakpoint('sm')
  return (
    <Box sx={{ width: '100%', background: '#F6F6F3' }}>
      <Box sx={{ width: '100%', maxWidth: 1440, margin: '0 auto', px: isSm ? 0 : 72, pt: isSm ? 20 : 84, mt: 9 }}>
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
