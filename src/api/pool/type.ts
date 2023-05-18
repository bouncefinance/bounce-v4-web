import { VerifyStatus } from 'api/profile/type'
import { ChainId } from 'constants/chain'
import { CurrencyAmount } from 'constants/token'
import { Post } from '../type'

export enum PoolType {
  'FixedSwap' = 1,
  'Duch' = 2,
  'Lottery' = 3,
  'SealedBid' = 4,
  'fixedSwapNft' = 5,
  ENGLISH_AUCTION_NFT = 6,
  'PlayableAuction' = 100
}

export function getTextFromPoolType(type: PoolType) {
  switch (type) {
    case PoolType.Duch:
      return 'Dutch Auction'
    case PoolType.ENGLISH_AUCTION_NFT:
      return 'English Auction'
    case PoolType.FixedSwap:
      return 'Fixed-Swap Auction'
    case PoolType.fixedSwapNft:
      return 'Fixed-Swap NFT'
    case PoolType.Lottery:
      return 'Lottery'
    case PoolType.SealedBid:
      return 'Sealed Bid'
    case PoolType.PlayableAuction:
      return 'Playable Auction'
  }
}

export interface GetPoolCreationSignatureParams {
  amountTotal0: string
  amountTotal1?: string
  category: PoolType
  chainId: number
  claimAt: number
  closeAt: number
  creator: string
  maxAmount1PerWallet: string
  merkleroot: string
  name: string
  openAt: number
  token0: string
  token1: string
  tokenId?: string
  tokenIds?: string[]
  amountMinIncr1?: string
  amountMin1?: string
  is721?: boolean
  maxPlayer?: number
  totalShare?: string | number
  nShare?: string | number
}

export interface GetPoolCreationSignatureResponse {
  expiredTime: number
  signature: string
}

export interface GetWhitelistMerkleTreeRootParams {
  addresses: string[]
  category: PoolType
  chainId: number
}

export interface GetWhitelistMerkleTreeRootResponse {
  merkleroot: string
}

export enum PoolStatus {
  'Upcoming' = 1,
  'Live' = 2,
  'Finish' = 3,
  'Closed' = 4,
  'Cancelled' = 5
}

export interface GetPoolInfoParams {
  category: PoolType
  chainId: number
  poolId: string
  address?: string
  tokenType: 1 | 2
}

export interface TokenFromApi {
  address: string
  coingeckoId: string
  currentPrice: number
  decimals: number
  largeUrl?: string
  name: string
  smallUrl?: string
  symbol: string
  thumbUrl?: string
}

export interface CreatorUserInfo {
  avatar: string
  companyAvatar: string
  companyIntroduction: string
  companyName: string
  name: string
  publicRole?: null[] | null
  userId: number
  userType: number
  isVerify?: VerifyStatus
}

export interface LikeInfo {
  dislikeCount: number
  likeCount: number
  myDislike: number
  myLike: number
}

export interface FixedSwapPool {
  amountTotal0: string
  amountTotal1: string
  category: PoolType
  chainId: number
  claimAt: number
  closeAt: number
  contract: string
  createdTxHash: string
  creator: string
  creatorClaimed: boolean
  creatorUserInfo: CreatorUserInfo
  description: string
  likeInfo: LikeInfo
  id: number
  currentTotal0: string
  currentTotal1: string
  enableWhiteList: boolean
  maxAmount1PerWallet: string
  name: string
  openAt: number
  participant: {
    address?: string
    claimed?: boolean
    regreted?: boolean
    swappedAmount0?: string
    is721?: 0 | 1
    tokenId?: string
  }
  ifCollect: boolean
  poolId: string
  poolPrice: number
  ratio: string
  posts: null | Post[]
  status: PoolStatus
  swappedAmount0: string
  token0: TokenFromApi
  token1: TokenFromApi
  tokenId: string
  is721?: 0 | 1
}

export interface FixedSwapPoolProp extends FixedSwapPool {
  currencyAmountTotal0: CurrencyAmount
  currencyAmountTotal1: CurrencyAmount
  currencySwappedAmount0: CurrencyAmount
  currencyMaxAmount1PerWallet: CurrencyAmount
  currencySurplusTotal0: CurrencyAmount
  currencySwappedTotal1: CurrencyAmount
  ethChainId: ChainId
  participant: {
    address?: string
    claimed?: boolean
    regreted?: boolean
    swappedAmount0?: string
    currencySwappedAmount0: CurrencyAmount | undefined
    currencySwappedAmount1: CurrencyAmount | undefined
  }
  totalShare?: string | number
  maxPlayere?: string | number
  curPlayer?: string | number
}

export interface FixedSwapNFTPoolProp extends FixedSwapPool {
  currencyAmountTotal1: CurrencyAmount
  currencySwappedTotal1: CurrencyAmount
  ethChainId: ChainId
  participant: {
    address?: string
    claimed?: boolean
    regreted?: boolean
    swappedAmount0?: string
    currencySwappedAmount1: CurrencyAmount | undefined
    is721?: 0 | 1
    tokenId?: string
  }
}

export interface EnglishAuctionNFTPoolProp extends FixedSwapPool {
  currencyAmountMin1: CurrencyAmount | undefined
  currencyAmountMinIncr1: CurrencyAmount | undefined
  ethChainId: ChainId
  participant: {
    address?: string
    claimed?: boolean
    is721?: 0 | 1
    tokenId?: string
  }
  creatorClaimed: boolean
  currentBidder: string | undefined
  currentBidderAmount1: CurrencyAmount | undefined
  currentBidderMinAmount: CurrencyAmount | undefined
  gasFee: CurrencyAmount | undefined
  isWinner: boolean
  isUserJoinedPool: boolean
}

export interface GetPoolInfoResponse {
  dutchPool: any
  fixedSwapPool: FixedSwapPool
  lotteryPool: any
  sealedBidPool: any
  fixedSwapNftPool: any
}

export interface GetPoolHistoryParams {
  address: string
  category: PoolType
  chainId: number
  poolId: string
  tokenType: 1 | 2
}

export interface GetWinnersListParams {
  limit: number
  offset: number
  chainId: number
  poolId: string
}

export type PoolEvent = 'Swapped' | 'Reversed'

export interface PoolHistory {
  //block timestamp
  blockTs: number

  //pool auction type: 1="fixed_swap", 2="dutch", 3="lottery", 4="sealed_bid"
  category: number

  //chain id, offered by backend api
  chainId: number

  //event name: Swapped,Reversed
  event: PoolEvent

  //activity id in db
  id: number

  //pool id in contract, in decimal
  poolId: string

  //user regreted or not
  regreted: boolean

  //buyer wallet address
  requestor: string

  //token sold (token0) amount, in decimal.
  token0Amount: string

  token0Decimals: string

  //token sold (token0) symbol
  token0Symbol: string

  //token sold (token0) total volume. unit is USD. calculated by price of token 1
  token0Volume: number

  //tx hash
  txHash: string
}

export interface GetPoolHistoryResponse {
  list: PoolHistory[]
  total: number
}

export interface GetWinnersListResponse {
  dealt: boolean
  list: string[]
  total: number
}

export interface UpdateAuctionBackgroundParams {
  id: number
  description?: string
  posts?: Post[]
}
