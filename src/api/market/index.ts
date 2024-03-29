import { ApiInstance, BotApiInstance } from '..'
import {
  ICompanyInformationParams,
  IInstitutionInvestorsParams,
  IPoolFilterParams,
  IPoolsParams,
  InviteLinksParams,
  BindInviteLinksParams
} from './type'

export const getInstitutionInvestors = (body: IInstitutionInvestorsParams) => {
  return ApiInstance.post('/com/search/top_investor', body)
}
export const getCompanyInformation = (body: ICompanyInformationParams) => {
  return ApiInstance.post('/com/search/top_company', body)
}

export const getPools = (body: IPoolsParams) => {
  return ApiInstance.post('/pools', body)
}

export const getBotTokens = () => {
  return ApiInstance.get('/bot/tokens', {})
}
export const getBotDashboard = () => {
  return BotApiInstance.get('/bot/pools/dashboard', {})
}

export const getBotPools = (body: IPoolsParams) => {
  return BotApiInstance.post('/bot/pools', body)
}
export const getInviteLinks = (body: InviteLinksParams) => {
  return ApiInstance.post('/bot/invite_links/list', body)
}

export const bindInviteLinks = (body: BindInviteLinksParams) => {
  return ApiInstance.post('/bot/invite_links/bind', body)
}

export const getPoolsFilter = (body: IPoolFilterParams) => {
  return ApiInstance.post('/pools/stat/filter', body)
}

export const getBanner = (type?: string) => {
  return ApiInstance.get('/banner', { types: type })
}

export const getActiveUsers = () => {
  return ApiInstance.post('/pools/stat/count', { limit: 10, offset: 0 })
}

export const getAuctionTypeCountData = () => {
  return ApiInstance.get('/pools/stat/total', {})
}
export const getAuctionVolumeCountData = () => {
  return ApiInstance.get('/pools/stat/volume', {})
}

export const getRank = (way: string, page: number, pageSize: number) => {
  return ApiInstance.get('/share/rankings', {
    way: way,
    isToday: 0,
    side: 'BladeDao',
    poolId: '6,13',
    limit: pageSize,
    offset: (page - 1) * pageSize
  })
}
