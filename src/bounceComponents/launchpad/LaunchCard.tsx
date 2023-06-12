import React, { useMemo } from 'react'
import { Common } from './index'
import { Avatar, Box, Grid, Stack, styled, Typography, useTheme } from '@mui/material'
import { CenterRow, Row } from '../../components/Layout'
import PoolStatusBox from '../fixed-swap-nft/ActionBox/NftPoolStatus'
import { Body02, Body03, H5, H6 } from '../../components/Text'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { IPrivatePadProp } from 'pages/launchpad'
import { useNavigate } from 'react-router-dom'
import { PoolStatus } from 'api/pool/type'
import useBreakpoint from 'hooks/useBreakpoint'

export function CardDesc({ title, content }: { title: string; content: string | React.ReactElement }) {
  const isSm = useBreakpoint('sm')
  return (
    <Box sx={{ gap: 4 }}>
      <Typography fontSize={isSm ? 12 : 13} lineHeight={'18px'}>
        {title}
      </Typography>
      <H6 fontSize={isSm ? 14 : ''}>{content}</H6>
    </Box>
  )
}

export const AlignBottomBG = styled(Box)`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`

export function TimeBlock({ isEnd }: { isEnd: boolean }) {
  return (
    <AlignBottomBG>
      <Body03>{isEnd ? 'End Time:' : 'Start Time'}</Body03>
      <H5 sx={{ color: '#E1F25C' }}>2022-03-09</H5>
    </AlignBottomBG>
  )
}

const CardContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  height: 100%;
`

export function LaunchPadProcess({
  title,
  time,
  isAchieve,
  isLast
}: {
  title: string
  time: string
  isAchieve: boolean
  isLast?: boolean
}) {
  return (
    <Box>
      <Body03 mr={36}>{title}</Body03>
      <Body02 mr={36} mt={8}>
        {time}
      </Body02>
      <Box mt={23} display={'flex'} alignItems={'center'}>
        <Box
          sx={{
            width: '10px',
            height: '10px',
            borderRadius: '5px',
            background: isAchieve ? '#B5E529' : '#FFFFFF33'
          }}
        />
        {!isLast && (
          <Box
            sx={{
              height: '4px',
              width: '100%',
              background: isAchieve ? '#B5E529' : '#FFFFFF33'
            }}
          />
        )}
      </Box>
    </Box>
  )
}

export function Progress() {
  const fakeProcess = [
    {
      title: 'Staked calculation period',
      time: '2022-02-17 11:00',
      isAchieve: true
    },
    {
      title: 'Staked calculation period',
      time: '2022-02-17 11:00',
      isAchieve: false
    },
    {
      title: 'Staked calculation period',
      time: '2022-02-17 11:00',
      isAchieve: false
    },
    {
      title: 'Staked calculation period',
      time: '2022-02-17 11:00',
      isAchieve: false
    }
  ]
  return (
    <AlignBottomBG>
      <Stack direction={'row'}>
        {fakeProcess.map((p, i) => (
          <LaunchPadProcess
            key={i}
            isLast={i === fakeProcess.length - 1}
            title={p.title}
            time={p.time}
            isAchieve={p.isAchieve}
          />
        ))}
      </Stack>
    </AlignBottomBG>
  )
}

export function LaunchPadDesc({ data }: { data: IPrivatePadProp }) {
  const isSm = useBreakpoint('sm')
  return (
    <Grid mt={isSm ? 16 : 24} container spacing={16}>
      {data.moreData.map((d, i) => (
        <Grid key={i} item md={6}>
          <CardDesc title={d.title} content={d.content} />
        </Grid>
      ))}
    </Grid>
  )
}

export function SocialMedia({ data }: { data: IPrivatePadProp }) {
  const theme = useTheme()
  const isSm = useBreakpoint('sm')
  return (
    <AlignBottomBG>
      <Body03
        mt={12}
        fontSize={13}
        sx={{
          display: '-webkit-box',
          '-webkit-line-clamp': '4',
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          '-webkit-box-orient': 'vertical',
          [theme.breakpoints.down('sm')]: {
            height: 36,
            '-webkit-line-clamp': '2'
          }
        }}
      >
        {data.desc}
      </Body03>
      <Row
        mt={isSm ? 12 : 24}
        gap={10}
        onClick={e => e.stopPropagation()}
        sx={{
          '& > a': {
            width: isSm ? 32 : 40,
            height: isSm ? 32 : 40
          },
          '& img, & svg': {
            width: '100%',
            height: '100%',
            transition: '0.5s',
            '&:hover': {
              transform: 'scale(1.2)'
            }
          }
        }}
      >
        {data.social.map(item => item)}
      </Row>
    </AlignBottomBG>
  )
}

export const LaunchCard: React.FC<{ child: ReactJSXElement; data: IPrivatePadProp }> = props => {
  const navigator = useNavigate()
  const { start, end } = props.data.liveTimeStamp

  const status = useMemo(() => {
    const cur = new Date().valueOf()
    if (cur < start) return PoolStatus.Upcoming
    if (cur >= start && cur <= end) return PoolStatus.Live
    return PoolStatus.Closed
  }, [end, start])
  const theme = useTheme()
  const isSm = useBreakpoint('sm')
  return (
    <Common
      img={props.data.img}
      poolTypeName={props.data.poolTypeName}
      startAndEnd={props.data.showStartEnd ? props.data.liveTimeStamp : undefined}
      onClick={() => {
        if (status === PoolStatus.Upcoming && props.data.upcomingLink) {
          navigator(props.data.upcomingLink)
        } else {
          if (props.data.liveLink) {
            navigator(props.data.liveLink)
          }
        }
      }}
      child={
        <Box padding={isSm ? 16 : '24px 40px'} display={'flex'} flexDirection={'column'} height={'100%'}>
          <CenterRow
            justifyContent={'space-between'}
            sx={{
              [theme.breakpoints.down('sm')]: {
                flexDirection: 'column-reverse',
                alignItems: 'flex-start',
                gap: 14
              }
            }}
          >
            <Row gap={16}>
              <Avatar
                variant={isSm ? 'rounded' : 'circular'}
                sx={{
                  width: isSm ? 40 : 60,
                  height: isSm ? 40 : 60,
                  '&.MuiAvatar-rounded	': {
                    borderRadius: 5
                  }
                }}
                src={props.data.avatar}
              />
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography fontSize={isSm ? 20 : 28} lineHeight={'36px'}>
                  {props.data.title}
                </Typography>
              </Box>
            </Row>
            <PoolStatusBox
              status={status}
              claimAt={0}
              hideClaim={true}
              closeTime={end / 1000}
              openTime={start / 1000}
            />
          </CenterRow>
          {props.child}
        </Box>
      }
    />
  )
}
// export const LaunchCardFinish: React.FC<{
//   data: IPrivatePadProp
// }> = ({ data }) => {
//   return (
//     <LaunchCard
//       data={data}
//       child={
//         <CardContainer>
//           <LaunchPadDesc />
//           <TimeBlock isEnd={true} />
//         </CardContainer>
//       }
//     />
//   )
// }

// export const LaunchCardLive: React.FC<{ data: IPrivatePadProp }> = ({ data }) => {
//   return (
//     <LaunchCard
//       data={data}
//       child={
//         <CardContainer>
//           <LaunchPadDesc />
//           <Progress />
//         </CardContainer>
//       }
//     />
//   )
// }
// export const LaunchCardUpcoming: React.FC<{ data: IPrivatePadProp }> = ({ data }) => {
//   return (
//     <LaunchCard
//       data={data}
//       child={
//         <CardContainer>
//           <LaunchPadDesc />
//           <TimeBlock isEnd={false} />
//         </CardContainer>
//       }
//     />
//   )
// }
export const LaunchCardSocial: React.FC<{ data: IPrivatePadProp }> = ({ data }) => {
  return (
    <LaunchCard
      data={data}
      child={
        <CardContainer>
          <SocialMedia data={data} />
          <AlignBottomBG>
            <LaunchPadDesc data={data} />
          </AlignBottomBG>
        </CardContainer>
      }
    />
  )
}
