import { Box, Typography } from '@mui/material'

import DeleteFileButton from '../DeleteFileButton'
import DownloadFileButton from '../DownloadFileButton'

import { getfilesize } from 'utils'
import { ellipseFileName } from 'utils/file'
import { PoolInfoProp } from 'bounceComponents/fixed-swap/type'
import { useState, useEffect } from 'react'
export interface FileItemProps {
  canDeleteFile?: boolean
  canDownloadFile?: boolean
  fileId?: number
  fileType?: string
  thumbnailUrl?: string
  fileUrl?: string
  fileName?: string
  fileSize?: number
  poolInfo: PoolInfoProp
  getPoolInfo: () => void
}

const FileItem = ({
  canDeleteFile,
  canDownloadFile,
  fileId,
  fileType,
  thumbnailUrl,
  fileUrl,
  fileName,
  poolInfo,
  getPoolInfo,
  fileSize
}: FileItemProps) => {
  const [isDutch, setIsDutch] = useState(false)
  useEffect(() => {
    const result = window.location.href.indexOf('dutch-auction') > -1
    setIsDutch(result)
  }, [])
  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      {canDownloadFile && <DownloadFileButton fileType={fileType} thumbnailUrl={thumbnailUrl} fileUrl={fileUrl} />}
      {canDeleteFile && (
        <DeleteFileButton
          poolInfo={poolInfo}
          getPoolInfo={getPoolInfo}
          fileId={fileId}
          fileType={fileType}
          thumbnailUrl={thumbnailUrl}
          fileUrl={fileUrl}
        />
      )}

      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 12, pt: 6 }}>
        <Typography
          variant="h6"
          sx={{
            color: isDutch ? '#fff' : ''
          }}
        >
          {ellipseFileName({ fileName, triggerCount: 18, frontCount: 7, endCount: 9 })}
        </Typography>
        <Typography variant="body2" sx={{ mt: 6, color: '#878A8E' }}>
          {fileSize ? getfilesize(fileSize) : '-'}
        </Typography>
      </Box>
    </Box>
  )
}

export default FileItem
