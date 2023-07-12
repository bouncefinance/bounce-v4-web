import { Box, Typography } from '@mui/material'
import { DutchAuctionPoolProp } from 'api/pool/type'
import PoolInfoItem from '../poolInfoItem'
import { RightText } from '../creatorBlock/auctionInfo'

const UserFianlAuctionResult = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
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
        Final Auction Results for You
      </Typography>
      <PoolInfoItem title={'Final auction price'}>
        <RightText
          style={{
            color: '#E1F25C'
          }}
        >
          {poolInfo.currencyLowestBidPrice?.toExact() || '--'} {poolInfo.token1.symbol}
        </RightText>
      </PoolInfoItem>
      <PoolInfoItem title={'Total paid amount of you'}>
        <RightText
          style={{
            color: '#E1F25C'
          }}
        >
          {poolInfo.participant.currencySwappedAmount1?.toExact() || '--'} {poolInfo.token1.symbol}
        </RightText>
      </PoolInfoItem>
      <PoolInfoItem title={'Excessive paid amount'}>
        <RightText
          style={{
            color: '#E1F25C'
          }}
        >
          {(poolInfo.participant?.currencyUnfilledAmount1?.toExact() || 0) + ' ' + poolInfo.token1.symbol.toUpperCase()}
        </RightText>
      </PoolInfoItem>
    </Box>
  )
}
export default UserFianlAuctionResult
