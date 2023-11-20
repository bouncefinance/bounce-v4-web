import { Box, Button, Stack, Typography, Stepper, StepLabel, StepContent, Step, styled } from '@mui/material'
import { useState } from 'react'
import { ReactComponent as AddSvg } from 'assets/imgs/staked/add.svg'
import { ReactComponent as StakeTokensSvg } from 'assets/imgs/staked/tokensIcon.svg'
import { ReactComponent as BnBTokenSvg } from 'assets/imgs/staked/bnbIcon.svg'
import { ReactComponent as UserSvg } from 'assets/imgs/staked/userIcon.svg'
import { ReactComponent as CheckSvg } from 'assets/imgs/staked/check_green.svg'
import { ReactComponent as WonderSvg } from 'assets/imgs/staked/wonderIcon_black.svg'

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

export function Steps() {
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
      <VerticalLinearStepper />
    </Stack>
  )
}

function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const steps = [
    {
      label: 'Subscription Period',
      content: <Step1 handleNext={handleNext} />
    },
    {
      label: 'Final Token Distribution',
      content: <Step2 handleNext={handleNext} />
    }
  ]

  return (
    <Box>
      <StepperStyle activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabelStyle optional={<Typography variant="caption">2022-02-17 11:00</Typography>}>
              {step.label}
            </StepLabelStyle>
            <StepContentStyle>
              {index !== 0 && (
                <Button onClick={handleBack} variant="contained">
                  Back
                </Button>
              )}
              {step?.content}
            </StepContentStyle>
          </Step>
        ))}
      </StepperStyle>
    </Box>
  )
}

function Step1({ handleNext }: { handleNext: () => void }) {
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
          Time left until staked start:
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
          <b>0</b> Days <b>1</b> Hours <b>17</b> Mins
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
                <CardLabelStyle>0.00 BNB</CardLabelStyle>
              </Stack>
              <Stack spacing={8}>
                <CardContentStyle>Participants</CardContentStyle>
                <CardLabelStyle>1</CardLabelStyle>
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
              <CardLabelStyle>0.00 BNB</CardLabelStyle>
            </Stack>
            <Stack spacing={8}>
              <CardContentStyle>My Pool Share</CardContentStyle>
              <CardLabelStyle>0%</CardLabelStyle>
            </Stack>
          </Stack>
          <StakeButton onClick={handleNext}>
            Stake <AddSvg />
          </StakeButton>
        </Stack>
      </Box>
    </Stack>
  )
}

function Step2({ handleNext }: { handleNext: () => void }) {
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
          <StakeButton onClick={handleNext}>
            Stake <AddSvg />
          </StakeButton>
        </Stack>
      </Box>
    </Stack>
  )
}
