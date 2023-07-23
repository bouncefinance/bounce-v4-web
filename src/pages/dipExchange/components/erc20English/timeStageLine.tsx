import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { FreeMode, Virtual } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/virtual'
import { useState, useMemo } from 'react'
import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'
import BigNumber from 'bignumber.js'
import { ReactComponent as DisActiveIcon } from 'assets/imgs/dutchAuction/disactive.svg'
import { ReactComponent as CheckedIcon } from 'assets/imgs/dipExchange/checked.svg'
import { useIsMDDown } from 'themes/useTheme'
const TimeStageLine = ({ poolInfo }: { poolInfo: Erc20EnglishAuctionPoolProp }) => {
  const isMd = useIsMDDown()
  const [swiper, setSwiper] = useState<any>(null)
  console.log('swiper>>>', swiper)
  const { currencyAmountStartPrice: lowestPrice, currencyAmountEndPrice: highestPrice, fragments: times } = poolInfo
  const segments = times ? Number(times) : 0
  const startPrice = lowestPrice ? Number(lowestPrice.toExact()) : 0
  const endPrice = highestPrice ? Number(highestPrice.toExact()) : 0
  const arrayRange = (start: number | string, stop: number, step: number | string) =>
    Array.from({ length: stop + 1 }, (value, index) => {
      return BigNumber(start).plus(BigNumber(step).times(index)).toNumber()
    })
  const priceSegments = new BigNumber(endPrice).minus(startPrice).div(segments).toNumber()
  const currentPrice = poolInfo.currencyCurrentPrice?.toExact()
  const releaseData = useMemo(() => {
    const yList = arrayRange(startPrice, segments, priceSegments)
    const dataPoint = new Array(segments + 1).fill(0).map((item, index) => {
      const isActive = Number(currentPrice) >= yList[index]
      const showValue = yList[index] ? yList[index].toFixed(6) : '--'
      return {
        startAt: new BigNumber(140).div(segments).times(index).toString(),
        value: showValue + poolInfo.token1.symbol.toUpperCase(),
        active: isActive
      }
    })
    return dataPoint
  }, [startPrice, segments, priceSegments, currentPrice, poolInfo.token1.symbol])
  const [slidesPerview, setSlidesPerView] = useState(window.innerWidth / (isMd ? 140 : 381))
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
    const setPerview = () => {
      const winW = window.innerWidth
      const maxWidth = isMd ? 140 : 381
      const result = parseInt(winW / maxWidth + '') >= 3 ? 3 : winW / maxWidth
      setSlidesPerView(result)
    }
    setPerview()
    window.addEventListener('resize', setPerview)
    return () => {
      window.removeEventListener('resize', setPerview)
    }
  }, [isMd])
  if (!releaseData || (Array.isArray(releaseData) && releaseData.length === 0)) {
    return <Box></Box>
  }
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
        key={'erc20swiper'}
        modules={[FreeMode, Virtual]}
        virtual={true}
        freeMode={true}
        loop={false}
        centeredSlides={isMd ? false : true}
        centeredSlidesBounds={isMd ? false : true}
        slidesPerView={slidesPerview}
        initialSlide={activeIndex}
        onSlideChange={() => console.log('slide change')}
        onSwiper={setSwiper}
      >
        {releaseData.map((item, index) => {
          return (
            <SwiperSlide key={'stageLineItem' + index} virtualIndex={index}>
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
                  {item.startAt}%
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
