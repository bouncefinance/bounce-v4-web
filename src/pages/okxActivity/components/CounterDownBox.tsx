import { Box, Typography } from '@mui/material'
import { useCountDown } from 'ahooks'
import { PoolStatus } from 'api/pool/type'
import { ReactComponent as WarningIcon } from 'assets/imgs/auction/warning-icon.svg'
import { PoolStatusBoxProps } from 'bounceComponents/fixed-swap/ActionBox/PoolStatus'

const CounterDownBox = ({ status, openTime, closeTime, claimAt, onEnd, style }: PoolStatusBoxProps): JSX.Element => {
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 8,
            '& div': {
              width: 48,
              height: 48,
              fontWeight: 600,
              fontSize: 16,
              borderRadius: '8px',
              backgroundColor: '#E1F25C',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }
          }}
          style={{ ...style }}
        >
          {countdown > 0 && (
            <>
              <Box color="#121212">{days}d</Box>
              <Box color="#121212">{hours}h</Box>
              <Box color="#121212">{minutes}m</Box>
              <Box color="#121212">{seconds}s</Box>
            </>
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
          {
            <span
              style={{
                display: 'inline-block',
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
          }
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

export default CounterDownBox
