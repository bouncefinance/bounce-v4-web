import { Box, Stack, Typography, styled } from '@mui/material'
import { useDropzone } from 'react-dropzone'
import CloudDownloadTwoToneIcon from '@mui/icons-material/CloudDownloadTwoTone'
// import { useCallback } from 'react'
const DropFile = () => {
  const { getRootProps, getInputProps } = useDropzone({
    onDrop(file) {
      console.log(file)
    }
  })
  return (
    <Box mt={16}>
      <DropDox
        {...getRootProps({
          onClick(e) {
            e.stopPropagation()
            console.log('xx')
          }
        })}
      >
        <Stack flexDirection={'row'} gap={5}>
          <CloudDownloadTwoToneIcon />
          <Title1 sx={{ color: '#959595' }}>Drop file here to upload or </Title1>
          <Title2 sx={{ color: '#2B51DA' }} htmlFor="drop-file">
            choose file
          </Title2>
          <input {...getInputProps()} type="file" id="drop-file" name="drop-file" />
        </Stack>
      </DropDox>
      <Title1 mt={12} sx={{ fontSize: 14, color: '#959595' }}>
        We accept up to three documents per submission in the form of PDF, JPG or PNG files. The size limit per document
        is 10MB
      </Title1>
    </Box>
  )
}
const DropDox = styled(Box)({
  width: '100%',
  padding: '40px 24px',
  border: '1px dashed #D7D6D9'
})
const Title1 = styled(Typography)({
  fontFamily: 'Public Sans, sans-serif',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '150%',
  letterSpacing: '-0.32px'
})
const Title2 = styled('label')({
  fontFamily: 'Public Sans, sans-serif',
  fontSize: '16px',
  fontStyle: 'normal',
  fontWeight: '500',
  lineHeight: '150%',
  letterSpacing: '-0.32px',
  cursor: 'pointer'
})
export default DropFile
