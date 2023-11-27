import { Box, Typography, styled } from '@mui/material'
import { Erc20EnglishAuctionPoolProp, PoolStatus } from 'api/pool/type'
import { useCountDown } from 'ahooks'
import { useMaxSwapAmount1Limit } from 'bounceHooks/auction/useErc20EnglishAuctionCallback'
import SubscriptLeft from './subscriptLeft'
import SubscriptRight from './subscriptRight'
import { useIsMDDown } from 'themes/useTheme'

const SpanCom = styled('span')(({ theme }) => ({
  display: 'inline-block',
  color: '#4F5FFC',
  fontFamily: `'Inter'`,
  fontSize: 20,
  fontWeight: 600,
  margin: '0 10px 0 16px',
  [theme.breakpoints.down('md')]: {
    fontSize: 13,
    margin: '0 8px 0 8px'
  }
}))

const SubscriptionPeriod = ({ poolInfo }: { poolInfo: Erc20EnglishAuctionPoolProp }) => {
  const isMd = useIsMDDown()
  const { status, openAt: openTime, closeAt: closeTime, claimAt } = poolInfo
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
  const maxValue = useMaxSwapAmount1Limit(poolInfo)
  return (
    <Box>
      {poolInfo.status === PoolStatus.Upcoming && countdown > 0 && (
        <Typography
          sx={{
            color: '#959595',
            fontFamily: `'Inter'`,
            fontSize: isMd ? 13 : 14
          }}
          component="span"
          mb={'20px'}
        >
          Time left until this round of subscription starts: <SpanCom>{days}</SpanCom>
          Days : <SpanCom>{hours}</SpanCom>
          Hours :<SpanCom>{minutes}</SpanCom>
          Mins
        </Typography>
      )}
      {poolInfo.status === PoolStatus.Live && countdown > 0 && (
        <Typography
          sx={{
            color: '#959595',
            fontFamily: `'Inter'`,
            fontSize: isMd ? 13 : 14
          }}
          component="span"
          mb={'20px'}
        >
          Time left until this round of subscription end: <SpanCom>{days}</SpanCom>
          Days : <SpanCom>{hours}</SpanCom>
          Hours :<SpanCom>{minutes}</SpanCom>
          Mins
          <SpanCom>{seconds}</SpanCom>
          Seconds
        </Typography>
      )}
      <Box
        sx={{
          width: '100%',
          borderRadius: '6px',
          background: '#1D1D29',
          padding: '16px 24px 16px 16px',
          display: 'flex',
          flexFlow: isMd ? 'column nowrap' : 'row nowrap',
          justifyContent: 'flex-start',
          alignItems: 'flex-start'
        }}
        mt={'20px'}
        gap={'24px'}
      >
        <SubscriptLeft poolInfo={poolInfo} />
        <SubscriptRight poolInfo={poolInfo} maxValue={maxValue?.toExact() || '0'} />
      </Box>
    </Box>
  )
}
export default SubscriptionPeriod
