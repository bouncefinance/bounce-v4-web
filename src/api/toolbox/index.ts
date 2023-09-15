import {
  DisperseListParam,
  TokenInfoList,
  MyDisperseList,
  LockInfoList,
  LocksListParam,
  ExchangeParam,
  ExchangeList
} from './type'
import { ApiInstance } from '../index'

export const getMyDisperse = (params: DisperseListParam) => {
  return ApiInstance.post<MyDisperseList>('/toolbox/disperse', params)
}

export const getTokenInfo = (params: DisperseListParam) => {
  return ApiInstance.post<TokenInfoList>('/toolbox/tokens', params)
}
export const getTokenLocksInfo = (params: LocksListParam) => {
  return ApiInstance.post<LockInfoList>('/toolbox/locks', params)
}
//
export const getExchangeList = (params: ExchangeParam) => {
  return ApiInstance.post<ExchangeList>('/toolbox/exchange', params)
}
