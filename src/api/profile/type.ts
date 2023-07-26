// import { PoolType } from '../pool/type'
import { IAvatarLinkType, IFileType } from '../upload/type'
import { CompletedSteps } from 'bounceComponents/create-auction-pool/types'

export interface IupdateBasicParams {
  avatar: IFileType
  company: IAvatarLinkType
  companyId: number
  thirdpartId: number
  companyRole: number
  contactEmail: string
  description: string
  fullName: string
  github: string
  instagram: string
  invest: IInvestmentItems[]
  linkedin: string
  location: string
  publicRole: number[]
  timezone: string
  twitter: string
  university: IAvatarLinkType
  website: string
}

export interface educationItems {
  degree: number
  description: string
  endTime: number
  id?: number
  major: string
  startTime: number
  university: IAvatarLinkType
}

export interface experienceItems {
  company: IAvatarLinkType
  description: string
  endTime: number
  id?: number
  isCurrently: number
  position: number
  startTime: number
  companyId?: number
  thirdpartId?: number
  ifKyc: VerifyStatus
}
export interface IUpdatePersonalParams {
  careJobs: number[]
  currentState: string
  desiredCompanySize: number
  desiredMarket: number[]
  desiredSalary: string
  education: educationItems[]
  experience: experienceItems[]
  ifRemotely: number
  jobTypes: number[]
  primaryRole: number
  resumes: IFileType[]
  skills: string
  years: number
  completed?: CompletedSteps
}

export interface IGetBasicInvestmentsParams {
  limit: number
  offset: number
  userId: number | string
}

export enum FormType {
  Input = 'input',
  Select = 'select',
  Custom = 'custom'
}

export interface IInvestmentItems {
  company: IAvatarLinkType
  id?: number | string
  investAmount: number | string
  investDate: number
  investType: number | string
  ifKyc?: VerifyStatus
  thirdpartId?: number
  companyId?: number
}
export interface IUserPoolsParams {
  offset: number
  limit: number
  userId: number
}

export interface IAuctionPoolsItems<ListType> {
  total: number
  list: ListType[]
}

export interface IAuctionPoolsData {
  category: number
  chainId: number
  claimAt: number
  closeAt: number
  contract: string
  createdTxHash: string
  creator: string
  enableWhiteList: boolean
  name: string
  openAt: number
  poolId: string
  status: number
  token0: {
    address: string
    coingeckoId: string
    currentPrice: number
    decimals: number
    largeUrl: string
    name: string
    smallUrl: string
    symbol: string
    thumbUrl: string
  }
}
export enum actionState {
  Created = 0,
  Participated = 1
}

export interface IPoolFixedSwapParams {
  action?: actionState
  chainId: number
  userId: number
}
export interface IActivitiesTotalParams {
  chainId: number
  userId: number
}

export enum VerifyStatus {
  NoVerify = 1,
  Verified = 2
}
