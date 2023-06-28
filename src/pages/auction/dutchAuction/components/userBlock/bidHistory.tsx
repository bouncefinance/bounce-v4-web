import { Box, Typography, Grid } from '@mui/material'
import PoolInfoItem from '../poolInfoItem'

interface listParam {
  amount: string
  price: string
  date: string
}
interface BidListParam {
  list: listParam[]
}
const UserBidHistory = (props: BidListParam) => {
  const { list } = props
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
        Your Bid
      </Typography>
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
            return (
              <>
                <Grid item xs={4} key={index + '1'}>
                  <Typography
                    sx={{
                      fontFamily: `'Inter'`,
                      color: '#E1F25C',
                      fontSize: '13px',
                      fontWeight: 400
                    }}
                  >
                    {item.amount || '--'}
                  </Typography>
                </Grid>
                <Grid item xs={4} key={index + '2'}>
                  <Typography
                    sx={{
                      fontFamily: `'Inter'`,
                      color: '#E1F25C',
                      fontSize: '13px',
                      fontWeight: 400
                    }}
                  >
                    {item.price || '--'}
                  </Typography>
                </Grid>
                <Grid item xs={4} key={index + '3'}>
                  <Typography
                    sx={{
                      fontFamily: `'Inter'`,
                      color: '#E1F25C',
                      fontSize: '13px',
                      fontWeight: 400
                    }}
                  >
                    {item.date || '--'}
                  </Typography>
                </Grid>
              </>
            )
          })}
        </Grid>
      </Box>
    </Box>
  )
}
export default UserBidHistory
