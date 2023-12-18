import { Box, Typography } from '@mui/material'
import SectionA from './sections/sectionA'
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
    </Box>
  )
}

export default NftLottery
