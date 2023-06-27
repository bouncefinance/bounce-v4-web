import { Box, styled } from '@mui/material'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { FreeMode, Autoplay } from 'swiper'
import P1Img from 'assets/imgs/thirdPart/foundoDetail/p1.png'
import P2Img from 'assets/imgs/thirdPart/foundoDetail/p2.png'
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
  const banenrList = [P1Img, P2Img, P1Img, P2Img, P1Img, P2Img]
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
        height: isSm ? '404px' : '680px'
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: isSm ? '360px' : '600px'
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
          {banenrList.map((item, index) => {
            return (
              <SwiperSlide key={index}>
                <img
                  key={index}
                  src={item}
                  style={{
                    height: isSm ? '360px' : '600px',
                    width: isSm ? '100%' : '600px',
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
            flexFlow: 'row nowarap',
            overflowX: 'auto',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          {banenrList.map((item, index) => {
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
