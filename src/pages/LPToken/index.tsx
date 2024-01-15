import { Box } from '@mui/material'
import FooterPc from 'components/Footer/FooterPc'
import { IPrivatePadProp, PrivatePadDataList } from 'pages/launchpad/PrivatePadDataList'
import { ProjectHead, Tabs } from 'pages/projectIntro'
import AuctionCard from './auctionCard'
import LPPoolCard from './components/LPPoolCard'
import PoolStepper from './components/Stepper'
const LPToken = () => {
  const item = PrivatePadDataList.find(i => i.keyId === 23) as IPrivatePadProp
  return (
    <Box>
      <Box>
        <ProjectHead item={item} />
        <AuctionCard />
        <PoolStepper poolInfo={{ openAt: 1705298431, closeAt: 1705298432, claimAt: 1705384831 }} />
        <LPPoolCard />
        <Tabs item={item} />
        <FooterPc />
      </Box>
    </Box>
  )
}
export default LPToken
