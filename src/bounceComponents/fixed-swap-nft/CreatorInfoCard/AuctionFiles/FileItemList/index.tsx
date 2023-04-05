import React from 'react'
import { Stack } from '@mui/material'

import FileItem from './FileItem'

import usePoolInfo from '@/hooks/auction/useNftPoolInfo'

export interface FileItemListProps {
  poolId: number
  canDeleteFile?: boolean
  canDownloadFile?: boolean
}

const FileItemList = ({ poolId, canDeleteFile, canDownloadFile }: FileItemListProps) => {
  const { data: poolInfo } = usePoolInfo()

  return (
    <Stack spacing={20}>
      {poolInfo?.posts?.slice(0, 3).map((file) => {
        return (
          <FileItem
            key={file.id}
            poolId={poolId}
            canDeleteFile={canDeleteFile}
            canDownloadFile={canDownloadFile}
            fileId={file.id}
            fileType={file.fileType}
            thumbnailUrl={file.fileThumbnailUrl}
            fileUrl={file.fileUrl}
            fileName={file.fileName}
            fileSize={file.fileSize}
          />
        )
      })}
    </Stack>
  )
}

export default FileItemList
