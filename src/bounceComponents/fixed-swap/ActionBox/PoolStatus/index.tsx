import { Box, Typography, styled } from '@mui/material'
import React from 'react'
import { useCountDown } from 'ahooks'
import { PoolStatus } from 'api/pool/type'
import { ReactComponent as WarningIcon } from 'assets/imgs/auction/warning-icon.svg'
import { useActiveWeb3React } from 'hooks'
export interface PoolStatusBoxProps {
  status: PoolStatus
  openTime: number
  closeTime: number
  claimAt: number
  onEnd?: () => void
  style?: React.CSSProperties
  showCreatorClaim?: boolean
  showParticipantClaim?: boolean
  hideUpcomingCountdown?: boolean
}

const StyledSpan = styled('span')({
  display: 'inline-block',
  padding: '4px 8px',
  background: '#000000',
  borderRadius: 20,
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  overflow: 'hidden'
})

const PoolStatusBox = ({
  status,
  openTime,
  closeTime,
  claimAt,
  onEnd,
  style,
  hideUpcomingCountdown,
  showCreatorClaim,
  showParticipantClaim
}: PoolStatusBoxProps): JSX.Element => {
  const { account } = useActiveWeb3React()
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
        <Box style={{ display: 'inline-block', padding: '4px 8px', background: '#E6E6E6', borderRadius: 20, ...style }}>
          <Typography
            variant="body1"
            color="var(--ps-gray-600)"
            fontSize={12}
            component="span"
            style={{
              marginRight: '5px'
            }}
          >
            Upcoming
          </Typography>
          {countdown > 0 && !hideUpcomingCountdown && (
            <Typography fontSize={12} color="var(--ps-gray-600)" variant="body1" component="span">
              &nbsp;{days}d : {hours}h : {minutes}m
            </Typography>
          )}
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
          {showParticipantClaim && account && (
            <StyledSpan style={style}>
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
                    Claimable
                  </Typography>
                </>
              )}
            </StyledSpan>
          )}
          {showCreatorClaim && account && status === PoolStatus.Closed && (
            <StyledSpan style={style}>
              <WarningIcon style={{ marginRight: '4px', verticalAlign: 'middle' }} />
              <Typography variant="body1" color="#fff" component="span">
                Claimable
              </Typography>
            </StyledSpan>
          )}
        </Box>
      )
    case PoolStatus.Cancelled:
      return (
        <Box sx={{ px: 12, py: 4, bgcolor: '#D6DFF6', borderRadius: 20, marginRight: '16px', ...style }}>
          <Typography variant="body1" color="#2663FF">
            Cancelled
          </Typography>
        </Box>
      )

    default:
      return <></>
  }
}

export default PoolStatusBox
