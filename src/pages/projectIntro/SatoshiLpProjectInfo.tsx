import { IPrivatePadProp, PrivatePadDataList } from 'pages/launchpad/PrivatePadDataList'
import { Box } from '@mui/material'
import FooterPc from '../../components/Footer/FooterPc'
import { ProjectHead, Tabs } from './index'

export default function ProjectInfo() {
  const item = PrivatePadDataList.find(i => i.keyId === 27) as IPrivatePadProp

  return (
    <Box>
      <ProjectHead item={item} />
      <Tabs item={item} />
      <FooterPc />
    </Box>
  )
}
