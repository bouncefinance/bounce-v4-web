import { Box } from '@mui/material'
import CreatorActionBox from '../../ActionBox/CreatorActionBox'
import BottomBox from '../UserMainBlock/BottomBox'
import { NftCard, FixedSwapPoolParams } from '../UserMainBlock'
import { PoolStatus } from 'api/pool/type'
import useNftGoApi from 'bounceHooks/auction/useNftInfoByNftGo'
import { useMemo } from 'react'
import NotStartedAlert from 'bounceComponents/fixed-swap/Alerts/NotStartedAlert'
import AuctionLiveAlert from 'bounceComponents/fixed-swap/Alerts/AuctionLiveAlert'
import ClaimBackAlert from 'bounceComponents/fixed-swap/Alerts/ClaimBackAlert'
import AllTokenAuctionedAlert from 'bounceComponents/fixed-swap/Alerts/AllTokenAuctionedAlert'
import useBreakpoint from '../../../../hooks/useBreakpoint'

const CreatorMainBlock = (props: FixedSwapPoolParams): JSX.Element => {
  const { poolInfo } = props

  const isAllTokenSwapped = useMemo(() => Number(poolInfo.swappedAmount0) >= Number(poolInfo.amountTotal0), [poolInfo])
  const nftGoInfo = useNftGoApi(poolInfo.contract, poolInfo.tokenId)
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

      <Box sx={{ display: isMobile ? 'block' : 'flex', columnGap: 65, marginBottom: 30 }}>
        <NftCard nft={poolInfo} suspicious={!!nftGoInfo?.data?.suspicious} />
        <CreatorActionBox poolInfo={poolInfo} />
      </Box>
      <BottomBox poolInfo={poolInfo} />
    </Box>
  )
}

export default CreatorMainBlock
