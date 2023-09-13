import { DisperseListParam, MyDisperseList, TokenInfoList } from './type'
import { ApiInstance } from '../index'

export const getMyDisperse = (params: DisperseListParam) => {
  return ApiInstance.post<MyDisperseList>('/toolbox/disperse', params)
}

export const getTokenInfo = (params: DisperseListParam) => {
  return ApiInstance.post<TokenInfoList>('/toolbox/tokens', params)
}
