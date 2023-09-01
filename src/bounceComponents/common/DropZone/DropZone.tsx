import Dropzone from 'react-dropzone'
import { ReactComponent as DownloadIcon } from 'assets/imgs/toolBox/ri_download-cloud-fill.svg'
import { Box, styled } from '@mui/material'
import { GrayBody02 } from '../../../components/Text'

export default function DropZone({ getFile }: { getFile: (file: File) => void }) {
  return (
    <Dropzone onDrop={acceptedFiles => getFile(acceptedFiles[0])}>
      {({ getRootProps, getInputProps }) => (
        <section>
          <DotBox {...getRootProps()}>
            <input {...getInputProps()} />
            <DownloadIcon />
            <GrayBody02 ml={10}>
              Drop file here to upload or <BlueHighLight>choose file</BlueHighLight>
            </GrayBody02>
          </DotBox>
        </section>
      )}
    </Dropzone>
  )
}

const DotBox = styled(Box)`
  display: flex;
  padding: 40px 24px;
  border-radius: 8px;
  border: 1px dashed var(--gray-04, #d7d6d9);
  cursor: pointer;
`

const BlueHighLight = styled(`span`)`
  color: var(--blue-d, var(--blue-d, #2b51da));
  font-family: Public Sans;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.32px;
  text-decoration-line: underline;
`
