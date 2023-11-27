import { Box, Button, Stack, Typography, Stepper, StepLabel, StepContent, Step, styled } from '@mui/material'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { ReactComponent as AddSvg } from 'assets/imgs/staked/add.svg'
// import { ReactComponent as StakeTokensSvg } from 'assets/imgs/staked/tokensIcon.svg'
// import { ReactComponent as BnBTokenSvg } from 'assets/imgs/staked/bnbIcon.svg'
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
import CoinInputDialog from 'bounceComponents/common/CoinInputDialog'
import { useApproveCallback } from 'hooks/useApproveCallback'
import { LAUNCHPAD_COIN_CONTRACT_ADDRESSES } from 'constants/index'
import { ApprovalState } from 'hooks/useTokenTimelock'
import { Contract } from '@ethersproject/contracts'
import { useToken } from 'state/wallet/hooks'
import { hideDialogConfirmation, showRequestApprovalDialog, showWaitingTxDialog } from 'utils/auction'
import { show } from '@ebay/nice-modal-react'

import { ReactComponent as FailSVG } from 'assets/svg/dark_fail.svg'
import BigNumber from 'bignumber.js'
import DialogTips, { DialogTipsWhiteTheme } from 'bounceComponents/common/DialogTips/DialogDarkTips'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
const StepperStyle = styled(Stepper)(({ theme }) => ({
  '.MuiStepConnector-root': {
    marginLeft: '16px'
  },
  '.MuiStepLabel-root': {
    padding: 0
  },
  '.MuiStepLabel-iconContainer': {
    padding: 0,
    svg: {
      width: 32,
      height: 32,
      color: '#D7D6D9',
      '.MuiStepIcon-text': {
        fill: '#fff'
      }
    }
  },
  '.Mui-completed': {
    svg: {
      path: {
        fill: '#000'
      }
    }
  },
  '.Mui-active': {
    svg: {
      color: '#E1F25C',
      '.MuiStepIcon-text': {
        fill: '#121212'
      }
    }
  },
  [theme.breakpoints.down('md')]: {
    '.MuiStepLabel-iconContainer': {
      svg: {
        width: 24,
        height: 24
      }
    }
  }
}))

const StepLabelStyle = styled(StepLabel)(({ theme }) => ({
  '.MuiStepLabel-labelContainer': {
    display: 'grid',
    gap: 4,
    paddingLeft: '24px'
  },
  '.MuiStepLabel-label': {
    color: '#121212 !important',
    fontSize: '20px',
    fontWeight: '600 !important',
    lineHeight: '140%',
    letterSpacing: '-0.4px'
  },

  '.MuiTypography-root': {
    fontSize: 14,
    fontWeight: 600,
    color: '#959595',
    lineHeight: '21px'
  },
  [theme.breakpoints.down('md')]: {
    '.MuiStepLabel-labelContainer': {
      paddingLeft: '8px'
    },
    '.MuiStepLabel-label': {
      fontSize: '18px',
      letterSpacing: '0'
    },
    '.MuiTypography-root': {
      fontSize: 13
    }
  }
}))

const StepContentStyle = styled(StepContent)(({ theme }) => ({
  paddingLeft: 40,
  marginLeft: '16px',
  [theme.breakpoints.down('md')]: {
    paddingLeft: 16
  }
}))

const CardLabelStyle = styled(Typography)(({ theme }) => ({
  color: '#000',
  fontSize: '20px',
  fontWeight: '600',
  letterSpacing: '-0.4px',
  [theme.breakpoints.down('md')]: {
    fontSize: '18px',
    letterSpacing: '0'
  }
}))

const CardContentStyle = styled(Typography)(() => ({
  color: '#959595',
  fontFamily: 'Inter',
  fontSize: '13px',
  fontWeight: '400'
}))

const StakeButton = styled(Button)(({ theme }) => ({
  height: 52,
  width: 424,
  padding: '20px 0',
  display: 'flex',
  gap: 10,
  borderRadius: '8px',
  background: '#121212',
  color: '#fff',
  svg: {
    path: { color: '#fff' }
  },
  ':hover': {
    background: '#000',
    opacity: 0.6
  },
  [theme.breakpoints.down('md')]: {
    width: '100%',
    height: '42px'
  }
}))
const CountdownBtnStyle = styled(StakeButton)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
  gap: 0;
`
const BoldTextStyle = styled(Typography)(({ theme }) => ({
  color: '#121212',
  fontSize: '36px',
  fontWeight: '600',
  letterSpacing: '-0.72px',
  lineHeight: '30px',
  [theme.breakpoints.down('md')]: {
    fontSize: '28px',
    letterSpacing: '0',
    lineHeight: 'normal',
    width: 'auto'
  }
}))

const CardContentTitleStyle = styled(Typography)(() => ({
  color: '#959595',
  fontSize: '14px',
  fontWeight: '600',
  lineHeight: '21px',
  letterSpacing: '-0.28px'
}))

const CardContentBoldTextStyle = styled(Typography)(({ theme }) => ({
  color: '#F6F6F3',
  fontSize: '36px',
  fontWeight: '600',
  letterSpacing: '-0.72px',
  lineHeight: '26px',
  [theme.breakpoints.down('md')]: {
    fontSize: '28px',
    letterSpacing: '0',
    lineHeight: 'normal'
  }
}))

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
        <Button
          sx={{
            padding: { xs: '8px 30px', md: '12px 24px' },
            color: '#171717',
            fontSize: { xs: '12px', md: '14px' },
            fontWeight: '400',
            borderRadius: '100px',
            border: ' 1px solid #20201E',
            height: 34,
            whiteSpace: { xs: 'nowrap' }
          }}
        >
          My private launchpad
        </Button>
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
    // if (!account) {
    return ChainId.SEPOLIA
    // }
    // return chainId
  }, [])
  const [amount, setAmount] = useState('')
  const [openDialog, setOpenDialog] = useState(false)
  const _token0 = useToken(coinInfo?.poolInfo?.token0 || '', _chainId)
  const token0 = useMemo(() => {
    if (!_token0) return undefined
    return new Currency(_token0.chainId, _token0.address, _token0.decimals, 'BSSB', 'BSSB')
  }, [_token0])
  const _token1Currency = useToken(coinInfo?.poolInfo?.token1 || '', _chainId) || undefined
  const token1Currency = useMemo(() => {
    if (!_token1Currency) return undefined
    return new Currency(
      _token1Currency.chainId,
      _token1Currency.address,
      _token1Currency.decimals,
      'Auction',
      'Auction'
    )
  }, [_token1Currency])
  const token1CurrencyAmount = useMemo(() => {
    if (!token1Currency) return undefined
    return CurrencyAmount.fromAmount(token1Currency, amount)
  }, [amount, token1Currency])
  const [approvalState, approve] = useApproveCallback(token1CurrencyAmount, LAUNCHPAD_COIN_CONTRACT_ADDRESSES[_chainId])
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

  // 倒计时比实际的要慢一点
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
    switchNetwork(ChainId.SEPOLIA)
  }
  const actionBtn = useMemo(() => {
    if (!account) {
      return <StakeButton onClick={showLoginModal}>Connect Wallet</StakeButton>
    }
    if (chainId !== ChainId.SEPOLIA) {
      return <StakeButton onClick={() => _switchNetwork()}>Switch network</StakeButton>
    }
    if (isBalanceInsufficient) {
      return <StakeButton disabled>Insufficient balance</StakeButton>
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
            cancelBtn: 'Save',
            title: 'Success! ',
            content: `You have successfully stake  ${token1CurrencyAmount.toSignificant()} ${token1Currency?.symbol}`,
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
            {status === TStep.COMING_SOON ? 'Time left until staked start:' : 'Time left until staked end:'}
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
                {/* <StakeTokensSvg /> */}
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
                    BitStable <b>x</b> Auction Pool
                  </CardLabelStyle>
                  <CardContentStyle>
                    Stake Auction to earn Committable amount for participating in BitStable Coin launchpad
                  </CardContentStyle>
                </Stack>
              </Box>
              <Stack spacing={{ xs: 20, md: 30 }}>
                <Stack spacing={8}>
                  <CardContentStyle>Total Stake</CardContentStyle>
                  <CardLabelStyle>
                    {coinInfo?.token1Amount && token1Currency
                      ? CurrencyAmount.fromRawAmount(token1Currency, coinInfo?.token1Amount.toString())?.toSignificant()
                      : '--'}{' '}
                    {token1Currency?.symbol}
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
                  Committable amount earned
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

      <CoinInputDialog
        token1={token1CurrencyAmount}
        id={'1'}
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
const NotInvolvedContainer = styled(Box)`
  display: flex;
  width: 420px;
  padding: 30px;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  flex-shrink: 0;
  align-self: stretch;
  background: #fff;
`
const NotInvolvedTitle = styled(Typography)`
  color: #121212;
  text-align: center;
  font-family: Public Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%; /* 24px */
  letter-spacing: -0.32px;
`
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
      return 11155111
    }
    return chainId
  }, [account, chainId])
  const _token0 = useToken(coinInfo?.poolInfo?.token0 || '', _chainId)
  const token0 = useMemo(() => {
    if (!_token0) return undefined
    return new Currency(_token0.chainId, _token0.address, _token0.decimals, 'BSSB', 'BSSB')
  }, [_token0])
  const _token1 = useToken(coinInfo?.poolInfo?.token1 || '', _chainId)
  const token1 = useMemo(() => {
    if (!_token1) return undefined
    return new Currency(_token1.chainId, _token1.address, _token1.decimals, 'Auction', 'Auction')
  }, [_token1])
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
            againBtn: 'Save',
            title: 'Success!',
            content: `You have successfully claim ${
              token0 &&
              coinInfo?.finalAllocation?.mySwappedAmount0 &&
              coinInfo.claimedToken0 &&
              CurrencyAmount.fromRawAmount(token0, coinInfo?.finalAllocation?.mySwappedAmount0?.toString())
                .subtract(CurrencyAmount.fromRawAmount(token0, coinInfo.claimedToken0.toString()))
                .toSignificant()
            } ${token1?.symbol}`,
            PaperProps: {
              sx: DialogTipsWhiteTheme
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
        onAgain: claimToken0,
        PaperProps: {
          sx: DialogTipsWhiteTheme
        }
      })
    }
  }, [coinInfo?.claimedToken0, coinInfo?.finalAllocation?.mySwappedAmount0, contract, poolId, token0, token1?.symbol])
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
            cancelBtn: 'Save',
            title: 'Success! ',
            content: `You have successfully claim ${
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
      console.error(err)
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
        The allocation calculation is complete. We will deduct the corresponding $Auction from your account based on
        your final $BSSB allocation, which will be transferred to your spot account along with your remaining $Auction.
      </Typography>
      {account &&
        coinInfo?.myToken1Amount?.eq(0) &&
        status === TStep.FINAL_TOKEN_DISTRIBUTION &&
        account !== coinInfo.poolInfo?.creator && (
          <NotInvolvedContainer>
            <FailSVG />
            <NotInvolvedTitle>You did not stake any BNB for this session.</NotInvolvedTitle>
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
                    {/* <BnBTokenSvg /> */}
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
                    <CardContentTitleStyle>Your Final Allocation/Available</CardContentTitleStyle>
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
                        Claim
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
                    <CardContentTitleStyle>Total Staked / Exceeded token</CardContentTitleStyle>
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
                      Claim
                    </StakeButton>
                  </Stack>
                  {!account && <StakeButton onClick={showLoginModal}>Connect Wallet</StakeButton>}
                  {account && chainId !== ChainId.SEPOLIA && (
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
