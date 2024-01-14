import { Box, Typography } from '@mui/material'
import { PoolStatus } from 'api/pool/type'
import PoolStatusBox from 'bounceComponents/fixed-swap/ActionBox/PoolStatus'

const Header = () => {
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

      <PoolStatusBox status={PoolStatus.Upcoming} claimAt={0} openTime={1705331413} closeTime={1705331413} />
    </Box>
  )
}
export default Header
