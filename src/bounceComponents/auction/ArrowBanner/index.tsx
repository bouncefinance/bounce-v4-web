import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Autoplay, Pagination } from 'swiper'
import 'swiper/swiper-bundle.css'
import { Box, styled, Skeleton, Typography } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
// import { timestampToCountdown } from '../../../utils/TimeUtil'
import { useState } from 'react'
import { useRequest } from 'ahooks'
import { getBanner } from '../../../api/market'
import { BannerType } from '../../../api/market/type'
// import EthIcon from 'assets/imgs/auction/eth-icon.svg'
import { useNavigate } from 'react-router-dom'
import { useCountDown } from 'ahooks'
import useBreakpoint from '../../../hooks/useBreakpoint'

SwiperCore.use([Autoplay, Pagination])

export interface IBanner {
  pic: string
  title: string
  tag: string[]
  countDown: string
}

const SwiperSkeleton = () => {
  return (
    <Box
      sx={{ width: '100%', height: '460px', backgroundColor: '#e3e3e0', borderRadius: '30px', position: 'relative' }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          position: 'absolute',
          left: '0',
          bottom: '40px',
          width: '100%',
          padding: '0 38px 0 40px',
          boxSizing: 'border-box',
          '& .MuiSkeleton-root': {
            backgroundColor: 'rgba(255, 255, 255, 0.4)'
          }
        }}
      >
        <Box display="flex" flexDirection="column" width="61%" maxWidth="800px" gap="24px">
          <Box display="flex" flexDirection="row" gap="4px">
            <Skeleton width="32px" height="32px" variant="circular" animation="wave" />
            <Skeleton
              width="107px"
              height="32px"
              variant="rectangular"
              sx={{ borderRadius: '100px' }}
              animation="wave"
            />
          </Box>
          <Skeleton variant="rectangular" width="100%" height="26px" animation="wave" />
          <Skeleton variant="rectangular" width="262px" height="24px" animation="wave" />
        </Box>
        <Box
          display="flex"
          gap="8px"
          flexDirection="row"
          alignItems="end"
          sx={{
            '& .MuiSkeleton-root': { width: '60px', height: '60px', borderRadius: '8px' }
          }}
        >
          {new Array(4).fill(0).map((i, v) => (
            <Skeleton key={v} variant="rectangular" animation="wave" />
          ))}
        </Box>
      </Box>
    </Box>
  )
}

function ArrowBanner({ type }: { type?: string }) {
  const [swiper, setSwiper] = useState<SwiperCore>()
  const isSm = useBreakpoint('sm')
  const [showSwiperIcon, setShowSwiperIcon] = useState<boolean>(false)
  const { data } = useRequest(async () => {
    const resp = await getBanner(type)
    return {
      list: resp.data,
      total: resp.data
    }
  })
  const EnterSwiper = () => {
    setShowSwiperIcon(true)
  }
  const LeaveSwiper = () => {
    setShowSwiperIcon(false)
  }
  return (
    <Box
      position={'relative'}
      display={'flex'}
      justifyContent={'center'}
      alignItems={'center'}
      sx={{
        maxWidth: '1296px',
        width: '100%',
        minHeight: isSm ? 125 : 460,
        margin: '16px auto 0',
        '@media(max-width:1296px)': {
          padding: '0 16px',
          margin: '16px auto'
        }
      }}
      onMouseEnter={EnterSwiper}
      onMouseLeave={LeaveSwiper}
    >
      {!isSm && (
        <ArrowBgLeft
          sx={{ opacity: showSwiperIcon ? 1 : 0, transition: 'opacity .4s' }}
          onClick={() => {
            swiper?.slidePrev()
          }}
        >
          <ArrowBackIcon />
        </ArrowBgLeft>
      )}

      <Swiper
        onSwiper={setSwiper}
        spaceBetween={0}
        slidesPerView={1}
        loop
        autoplay={{
          delay: 3000
        }}
        style={{
          maxWidth: '1296px',
          width: '100%'
        }}
      >
        {data?.list?.map((item: BannerType, index: number) => (
          <SwiperSlide key={index}>
            <Banner key={index} banner={item} />
          </SwiperSlide>
        ))}
        <SwiperSlide style={{ display: data ? 'none' : 'block' }}>
          <SwiperSkeleton />
        </SwiperSlide>
      </Swiper>
      {!isSm && (
        <ArrowBgRight
          sx={{ opacity: showSwiperIcon ? 1 : 0, transition: 'opacity .4s' }}
          onClick={() => swiper?.slideNext()}
        >
          <ArrowForwardIcon />
        </ArrowBgRight>
      )}
    </Box>
  )
}

const ArrowBg = styled(Box)`
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: center;
  padding: 22px;
  width: 60px;
  height: 60px;
  background: rgba(255, 255, 255, 0.4);
  border-radius: 8px;

  &:hover {
    cursor: pointer;
  }

  @media (max-width: 600px) {
    width: 30px;
    height: 30px;
  }
`
const ArrowBgLeft = styled(ArrowBg)`
  position: absolute;
  left: -30px;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 600px) {
    left: -25px;
  }
`
const ArrowBgRight = styled(ArrowBg)`
  position: absolute;
  right: -30px;
  top: 50%;
  transform: translateY(-50%);

  @media (max-width: 600px) {
    right: -25px;
  }
`

const BannerH3 = styled(Typography)`
  font-family: 'Public Sans';
  font-style: normal;
  font-weight: 600;
  font-size: 36px;
  line-height: 130%;
  letter-spacing: -0.02em;
  font-feature-settings: 'pnum' on, 'lnum' on;
  color: #ffffff;
  align-self: stretch;
  flex-grow: 0;

  @media (max-width: 600px) {
    font-size: 22px;
  }
`
const BannerH6 = styled(Typography)`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: -0.02em;
  color: #ffffff;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`

const CountDownBg = styled(Box)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 6px 10px;
  width: 60px;
  height: 60px;
  background: rgba(18, 18, 18, 0.2);
  backdrop-filter: blur(2px);
  border-radius: 8px;
  flex: none;
  order: 0;
  flex-grow: 0;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  color: #ffffff;

  @media (max-width: 600px) {
    width: 44px;
    height: 44px;
    font-size: 14px;
  }
`
const Shadow = styled(Box)`
  position: absolute;
  width: 100%;
  height: 300px;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #000000 100%);
  mix-blend-mode: multiply;
  opacity: 0.8;
  border-radius: 0 0 30px 30px;

  @media (max-width: 600px) {
    height: 327px;
    border-radius: 0 0 15px 15px;
  }
`

// const ChainBg = styled(Box)`
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   background: rgba(18, 18, 18, 0.2);
//   backdrop-filter: blur(2px);
//   border-radius: 100px;
//   color: white;
//   font-size: 13px;
//   line-height: 140%;
// `

function Banner({ banner }: { banner: BannerType }) {
  const isSm = useBreakpoint('sm')
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate: banner.openAt * 1000
  })
  const navigate = useNavigate()
  const handleClick = (url: string) => {
    if (!url) return
    if (url.indexOf('http://') > -1 || url.indexOf('https://') > -1) {
      window.open(url, '_blank')
    } else {
      navigate(url)
    }
  }
  return (
    <Box
      sx={{
        display: 'flex',
        height: isSm ? '400px' : '460px',
        // width: { sm: '328px', lg: '100%' },
        width: '100%',
        position: 'relative'
      }}
      onClick={() => handleClick(banner.url || '')}
    >
      <img
        src={banner.avatar}
        alt=""
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          borderRadius: isSm ? '15px' : '30px'
        }}
      />
      {Number(banner.category) !== 0 && <Shadow style={{ position: 'absolute', bottom: 0, left: 0 }} />}
      {Number(banner.category) !== 0 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: isSm ? '16px' : '40px',
            left: isSm ? '16px' : '40px'
          }}
        >
          {/* <Box display={'flex'} gap={4}>
            <ChainBg width={32} height={32}>
              <img src={EthIcon} />
            </ChainBg>
            <ChainBg padding={'0 12px'}>Coming soon</ChainBg>
          </Box> */}
          <BannerH3>{banner.name}</BannerH3>
          <BannerH6>{banner.types}</BannerH6>
        </Box>
      )}
      {Number(banner.category) !== 0 && (
        <Box
          sx={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            gap: '8px',
            right: '38px'
          }}
        >
          {countdown > 0 ? (
            <>
              <CountDownBg key={'banner0'}>{days}D</CountDownBg>
              <CountDownBg key={'banner1'}>{hours}H</CountDownBg>
              <CountDownBg key={'banner2'}>{minutes}M</CountDownBg>
              <CountDownBg key={'banner3'}>{seconds}S</CountDownBg>
            </>
          ) : (
            <></>
          )}
        </Box>
      )}
    </Box>
  )
}

export default ArrowBanner
