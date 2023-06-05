import { Box, Container, Stack } from '@mui/material'

import CreatorMainBlock from 'bounceComponents/fixed-swap-nft/MainBlock/CreatorMainBlock'
import CreatorInfoCard from 'bounceComponents/fixed-swap/CreatorInfoCard'
import Header from 'bounceComponents/fixed-swap/Header'
import UserMainBlock from 'bounceComponents/fixed-swap-nft/MainBlock/UserMainBlock'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import { useActiveWeb3React } from 'hooks'
import { useCurrentRegionBlock } from 'state/application/hooks'
import NoService from 'components/NoService'
import useNftPoolInfo from 'bounceHooks/auction/useNftPoolInfo'
import ActionHistory from 'bounceComponents/fixed-swap-nft/ActionHistory'

const FixedSwapPoolPageContent = () => {
  const { account } = useActiveWeb3React()
  const { data: poolInfo, run: getPoolInfo } = useNftPoolInfo()
  const isBlock = useCurrentRegionBlock()

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
            creator={poolInfo.creator}
            poolInfo={poolInfo}
            getPoolInfo={getPoolInfo}
            creatorUserInfo={poolInfo.creatorUserInfo}
          />

          <Stack sx={{ flex: 1 }} spacing={20}>
            {account === poolInfo.creator ? (
              <CreatorMainBlock poolInfo={poolInfo} />
            ) : (
              <UserMainBlock poolInfo={poolInfo} getPoolInfo={getPoolInfo} />
            )}

            <ActionHistory backedChainId={poolInfo.chainId} category={poolInfo.category} poolId={poolInfo.poolId} />
          </Stack>
        </Box>
      </Box>
    </Container>
  )
}

const FixedSwapPoolPage = () => {
  return (
    <section>
      <FixedSwapPoolPageContent />
    </section>
  )
}

export default FixedSwapPoolPage
