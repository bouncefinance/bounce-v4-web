import { Box, SxProps, Theme } from '@mui/material'
import HeaderTab from 'bounceComponents/auction/HeaderTab'
import FooterPc from 'components/Footer/FooterPc'
import ArrowBanner from '../../bounceComponents/auction/ArrowBanner'
import Tabs from './components/tabs'
import { useState } from 'react'
import Auction from './components/auction'
import Buynow from './components/buynow'
import { useIsSMDown } from 'themes/useTheme'
import ValuesProvider from 'bounceComponents/real-world-collectibles/ValuesProvider'

export enum TabsType {
  'auction' = 0,
  'buynow' = 1
}
export default function RealWorldAuction({ sx }: { sx?: SxProps<Theme> | undefined }) {
  const [index, setIndex] = useState(TabsType.auction)
  const isSm = useIsSMDown()
  return (
    <ValuesProvider>
      <Box
        sx={{
          padding: isSm ? '0' : '0 60px 0',
          background: '#f6f6f3',
          ...sx
        }}
      >
        <HeaderTab />
        <ArrowBanner type={'RealWorld'} delay={1500} />
        <Tabs setIndex={setIndex} index={index} />
      </Box>
      {index === TabsType.auction && <Auction />}
      {index === TabsType.buynow && <Buynow />}
      <FooterPc />
    </ValuesProvider>
  )
}
