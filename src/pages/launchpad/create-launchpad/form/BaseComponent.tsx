import {
  Box,
  styled,
  Typography,
  SxProps,
  Stack,
  Button,
  Switch,
  FormLabel,
  Tooltip,
  CircularProgress
} from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton'
import Image from 'components/Image'
import FormItem from 'bounceComponents/common/FormItem'
import { IFile } from 'bounceComponents/common/Uploader'
import UploadItem from 'bounceComponents/common/UploadCard/UploadItem'
import { ReactComponent as AddCircleIcon } from 'assets/imgs/icon/add_circle_outline.svg'
import { Body02 } from 'components/Text'
import { IDetailInitValue } from '../type'
import { useState } from 'react'
export const CardBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 24
})
export const BaseBox = styled(Box)({
  width: '100%',
  padding: 64,
  borderRadius: '0px 24px 24px 24px',
  background: '#FFF',
  '@media(max-width:600px)': {
    borderRadius: '0px 16px 16px 16px',
    padding: '32px 16px'
  }
})
export const Title = styled(Typography)({
  fontFamily: 'Inter',
  fontSize: '20px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '130%',
  letterSpacing: '-0.56px',
  // textTransform: 'capitalize',
  textAlign: 'left',
  color: '#20201E',
  '@media(max-width:600px)': {
    fontSize: 16
  }
})
export const HeadTitle = styled(Title)({
  fontSize: 28,
  textAlign: 'center',
  '@media(max-width:600px)': {
    fontSize: 20
  }
})

export const SubmitComp = ({
  errors,
  isChange,
  loading,
  isShowPreview = true,
  values,
  toUpdate
}: {
  errors?: any
  isChange: boolean
  loading: boolean
  isShowPreview?: boolean
  values?: IDetailInitValue
  toUpdate?: (values: IDetailInitValue) => Promise<any>
}) => {
  let isCanPreview = false
  if (errors && !Object.keys(errors).length) {
    isCanPreview = true
  }
  return (
    <Stack
      sx={{
        flexDirection: 'column',
        gap: 15,
        '@media(max-width:600px)': {
          gap: 24
        }
      }}
    >
      <Box
        mt={48}
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 12,
          '@media(max-width)': {
            gap: 16
          }
        }}
      >
        {isShowPreview && (
          <Tooltip title={!isCanPreview ? 'Necessary information not filled in' : 'Preview represents creating.'}>
            <span>
              <Button
                variant="contained"
                disabled={!isCanPreview}
                onClick={async () => {
                  if (toUpdate && values) {
                    const res = await toUpdate(values)
                    window.open(`/account/launchpad/${res.data.id}`)
                    console.log('res')
                    console.log(res)
                  }
                }}
                sx={{
                  padding: '20px 40px',
                  background: '#FFF',
                  border: '1px solid  #121212',
                  '&:hover': { background: '#FFF' },
                  '@media(max-width:600px)': {
                    width: 92,
                    height: 10,
                    padding: '16px 24px',
                    boxSizing: 'content-box'
                  }
                }}
              >
                <Body02 sx={{ fontSize: 16, fontWeight: 400, color: '#121212' }}>Preview</Body02>
              </Button>
            </span>
          </Tooltip>
        )}
        {!isChange && (
          <Tooltip title="The form content has not changed.">
            <span>
              <LoadingButton
                type="submit"
                variant="contained"
                loadingPosition="start"
                disabled={!isChange}
                startIcon={<></>}
                sx={{
                  padding: '20px 40px',
                  boxSizing: 'border-box',
                  background: '#121212',
                  '&:hover': { background: '#121212', border: 'none' },
                  '@media(max-width:600px)': {
                    width: 92,
                    height: 10,
                    padding: '16px 24px',
                    boxSizing: 'content-box'
                  }
                }}
              >
                <Body02 sx={{ fontSize: 16, fontWeight: 400, color: '#121212' }}>Submit</Body02>
              </LoadingButton>
            </span>
          </Tooltip>
        )}

        {isChange && (
          <LoadingButton
            type="submit"
            variant="contained"
            loadingPosition="start"
            startIcon={<></>}
            loading={loading}
            sx={{
              padding: '20px 40px',
              boxSizing: 'border-box',
              background: '#121212',
              '&:hover': { background: '#121212', border: 'none' },
              '@media(max-width:600px)': {
                width: 92,
                height: 10,
                padding: '16px 24px',
                boxSizing: 'content-box'
              }
            }}
          >
            <Body02 sx={{ fontSize: 16, fontWeight: 400, color: '#fff' }}>Submit</Body02>
          </LoadingButton>
        )}
      </Box>
      <Typography
        sx={{
          fontFamily: 'Inter',
          fontSize: 14,
          fontWidth: 600,
          color: '#959595',
          textAlign: 'center',
          '@media(max-width:600px)': {
            fontSize: 13
          }
        }}
      >
        After submitting, it will be successfully published after being reviewed by Bounce
      </Typography>
    </Stack>
  )
}
export const GraySwitch = styled(Switch)({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#2ECA45',
        opacity: 1,
        border: 0
      }
    }
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: 'rgb(149,149,149)',
    opacity: 1
  }
})
export function LabelTitle({ children }: { children: any }) {
  return <FormLabel sx={{ fontWeight: 600, color: '#222223', mt: 10 }}>{children}</FormLabel>
}
export const FormLayout = ({
  title1,
  title2,
  childTitle,
  childForm,
  sxStyle
}: {
  title1: string
  title2?: string
  childTitle?: React.ReactElement
  childForm: React.ReactElement
  sxStyle?: SxProps
}) => {
  return (
    <Stack sx={{ flexDirection: 'column', gap: 16, ...sxStyle }}>
      <Stack sx={{ flexDirection: 'column', gap: 8 }}>
        <Title sx={{ color: '#20201E', fontSize: 20 }}>{title1}</Title>
        {title2 && <Title sx={{ color: '#626262', fontWeight: 500, fontSize: 16 }}>{title2}</Title>}
        {childTitle && childTitle}
      </Stack>
      {childForm}
    </Stack>
  )
}
export const FormUploadAdd = ({
  fileUrl,
  setFieldValue,
  formItemName,
  labelId,
  labelChild,
  labelSx,
  firstTrigger
}: {
  fileUrl: string
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  formItemName: string
  labelId: string
  labelChild: React.ReactElement
  labelSx?: SxProps
  firstTrigger?: boolean
}) => {
  const [loading, setLoading] = useState<boolean>(false)
  const getLoading = (loading: boolean) => {
    setLoading(loading)
  }
  return (
    <FormItem name={formItemName} fieldType="custom" firstTrigger={firstTrigger}>
      <UploadItem
        inputId={labelId}
        value={{ fileUrl: fileUrl }}
        onChange={(file: IFile) => {
          setFieldValue(formItemName, file.fileUrl)
        }}
        accept={['image/jpeg', 'image/png', 'image/webp']}
        tips={'Please do not exceed a file size of 10MB'}
        limitSize={10}
        sx={{ display: 'none' }}
        getLoading={getLoading}
      />
      <UpLabelBox loading={loading} htmlFor={labelId} fileUrl={fileUrl} child={labelChild} labelSx={labelSx} />
    </FormItem>
  )
}
export const UpLabelBox = ({
  htmlFor,
  fileUrl,
  child,
  labelSx,
  loading
}: {
  htmlFor: string
  fileUrl: string
  child: React.ReactElement
  labelSx?: SxProps
  loading: boolean
}) => {
  return (
    <Box sx={{ display: 'block', cursor: 'pointer' }} component={'label'} htmlFor={htmlFor}>
      <Stack
        sx={{
          width: 227,
          height: 52,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
          border: '1px solid #D7D6D9',
          borderRadius: 8,
          ...labelSx
        }}
      >
        {!fileUrl && !loading && child}
        {
          !loading && fileUrl && <Image src={fileUrl} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          // <Box sx={{ width: '100%', height: '100%', background: `url(${fileUrl}) no-repeat` }}></Box>
        }
        {loading && <CircularProgress sx={{ color: '#D7D6D9' }} />}
      </Stack>
    </Box>
  )
}
export const AddFile = () => {
  return (
    <>
      <Title sx={{ fontSize: 14, color: '#000', fontWeight: 600 }}>Add file</Title>
      <AddCircleIcon />
    </>
  )
}
