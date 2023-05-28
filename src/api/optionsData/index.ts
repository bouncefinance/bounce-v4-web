import { ISearchCreator, IsearchEduInfoParams, ISearchUserParams, ISearchUserPoolParams, ResOptionsData } from './type'
import { ApiInstance } from 'api'

export const getOptionsData = async () => {
  return ApiInstance.get<ResOptionsData>('/com/cfg/opt_data', {})
}

export const searchEduInfo = (body: IsearchEduInfoParams) => {
  return ApiInstance.post('/com/search/edu_info', body)
}

export const searchCompanyInfo = (body: IsearchEduInfoParams) => {
  return ApiInstance.post('/com/search/co_info', body)
}

export const searchUser = (body: ISearchUserParams) => {
  return ApiInstance.post('/com/search/user', body)
}

export const searchPoolAndUser = (body: ISearchUserPoolParams) => {
  return ApiInstance.post('/com/search/top', body)
}

export const searchToken = (body: IsearchEduInfoParams) => {
  return ApiInstance.post('/com/search/token', body)
}

export const searchCreator = (body: ISearchCreator) => {
  return ApiInstance.post('/com/search/idea_by_creator', body)
}
