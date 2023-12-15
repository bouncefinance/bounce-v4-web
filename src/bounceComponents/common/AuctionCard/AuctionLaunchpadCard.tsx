import { Box, Container, Typography, Stack, Button, styled, useTheme } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

import { useMemo, useRef, useState } from 'react'
import Image from 'components/Image'

import { RoundedBox, SansTitle } from 'pages/account/AccountPrivateLaunchpad'

import { PoolStatus as ChainPoolStatus } from 'api/pool/type'
import PoolStatusBox from 'bounceComponents/fixed-swap/ActionBox/PoolStatus'
import { Row } from 'components/Layout'

import { useNavigate } from 'react-router-dom'
import useBreakpoint from 'hooks/useBreakpoint'
import { SlideProgress } from 'bounceComponents/auction/SlideProgress'
import SwiperCore from 'swiper'
import { SwiperSlide } from 'swiper/react'
import DefaultImg from 'assets/imgs/auction/default-img.jpg'
import { IPrivatePadProp, PrivatePadDataList } from 'pages/launchpad/PrivatePadDataList'
import TokenImage from '../TokenImage'
import { SUPPORTED_NETWORKS } from 'constants/chain'
const Title = styled(Typography)`
  color: #121212;
  leading-trim: both;
  text-edge: cap;
  font-variant-numeric: lining-nums proportional-nums;
  font-family: Inter;
  font-size: 44px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%; /* 57.2px */
  letter-spacing: -0.88px;
`
export const ArrowBg = styled(Box)`
  display: flex;
  width: 48px;
  height: 48px;
  justify-content: center;
  align-items: center;
  border-radius: 48px;

  cursor: pointer;
  &.gray {
    border: 1px solid #959595;
    color: #959595;
    background: #fff;
    opacity: 0.3;
  }
  &.black {
    border: 1px solid #20201e;
    background: #20201e;
    color: #fff;
  }
  &.black:hover {
    border: 1px solid #20201e;
    background: #fff;
    color: #20201e;
    opacity: 0.8;
  }
`
const LaunchpadHead = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
  max-height: 250px;
  overflow: hidden;
  border-radius: 24px 24px 0 0;
`
const LaunchpadHeadContent = styled(Box)`
  display: flex;
  padding: 16px 24px;
  justify-content: space-between;
  align-items: flex-start;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`
const LaunchpadContent = styled(Box)(({}) => ({
  display: 'flex',
  padding: ' 16px 24px 24px 24px',
  alignItems: 'flex-start',
  gap: 60
  // [theme.breakpoints.down('sm')]: {
  //   padding: '12px 16px 16px 16px',
  //   gap: 24
  // }
}))

const LaunchpadProjectTitle = styled(Typography)`
  color: #20201e;
  leading-trim: both;
  text-edge: cap;
  font-variant-numeric: lining-nums proportional-nums;
  font-family: Inter;
  font-size: 22px;
  font-style: normal;
  font-weight: 600;
  line-height: 130%; /* 28.6px */
  letter-spacing: -0.44px;
`
const LaunchpadDescription = styled(Typography)`
  color: #20201e;
  leading-trim: both;
  text-edge: cap;

  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
`
const LaunchpadLabelContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 8px;
  border-bottom: 1px solid #e8e9e4;
  /* height: 144px; */
  &.last {
    border-bottom: none;
  }
`
const LaunchpadLabelTitle = styled(Typography)`
  color: #121212;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 19.6px */
  white-space: nowrap;
  &.w {
    font-weight: 500;
    line-height: 150%;
  }
`
const LaunchpadContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 680,
  borderRadius: 24,
  background: '#fff',
  cursor: 'pointer',
  // overflow: 'hidden',
  '& .img': {
    transform: 'scale(1)',
    transition: 'all 1s'
  },
  '&:hover': {
    '& .img': {
      transform: 'scale(1.2)'
    }
  },
  [theme.breakpoints.up('sm')]: {
    minWidth: 450
  }
}))
const MoreButton = styled(Button)`
  width: max-content;
  display: flex;
  height: 40px;
  padding: 6px 24px;
  align-items: center;
  gap: 6px;
  border-radius: 100px;
  background: #e1f25c;
  color: #121212;
  &:hover {
    color: #fff;
    background: #121212;
  }
`
const LaunchpadCardItem = ({ data }: { data: IPrivatePadProp }) => {
  const navigate = useNavigate()
  const link = data.liveLink || data.upcomingLink || ''
  const [openAt, closeAt] = [data.liveTimeStamp.start, data.liveTimeStamp.end]
  const status = useMemo(() => {
    const cur = new Date().valueOf()
    if (!openAt || !closeAt) return ChainPoolStatus.Upcoming
    if (cur < openAt) return ChainPoolStatus.Upcoming
    if (cur >= openAt && cur <= closeAt) return ChainPoolStatus.Live
    return ChainPoolStatus.Closed
  }, [openAt, closeAt])
  const isSm = useBreakpoint('sm')
  const theme = useTheme()
  return (
    <LaunchpadContainer onClick={() => navigate(link)}>
      <LaunchpadHead>
        <Image
          style={{
            width: '100%',
            height: isSm ? 220 : 250,
            maxHeight: 250,
            borderRadius: '24px 24px 0 0',
            objectFit: 'cover'
          }}
          src={data.img || DefaultImg}
          className="img"
        />
        <LaunchpadHeadContent
          style={{
            flexDirection: isSm ? 'column' : 'row',
            padding: isSm ? '12px 16px' : '16px 24px',
            boxSizing: 'border-box'
          }}
        >
          <Stack flexDirection={'row'} gap={4}>
            <RoundedBox>
              <TokenImage src={SUPPORTED_NETWORKS[data.chainId].nativeCurrency.logo} size={13} />
              <SansTitle sx={{ color: '#FFF' }}>{SUPPORTED_NETWORKS[data.chainId].chainName}</SansTitle>
            </RoundedBox>
            <RoundedBox sx={{ color: '#E1F25C', fontSize: 12 }}>{data.poolTypeName}</RoundedBox>
          </Stack>

          <PoolStatusBox
            style={{ width: 'max-content', height: 'max-content' }}
            status={status}
            claimAt={0}
            closeTime={closeAt / 1000}
            openTime={openAt / 1000}
            hideUpcomingCountdown={!closeAt}
          />
        </LaunchpadHeadContent>
      </LaunchpadHead>
      <LaunchpadContent
        style={{ padding: isSm ? '12px 16px 16px 16px' : '16px 24px 24px 24px', gap: isSm ? 24 : 60 }}
        flexDirection={isSm ? 'column' : 'row'}
      >
        <Stack gap={16} sx={{ flex: 1 }}>
          <Stack flexDirection={'row'} gap={12}>
            <Image
              style={{ width: isSm ? 24 : 32, height: isSm ? 24 : 32, borderRadius: isSm ? 24 : 32 }}
              src={data.avatar}
            />
            <LaunchpadProjectTitle fontSize={isSm ? 16 : 22}>{data.title}</LaunchpadProjectTitle>
          </Stack>
          <LaunchpadDescription
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              height: isSm ? 63 : 'auto'
            }}
          >
            {data.desc}
          </LaunchpadDescription>
          <Row mt={10} gap={6} sx={{ overflow: 'hidden', height: isSm ? 46 : 'auto' }}>
            {data.social}
          </Row>
        </Stack>
        <Stack
          flexDirection={'column'}
          justifyContent={'space-between'}
          sx={{ [theme.breakpoints.up('sm')]: { flex: 1 }, height: isSm ? 192 : 210, width: '100%' }}
        >
          <Stack gap={8}>
            {data.moreData.map(i => (
              <LaunchpadLabelContainer key={i.title}>
                <LaunchpadLabelTitle>{i.title}</LaunchpadLabelTitle>
                <LaunchpadLabelTitle className="w">{i.content}</LaunchpadLabelTitle>
              </LaunchpadLabelContainer>
            ))}
          </Stack>
          <MoreButton onClick={() => navigate('/launchpad')}>View more</MoreButton>
        </Stack>
      </LaunchpadContent>
    </LaunchpadContainer>
  )
}
// const ItemSkeleton = () => {
//   const isSm = useBreakpoint('sm')
//   return (
//     <Stack sx={{ width: '100%', height: isSm ? 590 : '100%', overflow: 'hidden', borderRadius: 24 }}>
//       <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
//     </Stack>
//   )
// }
const AuctionLaunchpadCard = () => {
  const isSm = useBreakpoint('sm')
  const ref = useRef<any>(null)
  const swiper = useRef<SwiperCore>()
  const [swipePrev, canSwipePrev] = useState(false)
  const [swipeNext, canSwipeNext] = useState(true)

  return (
    <Box sx={{ padding: isSm ? '60px 16px 80px 16px' : '100px 72px 120px', background: '#F6F6F3' }}>
      <Container
        sx={{
          maxWidth: '1296px !important'
        }}
      >
        <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
          <Title style={{ fontSize: isSm ? 24 : 44 }}>Private launchpad</Title>
          <Stack flexDirection={'row'} gap={8} style={{ display: isSm ? 'none' : 'flex' }}>
            <ArrowBg className={swipePrev ? 'black' : 'gray'} onClick={() => swiper?.current?.slidePrev()}>
              <ArrowBackIcon />
            </ArrowBg>
            <ArrowBg className={swipeNext ? 'black' : 'gray'} onClick={() => swiper?.current?.slideNext()}>
              <ArrowForwardIcon />
            </ArrowBg>
          </Stack>
        </Stack>
        <Box ref={ref} mt={isSm ? 40 : 60} ml={'-16px'} width={isSm ? 'auto' : 1312}>
          <SlideProgress
            hideArrow
            swiperRef={swiper}
            canSwipePrev={canSwipePrev}
            canSwipeNext={canSwipeNext}
            swiperStyle={{
              style: { height: isSm ? '100%' : 500, paddingBottom: isSm ? 50 : 0 },
              spaceBetween: 30,
              slidesPerView: isSm ? 1.2 : 2,
              loop: isSm,
              // autoplay: isSm,
              freeMode: true,
              pagination: isSm
            }}
          >
            {PrivatePadDataList.filter(t => !t.hidden)
              .slice(0, 6)
              .map(i => (
                <>
                  <SwiperSlide key={i.keyId}>
                    <LaunchpadCardItem data={i} />
                  </SwiperSlide>
                </>
              ))}
          </SlideProgress>
        </Box>
      </Container>
    </Box>
  )
}
export default AuctionLaunchpadCard
