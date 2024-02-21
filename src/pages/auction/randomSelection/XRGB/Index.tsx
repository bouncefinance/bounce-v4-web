import { IPrivatePadProp, PrivatePadDataList } from 'pages/launchpad/PrivatePadDataList'
import { Box } from '@mui/material'
import FooterPc from '../../../../components/Footer/FooterPc'
import { ProjectHead, Tabs } from '../../../projectIntro'
import Pool from './Pool'
import OtherProjectTab from 'pages/projectIntro/components/otherProjectTab'

const Page = () => {
  const item = PrivatePadDataList.find(i => i.keyId === 33) as IPrivatePadProp
  return (
    <Box>
      <ProjectHead item={item} />
      {item.backedId && <Pool backedId={item.backedId} />}
      <Tabs item={item} hideTitle />
      {item.otherProject && <OtherProjectTab item={item} />}
      <FooterPc />
    </Box>
  )
}
export default Page
