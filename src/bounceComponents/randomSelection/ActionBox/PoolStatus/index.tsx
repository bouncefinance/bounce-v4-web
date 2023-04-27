import { Box, Typography } from '@mui/material'
import React from 'react'
import { useCountDown } from 'ahooks'
import { PoolStatus } from 'api/pool/type'
import { ReactComponent as WarningIcon } from 'assets/imgs/auction/warning-icon.svg'
export interface PoolStatusBoxProps {
  status: PoolStatus
  openTime: number
  closeTime: number
  claimAt: number
  onEnd?: () => void
  style?: React.CSSProperties
  hiddenStatus?: boolean
}

const PoolStatusBox = ({
  status,
  openTime,
  closeTime,
  claimAt,
  onEnd,
  style,
  hiddenStatus = false
}: PoolStatusBoxProps): JSX.Element => {
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate:
      status === PoolStatus.Upcoming
        ? openTime * 1000
        : status === PoolStatus.Live
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
            bgcolor: '#E6E6E6',
            borderRadius: 20,
            ...style
          }}
        >
          <Typography variant="body1">Upcoming</Typography>
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
          <Box sx={{ px: 12, py: 4, bgcolor: '#D6DFF6', borderRadius: 20, marginRight: '8px', ...style }}>
            <Typography variant="body1" color="#2663FF">
              Closed
            </Typography>
          </Box>
          {!hiddenStatus && (
            <span
              style={{ display: 'inline-block', padding: '4px 8px', background: '#000000', borderRadius: 20, ...style }}
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
          )}
        </Box>
      )
    case PoolStatus.Cancelled:
      return (
        <Box sx={{ px: 12, py: 4, bgcolor: '#D6DFF6', borderRadius: 20, marginRight: '16px', ...style }}>
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
