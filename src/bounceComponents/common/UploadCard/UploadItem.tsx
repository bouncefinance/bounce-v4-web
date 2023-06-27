import React, { useMemo, useState } from 'react'
import { Box, CircularProgress, Stack, Typography, styled } from '@mui/material'
import { ReactComponent as AddSVG } from './assets/default_add.svg'
import styles from './styles'
import Uploader from 'bounceComponents/common/Uploader'
import type { IFile } from 'bounceComponents/common/Uploader'

export type IUploadItemProps = {
  value?: Partial<IFile>
  accept?: string[]
  limitSize?: number
  onChange?: (value: IFile) => void
  onRemove?: (value: IFile) => void
  sx?: any
  tips?: string
  inputId?: string
}

export const StyledAvatarInputIdLabel = styled('label')({
  position: 'absolute',
  left: 148,
  top: 75,
  width: 74,
  height: 32,
  cursor: 'pointer',
  backgroundColor: 'var(--ps-yellow-1)',
  borderRadius: 6,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  '&:hover': {
    backgroundColor: 'var(--ps-black)',
    color: 'var(--ps-white)'
  }
})

const UploadItem: React.FC<IUploadItemProps> = ({ inputId, value, accept, limitSize, onChange, sx, tips }) => {
  const [loading, setLoading] = useState<boolean>(false)

  const UploadContent = useMemo(() => {
    if (loading)
      return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100', height: '100%' }}>
          <CircularProgress color="secondary" size={20} />
        </Box>
      )
    if (value?.fileUrl) {
      return (
        <Box sx={styles.editBox}>
          <picture>
            <img style={{ ...sx }} src={value.fileUrl} alt={value.fileName || 'upload image'} />
          </picture>
          {/* <Typography variant="body1" sx={styles.edit}>
            edit
          </Typography> */}
        </Box>
      )
    }
    return (
      <Box sx={styles.addItem}>
        <AddSVG />
      </Box>
    )
  }, [loading, value, sx])

  return (
    <Box>
      <Box
        sx={{
          ...styles.item,
          ...sx,
          '&>div:first-of-type': {
            display: 'block'
          },
          '&:hover .edit': {
            display: 'block !important'
          }
        }}
      >
        <Uploader
          inputId={inputId}
          sx={styles.uploadBox}
          accept={accept}
          limitSize={limitSize}
          disabled={loading}
          tips={tips}
          onBefore={files => {
            setLoading(true)
            return Promise.resolve(files)
          }}
          onSuccess={file => {
            onChange?.(file)
            setLoading(false)
          }}
          onError={() => {
            setLoading(false)
          }}
        >
          <Stack direction="row" justifyContent="center" alignItems="center" sx={styles.content}>
            {UploadContent}
          </Stack>
        </Uploader>
        {value?.fileUrl && (
          <Typography variant="body1" sx={styles.edit} className="edit">
            Edit
          </Typography>
        )}
      </Box>
    </Box>
  )
}

export default UploadItem
