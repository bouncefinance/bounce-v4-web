import { Box, Stack, Typography } from '@mui/material'
import { BigNumber } from 'bignumber.js'

import PoolInfoItem from '../../PoolInfoItem'
import TokenImage from 'bounceComponents/common/TokenImage'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import { FixedSwapPoolProp } from 'api/pool/type'
import CurrencyLogo from 'components/essential/CurrencyLogo'
import { shortenAddress } from 'utils'
import TokenUnlockingInfo from '../UserActionBox2/TokenUnlockingInfo'
import moment from 'moment'

const TX_FEE_RATIO = 0.025

const FundInfoList = ({ poolInfo }: { poolInfo: FixedSwapPoolProp }) => {
  const formatedChargedFee = new BigNumber(poolInfo.currencySwappedAmount0.toSignificant(64, { groupSeparator: '' }))
    .times(poolInfo.ratio)
    .times(TX_FEE_RATIO)
    .toFormat(6)
  const isClaimingDelayed = poolInfo.claimAt > poolInfo.closeAt
  const formattedClaimTime = moment(poolInfo.claimAt * 1000).format('MMM D, YYYY hh:mm A')

  return (
    <Stack spacing={10} sx={{ mt: 16, mb: 24 }}>
      <PoolInfoItem title="Successful sold amount" tip="The amount of tokens sold to participants.">
        <Stack direction="row" spacing={6} alignItems="center">
          <Typography>{poolInfo.currencySwappedAmount0.toSignificant()}</Typography>
          <CurrencyLogo currency={poolInfo.currencyAmountTotal0.currency} />
          <Typography>{poolInfo.token0.symbol}</Typography>
        </Stack>
      </PoolInfoItem>

      <PoolInfoItem title="Successful fund raised" tip="The amount of fund raised from your auction.">
        <Stack direction="row" spacing={6} alignItems="center">
          <Typography>{poolInfo.currencySwappedTotal1.toSignificant()}</Typography>
          <TokenImage alt={poolInfo.token1.symbol} src={poolInfo.token1.largeUrl} size={20} />
          <Typography>{poolInfo.token1.symbol}</Typography>
        </Stack>
      </PoolInfoItem>

      <PoolInfoItem title="Fund receiving wallet" tip="The wallet address that fund raised will send to.">
        <Stack direction="row" spacing={6}>
          <Typography>{shortenAddress(poolInfo.creator)}</Typography>
          <CopyToClipboard text={poolInfo.creator} />
        </Stack>
      </PoolInfoItem>

      <PoolInfoItem title="Platform fee charged" tip="The amount of fee paid to platform.">
        <Box sx={{ display: 'flex' }}>
          <Typography color="#908E96">{TX_FEE_RATIO * 100}%&nbsp;</Typography>
          <Typography color="#908E96">
            / {formatedChargedFee}&nbsp;
            {poolInfo.token1.symbol}
          </Typography>
        </Box>
      </PoolInfoItem>

      <PoolInfoItem title="Creator wallet address">
        <Stack direction="row" spacing={6}>
          <Typography>{shortenAddress(poolInfo.creator)}</Typography>
          <CopyToClipboard text={poolInfo.creator} />
        </Stack>
      </PoolInfoItem>

      {poolInfo.poolVersion === 1 && isClaimingDelayed && (
        <PoolInfoItem title="Delay Unlocking Token Date">{formattedClaimTime}</PoolInfoItem>
      )}
      {poolInfo.poolVersion === 2 && poolInfo.releaseType !== undefined && poolInfo.releaseData && (
        <TokenUnlockingInfo releaseData={poolInfo.releaseData} releaseType={poolInfo.releaseType} />
      )}
    </Stack>
  )
}

export default FundInfoList
