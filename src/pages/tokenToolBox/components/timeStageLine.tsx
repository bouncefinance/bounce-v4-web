import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import { useState, useMemo } from 'react'
import { ReactComponent as DisActiveIcon } from 'assets/imgs/dutchAuction/disactive.svg'
import { ReactComponent as CheckedIcon } from 'assets/imgs/toolBox/checked.svg'
import { useIsMDDown } from 'themes/useTheme'

export interface StageParams {
  releaseTime: number
  ratio: number
  released: boolean
}
const TimeStageLine = ({ stageData }: { stageData: StageParams[] }) => {
  const isMd = useIsMDDown()
  const [swiper, setSwiper] = useState<SwiperCore | null>(null)

  const winW = window.innerWidth > 1440 ? 1440 : window.innerWidth
  const [slidesPerview, setSlidesPerView] = useState(winW / (isMd ? 200 : 381))
  const activeIndex = useMemo(() => {
    let lastActiveIndex = 0
    stageData?.map((item, index) => {
      if (item.released) {
        lastActiveIndex = index
      }
    })
    return lastActiveIndex
  }, [stageData])
  useEffect(() => {
    if (swiper && swiper.slideTo) {
      setTimeout(() => {
        swiper.slideTo(activeIndex)
      }, 500)
    }
    return () => {}
  }, [activeIndex, swiper])
  useEffect(() => {
    const setPerview = () => {
      const winW = window.innerWidth > 1440 ? 1440 : window.innerWidth
      const maxWidth = isMd ? 200 : 381
      const result = parseInt(winW / maxWidth + '') >= 3 ? 3 : winW / maxWidth
      setSlidesPerView(result)
    }
    setPerview()
    window.addEventListener('resize', setPerview)
    return () => {
      window.removeEventListener('resize', setPerview)
    }
  }, [isMd])
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '136px',
        background: '#fff',
        padding: '16px 0',
        borderRadius: '6px'
      }}
      mb={isMd ? '0' : '30px'}
    >
      <Swiper
        key={'virtual'}
        modules={[FreeMode]}
        centeredSlides={isMd ? false : true}
        centeredSlidesBounds={isMd ? false : true}
        freeMode={true}
        loop={false}
        slidesPerView={slidesPerview}
        initialSlide={activeIndex}
        onSwiper={setSwiper}
        onSlideChange={() => console.log('slide change')}
      >
        {stageData.map((item, index) => {
          return (
            <SwiperSlide key={'stageLineItem' + index}>
              <Box
                key={'stageLineBox' + index}
                sx={{
                  width: '100%',
                  minWidth: isMd ? '100px' : '381px',
                  display: 'flex',
                  flexFlow: 'column nowrap',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start'
                }}
              >
                <Typography
                  sx={{
                    fontFamily: `'Inter'`,
                    fontSize: 12,
                    fontWeight: 400,
                    color: item.released ? '#D7D6D9' : '#959595'
                  }}
                >
                  Stage {index + 1}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: `'Inter'`,
                    fontSize: 12,
                    fontWeight: 400,
                    color: item.released ? '#D7D6D9' : '#959595'
                  }}
                  mb={'8px'}
                >
                  {item.releaseTime}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: `'Inter'`,
                    fontSize: 14,
                    fontWeight: 600,
                    color: item.released ? '#D7D6D9' : '#959595'
                  }}
                  mb={'16px'}
                >
                  {item.ratio}
                </Typography>
                <Box
                  sx={{
                    width: '100%',
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'flex-start',
                    alignItems: 'center'
                  }}
                >
                  {item.released ? <CheckedIcon /> : <DisActiveIcon />}
                  <Box
                    sx={{
                      flex: 1,
                      height: 4,
                      borderRadius: '4px',
                      background: item.released ? '#B5E529' : '#959595'
                    }}
                  ></Box>
                </Box>
              </Box>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </Box>
  )
}
export default TimeStageLine
