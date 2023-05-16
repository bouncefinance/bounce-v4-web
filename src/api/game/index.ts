import { IScoreParams, IRankResponse, IAllRankParams } from './type'
import { ApiInstance } from 'api'

export const getAllrank = async (params: IAllRankParams) => {
  return ApiInstance.post<IRankResponse>('/user/pools/payable/allrank', params)
}
export const sendScore = (params: IScoreParams) => {
  return ApiInstance.post('/user/pools/payable/score', params)
}
export const getUserRank = (params: IAllRankParams) => {
  return ApiInstance.post('/user/pools/payable/rank', params)
}
