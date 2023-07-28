import { Box, Container, Skeleton, Stack, styled, useTheme } from '@mui/material'
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
import { ReactComponent as VerifySvg } from 'assets/imgs/profile/verify.svg'
import { VerifyStatus } from 'api/profile/type'

interface IAuctionActiveCard {
  userId: number
  img: string
  name: string
  desc: string
  createdCount: string
  participated: string
  ifKyc: VerifyStatus
}

const YellowSpan = styled('span')`
  color: #b5e529;
`

const AuctionActiveCard: React.FC<IAuctionActiveCard> = props => {
  const isSm = useBreakpoint('sm')
  const navigate = useNavigate()
  const theme = useTheme()
  const verified = props.ifKyc === VerifyStatus.Verified
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
        borderRadius: '20px',
        flexDirection: 'row',
        [theme.breakpoints.down('md')]: {
          flexDirection: 'column',
          height: '364px',
          boxSizing: 'border-box',
          width: '230px',
          gap: '16px'
        }
      }}
    >
      <img
        style={{
          width: isSm ? '198px' : '150px',
          height: isSm ? '198px' : '150px',
          borderRadius: '14px',
          marginLeft: isSm ? '-2px' : 0
        }}
        src={props.img ? props.img : EmptyImg}
      />
      <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
        <Box mb={16} sx={{ wordBreak: 'break-all' }}>
          <Stack flexDirection={'row'} alignItems={'center'} gap={8}>
            {verified && <VerifySvg style={{ width: 24, height: 24 }} />}

            <H5
              sx={{
                width: 'calc(100% - 24px - 8px)',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis'
              }}
            >
              {props.name}
            </H5>
          </Stack>

          <SmallText
            sx={{
              color: '#1B1B1B66',
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {/* to remain space of description  */}
            {props.desc || '\u00A0'}
          </SmallText>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            padding: '16px 20px',
            gap: '24px',
            height: 'fit-content',
            background: '#F6F7F3',
            borderRadius: '6px',
            [theme.breakpoints.down('md')]: {
              gap: '12px',
              padding: '8px 12px',
              width: '198px'
            }
          }}
        >
          <Box>
            <SmallText>Auctions Created</SmallText>
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
  const isMd = useBreakpoint('md')
  return (
    <Box
      sx={{
        display: 'flex',
        padding: '16px',
        flexDirection: isMd ? 'column' : 'row',
        cursor: 'pointer',
        width: isMd ? 230 : 'fit-content',
        height: isMd ? 364 : 'auto',
        gap: '20px',
        background: '#FFFFFF',
        borderRadius: '20px'
      }}
    >
      <Box sx={{ width: isMd ? '198px' : '150px', height: isMd ? '198px' : '150px', borderRadius: '14px' }}>
        <Skeleton
          variant="rectangular"
          component={'div'}
          sx={{ width: '100%', height: '100%', borderRadius: '14px' }}
        />
      </Box>

      <Box width={isMd ? '100%' : '220px'} display={'flex'} flexDirection={'column'} justifyContent={'space-between'}>
        <Skeleton width={'30%'} height={28} variant="text" component={'div'} sx={{ marginBottom: isMd ? 16 : 0 }} />
        <Skeleton width={'100%'} height={80} variant="rounded" component={'div'} sx={{ borderRadius: '10px' }} />
      </Box>
    </Box>
  )
}
export const ActiveUser: React.FC = () => {
  const isSm = useBreakpoint('md')
  const { data } = useRequest(async () => {
    const resp = await getActiveUsers()
    return {
      list: resp.data.list,
      total: resp.data.total
    }
  })
  console.log('data')
  console.log(data)

  const slideCardWidth = isSm ? 230 : 442
  const [slidesPerView, setSlidesPerView] = useState<number>(window.innerWidth / slideCardWidth)
  useEffect(() => {
    const resetView = () => {
      setSlidesPerView(Math.ceil(window.innerWidth / slideCardWidth))
    }
    window.addEventListener('resize', resetView)
    return () => {
      window.removeEventListener('resize', resetView)
    }
  }, [slideCardWidth])

  return (
    <Box
      className={'ActiveUser'}
      style={{
        width: '100%',
        padding: isSm ? '22px 0 116px' : '100px 0 140px'
      }}
    >
      <Container
        sx={{
          maxWidth: '1440px !important'
        }}
      >
        <H2 mb={isSm ? 20 : 80} ml={isSm ? 16 : 0}>
          Most active {isSm && <br />} <YellowSpan>auctioneers</YellowSpan> and <YellowSpan>bidders</YellowSpan>
        </H2>
      </Container>
      <SlideProgress
        hideArrow={isSm}
        swiperStyle={{
          spaceBetween: 20,
          slidesPerView: slidesPerView,
          loop: isSm,
          autoplay: isSm,
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
                  desc={data.creatorUserInfo.description}
                  createdCount={data.totalCreated}
                  participated={data.totalPart}
                  ifKyc={data.creatorUserInfo.ifKyc}
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
