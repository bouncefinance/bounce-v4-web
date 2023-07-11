import { ApiInstance } from 'api'
import {
  GetAddressActivitiesParams,
  GetAddressActivitiesRes,
  GetUserPoolsDashboardCollectRes,
  GetUserPoolsDashboardParams,
  GetUserPoolsDashboardRes,
  GetUserPoolsDashboardStatRes
} from './types'

export const getUserPoolsDashboardCreated = (params: GetUserPoolsDashboardParams) => {
  return ApiInstance.post<{ list: GetUserPoolsDashboardRes[]; total: number }>('/user/pools/dashboard/created', params)
}

export const getUserPoolsDashboardCollect = (params: GetUserPoolsDashboardParams) => {
  return ApiInstance.post<{ list: GetUserPoolsDashboardCollectRes[]; total: number }>(
    '/user/pools/dashboard/collect',
    params
  )
}

export const getUserDashboardStat = () => {
  return ApiInstance.get<GetUserPoolsDashboardStatRes>('/user/pools/dashboard/stat', {})
}

export const getUserPoolsTokenParticipant = (params: GetUserPoolsDashboardParams) => {
  return ApiInstance.post('/user/pools/token/participant', params)
}

export const getUserPoolsTokenCreated = (params: GetUserPoolsDashboardParams) => {
  return ApiInstance.post('/user/pools/token/created', params)
}

export const getUserPoolsTokenCollect = (params: GetUserPoolsDashboardParams) => {
  return ApiInstance.post('/user/pools/token/collect', params)
}

export const getAddressActivities = (params: GetAddressActivitiesParams) => {
  return ApiInstance.post<{ list: GetAddressActivitiesRes[]; total: number }>('/user/pools/activities', params)
}

export const getSumsubAccessToken = (levelName?: 'basic-kyc-leve' | string) => {
  return ApiInstance.post<{ token: string; userId: number }>('/user/sumsub/accesstoken', { levelName })
}
