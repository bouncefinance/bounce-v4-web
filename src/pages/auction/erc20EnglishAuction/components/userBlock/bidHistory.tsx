import { Box, Typography, Grid } from '@mui/material'
import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'
import { useActiveWeb3React } from 'hooks'
import usePoolHistory from 'bounceHooks/auction/usePoolHistory'
import moment from 'moment'
import { CurrencyAmount } from 'constants/token'
import PoolInfoItem from 'pages/auction/dutchAuction/components/poolInfoItem'
import { useIsMDDown } from 'themes/useTheme'
const UserBidHistory = ({ poolInfo }: { poolInfo: Erc20EnglishAuctionPoolProp }) => {
  const isMd = useIsMDDown()
  const { account } = useActiveWeb3React()
  const { data: list, loading: isGettingPoolHistory } = usePoolHistory(
    poolInfo?.chainId || 0,
    poolInfo?.poolId || '',
    poolInfo?.category,
    account || '',
    ['Swapped']
  )

  if (!list || (Array.isArray(list.list) && list.list.length === 0)) {
    return null
  }
  return (
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
        Your Bid History
      </Typography>
      {!isGettingPoolHistory && Array.isArray(list.list) && list.list.length > 0 && (
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
                title={'Bid Price'}
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
              {list.list.map((item, index) => {
                return (
                  <Grid container key={item.poolId + index}>
                    <Grid item xs={4}>
                      <Typography
                        sx={{
                          fontFamily: `'Inter'`,
                          color: '#E1F25C',
                          fontSize: isMd ? 12 : '13px',
                          fontWeight: 400
                        }}
                      >
                        {poolInfo.currencyAmountTotal0
                          ? CurrencyAmount.fromRawAmount(
                              poolInfo.currencyAmountTotal0.currency,
                              item.token0Amount || '0'
                            )?.toSignificant()
                          : '--'}
                        {' ' + poolInfo.token0.symbol.toUpperCase()}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        sx={{
                          fontFamily: `'Inter'`,
                          color: '#E1F25C',
                          fontSize: isMd ? 12 : '13px',
                          fontWeight: 400
                        }}
                      >
                        {poolInfo.currencyAmountEndPrice
                          ? CurrencyAmount.fromRawAmount(
                              poolInfo.currencyAmountEndPrice.currency,
                              item.token1Amount || '0'
                            )?.toSignificant()
                          : '--'}
                        {' ' + poolInfo.token1.symbol.toUpperCase()}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        sx={{
                          fontFamily: `'Inter'`,
                          color: '#E1F25C',
                          fontSize: isMd ? 12 : '13px',
                          fontWeight: 400
                        }}
                      >
                        {item.blockTs ? moment(item.blockTs * 1000).format('yyyy-MM-DD HH:mm') : '--'}
                      </Typography>
                    </Grid>
                  </Grid>
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
