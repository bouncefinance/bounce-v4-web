import { IPrivatePadProp, PrivatePadDataList } from 'pages/launchpad/PrivatePadDataList'
import { Box } from '@mui/material'
import FooterPc from '../../components/Footer/FooterPc'
import { ProjectHead, Tabs } from './index'
import OtherProjectTab from './components/otherProjectTab'

export default function ProjectInfo() {
  const item = PrivatePadDataList.find(i => i.keyId === 24) as IPrivatePadProp

  return (
    <Box>
      <ProjectHead item={item} />
      <Tabs item={item} hideTitle />
      {item.otherProject && <OtherProjectTab item={item} />}
      <FooterPc />
    </Box>
  )
}
