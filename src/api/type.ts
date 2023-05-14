export const ICodeMaps = {
  200: 'Success'
}

export type IResponse<TData> = {
  code: number
  data: TData
  message: string
  msg?: string
}

export type IPager<TData> = {
  list: TData[]
  total: number
}

export interface Post {
  id: number
  fileUrl: string
  fileName?: string
  fileSize?: number
  fileThumbnailUrl?: string
  fileType?: string
}
