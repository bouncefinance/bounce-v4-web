import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { FreeMode } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import moment from 'moment'
import { useState } from 'react'
interface DictionaryObj {
  [key: string]: string
}
export interface ActiveItem {
  timaSteamp: number
  active: boolean
  dip: {
    startAt: number
    closeAt: number
    active: boolean
    id?: string | number
  }
  dgt: {
    startAt: number
    closeAt: number
    active: boolean
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
  const [slidesPerview, setSlidesPerView] = useState(window.innerWidth / 162)
  const { list } = poolsData
  const dicList: DictionaryObj = {
    '0': 'Frist',
    '1': 'Second',
    '2': 'Third',
    '3': 'Fourth',
    '4': 'Fifth',
    '5': 'Sixth',
    '6': 'Seventh',
    '7': 'Eighth',
    '8': 'Ninth',
    '9': 'Tenth'
  }
  useEffect(() => {
    const setPerview = () => {
      const winW = window.innerWidth
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
        height: '72px',
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
      >
        {list.map((item, index) => {
          return (
            <SwiperSlide key={'stageLineItem' + index}>
              <Box
                key={'stageLineBox' + index}
                sx={{
                  flex: 1,
                  minWidth: '162px',
                  display: 'flex',
                  flexFlow: 'column nowrap',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  cursor: item.active ? 'pointer' : 'unset'
                }}
                onClick={e => {
                  e.stopPropagation()
                  console.log('index>>>', index, item)
                  if (item.active) {
                    swiperInstance.slideTo(index)
                    setIndex && setIndex(index)
                  }
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}
                  mb={'12px'}
                >
                  <Box
                    sx={{
                      fontFamily: `'Inter'`,
                      fontSize: 12,
                      fontWeight: 400,
                      color: '#121212',
                      background: item.active ? '#4F5FFC' : '#626262',
                      borderRadius: '50%',
                      overflow: 'hidden',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      width: 20,
                      height: 20
                    }}
                  >
                    {index + 1}
                  </Box>
                  <Box
                    sx={{
                      flex: 1,
                      height: 4,
                      borderRadius: '4px',
                      background: item.active ? '#4F5FFC' : '#626262'
                    }}
                  ></Box>
                </Box>
                <Typography
                  sx={{
                    fontFamily: `'Inter'`,
                    fontSize: 12,
                    fontWeight: 400,
                    color: item.active ? '#4F5FFC' : '#626262'
                  }}
                  mb={'8px'}
                >
                  {moment(item.timaSteamp).format('YYYY-MM-DD')}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: `'Public Sans'`,
                    fontSize: 16,
                    fontWeight: 500,
                    color: item.active ? '#4F5FFC' : '#626262',
                    textDecoration: activeIndex === index ? 'underline' : ''
                  }}
                  mb={'4px'}
                >
                  {dicList[index + '']} Round
                </Typography>
              </Box>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Box>
  )
}
export default StageLine
