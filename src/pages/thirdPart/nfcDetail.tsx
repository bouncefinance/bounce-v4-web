import { Box } from '@mui/material'
import PcBg from 'assets/imgs/thirdPart/nfcDetail/pcBg.png'
import { useState } from 'react'
import Specification from './nfcDetail/specification'
import Cliam from './nfcDetail/cliam'
import Header from './nfcDetail/header'
export enum PageStep {
  'specification' = 0,
  'claimPage' = 1
}
const NfcDetail = () => {
  const [pageStep, setPageStep] = useState<PageStep>(PageStep.claimPage)
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        minHeight: '100vh',
        background: `url(${PcBg}) no-repeat top center / cover`
      }}
    >
      <Header />
      {pageStep === PageStep.specification && <Specification setPageStep={setPageStep} />}
      {pageStep === PageStep.claimPage && <Cliam />}
    </Box>
  )
}
export default NfcDetail
