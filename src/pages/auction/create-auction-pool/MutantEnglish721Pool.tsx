import { Box, Stack } from '@mui/material'
import TokenERC721InformationForm from 'bounceComponents/create-auction-pool/TokenERC721InformationForm'
import { CreationStep } from 'bounceComponents/create-auction-pool/types'
import { useValuesState } from 'bounceComponents/create-auction-pool/ValuesProvider'
import MutantEnglish721ParametersForm from 'bounceComponents/create-auction-pool/MutantEnglish721ParametersForm'
import MutantEnglishSettingsForm from 'bounceComponents/create-auction-pool/AdvancedSettingsForm/MutantEnglishSettingsForm'
import CreationMutantEnglish721Confirmation from 'bounceComponents/create-auction-pool/CreationMutantEnglish721Confirmation'

export default function MutantEnglish721Pool() {
  const valuesState = useValuesState()
  return (
    <Stack alignItems="center">
      {valuesState.activeStep !== CreationStep.CREATION_CONFIRMATION ? (
        <Box sx={{ pb: 48, maxWidth: 710, width: '100%' }}>
          {valuesState.activeStep === CreationStep.TOKEN_INFORMATION && <TokenERC721InformationForm />}
          {valuesState.activeStep === CreationStep.AUCTION_PARAMETERS && <MutantEnglish721ParametersForm />}
          {valuesState.activeStep === CreationStep.ADVANCED_SETTINGS && <MutantEnglishSettingsForm hideRefundable />}
        </Box>
      ) : (
        <CreationMutantEnglish721Confirmation />
      )}
    </Stack>
  )
}
