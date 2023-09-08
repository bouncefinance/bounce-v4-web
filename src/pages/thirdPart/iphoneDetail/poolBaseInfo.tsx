import { Box, Typography } from '@mui/material'
import { MutantEnglishAuctionNFTPoolProp } from 'api/pool/type'
import { useIsSMDown } from 'themes/useTheme'
import PriceChartView from '../foundoComponents/snippet/PriceChartView'

const PoolBaseInfo = ({ poolInfo }: { poolInfo: MutantEnglishAuctionNFTPoolProp }) => {
  const isSm = useIsSMDown()
  return (
    <Box
      sx={{
        width: isSm ? '100%' : '458px',
        padding: { xs: '40px 0', sm: '120px 0' },
        borderBottom: { xs: '1px solid rgba(255, 255, 255, 0.4)', sm: 'none' },
        marginBottom: isSm ? '43px' : '0'
      }}
    >
      <Typography
        sx={{
          fontFamily: `'Public Sans'`,
          fontWeight: 600,
          fontSize: isSm ? 20 : 36,
          color: '#fff',
          lineHeight: '34px',
          marginBottom: '16px'
        }}
      >
        {poolInfo?.name || '--'}
      </Typography>
      <Typography
        sx={{
          fontFamily: `'Public Sans'`,
          fontWeight: 600,
          fontSize: 14,
          color: 'var(--ps-text-2)',
          lineHeight: '34px',
          marginBottom: '16px'
        }}
      >
        NFT issued by BOUNCE
      </Typography>
      <Box
        sx={{
          display: 'inline-block',
          height: '29px',
          lineHeight: '29px',
          padding: '0 12px',
          cursor: 'pointer',
          color: 'var(--ps-text-3)',
          borderRadius: '100px',
          background: '#fff',
          whiteSpace: 'nowrap',
          fontSize: isSm ? 13 : 14
        }}
      >
        Physically Backed NFT
      </Box>
      {poolInfo && <PriceChartView isDark poolInfo={poolInfo} />}
    </Box>
  )
}
export default PoolBaseInfo
