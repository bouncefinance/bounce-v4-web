import { IPrivatePadProp, PrivatePadDataList } from 'pages/launchpad/PrivatePadDataList'
import { Box } from '@mui/material'
import FooterPc from '../../../../components/Footer/FooterPc'
import { ProjectHead, Tabs } from '../../../projectIntro'
import GoDIDPoll from './didPool'
const poolId = 18646
const GoDIDRS = () => {
  const item = PrivatePadDataList.find(i => i.keyId === 20) as IPrivatePadProp
  return (
    <Box>
      <ProjectHead item={item} />
      <GoDIDPoll backedId={poolId} />
      <Tabs item={item} />
      <FooterPc />
    </Box>
  )
}
export default GoDIDRS
