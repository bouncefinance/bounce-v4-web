import { Divider, Stack, Typography } from '@mui/material'
import moment from 'moment'
import { useCountDown } from 'ahooks'

import TokenImage from 'bounceComponents/common/TokenImage'
import { formatNumber } from 'utils/number'
import useIsUserJoinedPool from 'bounceHooks/auction/useIsUserJoinedPool'
import { FixedSwapPoolProp } from 'api/pool/type'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import { shortenAddress } from 'utils'
import PoolInfoItem from 'bounceComponents/fixed-swap/PoolInfoItem'

const InfoList = ({ poolInfo, getPoolInfo }: { poolInfo: FixedSwapPoolProp; getPoolInfo: () => void }) => {
  const formatedSwappedAmount0 = poolInfo.participant.currencySwappedAmount0?.greaterThan('0')
    ? poolInfo.participant.currencySwappedAmount0.toSignificant()
    : '0'

  const isJoined = useIsUserJoinedPool(poolInfo)
  const isClaimmingDelayed = poolInfo.claimAt > poolInfo.closeAt
  const formattedClaimTime = moment(poolInfo.claimAt * 1000).format('MMM D, YYYY hh:mm A')

  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate: isClaimmingDelayed ? poolInfo.claimAt * 1000 : poolInfo.closeAt * 1000,
    onEnd: getPoolInfo
  })

  return (
    <>
      <Stack spacing={10} sx={{ mt: 24 }}>
        <PoolInfoItem title="Bid swap ratio">
          <Stack direction="row" spacing={8}>
            <Typography>1</Typography>
            <TokenImage alt={poolInfo.token0.symbol} src={poolInfo.token0.largeUrl} size={20} />
            <Typography>
              {poolInfo.token0.symbol} = {formatNumber(poolInfo.ratio, { unit: 0 })}
            </Typography>
            <TokenImage alt={poolInfo.token1.symbol} src={poolInfo.token1.largeUrl} size={20} />
            <Typography>{poolInfo.token1.symbol}</Typography>
          </Stack>
        </PoolInfoItem>

        <PoolInfoItem title="Successful bid amount" tip="The amount of token you successfully secured.">
          <Stack direction="row" spacing={6}>
            <Typography>{formatedSwappedAmount0}</Typography>
            <TokenImage alt={poolInfo.token0.symbol} src={poolInfo.token0.largeUrl} size={20} />
            <Typography>{poolInfo.token0.symbol}</Typography>
          </Stack>
        </PoolInfoItem>

        <PoolInfoItem title="Creator wallet address">
          <Stack direction="row" spacing={6}>
            <Typography>{shortenAddress(poolInfo.creator)}</Typography>
            <CopyToClipboard text={poolInfo.creator} />
          </Stack>
        </PoolInfoItem>

        {isClaimmingDelayed && <PoolInfoItem title="Delay Unlocking Token Date">{formattedClaimTime}</PoolInfoItem>}
      </Stack>

      {isJoined && countdown > 0 ? (
        <>
          <Divider sx={{ mt: 10, borderColor: '#E6E6E6' }} />
          <PoolInfoItem title="Claim token" sx={{ mt: 10 }}>
            <Typography>
              in {days}d : {hours}h : {minutes}m : {seconds}s
            </Typography>
          </PoolInfoItem>
        </>
      ) : null}
    </>
  )
}

export default InfoList
