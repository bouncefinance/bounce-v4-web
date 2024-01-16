import { Box } from '@mui/material'
import FooterPc from 'components/Footer/FooterPc'
import { IPrivatePadProp, PrivatePadDataList } from 'pages/launchpad/PrivatePadDataList'
import { ProjectHead, Tabs } from 'pages/projectIntro'
import AuctionCard from './auctionCard'
import LPPoolCard from './components/LPPoolCard'
import PoolStepper from './components/Stepper'
import useRandomSelectionLPPoolInfo from 'bounceHooks/auction/useRandomSelectionLPPoolInfo'
import { ChainId } from 'constants/chain'
const LPToken = () => {
  const { data: poolInfo } = useRandomSelectionLPPoolInfo(ChainId.SEPOLIA, 21428)
  console.log('poolInfo', poolInfo)

  const item = PrivatePadDataList.find(i => i.keyId === 23) as IPrivatePadProp
  return (
    <Box>
      <Box>
        <ProjectHead item={item} />
        {poolInfo && (
          <>
            <AuctionCard poolInfo={poolInfo} />
            <PoolStepper poolInfo={poolInfo} />
          </>
        )}
        <LPPoolCard />
        <Tabs item={item} />
        <FooterPc />
      </Box>
    </Box>
  )
}
export default LPToken
