import {
  IRegisterParams,
  ILoginParams,
  IConfigResponse,
  IUserInfoParams,
  IVerifyCodeParams,
  IChangePasswordParams,
  IUserBindAddressParams,
  IUserBindAddressListData,
  IUserBindAddressListItems,
  IBindAddressParams,
  GetUserWhitelistProofParams,
  GetUserWhitelistProofResponse,
  IBindThirdpartParams,
  ICheckEmailParams,
  IPaginationParams,
  IGetCommentsParams,
  IAddCommentParams,
  IDeleteCommentsParams,
  IAddCommentsReplyParams,
  IDeleteCommentsReplyParams,
  IGetUserUnverifyParams,
  IVerifyAccountParams,
  IUserFollowParams,
  IUserFollowedCountParams,
  IUserFollowUserParams,
  IClaimCheckParams,
  IUserUpdateBannerParams,
  GetUserNFTsParams,
  IAddressRegisterLoginParams,
  IChangeEmailParams,
  GetUserPermitSignResponse,
  GetUserTokenListParams
} from './type'

import { ApiInstance } from 'api'

export const getConfig = async () => {
  return ApiInstance.get<IConfigResponse>('/com/cfg/opt_data', {})
}

export const register = (params: IRegisterParams) => {
  return ApiInstance.post('/login/register', params)
}

export const login = async (params: ILoginParams) => {
  return ApiInstance.post('/login/login', params)
}

export const addressRegisterOrLogin = async (params: IAddressRegisterLoginParams) => {
  return ApiInstance.post('/login/register/address', params)
}

export const getUserInfo = async (params: IUserInfoParams) => {
  return ApiInstance.post('/personal/profile', {
    userId: Number(params.userId)
  })
}

export const getUserPoolCount = async (address: string) => {
  return ApiInstance.post<{ createdCount: number; participantCount: number }>('/user/pools/count/stat', { address })
}

export const logout = async () => {
  return ApiInstance.get('/login/logout', {})
}

export const verifyCode = async (params: IVerifyCodeParams) => {
  return ApiInstance.post('/login/verifycode', params)
}

export const changePassword = async (params: IChangePasswordParams) => {
  return ApiInstance.post('/personal/change_password', params)
}

export const changeEmail = async (params: IChangeEmailParams) => {
  return ApiInstance.post('/personal/update_email', params)
}

export const userGetBindAddress = async (params: IUserBindAddressParams) => {
  return ApiInstance.post<IUserBindAddressListItems<IUserBindAddressListData>>('/personal/get_bind_address', params)
}

export const bindAddress = async (params: IBindAddressParams) => {
  return ApiInstance.post('/personal/bind_address', params)
}

export const getUserWhitelistProof = async (params: GetUserWhitelistProofParams) => {
  return ApiInstance.post<GetUserWhitelistProofResponse>('/user/whitelist', params)
}

export const getUserPermitSign = async (params: GetUserWhitelistProofParams) => {
  return ApiInstance.post<GetUserPermitSignResponse>('/user/permit/sign', params)
}

export const getUserActivities = async (params: IPaginationParams) => {
  return ApiInstance.post('/user/profile/pools', params)
}

export const bindThirdpart = async (params: IBindThirdpartParams) => {
  return ApiInstance.post('/personal/update_thirdpart', params)
}

export const bindThirdpartGetUrlOfTwitter = async () => {
  return ApiInstance.get<string>('/user/twitter/url', {})
}

export const checkEmail = async (params: ICheckEmailParams) => {
  return ApiInstance.get('/personal/email_check', params)
}

export const getComments = async (params: IGetCommentsParams) => {
  return ApiInstance.post('/user/comments', params)
}

export const addComments = async (params: IAddCommentParams) => {
  return ApiInstance.post('/user/comment/add', params)
}

export const deleteComments = async (params: IDeleteCommentsParams) => {
  return ApiInstance.post('/user/comment/delete', params)
}

export const addCommentsReply = async (params: IAddCommentsReplyParams) => {
  return ApiInstance.post('/user/comment/reply/add', params)
}

export const deleteCommentsReply = async (params: IDeleteCommentsReplyParams) => {
  return ApiInstance.post('/user/comment/reply/delete', params)
}

export const getUserUnverify = async (params: IGetUserUnverifyParams) => {
  return ApiInstance.post('/com/search/user_unverify', params)
}

export const verifyAccount = async (params: IVerifyAccountParams) => {
  return ApiInstance.post('/user/user_claim', params)
}

export const claimCheck = async (params: IClaimCheckParams) => {
  return ApiInstance.post('/user/claim_check', params)
}

export const getUserFollow = async (params: IUserFollowParams) => {
  return ApiInstance.post('/user/follow', params)
}

export const getUserFollowedCount = async (params: IUserFollowedCountParams) => {
  return ApiInstance.post('/user/follow_count', params)
}

export const getUserFollowUser = async (params: IUserFollowUserParams) => {
  return ApiInstance.post('/user/follow_user', params)
}

export const updateUserBanner = async (params: IUserUpdateBannerParams) => {
  return ApiInstance.post('/user/update_banner', params)
}

/**
 * Get nfts of login user
 */
export const getUserNFTsInfo = (params: GetUserNFTsParams) => {
  return ApiInstance.post('/user/nfts', params)
}

/**
 * Get erc20 token list
 */
export const getUserTokenList = (params: GetUserTokenListParams) => {
  return ApiInstance.post('/user/tokens/erc20', params)
}
