import React, { useRef } from 'react'
import type { SxProps } from '@mui/material'
import { Box } from '@mui/material'
import Image from 'components/Image'
import { toast } from 'react-toastify'
import styles from './styles'

// import { ReaderFile } from 'utils'
import { uploader } from 'api/upload'

export type IFile = {
  id?: number
  fid?: string
  fileUrl: string
  fileThumbnailUrl?: string
  fileName: string
  fileSize: number
  fileType: string
  originFileObj?: File
}
// 视频需要扩展：| `video/${string}`
export type IAccept = 'image/jpeg' | 'image/png' | 'video/mp4'
export interface IUploaderError {
  msg: string
  error: 'LimitError' | 'AcceptError' | 'Error' | 'NetworkError'
}

export type ValidatorName = 'fileSize' | 'fileType'
export interface Validator {
  disabled: boolean
}

export type IUploaderProps = {
  sx?: SxProps
  // default: false
  disabled?: boolean
  onChange?: (filelist: any[]) => void
  // hover icon
  icon?: string | null
  // limit n/MB
  limitSize?: number
  // limit count
  maxCount?: number

  accept?: string[]
  tips?: string
  // Processing before uploading
  onBefore?: (filelist: IFile[]) => Promise<IFile[] | null>
  // Upload successful
  onSuccess?: (res: IFile) => void
  // Upload failed
  onError?: (error: IUploaderError[], file?: IFile) => void
  validator?: Record<Partial<ValidatorName>, Validator>
  children?: React.ReactNode
  inputId?: string
}

const Uploader: React.FC<IUploaderProps> = ({
  sx,
  icon,
  disabled,
  inputId,
  children,
  onChange,
  onBefore,
  onSuccess,
  onError,
  limitSize = 10,
  maxCount = 1,
  accept = [],
  tips = ''
  // validator = { fileType: { disabled: false }, fileSize: { disabled: false } }
}) => {
  const refFile = useRef<HTMLInputElement>(null)

  const handleReset = () => {
    if (refFile.current) {
      refFile.current.value = ''
    }
  }

  const handleUploader = async (files: File[]) => {
    const errors: IUploaderError[] = []
    const file = files[0] as any //API: Only single
    file.fid = `${file.name}_${file.size}`

    if (accept?.length > 0 && !accept.includes(file.type)) {
      // const msg = `upload file type error: (${accept.join(',')})`
      const msg = tips ? tips : `upload file type error: (${accept.join(',')})`
      toast.error(msg)
      errors.push({
        msg: msg,
        error: 'AcceptError'
      })
    }

    // if (!validator.fileSize.disabled && file.size > limitSize * 1024 * 1024) {
    //   errors.push({
    //     msg: `upload file over the limit: (${limitSize}MB)`,
    //     error: 'LimitError',
    //   })
    //   return
    // }
    if (limitSize && file.size > limitSize * 1024 * 1024) {
      const msg = tips ? tips : `Upload file over the limit: (${limitSize}MB)`
      !errors.some(err => err.msg === msg) && toast.error(msg)
      errors.push({
        msg: msg,
        error: 'LimitError'
      })
    }

    if (errors.length) {
      onError?.(errors)
      return
    }

    // const buffer = await ReaderFile(file)

    try {
      const res = (await uploader({
        file
      })) as any

      onSuccess?.({
        fid: `${file.name}_${file.size}`,
        fileSize: file.size,
        fileType: file.type,
        fileName: file.name,
        fileUrl: res?.data?.path || ''
      })
    } catch (err) {
      errors.push({
        msg: `NetworkError`,
        error: 'NetworkError'
      })
      toast.error('NetworkError Please connect the wallet')
      console.error('Uploader error:', err)
      return onError?.(errors, file)
    }

    handleReset()
  }

  const handleChange = async (e: any) => {
    const target = e.target
    let file = target?.files?.[0] || []
    if (!file) return

    onChange?.(target?.files)

    if (onBefore) {
      file = await onBefore?.(file)
    }

    file.fid = `${file.name}_${file.size}`

    return handleUploader([file])
  }

  if (disabled) {
    return <>{children}</>
  }

  const formatAccept = []
  for (const imgType of accept) {
    formatAccept.push(`image/${imgType}`)
  }

  return (
    <Box sx={{ ...sx, ...styles.root } as any}>
      {children}
      <Box sx={{ ...styles.uploaderFile, ...(icon ? styles.uploaderFileMasked : {}) } as any}>
        {icon && <Image src={icon} alt="Uploader" />}
        <input
          ref={refFile}
          id={inputId}
          accept={formatAccept.join(',')}
          type="file"
          multiple={maxCount > 1}
          onChange={handleChange}
        />
      </Box>
    </Box>
  )
}

export default Uploader

Uploader.defaultProps = {
  icon: null,
  disabled: false,
  onSuccess: req => {
    console.log('upload successful:', req)
  }
}
