import { ApiInstance } from '..'
import { IEmailAdd } from './type'

export const fundoRegisterEmail = (params: IEmailAdd) => {
  return ApiInstance.post('/project/email/add', params)
}
