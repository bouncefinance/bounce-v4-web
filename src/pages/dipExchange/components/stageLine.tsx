import { Box } from '@mui/material'
import { useEffect } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { FreeMode } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import { useState } from 'react'
import StageLineItem from './stageLineItem'
export interface ActiveItem {
  timaSteamp: number
  dip: {
    startAt: number
    closeAt: number
    id?: string | number
  }
  dgt: {
    startAt: number
    closeAt: number
    id?: string | number
  }
}
export interface PoolsData {
  list: ActiveItem[]
}
const StageLine = ({
  poolsData,
  activeIndex,
  setIndex
}: {
  poolsData: PoolsData
  activeIndex: number
  setIndex?: (index: number) => void
}) => {
  const swiper = useSwiper()
  const [swiperInstance, setSwiperInstance] = useState(swiper)
  const winW = window.innerWidth > 1440 ? 1440 : window.innerWidth
  const [slidesPerview, setSlidesPerView] = useState(winW / 162)
  const { list } = poolsData
  useEffect(() => {
    const winW = window.innerWidth > 1440 ? 1440 : window.innerWidth
    const setPerview = () => {
      setSlidesPerView(winW / 162)
    }
    setPerview()
    window.addEventListener('resize', setPerview)
    return () => {
      window.removeEventListener('resize', setPerview)
    }
  }, [])
  if (!list || (Array.isArray(list) && list.length === 0)) {
    return <Box></Box>
  }
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        minHeight: '72px',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}
      mb={'40px'}
    >
      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        loop={false}
        centeredSlides={true}
        centeredSlidesBounds={true}
        slidesPerView={slidesPerview}
        initialSlide={activeIndex}
        onSlideChange={() => console.log('slide change')}
        onSwiper={swiper => {
          setSwiperInstance(swiper)
        }}
        style={{
          width: '100%'
        }}
      >
        {list.map((item, index) => {
          return (
            <SwiperSlide
              key={'stageLineItem' + index}
              onClick={e => {
                e.stopPropagation()
                if (item.timaSteamp <= new Date().valueOf()) {
                  swiperInstance.slideTo(index)
                  setIndex && setIndex(index)
                }
              }}
            >
              <StageLineItem activeIndex={activeIndex} item={item} index={index} />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Box>
  )
}
export default StageLine
