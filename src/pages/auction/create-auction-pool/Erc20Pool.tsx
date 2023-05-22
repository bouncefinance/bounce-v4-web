import { Box, Stack } from '@mui/material'
import TokenInformationForm from 'bounceComponents/create-auction-pool/TokenInforationForm'
import AuctionParametersForm from 'bounceComponents/create-auction-pool/AuctionParametersForm'
import AdvancedSettingsForm from 'bounceComponents/create-auction-pool/AdvancedSettingsForm'
import CreationConfirmation from 'bounceComponents/create-auction-pool/CreationConfirmation'
import { CreationStep } from 'bounceComponents/create-auction-pool/types'
import { useValuesState } from 'bounceComponents/create-auction-pool/ValuesProvider'

export default function Erc20Pool() {
  const valuesState = useValuesState()
  return (
    <Stack alignItems="center">
      {valuesState.activeStep !== CreationStep.CREATION_CONFIRMATION ? (
        <Box sx={{ pb: 48, maxWidth: 660, width: '100%' }}>
          {valuesState.activeStep === CreationStep.TOKEN_INFORMATION && <TokenInformationForm />}

          {valuesState.activeStep === CreationStep.AUCTION_PARAMETERS && <AuctionParametersForm />}

          {valuesState.activeStep === CreationStep.ADVANCED_SETTINGS && <AdvancedSettingsForm hideRefundable />}
        </Box>
      ) : (
        <CreationConfirmation />
      )}
    </Stack>
  )
}
