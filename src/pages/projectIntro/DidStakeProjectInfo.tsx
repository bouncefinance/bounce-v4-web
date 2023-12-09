import { IPrivatePadProp, PrivatePadDataList } from 'pages/launchpad/PrivatePadDataList'
import { Box } from '@mui/material'
import FooterPc from '../../components/Footer/FooterPc'
import { ProjectHead, Tabs } from './index'

export default function DidStakeProjectInfo() {
  const item = PrivatePadDataList.find(i => i.keyId === 19) as IPrivatePadProp
  console.log('item456789', item)

  return (
    <Box>
      <ProjectHead item={item} />

      <Tabs item={item} />
      <FooterPc />
    </Box>
  )
}
