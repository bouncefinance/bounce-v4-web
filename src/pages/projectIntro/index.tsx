import ProjectBg from 'assets/images/project-bg.png'
import { Box, Button, Stack, styled, Typography } from '@mui/material'
import { H4, H5, H6 } from '../../components/Text'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { IPrivatePadProp, IProjectInfo, PrivatePadList } from '../launchpad'
import { Row } from '../../components/Layout'
import { AlignBottomBG } from '../../bounceComponents/launchpad/LaunchCard'
import { ReactComponent as IconBook } from 'assets/svg/icon-book.svg'
// import { ReactComponent as QuestionMark } from 'assets/svg/icon-question-mark.svg'
import TokenImage from '../../bounceComponents/common/TokenImage'
import { ChainId, ChainListMap } from '../../constants/chain'
import { useState } from 'react'
import FooterPc from '../../components/Footer/FooterPc'
import { useNavigate } from 'react-router-dom'

const GrayButton = styled(Button)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  color: white;
  padding: 12px 20px;
  gap: 12px;
  width: fit-content;
  margin-top: 91px;
  margin-left: 40px;
  background: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(5px);
  border-radius: 8px;

  :hover {
    background: rgba(255, 255, 255, 0.2);
    border: none;
  }
`
const WhiteButton = styled(Button)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 6px 12px;
  gap: 8px;
  width: fit-content;
  height: 32px;
  background: #ffffff;
  border-radius: 8px;
`
const Upcoming = styled(H6)`
  color: white;
  align-self: end;
  width: min-content;
  padding: 4px 12px;
  height: 32px;
  margin-right: 40px;
  background: rgba(18, 18, 18, 0.2);
  backdrop-filter: blur(2px);
  border-radius: 100px;
`
const GrayBg = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 14px;
  gap: 10px;
  width: fit-content;
  height: 32px;
  background: rgba(18, 18, 18, 0.6);
  backdrop-filter: blur(5px);
  border-radius: 100px;
`

const VerticalDivider = styled(Box)`
  width: 1px;
  height: 32px;
  border: 1px solid rgba(255, 255, 255, 0.6);
`

function Price({ title, value }: { title: string; value: string }) {
  return (
    <Box gap={8} sx={{ color: 'white' }}>
      <Typography variant={'body2'}>{title}</Typography>
      <Typography variant={'h4'}>{value}</Typography>
    </Box>
  )
}

export function ProjectIntro() {
  const item = PrivatePadList[0]
  return (
    <Box>
      <ProjectHead item={item} />
      <Tabs item={item} />
      <FooterPc />
    </Box>
  )
}

function ProjectHead({ item }: { item: IPrivatePadProp }) {
  const prices = [
    {
      title: 'Token Name',
      value: 'BLADE'
    },
    {
      title: 'Blockchain',
      value: 'zkSync Era'
    }
    // {
    //   title: 'Hard Cap Per User',
    //   value: item.hardCapPerUser
    // },
    // {
    //   title: 'Single Initial Investment',
    //   value: item.singleInitialInvestment
    // }
  ]
  const pricesComponent = prices.map((p, i) => <Price title={p.title} value={p.value} key={i} />)
  const nav = useNavigate()
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        minHeight: '600px',
        marginTop: '-76px'
      }}
    >
      <img
        src={ProjectBg}
        style={{
          position: 'absolute',
          width: '100%',
          zIndex: -2,
          filter: 'blur(50px)',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0
        }}
      />
      <Box
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          background: `url(${ProjectBg})`,
          top: 0,
          right: '40px',
          bottom: 0,
          borderRadius: '0 0 20px 20px',
          backgroundSize: 'cover',
          objectFit: 'scale-down',
          left: '40px'
        }}
      >
        <GrayButton
          onClick={() => {
            nav('/launch-pad')
          }}
        >
          <ArrowBackIcon />
          <Typography variant={'h5'}>Launchpad homepage</Typography>
        </GrayButton>
        <Upcoming>Upcoming</Upcoming>
        <AlignBottomBG
          sx={{
            display: 'flex',
            flexDirection: 'column',
            borderRadius: '0 0 20px 20px',
            alignItems: 'center',
            paddingBottom: '80px',
            paddingTop: '20px',
            background: 'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #000000 100%)'
          }}
        >
          <img src={item.avatar} style={{ width: 60, height: 60, borderRadius: 6 }} />
          <Typography mt={16} variant={'h1'} sx={{ color: 'white' }}>
            {item.title}
          </Typography>
          <Typography mt={14} variant={'body1'} sx={{ color: 'white', maxWidth: '800px', textAlign: 'center' }}>
            {item.desc}
          </Typography>
          <Row mt={32} alignItems={'center'} gap={16}>
            {item.social}
            <WhiteButton>
              <IconBook />
              <H6>Whitepaper</H6>
            </WhiteButton>
            {/*<WhiteButton>*/}
            {/*  <QuestionMark />*/}
            {/*  <H6>FAQ</H6>*/}
            {/*</WhiteButton>*/}
          </Row>
          <Row mt={16} gap={8}>
            <GrayBg>
              <TokenImage
                src={item.backendChainId ? ChainListMap?.[item.backendChainId as ChainId]?.logo : ''}
                size={12}
              />
              <Typography variant={'h6'} color={'white'}>
                zkSync Era
              </Typography>
            </GrayBg>
            {/*<GrayBg>*/}
            {/*  <Typography color={'#C8F056'}>Playable Auction</Typography>*/}
            {/*</GrayBg>*/}
          </Row>
          <Row gap={24} mt={16}>
            <>
              {pricesComponent.flatMap((element, index) => {
                if (index !== pricesComponent.length - 1) {
                  return [element, <VerticalDivider key={index} />]
                }
                return [element]
              })}
            </>
          </Row>
        </AlignBottomBG>
      </Box>
    </Box>
  )
}

const TabBg = styled(H4)`
  padding: 24px;
  min-width: 320px;
  height: 76px;
  border-radius: 20px 20px 0 0;
  color: #959595;

  //&:hover {
  //  cursor: pointer;
  //  background: #e1f25c;
  //  color: #121212;
  //}

  &.select {
    background: #ffffff;
    color: #121212;
  }
`

function Tabs({ item }: { item: IPrivatePadProp }) {
  // const tabs = ['Project Information', 'STEPN Token', 'Token Metrics']
  const tabs = ['Project Information', 'Investment and Partners']
  const [tab, setTab] = useState(tabs[0])
  console.log(setTab)

  return (
    <Box mt={120} mb={140}>
      <Row justifyContent={'center'}>
        {tabs.map((t, i) => (
          <TabBg key={i} /*onClick={() => setTab(t)}*/ className={tab === t ? 'select' : ''}>
            {t}
          </TabBg>
        ))}
      </Row>
      <Box sx={{ background: 'white', padding: '20px 72px', minHeight: '486px' }}>
        {tab === tabs[0] && <ProjectInfo item={item} />}
        {/*{tab === tabs[1] && <STEPNToken item={item} />}*/}
        {tab === tabs[2] && <TokenMetrics item={item} />}
      </Box>
    </Box>
  )
}

const ProjectInfoSubtitle = styled(H5)`
  padding: 16px 20px;
  width: 360px;
  border-radius: 8px;
  color: #959595;

  &:hover {
    cursor: pointer;
    border: 1px solid #e1f25c;
    color: #121212;
    border-radius: 8px;
  }

  &.select {
    background: #e1f25c;
    color: #121212;
  }
`

const ProjectContentBg = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 80px 40px 120px;
  gap: 40px;
  width: 912px;
  min-height: 446px;
  background: #f6f7f3;
  border-radius: 30px;
`

function InfoList({ info }: { info: IProjectInfo[] }) {
  const [currentIdx, setCurrentIdx] = useState(0)
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <Stack spacing={10}>
        {info.map((i, idx) => (
          <ProjectInfoSubtitle
            key={idx}
            onClick={() => setCurrentIdx(idx)}
            className={idx === currentIdx ? 'select' : ''}
          >
            {i.title}
          </ProjectInfoSubtitle>
        ))}
      </Stack>
      <ProjectContentBg>
        <Typography variant={'h2'}>{info[currentIdx].title}</Typography>
        <Typography variant={'body1'}>{info[currentIdx].info}</Typography>
      </ProjectContentBg>
    </Box>
  )
}

function ProjectInfo({ item }: { item: IPrivatePadProp }) {
  return <InfoList info={item.projectInfo} />
}

// function STEPNToken({ item }: { item: IPrivatePadProp }) {
//   return <></>
// }

function TokenMetrics({ item }: { item: IPrivatePadProp }) {
  return <InfoList info={item.tokenMetrics} />
}
