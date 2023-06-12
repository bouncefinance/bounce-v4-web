import { Swiper } from 'swiper/react'
import { SwiperProps, SwiperRef } from 'swiper/react/swiper-react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Box, styled } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useState } from 'react'
import SwiperCore, { Autoplay, Pagination } from 'swiper'
import * as React from 'react'
// import 'swiper/modules/autoplay/autoplay.min.css'
// import 'swiper/modules/autoplay/autoplay.less'
// import 'swiper/modules/autoplay/autoplay.js'

SwiperCore.use([Autoplay, Pagination])
import 'swiper/swiper-bundle.css'
import 'swiper/swiper.min.css'
import useBreakpoint from '../../../hooks/useBreakpoint'

interface ISlideProgress {
  swiperStyle: React.RefAttributes<SwiperRef> & SwiperProps
  children: ReactJSXElement[]
  hideArrow?: boolean
  grayArrow?: boolean
}

const ArrowBg = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 22px;
  width: 60px;
  height: 60px;
  background: #ffffff;
  border-radius: 8px;

  &:hover {
    background: var(--ps-yellow-1);
    color: white;
    cursor: pointer;
  }

  &.gray {
    background: #f6f6f3;
  }

  @media (max-width: 600px) {
    width: 30px;
    height: 30px;
    padding: 18px;
  }
`
const ProgressLight = styled(Box)`
  height: 4px;
  background: #e1f25c;
  border-radius: 4px;
`

const ProgressGray = styled(ProgressLight)`
  background: rgba(18, 18, 18, 0.06);
`

export function SlideProgress(props: ISlideProgress) {
  const isSm = useBreakpoint('sm')
  const { swiperStyle, children, hideArrow } = props
  const [swiper, setSwiper] = useState<SwiperCore>()
  const totalSlides = swiper?.slides ? swiper.slides.length : 1
  const [currentIndex, setCurrentIdx] = useState(swiperStyle.slidesPerView)
  return (
    <Box width={'100%'} ml={isSm ? 12 : 0}>
      <Swiper
        onSlideChange={s => {
          const endIdx = s?.realIndex ? s.realIndex + Number(s.params.slidesPerView) : Number(swiperStyle.slidesPerView)
          setCurrentIdx(endIdx > totalSlides ? totalSlides : endIdx)
        }}
        onSwiper={setSwiper}
        {...swiperStyle}
      >
        {children}
      </Swiper>
      <Box
        display={hideArrow ? 'none' : 'flex'}
        alignItems={'center'}
        sx={{
          maxWidth: 1440,
          margin: isSm ? '8px auto 0' : '34px auto 0'
        }}
      >
        <ArrowBg className={props.grayArrow ? 'gray' : ''} onClick={() => swiper?.slidePrev()}>
          <ArrowBackIcon />
        </ArrowBg>
        <ArrowBg className={props.grayArrow ? 'gray' : ''} ml={8} mr={16} onClick={() => swiper?.slideNext()}>
          <ArrowForwardIcon />
        </ArrowBg>
        <Box display={'flex'} width={'100%'}>
          <ProgressLight width={`${(Number(currentIndex) / totalSlides) * 100}%`} />
          <ProgressGray width={`${((totalSlides - Number(currentIndex)) / totalSlides) * 100}%`} />
        </Box>
      </Box>
    </Box>
  )
}
