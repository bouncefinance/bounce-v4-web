import { Box, Typography } from '@mui/material'
import React from 'react'
import { useCountDown } from 'ahooks'
import { PoolStatus } from 'api/pool/type'
import { ReactComponent as WarningIcon } from 'assets/imgs/auction/warning-icon.svg'

export interface PoolStatusBoxProps {
  status: PoolStatus
  openTime: number
  closeTime: number
  hideClaim?: true
  claimAt: number
  onEnd?: () => void
  style?: React.CSSProperties
}

export const PoolStatusBox = ({
  status,
  openTime,
  closeTime,
  claimAt,
  onEnd,
  hideClaim,
  style
}: PoolStatusBoxProps): JSX.Element => {
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate:
      status === PoolStatus.Upcoming
        ? openTime * 1000
        : status === PoolStatus.Live || status == PoolStatus.Finish
        ? closeTime * 1000
        : status === PoolStatus.Closed
        ? claimAt * 1000
        : undefined,
    onEnd
  })

  switch (status) {
    case PoolStatus.Upcoming:
      return (
        <Box
          sx={{
            display: 'inline-block',
            px: 12,
            py: 4,
            bgcolor: '#D7D6D9',
            borderRadius: 20,
            color: '#626262',
            ...style
          }}
        >
          <Typography variant="body1">Upcoming</Typography>
        </Box>
      )
    case PoolStatus.Finish:
      return (
        <Box
          sx={{
            display: 'inline-block',
            px: 12,
            py: 4,
            bgcolor: '#D6DFF6',
            borderRadius: 20,
            ...style
          }}
        >
          <Typography variant="body1" sx={{ color: '#2B51DA' }}>
            Finished
          </Typography>
        </Box>
      )
    case PoolStatus.Live:
      return (
        <Box style={{ display: 'inline-block', padding: '4px 8px', background: '#D4F5DE', borderRadius: 20, ...style }}>
          <Typography
            variant="body1"
            color="#259C4A"
            component="span"
            style={{
              marginRight: '8px'
            }}
          >
            Live
          </Typography>
          {countdown > 0 && (
            <Typography variant="body1" color="#259C4A" component="span">
              &nbsp;{days}d : {hours}h : {minutes}m : {seconds}s
            </Typography>
          )}
        </Box>
      )

    case PoolStatus.Closed:
      return (
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'flex-start'
          }}
        >
          <Box
            sx={{
              display: 'inline-block',
              px: 12,
              py: 4,
              bgcolor: '#D6DFF6',
              borderRadius: 20,
              marginRight: '8px',
              ...style
            }}
          >
            <Typography variant="body1" color="#2663FF">
              Closed
            </Typography>
          </Box>
          <span
            style={{
              display: hideClaim ? 'none' : 'inline-block',
              padding: '4px 8px',
              background: '#000000',
              borderRadius: 20,
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              ...style
            }}
          >
            {countdown > 0 && (
              <>
                <WarningIcon style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                <Typography variant="body1" color="#fff" component="span">
                  {days}d : {hours}h : {minutes}m : {seconds}s
                </Typography>
              </>
            )}
            {countdown <= 0 && (
              <>
                <WarningIcon style={{ marginRight: '4px', verticalAlign: 'middle' }} />
                <Typography variant="body1" color="#fff" component="span">
                  Need to claim token
                </Typography>
              </>
            )}
          </span>
        </Box>
      )
    case PoolStatus.Cancelled:
      return (
        <Box
          sx={{
            display: 'inline-block',
            px: 12,
            py: 4,
            bgcolor: '#D6DFF6',
            borderRadius: 20,
            marginRight: '16px',
            ...style
          }}
        >
          <Typography variant="body1" color="#2663FF">
            Closed
          </Typography>
        </Box>
      )

    default:
      return <></>
  }
}

export default PoolStatusBox
