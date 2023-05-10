import { Box, Container, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { H2, H5, SmallText } from '../../../components/Text'
import { SlideProgress } from '../../auction/SlideProgress'
import { SwiperSlide } from 'swiper/react'
import EmptyImg from 'assets/imgs/auction/empty-avatar.svg'
import { useRequest } from 'ahooks'
import { getActiveUsers } from '../../../api/market'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'

interface IAuctionActiveCard {
  userId: number
  img: string
  name: string
  desc: string
  createdCount: string
  participated: string
}

const YellowSpan = styled('span')`
  color: #c8f056;
`

const AuctionActiveCard: React.FC<IAuctionActiveCard> = props => {
  const navigate = useNavigate()
  return (
    <Box
      onClick={() => navigate(routes.profile.summary + `?id=${props.userId}`)}
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
      <img
        style={{
          width: '150px',
          height: '150px',
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

export const ActiveUser: React.FC = () => {
  const { data } = useRequest(async () => {
    const resp = await getActiveUsers()
    return {
      list: resp.data.list,
      total: resp.data.total
    }
  })
  const [slidesPerView, setSlidesPerView] = useState<number>(window.innerWidth / 442)
  useEffect(() => {
    const resetView = () => {
      setSlidesPerView(window.innerWidth / 442)
    }
    window.addEventListener('resize', resetView)
    return () => {
      window.addEventListener('resize', resetView)
    }
  }, [])
  return (
    <Box
      style={{
        width: '100%',
        padding: '100px 0 140px'
      }}
    >
      <Container
        sx={{
          maxWidth: '1440px !important'
        }}
      >
        <H2 mb={80}>
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
        {data?.list.map((data: any, idx: number) => (
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
        ))}
      </SlideProgress>
    </Box>
  )
}
