import React from 'react'
import PcHome from './page/pcHome'
import MobileHome from './page/mobileHome'
import { useIsSMDown } from 'themes/useTheme'
require('@lottiefiles/lottie-player')
const Home: React.FC = () => {
  const isSm = useIsSMDown()
  return (
    <>
      {isSm && <MobileHome />}
      {!isSm && <PcHome />}
    </>
  )
}

export default Home
