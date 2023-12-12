import { IPrivatePadProp, PrivatePadDataList } from 'pages/launchpad/PrivatePadDataList'
import { Box } from '@mui/material'
import FooterPc from '../../../../components/Footer/FooterPc'
import { ProjectHead, Tabs } from '../../../projectIntro'
import GoDIDPoll from './didPool'
const GoDIDRS = () => {
  const item = PrivatePadDataList.find(i => i.keyId === 20) as IPrivatePadProp
  return (
    <Box>
      <ProjectHead item={item} />
      <GoDIDPoll backedId={21046} />
      <Tabs item={item} />
      <FooterPc />
    </Box>
  )
}
export default GoDIDRS
