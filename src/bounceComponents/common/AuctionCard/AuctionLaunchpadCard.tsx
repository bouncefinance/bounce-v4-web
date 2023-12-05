import styled from '@emotion/styled'
import { Box, Container, Typography, Stack, Link, Button, Skeleton } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { useRequest } from 'ahooks'
import { searchLaunchpad } from 'api/user'
import { IAuctionTypeMap, IBasicInfoParams, IPoolInfoParams, PoolStatus } from 'pages/launchpad/create-launchpad/type'
import { useMemo, useRef, useState } from 'react'
import Image from 'components/Image'
import { ChainId, ChainListMap } from 'constants/chain'
import TokenImage from '../TokenImage'
import { RoundedBox, SansTitle, socialMap } from 'pages/account/AccountPrivateLaunchpad'
import { useOptionDatas } from 'state/configOptions/hooks'
import { PoolStatus as ChainPoolStatus } from 'api/pool/type'
import PoolStatusBox from 'bounceComponents/fixed-swap/ActionBox/PoolStatus'
import { Row } from 'components/Layout'
import { useToken } from 'state/wallet/hooks'
import { useNavigate } from 'react-router-dom'
import useBreakpoint from 'hooks/useBreakpoint'
import { SlideProgress } from 'bounceComponents/auction/SlideProgress'
import SwiperCore from 'swiper'
import { SwiperSlide } from 'swiper/react'
import DefaultImg from 'assets/imgs/auction/default-img.jpg'
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
  }
  &.black {
    border: 1px solid #20201e;
    background: #20201e;
    color: #fff;
  }
  &.black:hover,
  &.gray:hover {
    border: 1px solid #20201e;
    background: #20201e;
    color: #fff;
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
  &.w {
    font-weight: 500;
    line-height: 150%;
  }
`
const LaunchpadContainer = styled(Box)({
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
  }
})
const MoreButton = styled(Button)`
  width: max-content;
  display: flex;
  height: 40px;
  padding: 6px 24px;
  align-items: center;
  gap: 6px;
  border-radius: 100px;
  background: #121212;
  color: #fff;
  &:hover {
    color: #121212;
  }
`
const LaunchpadCardItem = ({ poolData, baseData }: { poolData: IPoolInfoParams; baseData: IBasicInfoParams }) => {
  const navigate = useNavigate()
  const optionDatas = useOptionDatas()
  const link = useMemo(() => `/account/launchpad/${poolData.id}?party=${baseData.id}`, [baseData.id, poolData.id])
  const curChain = useMemo(() => {
    const chainInfo = optionDatas.chainInfoOpt?.find(item => item.id === poolData.chainId)
    return chainInfo
  }, [optionDatas.chainInfoOpt, poolData.chainId])
  const { openAt, closeAt } = poolData
  const token0 = useToken(poolData.token0 || '', curChain?.ethChainId || undefined)
  const token1 = useToken(poolData.token1 || '', curChain?.ethChainId || undefined)
  const status = useMemo(() => {
    const cur = new Date().valueOf() / 1000
    if (!openAt || !closeAt) return ChainPoolStatus.Upcoming
    if (cur < openAt) return ChainPoolStatus.Upcoming
    if (cur >= openAt && cur <= closeAt) return ChainPoolStatus.Live
    return ChainPoolStatus.Closed
  }, [openAt, closeAt])
  const isSm = useBreakpoint('sm')

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
          src={poolData.picture1 || DefaultImg}
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
              <TokenImage src={ChainListMap[poolData.chainId as ChainId]?.logo} size={12} />
              <SansTitle sx={{ color: '#FFF' }}>{curChain?.chainName}</SansTitle>
            </RoundedBox>
            <RoundedBox sx={{ color: '#E1F25C', fontSize: 12 }}>
              {Object.assign({}, IAuctionTypeMap)[poolData.category]}
            </RoundedBox>
          </Stack>
          {poolData.status === PoolStatus.On_Chain && (
            <PoolStatusBox
              style={{ width: 'max-content', height: 'max-content' }}
              status={status}
              claimAt={poolData.claimAt || 0}
              closeTime={poolData.closeAt as number}
              openTime={poolData.openAt as number}
            />
          )}
        </LaunchpadHeadContent>
      </LaunchpadHead>
      <LaunchpadContent
        style={{ padding: isSm ? '12px 16px 16px 16px' : '16px 24px 24px 24px', gap: isSm ? 24 : 60 }}
        flexDirection={isSm ? 'column' : 'row'}
      >
        <Stack gap={16} flex={1}>
          <Stack flexDirection={'row'} gap={12}>
            <Image
              style={{ width: isSm ? 24 : 32, height: isSm ? 24 : 32, borderRadius: isSm ? 24 : 32 }}
              src={baseData.projectLogo}
            />
            <LaunchpadProjectTitle fontSize={isSm ? 16 : 22}>{baseData.projectName}</LaunchpadProjectTitle>
          </Stack>
          <LaunchpadDescription
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {baseData.description}
          </LaunchpadDescription>
          <Row mt={10} gap={6}>
            {baseData?.community
              .filter(item => !!item.communityLink)
              .map((item, index) => (
                <Link
                  sx={{ width: 24, height: 24 }}
                  key={item.communityName + index}
                  href={item.communityLink}
                  target="_blank"
                >
                  <Image width={'100%'} height={'100%'} src={socialMap[item.communityName]} />
                </Link>
              ))}
          </Row>
        </Stack>
        <Stack sx={{ width: '100%' }} flex={1} gap={8}>
          <LaunchpadLabelContainer>
            <LaunchpadLabelTitle>Token Name</LaunchpadLabelTitle>
            <LaunchpadLabelTitle className="w">{token0?.name || token0?.symbol}</LaunchpadLabelTitle>
          </LaunchpadLabelContainer>
          <LaunchpadLabelContainer>
            <LaunchpadLabelTitle>Token Price</LaunchpadLabelTitle>
            <LaunchpadLabelTitle className="w">
              {poolData.ratio} {token1?.name || token1?.symbol}
            </LaunchpadLabelTitle>
          </LaunchpadLabelContainer>
          <LaunchpadLabelContainer className="last">
            <LaunchpadLabelTitle>Token Name</LaunchpadLabelTitle>
            <LaunchpadLabelTitle className="w">{poolData.token0Name}</LaunchpadLabelTitle>
          </LaunchpadLabelContainer>
          <MoreButton
            onClick={() => navigate('/launchpad')}
            style={{ background: isSm ? '#E1F25C' : '', color: isSm ? '#121212' : '' }}
          >
            View more
          </MoreButton>
        </Stack>
      </LaunchpadContent>
    </LaunchpadContainer>
  )
}
const ItemSkeleton = () => {
  const isSm = useBreakpoint('sm')
  return (
    <Stack sx={{ width: '100%', height: isSm ? 590 : '100%', overflow: 'hidden', borderRadius: 24 }}>
      <Skeleton variant="rectangular" width={'100%'} height={'100%'} />
    </Stack>
  )
}
const AuctionLaunchpadCard = () => {
  const { data } = useRequest(async () => {
    const res = await searchLaunchpad({})
    return {
      list: res.data.list
    }
  })

  const isSm = useBreakpoint('sm')
  const ref = useRef<any>(null)
  const swiper = useRef<SwiperCore>()
  const [swipePrev, canSwipePrev] = useState(false)
  const [swipeNext, canSwipeNext] = useState(true)
  console.log('data7777', data)

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
        <Box ref={ref} mt={isSm ? 40 : 60}>
          <SlideProgress
            hideArrow
            swiperRef={swiper}
            canSwipePrev={canSwipePrev}
            canSwipeNext={canSwipeNext}
            swiperStyle={{
              style: { height: isSm ? '100%' : 500, paddingBottom: isSm ? 50 : 0 },
              spaceBetween: 20,
              slidesPerView: isSm ? 1.2 : 2,
              loop: isSm,
              // autoplay: isSm,
              freeMode: true,
              pagination: isSm
            }}
          >
            {data && data.list.length > 0
              ? data.list.map(i => (
                  <SwiperSlide key={i.poolInfo.poolId}>
                    <LaunchpadCardItem poolData={i.poolInfo} baseData={i.basicInfo} />
                  </SwiperSlide>
                ))
              : [
                  <SwiperSlide key={1}>
                    <ItemSkeleton />
                  </SwiperSlide>,
                  <SwiperSlide key={2}>
                    <ItemSkeleton />
                  </SwiperSlide>
                ]}
          </SlideProgress>
        </Box>
      </Container>
    </Box>
  )
}
export default AuctionLaunchpadCard
