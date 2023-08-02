import { Box, Typography } from '@mui/material'
import ShopBanner from './components/shopBanner'
import BounceBanner from 'assets/imgs/realworldShop/bounceBanner.png'
import BounceBannerMobile from 'assets/imgs/realworldShop/bounce/mobileBanner.png'
import BounceLogo from 'assets/imgs/realworldShop/bounceLogo.png'
import BounceLogoMobile from 'assets/imgs/realworldShop/bounce/bounceLogoMobile.png'
import { BannerType } from './components/shopBanner'
import { useEffect } from 'react'
import ValuesProvider from 'bounceComponents/real-world-collectibles/ValuesProvider'
import P1 from 'assets/imgs/realworldShop/bounce/p1.png'
import P2 from 'assets/imgs/realworldShop/bounce/p2.png'
import { useIsMDDown } from 'themes/useTheme'
import ProductSwiper from './components/productSwiper'
import KeepTouch from './components/keepTouch'
import FooterPc from 'components/Footer/FooterPc'

const BounceShop = () => {
  const isMd = useIsMDDown()
  useEffect(() => {
    document.getElementsByTagName('body')[0].setAttribute('style', 'background:#fff;')
    return () => {
      document.getElementsByTagName('body')[0].removeAttribute('style')
    }
  }, [])
  const bannerData: BannerType = {
    banner: BounceBanner,
    bannerMobile: BounceBannerMobile,
    logo: BounceLogo,
    logoMobile: BounceLogoMobile,
    name: 'BOUNCE'
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
        <img
          style={{
            display: 'block',
            width: '100%'
          }}
          src={P1}
          alt=""
          srcSet=""
        />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexFlow: isMd ? 'column nowrap' : 'row nowrap',
            justifyContent: 'space-between',
            alignItems: 'center'
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
                fontFamily: `'Inter'`,
                fontSize: isMd ? 14 : 16,
                fontWeight: 400,
                color: '#20201E',
                textAlign: 'center'
              }}
            >
              FOUNDO is a web3-native jewellery brand that leverages web3 technology and culture, with a focus on
              digital art, to provide customer centric products and experiences. The FOUNDO team have experience growing
              another jewellery brand from zero to over $100M within 3 years previously and are now building FOUNDO as a
              more ambitious, higher-end brand while integrating web3 IP to growth hack the brand-building process.
            </Typography>
          </Box>
          <img
            style={{
              display: 'block',
              width: '100%'
            }}
            src={P2}
            alt=""
          />
        </Box>
        <ProductSwiper />
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
export default BounceShop
