import { Box } from '@mui/system'
import Bg from 'assets/images/blade-dao-bg.png'
import { ReactComponent as H1 } from 'assets/images/blade-dao-h1.svg'
import { ReactComponent as Rank1 } from 'assets/images/rank-1.svg'
import { ReactComponent as Rank2 } from 'assets/images/rank-2.svg'
import { ReactComponent as Rank3 } from 'assets/images/rank-3.svg'
import { Stack, styled, Typography } from '@mui/material'
import { useRequest } from 'ahooks'
import { getRank } from '../../api/market'
import { useState } from 'react'

export function Rank() {
  const [currentTab, setCurrentTab] = useState('contribution')
  // const fakeData = [
  //   {
  //     index: 0,
  //     sharer: 'xxxx',
  //     custom: 'cccc'
  //   },
  //   {
  //     index: 1,
  //     sharer: 'xxxx',
  //     custom: 'cccc'
  //   },
  //   {
  //     index: 2,
  //     sharer: 'xxxx',
  //     custom: 'cccc'
  //   },
  //   {
  //     index: 3,
  //     sharer: 'xxxx',
  //     custom: 'cccc'
  //   },
  //   {
  //     index: 4,
  //     sharer: 'xxxx',
  //     custom: 'cccc'
  //   },
  //   {
  //     index: 5,
  //     sharer: 'xxxx',
  //     custom: 'cccc'
  //   },
  //   {
  //     index: 6,
  //     sharer: 'xxxx',
  //     custom: 'cccc'
  //   }
  // ]
  const { data } = useRequest(
    async () => {
      const resp = await getRank(currentTab)
      return {
        list: resp.data.list,
        total: resp.data.total
      }
    },
    {
      refreshDeps: [currentTab]
    }
  )
  console.log('data', data)
  return (
    <Box
      sx={{
        background: `url(${Bg}) no-repeat`,
        backgroundSize: 'cover',
        flexDirection: 'column',
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <H1 />
      <Typography mt={10} variant={'h3'} sx={{ color: 'white' }}>
        $BLADE IDO RANKINGS
      </Typography>
      <Divider />
      <Row gap={15} mt={38}>
        <Btn className={currentTab === 'contribution' ? 'select' : ''} onClick={() => setCurrentTab('contribution')}>
          BY CONTRIBUTION
        </Btn>
        <Btn className={currentTab === 'referrals' ? 'select' : ''} onClick={() => setCurrentTab('referrals')}>
          BY REFERRALS
        </Btn>
      </Row>
      <Row mt={36} mb={12} sx={{ color: 'white', justifyContent: 'space-between', width: '570px' }}>
        <Row>
          <RankIdxText>Rank</RankIdxText>
          <RankIdxText ml={60}>Address</RankIdxText>
        </Row>
        <RankIdxText>Contribution</RankIdxText>
      </Row>
      <Stack spacing={10}>
        {data?.list.map((r: any, i: number) => (
          <RankItem key={i} rank={{ index: i, ...r }} />
        ))}
      </Stack>
    </Box>
  )
}

interface RankData {
  index: number
  sharer: string
  custom: string
}

function RankItem({ rank }: { rank: RankData }) {
  return (
    <RankItemBg>
      <Row position={'relative'}>
        <Typography fontSize={25} sx={{ color: '#E0E0E9' }}>
          {rank.index}
        </Typography>
        <Typography ml={70} fontSize={25} sx={{ color: '#FFDF8E' }}>
          {rank.sharer}
        </Typography>
        <Box ml={90} position={'absolute'} left={200}>
          {rank.index === 0 && <Rank1 />}
          {rank.index === 1 && <Rank2 />}
          {rank.index === 2 && <Rank3 />}
        </Box>
      </Row>
      <Typography ml={90} fontSize={18} sx={{ color: '#E0E0E9' }}>
        {rank.custom}
      </Typography>
    </RankItemBg>
  )
}

const Divider = styled(Box)`
  background: linear-gradient(
    89.25deg,
    #998f70 0%,
    #de8341 19.02%,
    #d7ad18 26.22%,
    #b29e5b 37.53%,
    rgba(218, 107, 107, 0.5) 61.17%,
    rgba(165, 46, 24, 0) 98.23%
  );
  width: 705px;
  height: 2.99px;
  margin-top: 35px;
  border-radius: 4px;
`

const Btn = styled(Box)`
  background: linear-gradient(194.68deg, rgba(255, 239, 95, 0.1) 11.27%, rgba(179, 139, 61, 0.1) 90.4%);
  border: 2px solid #ffdf8e;
  padding: 25px 60px;
  color: #ffdf8e;
  font-size: 20px;
  cursor: pointer;
  border-radius: 5px;

  &.select {
    border: 2px solid #56503b;
  }
`

const RankIdxText = styled(Typography)`
  font-weight: 600;
  font-size: 18px;
  color: white;
`

const Row = styled(Box)`
  display: flex;
  align-items: center;
`

const RankItemBg = styled(Row)`
  background: rgba(224, 224, 233, 0.15);
  padding: 12px 25px;
  border-radius: 2px;
  border: 2px solid #998f70;
  width: 579px;
  justify-content: space-between;
`
