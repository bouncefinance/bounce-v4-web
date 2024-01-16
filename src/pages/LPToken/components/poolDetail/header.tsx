import { Box, Typography } from '@mui/material'
import { PoolStatus, RandomSelectionLPProps } from 'api/pool/type'
import PoolStatusBox from 'bounceComponents/fixed-swap/ActionBox/PoolStatus'

const Header = ({ poolInfo }: { poolInfo: RandomSelectionLPProps }) => {
  return (
    <Box sx={{ p: 10, display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography
        sx={{
          color: '#000',

          /* D/H4 */
          fontfamily: 'Inter',
          fontSize: 20,
          fontStyle: 'normal',
          fontWeight: 600,
          lineHeight: '140%' /* 28px */,
          letterSpacing: '-0.4px'
        }}
      >
        Join The Pool
      </Typography>

      <PoolStatusBox
        status={PoolStatus.Upcoming}
        claimAt={poolInfo.claimAt}
        openTime={poolInfo.openAt}
        closeTime={poolInfo.closeAt}
      />
    </Box>
  )
}
export default Header
