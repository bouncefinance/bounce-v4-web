import { Box, Button, Stack, Typography, Stepper, StepLabel, StepContent, Step, styled } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import { ReactComponent as AddSvg } from 'assets/imgs/staked/add.svg'
import { ReactComponent as StakeTokensSvg } from 'assets/imgs/staked/tokensIcon.svg'
import { ReactComponent as BnBTokenSvg } from 'assets/imgs/staked/bnbIcon.svg'
import { ReactComponent as UserSvg } from 'assets/imgs/staked/userIcon.svg'
import { ReactComponent as CheckSvg } from 'assets/imgs/staked/check_green.svg'
import { ReactComponent as WonderSvg } from 'assets/imgs/staked/wonderIcon_black.svg'
import { CoinResultType } from 'bounceHooks/launchpad/useLaunchpadCoinInfo'
import dayjs from 'dayjs'
import { useCountDown } from 'ahooks'
import { useActiveWeb3React } from 'hooks'
import { useShowLoginModal } from 'state/users/hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import useTokenList from 'bounceHooks/auction/useTokenList'
import { Currency } from 'constants/token'
import { ChainId } from 'constants/chain'
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

export function Steps({ coinInfo }: { coinInfo: CoinResultType | undefined }) {
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
      <VerticalLinearStepper coinInfo={coinInfo} />
    </Stack>
  )
}
enum TStep {
  'COMING_SOON' = -1,
  'SUBSCRIPTION_PERIOD',
  'FINAL_TOKEN_DISTRIBUTION'
}
const nowDate = () => new Date().getTime()
function VerticalLinearStepper({ coinInfo }: { coinInfo: CoinResultType | undefined }) {
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
  const [activeStep] = useState(curStatus === TStep.COMING_SOON ? TStep.SUBSCRIPTION_PERIOD : curStatus)

  const steps = [
    {
      label: 'Subscription Period',
      content: <Step1 status={curStatus} coinInfo={coinInfo} />
    },
    {
      label: 'Final Token Distribution',
      content: <Step2 />
    }
  ]
  const renderTime = useCallback(
    (index: number) => {
      if (!coinInfo || !coinInfo.poolInfo) return '--'
      if (index === 0) {
        return dayjs(coinInfo.poolInfo.openAt * 1000).format('YYYY-MM-DD HH:MM')
      }
      return dayjs(coinInfo.poolInfo.closeAt * 1000).format('YYYY-MM-DD HH:MM')
    },
    [coinInfo]
  )
  return (
    <Box>
      <StepperStyle activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabelStyle optional={<Typography variant="caption">{renderTime(index)}</Typography>}>
              {step.label}
            </StepLabelStyle>
            <StepContentStyle>{step?.content}</StepContentStyle>
          </Step>
        ))}
      </StepperStyle>
    </Box>
  )
}

function Step1({ status, coinInfo }: { status: TStep; coinInfo: CoinResultType | undefined }) {
  const { account, chainId } = useActiveWeb3React()

  const tokenList = useTokenList(chainId, 1)

  const token1Currency = useMemo(() => {
    if (!tokenList || !coinInfo || !coinInfo.poolInfo) return undefined
    const token1 = tokenList.tokenList.find(
      i => i.address.toLocaleLowerCase() === coinInfo.poolInfo?.token1.toLocaleLowerCase()
    )
    if (!token1) return undefined
    const currency = new Currency(token1.chainId as ChainId, token1.address, token1.decimals, token1.symbol)
    return currency
  }, [coinInfo, tokenList])

  const token1Balance = useCurrencyBalance(account, token1Currency, chainId)

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
  const { days, hours, minutes } = formattedRes
  const renderCountDown = useMemo(() => {
    if (!coinInfo || !coinInfo.poolInfo) {
      return (
        <>
          <b>--</b> Days <b>--</b> Hours <b>--</b> Mins
        </>
      )
    }
    return (
      <>
        <b>{days}</b> Days <b>{hours}</b> Hours <b>{minutes}</b> Mins
      </>
    )
  }, [coinInfo, days, hours, minutes])

  const showLoginModal = useShowLoginModal()

  const isBalanceInsufficient = useMemo(() => {
    if (!token1Balance) return true
    return !token1Balance.greaterThan('0')
  }, [token1Balance])

  const actionBtn = useMemo(() => {
    if (!account) {
      return <StakeButton onClick={showLoginModal}>Connect Wallet</StakeButton>
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
        <StakeButton>
          Stake <AddSvg />
        </StakeButton>
      )
    }
    return (
      <StakeButton disabled>
        Stake <AddSvg />
      </StakeButton>
    )
  }, [account, isBalanceInsufficient, showLoginModal, status])

  console.log('coinInfo', coinInfo)
  return (
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
              <StakeTokensSvg />
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
                  Hiley Golbel Coin <b>x</b> BNB pool
                </CardLabelStyle>
                <CardContentStyle>
                  Stake BNB tokens to earn Commitable amount for participating in Hiley Golbel Coin launchpad
                </CardContentStyle>
              </Stack>
            </Box>
            <Stack spacing={{ xs: 20, md: 30 }}>
              <Stack spacing={8}>
                <CardContentStyle>Total Stake</CardContentStyle>
                <CardLabelStyle>
                  {coinInfo?.token1Amount ? coinInfo?.token1Amount.toString() : '--'} {token1Currency?.symbol}
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
              <BoldTextStyle>0.00 GMT</BoldTextStyle>
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
                {coinInfo?.myToken1Amount?.toString() || '--'} {token1Currency?.symbol}
              </CardLabelStyle>
            </Stack>
            <Stack spacing={8}>
              <CardContentStyle>My Pool Share</CardContentStyle>
              <CardLabelStyle>
                {coinInfo?.myToken1Amount && coinInfo?.token1Amount && Number(coinInfo?.token1Amount?.toString()) > 0
                  ? coinInfo.myToken1Amount.div(coinInfo.token1Amount).toString()
                  : '0'}
                %
              </CardLabelStyle>
            </Stack>
          </Stack>
          {actionBtn}
        </Stack>
      </Box>
    </Stack>
  )
}

function Step2() {
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
        The allocation calculation is complete. We will deduct the corresponding BNB from your account based on your
        final GMT allocation, which will be transferred to your spot account along with your remaining BNB.
      </Typography>

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
                <BnBTokenSvg />
                <CardContentTitleStyle>Total Committed</CardContentTitleStyle>
              </Box>
              <CardContentBoldTextStyle>8,742,450.4131 BNB</CardContentBoldTextStyle>
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
              <CardContentBoldTextStyle>592.6442</CardContentBoldTextStyle>
            </Stack>
          </Stack>
        </Box>

        <Stack
          spacing={{ xs: 30, md: 40 }}
          sx={{
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
                <CardContentTitleStyle>Deducted</CardContentTitleStyle>
              </Box>

              <BoldTextStyle>0.01489908 BNB</BoldTextStyle>
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
                <CardContentTitleStyle>Your final allocation</CardContentTitleStyle>
              </Box>
              <BoldTextStyle>592.6442 GMT</BoldTextStyle>
            </Stack>
          </Stack>
          <StakeButton>
            Stake <AddSvg />
          </StakeButton>
        </Stack>
      </Box>
    </Stack>
  )
}
