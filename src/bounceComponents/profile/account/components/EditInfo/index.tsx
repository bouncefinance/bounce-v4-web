import { Button, IconButton, OutlinedInput, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import * as yup from 'yup'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useCountDown, useRequest } from 'ahooks'
import { toast } from 'react-toastify'
import { ReactComponent as EmailSVG } from 'assets/imgs/profile/links/email40.svg'
import { changeEmail, verifyCode } from 'api/user'
import { IChangeEmailParams } from 'api/user/type'
import { isEmail } from 'utils'
import { fetchUserInfo } from 'state/users/reducer'
import { useDispatch } from 'react-redux'
import { Cancel } from '@mui/icons-material'
import FormItem from 'bounceComponents/common/FormItem'
import { LoadingButton } from '@mui/lab'
import { ReactComponent as SuccessSvg } from 'assets/svg/success_small.svg'

export type IEditInfoProps = {
  userInfoEmail: string
  userId?: number | string
  handleEmailChange?: () => void
}

const EditInfo: React.FC<IEditInfoProps> = ({ userInfoEmail, userId, handleEmailChange }) => {
  const [mode, setMode] = useState<'unset' | 'set' | 'input'>(!!userInfoEmail ? 'set' : 'unset')
  const [showUpdateSuccess, setShowUpdateSuccess] = useState(false)
  const [btnDisable, setBtnDisable] = useState<boolean>(true)
  const [showCountDown, setShowCountDown] = useState<number>()
  const dispatch = useDispatch()
  const [countdown] = useCountDown({
    targetDate: showCountDown,
    onEnd: () => {
      setShowCountDown(undefined)
    }
  })

  const validationSchema = yup.object({
    email: yup
      .string()
      .trim()
      .required('Please enter your email address')
      .email('Incorrect email address')
      .test('CHECK_EMAIL', 'Email must be inconsistent', val => {
        return val !== userInfoEmail
      }),
    code: yup
      .string()
      .trim()
      .required('Please enter your email verification code')
      .length(6, 'Email verification code should contain 6 characters')
  })

  const initialValues = {
    email: userInfoEmail,
    code: ''
  }
  const { run: handleChangeEmail, loading } = useRequest(async (params: IChangeEmailParams) => changeEmail(params), {
    manual: true,
    onSuccess: response => {
      const { code } = response
      if (code === 200) {
        toast.success('Email successfully changed.')
        dispatch(
          fetchUserInfo({
            userId
          })
        )
        setShowUpdateSuccess(true)
        setTimeout(() => {
          setMode('set')
          setShowUpdateSuccess(false)
          handleEmailChange && handleEmailChange()
        }, 2000)
      } else if (code === 10501) {
        return toast.error('Incorrect verification code')
      } else if (code === 10400) {
        return toast.error('The email is already in use')
      } else if (code === 10500) {
        return toast.error('Please wait one minute and try again')
      } else {
        return toast.error('Please try again')
      }
      return
    }
  })

  const handleSubmit = (values: typeof initialValues) => {
    handleChangeEmail({ email: values.email, verifyCode: values.code })
  }

  const { run: sendVerifyCode } = useRequest(async (email: string) => verifyCode({ email, codeType: 1 }), {
    manual: true,
    onSuccess: response => {
      const { code } = response
      if (code !== 200) {
        return toast.error('Please wait one minute and try again')
      } else {
        setBtnDisable(false)
        return toast.success('Send successfully')
      }
    }
  })

  return (
    <Box mt={40}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {({ values, setFieldValue }) => (
          <Box>
            <Stack
              component={Form}
              sx={{
                mb: 10,
                borderBottom: '1px solid rgba(18, 18, 18, 0.2)'
              }}
            >
              <Box display={'flex'} height={80} alignItems={'center'} justifyContent={'space-between'}>
                <Box display={'flex'} alignItems="center">
                  <EmailSVG />
                  <Typography variant="body1" color={'var(--ps-text-3)'} ml={10}>
                    Email
                  </Typography>
                </Box>
                <>
                  <Box display={'flex'} alignItems={'center'}>
                    {mode === 'input' && (
                      <>
                        <FormItem name="email" required>
                          <OutlinedInput
                            value={values.email}
                            onChange={e => setFieldValue('email', e.target.value)}
                            sx={{
                              width: 160,
                              height: 34,
                              background: '#F6F7F3',
                              borderRadius: '100px'
                            }}
                          />
                        </FormItem>
                        {countdown === 0 ? (
                          <Box
                            sx={{ display: 'flex', cursor: 'pointer', mx: 15 }}
                            onClick={() => {
                              if (!values.email || !isEmail(values.email)) {
                                toast('Incorrect email address')
                                return
                              }
                              if (values.email === userInfoEmail) {
                                toast('Email must be inconsistent')
                                return
                              }
                              sendVerifyCode(values.email)
                              setShowCountDown(Date.now() + 60000)
                            }}
                          >
                            <Typography variant="body1" color={'var(--ps-text-3)'}>
                              Get code
                            </Typography>
                          </Box>
                        ) : (
                          <Typography mx={15} variant="body1" color={'var(--ps-gray-900)'}>
                            Verification code sent ({Math.round(countdown / 1000)}s)
                          </Typography>
                        )}
                      </>
                    )}
                    {mode === 'set' && <Typography>{userInfoEmail}</Typography>}
                    {mode !== 'unset' && (
                      <IconButton
                        onClick={() => {
                          setMode(mode === 'input' ? (userInfoEmail ? 'set' : 'unset') : 'input')
                        }}
                      >
                        <Cancel sx={{ color: '#000' }} />
                      </IconButton>
                    )}
                  </Box>
                  {mode === 'unset' && (
                    <Button
                      sx={{ width: 102, height: 32, backgroundColor: 'var(--ps-yellow-1)' }}
                      onClick={() => setMode('input')}
                    >
                      Connect
                    </Button>
                  )}
                </>
              </Box>
              {mode === 'input' && (
                <FormItem name="code" required style={{ marginBottom: 30 }}>
                  <OutlinedInput
                    placeholder="Email verification code"
                    endAdornment={
                      <LoadingButton
                        variant="contained"
                        type="submit"
                        disabled={btnDisable}
                        loading={loading}
                        sx={{
                          width: 87,
                          height: 32
                        }}
                      >
                        {showUpdateSuccess ? <SuccessSvg /> : 'Verify'}
                      </LoadingButton>
                    }
                    sx={{
                      height: 54,
                      backgroundColor: 'var(--ps-text-8)',
                      borderRadius: 10
                    }}
                  />
                </FormItem>
              )}
            </Stack>
          </Box>
        )}
      </Formik>
    </Box>
  )
}

export default EditInfo
