import { IFile } from 'bounceComponents/common/Uploader'
import { ChainId } from 'constants/chain'
import { Moment } from 'moment'
import { AllocationStatus, IReleaseType } from 'bounceComponents/create-auction-pool/types'
import { PoolType } from 'api/pool/type'
import { Token } from 'bounceComponents/fixed-swap/type'
export enum ITab {
  'Basic',
  'Detail'
}
export enum ParticipantStatus {
  'Public' = 'PUBLIC',
  'Whitelist' = 'WHITELIST'
}
export enum PoolStatus {
  'Init' = 0,
  'Released' = 1,
  'Approved' = 2,
  'Approved_Failed' = 3,
  'On_Chain' = 4
}
export interface ICommunity {
  communityName: string
  communityLink: string
}
export interface IFragmentReleaseTimes {
  startAt: Moment | null
  radio: string
  key?: number
}
export interface IBasicInfoParams {
  banner: string
  chainId: number | ChainId
  community: ICommunity[]
  description: string
  id: number
  posts?: string
  projectLogo: string
  projectName: string
  roadmap: string
  tokennomics: string
  website: string
  whitepaperLink: string
}
export enum IAuctionType {
  FIXED_PRICE_AUCTION = 'Fixed Price Auction',
  DUTCH_AUCTION = 'Dutch Auction',
  PLAYABLE_AUCTION = 'Playable Auction'
}
export enum IAuctionTypeMap {
  'Fixed Price Auction' = 1,
  'Dutch Auction' = 2,
  'Playable Auction' = 100
}

export interface IDetailInitValue {
  id: number
  name: string
  creator?: string
  projectPicture: string
  projectMobilePicture: string
  fragmentReleaseTimes: IFragmentReleaseTimes[]
  TokenLogo: string
  TokenName: string
  ChainId: ChainId
  ContractAddress: string
  ContractDecimalPlaces: number
  AuctionType: PoolType
  Token: Token
  SwapRatio: string
  TotalSupply: string
  startTime: Moment | null
  endTime: Moment | null
  allocationStatus: AllocationStatus
  allocationPerWallet: string
  releaseType: IReleaseType
  delayUnlockingTime: moment.Moment | null
  linearUnlockingStartTime: moment.Moment | null
  linearUnlockingEndTime: moment.Moment | null
  fragmentReleaseSize?: string
  isRefundable: boolean
  participantStatus: ParticipantStatus
  whitelist: string[]
  status: PoolStatus
}
export interface IPoolInfoParams {
  id: number
  name?: string
  picture1: string
  picture2: string
  category: PoolType
  chainId: number
  releaseType: IReleaseType
  ratio: string
  token0?: string
  token0Decimals?: number | undefined
  token0Logo?: string | IFile
  token0Name?: string
  token0Symbol?: string
  totalAmount0?: string
  token1?: string
  tokenId?: string
  poolId?: number
  openAt?: number
  claimAt?: number
  closeAt?: number
  closeIncrInterval?: number
  creator?: string
  fragments?: string
  is721?: boolean
  isReal?: boolean
  maxAmount1PerWallet?: string
  maxPlayer?: string
  merkleroot?: string
  amountMax1?: string
  amountMin1?: string
  amountMinIncr1?: string
  amountTotal0?: string
  amountTotal1?: string
  auctionHodlerEnabled?: boolean
  releaseData: { startAt: number; endAtOrRatio: number }[]
  reverseEnabled?: boolean
  times?: number
  tokenIds?: string[]
  totalShare?: string
  customizedNeeds?: string
  whitelistEnabled?: boolean
  whitelistAddresses?: string[]
  status?: PoolStatus
  poolsId?: number
}
export interface IValues {
  basic: IBasicInfoParams
  pool: IDetailInitValue
}
