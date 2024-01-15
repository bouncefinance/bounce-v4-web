import { Box } from '@mui/material'
import FooterPc from 'components/Footer/FooterPc'
import { IPrivatePadProp, PrivatePadDataList } from 'pages/launchpad/PrivatePadDataList'
import { ProjectHead, Tabs } from 'pages/projectIntro'
import AuctionCard from './auctionCard'
import LPPoolCard from './components/LPPoolCard'
const LPToken = () => {
  const item = PrivatePadDataList.find(i => i.keyId === 23) as IPrivatePadProp
  return (
    <Box>
      <Box>
        <ProjectHead item={item} />
        <AuctionCard />
        <LPPoolCard />
        <Tabs item={item} />
        <FooterPc />
      </Box>
    </Box>
  )
}
export default LPToken
