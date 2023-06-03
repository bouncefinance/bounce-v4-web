import { Box, Stack } from '@mui/material'
import TokenERC1155InforationForm from 'bounceComponents/create-auction-pool/TokenERC1155InforationForm'
import Auction1155ParametersForm from 'bounceComponents/create-auction-pool/Auction1155ParametersForm'
import AddIReleaseTypeAdvanced from 'bounceComponents/create-auction-pool/AdvancedSettingsForm/AddIReleaseTypeAdvanced'
import Creation1155Confirmation from 'bounceComponents/create-auction-pool/Creation1155Confirmation'
import { CreationStep } from 'bounceComponents/create-auction-pool/types'
import { useValuesState } from 'bounceComponents/create-auction-pool/ValuesProvider'

export default function Erc1155Pool() {
  const valuesState = useValuesState()
  return (
    <Stack alignItems="center">
      {valuesState.activeStep !== CreationStep.CREATION_CONFIRMATION ? (
        <Box sx={{ pb: 48, maxWidth: 660, width: '100%' }}>
          {valuesState.activeStep === CreationStep.TOKEN_INFORMATION && <TokenERC1155InforationForm />}

          {valuesState.activeStep === CreationStep.AUCTION_PARAMETERS && <Auction1155ParametersForm />}

          {valuesState.activeStep === CreationStep.ADVANCED_SETTINGS && <AddIReleaseTypeAdvanced />}
        </Box>
      ) : (
        <Creation1155Confirmation />
      )}
    </Stack>
  )
}
