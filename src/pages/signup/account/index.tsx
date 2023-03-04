import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import * as yup from 'yup'
import { Formik, Form } from 'formik'
import { Box, IconButton, InputAdornment, OutlinedInput } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import md5 from 'md5'
import { ReactComponent as VisibilityOn } from 'assets/imgs/user/visibility_on.svg'
import { ReactComponent as VisibilityOff } from 'assets/imgs/user/visibility_off.svg'
import FormItem from 'bounceComponents/common/FormItem'

import LoginLayout from 'bounceComponents/signup/LoginLayout'
import { ACCOUNT_TYPE, USER_TYPE } from 'api/user/type'
import { useRegister } from 'bounceHooks/user/useRegister'
import { ThirdParties } from 'bounceComponents/signup/ThirdParties'
import { checkEmail } from 'api/user'

// export type IAccountProps = {}
const validationSchema = yup.object({
  email: yup
    .string()
    .trim()
    .required('Please enter your email address')
    .email('Incorrect email address')
    .test('CHECK_EMAIL', 'This email is registered', async value => {
      const { code, data } = await checkEmail({ email: value || '' })
      if (code === 200 && data?.exist) {
        return false
      }
      return true
    }),
  name: yup
    .string()
    .trim()
    .required('Please enter your full name')
    .matches(/^[^\u4E00-\u9FA5]+$/g, 'Incorrect full name')
    .max(300, 'Full name should contain 1-300 characters'),
  password: yup
    .string()
    .trim()
    .required('Please enter your password')
    .min(8, 'Password should contain 8-16 characters')
    .max(16, 'Password should contain 8-16 characters')
})

const Account: React.FC = ({}) => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword)
  }
  const initialValues = {
    password: '',
    name: '',
    email: ''
  }
  const { loading, runAsync: runRegister } = useRegister()
  const handleSubmit = (values: typeof initialValues) => {
    runRegister({
      password: md5(values.password.trim()),
      name: values.name.trim(),
      email: values.email.trim(),
      accessToken: '',
      registerType: ACCOUNT_TYPE.EMAIL,
      userType: USER_TYPE.USER
    })
  }

  const handleOauth = (accessToken: string, oauthType: ACCOUNT_TYPE) => {
    router.push({
      pathname: '/signup/thirdPartiesAccount',
      query: { accessToken, oauthType }
    })
  }
  return (
    <LoginLayout title={'Create Individual Account'} subTitle={<Link href={'/login'}>Sign in</Link>}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={validationSchema}>
        {() => (
          <Box component={Form} noValidate>
            <FormItem name="email" label="Email" required>
              <OutlinedInput />
            </FormItem>
            <FormItem name="name" label="Full name" sx={{ mt: 20 }} required>
              <OutlinedInput />
            </FormItem>
            <FormItem name="password" label="Password" sx={{ mt: 20 }} required>
              <OutlinedInput
                autoComplete="off"
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword}>
                      {showPassword ? <VisibilityOn /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormItem>
            <LoadingButton loading={loading} type="submit" fullWidth variant="contained" sx={{ mt: 32, mb: 32 }}>
              Continue
            </LoadingButton>
          </Box>
        )}
      </Formik>
      <ThirdParties text="or sign up with" onChange={handleOauth} />
    </LoginLayout>
  )
}

export default Account
