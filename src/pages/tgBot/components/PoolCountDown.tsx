import { Typography, Box, styled } from '@mui/material'
import { useCountDown } from 'ahooks'
import { PoolStatus } from 'api/pool/type'
export const AuctionStatusPrimaryColor: Record<PoolStatus, string> = {
  [PoolStatus.Upcoming]: '#D7D6D9',
  [PoolStatus.Live]: '#CFF8D1',
  [PoolStatus.Closed]: '#D6DFF6',
  [PoolStatus.Finish]: '#2663FF',
  [PoolStatus.Cancelled]: '#2663FF'
}
export const AuctionStatusTextPrimaryColor: Record<PoolStatus, string> = {
  [PoolStatus.Upcoming]: '#626262',
  [PoolStatus.Live]: '#30A359',
  [PoolStatus.Closed]: '#2B51DA',
  [PoolStatus.Finish]: '#2663FF',
  [PoolStatus.Cancelled]: '#2663FF'
}

type NewType = {
  openTime: number
  closeTime: number
  claimAt: number
  status: PoolStatus
}
const StatusBox = styled(Box)`
  display: flex;
  padding: 4px 12px;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
`
export default function PoolCountDown({ status, openTime, closeTime, claimAt }: NewType) {
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate:
      status === PoolStatus.Upcoming
        ? openTime * 1000
        : status === PoolStatus.Live
        ? closeTime * 1000
        : status === PoolStatus.Closed
        ? claimAt * 1000
        : undefined
  })

  return countdown ? (
    <StatusBox
      sx={{
        background: AuctionStatusPrimaryColor[status]
      }}
    >
      <Typography
        noWrap
        color={AuctionStatusTextPrimaryColor[status]}
        fontFamily={'Inter'}
        fontSize={12}
        fontWeight={400}
      >
        {`${PoolStatus[status]} ${days}d : ${hours}h : ${minutes}m : ${seconds}s`}
      </Typography>
    </StatusBox>
  ) : null
}
