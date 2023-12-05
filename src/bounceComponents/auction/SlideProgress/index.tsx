import { Swiper } from 'swiper/react'
import { SwiperProps, SwiperRef } from 'swiper/react/swiper-react'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { Box, styled } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useEffect, useState } from 'react'
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
  swiperRef?: any
  canSwipePrev?: any
  canSwipeNext?: any
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
const SwiperStyle = styled(Swiper)(() => ({
  // pagination list style
  '& .swiper-pagination>span': {
    width: 10,
    height: 10,
    border: '1px solid  rgba(18, 18, 18, 0.60)',
    borderRadius: 10,
    background: '#fff',
    margin: '0 12px !important'
  },
  '& .swiper-pagination>.swiper-pagination-bullet-active': {
    background: 'rgba(18, 18, 18, 0.60)'
  }
}))
export function SlideProgress(props: ISlideProgress) {
  const isSm = useBreakpoint('sm')
  const { swiperStyle, children, hideArrow, swiperRef } = props
  const [swiper, setSwiper] = useState<SwiperCore>()
  const totalSlides = swiper?.slides ? swiper.slides.length : 1
  const [currentIndex, setCurrentIdx] = useState(swiperStyle.slidesPerView)
  useEffect(() => {
    if (props.swiperRef && 'current' in props.swiperRef) {
      props.swiperRef.current = swiper
    }
  }, [swiper, props.swiperRef])
  return (
    <Box width={'100%'} ml={isSm ? 16 : 0}>
      <SwiperStyle
        ref={swiperRef}
        style={{
          height: isSm ? '286px' : '362px'
        }}
        onSlideChange={s => {
          const endIdx = s?.realIndex
            ? s.realIndex + Math.ceil(Number(s.params.slidesPerView))
            : Number(swiperStyle.slidesPerView)
          setCurrentIdx(endIdx > totalSlides ? totalSlides : endIdx)
          props.canSwipePrev(endIdx > Number(s.params.slidesPerView))
          props.canSwipeNext(endIdx < totalSlides)
        }}
        onSwiper={setSwiper}
        {...swiperStyle}
      >
        {children}
      </SwiperStyle>
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
