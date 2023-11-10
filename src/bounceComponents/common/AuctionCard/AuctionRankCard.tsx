import React, { useState } from 'react'
import { CenterRow, Row } from '../../../components/Layout'
import { Box, Grid, MenuItem, Select, Skeleton, styled } from '@mui/material'
import EmptyAvatar from 'assets/imgs/auction/default-nft-cover.png'
import EmptyToken from 'assets/imgs/auction/token-default.svg'
import { Body01, GrayBody02, H6 } from '../../../components/Text'
import { ReactJSXElement } from '@emotion/react/types/jsx-namespace'
import { useRequest } from 'ahooks'
import { getPoolsFilter } from '../../../api/market'
import { useOptionDatas } from '../../../state/configOptions/hooks'
import { BackedTokenType } from '../../../pages/account/MyTokenOrNFT'
import EmptyData from '../EmptyData'
import { getTextFromPoolType } from '../../../api/pool/type'
import { useNavigate } from 'react-router-dom'
import getAuctionPoolLink from 'utils/auction/getAuctionPoolRouteLink'
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
  font-size: 14px;
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
  gap: 10px;
  width: fit-content;
  height: 40px;
  padding: 8px 20px;
  background: transparent;
  color: #959595;

  &.active {
    background: var(--ps-yellow-1);
    border-radius: 100px;
  }

  &:hover {
    //background: var(--ps-yellow-1);
    //border-radius: 10px 10px 0 0;
    color: #121212;
  }

  &.active:hover {
    background: var(--ps-yellow-1);
    border-radius: 100px;
  }

  @media (max-width: 600px) {
    padding: 12px 16px;
    width: -webkit-fill-available;
  }
`

const TabText = styled(H6)`
  color: #959595;

  &.active {
    color: #121212;
  }

  &:hover {
    //background: var(--ps-yellow-1);
    //border-radius: 10px 10px 0 0;
    color: #121212;
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

export function AuctionRow(props: any): ReactJSXElement[] {
  const nowTimestamp = Date.now() / 1000
  const status =
    props.openAt > nowTimestamp ? StatusE.upcoming : props.closeAt < nowTimestamp ? StatusE.close : StatusE.live
  const url = getAuctionPoolLink(props.id, props.category, props.chainId, props.poolId)

  const isSm = props.isSm

  return isSm
    ? [
        <CenterRow
          key={0}
          onClick={() => props.navigate(url)}
          sx={{
            cursor: 'pointer',
            marginLeft: '12px'
          }}
        >
          {/* index */}
          <Body01
            mr={16}
            sx={{
              width: 16,
              color: '#121212'
            }}
          >
            {props.index}
          </Body01>
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
            <Body01
              className={isSm ? 'mobile' : ''}
              sx={{
                maxWidth: 160,
                overflow: 'hidden',
                textAlign: 'left',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
                '&:hover': {
                  color: '#A4D220'
                }
              }}
            >
              {props.name}
            </Body01>
            <CenterRow>
              <GrayBody02
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
                {props.tokenType === BackedTokenType.TOKEN ? 'Token · ' : 'NFT · '}
              </GrayBody02>
              <GrayBody02
                sx={{
                  cursor: 'pointer'
                }}
                onClick={() => props.navigate(url)}
                key={2}
              >
                {` ${getTextFromPoolType(props.category)}`}
              </GrayBody02>
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
          <Body01
            mr={14}
            sx={{
              width: 16,
              color: '#121212'
            }}
          >
            {props.index}
          </Body01>
        </CenterRow>,
        <CenterRow
          key={0}
          onClick={() => props.navigate(url)}
          sx={{
            cursor: 'pointer'
          }}
        >
          <Avatar
            src={
              props.token0?.largeUrl
                ? props.token0?.largeUrl
                : props.tokenType === BackedTokenType.TOKEN
                ? EmptyToken
                : EmptyAvatar
            }
          />
          <Body01
            className={isSm ? 'mobile' : ''}
            sx={{
              maxWidth: 160,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              '&:hover': {
                color: '#A4D220'
              }
            }}
          >
            {props.name}
          </Body01>
        </CenterRow>,
        <Body01
          sx={{
            cursor: 'pointer'
          }}
          maxWidth={164}
          onClick={() => props.navigate(url)}
          key={1}
        >
          {props.tokenType === BackedTokenType.TOKEN ? 'Token' : 'NFT'}
        </Body01>,
        <Body01
          sx={{
            cursor: 'pointer'
          }}
          onClick={() => props.navigate(url)}
          key={2}
        >
          {getTextFromPoolType(props.category)}
        </Body01>,
        <Status key={3} status={status} />
      ]
}

const SkeletonBox = () => {
  const isSm = useBreakpoint('sm')
  return (
    <Box
      sx={{
        minWidth: 1070,
        display: 'flex',
        height: '516px',
        borderRadius: '0px 30px 30px 30px',
        overflow: isSm ? 'scroll' : 'hidden'
      }}
    >
      {new Array(2).fill(0).map((item, index) => (
        <Box
          key={index}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: isSm ? '100vw' : '50%',
            padding: isSm ? 12 : 20,
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
              <Grid item xs={isSm ? 8 : 5} display={'flex'} justifyContent={'space-between'} gap={20}>
                <Skeleton variant="rounded" width={40} height={40} sx={{ borderRadius: '8px' }} />
                <Skeleton
                  variant="rectangular"
                  width={'calc(100% - 60px)'}
                  height={isSm ? 30 : 40}
                  sx={{ borderRadius: '20px' }}
                />
              </Grid>
              {!isSm && (
                <Grid item xs={5} display={'flex'} justifyContent={'space-between'} gap={20}>
                  <Skeleton
                    variant="rectangular"
                    width={'100%'}
                    height={isSm ? 30 : 40}
                    sx={{ borderRadius: '20px' }}
                  />
                </Grid>
              )}
              <Grid item xs={isSm ? 4 : 2} display={'flex'} justifyContent={'space-between'} gap={20}>
                <Skeleton variant="rectangular" width={'100%'} height={isSm ? 30 : 40} sx={{ borderRadius: '20px' }} />
              </Grid>
            </Grid>
          ))}
        </Box>
      ))}
    </Box>
  )
}
export const AuctionRankCard: React.FC = () => {
  const Tabs = ['Trending', 'Upcoming', 'Latest']
  const isSm = useBreakpoint('sm')
  const [currentTab, setTab] = useState(Tabs[0])
  const optionDatas = useOptionDatas()
  const action = Tabs.indexOf(currentTab) + 1
  const [chainFilter, setChainFilter] = useState<number>(0)
  const navigate = useNavigate()
  const TableHeader = isSm ? ['# Auction', 'Status'] : ['#', 'Auction', 'Asset', 'Auction Type', 'Status']
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
        width: isSm ? '100%' : '200px',
        height: '48px',
        '& .MuiPaper-root': {
          border: 0
        },
        fontSize: isSm ? '12px' : 'inherit',
        '&:hover': {
          borderRadius: '100px',
          border: '1px solid var(--ps-yellow-1)',
          background: 'white'
        },
        fieldset: {
          border: '1px solid #E4E4E4',
          borderRadius: '100px',
          '&:hover': {
            border: '1px solid var(--ps-yellow-1)',
            background: 'white'
          }
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
  const AuctionTabs = (
    <Row
      mr={20}
      sx={{
        display: 'flex',
        padding: '4px',
        alignItems: 'center',
        justifyContent: 'center',
        width: isSm ? '100%' : 'auto',
        height: '48px',
        borderRadius: 100,
        border: '1px solid #E4E4E4'
      }}
    >
      {Tabs.map((tab, idx) => (
        <Tab
          sx={{ cursor: tab === currentTab ? 'auto' : 'pointer' }}
          key={idx}
          onClick={() => setTab(tab)}
          className={tab === currentTab ? 'active' : ''}
        >
          <TabText className={tab === currentTab ? 'active' : ''} sx={{ whiteSpace: 'nowrap' }}>
            {tab}
          </TabText>
        </Tab>
      ))}
    </Row>
  )
  return (
    <Box
      sx={{
        width: '100%',
        paddingTop: isSm ? '0px' : '60px',
        paddingBottom: isSm ? '0px' : '60px',
        background: 'white'
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '1296px',
          margin: '0 auto'
        }}
      >
        <CenterRow
          flexDirection={isSm ? 'column' : 'row'}
          sx={{
            alignItems: isSm ? 'flex-start' : 'center',
            justifyContent: isSm ? 'flex-start' : 'space-between',
            '@media(max-width:862px)': {
              flexWrap: 'nowrap',
              overflowX: 'scroll',
              overflowY: 'hidden',
              '&::-webkit-scrollbar': { display: 'none' }
            }
          }}
        >
          {isSm && (
            <Box
              sx={{
                overflowX: isSm ? 'unset' : 'scroll',
                width: '100%',
                padding: isSm ? '40px 16px 16px' : '0',
                '&::-webkit-scrollbar': { display: 'none', background: 'transparent' }
              }}
            >
              {AuctionTabs}
            </Box>
          )}
          {!isSm && AuctionTabs}
          {isSm && (
            <Box width={'100%'} sx={{ background: 'white', padding: '12px 12px 0', overflowY: 'hidden' }}>
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
              overflowX: 'scroll',
              borderRadius: isSm ? 0 : '0px 30px 30px 30px',
              '&::-webkit-scrollbar': {
                display: 'none'
              }
            }}
          >
            <CustomMobileTable
              header={TableHeader}
              rows={
                data
                  ? data.list?.slice(0, 8).map((d: any, idx: number) =>
                      AuctionRow({
                        isSm: isSm,
                        ...d,
                        index: idx + 1,
                        opt: optionDatas,
                        navigate,
                        variant: 'gray'
                      })
                    )
                  : []
              }
            />
            {/*<CustomMobileTable*/}
            {/*  header={TableHeader}*/}
            {/*  rows={*/}
            {/*    data*/}
            {/*      ? data.list?.slice(Math.ceil(data.list.length / 2))?.map((d: any, idx: number) =>*/}
            {/*          AuctionRow({*/}
            {/*            isSm: isSm,*/}
            {/*            ...d,*/}
            {/*            index: Math.ceil(data.list.length / 2) + idx + 1,*/}
            {/*            opt: optionDatas,*/}
            {/*            navigate*/}
            {/*          })*/}
            {/*        )*/}
            {/*      : []*/}
            {/*  }*/}
            {/*/>*/}
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
    </Box>
  )
}
