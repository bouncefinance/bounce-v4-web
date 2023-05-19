import { IShareParam } from './type'
import { ApiInstance } from 'api'

export const shareAdd = async (params: IShareParam) => {
  return ApiInstance.post('/share/add', params)
}
export const getInviteList = async () => {
  return ApiInstance.get('/share/valid/list', {})
}
