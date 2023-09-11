import { DisperseListParam, TokenInfoList } from './type'
import { ApiInstance } from '../index'

export const getMyDisperse = (params: DisperseListParam) => {
  return ApiInstance.post<DisperseListParam>('/toolbox/disperse', params)
}

export const getTokenInfo = (params: DisperseListParam) => {
  return ApiInstance.post<TokenInfoList>('/toolbox/tokens', params)
}
