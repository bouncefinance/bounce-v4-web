import { Box, Stack, Typography } from '@mui/material'
import Alert from './Alert'
import { useEnglishAuctionPoolInfo } from 'pages/auction/englishAuctionNFT/ValuesProvider'
import TopInfoBox from '../TopInfoBox'
import PoolStatusBox from 'bounceComponents/fixed-swap/ActionBox/PoolStatus'
import PoolInfoItem from 'bounceComponents/fixed-swap/PoolInfoItem'
import TokenImage from 'bounceComponents/common/TokenImage'
import PriceChartView from '../PriceChartView'
import UserBidPanel from './UserBidPanel'
import useBreakpoint from '../../../hooks/useBreakpoint'

const UserMainBlock = (): JSX.Element => {
  const { data: poolInfo, run: getPoolInfo } = useEnglishAuctionPoolInfo()
  const isMobile = useBreakpoint('lg')

  if (!poolInfo) return <></>

  return (
    <Stack sx={{ borderRadius: 20, px: 24, py: 20, bgcolor: '#fff' }} spacing={24}>
      <Alert poolInfo={poolInfo} />

      <TopInfoBox />

      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', pt: 20 }}>
        <Typography variant="h2">{poolInfo.isUserJoinedPool ? 'You Joined' : 'Join The Pool'}</Typography>

        {poolInfo && (
          <PoolStatusBox
            status={poolInfo.status}
            claimAt={poolInfo.claimAt}
            openTime={poolInfo.openAt}
            closeTime={poolInfo.closeAt}
            onEnd={getPoolInfo}
          />
        )}
      </Box>

      <Box display={'grid'} gridTemplateColumns={isMobile ? '1fr' : '1fr 1fr'} gap="40px">
        <Stack spacing={10} pt={12}>
          <PoolInfoItem title="Current Highest Bid" tip="The current highest bid for the auction">
            <Stack direction="row" spacing={6} alignItems="center">
              <Typography>{poolInfo.currentBidderAmount1?.toSignificant() || '-'}</Typography>
              <TokenImage
                src={poolInfo.token1.largeUrl || poolInfo.token1.smallUrl || poolInfo.token1.thumbUrl}
                alt={poolInfo.token1.symbol}
                size={20}
              />
              <Typography>{poolInfo.token1.symbol}</Typography>
            </Stack>
          </PoolInfoItem>

          <PoolInfoItem title="Price Floor" tip="The minimum bidding price of an auction item">
            <Stack direction="row" spacing={6} alignItems="center">
              <Typography>{poolInfo.currencyAmountMin1?.toSignificant()}</Typography>
              <TokenImage alt={poolInfo.token1.symbol} src={poolInfo.token1.largeUrl} size={20} />
              <Typography>{poolInfo.token1.symbol}</Typography>
            </Stack>
          </PoolInfoItem>

          <Box pt={20}>
            <PriceChartView />
          </Box>
        </Stack>
        <UserBidPanel />
      </Box>
    </Stack>
  )
}

export default UserMainBlock
