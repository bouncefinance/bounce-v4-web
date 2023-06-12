import { Box, SxProps, Theme } from '@mui/material'
import HeaderTab from 'bounceComponents/auction/HeaderTab'
import ComingSoon from 'pages/ComingSoon'
import FooterPc from 'components/Footer/FooterPc'
import useBreakpoint from 'hooks/useBreakpoint'

export default function AdsAuction({ sx }: { sx?: SxProps<Theme> | undefined }) {
  const isSm = useBreakpoint('sm')
  return (
    <>
      <Box
        sx={{
          padding: isSm ? '0' : '0 60px 40px',
          ...sx
        }}
      >
        <HeaderTab />
        <ComingSoon prompt={'The Ads Auction will be available soon. Please stay tuned.'} />
      </Box>
      <FooterPc />
    </>
  )
}
