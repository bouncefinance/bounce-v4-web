import React from 'react'
import { Common } from './index'
import { Avatar, Box, Grid, Stack, styled, Typography } from '@mui/material'
import { CenterRow, Row } from '../../components/Layout'
import PoolStatusBox from '../fixed-swap-nft/ActionBox/NftPoolStatus'
import { Body02, Body03, H5, H6 } from '../../components/Text'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { IPrivatePadProp } from 'pages/launchpad'
import { useNavigate } from 'react-router-dom'

export function CardDesc({ title, content }: { title: string; content: string | React.ReactElement }) {
  return (
    <Box sx={{ color: 'white', gap: 4 }}>
      <Typography fontSize={13} lineHeight={'18px'}>
        {title}
      </Typography>
      <H6 sx={{ color: 'white' }}>{content}</H6>
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
            background: isAchieve ? '#C8F056' : '#FFFFFF33'
          }}
        />
        {!isLast && (
          <Box
            sx={{
              height: '4px',
              width: '100%',
              background: isAchieve ? '#C8F056' : '#FFFFFF33'
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
  return (
    <Grid mt={24} container spacing={16}>
      {data.moreData.map((d, i) => (
        <Grid key={i} item md={6}>
          <CardDesc title={d.title} content={d.content} />
        </Grid>
      ))}
    </Grid>
  )
}

export function SocialMedia({ data }: { data: IPrivatePadProp }) {
  return (
    <AlignBottomBG>
      <Body03>{data.desc}</Body03>
      <Row
        mt={24}
        gap={10}
        sx={{
          '& img, & svg': {
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
  return (
    <Common
      img={props.data.img}
      onClick={() => {
        if (props.data.link) {
          navigator(props.data.link)
        }
      }}
      child={
        <Box padding={'24px 40px'} display={'flex'} flexDirection={'column'} height={'100%'}>
          <CenterRow justifyContent={'space-between'}>
            <Row gap={16}>
              <Avatar sx={{ width: 60, height: 60 }} src={props.data.avatar} />
              <Box sx={{ color: 'white', display: 'flex', alignItems: 'center' }}>
                <Typography fontSize={28} lineHeight={'36px'}>
                  {props.data.title}
                </Typography>
                {/* <Typography fontSize={14} lineHeight={'21px'}>
                  {props.data.shortTitle}
                </Typography> */}
              </Box>
            </Row>
            <PoolStatusBox status={props.data.status} claimAt={0} closeTime={1685376000} openTime={1685376000} />
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
