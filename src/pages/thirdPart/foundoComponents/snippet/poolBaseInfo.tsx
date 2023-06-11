import { Box, Typography } from '@mui/material'
const poolBaseInfo = () => {
  return (
    <Box
      sx={{
        width: '458px'
      }}
    >
      <Typography
        sx={{
          fontFamily: `'Public Sans'`,
          fontWeight: 600,
          fontSize: 28,
          color: '#fff',
          lineHeight: '34px',
          marginBottom: '16px'
        }}
      >
        ROLEX DAYTONA STEEL 2021 40MM 116500LN - FULL BOXES & PAPERS
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
          whiteSpace: 'nowrap'
        }}
      >
        Physically Backed NFT
      </Box>
    </Box>
  )
}
export default poolBaseInfo
