import { Box, Button, IconButton, OutlinedInput, Stack, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import * as yup from 'yup'
import { LoadingButton } from '@mui/lab'
import FormItem from 'bounceComponents/common/FormItem'
import { useUpdateBasic } from 'bounceHooks/profile/useUpdateBasic'
import UploadItem from 'bounceComponents/common/UploadCard/UploadItem'
import LocationTimeZone from 'bounceComponents/common/LocationTimeZone'
// import DefaultAvaSVG from 'assets/imgs/components/defaultAva.svg'
import { FormType } from 'api/profile/type'
import { formCheckValid } from 'utils'
import { useUserInfo } from 'state/users/hooks'

import { ReactComponent as WebsiteSVG } from 'assets/imgs/profile/links/website.svg'
import { ReactComponent as GithubSVG } from 'assets/imgs/profile/links/github.svg'
import { ReactComponent as DiscordSVG } from 'assets/imgs/profile/links/discord.svg'
import { ReactComponent as InstagramSVG } from 'assets/imgs/profile/links/instagram.svg'
import { ReactNode, useState } from 'react'
import Divider from 'components/Divider'
import { Cancel } from '@mui/icons-material'

export interface ILinksItem {
  name: string
  label: string
  required: boolean
  icon: ReactNode | string
  autoComplete: string
}

const links: ILinksItem[] = [
  {
    name: 'website',
    label: 'Website',
    required: false,
    icon: <WebsiteSVG />,
    autoComplete: 'off'
  },
  {
    name: 'github',
    label: 'Github',
    required: false,
    icon: <GithubSVG />,
    autoComplete: 'off'
  },
  {
    name: 'discord',
    label: 'Discord',
    required: false,
    icon: <DiscordSVG />,
    autoComplete: 'off'
  },
  {
    name: 'instagram',
    label: 'Instagram',
    required: false,
    icon: <InstagramSVG />,
    autoComplete: 'off'
  }
]

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

export interface ISocialEditInputProp {
  website: string
  github: string
  discord: string
  instagram: string
}

interface IValue extends ISocialEditInputProp {
  avatar:
    | {
        id: number
        type: number
        userId: number
        fileName: string
        fileType: string
        fileSize: number
        fileUrl: string
        fileThumbnailUrl: string
      }
    | {
        fileName: string
        fileSize: number
        fileThumbnailUrl: string
        fileType: string
        fileUrl: string
        id: number
      }
  fullName: string
  description: string
  location: string
}

export default function ProfileOverview() {
  const { userInfo } = useUserInfo()

  const { loading, runAsync: runUpdateBasic } = useUpdateBasic()

  const initialValues: IValue = {
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
    runUpdateBasic(values)
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
          <Stack component={Form} spacing={20} noValidate>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography variant="h3" fontSize={36}>
                My Profile
              </Typography>

              <LoadingButton
                loading={loading}
                loadingPosition="start"
                startIcon={<></>}
                variant="contained"
                className="black-button"
                sx={{ width: 116, height: 52, textAlign: 'right' }}
                type="submit"
              >
                Save
              </LoadingButton>
            </Box>

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
              <UploadItem
                value={{
                  fileUrl: values.avatar.fileThumbnailUrl || values.avatar.fileUrl
                }}
                onChange={file => {
                  setFieldValue('avatar', file)
                }}
                sx={{ width: 120, height: 120, display: 'flex', borderRadius: '50%', objectFit: 'cover' }}
                accept={['image/jpeg', 'image/png', 'image/webp']}
                tips={'Only JPEG, PNG, WEBP Files, Size<10M'}
                limitSize={10}
              />
            </FormItem>

            <Box style={{ margin: '40px 0' }}>
              <Divider />
            </Box>

            <Box display={'grid'} gridTemplateColumns={{ sm: '1fr', md: '1fr 1fr' }} gap={55}>
              <Stack spacing={16}>
                <Typography variant="h5" fontSize={20} pb={15}>
                  Profile
                </Typography>

                <FormItem name="fullName" label="Username" required>
                  <OutlinedInput />
                </FormItem>
                <FormItem name="location" label="Location (Time Zone)" required fieldType="custom">
                  <LocationTimeZone value={values.location} onChange={val => setFieldValue('location', val)} />
                </FormItem>
                <FormItem name="description" label=" ">
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

              <Box>
                <Typography variant="h5" fontSize={20} mb={30}>
                  Social links
                </Typography>
                <Stack spacing={20}>
                  <SocialEditLinks values={values} setFieldValue={setFieldValue} />
                </Stack>
              </Box>
            </Box>
          </Stack>
        )
      }}
    </Formik>
  )
}

function SocialEditInput({ value, setValue }: { value: string; setValue: (val: string) => void }) {
  const [mode, setMode] = useState<'unset' | 'set' | 'input'>(!!value ? 'set' : 'unset')

  return (
    <>
      <Box display={mode !== 'unset' ? 'flex' : 'none'} alignItems={'center'}>
        {mode === 'input' && (
          <>
            <OutlinedInput
              value={value}
              onChange={e => setValue(e.target.value)}
              sx={{
                width: 160,
                height: 34,
                background: '#F6F7F3',
                borderRadius: '100px'
              }}
            />
            <Typography
              onClick={() => {
                if (value) {
                  setMode('set')
                }
              }}
              mx={20}
              sx={{ cursor: 'pointer' }}
            >
              Send
            </Typography>
          </>
        )}
        {mode === 'set' && <Typography>{value}</Typography>}
        <IconButton
          onClick={() => {
            setValue('')
            setMode('unset')
          }}
        >
          <Cancel sx={{ color: '#000' }} />
        </IconButton>
      </Box>
      {mode === 'unset' && (
        <Button sx={{ width: 102, height: 32 }} variant="contained" onClick={() => setMode('input')}>
          Connect
        </Button>
      )}
    </>
  )
}

export function SocialEditLinks({
  values,
  setFieldValue
}: {
  values: ISocialEditInputProp
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => void
}) {
  return (
    <>
      {links.map((item, index) => (
        <>
          <FormItem key={item.name} name={item.name}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
              <Box display={'flex'} alignItems={'center'}>
                <IconButton>{item.icon}</IconButton>
                <Typography>{item.label}</Typography>
              </Box>
              <Box display={'flex'} alignItems={'center'}>
                <SocialEditInput
                  value={values?.[item.name as keyof ISocialEditInputProp] || ''}
                  setValue={(val: string) => setFieldValue(item.name, val || '')}
                />
              </Box>
            </Box>
          </FormItem>
          {index !== links.length - 1 && <Divider key={index} />}
        </>
      ))}
    </>
  )
}
