import { IAvatarLinkType } from '../upload/type'
import { PoolType } from '../pool/type'
import { VerifyStatus } from '../profile/type'
import { IFile } from 'bounceComponents/common/Uploader'
import { Post } from '../type'

export enum ACCOUNT_TYPE {
  EMAIL = 1,
  GMAIL = 2,
  TWITTER = 3,
  LINKEDIN = 4
}

export enum USER_TYPE {
  USER = 1,
  COMPANY = 2,
  INVESTOR = 3
}

export interface IRegisterParams {
  accessToken: string
  email: string
  name: string
  password: string
  registerType: ACCOUNT_TYPE
  userType: USER_TYPE
  verifyCode?: string
}

export interface ILoginParams {
  accessToken: string
  email: string
  password: string
  loginType: ACCOUNT_TYPE
}

export interface IAddressRegisterLoginParams {
  message: string
  address: string
  signature: string
}

export interface ChainInfoOpt {
  chainName: string
  chain_type: number
  ethChainId: number
  id: number
  shortName: string
}

export interface IConfigResponse {
  chainInfoOpt?: ChainInfoOpt[]
  companySizeOpt: [{ id: number; size: string }]
  companyStateOpt: [{ id: number; state: string }]
  degreeOpt: [{ degree: string; id: number }]
  experienceYearOpt: [{ years: string; id: number }]
  investmentTypeOpt: [{ investment_type: string; id: number }]
  investorTypeOpt: [{ investorType: string; id: number }]
  jobCareOpt: [{ jobCare: string; id: number }]
  jobStateOpt: [{ state: string; id: number }]
  jobTypeOpt: [{ jobType: string; id: number }]
  marketTypeOpt: [{ marketType: string; id: number }]
  primaryRoleOpt: [{ level1Name: string; child: [{ id: number; level2Name: string }] }]
  publicRoleOpt: [{ id: number; role: string }]
  serviceCategoryOpt: [{ id: number; category: string }]
  tokenTypeOpt: [{ id: number; name: string }]
}

export interface IUserInfoParams {
  userId: number
}

export interface IVerifyCodeParams {
  email: string
  codeType?: 0 | 1 // 0 resetPassword 1 register
}

export interface IChangePasswordParams {
  email: string
  password: string
  verifyCode: string
}

export interface IChangeEmailParams {
  email: string
  verifyCode: string
}

export interface IProfileUserInfo {
  address: string
  avatar: IFile
  banner: string
  careJobs: number[]
  company: IAvatarLinkType
  companyRole: number
  contactEmail: string
  currentState: string
  description: string
  desiredCompanySize: number
  desiredMarket: number[]
  desiredSalary: string
  email: string
  fullName: string
  fullNameId: number
  github: string
  discord: string
  googleEmail: string
  id: number
  ifRemotely: number
  instagram: string
  isMember: number
  jobTypes: number[]
  linkedin: string
  location: string
  passwordSet: boolean
  primaryRole: number
  publicRole: number[]
  resumes: any[]
  skills: string
  timezone: string
  twitter: string
  university: IAvatarLinkType
  userType: number
  website: string
  years: number
  isVerify: VerifyStatus
}
export interface IUserBindAddressListData {
  address: string
  chainId: number
  isDefault: number
  userId: number
}
export interface IUserBindAddressListItems<ListType> {
  total: number
  list: ListType[]
}

export interface IPaginationParams {
  offset: number
  limit: number
}
export interface IUserBindAddressParams extends IPaginationParams {
  chainId?: number
}

export interface IBindAddressParams {
  address: string
  chainId: number
  isDefault: number
  message: string
  signature: string
}

export interface GetUserWhitelistProofParams {
  address: string
  category: PoolType
  chainId: number
  poolId: string
  tokenType?: 1 | 2
}

export interface GetUserWhitelistProofResponse {
  proof: string
}

export interface GetUserPermitSignResponse {
  expiredTime: number
  signature: string
}

export interface IBindThirdpartParams {
  accessToken: string
  thirdpartType: number
}

export interface ICheckEmailParams {
  email: string
}

export enum TopicType {
  Idea = 1,
  Company = 2,
  ThirdPartyCompany = 3
}

export interface IGetCommentsParams {
  limit: number
  offset: number
  topicId: number
  topicType: TopicType
}

export interface IRepliesItem {
  avatar: string
  commentId: number
  commentReplyId: number
  content: string
  createdAt: number
  name: string
  userId: number
  isVerify: VerifyStatus
}

export interface ICommentsItem {
  avatar: string
  commentId: number
  content: string
  createdAt: number
  linkedinName: string
  name: string
  replies: IRepliesItem[]
  topicId: number
  topicType: TopicType
  userId: number
  isVerify: VerifyStatus
}

export interface IAddCommentParams {
  content: string
  topicId: number
  topicType: TopicType
}

export interface IDeleteCommentsParams {
  commentId: number
}

export interface IAddCommentsReplyParams {
  commentId: number
  content: string
}

export interface IDeleteCommentsReplyParams {
  commentReplyId: number
}

export interface IGetUserUnverifyParams {
  limit: number
  name: string
  offset: number
  userType: USER_TYPE
}

export interface IVerifyAccountParams {
  accessToken: string
  email: string
  password: string
  claimType: ACCOUNT_TYPE
  thirdpartId: number
  userType: USER_TYPE
}

export interface IClaimCheckParams {
  accessToken: string
  claimType: ACCOUNT_TYPE
  thirdpartId: number
}

export enum FollowListType {
  following = 1,
  follower = 2
}
export interface IUserFollowParams {
  followListType: FollowListType
  userId?: number
  thirdpartId?: number
}

export interface IUserFollowedCountParams {
  userId?: number
  thirdpartId?: number
}

export interface IUserFollowUserParams {
  userId: number
  following: boolean
  thirdpartId?: number
}
export interface IUserUpdateBannerParams {
  banner: string
}

export interface UserNFTCollection {
  balance?: string // nft token balance
  contractAddr?: string
  contractName?: string
  description?: string
  image?: string
  name?: string
  tokenId: string
}
export interface GetUserNFTsResponse {
  list: UserNFTCollection[]
  total: number
}
export interface GetUserNFTsParams {
  chainId: number
  creator: string
  isERC721?: boolean
  limit?: number
  offset?: number
}
export interface UserUpdateServiceParams {
  category: number
  deliverTime: string
  description: string
  id: number
  posts: Post[]
  price: string
  title: string
}

export interface UserUpdateServiceResponse {
  id: number
}

export interface getUserServiceParams {
  limit?: number
  offset?: number
  id?: number
  category?: number[]
  userId?: number
}

export interface UserServiceResponse {
  category: number
  deliverTime: string
  description: string
  id: number
  posts: Post[]
  price: string
  title: string
  name: string
  avatar: string
  userId: number
}
