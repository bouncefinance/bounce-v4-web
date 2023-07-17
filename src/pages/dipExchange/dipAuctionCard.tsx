import {
  Box,
  styled,
  Stack,
  Avatar,
  SxProps,
  Typography,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Button
} from '@mui/material'
import { Done as DoneIcon } from '@mui/icons-material'
import { useEffect, useState } from 'react'
import { useCountDown } from 'ahooks'

const ThemeStyle = {
  Dark: {
    baseColor: '#626262',
    blueColor: '#4F5FFC'
  }
}
type TState = 'resolved' | 'pending' | 'unresolved'

interface ITimeList {
  time: string
  title: string
  state: TState
}
type THandelTabTime = (index: number) => void

const ProgressTimeTab = ({
  icon,
  list,
  onClick = () => {}
}: {
  icon?: any
  list: ITimeList[]
  onClick?: THandelTabTime
}) => {
  return (
    <ProgressBox>
      {list.map((item, index) => (
        <ProgressItem
          onClick={() => onClick(index)}
          key={'ProgressBox' + index}
          icon={
            item.state === 'resolved' ? <DoneIcon sx={{ color: 'black', width: 15, height: 15 }} /> : icon | (index + 1)
          }
          background={item.state !== 'unresolved' ? ThemeStyle.Dark.blueColor : ThemeStyle.Dark.baseColor}
          child={
            <Box sx={{ color: item.state !== 'unresolved' ? ThemeStyle.Dark.blueColor : ThemeStyle.Dark.baseColor }}>
              <BaseH6>{item.time}</BaseH6>
              <ProgressTimeTitle className={item.state === 'pending' ? 'active' : ''}>{item.title}</ProgressTimeTitle>
            </Box>
          }
        />
      ))}
    </ProgressBox>
  )
}

const ProgressItem = ({
  background,
  icon,
  sxStyle,
  child,
  onClick
}: {
  background: string
  icon?: any
  sxStyle?: SxProps
  child?: JSX.Element
  onClick?: () => void
}) => {
  return (
    <Box
      onClick={() => onClick && onClick()}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        gap: 12,
        '&:hover': { cursor: 'pointer' },
        ...sxStyle
      }}
    >
      <Stack direction="row" spacing={0} sx={{ alignItems: 'center' }}>
        <Avatar
          sx={{ width: 20, height: 20, fontSize: 12, fontFamily: 'Inter', background: background, color: 'black' }}
        >
          {icon}
        </Avatar>
        <Box sx={{ height: 4, width: '100%', background: background }}></Box>
      </Stack>
      {child}
    </Box>
  )
}

const Timeline = () => {
  return (
    <Stack flexDirection={'column'}>
      <Stack flexDirection={'row'} justifyContent={'space-between'}>
        <TimelineTitle>Subscription Timeline</TimelineTitle>
        <BaseH6
          sx={{
            padding: '12px 24px',
            color: '#4F5FFC',
            borderRadius: 100,
            border: '1px solid var(--dip, #4F5FFC)',
            fontSize: 14,
            cursor: 'pointer'
          }}
        >
          My private launchpad
        </BaseH6>
      </Stack>
    </Stack>
  )
}
const SoldProgress = ({ currTime, currTab }: { currTime: any; currTab: string }) => {
  console.log(currTime, currTab)
  const soldList: { [key: string]: any; state: TState }[] = [
    { stage: 1, sold: '50%', state: 'resolved', rate: 0.1 },
    { stage: 2, sold: '30%', state: 'pending', rate: 0.12 },
    { stage: 3, sold: '30%', state: 'unresolved', rate: 0.14 }
  ]
  return (
    <Stack my={30} flexDirection={'row'} sx={{ padding: '16px 28px', background: '#1D1D29', borderRadius: 6 }}>
      {soldList.map((t, i) => (
        <ProgressItem
          key={'ProgressItem' + i}
          background={t.state === 'resolved' ? ThemeStyle.Dark.blueColor : ThemeStyle.Dark.baseColor}
          icon={<DoneIcon sx={{ color: 'black', width: 15, height: 15 }} />}
          sxStyle={{ flexDirection: 'column-reverse' }}
          child={
            <Stack sx={{ flexDirection: 'column', color: t.state !== 'resolved' ? '#626262' : '#D7D6D9' }}>
              <BaseH6 sx={{ fontFamily: 'Public Sans', fontSize: 12, letterSpacing: -0.24 }}>state {t.stage}</BaseH6>
              <BaseH6 mt={4} sx={{ fontFamily: 'Public Sans', fontSize: 14, letterSpacing: -0.28 }}>
                {t.sold}
                {t.state === 'resolved' ? 'sold' : t.state === 'pending' ? 'sale in progress' : 'sale not started'}
              </BaseH6>
              <BaseH6 sx={{ fontFamily: 'Public Sans', fontSize: 14, letterSpacing: -0.28 }}>
                1 DIP / {t.rate}USDT
              </BaseH6>
            </Stack>
          }
        />
      ))}
    </Stack>
  )
}
const SoldAuctionCard = ({ currTime }: { currTime: any }) => {
  const steps = ['Subscription Period', 'Final Token claim']
  const [activeStep, setActiveStep] = useState(0)
  console.log(setActiveStep)
  const [, formattedRes] = useCountDown({
    targetDate: `${currTime.time} 23:00:00`
  })
  const currSoldInfo = {
    'Completed Commit': '122,256,345.00 USDT',
    'Total sold': '2685.00 DIP',
    'Total participants': '130,672',
    'Current price': '1 DIP = 0.002514 USDT'
  }
  return (
    <Stack flexDirection={'row'} gap={40}>
      <Box sx={{ width: 770, height: 346, pb: 24 }}>Price Chart</Box>
      <Box sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((t, i) => (
            <Step key={'Step' + i}>
              <StepLabel optional={<BaseH6 sx={{ color: '#959595' }}>{currTime.time}</BaseH6>}>
                <BaseH6 sx={{ color: '#D7D6D9', fontFamily: 'Public Sans', letterSpacing: '-0.28px' }}>{t}</BaseH6>
              </StepLabel>
              <StepContent>
                <Stack flexDirection={'row'} alignItems={'center'}>
                  <BaseH6>Time left until this round of subscription starts:</BaseH6>
                  <CountDownTitle>
                    <Typography component={'span'}> {formattedRes.days} </Typography> Days
                    <Typography component={'span'}> {formattedRes.hours} </Typography> Hours
                    <Typography component={'span'}> {formattedRes.minutes} </Typography> Mins
                  </CountDownTitle>
                </Stack>
                <SoldFormInfo>
                  <Box
                    sx={{
                      width: '318px',
                      height: 200,
                      display: 'flex',
                      flexDirection: 'row',
                      flexWrap: 'wrap',
                      alignContent: 'flex-start',
                      background: '#121219',
                      borderRadius: 6,
                      padding: 16,
                      '&>div': {
                        width: '50%',
                        height: 'max-content',
                        marginBottom: 10
                      }
                    }}
                  >
                    <Box>
                      <BaseH6 sx={{ fontSize: 12, color: '#626262' }}>Completed Commit</BaseH6>
                      <BaseH6 sx={{ color: '#959595' }}>{currSoldInfo['Completed Commit']}</BaseH6>
                    </Box>
                    <Box>
                      <BaseH6 sx={{ fontSize: 12, color: '#626262' }}>Total sold</BaseH6>
                      <BaseH6 sx={{ color: '#959595' }}>{currSoldInfo['Total sold']}</BaseH6>
                    </Box>
                    <Box>
                      <BaseH6 sx={{ fontSize: 12, color: '#626262' }}>Total participants</BaseH6>
                      <BaseH6 sx={{ color: '#959595' }}>{currSoldInfo['Total participants']}</BaseH6>
                    </Box>
                    <Box>
                      <BaseH6 sx={{ fontSize: 12, color: '#626262' }}>Current price</BaseH6>
                      <BaseH6 sx={{ color: '#959595' }}>{currSoldInfo['Current price']}</BaseH6>
                    </Box>
                  </Box>
                  <Box py={16}>
                    <BaseH6 sx={{ color: '#959595' }}>Your max commitment limit </BaseH6>
                    <BaseH6 mt={6} sx={{ fontSize: 16, fontFamily: 'Public Sans', color: '#D7D6D9' }}>
                      345.00 USDT
                    </BaseH6>
                    <Stack flexDirection={'row'} gap={12} mt={20}>
                      <Box>
                        <BaseH6 sx={{ fontSize: 12, color: '#959595' }}>You will receive</BaseH6>
                        <BaseH6 sx={{ color: '#2B51DA' }}>-</BaseH6>
                      </Box>
                      <Box>
                        <BaseH6 sx={{ fontSize: 12, color: '#959595' }}>Your committed USDT</BaseH6>
                        <BaseH6 sx={{ color: '#2B51DA' }}>-</BaseH6>
                      </Box>
                    </Stack>
                    <Button
                      sx={{
                        width: 278,
                        height: 48,
                        padding: '12px 20px',
                        background: 'rgb(215,214,217)',
                        marginTop: 30,
                        borderRadius: 6,
                        color: 'white',
                        '&:hover': {
                          background: 'rgb(215,214,217)',
                          border: '1px solid rgb(215,214,217)'
                        }
                      }}
                    >
                      Commit
                    </Button>
                  </Box>
                </SoldFormInfo>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </Box>
    </Stack>
  )
}
const RoundTabCard = ({ currTimeInfo }: { currTimeInfo: any }) => {
  const tabs = ['DIP Round', 'DGT Round']
  const [currTab, setCurrTab] = useState(tabs[0])
  return (
    <Box px={72} mt={40}>
      <Stack flexDirection={'row'}>
        {tabs.map((t, i) => (
          <Tab key={'Tab' + i} onClick={() => setCurrTab(t)} className={currTab === t ? 'active' : ''}>
            <TabTitle>{t}</TabTitle>
            <BaseH6>{`${currTimeInfo.time} 23:00:00 To ${currTimeInfo.time} 22:59:59`}</BaseH6>
          </Tab>
        ))}
      </Stack>
      <Box sx={{ padding: '48px 56px' }}>
        <Timeline />
        <SoldProgress currTime={currTimeInfo} currTab={currTab} />
        <SoldAuctionCard currTime={currTimeInfo} />
      </Box>
    </Box>
  )
}
export const DipAuctionCard = () => {
  // state:resolved | pending | unresolved
  const timeProps: { list: ITimeList[] } = {
    list: [
      {
        time: '2023-7-05',
        title: 'First Round',
        state: 'resolved'
      },
      {
        time: '2023-6-14',
        title: 'Second Round',
        state: 'pending'
      },
      {
        time: '2023-6-14',
        title: 'Third Round',
        state: 'unresolved'
      },
      {
        time: '2023-6-14',
        title: 'Fourth Round',
        state: 'unresolved'
      },
      {
        time: '2023-6-14',
        title: 'First Round',
        state: 'unresolved'
      },
      {
        time: '2023-6-14',
        title: 'First Round',
        state: 'unresolved'
      },
      {
        time: '2023-6-14',
        title: 'First Round',
        state: 'unresolved'
      },
      {
        time: '2023-6-14',
        title: 'First Round',
        state: 'unresolved'
      }
    ]
  }
  const [currTime, setCurrTime] = useState(0)
  const handelTabTime: THandelTabTime = (index: number) => {
    setCurrTime(index)
  }
  useEffect(() => {
    console.log(currTime)
  }, [currTime])
  return (
    <Box sx={{ color: 'white' }}>
      <ProgressTimeTab {...timeProps} onClick={handelTabTime} />
      <RoundTabCard currTimeInfo={timeProps.list[currTime]} />
    </Box>
  )
}
const ProgressBox = styled(Box)({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  padding: '0 72px'
})
const BaseH6 = styled(Typography)({
  fontSize: 13,
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '140%',
  textTransform: 'capitalize'
})
const ProgressTimeTitle = styled(Typography)({
  width: 'max-content',
  fontSize: 16,
  fontFamily: 'Public Sans',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '150%',
  letterSpacing: -0.32,
  '&.active': {
    borderBottom: '1px solid #4F5FFC'
  }
})
const Tab = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  padding: '15px 28px',
  cursor: 'pointer',
  '&>p': {
    color: '#626262'
  },
  // background: 'transparent',
  '&.active': {
    background: '#121219',
    cursor: 'initial',
    '&>p:nth-child(1)': {
      color: '#4F5FFC'
    },
    '&>p:nth-child(2)': {
      color: '#959595'
    }
  }
})
const TabTitle = styled(Typography)({
  fontSize: '20px',
  fontFamily: 'Public Sans',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '140%',
  letterSpacing: '-0.4px',
  textTransform: 'capitalize'
})
const TimelineTitle = styled(Typography)({
  fontSize: '20px',
  fontFamily: 'Public Sans',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '140%',
  letterSpacing: '-0.4px',
  textTransform: 'capitalize'
})
const CountDownTitle = styled(Typography)({
  textAlign: 'center',
  leadingTrim: 'both',
  textEdge: 'cap',
  fontSize: '16px',
  fontFamily: 'Public Sans',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '140%',
  letterSpacing: '-0.4px',
  textTransform: 'capitalize',
  paddingLeft: 16,
  '&>span': {
    color: '#4F5FFC',
    fontSize: 20
  }
})
const SoldFormInfo = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  gap: 24,
  background: '#1D1D29',
  borderRadius: 6,
  padding: 16,
  marginTop: 20
})
