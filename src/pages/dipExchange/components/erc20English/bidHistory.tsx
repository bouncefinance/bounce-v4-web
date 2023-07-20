import { Box, Typography, Grid } from '@mui/material'
import PoolInfoItem from '../../../auction/dutchAuction/components/poolInfoItem'
import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'
import { useActiveWeb3React } from 'hooks'
import { useMemo } from 'react'
import usePoolHistory from 'bounceHooks/auction/usePoolHistory'
import moment from 'moment'
import { CurrencyAmount } from 'constants/token'
import BigNumber from 'bignumber.js'

const UserBidHistory = ({ poolInfo }: { poolInfo: Erc20EnglishAuctionPoolProp }) => {
  const { account } = useActiveWeb3React()
  const { data, loading: isGettingPoolHistory } = usePoolHistory(
    poolInfo?.chainId || 0,
    poolInfo?.poolId || '',
    poolInfo?.category,
    account || '',
    ['Bid']
  )
  const list = useMemo(() => {
    if (!data) return undefined
    return data.list.filter(item => item.event === 'Bid') || []
  }, [data])
  if (!list || (Array.isArray(list) && list.length === 0)) {
    return null
  }
  return (
    <Box
      sx={{
        width: 'calc(100%)',
        margin: '30px auto 12px',
        padding: '16px',
        border: '1px solid #4F5FFC',
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
        Your Bid
      </Typography>
      {!isGettingPoolHistory && Array.isArray(list) && list.length > 0 && (
        <>
          <Grid container>
            <Grid item xs={4}>
              <PoolInfoItem
                title={'Amount'}
                sx={{
                  flexFlow: 'column nowrap',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginBottom: '9px'
                }}
              ></PoolInfoItem>
            </Grid>
            <Grid item xs={4}>
              <PoolInfoItem
                title={'Price'}
                sx={{
                  flexFlow: 'column nowrap',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginBottom: '9px'
                }}
              ></PoolInfoItem>
            </Grid>
            <Grid item xs={4}>
              <PoolInfoItem
                title={'Date'}
                sx={{
                  flexFlow: 'column nowrap',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginBottom: '9px'
                }}
              ></PoolInfoItem>
            </Grid>
          </Grid>
          <Box
            sx={{
              width: '100%',
              maxHeight: '90px',
              overflowY: 'auto'
            }}
          >
            <Grid container rowGap={'4px'}>
              {list.map((item, index) => {
                const amount = poolInfo.currencyAmountTotal0
                  ? CurrencyAmount.fromRawAmount(
                      poolInfo.currencyAmountTotal0.currency,
                      item.token0Amount || '0'
                    )?.toSignificant()
                  : '--'
                const amoutToken1: string = poolInfo.currencySwappedAmount1
                  ? CurrencyAmount.fromRawAmount(
                      poolInfo.currencySwappedAmount1.currency,
                      item.token1Amount || '0'
                    )?.toExact()
                  : '0'
                const price: string = new BigNumber(amoutToken1).div(amount).toString() || '--'
                const date = item.blockTs ? moment(item.blockTs * 1000).format('YYYY-MM-DD HH:mm') : '--'
                return (
                  <>
                    <Grid item xs={4} key={index + '1'}>
                      <Typography
                        sx={{
                          fontFamily: `'Inter'`,
                          color: '#4F5FFC',
                          fontSize: '13px',
                          fontWeight: 400
                        }}
                      >
                        {amount}
                        {' ' + poolInfo.token0.symbol.toUpperCase()}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} key={index + '2'}>
                      <Typography
                        sx={{
                          fontFamily: `'Inter'`,
                          color: '#4F5FFC',
                          fontSize: '13px',
                          fontWeight: 400
                        }}
                      >
                        {price}
                        {' ' + poolInfo.token1.symbol.toUpperCase()}
                      </Typography>
                    </Grid>
                    <Grid item xs={4} key={index + '3'}>
                      <Typography
                        sx={{
                          fontFamily: `'Inter'`,
                          color: '#4F5FFC',
                          fontSize: '13px',
                          fontWeight: 400
                        }}
                      >
                        {date}
                      </Typography>
                    </Grid>
                  </>
                )
              })}
            </Grid>
          </Box>
        </>
      )}
    </Box>
  )
}
export default UserBidHistory
