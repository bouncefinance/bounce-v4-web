import ValuesProvider from 'bounceComponents/create-auction-pool/ValuesProvider'
import { useValuesState } from 'bounceComponents/create-auction-pool/ValuesProvider'
import ConnectAPIToken from 'bounceComponents/create-auction-pool/CreationBotConfirmation/ConnectAPIToken'
import AuctionBotCreateForm from 'bounceComponents/create-auction-pool/AuctionBotCreateForm'
import { TgBotActiveStep } from 'bounceComponents/create-auction-pool/types'
import CreationBotConfirmation from 'bounceComponents/create-auction-pool/CreationBotConfirmation'
// import { useUserInfo } from 'state/users/hooks'
import HeaderTab from 'bounceComponents/auction/HeaderTab'
import FooterPc from 'components/Footer/FooterPc'
import { styled, Box } from '@mui/material'
export function Guide() {
  const valuesState = useValuesState()

  if (valuesState.tgBotActiveStep === TgBotActiveStep.GETAPITOKEN) {
    return <ConnectAPIToken />
  }
  if (valuesState.tgBotActiveStep === TgBotActiveStep.GUIDEFORM) {
    return <AuctionBotCreateForm type="Guide" />
  }
  if (valuesState.tgBotActiveStep === TgBotActiveStep.COMFIRM) {
    return <CreationBotConfirmation />
  }
  return null
}

const CusContainer = styled(Box)`
  padding: 24px 0px 60px;
  width: 100%;
  max-width: 1296px;
  margin: 0 auto;
`

const GuidePage = () => {
  return (
    <ValuesProvider>
      <HeaderTab />
      <CusContainer>
        <Guide />
      </CusContainer>
      <FooterPc />
    </ValuesProvider>
  )
}

export default GuidePage
