import { Box, Container, Skeleton, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { H2, H5, SmallText } from '../../../components/Text'
import { SlideProgress } from '../../auction/SlideProgress'
import { SwiperSlide } from 'swiper/react'
import EmptyImg from 'assets/imgs/auction/empty-avatar.svg'
import { useRequest } from 'ahooks'
import { getActiveUsers } from '../../../api/market'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
import useBreakpoint from '../../../hooks/useBreakpoint'

interface IAuctionActiveCard {
  userId: number
  img: string
  name: string
  desc: string
  createdCount: string
  participated: string
}

const YellowSpan = styled('span')`
  color: #b5e529;
`

const AuctionActiveCard: React.FC<IAuctionActiveCard> = props => {
  const isSm = useBreakpoint('sm')
  const navigate = useNavigate()
  return (
    <Box
      onClick={() => navigate(routes.profile.summary + `?id=${props.userId}`)}
      sx={{
        display: 'flex',
        padding: '16px',
        cursor: 'pointer',
        width: 'fit-content',
        gap: isSm ? '10px' : '20px',
        background: '#FFFFFF',
        borderRadius: '20px'
      }}
    >
      <img
        style={{
          width: isSm ? '100px' : '150px',
          height: isSm ? '100px' : '150px',
          borderRadius: '14px'
        }}
        src={props.img ? props.img : EmptyImg}
      />
      <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
        <Box>
          <H5>{props.name}</H5>
          <SmallText>{props.desc}</SmallText>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: '16px 20px',
            gap: '24px',
            width: 'fit-content',
            height: 'fit-content',
            background: '#F6F7F3',
            borderRadius: '6px'
          }}
        >
          <Box>
            <SmallText>Auction Created</SmallText>
            <H5>{props.createdCount}</H5>
          </Box>
          <Box>
            <SmallText>Participated</SmallText>
            <H5>{props.participated}</H5>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const ActiveUserSkeletonCard = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        padding: '16px',
        cursor: 'pointer',
        width: 'fit-content',
        gap: '20px',
        background: '#FFFFFF',
        borderRadius: '20px'
      }}
    >
      <Box sx={{ width: '150px', height: '150px', borderRadius: '14px' }}>
        <Skeleton
          variant="rectangular"
          component={'div'}
          sx={{ width: '150px', height: '150px', borderRadius: '14px' }}
        />
      </Box>

      <Box width={'220px'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
        <Skeleton width={'30%'} height={28} variant="text" component={'div'} />
        <Skeleton width={'100%'} height={80} variant="rounded" component={'div'} sx={{ borderRadius: '10px' }} />
      </Box>
    </Box>
  )
}
export const ActiveUser: React.FC = () => {
  const isSm = useBreakpoint('sm')
  const { data } = useRequest(async () => {
    const resp = await getActiveUsers()
    return {
      list: resp.data.list,
      total: resp.data.total
    }
  })
  const slideCardWidth = isSm ? 329 : 442
  const [slidesPerView, setSlidesPerView] = useState<number>(window.innerWidth / slideCardWidth)
  useEffect(() => {
    const resetView = () => {
      setSlidesPerView(window.innerWidth / slideCardWidth)
    }
    window.addEventListener('resize', resetView)
    return () => {
      window.addEventListener('resize', resetView)
    }
  }, [slideCardWidth])
  return (
    <Box
      className={'ActiveUser'}
      style={{
        width: '100%',
        padding: isSm ? '42px 0' : '100px 0 140px'
      }}
    >
      <Container
        sx={{
          maxWidth: '1440px !important'
        }}
      >
        <H2 mb={isSm ? 20 : 80} ml={isSm ? 12 : 0}>
          Most active <YellowSpan>auctioneers</YellowSpan> and <YellowSpan>bidders</YellowSpan>
        </H2>
      </Container>
      <SlideProgress
        swiperStyle={{
          spaceBetween: 16,
          slidesPerView: slidesPerView,
          loop: false,
          freeMode: true
        }}
      >
        {data && data?.list && data.list.length
          ? data?.list.map((data: any, idx: number) => (
              <SwiperSlide key={idx}>
                <AuctionActiveCard
                  userId={data.creatorUserInfo.userId}
                  img={data.creatorUserInfo.avatar}
                  name={data.creatorUserInfo.name}
                  desc={data.creatorUserInfo.companyIntroduction}
                  createdCount={data.totalCreated}
                  participated={data.totalPart}
                />
              </SwiperSlide>
            ))
          : new Array(8).fill(0).map((item, index) => (
              <SwiperSlide key={index}>
                <ActiveUserSkeletonCard />
              </SwiperSlide>
            ))}
      </SlideProgress>
    </Box>
  )
}
