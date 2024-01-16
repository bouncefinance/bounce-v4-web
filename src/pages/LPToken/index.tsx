import { Box } from '@mui/material'
import FooterPc from 'components/Footer/FooterPc'
import { IPrivatePadProp, PrivatePadDataList } from 'pages/launchpad/PrivatePadDataList'
import { ProjectHead, Tabs } from 'pages/projectIntro'
import AuctionCard from './auctionCard'
import LPPoolCard from './components/LPPoolCard'
import PoolStepper from './components/Stepper'
import { ChainId } from 'constants/chain'
import useRandomSelectionLPPoolInfo from 'bounceHooks/auction/useRandomSelectionLPPoolInfo'

const LPToken = () => {
  const item = PrivatePadDataList.find(i => i.keyId === 23) as IPrivatePadProp
  const _chainId = ChainId.SEPOLIA
  const { data: poolInfo } = useRandomSelectionLPPoolInfo(_chainId, 21423)
  return (
    <Box>
      <Box>
        <ProjectHead item={item} />
        <AuctionCard />
        <PoolStepper poolInfo={{ openAt: 1705298431, closeAt: 1705298432, claimAt: 1705384831 }} />
        {poolInfo && <LPPoolCard poolInfo={poolInfo} />}
        <Tabs item={item} />
        <FooterPc />
      </Box>
    </Box>
  )
}
export default LPToken
