import React, { useState } from 'react'
import { CenterRow, Row } from '../../../components/Layout'
import { Box, MenuItem, Select, styled } from '@mui/material'
import EmptyAvatar from 'assets/imgs/auction/empty-avatar.svg'
import { H5, H7, H7Gray, SmallText } from '../../../components/Text'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { useRequest } from 'ahooks'
import { getPoolsFilter } from '../../../api/market'
import { useOptionDatas } from '../../../state/configOptions/hooks'
import Table from '../../../components/Table'
import { BackedTokenType } from '../../../pages/account/MyTokenOrNFT'
import { getTextFromPoolType, PoolType } from '../../../api/pool/type'
import { routes } from '../../../constants/routes'
import { getLabelById } from '../../../utils'

enum StatusE {
  'live',
  'upcoming',
  'close'
}

const Avatar = styled('img')`
  margin-right: 12px;
  width: 40px;
  height: 40px;
  border-radius: 6px;
`

const StatusLive = styled(Box)`
  display: flex;
  width: fit-content;
  align-items: center;
  padding: 4px 12px;
  background: #cff8d1;
  backdrop-filter: blur(2px);
  font-family: 'Inter';
  font-size: 12px;
  line-height: 140%;
  text-align: center;
  color: #20994b;
  border-radius: 100px;
`

const StatusUpcoming = styled(StatusLive)`
  color: #626262;
  background: #d7d6d9;
`
const StatusClose = styled(StatusLive)`
  color: #a45e3f;
  background: #f9e3da;
`

const Status: React.FC<{ status: StatusE }> = ({ status }) => {
  switch (status) {
    case StatusE.close:
      return <StatusClose>Close</StatusClose>
    case StatusE.live:
      return <StatusLive>Live</StatusLive>
    case StatusE.upcoming:
      return <StatusUpcoming>Upcoming</StatusUpcoming>
    default:
      return <></>
  }
}

export function AuctionRow(props: any): ReactJSXElement[] {
  const nowTimestamp = Date.now() / 1000
  const status =
    props.openAt > nowTimestamp ? StatusE.upcoming : props.closeAt < nowTimestamp ? StatusE.close : StatusE.live
  const url =
    props.category === PoolType.Lottery
      ? routes.auction.randomSelection
      : routes.auction.fixedPrice
          .replace(':chainShortName', getLabelById(props.chainId, 'shortName', props.opt || []))
          .replace(':poolId', props.poolId)

  return [
    <CenterRow
      key={0}
      onClick={() => {
        window.open(url)
      }}
    >
      <H7Gray mr={12}>{props.index}</H7Gray>
      <Avatar src={props.token0.largeUrl ? props.token0.largeUrl : EmptyAvatar} />
      <H7>{props.name}</H7>
    </CenterRow>,
    <SmallText maxWidth={164} key={1}>
      {props.tokenType === BackedTokenType.TOKEN ? 'Token' : 'NFT'}
    </SmallText>,
    <SmallText key={2}>{getTextFromPoolType(props.category)}</SmallText>,
    <Status key={3} status={status} />
  ]
}

const Tab = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 24px;
  gap: 10px;
  width: 240px;
  height: 76px;
  background: transparent;

  &.active {
    background: #ffffff;
    border-radius: 20px 20px 0 0;
  }
`

export const AuctionRankCard: React.FC = () => {
  const Tabs = ['Trending Auction', 'Upcoming Auction', 'Latest Auction']
  const [currentTab, setTab] = useState(Tabs[0])
  const optionDatas = useOptionDatas()
  const action = Tabs.indexOf(currentTab) + 1
  const [chainFilter, setChainFilter] = useState<number>(0)
  const { data } = useRequest(
    async () => {
      const resp = await getPoolsFilter({
        action: action,
        chainId: chainFilter
      })
      return {
        list: resp.data
      }
    },
    { refreshDeps: [action, chainFilter] }
  )

  return (
    <Box mt={40}>
      <CenterRow justifyContent={'space-between'}>
        <Row>
          {Tabs.map((tab, idx) => (
            <Tab
              sx={{ cursor: tab === currentTab ? 'auto' : 'pointer' }}
              key={idx}
              onClick={() => setTab(tab)}
              className={tab === currentTab ? 'active' : ''}
            >
              <H5>{tab}</H5>
            </Tab>
          ))}
        </Row>
        <Select
          sx={{
            width: '200px',
            height: '38px'
          }}
          value={chainFilter}
          onChange={e => setChainFilter(Number(e.target.value))}
        >
          <MenuItem key={0} value={0}>
            All Chains
          </MenuItem>
          {optionDatas?.chainInfoOpt?.map((item, index) => (
            <MenuItem key={index} value={item.id}>
              {item.chainName}
            </MenuItem>
          ))}
        </Select>
      </CenterRow>
      <Box
        sx={{
          padding: '12px',
          display: 'flex',
          background: 'white',
          overflow: 'hidden',
          borderRadius: '0px 30px 30px 30px'
        }}
      >
        <Table
          header={['Auction', 'Asset', 'Auction', 'Status']}
          rows={
            data
              ? data.list?.slice(0, 5)?.map((d: any, idx: number) =>
                  AuctionRow({
                    ...d,
                    index: idx + 1,
                    opt: optionDatas
                  })
                )
              : []
          }
        />
        <Table
          header={['Auction', 'Asset', 'Auction', 'Status']}
          rows={
            data
              ? data.list?.slice(5)?.map((d: any, idx: number) =>
                  AuctionRow({
                    ...d,
                    index: idx + 6,
                    opt: optionDatas
                  })
                )
              : []
          }
        />
      </Box>
    </Box>
  )
}
