import { LinearProgress, SxProps } from '@mui/material'
import { PoolStatus } from 'api/pool/type'
import { AuctionProgressPrimaryColor } from 'constants/auction/color'

export interface PoolProgressProps {
  value?: number
  sx?: SxProps
  poolStatus?: PoolStatus
}

const ProgressColorStyles: Record<
  PoolStatus,
  Record<'&.MuiLinearProgress-root', { bgcolor: string; '.MuiLinearProgress-bar': { bgcolor: string } }>
> = {
  [PoolStatus.Upcoming]: {
    '&.MuiLinearProgress-root': {
      bgcolor: '#E6E6E6',
      '.MuiLinearProgress-bar': { bgcolor: AuctionProgressPrimaryColor[PoolStatus.Upcoming] }
    }
  },
  [PoolStatus.Live]: {
    '&.MuiLinearProgress-root': {
      bgcolor: '#D5EEDC',
      '.MuiLinearProgress-bar': { bgcolor: AuctionProgressPrimaryColor[PoolStatus.Live] }
    }
  },
  [PoolStatus.Cancelled]: {
    '&.MuiLinearProgress-root': {
      bgcolor: '#D6DFF6',
      '.MuiLinearProgress-bar': { bgcolor: AuctionProgressPrimaryColor[PoolStatus.Cancelled] }
    }
  },
  [PoolStatus.Finish]: {
    '&.MuiLinearProgress-root': {
      bgcolor: '#D6DFF6',
      '.MuiLinearProgress-bar': { bgcolor: AuctionProgressPrimaryColor[PoolStatus.Cancelled] }
    }
  },
  [PoolStatus.Closed]: {
    '&.MuiLinearProgress-root': {
      bgcolor: '#D6DFF6',
      '.MuiLinearProgress-bar': { bgcolor: AuctionProgressPrimaryColor[PoolStatus.Closed] }
    }
  }
}

const PoolProgress = ({ value, sx, poolStatus }: PoolProgressProps) => {
  return (
    <LinearProgress
      variant="determinate"
      sx={{
        ...sx,
        borderRadius: 4,
        height: 6,
        ...(poolStatus ? ProgressColorStyles?.[poolStatus] || ProgressColorStyles[PoolStatus.Upcoming] : '')
      }}
      value={value}
    />
  )
}

export default PoolProgress
