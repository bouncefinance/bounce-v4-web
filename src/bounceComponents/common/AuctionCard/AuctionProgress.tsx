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
        className="progress-text"
        direction="row"
        component={Typography}
        variant="body1"
        sx={{ fontFamily: 'Inter', '&>span': { fontFamily: 'Inter' } }}
      >
        <Typography
          className="progress-left"
          component="span"
          color={status === 2 ? '#20994B' : status === 1 ? '' : 'var(--ps-blue)'}
        >
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
      <Box
        className="progress"
        sx={{ color: status === 2 ? '#E1F25C' : status === 1 ? 'var(--ps-gray-200)' : 'common.blue' }}
      >
        <LinearProgress
          color="inherit"
          variant="determinate"
          value={parseInt(`${(Number(sold) / Number(supply)) * 100}`)}
          sx={{
            height: 6,
            borderRadius: 4,
            '::before': {
              opacity: 1,
              color: 'rgba(18, 18, 18, 0.06)'
            }
          }}
        />
      </Box>
    </Stack>
  )
}

export default AuctionProgress
