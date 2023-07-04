import { Box, Stack } from '@mui/material'
import TokenInformationForm from 'bounceComponents/create-auction-pool/TokenInforationForm'
import AddIReleaseTypeAdvanced from 'bounceComponents/create-auction-pool/AdvancedSettingsForm/AddIReleaseTypeAdvanced'
import CreationConfirmation from 'bounceComponents/create-auction-pool/CreationConfirmation'
import { CreationStep } from 'bounceComponents/create-auction-pool/types'
import { useValuesState } from 'bounceComponents/create-auction-pool/ValuesProvider'
import Erc20EnglishAuctionParametersForm from 'bounceComponents/create-auction-pool/Erc20EnglishAuctionParametersForm'

export default function Erc20EnglishAuctionPool() {
  const valuesState = useValuesState()
  return (
    <Stack alignItems="center">
      {valuesState.activeStep !== CreationStep.CREATION_CONFIRMATION ? (
        <Box sx={{ pb: 48, maxWidth: 660, width: '100%' }}>
          {valuesState.activeStep === CreationStep.TOKEN_INFORMATION && (
            <TokenInformationForm title="English Auction" />
          )}
          {valuesState.activeStep === CreationStep.AUCTION_PARAMETERS && <Erc20EnglishAuctionParametersForm />}
          {valuesState.activeStep === CreationStep.ADVANCED_SETTINGS && <AddIReleaseTypeAdvanced />}
        </Box>
      ) : (
        <CreationConfirmation />
      )}
    </Stack>
  )
}
