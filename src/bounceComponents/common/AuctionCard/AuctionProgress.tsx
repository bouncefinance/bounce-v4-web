import React from 'react'
import { Box, LinearProgress, Stack, Typography } from '@mui/material'
import { PoolStatus } from 'api/pool/type'
import { formatNumber } from 'utils/number'

export type IAuctionProgressProps = {
  status: PoolStatus
  symbol: string
  sold: string
  decimals?: string
  supply: string
}

export const AuctionProgress: React.FC<IAuctionProgressProps> = ({
  sold,
  decimals,
  supply,
  status,
  symbol = 'ETH'
}) => {
  return (
    <Stack spacing={10} sx={{ pt: 20 }}>
      <Stack
        direction="row"
        component={Typography}
        variant="body1"
        sx={{ fontFamily: 'Inter', '&>span': { fontFamily: 'Inter' } }}
      >
        <Typography component="span" color={status === 2 ? 'var(--ps-green)' : status === 1 ? '' : 'var(--ps-blue)'}>
          {formatNumber(sold, {
            unit: decimals,
            decimalPlaces: 6
          })}
          &nbsp;{symbol}
        </Typography>
        &nbsp;/&nbsp;
        {formatNumber(supply, {
          unit: decimals,
          decimalPlaces: 6
        })}
        &nbsp;
        {symbol}
      </Stack>
      <Box sx={{ color: status === 2 ? 'common.success' : status === 1 ? 'var(--ps-gray-200)' : 'common.blue' }}>
        <LinearProgress
          color="inherit"
          variant="determinate"
          value={parseInt(`${(Number(sold) / Number(supply)) * 100}`)}
          sx={{
            height: 6,
            borderRadius: 4,
            '::before': {
              opacity: status === 1 ? 1 : 0.3
            }
          }}
        />
      </Box>
    </Stack>
  )
}

export default AuctionProgress
