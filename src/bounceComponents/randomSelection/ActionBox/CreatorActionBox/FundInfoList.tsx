import { Box, Stack, Typography } from '@mui/material'
import { BigNumber } from 'bignumber.js'

import TokenImage from 'bounceComponents/common/TokenImage'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import { FixedSwapPoolProp } from 'api/pool/type'
// import CurrencyLogo from 'components/essential/CurrencyLogo'
import { shortenAddress } from 'utils'
import { formatNumber } from 'utils/number'
import PoolInfoItem from 'bounceComponents/fixed-swap/PoolInfoItem'

const TX_FEE_RATIO = 0.025

const FundInfoList = ({ poolInfo }: { poolInfo: FixedSwapPoolProp }) => {
  const formatedChargedFee = poolInfo.curPlayer
    ? formatNumber(new BigNumber(poolInfo.curPlayer).times(poolInfo.maxAmount1PerWallet).times(TX_FEE_RATIO), {
        unit: 18,
        decimalPlaces: poolInfo.token0.decimals
      })
    : 0
  return (
    <Stack spacing={10} sx={{ mt: 16, mb: 24 }}>
      <PoolInfoItem title="Token purchased" tip="The amount of Token purchased">
        <Stack direction="row" spacing={6} alignItems="center">
          <Typography>{poolInfo.maxPlayere}</Typography>
        </Stack>
      </PoolInfoItem>

      <PoolInfoItem title="Number of token unsold" tip="Number of token unsold">
        <Stack direction="row" spacing={6} alignItems="center">
          <Typography>
            {poolInfo.maxPlayere && poolInfo.curPlayer
              ? Number(poolInfo.maxPlayere) - Number(poolInfo.curPlayer)
              : undefined}
          </Typography>
        </Stack>
      </PoolInfoItem>
      <PoolInfoItem title="Fund raised" tip="Number of Fund raised">
        <Stack direction="row" spacing={6} alignItems="center">
          <Typography>
            {poolInfo.curPlayer && poolInfo.maxAmount1PerWallet
              ? formatNumber(new BigNumber(poolInfo.curPlayer).times(poolInfo.maxAmount1PerWallet), {
                  unit: poolInfo.token1.decimals,
                  decimalPlaces: poolInfo.token1.decimals
                })
              : undefined}
          </Typography>
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
    </Stack>
  )
}

export default FundInfoList
