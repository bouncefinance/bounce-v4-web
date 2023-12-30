import { Box, Stack } from '@mui/material'
import CreatorMainBlock from 'bounceComponents/randomSelection/MainBlock/CreatorMainBlock'
// import CreatorInfoCard from 'bounceComponents/randomSelection/CreatorInfoCard'
import AuctionWinnerList from 'bounceComponents/randomSelection/AuctionWinnerList'
import UserMainBlock from 'bounceComponents/randomSelection/MainBlock/UserMainBlock'
import useRandomSelectionPoolInfo from 'bounceHooks/auction/useRandomSelectionPoolInfo'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import { useActiveWeb3React } from 'hooks'
import { useCurrentRegionBlock } from 'state/application/hooks'
import NoService from 'components/NoService'
import { useIsWinnerSeedDone } from 'hooks/useRandomSelectionPool'
import { PoolStatus } from 'api/pool/type'
import useBreakpoint from '../../../../hooks/useBreakpoint'
const DidPool = ({ backedId }: { backedId?: number }) => {
  const { account } = useActiveWeb3React()
  const { data: poolInfo, run: getPoolInfo } = useRandomSelectionPoolInfo(backedId)
  const isBlock = useCurrentRegionBlock(poolInfo?.ethChainId, poolInfo?.poolId)
  const isMobile = useBreakpoint('lg')
  // load winners list if isWinnerSeedDone is true
  const isWinnerSeedDone = useIsWinnerSeedDone(
    poolInfo?.poolId ? Number(poolInfo?.poolId) : '',
    poolInfo?.contract || '',
    poolInfo?.category,
    poolInfo?.ethChainId
  )
  if (isBlock) {
    return <NoService />
  }
  if (!poolInfo) {
    return (
      <Box sx={{ width: '100%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <BounceAnime />
      </Box>
    )
  }

  return (
    <Box
      sx={{
        maxWidth: 1100,
        margin: 'auto'
      }}
    >
      <Box sx={{ mt: 60 }}>
        <Box sx={{ mt: 40, display: isMobile ? 'block' : 'flex', columnGap: 20 }}>
          <Stack sx={{ flex: 1 }} spacing={20}>
            {account === poolInfo.creator ? (
              <CreatorMainBlock poolInfo={poolInfo} getPoolInfo={getPoolInfo} />
            ) : (
              <UserMainBlock poolInfo={poolInfo} getPoolInfo={getPoolInfo} isWinnerSeedDone={isWinnerSeedDone} />
            )}
            {poolInfo.status === PoolStatus.Closed && isWinnerSeedDone && <AuctionWinnerList poolInfo={poolInfo} />}
          </Stack>
        </Box>
      </Box>
    </Box>
  )
}

export default DidPool
