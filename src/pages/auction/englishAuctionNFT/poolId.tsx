import { Box, Container, Stack } from '@mui/material'

import CreatorInfoCard from 'bounceComponents/fixed-swap/CreatorInfoCard'
import Header from 'bounceComponents/fixed-swap/Header'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import { useActiveWeb3React } from 'hooks'
import { useCurrentRegionBlock } from 'state/application/hooks'
import NoService from 'components/NoService'
import ActionHistory from 'bounceComponents/fixed-swap-nft/ActionHistory'
import ValuesProvider, { useEnglishAuctionPoolInfo } from './ValuesProvider'
import CreatorMainBlock from 'bounceComponents/englishAuction/CreatorMainBlock'
import UserMainBlock from 'bounceComponents/englishAuction/UserMainBlock'

function EnglishAuctionNFTContent() {
  const { account } = useActiveWeb3React()
  const { data: poolInfo, run: getPoolInfo } = useEnglishAuctionPoolInfo()
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
    <section>
      <Container maxWidth="lg">
        <Box sx={{ mt: 60 }}>
          <Header poolInfo={poolInfo} typeName="English Auction" getPoolInfo={getPoolInfo} />

          <Box sx={{ mt: 40, display: 'flex', columnGap: 20 }}>
            <CreatorInfoCard
              creator={poolInfo.creator}
              poolInfo={poolInfo}
              getPoolInfo={getPoolInfo}
              creatorUserInfo={poolInfo.creatorUserInfo}
            />

            <Stack sx={{ flex: 1 }} spacing={20}>
              {account === poolInfo.creator ? <CreatorMainBlock /> : <UserMainBlock />}

              <ActionHistory backedChainId={poolInfo.chainId} category={poolInfo.category} poolId={poolInfo.poolId} />
            </Stack>
          </Box>
        </Box>
      </Container>
    </section>
  )
}

const EnglishAuctionNFT = () => {
  return (
    <ValuesProvider>
      <EnglishAuctionNFTContent />
    </ValuesProvider>
  )
}

export default EnglishAuctionNFT
