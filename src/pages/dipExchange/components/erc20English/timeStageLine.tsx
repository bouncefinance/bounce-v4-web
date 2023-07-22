import { Box, Typography } from '@mui/material'
import { useEffect } from 'react'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import { FreeMode } from 'swiper'
import 'swiper/css'
import 'swiper/css/free-mode'
import { useState, useMemo } from 'react'
import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'
import BigNumber from 'bignumber.js'
import { ReactComponent as DisActiveIcon } from 'assets/imgs/dutchAuction/disactive.svg'
import { ReactComponent as CheckedIcon } from 'assets/imgs/dipExchange/checked.svg'
import { CurrencyAmount } from 'constants/token'
import { useIsMDDown } from 'themes/useTheme'
const TimeStageLine = ({ poolInfo }: { poolInfo: Erc20EnglishAuctionPoolProp }) => {
  const isMd = useIsMDDown()
  const newSwiper = useSwiper()
  const [swiper, setSwiper] = useState(newSwiper)
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
    if (!poolInfo.currencySwappedAmount1?.currency) {
      return []
    }
    const yList = arrayRange(startPrice, segments, priceSegments)
    const dataPoint = new Array(segments + 1).fill(0).map((item, index) => {
      const isActive = Number(currentPrice) >= yList[index]
      const currentValue = poolInfo.currencySwappedAmount1?.currency
        ? CurrencyAmount.fromAmount(poolInfo.currencySwappedAmount1?.currency, yList[index])?.toSignificant(6)
        : '0'
      return {
        startAt: new BigNumber(140).div(segments).times(index).toString(),
        value: currentValue + poolInfo.token1.symbol.toUpperCase(),
        active: isActive
      }
    })
    return dataPoint
  }, [
    startPrice,
    segments,
    priceSegments,
    currentPrice,
    poolInfo.currencySwappedAmount1?.currency,
    poolInfo.token1.symbol
  ])
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
        width: '140%',
        height: '136px',
        background: '#1D1D29',
        padding: '16px 28px',
        borderRadius: '6px'
      }}
      mb={isMd ? '0' : '30px'}
    >
      <Swiper
        modules={[FreeMode]}
        freeMode={true}
        loop={false}
        centeredSlides={isMd ? false : true}
        centeredSlidesBounds={isMd ? false : true}
        slidesPerView={slidesPerview}
        initialSlide={activeIndex}
        onSlideChange={() => console.log('slide change')}
        onSwiper={e => {
          setSwiper(e)
          setTimeout(() => {
            swiper?.slideTo(activeIndex)
          }, 2000)
        }}
      >
        {releaseData.map((item, index) => {
          return (
            <SwiperSlide key={'stageLineItem' + index}>
              <Box
                key={'stageLineBox' + index}
                sx={{
                  width: '140%',
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
                    width: '140%',
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
