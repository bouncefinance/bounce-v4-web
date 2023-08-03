import { Box, Typography } from '@mui/material'
import PriceChartView from 'bounceComponents/englishAuction/PriceChartView'
import { useMutantEnglishAuctionPool } from 'hooks/useMutantEnglishAuctionPool'
import { useIsSMDown } from 'themes/useTheme'

const PoolBaseInfo = () => {
  const isSm = useIsSMDown()
  const { data: poolInfo } = useMutantEnglishAuctionPool(20342)
  console.log('🚀 ~ file: poolBaseInfo.tsx:8 ~ PoolBaseInfo ~ poolInfo:', poolInfo)
  return (
    <Box
      sx={{
        width: isSm ? '100%' : '458px',
        padding: '120px 63px 120px 0',
        marginBottom: isSm ? '43px' : '0'
      }}
    >
      <Typography
        sx={{
          fontFamily: `'Public Sans'`,
          fontWeight: 600,
          fontSize: isSm ? 20 : 28,
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
        NFT issued by foundo
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
      {poolInfo && <PriceChartView isDark showText={false} poolInfo={poolInfo} />}
    </Box>
  )
}
export default PoolBaseInfo
