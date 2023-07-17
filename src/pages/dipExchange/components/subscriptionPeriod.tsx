import { Box, Typography, styled } from '@mui/material'
import { DutchAuctionPoolProp, PoolStatus } from 'api/pool/type'
import { useCountDown } from 'ahooks'
import { BigNumber } from 'bignumber.js'
import { useMemo } from 'react'
import { useActiveWeb3React } from 'hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import SubscriptLeft from './subscriptLeft'
import SubscriptRight from './subscriptRight'
const SpanCom = styled('span')(() => ({
  color: '#4F5FFC',
  fontFamily: `'Public Sans'`,
  fontSize: 20,
  fontWeight: 600,
  margin: '0 10px 0 16px'
}))

const SubscriptionPeriod = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
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
  const { account } = useActiveWeb3React()
  const userToken1Balance = useCurrencyBalance(account || undefined, poolInfo.currencyAmountTotal1?.currency)
  // max amount of token0 by token1 banlance
  const userToken0limit = useMemo(() => {
    const highestPrice = poolInfo.highestPrice?.toExact() || 0
    const currencyCurrentPrice = poolInfo.currencyCurrentPrice?.toExact() || 0
    return BigNumber(userToken1Balance?.toExact() || 0)
      .div(poolInfo.status === PoolStatus.Upcoming ? highestPrice : currencyCurrentPrice)
      .toString()
  }, [userToken1Balance, poolInfo.currencyCurrentPrice, poolInfo.status, poolInfo.highestPrice])
  // MaxAmount0PerWallet from contract, not from http
  const currencyMaxAmount0PerWallet = useMemo(() => {
    return poolInfo.currencyMaxAmount0PerWallet && Number(poolInfo.currencyMaxAmount0PerWallet?.toExact()) > 0
      ? BigNumber(poolInfo.currencyMaxAmount0PerWallet?.toExact() || '0')
          .minus(poolInfo.participant.currencySwappedAmount0?.toExact() || '0')
          .toString()
      : poolInfo.currencyAmountTotal0?.toExact()
  }, [poolInfo.currencyMaxAmount0PerWallet, poolInfo.currencyAmountTotal0, poolInfo.participant.currencySwappedAmount0])
  const maxValue = useMemo(() => {
    // All tradable quantities for token0
    const swappedAmount0 =
      poolInfo?.currencySwappedAmount0 &&
      poolInfo?.currencyAmountTotal0 &&
      poolInfo?.currencyAmountTotal0?.subtract(poolInfo?.currencySwappedAmount0)
    const result = Math.min(
      Number(swappedAmount0?.toExact()),
      Number(userToken0limit),
      Number(currencyMaxAmount0PerWallet)
    )
    return result
  }, [currencyMaxAmount0PerWallet, poolInfo.currencyAmountTotal0, poolInfo?.currencySwappedAmount0, userToken0limit])
  return (
    <Box>
      {poolInfo.status === PoolStatus.Upcoming && countdown > 0 && (
        <Typography
          sx={{
            color: '#959595',
            fontFamily: `'Inter'`,
            fontSize: 14
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
            fontSize: 14
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
          flexFlow: 'row nowrap',
          justifyContent: 'flex-start',
          alignItems: 'flex-start'
        }}
        mt={'20px'}
        gap={'24px'}
      >
        <SubscriptLeft poolInfo={poolInfo} />
        <SubscriptRight poolInfo={poolInfo} maxValue={maxValue} />
      </Box>
    </Box>
  )
}
export default SubscriptionPeriod
