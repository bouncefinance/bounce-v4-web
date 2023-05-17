import { PrivatePadList } from '../launchpad'
import { Box } from '@mui/material'
import FooterPc from '../../components/Footer/FooterPc'
import { ProjectHead, Tabs } from './index'

export function ProjectInfo() {
  const item = PrivatePadList[0]
  return (
    <Box>
      <ProjectHead item={item} />
      <Tabs item={item} />
      <FooterPc />
    </Box>
  )
}
