import { Box, Typography, Grid } from '@mui/material'
import ShopBanner from './components/shopBanner'
import BannerImg from 'assets/imgs/realworldShop/foundo/banner.png'
import BannerMobileImg from 'assets/imgs/realworldShop/foundo/bannerMobile.png'
import LogoIcon from 'assets/imgs/realworldShop/foundo/logo.png'
import LogoMobileIcon from 'assets/imgs/realworldShop/foundo/logoMobile.png'
import { BannerType } from './components/shopBanner'
import { useEffect } from 'react'
import ValuesProvider from 'bounceComponents/real-world-collectibles/ValuesProvider'
import P1 from 'assets/imgs/realworldShop/foundo/p1.png'
import P2 from 'assets/imgs/realworldShop/foundo/p2.png'
import P3 from 'assets/imgs/realworldShop/foundo/p3.png'
import P4 from 'assets/imgs/realworldShop/foundo/p4.png'
import { useIsMDDown } from 'themes/useTheme'
import KeepTouch from './components/foundoKeepTouch'
import FooterPc from 'components/Footer/FooterPc'

const FoundoShop = () => {
  const isMd = useIsMDDown()
  useEffect(() => {
    document.getElementsByTagName('body')[0].setAttribute('style', 'background:#fff;')
    return () => {
      document.getElementsByTagName('body')[0].removeAttribute('style')
    }
  }, [])
  const bannerData: BannerType = {
    banner: BannerImg,
    bannerMobile: BannerMobileImg,
    logo: LogoIcon,
    logoMobile: LogoMobileIcon,
    name: 'FOUNDO'
  }
  return (
    <ValuesProvider>
      <ShopBanner bannerData={bannerData} />
      <Box
        sx={{
          boxSizing: 'border-box',
          padding: isMd ? '64px 16px' : '120px 0',
          width: '100%',
          maxWidth: '1296px',
          margin: '0 auto',
          display: 'flex',
          flexFlow: 'column nowrap'
        }}
        gap={isMd ? '40px' : '80px'}
      >
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center',
            alignItems: 'center'
          }}
          gap={'40px'}
        >
          <Typography
            sx={{
              fontVariantNumeric: `'lining-nums proportional-nums'`,
              fontFamily: `'Instrument Serif'`,
              fontSize: isMd ? 32 : 64,
              fontWeight: 400,
              textTransform: 'uppercase',
              color: '#121212',
              textAlign: 'center'
            }}
          >
            About BOUNCE
          </Typography>
          <Typography
            sx={{
              maxWidth: 600,
              fontFamily: `'Inter'`,
              fontSize: isMd ? 14 : 16,
              fontWeight: 400,
              color: '#20201E',
              textAlign: 'center'
            }}
          >
            FOUNDO is a web3-native jewellery brand that leverages web3 technology and culture, with a focus on digital
            art, to provide customer centric products and experiences. The FOUNDO team have experience growing another
            jewellery brand from zero to over $100M within 3 years previously and are now building FOUNDO as a more
            ambitious, higher-end brand while integrating web3 IP to growth hack the brand-building process.
          </Typography>
        </Box>
        <Grid container columnGap={'24px'} wrap={isMd ? 'wrap' : 'nowrap'} rowGap={'40px'}>
          <Grid item xs={12} md={12} lg={4}>
            <img
              style={{
                display: 'block',
                width: '100%',
                objectFit: 'cover'
              }}
              src={P1}
              alt=""
            />
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <img
              style={{
                display: 'block',
                width: '100%',
                objectFit: 'cover'
              }}
              src={P2}
              alt=""
            />
          </Grid>
          <Grid item xs={12} md={12} lg={4}>
            <img
              style={{
                display: 'block',
                width: '100%',
                objectFit: 'cover'
              }}
              src={P3}
              alt=""
            />
          </Grid>
        </Grid>
        <img
          style={{
            display: 'block',
            width: '100%',
            objectFit: 'cover'
          }}
          src={P4}
          alt=""
        />
        <KeepTouch />
      </Box>
      <Box
        sx={{
          width: '100%',
          background: '#fff'
        }}
      >
        <FooterPc />
      </Box>
    </ValuesProvider>
  )
}
export default FoundoShop
