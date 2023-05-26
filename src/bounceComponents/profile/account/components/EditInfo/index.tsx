import { Button, OutlinedInput, Typography } from '@mui/material'
import { Box, Stack } from '@mui/system'
import * as yup from 'yup'
import { Form, Formik } from 'formik'
import React, { useState } from 'react'
import { useCountDown, useRequest } from 'ahooks'
import { toast } from 'react-toastify'
import { changeEmail, verifyCode } from 'api/user'
import { IChangeEmailParams } from 'api/user/type'
import { isEmail } from 'utils'
import { fetchUserInfo } from 'state/users/reducer'
import { useDispatch } from 'react-redux'
import FormItem from 'bounceComponents/common/FormItem'
import { LoadingButton } from '@mui/lab'
import { ReactComponent as SuccessSvg } from 'assets/svg/success_small.svg'

export type IEditInfoProps = {
  userInfoEmail: string
  userId?: number | string
  handleEmailChange?: () => void
}

const EditInfo: React.FC<IEditInfoProps> = ({ userInfoEmail, userId, handleEmailChange }) => {
  const [mode, setMode] = useState<'unset' | 'set' | 'input1' | 'input2'>(!!userInfoEmail ? 'set' : 'unset')
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
        return mode === 'set' || val !== userInfoEmail
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
        {({ values, setFieldValue, errors }) => (
          <Box>
            <Stack
              component={Form}
              sx={{
                mb: 10
              }}
            >
              <Typography mb={8} className="PSans" fontWeight={600} fontSize={20} color={'var(--ps-black)'}>
                Email
              </Typography>

              <FormItem name="email" required label="Email" style={{ marginBottom: 16 }}>
                <OutlinedInput
                  value={values.email}
                  onChange={e => setFieldValue('email', e.target.value)}
                  readOnly={mode === 'set'}
                  sx={{
                    height: 54,
                    background: '#F6F7F3'
                  }}
                  endAdornment={
                    mode === 'set' ? (
                      <Box display={'flex'} alignItems={'center'}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="12" cy="12" r="12" fill="#20994B" />
                          <path d="M7.5 12.7181L10.6702 15.5L16.5 8.5" stroke="white" strokeLinecap="round" />
                        </svg>
                        <Typography
                          ml={5}
                          sx={{ cursor: 'pointer' }}
                          onClick={() => {
                            setMode('input1')
                            setFieldValue('email', '')
                          }}
                        >
                          Replace
                        </Typography>
                      </Box>
                    ) : (
                      <Button
                        sx={{
                          minWidth: 'max-content',
                          height: 30,
                          color:
                            errors.email || !values.email || showCountDown ? 'var(--ps-text-2)' : 'var(--ps-black)',
                          fontWeight: 600,
                          fontSize: 14,
                          '&:hover': {
                            border: 'none',
                            backgroundColor: 'transparent'
                          }
                        }}
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
                          setMode('input2')
                        }}
                        variant="text"
                      >
                        {showCountDown ? `Verification code sent (${Math.round(countdown / 1000)}s)` : 'Send A Code'}
                      </Button>
                    )
                  }
                />
              </FormItem>

              {mode === 'input2' && (
                <FormItem name="code" required>
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
