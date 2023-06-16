import { Box, OutlinedInput, Stack, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { LoadingButton } from '@mui/lab'
import FormItem from 'bounceComponents/common/FormItem'
import { useUpdateBasic } from 'bounceHooks/profile/useUpdateBasic'
import UploadItem, { StyledAvatarInputIdLabel } from 'bounceComponents/common/UploadCard/UploadItem'
import LocationTimeZone from 'bounceComponents/common/LocationTimeZone'
// import DefaultAvaSVG from 'assets/imgs/components/defaultAva.svg'
import { FormType } from 'api/profile/type'
import { formCheckValid } from 'utils'
import { useUserInfo } from 'state/users/hooks'

import { IProfileOverviewValue, SocialEditLinks, sxInputStyle } from './ProfileOverview'
import { FirstLoginNextButtonGroup } from 'pages/login/FirstLoginInfo'
import { useQueryParams } from 'hooks/useQueryParams'
import { useNavigate } from 'react-router-dom'
import useBreakpoint from '../../hooks/useBreakpoint'

const DESCRIPTION_LENGTH = 350

const validationSchema = yup.object({
  avatar: yup.object({
    fileName: yup.string(),
    fileSize: yup.number(),
    fileThumbnailUrl: yup.string(),
    fileType: yup.string(),
    fileUrl: yup.string().required('Please upload your Profile Picture'),
    id: yup.number()
  }),
  fullName: yup
    .string()
    .trim()
    .required(formCheckValid('Full name', FormType.Input))
    .max(300, 'Allow only no more than 300 letters')
    .matches(/^[^\u4E00-\u9FA5]+$/g, 'Incorrect full name'),
  description: yup.string().trim().max(DESCRIPTION_LENGTH, `Allow only no more than ${DESCRIPTION_LENGTH} letters`),
  location: yup.string().required(formCheckValid('location（time zone）', FormType.Select)),
  website: yup.string().trim().url('Please enter a valid URL'),
  github: yup.string().trim().url('Please enter a valid URL'),
  discord: yup.string().trim().url('Please enter a valid URL'),
  instagram: yup.string().trim().url('Please enter a valid URL')
})

export default function FirstProfileOverview() {
  const { userInfo } = useUserInfo()
  const { redirect } = useQueryParams()
  const navigate = useNavigate()
  const isMobile = useBreakpoint('md')

  const { loading, runAsync: runUpdateBasic } = useUpdateBasic()

  const initialValues: IProfileOverviewValue = {
    avatar: userInfo?.avatar || {
      fileName: '',
      fileSize: 0,
      fileThumbnailUrl: '',
      fileType: '',
      fileUrl: '',
      id: 0
    },
    fullName: userInfo?.fullName || '',
    description: userInfo?.description || '',

    location: userInfo?.location || '',
    website: userInfo?.website || '',
    github: userInfo?.github || '',
    discord: userInfo?.discord || '',
    instagram: userInfo?.instagram || ''
  }

  const handleSubmit = (values: any) => {
    runUpdateBasic(values).then(() => {
      if (redirect) {
        navigate(redirect)
      } else {
        navigate('/')
      }
    })
  }

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ values, setFieldValue }) => {
        return (
          <Stack mt={40} component={Form} spacing={20} noValidate>
            <FormItem
              label="Profile Picture"
              name="avatar"
              tips="(JPEG, PNG, WEBP Files, Size<10M)"
              fieldType="custom"
              sx={{
                display: 'flex',
                '& label': {
                  position: 'absolute',
                  left: 134,
                  top: 0,
                  fontSize: 14,
                  color: 'var(--ps-gray-900)'
                },
                '&>p': {
                  position: 'absolute',
                  left: 134,
                  top: 38,
                  fontSize: 12,
                  color: 'var(--ps-gray-600)'
                }
              }}
            >
              <Box>
                <UploadItem
                  value={{
                    fileUrl: values.avatar.fileThumbnailUrl || values.avatar.fileUrl
                  }}
                  inputId="avatarInputId"
                  onChange={file => {
                    setFieldValue('avatar', file)
                  }}
                  sx={{ width: 120, height: 120, display: 'flex', borderRadius: '50%', objectFit: 'cover' }}
                  accept={['image/jpeg', 'image/png', 'image/webp']}
                  tips={'Only JPEG, PNG, WEBP Files, Size<10M'}
                  limitSize={10}
                />
                <StyledAvatarInputIdLabel style={{ top: 75, left: 148 }} htmlFor="avatarInputId">
                  Edit
                </StyledAvatarInputIdLabel>
              </Box>
            </FormItem>

            <Box>
              <Stack spacing={16}>
                <FormItem sx={sxInputStyle} name="fullName" label="Username" required>
                  <OutlinedInput />
                </FormItem>
                <FormItem sx={sxInputStyle} name="location" label="Location (Time Zone)" required fieldType="custom">
                  <LocationTimeZone value={values.location} onChange={val => setFieldValue('location', val)} />
                </FormItem>
                <FormItem sx={sxInputStyle} name="description" label=" ">
                  <OutlinedInput
                    placeholder="Introduce yourself..."
                    multiline
                    endAdornment={
                      <Typography
                        variant="body2"
                        className="endAdorn"
                      >{`${values.description?.length} / ${DESCRIPTION_LENGTH}`}</Typography>
                    }
                    inputProps={{ sx: { minHeight: 144 } }}
                  />
                </FormItem>
              </Stack>

              <Box mt={40}>
                <Typography variant="h5" fontSize={20} mb={40}>
                  Social links
                </Typography>
                <Stack spacing={20}>
                  <SocialEditLinks values={values} setFieldValue={setFieldValue} />
                </Stack>
              </Box>
            </Box>

            <FirstLoginNextButtonGroup
              continueButton={
                <LoadingButton
                  loading={loading}
                  loadingPosition="start"
                  startIcon={<></>}
                  variant="contained"
                  color="secondary"
                  sx={{ width: '100%', height: 52 }}
                  type="submit"
                >
                  Continue
                </LoadingButton>
              }
              isMobile={isMobile}
            />
          </Stack>
        )
      }}
    </Formik>
  )
}
