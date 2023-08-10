import { IFile } from 'bounceComponents/common/Uploader'
import { ChainId } from 'constants/chain'
import { Moment } from 'moment'
import { AllocationStatus, IReleaseType } from 'bounceComponents/create-auction-pool/types'
export interface ICommunity {
  communityName: string
  communityLink: string
}
interface ITokenProps {
  tokenToAddress: string
  tokenToSymbol: string
  tokenToLogoURI: string
  tokenToDecimals: string
}
export interface IFragmentReleaseTimes {
  startAt: Moment | null
  radio: string
  key?: number
}
export interface IBasicInfoParams {
  banner: IFile | string
  chainId: number | ChainId
  community: ICommunity[]
  description: string
  id: number
  posts?: string
  projectLogo: IFile | string
  projectMobilePicture: IFile | string
  projectName: string
  projectPicture: IFile | string
  roadmap: string
  tokennomics: string
  website: string
  whitepaperLink: string
}
export enum IAuctionType {
  FIXED_PRICE_AUCTION = 'Fixed Price Auction',
  PLAYABLE_AUCTION = 'Playable Auction',
  SEALED_BID_AUCTION = 'Sealed-Bid Auction',
  ORDER_BOOK_AUCTION = 'Order Book Auction',
  DUTCH_AUCTION = 'Dutch Auction',
  NONE = 'None, need to customize'
}
export interface IDetailInitValue {
  fragmentReleaseTimes: IFragmentReleaseTimes[]
  TokenLogo: IFile
  TokenName: string
  ChainId: ChainId
  ContractAddress: string
  ContractDecimalPlaces: string
  AuctionType: IAuctionType
  CustomizedNeeds: string
  Token: ITokenProps
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
}
export interface IPoolInfoParams {
  category: string
  chainId: number
  name: string
  token0?: string
  token0Decimals?: number
  token0Logo?: string | IFile
  token0Name?: string
  token0Symbol?: string
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
  maxPlayer?: number
  merkleroot?: string
  amountMax1?: string
  amountMin1?: string
  amountMinIncr1?: string
  amountTotal0?: string
  amountTotal1?: string
  auctionHodlerEnabled?: boolean
  releaseData?: { startAt: number; endAtOrRatio: number }[]
  reverseEnabled?: boolean
  times?: number
  tokenIds?: string[]
  totalShare?: number
}
