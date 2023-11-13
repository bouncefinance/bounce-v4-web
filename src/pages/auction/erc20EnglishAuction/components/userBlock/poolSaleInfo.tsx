import { Box, Grid, Typography } from '@mui/material'
import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'
import TokenImage from 'bounceComponents/common/TokenImage'
import PoolTextItem from 'pages/auction/dutchAuction/components/poolTextItem'
import { useMemo } from 'react'
import { StatusBox } from 'pages/auction/dutchAuction/components/userBlock/right'
import { useIsMDDown } from 'themes/useTheme'
export function PoolSaleInfo({ poolInfo }: { poolInfo: Erc20EnglishAuctionPoolProp }) {
  const isMd = useIsMDDown()
  const isUserJoined = useMemo(
    () => Number(poolInfo?.participant.swappedAmount0),
    [poolInfo?.participant.swappedAmount0]
  )
  return (
    <Box
      sx={{
        background: '#E1F25C',
        border: '1px solid rgba(18, 18, 18, 0.06)',
        borderRadius: '20px',
        padding: '24px'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexFlow: isMd ? 'column nowrap' : 'row nowrap',
          justifyContent: isMd ? 'flex-start' : 'space-between',
          alignItems: isMd ? 'flex-start' : 'center'
        }}
      >
        <Typography
          sx={{
            fontFamily: `'Inter'`,
            fontWeight: 600,
            fontSize: 20,
            color: '#000'
          }}
        >
          {!isUserJoined ? 'Join The Pool' : 'You Joined'}
        </Typography>
        <StatusBox poolInfo={poolInfo} />
      </Box>
      <Box
        sx={{
          width: '100%',
          height: 0,
          borderBottom: `1px solid rgba(18, 18, 18, 0.2)`,
          margin: '16px 0'
        }}
      ></Box>
      <Grid container rowGap={'16px'}>
        <Grid item xs={6}>
          <PoolTextItem title={'Current price'}>
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  fontFamily: `'Inter'`,
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
              >
                1
                <TokenImage
                  sx={{
                    margin: '0 4px'
                  }}
                  src={poolInfo.token0.largeUrl}
                  alt={poolInfo.token0.symbol}
                  size={16}
                />
                <span
                  style={{
                    fontFamily: `'Inter'`,
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#626262'
                  }}
                >
                  {poolInfo.token0.symbol.toUpperCase()}
                </span>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  fontFamily: `'Inter'`,
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
              >
                <span
                  style={{
                    fontFamily: `'Inter'`,
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#626262'
                  }}
                >
                  =
                </span>
                &nbsp; {poolInfo.currencyCurrentPrice?.toSignificant()}
                <TokenImage
                  sx={{
                    margin: '0 4px'
                  }}
                  src={poolInfo.token1.largeUrl}
                  alt={poolInfo.token1.symbol}
                  size={16}
                />
                <span
                  style={{
                    fontFamily: `'Inter'`,
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#626262'
                  }}
                >
                  {(poolInfo.token1.symbol + '').toUpperCase()}
                </span>
              </Box>
            </>
          </PoolTextItem>
        </Grid>
        <Grid item xs={6}>
          <PoolTextItem title={'Successful sold amount'} tip={'The amount of token you successfully secured.'}>
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  fontFamily: `'Inter'`,
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
              >
                {poolInfo.currencySwappedAmount0?.toSignificant()}
                <TokenImage
                  sx={{
                    margin: '0 4px'
                  }}
                  src={poolInfo.token0.largeUrl}
                  alt={poolInfo.token0.symbol}
                  size={16}
                />
                <span
                  style={{
                    fontFamily: `'Inter'`,
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#626262'
                  }}
                >
                  {poolInfo.token0.symbol.toUpperCase()}
                </span>
              </Box>
            </>
          </PoolTextItem>
        </Grid>
        <Grid item xs={6}>
          <PoolTextItem title={'Total paid amount'} tip={'Total paid amount'}>
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  fontFamily: `'Inter'`,
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
              >
                {poolInfo?.currencySwappedAmount1 && poolInfo?.currencySwappedAmount1?.toExact()}
                <TokenImage
                  sx={{
                    margin: '0 4px'
                  }}
                  src={poolInfo.token1.largeUrl}
                  alt={poolInfo.token1.symbol}
                  size={16}
                />
                <span
                  style={{
                    fontFamily: `'Inter'`,
                    fontSize: '14px',
                    fontWeight: 400,
                    color: '#626262'
                  }}
                >
                  {(poolInfo.token1.symbol + '').toUpperCase()}
                </span>
              </Box>
            </>
          </PoolTextItem>
        </Grid>
      </Grid>
    </Box>
  )
}
