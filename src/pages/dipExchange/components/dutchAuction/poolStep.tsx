import { Box, Typography, styled } from '@mui/material'
import Stepper from '@mui/material/Stepper'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import StepContent from '@mui/material/StepContent'
import { DutchAuctionPoolProp, PoolStatus } from 'api/pool/type'
import { useState, useEffect } from 'react'
import moment from 'moment'
import FinalTokenclaim from './finalTokenclaim'
import SubscriptionPeriod from './subscriptionPeriod'
import BidHistory from './bidHistory'
const StepCom = styled(Stepper)(() => ({
  '.MuiStepLabel-root': {
    padding: 0
  },
  '.MuiStepContent-root': {
    borderLeft: '1px solid #D7D6D9'
  },
  '.MuiStepContent-last': {
    borderLeft: 'none'
  },
  'svg.Mui-completed': {
    path: {
      color: '#4F5FFC'
    },
    text: {
      color: '#121212'
    }
  },
  'svg.MuiSvgIcon-root': {
    circle: {
      color: '#fff'
    },
    text: {
      color: '#121212'
    }
  },
  'svg.Mui-active': {
    circle: {
      color: '#4F5FFC'
    },
    text: {
      color: '#121212'
    }
  }
}))
const PoolStep = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
  const [activeStep, setActiveStep] = useState<number>(0)
  useEffect(() => {
    if (poolInfo.status === PoolStatus.Upcoming || poolInfo.status === PoolStatus.Live) {
      setActiveStep(0)
    } else {
      setActiveStep(1)
    }
    return () => {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const steps = [
    {
      label: 'Subscription Period',
      description: moment(poolInfo.openAt * 1000).format('YYYY-MM-DD HH:mm:ss')
    },
    {
      label: 'Final Token Claim',
      description: moment(poolInfo.claimAt * 1000).format('YYYY-MM-DD HH:mm:ss')
    }
  ]
  return (
    <Box>
      <StepCom activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={index}>
            <StepLabel>
              <Typography
                sx={{
                  color: '#D7D6D9',
                  fontFamily: `'Public Sans'`,
                  fontSize: 14,
                  fontWeight: 600
                }}
                mb={'4px'}
              >
                {step.label}
              </Typography>
            </StepLabel>
            <StepContent>
              <Typography
                sx={{
                  color: '#959595',
                  fontFamily: `'Inter'`,
                  fontSize: 13
                }}
                mb={'20px'}
              >
                {step.description}
              </Typography>
              {activeStep === 0 && <SubscriptionPeriod poolInfo={poolInfo} />}
              {activeStep === 1 && <FinalTokenclaim poolInfo={poolInfo} />}
              <BidHistory poolInfo={poolInfo} />
            </StepContent>
          </Step>
        ))}
      </StepCom>
    </Box>
  )
}
export default PoolStep
