import { IPrivatePadProp, PrivatePadDataList } from 'pages/launchpad/PrivatePadDataList'
import { Box } from '@mui/material'
import FooterPc from '../../../../components/Footer/FooterPc'
import { ProjectHead, Tabs } from '../../../projectIntro'
import Pool from './Pool'

const Page = () => {
  const item = PrivatePadDataList.find(i => i.keyId === 26) as IPrivatePadProp
  return (
    <Box>
      <ProjectHead item={item} />
      {item.backedId && <Pool backedId={item.backedId} />}
      <Tabs item={item} />
      <FooterPc />
    </Box>
  )
}
export default Page
