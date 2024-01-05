import { Box, Stack, Typography, Step } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ReactComponent as AddSvg } from 'assets/imgs/staked/add.svg'
import { ReactComponent as UserSvg } from 'assets/imgs/staked/userIcon.svg'
import { ReactComponent as CheckSvg } from 'assets/imgs/staked/check_green.svg'
import { ReactComponent as WonderSvg } from 'assets/imgs/staked/wonderIcon_black.svg'
import { MultiTokenResultType } from 'bounceHooks/launchpad/useLaunchpadCoinInfo'
import dayjs from 'dayjs'
import { useCountDown } from 'ahooks'
import { useActiveWeb3React } from 'hooks'
import { useShowLoginModal } from 'state/users/hooks'
import { Currency, CurrencyAmount } from 'constants/token'
import { ChainId } from 'constants/chain'
import { Contract } from '@ethersproject/contracts'
import { useToken, useTokens } from 'state/wallet/hooks'
import { hideDialogConfirmation, showWaitingTxDialog } from 'utils/auction'
import { show } from '@ebay/nice-modal-react'
import { ReactComponent as FailSVG } from 'assets/svg/dark_fail.svg'
import BigNumber from 'bignumber.js'
import DialogTips from 'bounceComponents/common/DialogTips'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import {
  BoldTextStyle,
  CardContentBoldTextStyle,
  CardContentStyle,
  CardContentTitleStyle,
  CardLabelStyle,
  CountdownBtnStyle,
  NotInvolvedContainer,
  NotInvolvedTitle,
  StakeButton,
  StepContentStyle,
  StepLabelStyle,
  StepperStyle
} from 'pages/launchpadCoin/Step'
import TokenIcon from 'assets/imgs/nftLottery/tokenInformation/token-icon1.svg'
import StakeAuctionInputDialog from './stakeModal'
import { colorList, getIcon } from 'pages/nftLottery/sections/tokenInformation/config'

export function Steps({
  coinInfo,
  contract,
  poolId
}: {
  coinInfo: MultiTokenResultType | undefined
  contract: Contract | null
  poolId: number
}) {
  return (
    <Stack
      spacing={{ xs: 30, md: 40 }}
      sx={{ width: '100%', maxWidth: 1440, margin: '0 auto', marginTop: { xs: 50, md: 80 } }}
    >
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <BoldTextStyle>Subscription Timeline</BoldTextStyle>
        <></>
      </Box>
      <VerticalLinearStepper poolId={poolId} coinInfo={coinInfo} contract={contract} />
    </Stack>
  )
}
enum TStep {
  'COMING_SOON' = -1,
  'SUBSCRIPTION_PERIOD',
  'FINAL_TOKEN_DISTRIBUTION'
}
const nowDate = () => new Date().getTime()
function VerticalLinearStepper({
  coinInfo,
  contract,
  poolId
}: {
  coinInfo: MultiTokenResultType | undefined
  contract: Contract | null
  poolId: number
}) {
  const curStatus = useMemo(() => {
    if (!coinInfo || !coinInfo.poolInfo) return TStep.COMING_SOON
    if (nowDate() < coinInfo.poolInfo.openAt * 1000) {
      return TStep.COMING_SOON
    }
    if (nowDate() >= coinInfo.poolInfo.openAt * 1000 && nowDate() < coinInfo.poolInfo.closeAt * 1000) {
      return TStep.SUBSCRIPTION_PERIOD
    }
    return TStep.FINAL_TOKEN_DISTRIBUTION
  }, [coinInfo])
  const [activeStep, setActiveStep] = useState<TStep>(TStep.COMING_SOON)
  useEffect(() => {
    setActiveStep(curStatus === TStep.COMING_SOON ? TStep.SUBSCRIPTION_PERIOD : curStatus)
  }, [curStatus])

  const steps = [
    {
      label: 'Subscription Period',
      content: <Step1 status={curStatus} coinInfo={coinInfo} contract={contract} poolId={poolId} />
    },
    {
      label: 'Final Token Distribution',
      content: <Step2 status={curStatus} coinInfo={coinInfo} contract={contract} poolId={poolId} />
    }
  ]

  const renderTime = useMemo(() => {
    if (!coinInfo || !coinInfo.poolInfo) return ['--', '--']
    return [
      dayjs(coinInfo.poolInfo.openAt * 1000).format('YYYY-MM-DD HH:mm'),
      dayjs(coinInfo.poolInfo.closeAt * 1000).format('YYYY-MM-DD HH:mm')
    ]
  }, [coinInfo])
  return (
    <Box>
      <StepperStyle activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabelStyle optional={<Typography variant="caption">{coinInfo && renderTime[index]}</Typography>}>
              {step.label}
            </StepLabelStyle>
            <StepContentStyle>{step?.content}</StepContentStyle>
          </Step>
        ))}
      </StepperStyle>
    </Box>
  )
}

function Step1({
  status,
  coinInfo,
  contract,
  poolId
}: {
  status: TStep
  coinInfo: MultiTokenResultType | undefined
  contract: Contract | null
  poolId: number
}) {
  const { account, chainId } = useActiveWeb3React()
  const switchNetwork = useSwitchNetwork()
  const _chainId = useMemo(() => {
    return ChainId.SEPOLIA
  }, [])
  const [openDialog, setOpenDialog] = useState(false)
  const token0 = useToken(coinInfo?.poolInfo?.token0 || '', _chainId)
  const poolStakeTokens = useTokens(
    coinInfo?.myStakeToken1WeightAmountMap?.myStakeToken1WeightTokenAddr ?? [],
    _chainId
  )

  const [myStakeTokenIndex, curStackTokenAmount] = useMemo(() => {
    const index = coinInfo?.myStakeToken1WeightAmountMap?.myStakeToken1WeightAmounts?.findIndex(
      i => BigInt(i.toExact()) > BigInt('0')
    )
    const curTokenAmount =
      index !== undefined ? coinInfo?.myStakeToken1WeightAmountMap?.myStakeToken1WeightAmounts?.[index] : undefined
    return [index, curTokenAmount]
  }, [coinInfo?.myStakeToken1WeightAmountMap?.myStakeToken1WeightAmounts])

  const stakeTokenList = useMemo(() => {
    if (coinInfo && poolStakeTokens) {
      const arr = coinInfo.poolStakeToken1WeightAmountMap?.poolStakeToken1WeightAmounts?.map((item, index) => ({
        value: item?.toSignificant(6),
        data: item,
        address: coinInfo.poolStakeToken1WeightAmountMap?.poolStakeToken1WeightTokenAddr[index],
        token: poolStakeTokens[index],
        color: colorList[index],
        logo: getIcon(poolStakeTokens[index]?.symbol?.toLocaleUpperCase())
      }))
      return arr
    }
    return undefined
  }, [coinInfo, poolStakeTokens])

  const curTime = useMemo(() => {
    if (!coinInfo || !coinInfo.poolInfo) {
      return undefined
    }
    if (status === TStep.COMING_SOON) {
      return coinInfo.poolInfo.openAt * 1000
    }
    return coinInfo.poolInfo.closeAt * 1000
  }, [coinInfo, status])

  const [, formattedRes] = useCountDown({
    targetDate: curTime
  })
  const { days, hours, minutes, seconds } = formattedRes
  const renderCountDown = useMemo(() => {
    if (!coinInfo || !coinInfo.poolInfo) {
      return (
        <>
          <b>--</b> Days <b>--</b> Hours <b>--</b> Mins <b>--</b> Secs
        </>
      )
    }
    return (
      <>
        <b>{days}</b> Days <b>{hours}</b> Hours <b>{minutes}</b> Mins <b>{seconds}</b> Secs
      </>
    )
  }, [coinInfo, days, hours, minutes, seconds])

  const showLoginModal = useShowLoginModal()

  const handleClickStake = useCallback(() => {
    setOpenDialog(true)
  }, [])

  const _switchNetwork = () => {
    // switchNetwork(ChainId.MAINNET)
    switchNetwork(ChainId.SEPOLIA)
  }
  const actionBtn = useMemo(() => {
    if (!account) {
      return <StakeButton onClick={showLoginModal}>Connect Wallet</StakeButton>
    }
    // if (chainId !== ChainId.MAINNET) {
    //   return <StakeButton onClick={() => _switchNetwork()}>Switch Network</StakeButton>
    // }
    if (chainId !== ChainId.SEPOLIA) {
      return <StakeButton onClick={() => _switchNetwork()}>Switch Network</StakeButton>
    }
    if (status === TStep.COMING_SOON) {
      return (
        <StakeButton disabled>
          Stake <AddSvg />
        </StakeButton>
      )
    }
    if (status === TStep.SUBSCRIPTION_PERIOD) {
      return (
        <StakeButton onClick={() => handleClickStake()}>
          Stake <AddSvg />
        </StakeButton>
      )
    }
    return (
      <StakeButton disabled>
        Stake <AddSvg />
      </StakeButton>
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, chainId, handleClickStake, showLoginModal, status])
  const handleClose = () => {
    setOpenDialog(false)
  }

  const myPoolShare = useMemo(() => {
    const myStakeToken1Weight = coinInfo?.myStakeToken1WeightAmountMap?.myStakeToken1Weight?.[myStakeTokenIndex || 0]
    if (coinInfo?.poolTokenWeights) {
      return new BigNumber(myStakeToken1Weight?.toString() || 0)
        .times(100)
        .div(coinInfo.poolTokenWeights.toString())
        .toFixed(2)
    }
    return '--'
  }, [coinInfo?.myStakeToken1WeightAmountMap?.myStakeToken1Weight, coinInfo?.poolTokenWeights, myStakeTokenIndex])

  return (
    <>
      <Stack spacing={{ xs: 16, md: 24 }} mt={{ xs: 16, md: 24 }}>
        <Stack direction={{ xs: 'column', md: 'row' }} spacing={{ xs: 8, md: 16 }} height={{ xs: 'auto', md: 24 }}>
          <Typography
            sx={{
              color: '#959595',
              fontFamily: 'Inter',
              lineHeight: '24px'
            }}
            variant="body1"
          >
            {status === TStep.COMING_SOON
              ? 'Time left until subscription starts:'
              : 'Time left until subscription ends:'}
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#4F4F4F',
              fontFamily: 'Inter',
              lineHeight: '24px',
              b: {
                color: '#2663FF',
                fontSize: 20,
                fontWeight: '400'
              }
            }}
          >
            {renderCountDown}
          </Typography>
        </Stack>
        <Box
          sx={{
            width: { xs: '100%', md: 1000 },
            borderRadius: '24px',
            background: '#fff',
            display: { xs: 'grid', md: 'flex' }
          }}
        >
          <Box
            sx={{
              padding: 16
            }}
          >
            <Stack
              spacing={{ xs: 30, md: 40 }}
              sx={{
                width: { xs: '100%', md: '500px' },
                padding: { xs: 16, md: '24px 30px' },
                borderRadius: '20px',
                background: '#F6F6F3',
                height: { xs: 'auto', md: 426 }
              }}
            >
              <Box
                sx={{
                  display: { xs: 'grid', md: 'flex' },
                  gap: { xs: 8, md: 16 }
                }}
              >
                <img
                  src="https://assets.coingecko.com/coins/images/13860/standard/1_KtgpRIJzuwfHe0Rl0avP_g.jpeg?1696513606"
                  width={60}
                  height={60}
                  style={{ borderRadius: '50%' }}
                />
                <Stack spacing={4} maxWidth={{ xs: 'auto', md: 350 }}>
                  <CardLabelStyle
                    sx={{
                      b: {
                        color: '#2B51DA',
                        fontSize: '20px',
                        fontWeight: '600'
                      }
                    }}
                  >
                    Bounce Staking Pool
                  </CardLabelStyle>
                  <CardContentStyle>Stake tokens to earn proportional $PORT3 allocation</CardContentStyle>
                </Stack>
              </Box>
              <Stack spacing={{ xs: 20, md: 30 }}>
                <Stack direction="row" alignItems={'center'} justifyContent={'space-between'}>
                  <Stack spacing={8}>
                    <CardContentStyle>Sale Price</CardContentStyle>
                    <CardLabelStyle>0.05 USDT</CardLabelStyle>
                  </Stack>
                  <Stack spacing={8}>
                    <CardContentStyle>Total Supply of PORT3</CardContentStyle>
                    <CardLabelStyle>2,000,000</CardLabelStyle>
                  </Stack>
                </Stack>
                <Stack spacing={8}>
                  <CardContentStyle>Total Stake</CardContentStyle>
                  <Stack direction={'row'} flexWrap={'wrap'} justifyContent={'flex-start'} alignItems={'center'}>
                    {stakeTokenList?.map((item, index) => (
                      <Stack
                        key={item.token?.address}
                        direction={'row'}
                        justifyContent={'flex-start'}
                        spacing={10}
                        alignItems={'center'}
                        mr={20}
                        mb={10}
                      >
                        <img src={item.logo || TokenIcon} style={{ width: 20, height: 20, borderRadius: '50%' }} />
                        <Typography fontSize={16} fontWeight={500}>
                          {coinInfo?.token1StakedStats?.stakeTokenPrices
                            ? item?.data.div(coinInfo?.token1StakedStats?.stakeTokenPrices[index]).toSignificant()
                            : '0'}
                        </Typography>
                        <Typography fontSize={16} fontWeight={500} width={'fit-content'}>
                          {item?.token?.name?.toLocaleUpperCase()}
                        </Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
                <Stack direction="row" alignItems={'center'} justifyContent={'space-between'}>
                  <Stack spacing={8}>
                    <CardContentStyle>Participants</CardContentStyle>
                    <CardLabelStyle>
                      {coinInfo?.totalParticipants ? coinInfo?.totalParticipants.toString() : '--'}
                    </CardLabelStyle>
                  </Stack>
                  <Stack spacing={8}>
                    <CardContentStyle>Total Raise</CardContentStyle>
                    <CardLabelStyle>100,000 USDT</CardLabelStyle>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Box>
          <Stack
            spacing={{ xs: 30, md: 50 }}
            sx={{
              padding: { xs: '24px', md: '40px 30px' }
            }}
          >
            <Stack spacing={{ xs: 20, md: 30 }}>
              <Stack spacing={12}>
                <BoldTextStyle>
                  {token0 && coinInfo?.finalAllocation?.mySwappedAmount0
                    ? CurrencyAmount.fromRawAmount(
                        token0,
                        coinInfo?.finalAllocation?.mySwappedAmount0.toString()
                      ).toSignificant()
                    : '0'}{' '}
                  {token0?.symbol || '--'}
                </BoldTextStyle>
                <Typography
                  sx={{
                    color: '#959595',
                    fontSize: '16px',
                    lineHeight: '12px'
                  }}
                  variant="body1"
                >
                  My Estimated Allocation
                </Typography>
              </Stack>

              <Stack spacing={8}>
                <CardContentStyle>My Stake</CardContentStyle>
                <CardLabelStyle>
                  {myStakeTokenIndex !== undefined && coinInfo?.token1StakedStats?.stakeTokenPrices
                    ? curStackTokenAmount
                        ?.div(coinInfo?.token1StakedStats?.stakeTokenPrices?.[myStakeTokenIndex || 0])
                        .toSignificant()
                    : '--'}{' '}
                  {` `}
                  {curStackTokenAmount?.currency.symbol || '--'}
                </CardLabelStyle>
              </Stack>
              <Stack spacing={8}>
                <CardContentStyle>My Pool Share</CardContentStyle>
                <CardLabelStyle>{myPoolShare} %</CardLabelStyle>
              </Stack>
            </Stack>
            {actionBtn}
          </Stack>
        </Box>
      </Stack>
      <StakeAuctionInputDialog
        id={'7'}
        poolInfo={coinInfo}
        open={openDialog}
        contract={contract}
        poolId={poolId}
        setOpenDialog={() => setOpenDialog(false)}
        onClose={() => handleClose()}
        showLoginModal={showLoginModal}
        switchNetwork={_switchNetwork}
      />
    </>
  )
}

function Step2({
  status,
  coinInfo,
  contract,
  poolId
}: {
  status: TStep
  coinInfo: MultiTokenResultType | undefined
  contract: Contract | null
  poolId: number
}) {
  const { account, chainId } = useActiveWeb3React()
  const _chainId = useMemo(() => {
    if (!account) {
      // return 1
      return 11155111
    }
    return chainId
  }, [account, chainId])
  const _token0 = useToken(coinInfo?.poolInfo?.token0 || '', _chainId)
  const token0 = useMemo(() => {
    if (!_token0) return undefined
    return new Currency(_token0.chainId, _token0.address, _token0.decimals, 'PORT3', 'PORT3')
  }, [_token0])

  const [, formattedRes] = useCountDown({
    targetDate: coinInfo?.poolInfo?.releaseAt ? coinInfo?.poolInfo?.releaseAt * 1000 : 0
  })

  const claimToken0 = useCallback(async () => {
    if (!contract) return
    showWaitingTxDialog(() => {
      hideDialogConfirmation()
    })
    try {
      const res = await contract.claimToken0([poolId])
      const ret = new Promise((resolve, rpt) => {
        showWaitingTxDialog(() => {
          hideDialogConfirmation()
          rpt()
        })
        res.wait().then((curReceipt: any) => {
          resolve(curReceipt)
        })
      })
      ret
        .then(() => {
          hideDialogConfirmation()
          show(DialogTips, {
            iconType: 'success',
            againBtn: 'Close',
            title: 'Success!',
            content: `You have successfully claimed ${
              token0 &&
              coinInfo?.finalAllocation?.mySwappedAmount0 &&
              coinInfo.claimedToken0 &&
              CurrencyAmount.fromRawAmount(token0, coinInfo?.finalAllocation?.mySwappedAmount0?.toString())
                .subtract(CurrencyAmount.fromRawAmount(token0, coinInfo.claimedToken0.toString()))
                .toSignificant()
            } ${token0?.symbol}`
          })
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
        content: err?.reason || err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
        onAgain: claimToken0
      })
    }
  }, [coinInfo?.claimedToken0, coinInfo?.finalAllocation?.mySwappedAmount0, contract, poolId, token0])
  const claimToken1 = useCallback(async () => {
    if (!contract) return
    showWaitingTxDialog(() => {
      hideDialogConfirmation()
    })
    try {
      const res = await contract.claimToken1([poolId])
      const ret = new Promise((resolve, rpt) => {
        showWaitingTxDialog(() => {
          hideDialogConfirmation()
          rpt()
        })
        res.wait().then((curReceipt: any) => {
          resolve(curReceipt)
        })
      })
      ret
        .then(() => {
          hideDialogConfirmation()
          show(DialogTips, {
            iconType: 'success',
            cancelBtn: 'Close',
            title: 'Success! ',
            content: `You have successfully claimed`,
            onAgain: claimToken1
          })
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
        content: err?.reason || err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
        onAgain: claimToken1
      })
    }
  }, [contract, poolId])
  const canClaimToken0 = useMemo(() => {
    if (!coinInfo || !coinInfo.poolInfo) return false
    if (coinInfo.claimedToken0?.eq(coinInfo.finalAllocation?.mySwappedAmount0 || '0')) return false
    const now = nowDate()

    if (coinInfo.poolInfo && Number(now) > coinInfo.poolInfo.releaseAt * 1000) {
      const flag =
        (coinInfo.claimedToken0 &&
          coinInfo.finalAllocation?.mySwappedAmount0 &&
          coinInfo.claimedToken0 &&
          new BigNumber(coinInfo.finalAllocation?.mySwappedAmount0.toString())
            .times(
              Number(now) > coinInfo.poolInfo.releaseAt * 1000 + coinInfo.poolInfo.releaseDuration * 1000
                ? 1
                : (Number(now) - coinInfo.poolInfo.releaseAt * 1000) / (coinInfo.poolInfo.releaseDuration * 1000)
            )
            .minus(coinInfo.claimedToken0.toString())
            .gt(0)) ||
        false
      return flag
    }
    return false
  }, [coinInfo])

  const claimableToken0Amount = useMemo(() => {
    if (!coinInfo?.poolInfo || !coinInfo?.claimedToken0 || !coinInfo?.finalAllocation?.mySwappedAmount0) {
      return undefined
    }
    const now = nowDate()
    if (coinInfo.poolInfo && Number(now) > coinInfo.poolInfo.releaseAt * 1000) {
      return (
        coinInfo.claimedToken0 &&
        new BigNumber(coinInfo.finalAllocation.mySwappedAmount0.toString())
          .times(
            Number(now) > coinInfo.poolInfo.releaseAt * 1000 + coinInfo.poolInfo.releaseDuration * 1000
              ? 1
              : (Number(now) - coinInfo.poolInfo.releaseAt * 1000) / (coinInfo.poolInfo.releaseDuration * 1000)
          )
          .minus(new BigNumber(coinInfo.claimedToken0.toString()))
      )
    }
    return undefined
  }, [coinInfo?.claimedToken0, coinInfo?.finalAllocation?.mySwappedAmount0, coinInfo?.poolInfo])

  const switchNetwork = useSwitchNetwork()
  const showLoginModal = useShowLoginModal()
  const _switchNetwork = () => {
    // switchNetwork(ChainId.MAINNET)
    switchNetwork(ChainId.SEPOLIA)
  }

  return (
    <Stack spacing={24} mt={24}>
      <Typography
        sx={{
          color: '#20201E',
          fontFamily: 'Inter',
          lineHeight: '24px',
          maxWidth: 1000
        }}
        variant="body1"
      >
        The allocation calculation is complete. We will deduct the corresponding token from your account based on your
        final $PORT3 allocation, which will be transferred to your spot account along with your remaining token.
      </Typography>
      {account && coinInfo && status === TStep.FINAL_TOKEN_DISTRIBUTION && account !== coinInfo.poolInfo?.creator && (
        <NotInvolvedContainer>
          <FailSVG />
          <NotInvolvedTitle>You did not stake any token for this session.</NotInvolvedTitle>
        </NotInvolvedContainer>
      )}

      {(!account || coinInfo?.poolInfo?.creator === account || coinInfo) && status === TStep.FINAL_TOKEN_DISTRIBUTION && (
        <Box
          sx={{
            width: { xs: '100%', md: 1000 },
            borderRadius: '24px',
            background: '#fff',
            display: { xs: 'grid', md: 'flex' }
          }}
        >
          <Box
            sx={{
              padding: 16
            }}
          >
            <Stack
              spacing={{ xs: 20, md: 30 }}
              sx={{
                width: { xs: '100%', md: 500 },
                padding: { xs: 16, md: '24px 30px' },
                borderRadius: '20px',
                background: '#20201E',
                height: 306
              }}
            >
              <Stack spacing={16}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 6,
                    alignItems: 'center'
                  }}
                >
                  <img
                    src="https://assets.coingecko.com/coins/images/13860/standard/1_KtgpRIJzuwfHe0Rl0avP_g.jpeg?1696513606"
                    width={17}
                    height={17}
                    style={{ borderRadius: '50%' }}
                  />
                  <CardContentTitleStyle>Total Committed</CardContentTitleStyle>
                </Box>
                <CardContentBoldTextStyle>
                  {/* {token1TotalAmount?.toSignificant() || '0'} {token1?.symbol} */}
                </CardContentBoldTextStyle>
              </Stack>

              <Stack spacing={16}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 6,
                    alignItems: 'center'
                  }}
                >
                  <img src={TokenIcon} width={17} height={17} style={{ borderRadius: '50%' }} />
                  <CardContentTitleStyle>Token Amount</CardContentTitleStyle>
                </Box>
                <CardContentBoldTextStyle>null</CardContentBoldTextStyle>
              </Stack>

              <Stack spacing={16}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 6,
                    alignItems: 'center'
                  }}
                >
                  <UserSvg />
                  <CardContentTitleStyle>Total Participants</CardContentTitleStyle>
                </Box>
                <CardContentBoldTextStyle>{coinInfo?.totalParticipants?.toString()}</CardContentBoldTextStyle>
              </Stack>
            </Stack>
          </Box>

          <Stack
            spacing={{ xs: 30, md: 40 }}
            sx={{
              width: '100%',
              padding: { xs: '24px', md: '40px 30px' }
            }}
          >
            <Stack spacing={{ xs: 20, md: 30 }}>
              <Stack spacing={{ xs: 8, md: 16 }}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 6,
                    alignItems: 'center'
                  }}
                >
                  <CheckSvg />
                  <CardContentTitleStyle>Your Final Allocation/Total Supply</CardContentTitleStyle>
                </Box>
                <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                  <BoldTextStyle style={{ fontSize: 20 }}>
                    {coinInfo?.finalAllocation?.mySwappedAmount0 && coinInfo?.finalAllocation?.mySwappedAmount0.eq(0)
                      ? '0'
                      : (token0 &&
                          coinInfo?.finalAllocation?.mySwappedAmount0 &&
                          CurrencyAmount.fromRawAmount(
                            token0,
                            coinInfo?.finalAllocation?.mySwappedAmount0?.toString()
                          ).toSignificant()) ||
                        '0'}{' '}
                    {token0?.symbol} /{' '}
                    {claimableToken0Amount && token0 && claimableToken0Amount.gt('0')
                      ? CurrencyAmount.fromAmount(
                          token0,
                          new BigNumber(claimableToken0Amount.toString())
                            .div(new BigNumber('10').pow(token0.decimals))
                            .toString()
                        )?.toSignificant()
                      : '0'}{' '}
                    {token0?.symbol}
                  </BoldTextStyle>
                  {coinInfo?.poolInfo?.releaseAt && nowDate() < coinInfo.poolInfo?.releaseAt * 1000 ? (
                    <CountdownBtnStyle style={{ width: 150 }}>
                      Lock countdown
                      <Typography>
                        {formattedRes.days}d {formattedRes.hours}h
                      </Typography>
                    </CountdownBtnStyle>
                  ) : (
                    <CountdownBtnStyle style={{ width: 150 }} disabled={!canClaimToken0} onClick={() => claimToken0()}>
                      {coinInfo && coinInfo.claimedToken0?.eq(coinInfo.finalAllocation?.mySwappedAmount0 || '0')
                        ? 'Claimed'
                        : 'Claim'}
                    </CountdownBtnStyle>
                  )}
                </Stack>
              </Stack>
              <Stack spacing={{ xs: 8, md: 16 }}>
                <Box
                  sx={{
                    display: 'flex',
                    gap: 6,
                    alignItems: 'center'
                  }}
                >
                  <WonderSvg />
                  <CardContentTitleStyle>Total Amount Staked / Remaining Balance</CardContentTitleStyle>
                </Box>

                <Stack flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'}>
                  <BoldTextStyle style={{ fontSize: 20 }}>null</BoldTextStyle>
                  <StakeButton
                    style={{ width: 150 }}
                    disabled={coinInfo?.myToken1Claimed || !coinInfo?.finalAllocation?.myUnSwappedAmount1.gt(0)}
                    onClick={() => claimToken1()}
                  >
                    {coinInfo?.myToken1Claimed ? 'Claimed' : 'Claim'}
                  </StakeButton>
                </Stack>
                {!account && <StakeButton onClick={showLoginModal}>Connect Wallet</StakeButton>}
                {/* {account && chainId !== ChainId.MAINNET && (
                    <StakeButton onClick={_switchNetwork}>Switch Network</StakeButton>
                  )} */}
                {account && chainId !== ChainId.SEPOLIA && (
                  <StakeButton onClick={_switchNetwork}>Switch Network</StakeButton>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Box>
      )}
    </Stack>
  )
}
