import { Box, Stack, Step, StepLabel, Stepper, Typography, styled } from '@mui/material'
import { FixedSwapPoolProp } from 'api/pool/type'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'

const StepperStyle = styled(Stepper)(() => ({
  '& .MuiStep-root:last-child': {
    display: 'none !important'
  },
  '&.MuiStepper-root': {
    width: '100% !important'
  },
  '.Mui-completed': {
    color: '#2663FF'
  },
  '.Mui-active': {
    color: '#2663FF',
    '& text': {
      fill: '#fff'
    }
  },
  '.MuiStepConnector-line': {
    borderTopWidth: '4px',
    borderColor: '#2663FF'
  }
}))

const PoolStepper = ({ poolInfo }: { poolInfo: FixedSwapPoolProp }): JSX.Element => {
  const [activeStep, setActiveStep] = useState(0)
  const nowTime = () => new Date().getTime()
  const steps = Array.from({ length: 4 }).map(() => ({ label: '', time: '' }))
  const textList = [
    {
      label: 'Participation',
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
  useEffect(() => {
    if (nowTime() > poolInfo.openAt * 1000 && nowTime() < poolInfo.closeAt * 1000) {
      setActiveStep(1)
    }
    if (nowTime() > poolInfo.closeAt * 1000 && nowTime() < poolInfo.claimAt * 1000) {
      setActiveStep(2)
    }
    if (nowTime() > poolInfo.claimAt * 1000) {
      setActiveStep(3)
    }
  }, [poolInfo.claimAt, poolInfo.closeAt, poolInfo.openAt])
  return (
    <Box
      sx={{
        borderRadius: 20,
        padding: { xs: 20, md: 30 },
        bgcolor: '#fff',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 16
      }}
    >
      <Stack
        direction={'row'}
        sx={{
          display: 'grid',
          gridTemplateColumns: '33% 33% 34%'
        }}
      >
        {textList.map(item => (
          <Box key={item.label} display={'flex'} justifyContent={'flex-start'} flexDirection={'column'} pl={16}>
            <Typography color={'#171717'}>{item.label}</Typography>
            <Typography color={'#959595'}>{dayjs(item.time).format('YYYY-MM-DD HH:mm:ss')}</Typography>
          </Box>
        ))}
      </Stack>
      <StepperStyle activeStep={activeStep}>
        {steps.map(item => (
          <Step key={item.label}>
            <StepLabel></StepLabel>
          </Step>
        ))}
      </StepperStyle>
    </Box>
  )
}

export default PoolStepper
