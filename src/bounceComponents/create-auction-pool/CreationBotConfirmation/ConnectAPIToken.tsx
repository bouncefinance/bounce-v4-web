import { Box, Button, Stack, Typography, styled, TextField } from '@mui/material'
import { useValuesDispatch, ActionType } from 'bounceComponents/create-auction-pool/ValuesProvider'
import { TgBotActiveStep } from 'bounceComponents/create-auction-pool/types'
import { Form, Formik } from 'formik'
import * as Yup from 'yup'
import FormItem from 'bounceComponents/common/FormItem'
import { useCallback } from 'react'
import { bindTgTokenApi } from 'api/pool'
import { BindTgTokenApiParams } from 'api/pool/type'
import { useUserInfo, useRefreshUserInfoCallback } from 'state/users/hooks'
import { useActiveWeb3React } from 'hooks'
import { useShowLoginModal } from 'state/users/hooks'

const MTextField = styled(TextField)`
  border: 0;
  & input {
    border-radius: 8px;
    background: var(--grey-06, #f6f6f3);
    border: 0;
  }
  & input:focus {
    border: 0;
  }
`

const ConfirmBtn = styled(Button)`
  display: flex;
  padding: 20px 40px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: var(--yellow, #e1f25c);
  border: 0;
  &:hover {
    border: 0;
  }
`
const internalInitialValues = {
  tgToken: ''
}
const validationSchema = Yup.object({
  tgToken: Yup.string().required('api token is required')
})

interface formValues {
  tgToken: string
}

const ConnectAPIToken = () => {
  const { account } = useActiveWeb3React()
  const showLoginModal = useShowLoginModal()
  const valuesDispatch = useValuesDispatch()
  const { userInfo } = useUserInfo()
  const refreshUserInfoCallback = useRefreshUserInfoCallback()

  const bindApiToken = useCallback(
    async (values: formValues) => {
      if (!account) {
        return showLoginModal()
      }
      const params: BindTgTokenApiParams = {
        tgToken: values.tgToken
      }
      try {
        const res = await bindTgTokenApi(params)
        console.log('bindTgTokenApi res', res)
        refreshUserInfoCallback()
        valuesDispatch({
          type: ActionType.SetTgToken,
          payload: {
            tgToken: values.tgToken
          }
        })
        valuesDispatch({
          type: ActionType.SetTgBotActiveStep,
          payload: {
            tgBotActiveStep: TgBotActiveStep.GUIDEFORM
          }
        })
      } catch (error) {
        console.log('bindTgTokenApi error', error)
      }
    },
    [account, refreshUserInfoCallback, showLoginModal, valuesDispatch]
  )

  if (account && userInfo?.tg_token) {
    valuesDispatch({
      type: ActionType.SetTgBotActiveStep,
      payload: {
        tgBotActiveStep: TgBotActiveStep.GUIDEFORM
      }
    })
  }
  return (
    <Box
      sx={{
        width: 900,
        borderRadius: '20px',
        background: '#E8E9E4',
        margin: '73px auto 93px',
        padding: '50px 40px'
      }}
    >
      <Box
        sx={{
          padding: '20px'
        }}
        mb={50}
      >
        <Typography
          sx={{
            color: '#000',
            fontFamily: `'Inter'`,
            fontSize: 22
          }}
          mb={20}
        >
          What can this bot do?
        </Typography>
        <Typography
          sx={{
            color: '#000',
            fontFamily: `'Inter'`,
            fontSize: 18
          }}
        >
          Bounce TGBot can help you quickly send transaction tokens through telegram. It can be done in just three easy
          steps.
        </Typography>
      </Box>
      <Box
        sx={{
          padding: '0 20px'
        }}
      >
        <Typography
          sx={{
            color: '#000',
            fontFamily: `'Inter'`,
            fontSize: 18
          }}
          mb={20}
        >
          {`1.Go to @BotFather. Press his name to do that and then press 'Send Messege' if it's needed. `}
          <br></br>
          {`2.Create a new bot with him. To do this use the 'newbot' command inside @BotFather. `}
          <br></br>
          {`3.Copy the API token that @BotFather will give you. `}
          <br></br>
          {`4.Come back to here and send the copied API token here.`}
        </Typography>
      </Box>
      <Button color="secondary" variant="contained" sx={{ width: '100%', margin: '40px 0' }}>
        Go to @BotFather
      </Button>
      <Typography
        component={'p'}
        sx={{
          color: '#121212',
          fontFamily: `Public Sans`,
          fontSize: '20px',
          lineHeight: '20px',
          width: '100%',
          marginBottom: '12px',
          fontWeight: 600
        }}
      >{`I've got the API token`}</Typography>
      <Formik
        initialValues={internalInitialValues}
        validationSchema={validationSchema}
        onSubmit={values => {
          console.log('values>>>', values)
          bindApiToken(values)
        }}
      >
        {({ values }) => (
          <Stack component={Form} direction={'row'} justifyContent={'center'} gap={'8px'}>
            <Stack width={'100%'} gap={8} direction={'row'}>
              <FormItem error={true} sx={{ width: '100%' }} name="tgToken" required>
                <MTextField
                  sx={{ marginTop: '5px' }}
                  variant="outlined"
                  value={values.tgToken}
                  inputProps={{ readOnly: false }}
                />
              </FormItem>
              <ConfirmBtn type="submit">Confirm</ConfirmBtn>
            </Stack>
          </Stack>
        )}
      </Formik>
    </Box>
  )
}

export default ConnectAPIToken
