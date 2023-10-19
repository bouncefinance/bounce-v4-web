import { Token } from 'bounceComponents/fixed-swap/type'
import { Moment } from 'moment'
import { ChainId } from 'constants/chain'

// type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>

export enum CreationStep {
  'TOKEN_INFORMATION',
  'AUCTION_PARAMETERS',
  'ADVANCED_SETTINGS',
  'CREATION_CONFIRMATION'
}

export enum IReleaseType {
  Instant, // 0
  Cliff, // 1
  Linear, // 2
  Fragment // 3
}

export interface IReleaseData {
  startAt: Moment | null
  // entAt in timestamp or ratio in 1e18
  endAt?: Moment | null
  ratio?: string
}

export interface NFTToken {
  // address: string
  // chainId?: number
  // tokenId?: number
  // logoURI?: string
  // name?: string
  // symbol?: string
  // tokenUrl?: string
  // dangerous?: boolean
  contractAddr?: string
  contractName?: string
  tokenId?: string
  balance?: string
  name?: string
  description?: string
  image?: string
}

export type CompletedSteps = { [k: number]: boolean }

export enum ParticipantStatus {
  'Public' = 'PUBLIC',
  'Whitelist' = 'WHITELIST'
}

export enum AllocationStatus {
  'NoLimits' = 'NO_LIMITS',
  'Limited' = 'LIMITED'
}
export enum PriceSegmentType {
  'BySecond' = 'BY_SECOND',
  'ByMinute' = 'BY_MINUTE',
  'Staged' = 'STAGED'
}
export enum TokenType {
  ERC20 = 'ERC20',
  ERC1155 = 'ERC1155',
  ERC721 = 'ERC721'
}

export enum AuctionType {
  DUTCH_AUCTION = 'Dutch Auction',
  ENGLISH_AUCTION = 'English Auction',
  MUTANT_ENGLISH = 'Mutant English',
  FIXED_PRICE = 'Fixed Price',
  RANDOM_SELECTION = 'Random Selection'
}

export enum TgBotActiveStep {
  GETAPITOKEN,
  GUIDEFORM,
  COMFIRM
}

export enum TgBotTabValue {
  AUCTION,
  ACCOUNT,
  BOTSETUP
}

export interface AuctionPool {
  tokenType: TokenType
  nftTokenFrom: NFTToken
  nft721TokenFrom: NFTToken[]
  auctionChainId?: string
  tokenFrom: Token
  tokenTo: Token
  swapRatio: string
  poolSize: string
  allocationPerWallet: string
  priceSegmentType: PriceSegmentType
  allocationStatus: AllocationStatus
  poolName: string
  startTime: Moment | null
  endTime: Moment | null
  shouldDelayUnlocking: boolean
  delayUnlockingTime: Moment | null
  releaseType: IReleaseType | 1000
  releaseDataArr: IReleaseData[]
  whitelist: string[]
  activeStep: CreationStep
  completed: CompletedSteps
  participantStatus: ParticipantStatus
  priceFloor?: string
  amountMinIncr1?: string
  auctionType?: AuctionType
  winnerNumber?: number
  ticketPrice?: string
  maxParticipantAllowed?: number
  enableReverse?: boolean
  startPrice?: string
  reservePrice?: string
  segmentAmount?: string
  endPrice?: string
  closeHour?: string
  closeMinute?: string
  claimHour?: string
  claimMinute?: string
  delayUnlockingHour?: string
  delayUnlockingMinute?: string
  creatorRatio?: string
  prevBidderRatio?: string
  lastBidderRatio?: string
  tgBotActiveStep?: TgBotActiveStep
  tgToken?: string
  auctionInChain: ChainId | number | undefined
  tgBotTabValue: TgBotTabValue
  isTgGuide: boolean
}
