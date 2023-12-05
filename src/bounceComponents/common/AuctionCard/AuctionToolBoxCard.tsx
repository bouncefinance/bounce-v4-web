import { Box, Container, Stack, Typography, styled } from '@mui/material'
import { SlideProgress } from 'bounceComponents/auction/SlideProgress'
import useBreakpoint from 'hooks/useBreakpoint'
import { ModulesConfigParams } from 'pages/tokenToolBox/components/modulesList'
import { useRef } from 'react'
import SwiperCore from 'swiper'
import { SwiperSlide } from 'swiper/react'
import Image from 'components/Image'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { ArrowBg } from './AuctionLaunchpadCard'
import { routes } from 'constants/routes'
import P1 from 'assets/imgs/toolBox/p4.png'
import P2 from 'assets/imgs/toolBox/p7.png'
import P3 from 'assets/imgs/toolBox/p8.png'
import { useNavigate } from 'react-router-dom'
const Title = styled(Typography)(({ theme }) => ({
  color: 'var(--black-100, var(--black-100, #121212))',
  textAlign: 'left',
  leadingTrim: 'both',
  textEdge: 'cap',
  fontVariantNumeric: 'lining-nums proportional-nums',
  fontFamily: 'Inter',
  fontSize: 44,
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '130%', // '31.2px'
  letterSpacing: '-0.48px',

  [theme.breakpoints.down('sm')]: {
    fontSize: 24
  }
}))
const ItemContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  height: '360px',
  padding: '16px 24px 24px 24px',
  flexDirection: 'column',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  borderRadius: 20,
  background: '#FAFAFA',
  cursor: 'pointer',
  boxSizing: 'border-box',
  '&:hover': {
    '& .black': {
      transition: 'all .5s',
      background: '#fff',
      color: '#000',
      border: '1px solid #000'
    }
  },
  '& .black': {
    width: 32,
    height: 32
  },
  '&:hover .img': {
    transition: 'all .8s',
    transform: 'scale(1.1)'
  },
  [theme.breakpoints.down('sm')]: {
    width: 220,
    height: '300px',
    padding: '12px 16px 16px 16px'
  }
}))
const ItemTitle = styled(Typography)(({ theme }) => ({
  color: 'var(--grey-01, #20201E)',
  textAlign: 'left',
  fontFamily: 'Inter',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '140%', // '28px'
  letterSpacing: '-0.4px',
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px'
  }
}))
const ItemBottomTitle = styled(Typography)(({ theme }) => ({
  color: '#121212',
  textAlign: 'left',
  leadingTrim: 'both',
  textEdge: 'cap',
  fontFamily: 'Inter',
  fontSize: '14px',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '150%', // '21px'
  [theme.breakpoints.down('sm')]: {
    fontSize: '16px'
  }
}))
const modulesConfig: ModulesConfigParams[] = [
  {
    logoImg: P1,
    title: 'Token Locker',
    // subTitle: 'Explain what is a token locker........',
    subTitle: '',
    btnTitle: 'Create Lock',
    link: routes.tokenToolBox.tokenLocker
  },
  {
    logoImg: P1,
    title: 'V2 LP Locker',
    // subTitle: 'Explain what is a v2 LP locker........',
    subTitle: '',
    btnTitle: 'V2 LP Locker',
    link: routes.tokenToolBox.tokenLocker + '?tokenType=lp&version=v2'
  },
  {
    logoImg: P1,
    title: 'V3 LP Locker',
    // subTitle: 'Explain what is a token locker........',
    subTitle: '',
    btnTitle: 'V3 LP Locker',
    link: routes.tokenToolBox.tokenLocker + '?tokenType=lp&version=v3'
  },
  {
    logoImg: P2,
    title: 'Token Minter',
    // subTitle: 'Explain what is a token minter........',
    subTitle: '',
    btnTitle: 'Token Minter',
    link: routes.tokenToolBox.tokenMinter
  },
  {
    logoImg: P3,
    title: 'Disperse',
    // subTitle: 'Explain what is a Disperse........',
    subTitle: '',
    btnTitle: 'Disperse',
    link: routes.tokenToolBox.disperse
  }
]
const ToolBoxItemCard = ({ data }: { data: ModulesConfigParams }) => {
  const navigate = useNavigate()
  return (
    <ItemContainer onClick={() => navigate(data.link)}>
      <ItemTitle>{data.title}</ItemTitle>
      <Box
        sx={{ maxWidth: '100%', maxHeight: '100%', width: 'max-content', height: 'max-content', overflow: 'hidden' }}
      >
        <Image className="img" src={data.logoImg} style={{ width: '100%', height: '100%' }} />
      </Box>
      <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} sx={{ width: '100%' }}>
        <ItemBottomTitle>{data.btnTitle}</ItemBottomTitle>
        <ArrowBg className="black">
          <ArrowForwardIcon />
        </ArrowBg>
      </Stack>
    </ItemContainer>
  )
}
const AuctionToolBoxCard = () => {
  const isSm = useBreakpoint('sm')
  const ref = useRef<any>(null)
  const swiper = useRef<SwiperCore>()

  return (
    <Box sx={{ padding: isSm ? '60px 16px 80px 16px' : '100px 72px 120px', background: '#FFF' }}>
      <Container
        sx={{
          maxWidth: '1296px !important'
        }}
      >
        <Title>
          Token <span style={{ color: '#A4D220' }}>ToolBox</span>
        </Title>
        <Box ref={ref} mt={isSm ? 40 : 60}>
          <SlideProgress
            hideArrow
            swiperRef={swiper}
            canSwipePrev={() => {}}
            canSwipeNext={() => {}}
            swiperStyle={{
              style: { paddingBottom: isSm ? 50 : 0 },
              spaceBetween: 20,
              slidesPerView: isSm ? 1.5 : 5,
              freeMode: true,
              pagination: isSm
            }}
          >
            {modulesConfig.map(i => (
              <SwiperSlide key={i.title}>
                <ToolBoxItemCard data={i} />
              </SwiperSlide>
            ))}
          </SlideProgress>
        </Box>
      </Container>
    </Box>
  )
}
export default AuctionToolBoxCard
