import { ApiInstance } from '..'
import { IEmailAdd, IPostMessageWinner } from './type'

export const fundoRegisterEmail = (params: IEmailAdd) => {
  return ApiInstance.post('/project/email/add', params)
}

export const poolWinnerInfoCommit = (params: IPostMessageWinner) => {
  return ApiInstance.post('/user/pools/pool/winner', params)
}
