import { Box, styled, Typography } from '@mui/material'
import Stepper from '@mui/material/Stepper'
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector'
import { StepIconProps } from '@mui/material/StepIcon'
import Step from '@mui/material/Step'
import StepLabel from '@mui/material/StepLabel'
import { DutchAuctionPoolProp } from 'api/pool/type'
import Check from '@mui/icons-material/Check'
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)'
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4'
    }
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: '#784af4'
    }
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
    borderTopWidth: 3,
    borderRadius: 1
  }
}))
const QontoStepIconRoot = styled('div')<{ ownerState: { active?: boolean } }>(({ theme, ownerState }) => ({
  color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
  display: 'flex',
  height: 22,
  alignItems: 'center',
  ...(ownerState.active && {
    color: '#784af4'
  }),
  '& .QontoStepIcon-completedIcon': {
    color: '#784af4',
    zIndex: 1,
    fontSize: 18
  },
  '& .QontoStepIcon-circle': {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: 'currentColor'
  }
}))
function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? <Check className="QontoStepIcon-completedIcon" /> : <div className="QontoStepIcon-circle" />}
    </QontoStepIconRoot>
  )
}
const StepperCom = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
  const steps = poolInfo.releaseData || []
  //   const steps = [1, 2, 3]
  return (
    <Box>
      {poolInfo.name}
      <Stepper alternativeLabel activeStep={1} connector={<QontoConnector />}>
        {steps.map((item: any, index: number) => (
          <Step key={index}>
            <StepLabel StepIconComponent={QontoStepIcon}>
              <>
                <Typography>
                  Linear unlocking of tokens begins after{' '}
                  {item?.startAt ? new Date(item?.startAt * 1000).toLocaleString() : '-'}
                </Typography>
                <Typography>
                  Linear unlocking of tokens ends after{' '}
                  {item?.endAt ? new Date(item?.endAt * 1000).toLocaleString() : '-'}
                </Typography>
              </>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  )
}
export default StepperCom
