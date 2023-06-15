export interface IInstitutionInvestorsParams {
  limit: number
  name: string
  offset: number
  startup: number
}

export interface ICompanyInformationParams {
  companyStage: number
  limit: number
  marketCategory: number
  name: string
  offset: number
  startup: number
}

export interface IPoolsParams {
  category: number
  chainId: number
  creatorAddress?: string
  creatorName?: string
  limit: number
  offset: number
  orderBy: string
  poolId?: string
  poolName?: string
  CreatorUserId?: number
  poolStatusFrontend?: string
  token0Address?: string
  tokenType?: number
  isERC721?: 1 | 2 //1:1155，2:721
}

export enum UserType {
  Profile = 1,
  Company = 0
}

export interface BannerType {
  avatar: string
  category: number
  chainId: number
  name: string
  openAt: number
  token0: string
  tokenAmount0: string
  types: string
  url: string
  mobileImg?: string
}

export interface IPoolFilterParams {
  action: number
  chainId: number
}
