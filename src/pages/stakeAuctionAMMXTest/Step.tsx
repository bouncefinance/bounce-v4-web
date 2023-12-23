import { Box, Stack, Typography, Step } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ReactComponent as AddSvg } from 'assets/imgs/staked/add.svg'
import { ReactComponent as UserSvg } from 'assets/imgs/staked/userIcon.svg'
import { ReactComponent as CheckSvg } from 'assets/imgs/staked/check_green.svg'
import { ReactComponent as WonderSvg } from 'assets/imgs/staked/wonderIcon_black.svg'
import { CoinResultType } from 'bounceHooks/launchpad/useLaunchpadCoinInfo'
import dayjs from 'dayjs'
import { useCountDown } from 'ahooks'
import { useActiveWeb3React } from 'hooks'
import { useShowLoginModal } from 'state/users/hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { Currency, CurrencyAmount } from 'constants/token'
import { ChainId } from 'constants/chain'
import { useApproveCallback } from 'hooks/useApproveCallback'
import { ApprovalState } from 'hooks/useTokenTimelock'
import { Contract } from '@ethersproject/contracts'
import { useToken } from 'state/wallet/hooks'
import { hideDialogConfirmation, showRequestApprovalDialog, showWaitingTxDialog } from 'utils/auction'
import { show } from '@ebay/nice-modal-react'
import { ReactComponent as FailSVG } from 'assets/svg/dark_fail.svg'
import BigNumber from 'bignumber.js'
import DialogTips, { DialogTipsWhiteTheme } from 'bounceComponents/common/DialogTips/DialogDarkTips'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import StakeAuctionInputDialog from 'bounceComponents/common/StakeAuctionInputDialog'
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
import { STAKE_TOKEN_WITH_TIME_WEIGHT_CONTRACT_ADDRESSES } from '../../constants'
import TokenIcon from 'assets/imgs/staked/ammx-token.jpg'

export function Steps({
  coinInfo,
  contract,
  poolId
}: {
  coinInfo: CoinResultType | undefined
  contract: Contract | null
  poolId: number
}) {
  return (
    <Stack
      spacing={{ xs: 30, md: 40 }}
      padding={{ xs: '0 16px', md: '20px 72px' }}
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
  coinInfo: CoinResultType | undefined
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
  coinInfo: CoinResultType | undefined
  contract: Contract | null
  poolId: number
}) {
  const { account, chainId } = useActiveWeb3React()
  const switchNetwork = useSwitchNetwork()
  const _chainId = useMemo(() => {
    return ChainId.MAINNET
  }, [])
  const [amount, setAmount] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const token0 = useToken(coinInfo?.poolInfo?.token0 || '', _chainId)
  const token1Currency = useToken(coinInfo?.poolInfo?.token1 || '', _chainId) || undefined

  const token1CurrencyAmount = useMemo(() => {
    if (!token1Currency) return undefined
    return CurrencyAmount.fromAmount(token1Currency, amount)
  }, [amount, token1Currency])
  const [approvalState, approve] = useApproveCallback(
    token1CurrencyAmount,
    STAKE_TOKEN_WITH_TIME_WEIGHT_CONTRACT_ADDRESSES[_chainId]
  )
  const token1Balance = useCurrencyBalance(account, token1Currency, _chainId)

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
  const handleSetAmount = (v: string) => {
    setAmount(v)
  }

  const handleClickStake = useCallback(() => {
    if (!token1Balance) return
    setOpenDialog(true)
  }, [token1Balance])
  const isBalanceInsufficient = useMemo(() => {
    if (!token1Balance) return false
    return !token1Balance.greaterThan('0')
  }, [token1Balance])
  const _switchNetwork = () => {
    switchNetwork(ChainId.MAINNET)
  }
  const actionBtn = useMemo(() => {
    if (!account) {
      return <StakeButton onClick={showLoginModal}>Connect Wallet</StakeButton>
    }
    if (chainId !== ChainId.MAINNET) {
      return <StakeButton onClick={() => _switchNetwork()}>Switch Network</StakeButton>
    }
    if (isBalanceInsufficient) {
      return <StakeButton disabled>Insufficient Balance</StakeButton>
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
  }, [account, chainId, handleClickStake, isBalanceInsufficient, showLoginModal, status])
  const handleClose = () => {
    setAmount('')
    setOpenDialog(false)
  }
  const toApprove = useCallback(async () => {
    showRequestApprovalDialog()
    try {
      const { transactionReceipt } = await approve()
      const ret = new Promise((resolve, rpt) => {
        showWaitingTxDialog(() => {
          hideDialogConfirmation()
          rpt()
        })
        transactionReceipt.then(curReceipt => {
          resolve(curReceipt)
        })
      })
      await ret
      hideDialogConfirmation()
    } catch (error) {
      const err: any = error
      console.error('err123', err)
      hideDialogConfirmation()
      show(DialogTips, {
        iconType: 'error',
        againBtn: 'Try Again',
        cancelBtn: 'Cancel',
        title: 'Oops..',
        content: err?.reason || err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
        onAgain: toApprove,
        PaperProps: {
          sx: DialogTipsWhiteTheme
        }
      })
    }
  }, [approve])
  const toCommit = useCallback(async () => {
    if (!token1CurrencyAmount || !contract) return
    showWaitingTxDialog(() => {
      hideDialogConfirmation()
    })
    try {
      const params = [poolId, token1CurrencyAmount.raw.toString()]
      const res = await contract.commit(...params)
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
            content: `You have successfully staked ${token1CurrencyAmount.toSignificant()} ${token1Currency?.symbol}`,
            PaperProps: {
              sx: DialogTipsWhiteTheme
            },
            onCancel: () => {
              handleClose()
            }
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
        onAgain: approvalState !== ApprovalState.APPROVED ? toApprove : toCommit,
        PaperProps: {
          sx: DialogTipsWhiteTheme
        }
      })
    }
  }, [approvalState, contract, poolId, toApprove, token1Currency?.symbol, token1CurrencyAmount])

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
                height: { xs: 'auto', md: 376 }
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
                    BitSwap <b>x</b> Ladder Pool
                  </CardLabelStyle>
                  <CardContentStyle>Stake $AUCTION to earn proportional $AMMX allocation</CardContentStyle>
                </Stack>
              </Box>
              <Stack spacing={{ xs: 20, md: 30 }}>
                <Stack direction="row" alignItems={'center'} justifyContent={'space-between'}>
                  <Stack spacing={8}>
                    <CardContentStyle>Sale Price</CardContentStyle>
                    <CardLabelStyle>0.00002721 AUCTION</CardLabelStyle>
                  </Stack>
                  <Stack spacing={8}>
                    <CardContentStyle>Total Supply of AMMX</CardContentStyle>
                    <CardLabelStyle>472,500,000</CardLabelStyle>
                  </Stack>
                </Stack>
                <Stack spacing={8}>
                  <CardContentStyle>Total Committed Amount / Total Raise</CardContentStyle>
                  <CardLabelStyle>
                    {coinInfo?.token1Amount && token1Currency
                      ? CurrencyAmount.fromRawAmount(token1Currency, coinInfo?.token1Amount.toString())?.toSignificant()
                      : '--'}{' '}
                    {token1Currency?.symbol} / 12857 AUCTION
                  </CardLabelStyle>
                </Stack>
                <Stack spacing={8}>
                  <CardContentStyle>Participants</CardContentStyle>
                  <CardLabelStyle>
                    {coinInfo?.totalParticipants ? coinInfo?.totalParticipants.toString() : '--'}
                  </CardLabelStyle>
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
                  {coinInfo?.myToken1Amount && token1Currency
                    ? CurrencyAmount.fromRawAmount(token1Currency, coinInfo?.myToken1Amount.toString()).toSignificant()
                    : '0'}{' '}
                  {token1Currency?.symbol}
                </CardLabelStyle>
              </Stack>
              <Stack spacing={8}>
                <CardContentStyle>My Pool Share</CardContentStyle>
                <CardLabelStyle>
                  {token1Currency &&
                  coinInfo?.myToken1Amount &&
                  coinInfo?.token1Amount &&
                  Number(coinInfo.token1Amount) > 0
                    ? CurrencyAmount.fromRawAmount(token1Currency, coinInfo?.myToken1Amount?.toString() || '0')
                        .divide(CurrencyAmount.fromRawAmount(token1Currency, coinInfo?.token1Amount?.toString() || '0'))
                        .multiply('100')
                        .toFixed(2)
                    : '0'}
                  %
                </CardLabelStyle>
              </Stack>
            </Stack>
            {actionBtn}
          </Stack>
        </Box>
      </Stack>
      <StakeAuctionInputDialog
        token1={token1CurrencyAmount}
        id={'3'}
        open={openDialog}
        onClose={() => handleClose()}
        token1Balance={token1Balance as CurrencyAmount}
        amount={amount}
        handleSetAmount={handleSetAmount}
        confirm={toCommit}
        toApprove={toApprove}
        approvalState={approvalState}
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
  coinInfo: CoinResultType | undefined
  contract: Contract | null
  poolId: number
}) {
  const { account, chainId } = useActiveWeb3React()
  const _chainId = useMemo(() => {
    if (!account) {
      return 1
    }
    return chainId
  }, [account, chainId])
  const _token0 = useToken(coinInfo?.poolInfo?.token0 || '', _chainId)
  const token0 = useMemo(() => {
    if (!_token0) return undefined
    return new Currency(_token0.chainId, _token0.address, _token0.decimals, 'AMMX', 'AMMX')
  }, [_token0])
  const _token1 = useToken(coinInfo?.poolInfo?.token1 || '', _chainId)
  const token1 = useMemo(() => {
    if (!_token1) return undefined
    return new Currency(_token1.chainId, _token1.address, _token1.decimals, 'AUCTION', 'AUCTION')
  }, [_token1])
  const token0TotalAmount = useMemo(() => {
    if (!token0 || !coinInfo?.poolInfo?.amountTotal0) return undefined
    return CurrencyAmount.fromRawAmount(token0, coinInfo?.poolInfo?.amountTotal0.toString())
  }, [coinInfo?.poolInfo?.amountTotal0, token0])
  const token1TotalAmount = useMemo(() => {
    if (!token1 || !coinInfo?.token1Amount) return undefined
    return CurrencyAmount.fromRawAmount(token1, coinInfo.token1Amount.toString())
  }, [coinInfo?.token1Amount, token1])
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
            } ${token0?.symbol}`,
            PaperProps: {
              sx: DialogTipsWhiteTheme
            }
          })
        })
        .catch()
    } catch (error) {
      const err: any = error
      hideDialogConfirmation()
      show(DialogTips, {
        iconType: 'error',
        againBtn: 'Try Again',
        cancelBtn: 'Cancel',
        title: 'Oops..',
        content: err?.reason || err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
        onAgain: claimToken0,
        PaperProps: {
          sx: DialogTipsWhiteTheme
        }
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
            content: `You have successfully claimed ${
              token1 &&
              coinInfo?.finalAllocation?.myUnSwappedAmount1 &&
              CurrencyAmount.fromRawAmount(
                token1,
                coinInfo.finalAllocation?.myUnSwappedAmount1.toString()
              ).toSignificant()
            } ${token1?.symbol}`,
            onAgain: claimToken1,
            PaperProps: {
              sx: DialogTipsWhiteTheme
            }
          })
        })
        .catch()
    } catch (error) {
      const err: any = error
      hideDialogConfirmation()
      show(DialogTips, {
        iconType: 'error',
        againBtn: 'Try Again',
        cancelBtn: 'Cancel',
        title: 'Oops..',
        content: err?.reason || err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
        onAgain: claimToken1,
        PaperProps: {
          sx: DialogTipsWhiteTheme
        }
      })
    }
  }, [coinInfo?.finalAllocation?.myUnSwappedAmount1, contract, poolId, token1])
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
    switchNetwork(ChainId.MAINNET)
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
        The allocation calculation is complete. We will deduct the corresponding $AUCTION from your account based on
        your final $AMMX allocation, which will be transferred to your spot account along with your remaining $AUCTION.
      </Typography>
      {account &&
        coinInfo?.myToken1Amount?.eq(0) &&
        status === TStep.FINAL_TOKEN_DISTRIBUTION &&
        account !== coinInfo.poolInfo?.creator && (
          <NotInvolvedContainer>
            <FailSVG />
            <NotInvolvedTitle>You did not stake any $AUCTION for this session.</NotInvolvedTitle>
          </NotInvolvedContainer>
        )}

      {(!account ||
        coinInfo?.poolInfo?.creator === account ||
        (coinInfo?.myToken1Amount && coinInfo?.myToken1Amount.gt(0) && coinInfo)) &&
        status === TStep.FINAL_TOKEN_DISTRIBUTION && (
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
                    {token1TotalAmount?.toSignificant() || '0'} {token1?.symbol}
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
                  <CardContentBoldTextStyle>
                    {token0TotalAmount?.toSignificant() || '0'} {token0?.symbol}
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
                      <CountdownBtnStyle
                        style={{ width: 150 }}
                        disabled={!canClaimToken0}
                        onClick={() => claimToken0()}
                      >
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
                    <BoldTextStyle style={{ fontSize: 20 }}>
                      {coinInfo?.myToken1Amount && token1 && coinInfo.myToken1Amount.eq('0')
                        ? '0'
                        : (token1 &&
                            coinInfo?.myToken1Amount &&
                            CurrencyAmount.fromRawAmount(
                              token1,
                              coinInfo?.myToken1Amount.toString()
                            ).toSignificant()) ||
                          '0'}{' '}
                      {token1 && token1.symbol} /{' '}
                      {coinInfo?.finalAllocation?.myUnSwappedAmount1 && token1 && coinInfo.myToken1Claimed
                        ? '0'
                        : (token1 &&
                            coinInfo?.finalAllocation?.myUnSwappedAmount1 &&
                            CurrencyAmount.fromRawAmount(
                              token1,
                              coinInfo.finalAllocation?.myUnSwappedAmount1.toString()
                            ).toSignificant()) ||
                          '0'}{' '}
                      {token1 && token1.symbol}
                    </BoldTextStyle>

                    <StakeButton
                      style={{ width: 150 }}
                      disabled={coinInfo?.myToken1Claimed || !coinInfo?.finalAllocation?.myUnSwappedAmount1.gt(0)}
                      onClick={() => claimToken1()}
                    >
                      {coinInfo?.myToken1Claimed ? 'Claimed' : 'Claim'}
                    </StakeButton>
                  </Stack>
                  {!account && <StakeButton onClick={showLoginModal}>Connect Wallet</StakeButton>}
                  {account && chainId !== ChainId.MAINNET && (
                    <StakeButton onClick={_switchNetwork}>Switch network</StakeButton>
                  )}
                </Stack>
              </Stack>
            </Stack>
          </Box>
        )}
    </Stack>
  )
}
