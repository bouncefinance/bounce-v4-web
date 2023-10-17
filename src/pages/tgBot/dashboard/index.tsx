import {
  Stack,
  Typography,
  Grid,
  Box,
  styled,
  Button,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  OutlinedInput
} from '@mui/material'
import { ReactComponent as Calendar } from './svg/calendar.svg'
import { ReactComponent as Auction } from './svg/auction.svg'
import { ReactComponent as AuctionGroup } from './svg/auctionGroup.svg'
import { ReactComponent as Group } from './svg/group.svg'
import { ReactComponent as Task } from './svg/task.svg'
import { ReactComponent as User } from './svg/user.svg'
import { ReactComponent as Add } from './svg/add.svg'
import { ReactComponent as Arrow } from './svg/arrow.svg'
import { ReactComponent as Copy } from './svg/copy.svg'
import { useCallback, useState } from 'react'
import { useUserInfo } from 'state/users/hooks'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
import { useValuesDispatch, ActionType } from 'bounceComponents/create-auction-pool/ValuesProvider'
import { TgBotActiveStep } from 'bounceComponents/create-auction-pool/types'
import { useActiveWeb3React } from 'hooks'
import { useShowLoginModal } from 'state/users/hooks'
import { getBotPools } from 'api/market'
import { Params } from 'ahooks/lib/usePagination/types'
import { usePagination } from 'ahooks'
import { PoolType } from 'api/pool/type'
import { BackedTokenType } from 'pages/account/MyTokenOrNFT'
import { FixedSwapPool } from 'api/pool/type'
import { ChainListMap, ChainId } from 'constants/chain'
import Image from 'components/Image'
import PoolCountDown from '../components/PoolCountDown'
import PoolProgress, { AuctionProgressTextPrimaryColor } from '../components/PoolProgress'
import { CurrencyAmount, Currency } from 'constants/token'
import BigNumber from 'bignumber.js'
import PoolInfoItem from '../components/PoolInfoItem'
import TokenImage from 'bounceComponents/common/TokenImage'
import CertifiedTokenImage from 'components/CertifiedTokenImage'
import { shortenAddress } from 'utils'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import { formatNumber } from 'utils/number'
import NoPool from 'assets/images/noPool.png'
// import SearchIcon from '@mui/icons-material/Search'

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
const CusAccordion = styled(Accordion)`
  background-color: transparent;
  border-radius: 12px;
`
const CusAccordionSummary = styled(AccordionSummary)`
  background-color: #20201e;
  border-radius: 12px 12px 0 0;
  padding: 0 16px;

  .MuiAccordionSummary-content {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding-right: 16px;
    /* padding: 16px; */
  }
  .Mui-expanded {
    /* transform: translateX(-20px); */
  }
`
const CusAccordionDetails = styled(AccordionDetails)`
  background-color: #20201e;
  border-radius: 0 0 12px 12px;
  padding: 0 16px 16px;
`

// const CusOutlinedInput = styled(OutlinedInput)`
//   background-color: #121212;
//   border: 0;
// `

export default function Home() {
  const { userInfo } = useUserInfo()
  const navigate = useNavigate()
  const valuesDispatch = useValuesDispatch()
  const { account } = useActiveWeb3React()
  const showLoginModal = useShowLoginModal()
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

  const { data: auctionPoolData, loading } = usePagination<any, Params>(
    async ({ current, pageSize }) => {
      const resp = await getBotPools({
        offset: (current - 1) * pageSize,
        limit: pageSize,
        CreatorUserId: userInfo?.id,
        category: PoolType.FixedSwap,
        chainId: 0,
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
      refreshDeps: [tabStatusFrontend]
    }
  )
  console.log('auctionPoolData', auctionPoolData)
  const [expanded, setExpanded] = useState<string | false>(false)
  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false)
  }

  // const [filterInputValue, setFilterInputValue] = useState('')

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
          {/* <CusOutlinedInput
            value={filterInputValue}
            onChange={event => {
              console.log('filterInputValue: ', event.target.value)
              setFilterInputValue(event.target.value)
            }}
            fullWidth
            sx={{ mb: 30 }}
            startAdornment={<SearchIcon sx={{ mr: 4 }} />}
            placeholder="Search by token name or contract address"
          /> */}
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
          {loading || auctionPoolData?.total === 0 ? (
            <Image src={NoPool} width={'548px'} height={'360px'}></Image>
          ) : (
            <Box width={'100%'}>
              {auctionPoolData?.list.map((poolData: FixedSwapPool) => {
                const _t0 = poolData.token0
                const t0 = new Currency(poolData.chainId, _t0.address, _t0.decimals, _t0.symbol, _t0.name, _t0.smallUrl)
                const currencySwappedAmount0 = CurrencyAmount.fromRawAmount(t0, poolData.swappedAmount0 || '0')
                const swapedPercent = currencySwappedAmount0
                  ? new BigNumber(currencySwappedAmount0.raw.toString())
                      .div(poolData.amountTotal0)
                      .times(100)
                      .toNumber()
                  : undefined

                const _t1 = poolData.token1
                const t1 = new Currency(poolData.chainId, _t1.address, _t1.decimals, _t1.symbol, _t1.name, _t1.smallUrl)
                const currencyAmountToken0 = CurrencyAmount.fromRawAmount(t1, poolData.currentTotal0 || '0')

                return (
                  <CusAccordion
                    key={poolData.id}
                    expanded={expanded === poolData.poolId}
                    onChange={handleChange(poolData.poolId)}
                  >
                    <CusAccordionSummary expandIcon={<Arrow />} id="panel1bh-header">
                      <Stack width={'100%'}>
                        <Stack direction={'row'} justifyContent={'space-between'}>
                          <Stack gap={16} direction={'row'}>
                            <Typography
                              color={'rgba(255, 255, 255, 0.80)'}
                              fontFamily={'Public Sans'}
                              fontSize={16}
                              fontWeight={500}
                            >
                              {poolData.poolId}
                            </Typography>
                            <Typography color={'#fff'} fontFamily={'Public Sans'} fontSize={16} fontWeight={500}>
                              {poolData.name} Fixed Price Auction Poo
                            </Typography>
                          </Stack>
                          <Stack gap={16} direction={'row'}>
                            <Stack gap={8} direction={'row'} alignItems={'center'}>
                              <Image
                                width={16}
                                src={poolData?.chainId ? ChainListMap?.[poolData.chainId as ChainId]?.logo || '' : ''}
                              />
                              <Typography color={'#fff'} fontFamily={'Inter'} fontSize={14} fontWeight={400}>
                                {poolData?.chainId ? ChainListMap?.[poolData.chainId as ChainId]?.name || '' : '-'}
                              </Typography>
                            </Stack>
                            <PoolCountDown
                              status={poolData.status}
                              openTime={poolData.openAt}
                              closeTime={poolData.closeAt}
                              claimAt={poolData.claimAt}
                            />
                          </Stack>
                        </Stack>
                        <PoolProgress sx={{ marginTop: '16px' }} value={swapedPercent} poolStatus={poolData.status} />
                        <Box mt={12}>
                          <Typography color={AuctionProgressTextPrimaryColor[poolData.status]} component="span">
                            {currencySwappedAmount0.toSignificant()} {poolData.token0.symbol}
                          </Typography>
                          <Typography color={'#D7D6D9'} component="span">
                            &nbsp;/&nbsp;
                          </Typography>
                          <Typography color={'#959595'} component="span">
                            {currencyAmountToken0.toSignificant()} {poolData.token0.symbol}
                          </Typography>
                        </Box>
                      </Stack>

                      <Stack gap={16} direction={'row'}></Stack>
                    </CusAccordionSummary>
                    <CusAccordionDetails>
                      <Box
                        sx={{
                          height: '0.255px',
                          background: '#626262'
                        }}
                      />
                      <Grid mt={16} container spacing={3}>
                        <Grid item xs={3}>
                          <PoolInfoItem title="Token symbol">
                            <Stack direction="row" spacing={6} sx={{ alignItems: 'center' }}>
                              <TokenImage src={poolData.token0.largeUrl} alt={poolData.token0.symbol} size={20} />
                              <Typography color={'#fff'}>{poolData.token0.symbol}</Typography>
                            </Stack>
                          </PoolInfoItem>
                        </Grid>
                        <Grid item xs={3}>
                          <PoolInfoItem title="Contract Address" tip="Token Contract Address.">
                            <Stack direction="row" gap={6} sx={{ alignItems: 'center' }}>
                              <CertifiedTokenImage
                                address={poolData.token0.address}
                                coingeckoId={poolData.token0.coingeckoId}
                                ethChainId={poolData.chainId}
                                backedChainId={poolData.chainId}
                              />
                              <Typography color={'#fff'}>{shortenAddress(poolData.token0.address)}</Typography>
                              <CopyToClipboard text={poolData.token0.address}>
                                <Copy />
                              </CopyToClipboard>
                            </Stack>
                          </PoolInfoItem>
                        </Grid>
                        <Grid item xs={3}>
                          <PoolInfoItem title="Fixed price ratio">
                            <Stack direction="row" spacing={8}>
                              <Typography color={'#fff'}>1</Typography>
                              <TokenImage alt={poolData.token0.symbol} src={poolData.token0.largeUrl} size={20} />
                              <Typography color={'#fff'}>
                                {poolData.token0.symbol} = {formatNumber(poolData.ratio, { unit: 0 })}
                              </Typography>
                              <TokenImage alt={poolData.token1.symbol} src={poolData.token1.largeUrl} size={20} />
                              <Typography color={'#fff'}>{poolData.token1.symbol}</Typography>
                            </Stack>
                          </PoolInfoItem>
                        </Grid>
                        <Grid item xs={3}>
                          <PoolInfoItem title="Price,$">
                            <Typography color={'#fff'}>
                              {new BigNumber(poolData.poolPrice).decimalPlaces(6, BigNumber.ROUND_DOWN).toFormat()}
                            </Typography>
                          </PoolInfoItem>
                        </Grid>
                      </Grid>
                    </CusAccordionDetails>
                  </CusAccordion>
                )
              })}
            </Box>
          )}
        </Box>
      </AcctionPoolCard>
    </Stack>
  )
}
