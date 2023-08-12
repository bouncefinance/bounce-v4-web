import { Box, styled } from '@mui/material'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { FreeMode, Autoplay } from 'swiper'
import P1Img from 'assets/imgs/thirdPart/foundoDetail/p3.png'
import P2Img from 'assets/imgs/thirdPart/foundoDetail/p4.png'
import P3Img from 'assets/imgs/thirdPart/foundoDetail/p5.png'
import P4Img from 'assets/imgs/thirdPart/foundoDetail/p6.png'
import P5Img from 'assets/imgs/thirdPart/foundoDetail/p7.png'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/autoplay'
import { useIsSMDown } from 'themes/useTheme'
import LeftIcon from 'assets/imgs/thirdPart/foundoDetail/leftIcon.svg'
import RightIcon from 'assets/imgs/thirdPart/foundoDetail/rightIcon.svg'
import { useEffect, useState } from 'react'
const BannerSmallItem = styled('img')(() => ({
  width: '80px',
  height: '80px',
  objectFit: 'cover',
  cursor: 'pointer',
  opacity: 0.5,
  '&:hover': {
    opacity: 1
  }
}))
const PcBanenr = () => {
  const isSm = useIsSMDown()
  const [slidesPerview, setSlidesPerView] = useState(isSm ? 1 : 2.5)
  const swiper = useSwiper()
  const [swiperInstance, setSwiperInstance] = useState(swiper)
  const bannerList = [P1Img, P2Img, P3Img, P4Img, P5Img]
  useEffect(() => {
    const setPerview = () => {
      if (isSm) return
      const winW = window.innerWidth
      setSlidesPerView(winW / 600)
    }
    setPerview()
    window.addEventListener('resize', setPerview)
    return () => {
      window.removeEventListener('resize', setPerview)
    }
  }, [isSm])
  return (
    <Box
      sx={{
        width: '100%',
        height: isSm ? '404px' : '680px',
        background: '#000'
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: isSm ? '360px' : '600px',
          '& .swiper .swiper-wrapper .swiper-slide img:hover': {
            filter: 'grayscale(0%) !important'
          }
        }}
      >
        <Swiper
          modules={[FreeMode, Autoplay]}
          freeMode={isSm ? false : true}
          autoplay={true}
          loop={true}
          slidesPerView={slidesPerview}
          onSlideChange={() => console.log('slide change')}
          onSwiper={swiper => {
            setSwiperInstance(swiper)
          }}
        >
          {bannerList.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <img
                  key={index}
                  src={item}
                  style={{
                    height: isSm ? '360px' : '600px',
                    width: isSm ? '100%' : '600px',
                    filter: isSm ? 'none' : 'grayscale(100%)',
                    objectFit: 'cover'
                  }}
                  alt=""
                  srcSet=""
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
      </Box>
      {isSm && (
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'flex-end',
            alignItems: 'center',
            height: '44px',
            paddingRight: '16px'
          }}
          gap={'24px'}
        >
          <img
            src={LeftIcon}
            style={{
              width: '12px',
              height: '12px'
            }}
            alt=""
            srcSet=""
            onClick={() => {
              swiperInstance.slidePrev()
            }}
          />
          <img
            src={RightIcon}
            style={{
              width: '12px',
              height: '12px'
            }}
            alt=""
            srcSet=""
            onClick={() => {
              swiperInstance.slideNext()
            }}
          />
        </Box>
      )}
      {!isSm && (
        <Box
          sx={{
            height: '80px',
            width: '100%',
            display: 'flex',
            flexFlow: 'row nowrap',
            overflowX: 'auto',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          {bannerList.map((item, index) => {
            return (
              <BannerSmallItem
                onClick={() => {
                  swiperInstance.slideTo(index)
                }}
                src={item}
                key={index}
              />
            )
          })}
        </Box>
      )}
    </Box>
  )
}
export default PcBanenr
