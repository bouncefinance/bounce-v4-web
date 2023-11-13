import { Box, Container, Skeleton, Stack, styled, useTheme } from '@mui/material'
import React, { useEffect, useRef, useState } from 'react'
import { H2, H5, SmallText } from '../../../components/Text'
import { SlideProgress } from '../../auction/SlideProgress'
import { SwiperSlide } from 'swiper/react'
import EmptyImg from 'assets/imgs/auction/empty-avatar.svg'
import { useRequest } from 'ahooks'
import { getActiveUsers } from '../../../api/market'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
import useBreakpoint from '../../../hooks/useBreakpoint'
// import { ReactComponent as VerifySvg } from 'assets/imgs/profile/verify.svg'
import { VerifyStatus } from 'api/profile/type'
import VerifiedIcon from '../VerifiedIcon'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { BoxSpaceBetween } from '../../../pages/tokenToolBox/page/disperse/disperse'
import SwiperCore from 'swiper'

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
  console.log('ifkey', props.ifKyc)
  return (
    <Box
      onClick={() => navigate(routes.profile.summary + `?id=${props.userId}`)}
      sx={{
        width: isSm ? '220px' : '240px',
        height: isSm ? '286px' : '300px',
        display: 'flex',
        cursor: 'pointer',
        background: '#FFFFFF',
        borderRadius: '12px',
        flexDirection: 'column',
        [theme.breakpoints.down('md')]: {
          flexDirection: 'column',
          boxSizing: 'border-box'
        },
        '&:hover': {
          border: '1px solid #12121233'
        }
      }}
    >
      <img
        style={{
          width: '100%',
          height: isSm ? '180px' : '180px',
          borderRadius: '12px 12px 0 0',
          marginLeft: isSm ? '-2px' : 0
        }}
        src={props.img ? props.img : EmptyImg}
      />
      <Box display={'flex'} flexDirection={'column'} justifyContent={'space-between'} padding={isSm ? 12 : '16px'}>
        <Box sx={{ wordBreak: 'break-all' }}>
          <Stack flexDirection={'row'} alignItems={'center'}>
            {props.ifKyc === VerifyStatus.Verified && <VerifiedIcon sx={{ mr: 8 }} ifKyc={props.ifKyc} />}
            <H5
              sx={{
                width: 'calc(100% - 24px - 8px)',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 1,
                WebkitBoxOrient: 'vertical',
                textOverflow: 'ellipsis',
                [theme.breakpoints.down('md')]: {
                  fontSize: 16
                },
                '&:hover': {
                  color: '#A4D220'
                }
              }}
            >
              {props.name}
            </H5>
          </Stack>

          {/*<SmallText*/}
          {/*  sx={{*/}
          {/*    color: '#1B1B1B66',*/}
          {/*    display: '-webkit-box',*/}
          {/*    WebkitLineClamp: 1,*/}
          {/*    WebkitBoxOrient: 'vertical',*/}
          {/*    overflow: 'hidden',*/}
          {/*    textOverflow: 'ellipsis'*/}
          {/*  }}*/}
          {/*>*/}
          {/*  /!* to remain space of description  *!/*/}
          {/*  {props.desc || '\u00A0'}*/}
          {/*</SmallText>*/}
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-start',
            marginTop: isSm ? 12 : '16px',
            gap: '24px',
            height: 'fit-content',
            [theme.breakpoints.down('md')]: {
              gap: '12px',
              width: '220px'
            }
          }}
        >
          <Box>
            <SmallText sx={{ color: '#1B1B1B99' }}>Auctions Created</SmallText>
            <H5>{props.createdCount}</H5>
          </Box>
          <Box>
            <SmallText sx={{ color: '#1B1B1B99' }}>Participated</SmallText>
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
        height: isMd ? 300 : 'auto',
        gap: '20px',
        background: '#FFFFFF',
        borderRadius: '20px'
      }}
    >
      <Box sx={{ width: isMd ? '220px' : '150px', height: isMd ? '220px' : '150px', borderRadius: '14px' }}>
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
  const swiper = useRef<SwiperCore>()
  const ref = useRef<any>(null)
  const [width, setWidth] = useState<number | undefined>(undefined)
  const [swipePrev, canSwipePrev] = useState(false)
  const [swipeNext, canSwipeNext] = useState(true)
  const { data } = useRequest(async () => {
    const resp = await getActiveUsers()
    return {
      list: resp.data.list,
      total: resp.data.total
    }
  })

  const slideCardWidth = isSm ? 220 : 260
  const [slidesPerView, setSlidesPerView] = useState<number>(
    (isSm ? window.innerWidth : width || 1296) / slideCardWidth
  )
  useEffect(() => {
    const resetView = () => {
      setSlidesPerView(Math.ceil((width || slideCardWidth) / slideCardWidth))
    }
    window.addEventListener('resize', resetView)
    return () => {
      window.removeEventListener('resize', resetView)
    }
  }, [slideCardWidth, width])

  useEffect(() => {
    // This function checks the width of the referenced element
    const checkWidth = () => {
      if (ref.current) {
        setWidth(ref.current.offsetWidth)
        console.log('ref', ref)
        console.log('ref-offsetWidth', ref.current.offsetWidth)
      }
    }

    // Call the function on mount and on window resize
    window.addEventListener('resize', checkWidth)
    checkWidth()

    // Clean up listener when component is unmounted
    return () => window.removeEventListener('resize', checkWidth)
  }, [])

  const ArrowBg = styled(Box)`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 22px;
    width: 48px;
    height: 48px;
    color: #12121233;
    border-radius: 100px;
    border: 1px solid #12121233;

    &.gray {
      background: #f6f6f3;
    }

    &.available {
      background: var(--ps-yellow-1);
      color: black;
      cursor: pointer;
      border: 1px solid var(--ps-yellow-1);
    }

    &:hover {
      background: #121212;
      color: var(--ps-yellow-1);
      cursor: pointer;
    }

    @media (max-width: 600px) {
      width: 30px;
      height: 30px;
      padding: 18px;
    }
  `

  return (
    <Box
      ref={ref}
      className={'ActiveUser'}
      style={{
        width: '100%',
        padding: isSm ? '22px 0 80px' : '100px 0 140px'
      }}
    >
      <Container
        sx={{
          maxWidth: '1296px !important'
        }}
      >
        <BoxSpaceBetween mb={isSm ? 20 : 80}>
          <H2 ml={isSm ? 16 : 0}>
            Most active {isSm && <br />} <YellowSpan>auctioneers</YellowSpan> and <YellowSpan>bidders</YellowSpan>
          </H2>
          <Box
            display={isSm ? 'none' : 'flex'}
            alignItems={'center'}
            sx={{
              maxWidth: 1296,
              margin: isSm ? '8px auto 0' : '0'
            }}
          >
            <ArrowBg className={swipePrev ? 'available' : ''} onClick={() => swiper?.current?.slidePrev()}>
              <ArrowBackIcon />
            </ArrowBg>
            <ArrowBg
              className={swipeNext ? 'available' : ''}
              ml={8}
              mr={16}
              onClick={() => swiper?.current?.slideNext()}
            >
              <ArrowForwardIcon />
            </ArrowBg>
          </Box>
        </BoxSpaceBetween>
        <SlideProgress
          hideArrow
          swiperRef={swiper}
          canSwipePrev={canSwipePrev}
          canSwipeNext={canSwipeNext}
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
      </Container>
    </Box>
  )
}
