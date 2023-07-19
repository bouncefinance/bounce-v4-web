import { Box, styled, Typography, SxProps, Stack, OutlinedInput, Button, Switch, FormLabel } from '@mui/material'
import Image from 'components/Image'
import FormItem from 'bounceComponents/common/FormItem'
import { IFile } from 'bounceComponents/common/Uploader'
import UploadItem from 'bounceComponents/common/UploadCard/UploadItem'
export const CardBox = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  gap: 24,
  marginTop: 24
})
export const BaseBox = styled(Box)({
  width: '100%',
  padding: 64,
  borderRadius: 24,
  background: '#FFF'
})
export const Title = styled(Typography)({
  fontFamily: 'Public Sans',
  fontSize: '28px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '130%',
  letterSpacing: '-0.56px',
  textTransform: 'capitalize',
  textAlign: 'left',
  color: '#20201E'
})
export const UploadLayout = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
})
export const ImageBg = ({ sx, url }: { sx?: SxProps; url: string }) => {
  return (
    <Box
      sx={{
        width: 130,
        height: 52,
        borderRadius: 4,
        overflow: 'hidden',
        ...sx
      }}
    >
      <Image style={{ width: '100%', height: '100%' }} src={url} />
    </Box>
  )
}
export const UploadIntroduce = ({ title }: { title: string }) => {
  return (
    <Stack sx={{ flexDirection: 'column', gap: 8 }}>
      <BaseTitle1 sx={{ fontSize: 16, color: '#171717' }}>{title}</BaseTitle1>
      <BaseTitle2 sx={{ fontSize: 12, color: '#626262' }}>{`(JPEG, PNG, WEBP Files, Size<10M)`}</BaseTitle2>
    </Stack>
  )
}
export const BaseTitle1 = styled(Typography)({
  fontFamily: 'Public Sans',

  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '140%',
  letterSpacing: '-0.4px',
  textTransform: 'capitalize'
})
export const BaseTitle2 = styled(Typography)({
  fontFamily: 'Inter',

  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '140%'
})
export const UploadBtn = styled('label')({
  fontSize: 14,
  background: '#E1F25C',
  borderRadius: 6,
  padding: '8px 24px',
  fontFamily: 'Public Sans',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '140%',
  letterSpacing: '-0.4px',
  textTransform: 'capitalize',
  cursor: 'pointer'
})
export const TextInput = ({ title, name, placeholder }: { title: string; name: string; placeholder: string }) => {
  return (
    <Box>
      <Title sx={{ fontSize: 20 }} mb={16}>
        {title}
      </Title>
      <FormItem name={name}>
        <OutlinedInput placeholder={placeholder} />
      </FormItem>
    </Box>
  )
}
export const SubmitComp = () => (
  <Box mt={48} sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 54 }}>
    <Button
      variant="contained"
      sx={{
        padding: '16px 40px',
        boxSizing: 'border-box',
        background: '#121212',
        '&:hover': { background: '#121212', border: 'none' }
      }}
    >
      <Title sx={{ fontSize: 16, fontWeight: 500, color: '#fff' }}>Preview</Title>
    </Button>
    <Button
      type="submit"
      variant="contained"
      sx={{
        padding: '16px 40px',
        boxSizing: 'border-box',
        background: '#E1F25C',
        '&:hover': { background: '#E1F25C', border: 'none' }
      }}
    >
      <Title sx={{ fontSize: 16, fontWeight: 500, color: '#20201E' }}>Submit</Title>
    </Button>
  </Box>
)
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
export const FormUploadLayout = ({
  fileUrl,
  setFieldValue,
  formItemName,
  uploadTitle,
  labelId,
  imgSx
}: {
  fileUrl: string
  setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void
  formItemName: string
  uploadTitle: string
  labelId: string
  imgSx?: SxProps
}) => {
  imgSx = imgSx || {
    width: 132,
    height: 52,
    borderRadius: '4px !important',
    background: 'rgb(232,233,228)',
    '& svg': { width: '100%', height: '100% ' },
    '& .add-svg': {
      border: 'none'
    }
  }
  return (
    <UploadLayout>
      <Stack flexDirection={'row'} gap={16} alignItems={'center'}>
        <FormItem name={formItemName} fieldType="custom" style={{ display: fileUrl ? 'none' : 'block' }}>
          <UploadItem
            inputId={labelId}
            value={{ fileUrl: fileUrl }}
            onChange={(file: IFile) => {
              setFieldValue(formItemName, file)
            }}
            accept={['image/jpeg', 'image/png', 'image/webp']}
            tips={'Please do not exceed a file size of 10MB'}
            limitSize={10}
            sx={imgSx}
          />
        </FormItem>
        {fileUrl && <ImageBg url={fileUrl} />}
        <UploadIntroduce title={uploadTitle} />
      </Stack>
      <UploadBtn htmlFor={labelId}>Upload</UploadBtn>
    </UploadLayout>
  )
}
