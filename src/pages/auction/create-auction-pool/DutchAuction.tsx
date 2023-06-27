import { Box, Stack } from '@mui/material'
import TokenInformationForm from 'bounceComponents/create-auction-pool/TokenInforationForm'
import AddIReleaseTypeAdvanced from 'bounceComponents/create-auction-pool/AdvancedSettingsForm/AddIReleaseTypeAdvanced'
import { CreationStep } from 'bounceComponents/create-auction-pool/types'
import { useValuesState } from 'bounceComponents/create-auction-pool/ValuesProvider'
import DutchAuctionParametersForm from 'bounceComponents/create-auction-pool/DutchAuctionParametersForm'
import CreationDutchAuctionConfirmation from 'bounceComponents/create-auction-pool/CreationDutchAuctionConfirmation'

export default function DutchAuction() {
  const valuesState = useValuesState()
  return (
    <Stack alignItems="center">
      {valuesState.activeStep !== CreationStep.CREATION_CONFIRMATION ? (
        <Box sx={{ pb: 48, maxWidth: 660, width: '100%' }}>
          {valuesState.activeStep === CreationStep.TOKEN_INFORMATION && <TokenInformationForm title="Dutch Auction" />}

          {valuesState.activeStep === CreationStep.AUCTION_PARAMETERS && <DutchAuctionParametersForm />}

          {valuesState.activeStep === CreationStep.ADVANCED_SETTINGS && <AddIReleaseTypeAdvanced />}
        </Box>
      ) : (
        <CreationDutchAuctionConfirmation />
      )}
    </Stack>
  )
}
