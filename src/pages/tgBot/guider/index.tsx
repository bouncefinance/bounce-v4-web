import ValuesProvider from 'bounceComponents/create-auction-pool/ValuesProvider'
import { useValuesState } from 'bounceComponents/create-auction-pool/ValuesProvider'
import ConnectAPIToken from 'bounceComponents/create-auction-pool/CreationBotConfirmation/ConnectAPIToken'
import AuctionBotCreateForm from 'bounceComponents/create-auction-pool/AuctionBotCreateForm'
import { TgBotActiveStep } from 'bounceComponents/create-auction-pool/types'
import CreationBotConfirmation from 'bounceComponents/create-auction-pool/CreationBotConfirmation'

export function Guide() {
  const valuesState = useValuesState()

  if (valuesState.tgBotActiveStep === TgBotActiveStep.GETAPITOKEN) {
    return <ConnectAPIToken />
  }
  if (valuesState.tgBotActiveStep === TgBotActiveStep.GUIDEFORM) {
    return <AuctionBotCreateForm />
  }
  if (valuesState.tgBotActiveStep === TgBotActiveStep.COMFIRM) {
    return <CreationBotConfirmation />
  }
  return null
}

const GuidePage = () => {
  return (
    <ValuesProvider>
      <Guide />
    </ValuesProvider>
  )
}

export default GuidePage
