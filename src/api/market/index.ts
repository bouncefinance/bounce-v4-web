import { ApiInstance } from '..'
import { ICompanyInformationParams, IInstitutionInvestorsParams, IPoolFilterParams, IPoolsParams } from './type'

export const getInstitutionInvestors = (body: IInstitutionInvestorsParams) => {
  return ApiInstance.post('/com/search/top_investor', body)
}
export const getCompanyInformation = (body: ICompanyInformationParams) => {
  return ApiInstance.post('/com/search/top_company', body)
}

export const getPools = (body: IPoolsParams) => {
  return ApiInstance.post('/pools', body)
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

export const getRank = (way: string) => {
  return ApiInstance.get('/share/rankings', { way: way, isToday: 0, side: 'BladeDao', poolId: 6, limit: 20 })
}
