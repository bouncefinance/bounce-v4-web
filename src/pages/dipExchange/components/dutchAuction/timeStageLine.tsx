import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'
import SwiperCore from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Virtual } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/virtual'
import moment from 'moment'
import { useState, useMemo } from 'react'
import { DutchAuctionPoolProp } from 'api/pool/type'
import BigNumber from 'bignumber.js'
import { ReactComponent as DisActiveIcon } from 'assets/imgs/dutchAuction/disactive.svg'
import { ReactComponent as CheckedIcon } from 'assets/imgs/dipExchange/checked.svg'
import { useIsMDDown } from 'themes/useTheme'

const TimeStageLine = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
  const isMd = useIsMDDown()
  const [swiper, setSwiper] = useState<SwiperCore | null>(null)
  const { openAt, closeAt, highestPrice, lowestPrice, times } = poolInfo
  const segments = times ? (Number(times) > 100 ? 100 : Number(times)) : 1
  const startTime = openAt ? Number(openAt * 1000) : 0
  const endTime = closeAt ? Number(closeAt * 1000) : 0
  const startPrice = lowestPrice ? Number(lowestPrice.toExact()) : 0
  const endPrice = highestPrice ? Number(highestPrice.toExact()) : 0
  const arrayRange = (start: number | string, stop: number, step: number | string) =>
    Array.from({ length: stop + 1 }, (value, index) => {
      return BigNumber(start).plus(BigNumber(step).times(index)).toNumber()
    })
  const priceSegments = new BigNumber(endPrice).minus(startPrice).div(segments).toNumber()
  const timeSegments = new BigNumber(endTime).minus(startTime).div(segments).integerValue().toNumber()
  const releaseData = useMemo(() => {
    const xList = arrayRange(startTime, segments, timeSegments)
    const yList = arrayRange(startPrice, segments, priceSegments).reverse()
    const dataPoint = new Array(segments + 1).fill(0).map((item, index) => {
      const nowDate = new BigNumber(new Date().valueOf())
      const isActive = nowDate.comparedTo(xList[index]) === 1
      const showValue = yList[index] ? yList[index].toFixed(6) : '--'
      return {
        startAt: moment(xList[index]).format('YYYY-MM-DD HH:mm:ss'),
        timaSteamp: xList[index],
        value: showValue + poolInfo.token1.symbol.toUpperCase(),
        active: isActive
      }
    })
    return dataPoint
  }, [startTime, segments, timeSegments, startPrice, priceSegments, poolInfo.token1.symbol])
  const [slidesPerview, setSlidesPerView] = useState(window.innerWidth / (isMd ? 200 : 381))
  const activeIndex = useMemo(() => {
    let lastActiveIndex = 0
    releaseData.map((item, index) => {
      if (item.active) {
        lastActiveIndex = index
      }
    })
    return lastActiveIndex
  }, [releaseData])
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
      const winW = window.innerWidth
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
        background: '#1D1D29',
        padding: '16px 28px',
        borderRadius: '6px'
      }}
      mb={isMd ? '0' : '30px'}
    >
      <Swiper
        key={'virtual'}
        modules={[FreeMode, Virtual]}
        virtual={{
          enabled: true
        }}
        centeredSlides={isMd ? false : true}
        centeredSlidesBounds={isMd ? false : true}
        freeMode={true}
        loop={false}
        slidesPerView={slidesPerview}
        initialSlide={activeIndex}
        onSwiper={setSwiper}
        onSlideChange={() => console.log('slide change')}
      >
        {releaseData.map((item, index) => {
          return (
            <SwiperSlide key={'stageLineItem' + index} virtualIndex={index * 100}>
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
                    fontFamily: `'Public Sans'`,
                    fontSize: 12,
                    fontWeight: 400,
                    color: item.active ? '#D7D6D9' : '#626262'
                  }}
                >
                  Stage {index + 1}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: `'Public Sans'`,
                    fontSize: 12,
                    fontWeight: 400,
                    color: item.active ? '#D7D6D9' : '#626262'
                  }}
                  mb={'8px'}
                >
                  {item.startAt}
                </Typography>
                <Typography
                  sx={{
                    fontFamily: `'Public Sans'`,
                    fontSize: 14,
                    fontWeight: 600,
                    color: item.active ? '#D7D6D9' : '#626262'
                  }}
                  mb={'16px'}
                >
                  {item.value}
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
                  {item.active ? <CheckedIcon /> : <DisActiveIcon />}
                  <Box
                    sx={{
                      flex: 1,
                      height: 4,
                      borderRadius: '4px',
                      background: item.active ? '#4F5FFC' : '#626262'
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
