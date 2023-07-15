import { Box, Typography, Grid } from '@mui/material'
import { DutchAuctionPoolProp, PoolStatus } from 'api/pool/type'
import { StatusBox } from '../creatorBlock/right'
import PoolTextItem from '../poolTextItem'
import TokenImage from 'bounceComponents/common/TokenImage'
import { BigNumber } from 'bignumber.js'

const PoolSaleInfo = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
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
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <Typography
          sx={{
            fontFamily: `'Public Sans'`,
            fontWeight: 600,
            fontSize: 20,
            color: '#000'
          }}
        >
          My Pool
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
                  fontFamily: `'Public Sans'`,
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
                  {poolInfo.token0.name.toUpperCase()}
                </span>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  fontFamily: `'Public Sans'`,
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
                &nbsp;{' '}
                {poolInfo.status === PoolStatus.Upcoming
                  ? poolInfo.highestPrice?.toSignificant()
                  : poolInfo.currencyCurrentPrice?.toSignificant()}
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
          <PoolTextItem title={'Last traded price'}>
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  fontFamily: `'Public Sans'`,
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
                  {poolInfo.token0.name.toUpperCase()}
                </span>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  fontFamily: `'Public Sans'`,
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
                &nbsp; {poolInfo.currencyLowestBidPrice?.toSignificant()}
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
                  fontFamily: `'Public Sans'`,
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
          <PoolTextItem
            title={poolInfo.status === PoolStatus.Closed ? 'Successful funds raised' : 'Estimated funds raised'}
            tip={'Based on last traded price.'}
          >
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  fontFamily: `'Public Sans'`,
                  fontWeight: 'bold',
                  fontSize: '16px'
                }}
              >
                {poolInfo?.currencyLowestBidPrice?.toExact() && poolInfo?.currencySwappedAmount0?.toExact()
                  ? BigNumber(poolInfo?.currencyLowestBidPrice?.toExact())
                      .times(poolInfo?.currencySwappedAmount0?.toExact())
                      .toFixed(6, BigNumber.ROUND_DOWN)
                  : '0'}
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
export default PoolSaleInfo
