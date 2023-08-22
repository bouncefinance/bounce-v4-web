import { Box, SxProps, Theme, styled, Typography } from '@mui/material'
import HeaderTab from 'bounceComponents/auction/HeaderTab'
import FooterPc from 'components/Footer/FooterPc'
import ArrowBanner from './shop/components/banner'
import { useIsSMDown } from 'themes/useTheme'
import ValuesProvider from 'bounceComponents/real-world-collectibles/ValuesProvider'
import ShopLogoList from './shop/components/shopLogoList'
import { useEffect } from 'react'
import ShopList from './shop/components/shopList'
import ApplyShop from './shop/components/applyShop'
export enum TabsType {
  'auction' = 0,
  'buynow' = 1
}
const ComTitle = styled(Box)(({ theme }) => ({
  width: '100%',
  height: '106px',
  borderTop: '1px solid #000',
  borderBottom: '1px solid #000',
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  '.title': {
    width: '100%',
    margin: '0 auto',
    paddingLeft: '72px',
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
      <HeaderTab
        style={{
          maxWidth: '100%'
        }}
      />
      <Box
        sx={{
          padding: isSm ? '0' : '0 72px 0',
          background: '#fff',
          '@media(max-width:1920px)': {
            // maxWidth: '1296px',
            margin: '0 auto'
          },
          ...sx
        }}
      >
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
