import { useDropzone } from 'react-dropzone'
import { useCallback } from 'react'
import { ReactComponent as DownloadIcon } from 'assets/imgs/toolBox/ri_download-cloud-fill.svg'
import { Box, styled } from '@mui/material'
import { GrayBody02 } from '../../../components/Text'

export default function DropZone() {
  const onDrop = useCallback((acceptedFiles: any) => {
    console.log(acceptedFiles)
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  console.log(getRootProps)
  console.log(getInputProps)
  console.log(isDragActive)

  return (
    <DotBox>
      <DownloadIcon />
      <GrayBody02>Drop file here to upload or choose file</GrayBody02>
    </DotBox>
  )
}

const DotBox = styled(Box)`
  display: flex;
  padding: 40px 24px;
  border-radius: 8px;
  border: 1px dashed var(--gray-04, #d7d6d9);
`
