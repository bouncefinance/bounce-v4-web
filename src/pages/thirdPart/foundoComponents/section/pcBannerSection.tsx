import { Box, styled } from '@mui/material'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { FreeMode, Autoplay } from 'swiper'
import P1Img from 'assets/imgs/thirdPart/foundoDetail/p1.png'
import P2Img from 'assets/imgs/thirdPart/foundoDetail/p2.png'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/autoplay'

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
  const [slidesPerview, setSlidesPerView] = useState(2.5)
  const swiper = useSwiper()
  const [swiperInstance, setSwiperInstance] = useState(swiper)
  const setPerview = () => {
    const winW = window.innerWidth
    setSlidesPerView(winW / 600)
  }
  const banenrList = [P1Img, P2Img, P1Img, P2Img, P1Img, P2Img]
  useEffect(() => {
    setPerview()
    window.addEventListener('resize', setPerview)
    return () => {
      window.removeEventListener('resize', setPerview)
    }
  }, [])
  return (
    <Box
      sx={{
        width: '100%',
        height: '680px'
      }}
    >
      <Box
        sx={{
          width: '100%',
          height: '600px'
        }}
      >
        <Swiper
          modules={[FreeMode, Autoplay]}
          freeMode={true}
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
                    height: '600px',
                    width: '600px',
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
    </Box>
  )
}
export default PcBanenr
