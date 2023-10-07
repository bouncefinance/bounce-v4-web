import HeaderTab from 'bounceComponents/auction/HeaderTab'
import { Box } from '@mui/material'
import FooterPc from 'components/Footer/FooterPc'
import ConnectAPIToken from './components/ConnectAPIToken'
import { useEffect, useState } from 'react'
const TelegramBot = ({}) => {
  const [isFristConnect, setIsFristConnect] = useState(true)
  useEffect(() => {
    setIsFristConnect(true)
    return () => {}
  }, [])
  if (isFristConnect) {
    return <ConnectAPIToken />
  }
  return (
    <>
      <HeaderTab />
      <Box>form</Box>
      <FooterPc />
    </>
  )
}

export default TelegramBot
