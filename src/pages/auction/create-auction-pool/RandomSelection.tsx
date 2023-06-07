import { Box, Stack } from '@mui/material'
import TokenInformationForm from 'bounceComponents/create-auction-pool/TokenInforationForm'
import RandomSelectionAuctionParametersForm from 'bounceComponents/create-auction-pool/RandomSelectionAuctionParametersForm'
import AdvancedSettingsForm from 'bounceComponents/create-auction-pool/AdvancedSettingsForm'
import CreationRandomSelectionConfirmation from 'bounceComponents/create-auction-pool/CreationRandomSelectionConfirmation'
import { CreationStep } from 'bounceComponents/create-auction-pool/types'
import { useValuesState } from 'bounceComponents/create-auction-pool/ValuesProvider'

export default function RandomSelection() {
  const valuesState = useValuesState()
  return (
    <Stack alignItems="center">
      {valuesState.activeStep !== CreationStep.CREATION_CONFIRMATION ? (
        <Box sx={{ pb: 48, maxWidth: 660, width: '100%' }}>
          {valuesState.activeStep === CreationStep.TOKEN_INFORMATION && (
            <TokenInformationForm title={'Random Selection Auction'} />
          )}
          {valuesState.activeStep === CreationStep.AUCTION_PARAMETERS && <RandomSelectionAuctionParametersForm />}
          {valuesState.activeStep === CreationStep.ADVANCED_SETTINGS && <AdvancedSettingsForm hideRefundable />}
        </Box>
      ) : (
        <CreationRandomSelectionConfirmation />
      )}
    </Stack>
  )
}
