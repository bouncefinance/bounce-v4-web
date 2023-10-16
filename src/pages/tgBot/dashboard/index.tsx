import { Stack, Typography, Grid, Box, styled, Button, Pagination, Select, MenuItem, Tabs, Tab } from '@mui/material'
import { ReactComponent as Calendar } from './svg/calendar.svg'
import { ReactComponent as Auction } from './svg/auction.svg'
import { ReactComponent as AuctionGroup } from './svg/auctionGroup.svg'
import { ReactComponent as Group } from './svg/group.svg'
import { ReactComponent as Task } from './svg/task.svg'
import { ReactComponent as User } from './svg/user.svg'
import { ReactComponent as Add } from './svg/add.svg'
import { useCallback, useState } from 'react'
import { useUserInfo } from 'state/users/hooks'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
import { useValuesDispatch, ActionType } from 'bounceComponents/create-auction-pool/ValuesProvider'
import { TgBotActiveStep } from 'bounceComponents/create-auction-pool/types'
import { useActiveWeb3React } from 'hooks'
import { useShowLoginModal } from 'state/users/hooks'
import useBreakpoint from 'hooks/useBreakpoint'
import { getBotPools } from 'api/market'
import { Params } from 'ahooks/lib/usePagination/types'
import { usePagination } from 'ahooks'
import { PoolType } from 'api/pool/type'
import { BackedTokenType } from 'pages/account/MyTokenOrNFT'
import { useOptionDatas } from 'state/configOptions/hooks'

enum PoolStatusFrontend {
  ALLSTATUS = '0',
  LIVE = 'live',
  CLOSE = 'finished',
  UPCOMING = 'upcoming'
}

const defaultPageSize = 9

const DashBoardCard = styled(Box)`
  display: flex;
  height: 120px;
  padding: 16px 24px 16px 16px;
  align-items: flex-start;
  gap: 16px;
  flex: 1 0 0;
  border-radius: 20px;
  background: var(--white-100, #fff);
  box-shadow: 2px 2px 10px 0px rgba(0, 0, 0, 0.04), -2px -2px 10px 0px rgba(0, 0, 0, 0.04);
`
const DashBoardCardIconBoxs = styled(Box)`
  display: flex;
  width: 88px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 12px;
  background: rgba(225, 242, 92, 0.15);
`
const AcctionPoolCard = styled(Box)`
  display: flex;
  padding: 48px 40px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 20px;
  background: var(--grey-01, #20201e);
`

const CusButton = styled(Button)`
  background-color: #e1f25c;
  display: flex;
  height: 40px;
  padding: 12px 20px;
  align-items: center;
  gap: 8px;
  &:hover {
    border: 0;
  }
`

const CusTabs = styled(Tabs)`
  .MuiTab-root {
    font-family: Public Sans;
    font-size: 20px;
    font-style: normal;
    font-weight: 600;
    letter-spacing: -0.4px;
    color: #959595;
    padding: 24px 60px;
  }
  .MuiTabs-scroller {
    border-bottom: none;
  }
  .MuiTabs-indicator {
    display: none;
  }
  .MuiTab-textColorInherit {
    color: rgba(18, 18, 18, 0.6);
  }
  .Mui-selected {
    border-radius: 20px 20px 0px 0px;
    background: var(--black-100, #121212);
    color: #e1f25c;
  }
  .MuiTabs-flexContainer {
  }
`
export default function Home() {
  const { userInfo } = useUserInfo()
  const navigate = useNavigate()
  const valuesDispatch = useValuesDispatch()
  const { account } = useActiveWeb3React()
  const showLoginModal = useShowLoginModal()
  const optionDatas = useOptionDatas()
  const [tabStatusFrontend, setTabStatusFrontend] = useState(PoolStatusFrontend.LIVE)
  // eslint-disable-next-line @typescript-eslint/ban-types
  const tabHandleChange = (event: React.ChangeEvent<{}>, newValue: PoolStatusFrontend) => {
    setTabStatusFrontend(newValue)
  }

  const createAuctionHandle = useCallback(() => {
    if (!account) {
      return showLoginModal()
    }
    if (userInfo && !userInfo.tg_token) {
      valuesDispatch({
        type: ActionType.SetActiveStep,
        payload: {
          tgBotTabValue: TgBotActiveStep.GETAPITOKEN
        }
      })
      navigate(routes.telegramBot.guide)
    }
    if (userInfo && userInfo.tg_token) {
      valuesDispatch({
        type: ActionType.SetActiveStep,
        payload: {
          tgBotTabValue: TgBotActiveStep.GUIDEFORM
        }
      })
      navigate(routes.telegramBot.guide)
    }
  }, [account, navigate, showLoginModal, userInfo, valuesDispatch])

  const [curChain, setCurChain] = useState(0)

  const {
    pagination,
    data: auctionPoolData,
    loading
  } = usePagination<any, Params>(
    async ({ current, pageSize }) => {
      const resp = await getBotPools({
        offset: (current - 1) * pageSize,
        limit: pageSize,
        CreatorUserId: userInfo?.id,
        category: PoolType.FixedSwap,
        chainId: curChain,
        orderBy: '',
        tokenType: BackedTokenType.TOKEN,
        poolStatusFrontend: tabStatusFrontend,
        creatorAddress: account
      })
      return {
        list: resp.data.fixedSwapList.list,
        total: resp.data.fixedSwapList.total
      }
    },
    {
      defaultPageSize: defaultPageSize,
      debounceWait: 500,
      refreshDeps: [curChain, tabStatusFrontend]
    }
  )
  const handlePageChange = useCallback((_: any, p: number) => pagination.changeCurrent(p), [pagination])
  const isMobile = useBreakpoint('lg')
  console.log('auctionPoolData', auctionPoolData)

  return (
    <Stack>
      <Typography fontSize={28} fontWeight={600} fontFamily={'Public Sans'} color="#121212">
        Dashboard
      </Typography>
      <Grid mt={40} container spacing={24}>
        <Grid item xs={4}>
          <DashBoardCard>
            <DashBoardCardIconBoxs>
              <Calendar />
            </DashBoardCardIconBoxs>
            <Stack ml={16} height={'100%'} justifyContent={'space-between'}>
              <Typography mt={4} fontSize={16} fontWeight={500} fontFamily={'Public Sans'} color="#959595">
                Bot Daily Using
              </Typography>
              <Typography mb={12} fontSize={20} fontWeight={600} fontFamily={'Public Sans'} color="#121212">
                -
              </Typography>
            </Stack>
          </DashBoardCard>
        </Grid>
        <Grid item xs={4}>
          <DashBoardCard>
            <DashBoardCardIconBoxs>
              <User />
            </DashBoardCardIconBoxs>
            <Stack ml={16} height={'100%'} justifyContent={'space-between'}>
              <Typography mt={4} fontSize={16} fontWeight={500} fontFamily={'Public Sans'} color="#959595">
                Daily Active Users
              </Typography>
              <Typography mb={12} fontSize={20} fontWeight={600} fontFamily={'Public Sans'} color="#121212">
                -
              </Typography>
            </Stack>
          </DashBoardCard>
        </Grid>
        <Grid item xs={4}>
          <DashBoardCard>
            <DashBoardCardIconBoxs>
              <Group />
            </DashBoardCardIconBoxs>
            <Stack ml={16} height={'100%'} justifyContent={'space-between'}>
              <Typography mt={4} fontSize={16} fontWeight={500} fontFamily={'Public Sans'} color="#959595">
                Total member
              </Typography>
              <Typography mb={12} fontSize={20} fontWeight={600} fontFamily={'Public Sans'} color="#121212">
                -
              </Typography>
            </Stack>
          </DashBoardCard>
        </Grid>
        <Grid item xs={4}>
          <DashBoardCard>
            <DashBoardCardIconBoxs>
              <Task />
            </DashBoardCardIconBoxs>
            <Stack ml={16} height={'100%'} justifyContent={'space-between'}>
              <Typography mt={4} fontSize={16} fontWeight={500} fontFamily={'Public Sans'} color="#959595">
                Total Transaction Amount
              </Typography>
              <Typography mb={12} fontSize={20} fontWeight={600} fontFamily={'Public Sans'} color="#121212">
                - USDT
              </Typography>
            </Stack>
          </DashBoardCard>
        </Grid>
        <Grid item xs={4}>
          <DashBoardCard>
            <DashBoardCardIconBoxs>
              <Auction />
            </DashBoardCardIconBoxs>
            <Stack ml={16} height={'100%'} justifyContent={'space-between'}>
              <Typography mt={4} fontSize={16} fontWeight={500} fontFamily={'Public Sans'} color="#959595">
                Auction Amount
              </Typography>
              <Typography mb={12} fontSize={20} fontWeight={600} fontFamily={'Public Sans'} color="#121212">
                - ETH
              </Typography>
            </Stack>
          </DashBoardCard>
        </Grid>
        <Grid item xs={4}>
          <DashBoardCard>
            <DashBoardCardIconBoxs>
              <AuctionGroup />
            </DashBoardCardIconBoxs>
            <Stack ml={16} height={'100%'} justifyContent={'space-between'}>
              <Typography mt={4} fontSize={16} fontWeight={500} fontFamily={'Public Sans'} color="#959595">
                Auction Participated Users
              </Typography>
              <Typography mb={12} fontSize={20} fontWeight={600} fontFamily={'Public Sans'} color="#121212">
                -
              </Typography>
            </Stack>
          </DashBoardCard>
        </Grid>
      </Grid>
      <AcctionPoolCard mt={60}>
        <Stack width={'100%'} direction={'row'} justifyContent={'space-between'}>
          <Typography fontSize={28} fontWeight={600} fontFamily={'Public Sans'} color="#fff">
            Fix swap Auction pool Management
          </Typography>
          <CusButton onClick={createAuctionHandle}>
            <Add />
            Create an auction
          </CusButton>
        </Stack>
        <Stack mt={40} width={'100%'} justifyContent={'space-between'} direction={'row'}>
          <CusTabs
            value={tabStatusFrontend}
            onChange={tabHandleChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="Live" value={PoolStatusFrontend.LIVE} />
            <Tab label="Upcoming" value={PoolStatusFrontend.UPCOMING} />
            <Tab label="Close" value={PoolStatusFrontend.CLOSE} />
          </CusTabs>
          <Box display={isMobile ? 'block' : 'flex'} justifyContent="space-between" alignItems={'center'}>
            <Stack direction={'row'} spacing={15}>
              <Select
                value={curChain}
                onChange={e => {
                  setCurChain(Number(e.target?.value) || 0)
                }}
                sx={{
                  width: '200px',
                  height: '38px'
                }}
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
            </Stack>
          </Box>
        </Stack>
        <Box
          sx={{
            display: 'flex',
            padding: '48px 40px',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '16px',
            alignSelf: 'stretch',
            borderRadius: '0px 20px 20px 20px',
            background: 'var(--black-100, #121212)'
          }}
        >
          {loading ? <Box></Box> : null}
        </Box>

        <Box mt={40} display={'flex'} justifyContent="center">
          <Pagination
            onChange={handlePageChange}
            sx={{
              // '.MuiPagination-ul li button': { border: '1px solid' },
              alignItems: 'end',
              overflowX: 'scroll',
              mb: isMobile ? '24px' : '',
              '> ul': {
                flexWrap: 'nowrap'
              },
              '&::-webkit-scrollbar': {
                display: 'none'
              }
            }}
            count={Math.ceil((auctionPoolData?.total || 0) / (defaultPageSize || 0))}
          />
        </Box>
      </AcctionPoolCard>
    </Stack>
  )
}
