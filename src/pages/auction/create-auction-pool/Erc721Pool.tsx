import { Box, Stack } from '@mui/material'
import TokenERC721InformationForm from 'bounceComponents/create-auction-pool/TokenERC721InformationForm'
import Auction721ParametersForm from 'bounceComponents/create-auction-pool/Auction721ParametersForm'
import AdvancedSettingsForm from 'bounceComponents/create-auction-pool/AdvancedSettingsForm'
import Creation721Confirmation from 'bounceComponents/create-auction-pool/Creation721Confirmation'
import { CreationStep } from 'bounceComponents/create-auction-pool/types'
import { useValuesState } from 'bounceComponents/create-auction-pool/ValuesProvider'

export default function Erc721Pool() {
  const valuesState = useValuesState()
  return (
    <Stack alignItems="center">
      {valuesState.activeStep !== CreationStep.CREATION_CONFIRMATION ? (
        <Box sx={{ pb: 48, maxWidth: 710, width: '100%' }}>
          {valuesState.activeStep === CreationStep.TOKEN_INFORMATION && <TokenERC721InformationForm />}

          {valuesState.activeStep === CreationStep.AUCTION_PARAMETERS && <Auction721ParametersForm />}

          {valuesState.activeStep === CreationStep.ADVANCED_SETTINGS && <AdvancedSettingsForm hideRefundable />}
        </Box>
      ) : (
        <Creation721Confirmation />
      )}
    </Stack>
  )
}
