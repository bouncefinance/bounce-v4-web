import { Box, Stack, Step, StepLabel, Stepper, Typography, styled } from '@mui/material'
// import { FixedSwapPoolProp } from 'api/pool/type'
import dayjs from 'dayjs'
import { useState } from 'react'
import StepCheckIcon from 'assets/imgs/lpToken/step-check-icon.svg'
import { ReactComponent as StepDefaultIcon } from 'assets/imgs/lpToken/step-default.svg'
import { useRequest } from 'ahooks'
import useBreakpoint from 'hooks/useBreakpoint'
const StepperStyle = styled(Stepper)(({ theme }) => ({
  '& .MuiStep-root': { paddingLeft: 0, paddingRight: 0 },
  '& .MuiStep-root:last-child': {
    display: 'none !important'
  },
  '& .MuiStepLabel-iconContainer': {
    paddingRight: 0
  },
  '&.MuiStepper-root': {
    width: '100% !important'
  },
  '.Mui-completed': {
    '& .MuiStepLabel-iconContainer': {
      width: 20,
      height: 20,
      background: `url(${StepCheckIcon}) no-repeat`
    },
    color: '#2663FF !important',
    '& svg': {
      display: 'none'
    }
  },
  '.Mui-active': {
    color: '#2663FF !important',
    '& text': {
      fill: '#fff'
    }
  },
  '.MuiStepConnector-line': {
    borderTopWidth: '4px',
    borderColor: 'rgba(0,0,0,0.38)'
  },
  '.MuiStepConnector-root.Mui-active .MuiStepConnector-line,.MuiStepConnector-root.Mui-completed .MuiStepConnector-line ':
    {
      borderColor: '#E1F25C'
    },
  [theme.breakpoints.down('sm')]: {
    '&.MuiStepper-root': {
      width: 'auto !important'
    },
    '& .MuiStepConnector-root': {
      marginLeft: 9
    },
    '& .MuiStepConnector-line': {
      height: 50
    },
    '& .MuiStepLabel-root': {
      padding: 0
    }
  }
}))

const PoolStepper = ({ poolInfo }: { poolInfo: any }): JSX.Element => {
  const [activeStep, setActiveStep] = useState(0)
  const isSm = useBreakpoint('sm')
  const nowTime = () => new Date().getTime()
  const steps = Array.from({ length: 4 }).map(() => ({ label: '', time: '' }))
  const textList = [
    {
      label: 'Participation Round',
      time: poolInfo.openAt * 1000
    },
    {
      label: 'Lottery Drawing',
      time: poolInfo.closeAt * 1000
    },
    {
      label: 'Announcement Of Winners',
      time: poolInfo.claimAt * 1000
    }
  ]
  useRequest(
    async () => {
      if (nowTime() > poolInfo.openAt * 1000 && nowTime() < poolInfo.closeAt * 1000) {
        setActiveStep(1)
      }
      if (nowTime() > poolInfo.closeAt * 1000 && nowTime() < poolInfo.claimAt * 1000) {
        setActiveStep(2)
      }
      if (nowTime() > poolInfo.claimAt * 1000) {
        setActiveStep(3)
      }
      return null
    },
    {
      pollingInterval: 2000,
      refreshDeps: [poolInfo.claimAt, poolInfo.closeAt, poolInfo.openAt]
    }
  )
  return (
    <Box sx={{ width: '100%', background: '#F6F6F3' }}>
      <Box
        sx={{
          borderRadius: 20,
          width: '100%',
          maxWidth: 1440,
          margin: '0 auto',
          display: 'flex',
          flexDirection: isSm ? 'row-reverse' : 'column',
          justifyContent: isSm ? 'flex-end' : 'unset',
          gap: 16,
          mt: isSm ? 32 : 40,
          px: isSm ? 16 : 72
        }}
      >
        <Stack
          direction={'row'}
          sx={{
            display: 'grid',
            gridTemplateColumns: isSm ? '100%' : '33% 33% 34%'
          }}
        >
          {textList.map(item => (
            <Box
              key={item.label}
              display={'flex'}
              justifyContent={'flex-start'}
              flexDirection={'column'}
              pl={isSm ? 0 : 16}
            >
              <Typography color={'#959595'}>{item.label}</Typography>
              <Typography color={'#959595'}>{dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')}</Typography>
            </Box>
          ))}
        </Stack>
        <StepperStyle activeStep={activeStep} orientation={isSm ? 'vertical' : 'horizontal'}>
          {steps.map(item => (
            <Step key={item.label}>
              <StepLabel icon={<StepDefaultIcon />}></StepLabel>
            </Step>
          ))}
        </StepperStyle>
      </Box>
    </Box>
  )
}

export default PoolStepper
