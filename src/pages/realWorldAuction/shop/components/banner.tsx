import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, EffectCreative, Pagination } from 'swiper'
import 'swiper/swiper-bundle.css'
import { Box, styled, Skeleton, Typography, Button } from '@mui/material'
import { ReactComponent as LeftArrow } from 'assets/imgs/realworldShop/leftArrow.svg'
import { ReactComponent as RightArrow } from 'assets/imgs/realworldShop/rightArrow.svg'
import { useState } from 'react'
// import EthIcon from 'assets/imgs/auction/eth-icon.svg'
import { useNavigate } from 'react-router-dom'
import useBreakpoint from 'hooks/useBreakpoint'
import Banner1 from 'assets/imgs/realworldShop/banner1.png'
import Banner1Mobile from 'assets/imgs/realworldShop/banner1mobile.png'
import Banner2 from 'assets/imgs/realworldShop/banner2.png'
import { routes } from 'constants/routes'

import { ReactComponent as LongArrowSvg } from 'assets/imgs/realworldShop/longArrow.svg'
SwiperCore.use([Autoplay, Pagination])

export interface IBanner {
  pic: string
  title: string
  tag: string[]
  countDown: string
}
interface BannerType {
  title: string
  imgPc: string
  imgMobile: string
  url: string
  mainColor: string
}
export const SwiperSkeleton = () => {
  const isSm = useBreakpoint('sm')
  const isMd = useBreakpoint('md')
  return (
    <Box
      sx={{
        width: '100%',
        height: isSm ? 400 : 460,
        backgroundColor: '#e3e3e0',
        borderRadius: '30px',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          position: 'absolute',
          left: '0',
          bottom: '40px',
          width: '100%',
          padding: isSm ? '0 16px' : '0 38px 0 40px',
          boxSizing: 'border-box',
          '& .MuiSkeleton-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.4)'
          }
        }}
      >
        <Box display="flex" flexDirection="column" width="61%" maxWidth="800px" gap="24px">
          <Box display="flex" flexDirection="row" gap="4px">
            <Skeleton width="32px" height="32px" variant="circular" animation="wave" />
            <Skeleton
              width="107px"
              height="32px"
              variant="rectangular"
              sx={{ borderRadius: '100px' }}
              animation="wave"
            />
          </Box>
          <Skeleton variant="rectangular" width="100%" height="26px" animation="wave" />
          <Skeleton variant="rectangular" width="262px" height="24px" animation="wave" />
        </Box>
      </Box>
      <Box
        display="flex"
        gap="8px"
        flexDirection="row"
        alignItems="end"
        sx={{
          position: 'absolute',
          right: isSm ? 16 : 38,
          top: isSm ? 16 : 420,
          transform: isSm ? 'translateY(0)' : 'translateY(-100%)',
          '& .MuiSkeleton-root': {
            width: isMd ? 44 : 60,
            height: isMd ? 44 : 60,
            borderRadius: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.4)'
          }
        }}
      >
        {new Array(4).fill(0).map((i, v) => (
          <Skeleton key={v} variant="rectangular" animation="wave" />
        ))}
      </Box>
    </Box>
  )
}

function ArrowBanner() {
  const [swiper, setSwiper] = useState<SwiperCore>()
  console.log('swiper>>>', swiper)
  const isSm = useBreakpoint('sm')
  const [showSwiperIcon, setShowSwiperIcon] = useState<boolean>(false)
  const bannerList = [
    {
      title: 'BOUNCE',
      imgPc: Banner1,
      imgMobile: Banner1Mobile,
      url: routes.realAuction.bounceShop,
      mainColor: '#B5E529'
    },
    {
      title: 'FOUNDO',
      imgPc: Banner2,
      imgMobile: Banner2,
      url: routes.realAuction.foundoShop,
      mainColor: '#000'
    }
  ]

  const EnterSwiper = () => {
    setShowSwiperIcon(true)
  }
  const LeaveSwiper = () => {
    setShowSwiperIcon(false)
  }
  return (
    <Box
      position={'relative'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      sx={{
        maxWidth: '100%',
        width: '100%',
        minHeight: isSm ? 125 : 460,
        margin: '16px auto 0',
        '@media(max-width:1296px)': {
          margin: '16px auto'
        },
        '.title': {
          opacity: 0
        },
        '.swiper-slide-active .title': {
          opacity: 1
        }
      }}
      onMouseEnter={EnterSwiper}
      onMouseLeave={LeaveSwiper}
    >
      {!isSm && (
        <ArrowBgLeft
          sx={{ opacity: showSwiperIcon ? 1 : 0, transition: 'opacity .4s' }}
          onClick={() => {
            swiper?.slidePrev()
          }}
        >
          <LeftArrow />
        </ArrowBgLeft>
      )}
      <Swiper
        speed={1200}
        onSwiper={setSwiper}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        effect={'creative'}
        creativeEffect={{
          prev: {
            translate: [0, 0, -1]
          },
          next: {
            translate: ['100%', 0, 0]
          }
        }}
        modules={[EffectCreative]}
        // autoplay={{
        //   delay: 2000
        // }}
        autoplay={false}
        style={{
          width: '100%'
        }}
      >
        {bannerList?.map((item: BannerType, index: number) => (
          <SwiperSlide key={index}>
            <Banner key={index} banner={item} />
          </SwiperSlide>
        ))}
      </Swiper>
      {!isSm && (
        <ArrowBgRight
          sx={{ opacity: showSwiperIcon ? 1 : 0, transition: 'opacity .4s' }}
          onClick={() => swiper?.slideNext()}
        >
          <RightArrow />
        </ArrowBgRight>
      )}
    </Box>
  )
}

const ArrowBg = styled(Box)`
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  padding: 22px;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 8px;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 600px) {
    width: 30px;
    height: 30px;
  }
`
const ArrowBgLeft = styled(ArrowBg)`
  position: absolute;
  left: -60px;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 600px) {
    left: -25px;
  }
`
const ArrowBgRight = styled(ArrowBg)`
  position: absolute;
  right: -60px;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 600px) {
    right: -25px;
  }
`

export function Banner({ banner }: { banner: BannerType }) {
  const isSm = useBreakpoint('sm')
  const navigate = useNavigate()
  const handleClick = (url: string) => {
    if (!url) return
    if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
      window.open(url, '_blank')
    } else {
      navigate(url)
    }
  }
  return (
    <Box
      sx={{
        display: 'flex',
        // width: { sm: '328px', lg: '100%' },
        width: '100%',
        cursor: 'pointer',
        position: 'relative',
        padding: isSm ? '18.5px 0 0' : '57px 0 0',
        '.bannerImg': {
          position: 'relative',
          margin: '0 auto',
          width: isSm ? '300px' : 'calc(100% - 56px)',
          height: isSm ? '400px' : '800px',
          borderRadius: isSm ? '100%' : '100%',
          objectFit: 'cover'
        },
        '@media(min-width:1440px)': {
          '.bannerImg': {
            height: isSm ? '400px' : 'calc(100% - 57px)'
          }
        },
        '@media(min-width:1920px)': {
          '.bannerImg': {
            height: isSm ? '400px' : '800px'
          }
        },
        '@media(min-width:2560px)': {
          '.bannerImg': {
            height: isSm ? '400px' : '1065px'
          }
        },
        '@media(min-width:3840px)': {
          '.bannerImg': {
            height: isSm ? '400px' : '1596px'
          }
        }
      }}
      onClick={() => handleClick(banner.url || '')}
    >
      <img className="bannerImg" src={isSm ? banner.imgMobile : banner.imgPc} alt="" />
      <Box
        sx={{
          position: 'absolute',
          boxSizing: 'border-box',
          top: isSm ? '18.5px' : '57px',
          left: 0,
          width: isSm ? 12 : 48,
          height: isSm ? 'calc(100% - 18.5px)' : 'calc(100% - 57px)',
          borderTop: `1px solid ${banner.mainColor}`,
          borderLeft: `1px solid ${banner.mainColor}`,
          borderBottom: `1px solid ${banner.mainColor}`
        }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          boxSizing: 'border-box',
          top: isSm ? '18.5px' : '57px',
          right: 0,
          width: isSm ? 12 : 48,
          height: isSm ? 'calc(100% - 18.5px)' : 'calc(100% - 57px)',
          borderTop: `1px solid ${banner.mainColor}`,
          borderRight: `1px solid ${banner.mainColor}`,
          borderBottom: `1px solid ${banner.mainColor}`
        }}
      ></Box>
      <Typography
        className="title"
        sx={{
          position: 'absolute',
          fontFamily: `'Instrument Serif'`,
          top: 0,
          color: banner.mainColor ? banner.mainColor : '#000',
          fontSize: isSm ? '48px' : '160px',
          lineHeight: isSm ? '48px' : '160px',
          left: '50%',
          transform: 'translate3D(-50%, 0, 0)'
        }}
      >
        {banner.title}
      </Typography>
      <Button
        variant="contained"
        href={banner.url}
        target={'_blank'}
        sx={{
          position: 'absolute',
          bottom: isSm ? '40px' : '80px',
          left: '50%',
          transform: 'translate3D(-50%, 0 ,0)',
          height: isSm ? '37px' : '42px',
          lineHeight: isSm ? '37px' : '42px',
          borderRadius: isSm ? '37px' : '42px',
          border: '1px solid #121212',
          '&:hover': {
            '.title': {
              color: '#fff'
            },
            svg: {
              width: '40px',
              height: '14px',
              path: {
                stroke: '#fff'
              }
            }
          }
        }}
      >
        <Typography
          className="title"
          sx={{
            marginRight: '10px',
            color: '#121212',
            fontSize: isSm ? '14px' : '16px',
            fontFamily: `'Public Sans'`,
            fontWeight: 500
          }}
        >
          Shop now!
        </Typography>
        <LongArrowSvg />
      </Button>
    </Box>
  )
}

export default ArrowBanner
