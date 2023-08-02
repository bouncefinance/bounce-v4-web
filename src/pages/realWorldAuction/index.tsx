import { Box, SxProps, Theme, styled, Typography } from '@mui/material'
import HeaderTab from 'bounceComponents/auction/HeaderTab'
import FooterPc from 'components/Footer/FooterPc'
import ArrowBanner from './components/shop/banner'
import { useIsSMDown } from 'themes/useTheme'
import ValuesProvider from 'bounceComponents/real-world-collectibles/ValuesProvider'
import ShopLogoList from './components/shop/shopLogoList'
import { useEffect } from 'react'
import ShopList from './components/shop/shopList'
import ApplyShop from './components/shop/applyShop'
export enum TabsType {
  'auction' = 0,
  'buynow' = 1
}
const ComTitle = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '106px',
  borderTop: '1px solid #000',
  borderBottom: '1px solid #000',
  '.title': {
    width: '100%',
    maxWidth: '1296px',
    margin: '0 auto',
    fontFamily: `'Instrument Serif'`,
    fontSize: 64
  },
  [theme.breakpoints.down('md')]: {
    height: '55px',
    '.title': {
      width: '100%',
      padding: '0 16px',
      fontSize: 32
    }
  }
}))

export default function RealWorldAuction({ sx }: { sx?: SxProps<Theme> | undefined }) {
  const isSm = useIsSMDown()
  useEffect(() => {
    document.getElementsByTagName('body')[0].setAttribute('style', 'background:#fff;')
    return () => {
      document.getElementsByTagName('body')[0].removeAttribute('style')
    }
  }, [])
  return (
    <ValuesProvider>
      <Box
        sx={{
          padding: isSm ? '0' : '0 60px 0',
          background: '#fff',
          ...sx
        }}
      >
        <HeaderTab />
        <ArrowBanner />
      </Box>
      <ComTitle
        sx={{
          marginTop: isSm ? '55px' : '100px'
        }}
      >
        <Typography className="title">FEATURED SHOPS</Typography>
      </ComTitle>
      <ShopLogoList />
      <ComTitle>
        <Typography className="title">UPCOMING DROPS</Typography>
      </ComTitle>
      <ShopList />
      <ApplyShop />
      <Box
        sx={{
          width: '100%',
          background: '#F6F6F3'
        }}
      >
        <FooterPc />
      </Box>
    </ValuesProvider>
  )
}
