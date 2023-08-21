import { Box, SxProps, Theme } from '@mui/material'
import HeaderTab from 'bounceComponents/auction/HeaderTab'
import ComingSoon from 'pages/ComingSoon'
import FooterPc from 'components/Footer/FooterPc'
import useBreakpoint from 'hooks/useBreakpoint'

export default function TokenToolBox({ sx }: { sx?: SxProps<Theme> | undefined }) {
  const isSm = useBreakpoint('sm')
  return (
    <>
      <HeaderTab />
      <Box
        sx={{
          padding: isSm ? '0' : '0 60px 40px',
          ...sx
        }}
      >
        <ComingSoon prompt={'The Token ToolBox will be available soon. Please stay tuned.'} />
      </Box>
      <FooterPc />
    </>
  )
}
