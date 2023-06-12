import { Box, Stack, Typography } from '@mui/material'
import { PoolStatus } from 'api/pool/type'
import { useMemo } from 'react'
import NotStartedAlert from 'bounceComponents/fixed-swap/Alerts/NotStartedAlert'
import AuctionLiveAlert from 'bounceComponents/fixed-swap/Alerts/AuctionLiveAlert'
import ClaimBackAlert from 'bounceComponents/fixed-swap/Alerts/ClaimBackAlert'
import AllTokenAuctionedAlert from 'bounceComponents/fixed-swap/Alerts/AllTokenAuctionedAlert'
import { useEnglishAuctionPoolInfo } from 'pages/auction/englishAuctionNFT/ValuesProvider'
import TopInfoBox from '../TopInfoBox'
import PoolStatusBox from 'bounceComponents/fixed-swap/ActionBox/PoolStatus'
import PoolInfoItem from 'bounceComponents/fixed-swap/PoolInfoItem'
import TokenImage from 'bounceComponents/common/TokenImage'
import { shortenAddress } from 'utils'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import UpcomingPoolCreatorAlert from 'bounceComponents/fixed-swap/Alerts/UpcomingPoolCreatorAlert'
import LivePoolCreatorAlert from 'bounceComponents/fixed-swap/Alerts/LivePoolCreatorAlert'
import SuccessfullyClaimedAlert from 'bounceComponents/fixed-swap/Alerts/SuccessfullyClaimedAlert'
import ButtonBlock from './ButtonBlock'
import PriceChartView from '../PriceChartView'
import BigNumber from 'bignumber.js'
import isZero from 'utils/isZero'

const TX_FEE_RATIO = 0.025

const CreatorMainBlock = (): JSX.Element => {
  const { data: poolInfo, run: getPoolInfo } = useEnglishAuctionPoolInfo()
  const isAllTokenSwapped = useMemo(() => !!poolInfo?.currentBidder && !isZero(poolInfo.currentBidder), [poolInfo])

  const platformFeeText = useMemo(() => {
    if (!poolInfo || !poolInfo.currentBidderAmount1?.greaterThan('0')) return '-'
    return new BigNumber(poolInfo.currentBidderAmount1.toExact()).multipliedBy(TX_FEE_RATIO).toFixed(2)
  }, [poolInfo])

  if (!poolInfo) return <></>

  return (
    <Stack sx={{ borderRadius: 20, px: 24, py: 20, bgcolor: '#fff' }} spacing={24}>
      {poolInfo.status === PoolStatus.Upcoming && <NotStartedAlert />}
      {poolInfo.status === PoolStatus.Live && <AuctionLiveAlert />}
      {poolInfo.status === PoolStatus.Closed && !poolInfo.creatorClaimed && !isAllTokenSwapped && <ClaimBackAlert />}
      {poolInfo.status === PoolStatus.Closed && !poolInfo.creatorClaimed && isAllTokenSwapped && (
        <AllTokenAuctionedAlert />
      )}
      <TopInfoBox />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pt: 20 }}>
        <Typography variant="h2">My Pool</Typography>
        <PoolStatusBox
          status={poolInfo.status}
          openTime={poolInfo.openAt}
          closeTime={poolInfo.closeAt}
          claimAt={poolInfo.claimAt}
          onEnd={getPoolInfo}
        />
      </Box>

      <Box display={'grid'} gridTemplateColumns={'1fr 1fr'} gap="40px">
        <Stack spacing={10}>
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

          <PoolInfoItem title="Fund receiving wallet" tip="The wallet address that fund raised will send to.">
            <Stack direction="row" spacing={6}>
              <Typography>{shortenAddress(poolInfo.creator)}</Typography>
              <CopyToClipboard text={poolInfo.creator} />
            </Stack>
          </PoolInfoItem>

          <PoolInfoItem title="Platform fee charged" tip="The amount of fee paid to platform.">
            <Box sx={{ display: 'flex' }}>
              <Typography color="#F53030">{TX_FEE_RATIO * 100}%&nbsp;</Typography>
              <Typography color="#908E96">
                / {platformFeeText}&nbsp;
                {poolInfo.token1.symbol}
              </Typography>
            </Box>
          </PoolInfoItem>

          <Box>
            {poolInfo.status === PoolStatus.Upcoming && <UpcomingPoolCreatorAlert />}
            {poolInfo.status === PoolStatus.Live && <LivePoolCreatorAlert />}
            {(poolInfo.status === PoolStatus.Closed || poolInfo.status === PoolStatus.Cancelled) &&
              poolInfo.creatorClaimed && <SuccessfullyClaimedAlert />}
            {/* {!!nftGoInfo?.data?.suspicious && <SuspiciousTips />} */}
          </Box>

          {poolInfo.contract && <ButtonBlock />}
        </Stack>

        <PriceChartView poolInfo={poolInfo} />
      </Box>
    </Stack>
  )
}

export default CreatorMainBlock
