import { Box, Button, Stack, Typography, styled, Grid } from '@mui/material'
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
import { ReactComponent as TgLeft } from 'assets/svg/tg_left.svg'
import Input from 'components/Input'
import useBreakpoint from 'hooks/useBreakpoint'

const CusInput = styled(Input)`
  border: 0;

  &.MuiInputBase-root {
    padding: 0;
  }

  & input {
    border-radius: 8px;
    background: var(--grey-06, #f6f6f3);
    color: var(--grey-03, var(--grey-03, #959595));
    border: 0;
    padding: 20px 16px;
    font-size: 14px;
  }
  & input:focus {
    border: 0;
  }

  .Mui-error {
    margin-top: 10px;
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

const TwoColumnPanel = ({ children }: { children: JSX.Element }) => {
  return (
    <Box width={'100%'} mt={24} mb={68} height={'552px'} display={'flex'} justifyContent={'center'}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          maxWidth: '544px',
          background: 'var(--yellow, #E1F25C)',
          borderRadius: '24px 0 0 24px'
        }}
      >
        <TgLeft />
      </Box>
      <Box
        sx={{
          width: '100%',
          borderRadius: '0 24px 24px 0',
          background: '#fff',
          padding: '56px 0px 0'
        }}
      >
        <Box
          sx={{
            minWidth: '600px',
            padding: '0 56px 0',
            height: '100%',
            overflowY: 'scroll'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

const MobileContainer = ({ children }: { children: JSX.Element }) => {
  return (
    <Box width={'100%'} padding={16} display={'flex'} justifyContent={'center'}>
      <Box
        sx={{
          width: '100%',
          borderRadius: '16px',
          background: '#fff',
          padding: '24px 16px'
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

const CusTopTip = styled(Typography)`
  display: flex;
  height: 160px;
  padding: 20px 20px 40px 20px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  flex: 1 0 0;
  border-radius: 8px;
  background: var(--grey-06, #f6f6f3);
  color: #000;
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
  @media (max-width: 860px) {
    height: 140px;
    padding: 16px 16px 40px 16px;
  }
`

const CircleBorder = styled(Typography)`
  display: flex;
  width: 30px;
  height: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 100px;
  border: 1px solid #000;
  color: #000;
  font-family: Public Sans;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18px */
  letter-spacing: -0.24px;
  text-transform: capitalize;

  @media (max-width: 860px) {
    width: 24px;
    height: 24px;
  }
`

const DividingLine = styled(Box)`
  width: 100%;
  height: 1px;
  opacity: 0.7;
  background: #d4d6cf;
  margin: 30px 0;
`

interface formValues {
  tgToken: string
}

const ConnectAPIToken = () => {
  const isMobile = useBreakpoint('md')
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
  const toBotFather = useCallback(() => {
    window.open('https://telegram.me/BotFather')
  }, [])

  if (account && userInfo?.tg_token) {
    valuesDispatch({
      type: ActionType.SetTgBotActiveStep,
      payload: {
        tgBotActiveStep: TgBotActiveStep.GUIDEFORM
      }
    })
  }

  return (
    <>
      {isMobile ? (
        <MobileContainer>
          <Box mb={56}>
            <Box gap={16}>
              <Typography
                sx={{
                  color: '#000',
                  fontFamily: `'Public Sans'`,
                  fontSize: 28,
                  fontWeight: 600
                }}
              >
                What can this bot do?
              </Typography>
              <Typography
                sx={{
                  color: '#626262',
                  fontFamily: `'Inter'`,
                  fontSize: 14
                }}
              >
                Bounce TGBot can help you quickly send transaction tokens through telegram. It can be done in just three
                easy steps.
              </Typography>
            </Box>
            <Grid mt={32} container spacing={16}>
              <Grid item xs={12}>
                <CusTopTip>
                  <CircleBorder>1</CircleBorder>
                  <Typography fontWeight={400} fontFamily={'Inter'} fontSize={14} component={'span'}>
                    {`Go to `}
                    <a style={{ color: '#1B52E1' }} href="https://telegram.me/BotFather">{`@BotFather. `}</a>
                    {`Press his name to do that and then press 'Send Messege' if it's needed.`}
                  </Typography>
                </CusTopTip>
              </Grid>
              <Grid item xs={12}>
                <CusTopTip>
                  <CircleBorder>2</CircleBorder>
                  <Typography fontWeight={400} fontFamily={'Inter'} fontSize={14} component={'span'}>
                    {`Create a new bot with him. To do this use the 'newbot' command inside @BotFather. `}
                  </Typography>
                </CusTopTip>
              </Grid>
              <Grid item xs={12}>
                <CusTopTip>
                  <CircleBorder>3</CircleBorder>
                  <Typography fontWeight={400} fontFamily={'Inter'} fontSize={14} component={'span'}>
                    {`Copy the API token that @BotFather will give you.`}
                  </Typography>
                </CusTopTip>
              </Grid>
              <Grid item xs={12}>
                <CusTopTip>
                  <CircleBorder>4</CircleBorder>
                  <Typography fontWeight={400} fontFamily={'Inter'} fontSize={14} component={'span'}>
                    {`Come back to here and send the copied API token here.`}
                  </Typography>
                </CusTopTip>
              </Grid>
            </Grid>
            <Button
              onClick={() => toBotFather()}
              color="secondary"
              variant="contained"
              sx={{ marginTop: '20px', width: '100%', height: 42 }}
            >
              Go to @BotFather
            </Button>
            <DividingLine />
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
                bindApiToken(values)
              }}
            >
              {({ values }) => (
                <Stack component={Form} direction={'row'} justifyContent={'center'} gap={'8px'}>
                  <Stack width={'100%'} gap={8}>
                    <FormItem sx={{ width: '100%' }} name="tgToken" required>
                      <CusInput sx={{ marginTop: '5px' }} value={values.tgToken} />
                    </FormItem>
                    <ConfirmBtn type="submit">Confirm</ConfirmBtn>
                  </Stack>
                </Stack>
              )}
            </Formik>
          </Box>
        </MobileContainer>
      ) : (
        <TwoColumnPanel>
          <Box mb={56}>
            <Box gap={16}>
              <Typography
                sx={{
                  color: '#000',
                  fontFamily: `'Public Sans'`,
                  fontSize: 28,
                  fontWeight: 600
                }}
              >
                What can this bot do?
              </Typography>
              <Typography
                sx={{
                  color: '#626262',
                  fontFamily: `'Inter'`,
                  fontSize: 14
                }}
              >
                Bounce TGBot can help you quickly send transaction tokens through telegram. It can be done in just three
                easy steps.
              </Typography>
            </Box>
            <Grid mt={32} container spacing={16}>
              <Grid item xs={6}>
                <CusTopTip>
                  <CircleBorder>1</CircleBorder>
                  <Typography fontWeight={400} fontFamily={'Inter'} fontSize={14} component={'span'}>
                    {`Go to `}
                    <a style={{ color: '#1B52E1' }} href="https://telegram.me/BotFather">{`@BotFather. `}</a>
                    {`Press his name to do that and then press 'Send Messege' if it's needed.`}
                  </Typography>
                </CusTopTip>
              </Grid>
              <Grid item xs={6}>
                <CusTopTip>
                  <CircleBorder>2</CircleBorder>
                  <Typography fontWeight={400} fontFamily={'Inter'} fontSize={14} component={'span'}>
                    {`Create a new bot with him. To do this use the 'newbot' command inside @BotFather. `}
                  </Typography>
                </CusTopTip>
              </Grid>
              <Grid item xs={6}>
                <CusTopTip>
                  <CircleBorder>3</CircleBorder>
                  <Typography fontWeight={400} fontFamily={'Inter'} fontSize={14} component={'span'}>
                    {`Copy the API token that @BotFather will give you.`}
                  </Typography>
                </CusTopTip>
              </Grid>
              <Grid item xs={6}>
                <CusTopTip>
                  <CircleBorder>4</CircleBorder>
                  <Typography fontWeight={400} fontFamily={'Inter'} fontSize={14} component={'span'}>
                    {`Come back to here and send the copied API token here.`}
                  </Typography>
                </CusTopTip>
              </Grid>
            </Grid>
            <Button
              onClick={() => toBotFather()}
              color="secondary"
              variant="contained"
              sx={{ marginTop: '20px', width: '100%' }}
            >
              Go to @BotFather
            </Button>
            <DividingLine />
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
                bindApiToken(values)
              }}
            >
              {({ values }) => (
                <Stack component={Form} direction={'row'} justifyContent={'center'} gap={'8px'}>
                  <Stack width={'100%'} gap={8} direction={'row'}>
                    <FormItem sx={{ width: '100%' }} name="tgToken" required>
                      <CusInput sx={{ marginTop: '5px' }} value={values.tgToken} />
                    </FormItem>
                    <ConfirmBtn type="submit">Confirm</ConfirmBtn>
                  </Stack>
                </Stack>
              )}
            </Formik>
          </Box>
        </TwoColumnPanel>
      )}
    </>
  )
}

export default ConnectAPIToken
