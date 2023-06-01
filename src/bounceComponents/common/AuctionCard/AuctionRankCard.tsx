import React, { useState } from 'react'
import { CenterRow, Row } from '../../../components/Layout'
import { Box, Grid, MenuItem, Select, Skeleton, styled } from '@mui/material'
import EmptyAvatar from 'assets/imgs/auction/empty-avatar.svg'
import EmptyToken from 'assets/imgs/auction/token-default.svg'
import { H5, H7, H7Gray, SmallText } from '../../../components/Text'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { useRequest } from 'ahooks'
import { getPoolsFilter } from '../../../api/market'
import { useOptionDatas } from '../../../state/configOptions/hooks'
import { BackedTokenType } from '../../../pages/account/MyTokenOrNFT'
import EmptyData from '../EmptyData'
import { getTextFromPoolType, PoolType } from '../../../api/pool/type'
import { routes } from '../../../constants/routes'
import { getLabelById } from '../../../utils'
import { useNavigate } from 'react-router-dom'
import useBreakpoint from '../../../hooks/useBreakpoint'
import CustomMobileTable from '../../../components/Table/CustomMobileTable'

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
  @media (max-width: 600px) {
    font-size: 10px;
    padding: 2px 6px;
  }
`

const StatusUpcoming = styled(StatusLive)`
  color: #626262;
  background: #d7d6d9;
`
const StatusClose = styled(StatusLive)`
  color: #a45e3f;
  background: #f9e3da;
`
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

  &:hover {
    background: var(--ps-yellow-1);
    border-radius: 20px 20px 0 0;
  }

  &.active:hover {
    background: #ffffff;
    border-radius: 20px 20px 0 0;
  }

  @media (max-width: 600px) {
    padding: 12px 16px;
    height: 45px;
    width: max-content;
  }
`
const Status: React.FC<{ status: StatusE }> = ({ status }) => {
  switch (status) {
    case StatusE.close:
      return <StatusClose>Closed</StatusClose>
    case StatusE.live:
      return <StatusLive>Live</StatusLive>
    case StatusE.upcoming:
      return <StatusUpcoming>Upcoming</StatusUpcoming>
    default:
      return <></>
  }
}
export const getRoute = (category: PoolType) => {
  let route = routes.auction.fixedPrice
  switch (category) {
    case PoolType.Lottery:
      route = routes.auction.randomSelection
      break
    case PoolType.FixedSwap:
      route = routes.auction.fixedPrice
      break
    case PoolType.fixedSwapNft:
      route = routes.auction.fixedSwapNft
      break
  }
  return route
}

export function AuctionRow(props: any): ReactJSXElement[] {
  const nowTimestamp = Date.now() / 1000
  const status =
    props.openAt > nowTimestamp ? StatusE.upcoming : props.closeAt < nowTimestamp ? StatusE.close : StatusE.live
  const isSm = props.isSm
  const url = getRoute(props.category)
    .replace(':chainShortName', getLabelById(props.chainId, 'shortName', props.opt?.chainInfoOpt || []))
    .replace(':poolId', props.poolId)

  return isSm
    ? [
        <CenterRow
          key={0}
          onClick={() => props.navigate(url)}
          sx={{
            cursor: 'pointer'
          }}
        >
          {/* index */}
          <H7Gray
            mr={16}
            sx={{
              width: 16
            }}
          >
            {props.index}
          </H7Gray>
          <Avatar
            src={
              props.token0?.largeUrl
                ? props.token0?.largeUrl
                : props.tokenType === BackedTokenType.TOKEN
                ? EmptyToken
                : EmptyAvatar
            }
          />
          <Box key={1}>
            <H7
              className={isSm ? 'mobile' : ''}
              sx={{
                maxWidth: 160,
                overflow: 'hidden',
                textAlign: 'left',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap'
              }}
            >
              {props.name}
            </H7>
            <CenterRow>
              <SmallText
                sx={{
                  cursor: 'pointer',
                  maxWidth: 88,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap'
                }}
                maxWidth={164}
                onClick={() => props.navigate(url)}
                key={1}
              >
                {props.tokenType === BackedTokenType.TOKEN ? 'Token' : 'NFT'}
              </SmallText>
              <Box
                sx={{
                  width: '0px',
                  height: '8px',
                  margin: '0 4px',
                  border: '1px solid #959595'
                }}
              />
              <SmallText
                sx={{
                  cursor: 'pointer'
                }}
                onClick={() => props.navigate(url)}
                key={2}
              >
                {getTextFromPoolType(props.category)}
              </SmallText>
            </CenterRow>
          </Box>
        </CenterRow>,
        <Status key={3} status={status} />
      ]
    : [
        <CenterRow
          key={0}
          onClick={() => props.navigate(url)}
          sx={{
            cursor: 'pointer'
          }}
        >
          <H7Gray
            mr={14}
            sx={{
              width: 16
            }}
          >
            {props.index}
          </H7Gray>
          <Avatar
            src={
              props.token0?.largeUrl
                ? props.token0?.largeUrl
                : props.tokenType === BackedTokenType.TOKEN
                ? EmptyToken
                : EmptyAvatar
            }
          />
          <H7
            className={isSm ? 'mobile' : ''}
            sx={{
              maxWidth: 160,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap'
            }}
          >
            {props.name}
          </H7>
        </CenterRow>,
        <SmallText
          sx={{
            cursor: 'pointer'
          }}
          maxWidth={164}
          onClick={() => props.navigate(url)}
          key={1}
        >
          {props.tokenType === BackedTokenType.TOKEN ? 'Token' : 'NFT'}
        </SmallText>,
        <SmallText
          sx={{
            cursor: 'pointer'
          }}
          onClick={() => props.navigate(url)}
          key={2}
        >
          {getTextFromPoolType(props.category)}
        </SmallText>,
        <Status key={3} status={status} />
      ]
}

const SkeletonBox = () => {
  return (
    <Box sx={{ display: 'flex', height: '516px', borderRadius: '0px 30px 30px 30px', overflow: 'hidden' }}>
      {new Array(2).fill(0).map((item, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '50%',
            padding: '20px',
            background: 'white'
          }}
        >
          <Box
            display="flex"
            gap={40}
            sx={{
              '& > span': {
                borderRadius: '20px'
              }
            }}
          >
            <Skeleton variant="rectangular" width={'40%'} height={30} />
            <Skeleton variant="rectangular" width={'40%'} height={30} />
            <Skeleton variant="rectangular" width={'10%'} height={30} />
          </Box>
          {new Array(5).fill(0).map((i, v) => (
            <Grid key={v} container spacing={40} sx={{ marginTop: '5px' }}>
              <Grid item xs={5} display={'flex'} justifyContent={'space-between'} gap={20}>
                <Skeleton variant="rounded" animation={false} width={40} height={40} sx={{ borderRadius: '8px' }} />
                <Skeleton
                  variant="rectangular"
                  animation={false}
                  width={'calc(100% - 60px)'}
                  height={40}
                  sx={{ borderRadius: '20px' }}
                />
              </Grid>
              <Grid item xs={5} display={'flex'} justifyContent={'space-between'} gap={20}>
                <Skeleton
                  variant="rectangular"
                  animation={false}
                  width={'100%'}
                  height={40}
                  sx={{ borderRadius: '20px' }}
                />
              </Grid>
              <Grid item xs={2} display={'flex'} justifyContent={'space-between'} gap={20}>
                <Skeleton
                  variant="rectangular"
                  animation={false}
                  width={'100%'}
                  height={40}
                  sx={{ borderRadius: '20px' }}
                />
              </Grid>
            </Grid>
          ))}
        </Box>
      ))}
    </Box>
  )
}
export const AuctionRankCard: React.FC = () => {
  const Tabs = ['Trending Auction', 'Upcoming Auction', 'Latest Auction']
  const isSm = useBreakpoint('sm')
  const [currentTab, setTab] = useState(Tabs[0])
  const optionDatas = useOptionDatas()
  const action = Tabs.indexOf(currentTab) + 1
  const [chainFilter, setChainFilter] = useState<number>(0)
  const navigate = useNavigate()
  const TableHeader = isSm ? ['Auction', 'Status'] : ['Auction', 'Asset', 'Auction', 'Status']
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
  const ChainSelect = (
    <Select
      sx={{
        width: '200px',
        height: isSm ? '30px' : '38px',
        fontSize: isSm ? '12px' : 'inherit',
        fieldset: {
          border: isSm ? '1' : 0
        },
        '& .css-hpln3v-MuiSelect-icon': {
          top: 'inherit'
        }
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
  )
  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: '1296px',
        margin: '40px auto 0'
      }}
    >
      <CenterRow flexDirection={isSm ? 'column' : 'row'} justifyContent={'space-between'}>
        <Row
          sx={{
            overflowX: 'scroll',
            '&::-webkit-scrollbar': {
              width: 0,
              height: 0,
              background: 'transparent'
            }
          }}
        >
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
        {isSm && (
          <Box width={'100%'} sx={{ background: 'white', padding: '12px 12px 0' }}>
            {ChainSelect}
          </Box>
        )}
        {!isSm && ChainSelect}
      </CenterRow>
      {data && Array.isArray(data.list) && data.list.length > 0 ? (
        <Box
          sx={{
            padding: '12px',
            display: 'flex',
            background: 'white',
            overflow: isSm ? 'scroll' : 'hidden',
            borderRadius: isSm ? 0 : '0px 30px 30px 30px'
          }}
        >
          <CustomMobileTable
            header={TableHeader}
            rows={
              data
                ? data.list?.slice(0, 5)?.map((d: any, idx: number) =>
                    AuctionRow({
                      isSm: isSm,
                      ...d,
                      index: idx + 1,
                      opt: optionDatas,
                      navigate
                    })
                  )
                : []
            }
          />
          <CustomMobileTable
            header={TableHeader}
            rows={
              data
                ? data.list?.slice(5)?.map((d: any, idx: number) =>
                    AuctionRow({
                      isSm: isSm,
                      ...d,
                      index: idx + 6,
                      opt: optionDatas,
                      navigate
                    })
                  )
                : []
            }
          />
        </Box>
      ) : data?.list && data?.list?.length === 0 ? (
        <Box
          sx={{
            background: 'white'
          }}
        >
          <EmptyData />
        </Box>
      ) : (
        <SkeletonBox />
      )}
    </Box>
  )
}
