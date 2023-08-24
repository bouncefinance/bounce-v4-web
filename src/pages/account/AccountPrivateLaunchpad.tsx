import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  styled,
  Link,
  Pagination,
  Dialog,
  DialogContent
} from '@mui/material'
import { Add } from '@mui/icons-material'
import EditIcon from '@mui/icons-material/Edit'
import AccountLayout from 'bounceComponents/account/AccountLayout'
import { useCallback, useEffect, useMemo, useState } from 'react'
import tabStyles from './tabStyles'
import ChainSelect from 'bounceComponents/common/ChainSelect'
import AuctionTypeSelect from 'bounceComponents/common/AuctionTypeSelect'
import { PoolType } from 'api/pool/type'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
import Image from 'components/Image'
import TokenImage from 'bounceComponents/common/TokenImage'
import { ChainListMap, ChainId } from 'constants/chain'
// import { AuctionProgressPrimaryColor } from 'constants/auction/color'
import useBreakpoint from 'hooks/useBreakpoint'
import { usePagination, useRequest } from 'ahooks'
import { getUserLaunchpadInfo, updateLaunchpadPool } from 'api/user'
import { Params } from 'ahooks/lib/usePagination/types'
import { getLabelById, shortenAddress } from 'utils'
import { useActiveWeb3React } from 'hooks'
import { useOptionDatas } from 'state/configOptions/hooks'
import { IBasicInfoParams, IPoolInfoParams, PoolStatus } from 'pages/launchpad/create-launchpad/type'
import Twitter from 'assets/imgs/auction/round-icon-twitter.svg'
import Telegram from 'assets/imgs/common/Telegram.png'
import Facebook from 'assets/imgs/common/Facebook-Blue-Logo.svg'
import YouTube from 'assets/imgs/common/YouTube-Icon-Full.svg'
import Medium from 'assets/imgs/common/Medium.png'
import Discord from 'assets/socialLinksIcon/Discord.svg'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import EmptyData from 'bounceComponents/common/EmptyData'
import ShowDetailIcon from 'assets/imgs/auction/show-detail-icon.svg'
import EditDetailIcon from 'assets/imgs/auction/edit-detail-icon.svg'
import { poolStrictSchema } from '../launchpad/create-launchpad/schema'
import { useToDetailInfo } from 'bounceHooks/launchpad/useToDetailInfo'
import { toast } from 'react-toastify'
import { ConfirmationInfoItem } from 'bounceComponents/create-auction-pool/Creation1155Confirmation'
import useTokenList from 'bounceHooks/auction/useTokenList'
import moment from 'moment'
import AuctionNotification from 'bounceComponents/create-auction-pool/AuctionNotification'
import { tokenReleaseTypeText } from 'bounceComponents/create-auction-pool/CreationConfirmation'
import { useCurrencyBalance, useToken } from 'state/wallet/hooks'
import { Currency, CurrencyAmount } from 'constants/token'
import { useShowLoginModal } from 'state/users/hooks'
// import { useAuctionInChain } from 'bounceComponents/create-auction-pool/ValuesProvider'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import {
  hideDialogConfirmation,
  showRequestApprovalDialog,
  showRequestConfirmDialog,
  showWaitingTxDialog
} from 'utils/auction'
import { show } from '@ebay/nice-modal-react'
import DialogTips from 'bounceComponents/common/DialogTips'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { LoadingButton } from '@mui/lab'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
import { FIXED_SWAP_ERC20_ADDRESSES } from 'constants/index'
import getAuctionPoolLink from 'utils/auction/getAuctionPoolRouteLink'
import { useCreateLaunchpadFixedSwapPool } from 'hooks/useCreateLaunchpadFixedSwapPool'
import { Body02 } from 'components/Text'
import { PoolStatus as ChainPoolStatus } from 'api/pool/type'
import PoolStatusBox from 'bounceComponents/fixed-swap/ActionBox/PoolStatus'
enum ETabList {
  All = 'All',
  Upcoming = 'Upcoming',
  Live = 'Live',
  Close = 'Close'
}
export enum CardSize {
  Small = 1,
  Medium = 2,
  Large = 3
}
type TypeButtonCommitted = 'wait' | 'inProgress' | 'success'
export const socialMap: { [key: string]: string } = {
  twitter: Twitter,
  telegram: Telegram,
  facebook: Facebook,
  youTube: YouTube,
  medium: Medium,
  discord: Discord
}
const MoreDataBox = ({ title, content, size }: { title: string; content: string; size: CardSize }) => {
  return (
    <Box>
      <InterTitle sx={{ fontSize: size === CardSize.Small ? 8 : size === CardSize.Medium ? 12 : 13 }}>
        {title}
      </InterTitle>
      <InterTitle
        mt={4}
        sx={{ fontSize: size === CardSize.Small ? 10 : size === CardSize.Medium ? 14 : 16, fontWeight: 500 }}
      >
        {content}
      </InterTitle>
    </Box>
  )
}
const tabList = [ETabList.All, ETabList.Close, ETabList.Live, ETabList.Upcoming]
const ConfirmationSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[900],
  opacity: 0.5,
  textTransform: 'capitalize'
}))
const CreatePoolButton = ({
  poolInfo,
  currencyFrom,
  currencyTo
}: {
  poolInfo: IPoolInfoParams & { opId?: number }
  currencyFrom: Currency | undefined
  currencyTo: Currency | undefined
}) => {
  const navigate = useNavigate()

  const { account, chainId } = useActiveWeb3React()
  const showLoginModal = useShowLoginModal()
  const auctionInChainId = poolInfo.chainId
  const switchNetwork = useSwitchNetwork()
  const auctionAccountBalance = useCurrencyBalance(account || undefined, currencyFrom)

  const createFixedSwapPool = useCreateLaunchpadFixedSwapPool({
    currencyFrom: currencyFrom as Currency,
    currencyTo: currencyTo as Currency,
    poolInfo
  })
  const [buttonCommitted, setButtonCommitted] = useState<TypeButtonCommitted>()
  const chainConfigInBackend = useChainConfigInBackend('ethChainId', auctionInChainId)

  const auctionPoolSizeAmount = useMemo(
    () =>
      currencyFrom && poolInfo.totalAmount0
        ? CurrencyAmount.fromAmount(currencyFrom, poolInfo.totalAmount0)
        : undefined,
    [currencyFrom, poolInfo.totalAmount0]
  )
  const [approvalState, approveCallback] = useApproveCallback(
    auctionPoolSizeAmount,
    // erc20
    chainId === auctionInChainId ? FIXED_SWAP_ERC20_ADDRESSES[auctionInChainId] : undefined,
    true
  )

  const toCreate = useCallback(async () => {
    showRequestConfirmDialog()

    try {
      setButtonCommitted('wait')
      const { getPoolId, transactionReceipt, sysId } = await createFixedSwapPool()
      setButtonCommitted('inProgress')

      const ret: Promise<string> = new Promise((resolve, rpt) => {
        showWaitingTxDialog(() => {
          hideDialogConfirmation()
          rpt()
        })
        transactionReceipt.then((curReceipt: any) => {
          const poolId = getPoolId(curReceipt.logs)
          if (poolId) {
            resolve(poolId)
            setButtonCommitted('success')
          } else {
            hideDialogConfirmation()
            show(DialogTips, {
              iconType: 'error',
              cancelBtn: 'Cancel',
              title: 'Oops..',
              content: 'The creation may have failed. Please check some parameters, such as the start time'
            })
            rpt()
          }
        })
      })
      ret
        .then(poolId => {
          console.log('poolId')
          console.log(poolId)
          const requestBody = { ...poolInfo, status: PoolStatus.On_Chain, chainId: poolInfo.opId as number }
          delete requestBody.opId
          updateLaunchpadPool(requestBody)
          const goToPoolInfoPage = () => {
            const route = getAuctionPoolLink(sysId, PoolType.FixedSwap, chainConfigInBackend?.id as number, poolId)
            navigate(route)
          }

          hideDialogConfirmation()
          show(DialogTips, {
            iconType: 'success',
            againBtn: 'To the pool',
            cancelBtn: 'Not now',
            title: 'Congratulations!',
            content: 'You have successfully created the auction.',
            onAgain: goToPoolInfoPage
          })
        })
        .catch()
    } catch (error) {
      const err: any = error
      console.error(err)
      hideDialogConfirmation()
      setButtonCommitted(undefined)
      show(DialogTips, {
        iconType: 'error',
        againBtn: 'Try Again',
        cancelBtn: 'Cancel',
        title: 'Oops..',
        content:
          typeof err === 'string'
            ? err
            : err?.data?.message || err?.error?.message || err?.message || 'Something went wrong',
        onAgain: toCreate
      })
    }
  }, [chainConfigInBackend?.id, createFixedSwapPool, navigate])

  const toApprove = useCallback(async () => {
    showRequestApprovalDialog()
    try {
      const { transactionReceipt } = await approveCallback()
      // show(DialogTips, {
      //   iconType: 'success',
      //   cancelBtn: 'Close',
      //   title: 'Transaction Submitted!',
      //   content: `Approving use of ${currencyFrom?.symbol} ...`,
      //   handleCancel: () => hide(DialogTips)
      // })
      const ret = new Promise((resolve, rpt) => {
        showWaitingTxDialog(() => {
          hideDialogConfirmation()
          rpt()
        })
        transactionReceipt.then(curReceipt => {
          resolve(curReceipt)
        })
      })
      ret
        .then(() => {
          hideDialogConfirmation()
          toCreate()
        })
        .catch()
    } catch (error) {
      const err: any = error
      console.error(err)
      hideDialogConfirmation()
      show(DialogTips, {
        iconType: 'error',
        againBtn: 'Try Again',
        cancelBtn: 'Cancel',
        title: 'Oops..',
        content: typeof err === 'string' ? err : err?.error?.message || err?.message || 'Something went wrong',
        onAgain: toApprove
      })
    }
  }, [approveCallback, toCreate])

  const confirmBtn: {
    disabled?: boolean
    loading?: boolean
    text?: string
    run?: () => void
  } = useMemo(() => {
    if (!account) {
      return {
        text: 'Connect wallet',
        run: showLoginModal
      }
    }
    if (chainId !== auctionInChainId) {
      return {
        text: 'Switch network',
        run: () => switchNetwork(auctionInChainId)
      }
    }
    if (buttonCommitted !== undefined) {
      if (buttonCommitted === 'success') {
        return {
          text: 'Success',
          disabled: true
        }
      }
      return {
        text: 'Confirm',
        loading: true
      }
    }
    if (!auctionAccountBalance || !auctionPoolSizeAmount || auctionPoolSizeAmount.greaterThan(auctionAccountBalance)) {
      return {
        text: 'Insufficient Balance',
        disabled: true
      }
    }
    if (approvalState !== ApprovalState.APPROVED) {
      if (approvalState === ApprovalState.PENDING) {
        return {
          text: `Approving use of ${currencyFrom?.symbol} ...`,
          loading: true
        }
      }
      if (approvalState === ApprovalState.UNKNOWN) {
        return {
          text: 'Loading...',
          loading: true
        }
      }
      if (approvalState === ApprovalState.NOT_APPROVED) {
        return {
          text: `Approve use of ${currencyFrom?.symbol}`,
          run: toApprove
        }
      }
    }
    return {
      run: toCreate
    }
  }, [
    account,
    approvalState,
    auctionAccountBalance,
    auctionInChainId,
    auctionPoolSizeAmount,
    buttonCommitted,
    chainId,
    currencyFrom?.symbol,
    showLoginModal,
    switchNetwork,
    toApprove,
    toCreate
  ])

  return (
    <LoadingButton
      fullWidth
      variant="contained"
      loadingPosition="start"
      loading={confirmBtn.loading}
      disabled={confirmBtn.disabled}
      onClick={confirmBtn.run}
    >
      {confirmBtn.text || 'Confirm'}
    </LoadingButton>
  )
}
const ToCreateDialog = ({ show, poolInfo }: { show: boolean; poolInfo: IPoolInfoParams }) => {
  const { tokenList } = useTokenList(poolInfo.chainId, 2, '', true)
  const token1 = tokenList.find(item => item.address === poolInfo.token1)
  const token1Currency = useToken(token1?.address || '', token1?.chainId)
  const token0Currency = useToken(poolInfo.token0 || '', poolInfo.chainId)
  return (
    <Dialog sx={{ width: 'max-content', height: 'max-content' }} open={show}>
      <DialogContent>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
          <Box sx={{ display: 'flex', flexDirection: 'column', pb: 48, width: 'fit-content', px: { xs: 16, md: 0 } }}>
            <Typography variant="h2" sx={{ textAlign: 'center', mb: 42 }}>
              Creation confirmation
            </Typography>

            <Box sx={{ borderRadius: '20px', border: '1px solid #D7D6D9', px: 24, py: 30 }}>
              <Typography variant="h3" sx={{ fontSize: 16, mb: 24 }}>
                {poolInfo.name} Fixed-price Pool
              </Typography>

              <Stack spacing={24}>
                <ConfirmationInfoItem title="Chain">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image
                      src={poolInfo.chainId ? ChainListMap[poolInfo.chainId as ChainId]?.logo || '' : ''}
                      alt={poolInfo.chainId ? ChainListMap[poolInfo.chainId as ChainId]?.name : ''}
                      width={20}
                      height={20}
                    />
                    <Typography sx={{ ml: 4 }}>
                      {poolInfo.chainId ? ChainListMap[poolInfo.chainId as ChainId]?.name : ''}
                    </Typography>
                  </Box>
                </ConfirmationInfoItem>

                <Box>
                  <Typography variant="h3" sx={{ fontSize: 14, mb: 12 }}>
                    Token Information
                  </Typography>

                  <Stack spacing={15}>
                    <ConfirmationInfoItem title="Token Contract address">
                      <Typography>{shortenAddress(poolInfo.token0 || '')}</Typography>
                    </ConfirmationInfoItem>

                    <ConfirmationInfoItem title="Token symbol">
                      <Stack direction="row" spacing={8} alignItems="center">
                        <TokenImage alt={poolInfo.token0Symbol} src={(poolInfo.token0Logo as string) || ''} size={20} />
                        <Typography>{poolInfo.token0Symbol}</Typography>
                      </Stack>
                    </ConfirmationInfoItem>

                    <ConfirmationInfoItem title="Token decimal">
                      <Typography>{poolInfo.token0Decimals}</Typography>
                    </ConfirmationInfoItem>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="h3" sx={{ fontSize: 14, mb: 12 }}>
                    Auction Parameters
                  </Typography>

                  <Stack spacing={15}>
                    <ConfirmationInfoItem title="Pool type">
                      <Typography>{PoolType[poolInfo.category]}</Typography>
                    </ConfirmationInfoItem>

                    <ConfirmationInfoItem title="To">
                      <Stack direction="row" spacing={8} alignItems="center">
                        <TokenImage alt={token1?.symbol} src={token1?.logoURI || token1?.smallUrl} size={20} />
                        <Typography>{token1?.symbol}</Typography>
                      </Stack>
                    </ConfirmationInfoItem>

                    <ConfirmationInfoItem title="Swap Ratio">
                      <Typography>
                        1 {poolInfo.token0Symbol} = {poolInfo.ratio} {token1?.symbol}
                      </Typography>
                    </ConfirmationInfoItem>

                    <ConfirmationInfoItem title="Amount">
                      <Typography>{poolInfo.totalAmount0}</Typography>
                    </ConfirmationInfoItem>

                    <ConfirmationInfoItem title="Allocation per Wallet">
                      <Typography>
                        {Number(poolInfo.maxAmount1PerWallet) > 0
                          ? `Limit ${
                              token1Currency
                                ? CurrencyAmount.fromAmount(
                                    token1Currency,
                                    poolInfo.maxAmount1PerWallet || ''
                                  )?.toSignificant()
                                : 0
                            } ${token1?.symbol}`
                          : 'No'}
                      </Typography>
                    </ConfirmationInfoItem>
                  </Stack>
                </Box>

                <Box>
                  <Typography variant="h3" sx={{ fontSize: 14, mb: 12 }}>
                    Advanced Settings
                  </Typography>

                  <Stack spacing={15}>
                    <ConfirmationInfoItem title="Pool duration">
                      <Typography>
                        From {moment(poolInfo.openAt)?.format('MM.DD.Y HH:mm')} - To{' '}
                        {moment(poolInfo.closeAt)?.format('MM.DD.Y HH:mm')}
                      </Typography>
                    </ConfirmationInfoItem>

                    <ConfirmationInfoItem title="Participant">
                      <Typography>{poolInfo.whitelistEnabled ? 'Whitelist' : 'Public'}</Typography>
                    </ConfirmationInfoItem>

                    <ConfirmationInfoItem title="Unlocking Token Type">
                      <Typography>
                        {tokenReleaseTypeText(poolInfo.releaseType)}
                        {/* {values.delayUnlockingTime ? values.delayUnlockingTime.format('MM:DD:Y HH:mm') : 'No'} */}
                      </Typography>
                    </ConfirmationInfoItem>
                  </Stack>
                </Box>
              </Stack>
            </Box>
            <AuctionNotification />
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 32, width: '100%' }}>
              {token1Currency && token0Currency && (
                <CreatePoolButton
                  poolInfo={poolInfo}
                  currencyTo={token1Currency as Currency | undefined}
                  currencyFrom={token0Currency as Currency | undefined}
                />
              )}

              <ConfirmationSubtitle sx={{ mt: 12 }}>Transaction Fee is 2.5%</ConfirmationSubtitle>
            </Box>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  )
}

export const Launchpad = ({
  poolInfo,
  basicInfo,
  size,
  mark,
  onClick
}: {
  poolInfo: IPoolInfoParams
  basicInfo: IBasicInfoParams
  size: CardSize
  mark?: JSX.Element
  onClick?: () => void
}) => {
  const optionDatas = useOptionDatas()
  const chainName = useMemo(() => {
    const chainInfo = optionDatas.chainInfoOpt?.find(item => item.ethChainId === poolInfo.chainId)
    return chainInfo?.chainName
  }, [optionDatas, poolInfo])
  const { openAt, closeAt } = poolInfo
  const status = useMemo(() => {
    const cur = new Date().valueOf()
    if (!openAt || !closeAt) return ChainPoolStatus.Upcoming
    if (cur < openAt) return ChainPoolStatus.Upcoming
    if (cur >= openAt && cur <= closeAt) return ChainPoolStatus.Live
    return ChainPoolStatus.Closed
  }, [openAt, closeAt])
  return (
    <Row
      onClick={onClick}
      sx={[
        {
          width: '100%',
          position: 'relative',
          borderRadius: 30,
          overflow: 'hidden',
          cursor: 'pointer',
          '& .mask': {
            display: 'none'
          },
          '& .left_banner': {
            transform: 'scale(1)',
            transition: 'all .6s'
          },
          '&:hover': {
            '& .mask': {
              display: 'block'
            },
            '& .left_banner': {
              transform: 'scale(1.2)'
            }
          }
        },
        size === CardSize.Small && {
          height: 292,
          borderRadius: 18
        },
        size === CardSize.Medium && {
          height: 373
        },
        size === CardSize.Large && {
          height: 500
        }
      ]}
      mt={48}
    >
      <Box
        sx={[
          {
            height: '100%',
            position: 'relative',
            overflow: 'hidden'
          },
          size === CardSize.Small && {
            width: 375
          },
          (size === CardSize.Medium || size === CardSize.Large) && {
            width: 600
          }
        ]}
      >
        <Image
          className="left_banner"
          style={{ width: '100%', height: '100%', position: 'absolute', left: 0, top: 0 }}
          src={poolInfo.picture2 || 'http://localhost:3000/static/media/deelance.883555954fb281ea1f93.png'}
        />
        <Row sx={{ position: 'absolute', top: 0, left: 0, gap: 8, padding: 15 }}>
          <RoundedBox>
            <TokenImage
              src={ChainListMap[poolInfo.chainId as ChainId]?.logo}
              size={size === CardSize.Small ? 15 : 24}
            />
            <SansTitle sx={{ color: '#FFF', fontSize: size === CardSize.Small ? 10 : 16 }}>
              {ChainListMap[poolInfo.chainId as ChainId]?.name}
            </SansTitle>
          </RoundedBox>
          <RoundedBox sx={{ color: '#B5E529', fontSize: size === CardSize.Small ? 10 : 16 }}>
            {PoolType[poolInfo.category]}
          </RoundedBox>
        </Row>
      </Box>
      <Box
        sx={{
          flex: 1,
          background: '#E8E9E4',
          padding: size === CardSize.Small ? 24 : 40,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: '100%'
        }}
      >
        <Row sx={{ justifyContent: 'space-between' }}>
          <Row gap={10} sx={{ alignItems: 'center', gap: 10 }}>
            {size !== CardSize.Medium && (
              <Image
                style={{
                  width: size === CardSize.Large ? 60 : 37,
                  height: size === CardSize.Large ? 60 : 37,
                  borderRadius: 4
                }}
                src={
                  basicInfo.projectLogo ||
                  'https://images-v3.bounce.finance/2fb011f35fc0c258b50d44f1fb6b70c0-1683626370.png'
                }
              />
            )}
            <Stack sx={{ justifyContent: 'start', alignItems: 'start' }}>
              <SansTitle sx={{ fontSize: size === CardSize.Small ? 17 : 28, fontWeight: 600 }}>
                {basicInfo.projectName}
              </SansTitle>
              {size === CardSize.Large && (
                <Body02 sx={{ color: '#121212' }}>Hiley Golbel Coin and text and the coin</Body02>
              )}
            </Stack>
          </Row>
          {poolInfo.status === PoolStatus.On_Chain && (
            <PoolStatusBox
              style={{ width: 'max-content', height: 'max-content' }}
              status={status}
              claimAt={0}
              closeTime={(poolInfo.closeAt as number) / 1000}
              openTime={(poolInfo.openAt as number) / 1000}
            />
          )}
        </Row>
        <Stack flexDirection={'column'} justifyContent={'space-between'}>
          <Box sx={{ paddingLeft: 6 }} mt={18}>
            <InterTitle
              sx={{
                fontSize: 14,
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {basicInfo.description}
            </InterTitle>
            <Row mt={10} gap={6}>
              {basicInfo?.community
                .filter(item => !!item.communityLink)
                .map(item => (
                  <Link
                    sx={{ width: size === CardSize.Small ? 20 : 32, height: size === CardSize.Small ? 20 : 32 }}
                    key={item.communityLink}
                    href={item.communityLink}
                    target="_blank"
                  >
                    <Image width={'100%'} height={'100%'} src={socialMap[item.communityName]} />
                  </Link>
                ))}
            </Row>
          </Box>
          <Box
            mt={12}
            sx={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gridRowGap: 8,
              paddingLeft: 6
            }}
          >
            {poolInfo.token0Name && <MoreDataBox size={size} title="Token Name" content={poolInfo.token0Name} />}
            {poolInfo.ratio && <MoreDataBox size={size} title="Token Price" content={poolInfo.ratio} />}
            {poolInfo.totalAmount0 && <MoreDataBox size={size} title="Token Amount" content={poolInfo.totalAmount0} />}
            {chainName && <MoreDataBox size={size} title="Blockchain / Platform" content={chainName} />}
          </Box>
        </Stack>
      </Box>

      {mark && mark}
    </Row>
  )
}
const LaunchpadCard = ({
  poolInfo,
  basicInfo,
  getInfo
}: {
  poolInfo: IPoolInfoParams & { opId?: number }
  basicInfo: IBasicInfoParams
  getInfo: () => void
  size: CardSize
  Mark?: JSX.Element
}) => {
  const detailInfo = useToDetailInfo({ ...poolInfo, chainId: poolInfo.opId as number })
  const [showCreateDia, setShowCreateDia] = useState(false)
  const navigate = useNavigate()
  const { run } = useRequest(
    (status: PoolStatus.Released) => {
      const newPool = { ...poolInfo, chainId: poolInfo.opId, status }
      delete newPool.opId
      return updateLaunchpadPool(newPool as IPoolInfoParams)
    },
    {
      manual: true,
      onSuccess: () => {
        getInfo()
      }
    }
  )
  const toCreatePool = () => {
    poolStrictSchema
      .validate(detailInfo.poolInfo)
      .then(res => {
        console.log(res)
        setShowCreateDia(true)
      })
      .catch(err => {
        toast.error('There is still some content that has not been filled out!')
        setTimeout(() => navigate('/launchpad/create?type=2&id=' + detailInfo.poolInfo.id), 1000)
      })
  }
  return (
    <Launchpad
      poolInfo={poolInfo}
      basicInfo={basicInfo}
      size={CardSize.Small}
      mark={
        <Box
          className="mask"
          sx={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            left: 0,
            top: 0,
            background: 'rgba(23, 23, 23, 0.30)'
          }}
        >
          <Stack
            sx={{
              width: '100%',
              height: '100%',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 74
            }}
          >
            <Link href={`/account/launchpad/${poolInfo.id}`}>
              <Image src={ShowDetailIcon} />
            </Link>
            <Link href={`${routes.thirdPart.CreateLaunchpad}?type=2&id=${poolInfo.id}`}>
              <Image src={EditDetailIcon} />
            </Link>
            {poolInfo.status !== PoolStatus.On_Chain} <Box onClick={() => run(PoolStatus.Released)}>发布</Box>
            <Box onClick={toCreatePool}>上链</Box>
          </Stack>
          {showCreateDia && <ToCreateDialog show={showCreateDia} poolInfo={poolInfo} />}
        </Box>
      }
    />
  )
}

const defaultPageSize = 4
export default function AccountPrivateLaunchpad() {
  const [curTab, setCurTab] = useState(ETabList.All)
  const [curChain, setCurChain] = useState(0)
  const [curPoolType, setCurPoolType] = useState<PoolType | 0>(0)
  const navigate = useNavigate()
  const { account } = useActiveWeb3React()
  const optionDatas = useOptionDatas()
  const isSm = useBreakpoint('sm')

  const {
    loading,
    data,
    pagination,
    run: getLaunchpadInfo
  } = usePagination<any, Params>(
    async ({ current, pageSize }) => {
      const chainInfoOptId = optionDatas?.chainInfoOpt?.find(item => item.ethChainId === curChain)
      if (!account) {
        return {
          total: 0,
          list: [],
          basicInfo: {}
        }
      }
      const res = await getUserLaunchpadInfo({
        limit: pageSize,
        offset: (current - 1) * pageSize,
        chainId: chainInfoOptId?.id,
        category: curPoolType
      })
      return {
        list: res.data.list.map(i => {
          const ethChainId = getLabelById(i.chainId, 'ethChainId', optionDatas?.chainInfoOpt || [])
          return { ...i, chainId: ethChainId, opId: i.chainId }
        }),
        total: res.data.total,
        basicInfo: res.data.basicInfo as IBasicInfoParams
      }
    },
    {
      defaultPageSize,
      ready: !!account,
      refreshDeps: [account, curChain, curPoolType],
      debounceWait: 100
    }
  )
  const handlePageChange = (_: any, p: number) => {
    pagination.changeCurrent(p)
  }
  useEffect(() => {
    pagination.changeCurrent(1)
    console.log('curPoolType', curPoolType)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, curPoolType, curChain])
  return (
    <AccountLayout>
      <Box padding="40px 20px">
        <Container
          sx={{
            maxWidth: '1080px !important',
            position: 'relative'
          }}
        >
          <Typography variant="h3" fontSize={isSm ? 22 : 36} fontFamily={'Public Sans'} fontWeight={600}>
            Private Launchpad
          </Typography>
          <Row sx={{ justifyContent: 'flex-start' }} mt={28}>
            {tabList.map((item, index) => (
              <Typography
                onClick={() => setCurTab(item)}
                sx={{
                  ...tabStyles.menu,
                  ...(item === curTab ? tabStyles.menuActive : ({} as any)),
                  padding: '16px 32px 12px 32px',
                  fontFamily: 'Public Sans',
                  borderRadius: '12px 12px 0px 0px'
                }}
                key={index}
              >
                {item}
              </Typography>
            ))}
          </Row>
          <Box
            sx={{
              height: '100%',
              padding: '48px 40px',
              background: '#F6F6F3'
            }}
          >
            <Row sx={{ justifyContent: 'space-between' }}>
              <Row sx={{ gap: 8 }}>
                <AuctionTypeSelect curPoolType={curPoolType} setCurPoolType={v => setCurPoolType(v)} />
                <ChainSelect curChain={curChain} setCurChain={i => setCurChain(i)} />
              </Row>
              <Stack flexDirection={'row'} gap={20}>
                <Button
                  sx={{ height: 44 }}
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate(`${routes.thirdPart.CreateLaunchpad}?tab=1`)}
                >
                  <EditIcon /> Edit BasicInfo
                </Button>
                <Button
                  sx={{ height: 44 }}
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate(routes.thirdPart.CreateLaunchpad)}
                >
                  <Add /> Create a pool
                </Button>
              </Stack>
            </Row>
            {loading ? (
              <Box
                sx={{ width: '100%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
              >
                <BounceAnime />
              </Box>
            ) : !loading && data && data.list.length > 0 ? (
              <>
                <Stack sx={{ flexDirection: 'column', gap: 48 }}>
                  {data?.list.map((item: IPoolInfoParams & { opId?: number }) => (
                    <LaunchpadCard
                      key={item.id}
                      poolInfo={item}
                      basicInfo={data.basicInfo}
                      getInfo={() => getLaunchpadInfo({ current: pagination.current, pageSize: pagination.pageSize })}
                      size={CardSize.Small}
                    />
                  ))}
                </Stack>
                <Stack mt={48} alignItems={'center'}>
                  <Pagination
                    onChange={handlePageChange}
                    page={pagination.current}
                    count={Math.ceil((data?.total || 0) / (defaultPageSize || 0))}
                  />
                </Stack>
              </>
            ) : (
              <EmptyData />
            )}
          </Box>
        </Container>
      </Box>
    </AccountLayout>
  )
}

const Row = styled(Box)({
  display: 'flex',
  flexDirection: 'row'
})
const RoundedBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '2px 9px',
  background: 'rgba(18, 18, 18, 0.60)',
  borderRadius: 62
})
const SansTitle = styled(Typography)({
  color: '#121212',
  fontFamily: 'Public Sans',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '150%',
  letterSpacing: -0.2
})
const InterTitle = styled(Typography)({
  color: '#121212',
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '150%',
  fontFeatureSettings: 'calt',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  textEdge: 'cap',
  textTransform: 'lowercase',
  leadingTrim: 'both'
})
