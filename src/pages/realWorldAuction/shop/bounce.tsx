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
import KeepTouch from './components/bounceKeepTouch'
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
              Bounce Finance is a decentralized platform dedicated to meeting the evolving needs of the Web3 space.
              Established in 2020, Bounce Finance is proudly known for outstanding user experience and seamless
              integration of blockchain technology in trading both digital and tangible assets. We provide a
              decentralized auction protocol that empowers users to create and participate in diverse types of auctions
              on multiple blockchain networks. With a focus on Auction as a Service, Bounce Finance offers a wide range
              of products, including Token & NFT Auctions, Real-World Collectible Auctions, Ad Space Auction, and SDKs &
              Plug-Ins. Bounce Finance also provides Private Launchpad services, an on-chain solution designed to
              streamline IDOs for new projects.
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
