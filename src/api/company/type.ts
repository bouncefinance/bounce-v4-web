import { IAvatarLinkType, IFileType } from '../upload/type'
import { ILikeUnlikeRes } from '../idea/type'
import { VerifyStatus } from '../profile/type'
import { IFile } from 'bounceComponents/common/Uploader'
import { CompletedSteps } from 'bounceComponents/create-auction-pool/types'

export interface IGetCompanyTeamParams {
  limit?: number
  offset?: number
  full?: boolean
}
export interface ICompanyBasicInfo {
  avatar?: IFileType
  companyBriefIntro: string
  companyFullIntro: string
  companyName: string
  companySize: number
  companyState: number
  contactEmail: string
  github: string
  instagram: string
  linkedin: string
  location: string
  marketType: number
  medium: string
  startupDate: number
  timezone: string
  twitter: string
  website: string
}

export interface ICompanyInvestments {
  amount: string
  companyLogo: string
  companyName: string
  investedDate: number
  investmentType: number
}

export interface ICompanyInvestors {
  investorType: number
  userId: number
  username: string
}

export interface ICompanyTokens {
  chainIdentifierId: number
  isIssued: true
  tokenAddress: string
  tokenLogoUrl: string
  tokenName: string
  tokenType: number
}

export interface IteamMembers {
  userId: number
}

export interface ICompanyProfileParams {
  companyBasicInfo?: ICompanyBasicInfo
  companyInvestments?: ICompanyInvestmentsListItems[]
  companyInvestors?: ICompanyInvestorsListItems[]
  companyTokens?: ICompanyTokensListItems[]
  teamMembers?: ICompanyTeamListItems[]
  completed?: CompletedSteps
}

export interface ICompanyInfoParams {
  thirdpartId?: number
  userId?: number
}

export interface ICompanyTeamListItems {
  roleIds: number[]
  userAvatar: string
  userId: number
  userName: string
  ifKyc?: VerifyStatus
}

export interface IGetCompanyInvestorsParams extends IPaginationParams {
  companyId: number
}

export interface ICompanyInvestorsListItems {
  companyId: number
  investorType: number
  linkedinName: string
  thirdpartId: number
  userId: number
  userInfo: IAvatarLinkType
  ifKyc: VerifyStatus
}

export interface ICompanyInvestmentsListItems {
  companyId: number
  thirdpartId: number
  company: IAvatarLinkType
  investmentDate: number
  investmentType: number
  amount: string
  ifKyc: VerifyStatus
}

export interface IGetCompanyTokensParams {
  offset?: number
  limit?: number
  companyId: number
  full?: boolean
}

export interface ICompanyTokensListItems {
  chainIdentifierId: number
  isIssued: boolean
  tokenAddress: string
  tokenLogo: string
  tokenName: string
  tokenType: number
}
export interface ICompanyOverviewInfo extends ILikeUnlikeRes {
  about: string
  avatar: IFile
  banner: string
  briefIntro: string
  companyId: number
  companyName: string
  companySize: number
  companyState: number
  contactEmail: string
  followers: number
  following: number
  founders: {
    founderName: string
    userId: number
  }[]
  github: string
  instagram: string
  isFollowed: true
  isPremium: number
  linkedin: string
  location: string
  marketType: number
  medium: string
  officialSite: string
  passwordSet: true
  startupDate: number
  timezone: string
  twitter: string
  userType: number
  website: string
  ifKyc: VerifyStatus
}
export interface IGetCompanyMembersListParams extends IPaginationParams {
  companyId: number
}

export interface IPaginationParams {
  offset: number
  limit: number
}
export interface ICompanyListItems<ListType> {
  total: number
  list: ListType[]
}

export interface ICompanyMembersListData {
  roleIds: []
  userAvatar: string
  summary: string
  userId: number
  userName: string
  bio?: string
  ifKyc: VerifyStatus
}

export interface ICompanyInvestorsListData {
  fullName: string
  fullNameId: number
  investorType: string
  userAvatar: string
  userId: number
  userName: string
}
