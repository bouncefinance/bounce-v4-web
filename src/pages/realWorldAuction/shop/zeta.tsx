import { Box, Typography, Grid, styled, Stack } from '@mui/material'
import ShopBanner from './components/shopBanner'
import BannerImg from 'assets/imgs/realworldShop/zata/banner.png'
import BannerMobileImg from 'assets/imgs/realworldShop/zata/bannerMobile.png'
import LogoIcon from 'assets/imgs/realworldShop/zata/logo.png'
import LogoMobileIcon from 'assets/imgs/realworldShop/zata/logoMobile.png'
import { BannerType } from './components/shopBanner'
import { useEffect, useMemo } from 'react'
import ValuesProvider from 'bounceComponents/real-world-collectibles/ValuesProvider'
import P1 from 'assets/imgs/realworldShop/zata/p1.png'
import P2 from 'assets/imgs/realworldShop/zata/p2.png'
import P3 from 'assets/imgs/realworldShop/zata/p3.png'
import P4 from 'assets/imgs/realworldShop/zata/p4.png'
import P5 from 'assets/imgs/realworldShop/zata/p5.png'
import P6 from 'assets/imgs/realworldShop/zata/p6.png'
import P6Mobile from 'assets/imgs/realworldShop/zata/p6Mobile.png'
import P7 from 'assets/imgs/realworldShop/zata/p7.png'
import P7Mobile from 'assets/imgs/realworldShop/zata/p7Mobile.png'
import P8 from 'assets/imgs/realworldShop/zata/p8.png'
import P8Mobile from 'assets/imgs/realworldShop/zata/p8Mobile.png'
import P9 from 'assets/imgs/realworldShop/zata/p9.png'
import P9Mobile from 'assets/imgs/realworldShop/zata/p9Mobile.png'
import P10Mobile from 'assets/imgs/realworldShop/zata/p10Mobile.png'
import P12Mobile from 'assets/imgs/realworldShop/zata/p12Mobile.png'
import P13Mobile from 'assets/imgs/realworldShop/zata/p13Mobile.png'
import P10 from 'assets/imgs/realworldShop/zata/p10.png'
import P11 from 'assets/imgs/realworldShop/zata/p11.png'
import P12 from 'assets/imgs/realworldShop/zata/p12.png'
import P13 from 'assets/imgs/realworldShop/zata/p13.png'
import { useIsMDDown } from 'themes/useTheme'
import KeepTouch from './components/zetaKeepTouch'
import FooterPc from 'components/Footer/FooterPc'
const ComImg = styled('img')(() => ({
  display: 'block',
  width: '100%',
  objectFit: 'cover',
  cursor: 'pointer'
}))
interface ProductItemParam {
  item: {
    name: string
    imgUrl: string
    quantity: string
    unitPrice: string
    status: string
    style?: React.CSSProperties
  }
  key?: number
}
const ProductItem = (props: ProductItemParam) => {
  const isMd = useIsMDDown()
  //   const { name, imgUrl, quantity, unitPrice, status, style } = props.item
  const { name, imgUrl, status, style } = props.item
  return (
    <Grid item xs={12} md={12} lg={4}>
      <Box
        sx={{
          width: '100%',
          marginBottom: isMd ? '40px' : 0,
          ...style
        }}
      >
        <ComImg
          src={imgUrl}
          alt=""
          style={{
            marginBottom: isMd ? '8px' : '16px'
          }}
        />
        <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Typography
            sx={{
              fontFamily: `'Instrument Serif'`,
              fontSize: '24px',
              fontStyle: 'italic',
              color: '#171717'
            }}
          >
            {name}
          </Typography>
          <Typography
            sx={{
              fontFamily: `'Instrument Serif'`,
              fontSize: '12px',
              fontStyle: 'italic',
              color: '#1b1b1b',
              height: '24px',
              lineHeight: '22px',
              textAlign: 'center',
              padding: '0 8px',
              border: '1px solid #000',
              borderRadius: '25px',
              cursor: 'pointer'
            }}
          >
            {status}
          </Typography>
        </Stack>
        {/* <Grid container rowGap={'12px'} wrap={'nowrap'}>
          <Grid item xs={6} md={6} lg={6}>
            <Typography
              sx={{
                color: '#959595',
                fontFamily: `'Inter'`,
                fontSize: 16,
                lineHeight: '24px'
              }}
            >
              Quantity
              <span
                style={{
                  color: '#171717',
                  fontFamily: `'Inter'`,
                  fontSize: 16,
                  lineHeight: '24px',
                  marginLeft: '12px'
                }}
              >
                {quantity}
              </span>
            </Typography>
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <Typography
              sx={{
                color: '#959595',
                fontFamily: `'Inter'`,
                fontSize: 16,
                lineHeight: '24px'
              }}
            >
              Unit Price
              <span
                style={{
                  color: '#171717',
                  fontFamily: `'Inter'`,
                  fontSize: 16,
                  lineHeight: '24px',
                  marginLeft: '12px'
                }}
              >
                {unitPrice}
              </span>
            </Typography>
          </Grid> 
        </Grid>*/}
      </Box>
    </Grid>
  )
}
const ZataShop = () => {
  const isMd = useIsMDDown()
  const productList: ProductItemParam['item'][] = useMemo(() => {
    return [
      {
        imgUrl: isMd ? P8Mobile : P8,
        name: 'Baseball Cap',
        quantity: '500',
        unitPrice: '$15',
        status: 'unlist',
        style: {
          marginRight: '16px'
        }
      },
      {
        imgUrl: isMd ? P9Mobile : P9,
        name: 'Canvas Bag',
        quantity: '500',
        unitPrice: '$15',
        status: 'unlist',
        style: {
          marginRight: '16px'
        }
      },
      {
        imgUrl: isMd ? P10Mobile : P10,
        name: 'T-shirt',
        quantity: '500',
        unitPrice: '$15',
        status: 'unlist'
      },
      {
        imgUrl: P11,
        name: 'Polo Shirt',
        quantity: '500',
        unitPrice: '$15',
        status: 'unlist',
        style: {
          marginRight: '16px'
        }
      },
      {
        imgUrl: isMd ? P12Mobile : P12,
        name: 'Rigid Paper Box',
        quantity: '500',
        unitPrice: '$15',
        status: 'unlist',
        style: {
          marginRight: '16px'
        }
      },
      {
        imgUrl: isMd ? P13Mobile : P13,
        name: 'Simple Packaging',
        quantity: '500',
        unitPrice: '$15',
        status: 'unlist'
      }
    ]
  }, [isMd])
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
    name: 'ZETACHAIN'
  }
  return (
    <ValuesProvider>
      <ShopBanner bannerData={bannerData}>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            background: `url(${isMd ? bannerData.bannerMobile : bannerData.banner}) no-repeat bottom right / cover`
          }}
        ></div>
      </ShopBanner>
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
      >
        <Grid mb={isMd ? '40px' : '80px'} container rowGap={'40px'} columnGap={'84px'} wrap={isMd ? 'wrap' : 'nowrap'}>
          <Grid item xs={12} md={12} lg={6}>
            <Box
              sx={{
                height: '100%',
                display: 'flex',
                flexFlow: 'column nowrap',
                justifyContent: 'center',
                alignItems: 'center',
                paddingRight: isMd ? '0' : '40px'
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
                  color: '#005741',
                  textAlign: 'center'
                }}
              >
                About ZetaChain
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
                <span>
                  ZetaChain is the world’s first and only decentralized EVM-compatible L1 blockchain with built-in
                  cross-chain interoperability, connecting all blockchains, even non-smart contract chains like Bitcoin
                  and Dogecoin. With ZetaChain’s complete{' '}
                </span>
                <a
                  style={{
                    textDecoration: 'underline'
                  }}
                  href="https://www.zetachain.com/docs/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Omnichain toolkit
                </a>
                <span>
                  , developers can build true omnichain dApps from a single point of logic, and users can access all of
                  their assets, data, and liquidity in a single place, securely. <br />
                  Follow ZetaChain on Twitter{' '}
                  <a
                    style={{
                      textDecoration: 'underline'
                    }}
                    href="https://twitter.com/zetablockchain"
                    target="_blank"
                    rel="noreferrer"
                  >
                    @zetablockchain
                  </a>{' '}
                  and join the conversation on{' '}
                  <a
                    style={{
                      textDecoration: 'underline'
                    }}
                    href={'https://discord.com/invite/zetachain'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Discord
                  </a>{' '}
                  and{' '}
                  <a
                    style={{
                      textDecoration: 'underline'
                    }}
                    href={'https://t.me/zetachainofficial'}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Telegram
                  </a>
                  .
                </span>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={12} lg={6}>
            <ComImg src={P1} alt="" />
          </Grid>
        </Grid>
        <ComImg
          style={{
            marginBottom: '24px'
          }}
          src={P2}
          alt=""
        />
        <Grid mb={isMd ? '12px' : '24px'} container columnGap={'16px'} rowGap={'24px'} wrap={'nowrap'}>
          <Grid item xs={6} md={6} lg={6}>
            <ComImg src={P3} alt="" />
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <ComImg src={P4} alt="" />
          </Grid>
        </Grid>
        <ComImg
          style={{
            marginBottom: isMd ? '12px' : '24px'
          }}
          src={P5}
          alt=""
        />
        <Grid mb={isMd ? '40px' : '80px'} container columnGap={'16px'} wrap={'nowrap'}>
          <Grid item xs={6} md={6} lg={6}>
            <ComImg src={isMd ? P6Mobile : P6} alt="" />
          </Grid>
          <Grid item xs={6} md={6} lg={6}>
            <ComImg src={isMd ? P7Mobile : P7} alt="" />
          </Grid>
        </Grid>
        <Grid mb={isMd ? '0' : '80px'} container columnGap={'16px'} wrap={isMd ? 'wrap' : 'nowrap'}>
          {productList.slice(0, 3).map((item, index) => {
            return <ProductItem item={item} key={index} />
          })}
        </Grid>
        <Grid container columnGap={'16px'} wrap={isMd ? 'wrap' : 'nowrap'}>
          {productList.slice(3, 6).map((item, index) => {
            return <ProductItem item={item} key={index} />
          })}
        </Grid>
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
export default ZataShop
