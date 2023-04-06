import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { BigNumber } from 'bignumber.js'
import PoolInfoItem from '../../PoolInfoItem'
import DefaultNftIcon from 'bounceComponents/create-auction-pool/TokenERC1155InforationForm/components/NFTCard/emptyCollectionIcon.png'

import TokenImage from 'bounceComponents/common/TokenImage'
import { formatNumber } from '@/utils/web3/number'
import { shortenAddress } from '@/utils/web3/address'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import usePoolInfo from '@/hooks/auction/useNftPoolInfo'

const TX_FEE_RATIO = 0.0
// const TX_FEE_RATIO = 0.025

const FundInfoList = () => {
  const { data: poolInfo } = usePoolInfo()

  const formatedSwappedAmount0 = formatNumber(poolInfo.swappedAmount0, {
    unit: poolInfo.token0.decimals,
    decimalPlaces: 6
  })
  const formatedSwappedAmount1 = formatNumber(new BigNumber(poolInfo.swappedAmount0).times(poolInfo.ratio).toString(), {
    unit: poolInfo.token0.decimals,
    decimalPlaces: 6
  })
  const formatedChargedFee = formatNumber(
    new BigNumber(poolInfo.swappedAmount0).times(poolInfo.ratio).times(TX_FEE_RATIO).toString(),
    {
      unit: poolInfo.token0.decimals,
      decimalPlaces: 6
    }
  )

  return (
    <Stack spacing={10} sx={{ mt: 16, mb: 24 }}>
      <PoolInfoItem title="Successful sold amount" tip="The amount of tokens sold to participants.">
        <Stack direction="row" spacing={6} alignItems="center">
          <Typography>{formatedSwappedAmount0}</Typography>
          <TokenImage
            src={poolInfo.token0.largeUrl || poolInfo.token0.smallUrl || poolInfo.token0.thumbUrl || DefaultNftIcon.src}
            alt={poolInfo.token0.symbol}
            size={20}
          />
          <Typography>{poolInfo.token0.symbol}</Typography>
        </Stack>
      </PoolInfoItem>

      <PoolInfoItem title="Successful fund raised" tip="The amount of fund raised from your auction.">
        <Stack direction="row" spacing={6} alignItems="center">
          <Typography>{formatedSwappedAmount1}</Typography>
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
          <Typography color="#F53030">{TX_FEE_RATIO * 100}%&nbsp;</Typography>
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
