import HeaderTab from 'bounceComponents/auction/HeaderTab'
import { Box } from '@mui/material'
import FooterPc from 'components/Footer/FooterPc'
import ConnectAPIToken from './components/ConnectAPIToken'
import GuideForm from './components/GuideForm'
import { useEffect, useState } from 'react'

const TelegramBot = ({}) => {
  const [isFristConnect, setIsFristConnect] = useState(true)
  const [isGuide, setIsGuide] = useState(true)
  useEffect(() => {
    setIsFristConnect(false)
    setIsGuide(true)
    return () => {}
  }, [])
  if (isFristConnect) {
    return <ConnectAPIToken />
  }
  if (isGuide) {
    return <GuideForm />
  }
  return (
    <>
      <HeaderTab />
      <Box>123</Box>
      <FooterPc />
    </>
  )
}

export default TelegramBot
