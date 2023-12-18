import { Box, Typography } from '@mui/material'
import SectionA from './sections/sectionA'
import ArtistsList from './sections/ArtistsList'
import ArtistsInformation from './sections/ArtistsInformation'
import TokenInformation from './sections/tokenInformation'
import PoolDetail from './sections/poolDetail'
const NftLottery = () => {
  return (
    <Box>
      Nft Lottery
      <Typography variant="lotteryh1">aAAAA</Typography>
      <SectionA />
      <TokenInformation />
      <PoolDetail />
      <ArtistsList></ArtistsList>
      <ArtistsInformation></ArtistsInformation>
    </Box>
  )
}

export default NftLottery
