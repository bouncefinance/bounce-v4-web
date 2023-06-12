import { Box } from '@mui/material'
import CreatorActionBox from '../../ActionBox/CreatorActionBox'
import LeftBox from '../../LeftBox'
import NotStartedAlert from '../../Alerts/NotStartedAlert'
import ClaimBackAlert from '../../Alerts/ClaimBackAlert'
import AllTokenAuctionedAlert from '../../Alerts/AllTokenAuctionedAlert'
import AuctionLiveAlert from '../../Alerts/AuctionLiveAlert'
import { FixedSwapPoolProp, PoolStatus } from 'api/pool/type'
import useIsAllTokenSwapped from 'bounceHooks/auction/useIsAllTokenSwapped'
import useBreakpoint from '../../../../hooks/useBreakpoint'

const CreatorMainBlock = ({
  poolInfo,
  getPoolInfo
}: {
  poolInfo: FixedSwapPoolProp
  getPoolInfo: () => void
}): JSX.Element => {
  const isAllTokenSwapped = useIsAllTokenSwapped(poolInfo)
  const isMobile = useBreakpoint('lg')

  return (
    <Box
      sx={{ borderRadius: 20, px: 24, py: 20, bgcolor: '#fff', display: 'flex', flexDirection: 'column', rowGap: 12 }}
    >
      {poolInfo.status === PoolStatus.Upcoming && <NotStartedAlert />}
      {poolInfo.status === PoolStatus.Live && <AuctionLiveAlert />}
      {poolInfo.status === PoolStatus.Closed && !poolInfo.creatorClaimed && !isAllTokenSwapped && <ClaimBackAlert />}
      {poolInfo.status === PoolStatus.Closed && !poolInfo.creatorClaimed && isAllTokenSwapped && (
        <AllTokenAuctionedAlert />
      )}

      <Box sx={{ display: isMobile ? 'block' : 'flex', columnGap: 12 }}>
        <LeftBox poolInfo={poolInfo} />
        <CreatorActionBox getPoolInfo={getPoolInfo} poolInfo={poolInfo} />
      </Box>
    </Box>
  )
}

export default CreatorMainBlock
