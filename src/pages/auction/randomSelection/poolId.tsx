import { Box, Container, Stack } from '@mui/material'

import CreatorMainBlock from 'bounceComponents/randomSelection/MainBlock/CreatorMainBlock'
import CreatorInfoCard from 'bounceComponents/randomSelection/CreatorInfoCard'
import AuctionWinnerList from 'bounceComponents/randomSelection/AuctionWinnerList'
import Header from 'bounceComponents/randomSelection/Header'
import UserMainBlock from 'bounceComponents/randomSelection/MainBlock/UserMainBlock'
import useRandomSelectionPoolInfo from 'bounceHooks/auction/useRandomSelectionPoolInfo'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import { useActiveWeb3React } from 'hooks'
import { useCurrentRegionBlock } from 'state/application/hooks'
import NoService from 'components/NoService'
import { useIsWinnerSeedDone } from 'hooks/useCreateRandomSelectionPool'
import { PoolStatus } from 'api/pool/type'
const FixedSwapPoolPageContent = () => {
  const { account } = useActiveWeb3React()
  const { data: poolInfo, run: getPoolInfo } = useRandomSelectionPoolInfo()
  const isBlock = useCurrentRegionBlock()
  // load winners list if isWinnerSeedDone is true
  const isWinnerSeedDone = useIsWinnerSeedDone(
    poolInfo?.poolId ? Number(poolInfo?.poolId) : '',
    poolInfo?.contract || '',
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
    <Container maxWidth="lg">
      <Box sx={{ mt: 60 }}>
        <Header poolInfo={poolInfo} getPoolInfo={getPoolInfo} />
        <Box sx={{ mt: 40, display: 'flex', columnGap: 20 }}>
          <CreatorInfoCard
            poolInfo={poolInfo}
            creator={poolInfo.creator}
            getPoolInfo={getPoolInfo}
            creatorUserInfo={poolInfo.creatorUserInfo}
          />
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
    </Container>
  )
}

export default FixedSwapPoolPageContent
