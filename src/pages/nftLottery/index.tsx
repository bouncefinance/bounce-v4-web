import { Box, Typography } from '@mui/material'
import SectionA from './sections/sectionA'
import ArtistsList from './sections/ArtistsList'
import ArtistsInformation from './sections/ArtistsInformation'
const NftLottery = () => {
  return (
    <Box>
      Nft Lottery
      <Typography variant="lotteryh1">aAAAA</Typography>
      <SectionA />
      <ArtistsList></ArtistsList>
      <ArtistsInformation></ArtistsInformation>
    </Box>
  )
}

export default NftLottery
