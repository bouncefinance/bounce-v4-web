import { Box } from '@mui/system'
import { ReactComponent as H1 } from 'assets/images/blade-dao-h1.svg'
import Rank1 from 'assets/images/rank-1.png'
import Rank2 from 'assets/images/rank-2.png'
import Rank3 from 'assets/images/rank-3.png'
import { Stack, styled, Typography } from '@mui/material'
import { useRequest } from 'ahooks'
import { getRank } from '../../api/market'
import { useState } from 'react'
import ProjectBg from 'assets/images/project-bg.png'
import { shortenAddress } from '../../utils'
import { CurrencyAmount } from '../../constants/token'
import BigNumber from 'bignumber.js'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { GrayButton } from '../projectIntro'

export function Rank() {
  const [currentTab, setCurrentTab] = useState('contribution')
  // const [page, setPage] = useState(1)
  const pageSize = 1000

  function calcuE18(list: any[]) {
    return list.map((item: any) => {
      return { ...item, custom: CurrencyAmount.ether(new BigNumber(Number(item.custom)).toString()).toSignificant() }
    })
  }

  const { data } = useRequest(
    async () => {
      const resp = await getRank(currentTab, 1, pageSize)
      // if (!resp.data.total) {
      // return {
      //   total: 3,
      //   list: calcuE18([
      //     { sharer: '0xbD9e35E349416124fDffa20fA2F84B90936fB2Ad', custom: '3.0000000001e18' },
      //     { sharer: '0x0accd95BB8c5443BA5f123aFA4e3f34E155c7B17', custom: '2e18' },
      //     { sharer: '0xdDCb698c459BC99eD0476e058c1aaB02680aA5c5', custom: '1.250000001e18' }
      //   ])
      // }
      // }
      return {
        list: calcuE18(resp.data.list),
        total: resp.data.total
      }
    },
    {
      refreshDeps: [currentTab]
    }
  )
  return (
    <Box
      sx={{
        background: `url(${ProjectBg}) no-repeat`,
        backgroundSize: 'cover',
        flexDirection: 'column',
        display: 'flex',
        position: 'relative',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <GrayButton onClick={() => history.back()} sx={{ position: 'absolute', left: '50px', top: '10px' }}>
        <ArrowBackIcon />
      </GrayButton>
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
        <RankIdxText>{currentTab === 'contribution' ? 'Contribution' : 'Referrals'}</RankIdxText>
      </Row>
      <Stack
        sx={{
          maxHeight: '50vh',
          overflow: 'auto'
        }}
        spacing={10}
      >
        {data?.list.map((r: any, i: number) => (
          <RankItem key={i} rank={{ index: i + 1, ...r }} />
        ))}
      </Stack>
      {/*<Pagination*/}
      {/*  sx={{*/}
      {/*    position: 'absolute',*/}
      {/*    bottom: '100px',*/}
      {/*    color: 'white'*/}
      {/*  }}*/}
      {/*  count={data ? (data.total % pageSize) + 1 : 0}*/}
      {/*  onChange={(event, p) => setPage(p)}*/}
      {/*/>*/}
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
          {shortenAddress(rank.sharer, 3)}
        </Typography>
        <Box ml={90} position={'absolute'} left={200}>
          {rank.index === 1 && <img src={Rank1} />}
          {rank.index === 2 && <img src={Rank2} />}
          {rank.index === 3 && <img src={Rank3} />}
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
  border: 2px solid #56503b;
  padding: 25px 60px;
  color: #ffdf8e;
  font-size: 20px;
  cursor: pointer;
  border-radius: 5px;

  &.select {
    border: 2px solid #ffdf8e;
  }

  &:hover {
    border: 2px solid #ffdf8e;
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
