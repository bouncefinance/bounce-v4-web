import { Box, Typography, Grid } from '@mui/material'
import PoolTextItem from '../../poolTextItem'
import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'
import TokenImage from 'bounceComponents/common/TokenImage'
import { RightText } from '../../creatorBlock/auctionInfo'
import PoolInfoItem from '../../poolInfoItem'
import { useMemo } from 'react'
import { StatusBox } from 'pages/auction/dutchAuction/components/userBlock/right'

const Upcoming = ({ poolInfo }: { poolInfo: Erc20EnglishAuctionPoolProp }) => {
  const isUserJoined = useMemo(
    () => Number(poolInfo.participant.swappedAmount0) > 0,
    [poolInfo.participant.swappedAmount0]
  )
  return (
    <>
      <Box
        sx={{
          background: '#E1F25C',
          border: '1px solid rgba(18, 18, 18, 0.06)',
          borderRadius: '20px',
          padding: '24px'
        }}
        mb={'180px'}
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
            <PoolTextItem title={'Current Price'}>
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
        </Grid>
      </Box>
      {/* Final Auction Results */}
      <Box
        sx={{
          width: 'calc(100% - 48px)',
          margin: '30px auto 12px',
          padding: '16px',
          border: '1px solid #E1F25C',
          borderRadius: '8px'
        }}
      >
        <Typography
          sx={{
            fontFamily: `'Public Sans'`,
            color: '#fff',
            fontSize: '14px',
            fontWeight: 600
          }}
          mb={'12px'}
        >
          Final Auction Results
        </Typography>
        <PoolInfoItem title={'Average Price'}>
          <RightText
            style={{
              color: '#E1F25C'
            }}
          >
            {poolInfo.currencyCurrentPrice?.toExact() || '--'} {poolInfo.token1.symbol}
          </RightText>
        </PoolInfoItem>
        <PoolInfoItem title={'Successful Funds Raised'}>
          <RightText
            style={{
              color: '#E1F25C'
            }}
          >
            {poolInfo.currencySwappedAmount1?.toExact() || '--'} {poolInfo.token1.symbol}
          </RightText>
        </PoolInfoItem>
      </Box>
    </>
  )
}
export default Upcoming
