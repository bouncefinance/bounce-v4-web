import { VerifyStatus } from 'api/profile/type'
import { ChainId } from 'constants/chain'
import { Currency, CurrencyAmount } from 'constants/token'
import { Post } from '../type'
import { IReleaseType } from 'bounceComponents/create-auction-pool/types'
import { BackedTokenType } from 'pages/account/MyTokenOrNFT'
import { BigintIsh } from 'constants/token/constants'
import { Position } from '@uniswap/v3-sdk'
import BigNumber from 'bignumber.js'

export enum PoolType {
  'FixedSwap' = 1,
  DUTCH_AUCTION = 2,
  'Lottery' = 3,
  'SealedBid' = 4,
  'fixedSwapNft' = 5,
  ENGLISH_AUCTION_NFT = 6,
  ENGLISH_AUCTION = 8,
  MUTANT_ENGLISH_AUCTION_NFT = 9,
  LOTTERY_NFT = 7,
  LOTTERY_BURNING = 10,
  RANDOM_SELECTION_LP = 11,
  'PlayableAuction' = 100
}

export function getTextFromPoolType(type: PoolType) {
  switch (type) {
    case PoolType.DUTCH_AUCTION:
      return 'Dutch Auction'
    case PoolType.ENGLISH_AUCTION_NFT:
      return 'English Auction'
    case PoolType.FixedSwap:
      return 'Fixed-Swap Auction'
    case PoolType.fixedSwapNft:
      return 'Fixed-Swap NFT'
    case PoolType.Lottery:
      return 'Random'
    case PoolType.SealedBid:
      return 'Sealed Bid'
    case PoolType.PlayableAuction:
      return 'Playable Auction'
    case PoolType.ENGLISH_AUCTION:
      return 'English Auction'
    case PoolType.MUTANT_ENGLISH_AUCTION_NFT:
      return 'Mutant English'
    case PoolType.LOTTERY_NFT:
      return 'Lottery NFT'
    case PoolType.LOTTERY_BURNING:
      return 'Lottery Burning'
    case PoolType.RANDOM_SELECTION_LP:
      return 'Random_Selection_Lp'
  }
}
export interface BindTgTokenApiParams {
  tgToken: string
  tgIntroduction?: string
}

export interface GetPoolBurningCreationSignatureParams {
  amountTotal0: string
  amountTotal1?: string
  category: PoolType
  chainId: number
  claimAt: number
  closeAt: number
  creator: string
  maxAmount1PerWallet?: string
  merkleroot: string
  name: string
  openAt: number
  token0: string
  tokenId?: string
  tokenIds?: string[]
  amountMinIncr1?: string
  amountMin1?: string
  amountMax1?: string
  amountStart1?: string
  amountEnd1?: string
  times?: number
  fragments?: string
  is721?: boolean
  maxPlayer?: number
  totalShare?: string | number
  nShare?: string | number
  releaseType?: IReleaseType
  releaseData?: {
    startAt: number | string
    endAtOrRatio: number | string
  }[]
}

export interface GetPoolCreationSignatureParams {
  amountTotal0: string
  amountTotal1?: string
  category: PoolType
  chainId: number
  claimAt: number
  closeAt: number
  creator: string
  maxAmount1PerWallet?: string
  maxAmount0PerWallet?: string
  merkleroot: string
  name: string
  openAt: number
  token0: string
  token1: string
  tokenId?: string
  tokenIds?: string[]
  amountMinIncr1?: string
  amountMin1?: string
  amountMax1?: string
  amountStart1?: string
  amountEnd1?: string
  times?: number
  fragments?: string
  is721?: boolean
  maxPlayer?: number
  totalShare?: string | number
  nShare?: string | number
  releaseType?: IReleaseType
  releaseData?: {
    startAt: number | string
    endAtOrRatio: number | string
  }[]
}

export interface GetPoolCreationSignatureResponse {
  expiredTime: number
  signature: string
  id: number
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

export enum RandomPoolStatus {
  'Upcoming' = 1,
  'Live' = 2,
  'OpenSeed' = 3,
  'Waiting' = 4,
  'Closed' = 5
}

export interface RandomSelectionNFTResultProps {
  poolStatus: RandomPoolStatus
  isUserClaimed: boolean | undefined
  isUserJoined: boolean
  isWinnerSeedDone: boolean
  isUserWinner: boolean
}

export interface GetPoolInfoParams {
  category?: PoolType
  chainId?: number
  poolId?: string
  id?: number
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
  publicRole?: string[]
  userId: number
  userType: number
  ifKyc?: VerifyStatus
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
    is721?: 1 | 2 // 2 721
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
  tokenType: BackedTokenType
  is721?: 1 | 2
  poolVersion?: number
}

export interface FixedSwapPoolProp extends FixedSwapPool {
  currencyAmountTotal0: CurrencyAmount
  currencyAmountTotal1: CurrencyAmount
  currencySwappedAmount0: CurrencyAmount
  currencyMaxAmount1PerWallet: CurrencyAmount
  currencySurplusTotal0: CurrencyAmount
  currencySwappedTotal1: CurrencyAmount
  ethChainId: ChainId
  currentBounceContractAddress: string | undefined
  participant: {
    address?: string
    claimed?: boolean
    regreted?: boolean
    swappedAmount0?: string
    currencySwappedAmount0: CurrencyAmount | undefined // all token0
    currencySwappedAmount1: CurrencyAmount | undefined
    currencyCurReleasableAmount?: CurrencyAmount | undefined // current releasable
    currencyCurClaimableAmount?: CurrencyAmount | undefined // current claimable
    currencyMyReleased?: CurrencyAmount | undefined //current my Released token
  }
  totalShare?: string | number
  maxPlayere?: string | number
  curPlayer?: string | number
  releaseType?: IReleaseType | undefined
  enableReverses?: boolean
  releaseData?: { startAt: number; endAt: number | undefined; ratio: string | undefined }[]
  whitelistData?: {
    isUserInWhitelist: boolean | undefined
    isPermit: boolean | undefined
    loading: boolean
  }
}

export interface RandomSelectionNFTProps extends FixedSwapPool {
  currencyAmountTotal1?: CurrencyAmount
  currencySwappedTotal1?: CurrencyAmount
  ethChainId: ChainId
  mintContractAddress: string
  participant: {
    isJoined?: boolean
    address?: string
    claimed?: boolean
  }
  userTokenAmount?: Currency
  token1Currency: any[]
  totalShare: string | number
  maxPlayere: string | number
  curPlayer: string | number
  burnedTokens: BigintIsh[]
  tokensAddress: string[]
  betTokenAmount: BigintIsh[]
  whitelistData?: {
    isUserInWhitelist: boolean | undefined
    isPermit: boolean | undefined
    loading: boolean
  }
}

export interface RandomSelectionLPProps extends FixedSwapPool {
  currencyAmountTotal1?: CurrencyAmount
  currencySwappedTotal1?: CurrencyAmount
  position?: Position
  positionId?: string
  userTotalFeesReward?: {
    claimableToken0?: CurrencyAmount
    claimableToken1?: CurrencyAmount
    claimedToken0?: CurrencyAmount
    claimedToken1?: CurrencyAmount
  }
  PoolTotal0Fees?: CurrencyAmount
  PoolTotal1Fees?: CurrencyAmount
  ethChainId: ChainId
  mintContractAddress: string
  participant: {
    isJoined?: boolean
    address?: string
    claimed?: boolean
  }
  totalShare: string | number
  maxPlayere: string | number
  curPlayer: string | number
  token0Price: BigNumber | undefined
  token1Price: BigNumber | undefined
  singleQuoteTokenNumber: BigNumber | undefined
  whitelistData?: {
    isUserInWhitelist: boolean | undefined
    isPermit: boolean | undefined
    loading: boolean
  }
}

export interface NFTPoolListProp {
  id: number
  chainId: number
  contract: string
  createdTxHash: string
  poolId: string
  category: PoolType
  creator: string
  creatorClaimed: boolean
  name: string
  description: string
  enableWhiteList: boolean
  token0: TokenFromApi
  openAt: number
  closeAt: number
  claimAt: number
  posts: null | Post[]
  tokenType: BackedTokenType
  maxPlayere: string
  curPlayer: string
  totalShare: string
  status: PoolStatus
  token1: TokenFromApi
  amountTotal0: string
  amountTotal1: string
  swappedAmount0: string
  currentTotal0: string
  currentTotal1: string
  ratio: string
  poolPrice: string
  maxAmount1PerWallet: string
  participant: {
    address: string
    swappedAmount0: string
    claimed: boolean
    regreted: boolean
    tokenId: string
    is721?: 0 | 1 | 2 // 2 721
  }
  creatorUserInfo: CreatorUserInfo
  likeInfo: LikeInfo
  tokenId: string
  is721: 1 | 2 // 2 721; 1 1155
  ifCollect: boolean
  highestBid: string
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
    is721?: 1 | 2
    tokenId?: string
  }
  enableReverses?: boolean
}

export interface DutchAuctionPoolProp extends FixedSwapPool {
  currencyAmountTotal0: CurrencyAmount | undefined
  currencyAmountTotal1: CurrencyAmount | undefined
  currencySwappedAmount0: CurrencyAmount | undefined
  // currencyMaxAmount1PerWallet: CurrencyAmount
  // currencySurplusTotal0: CurrencyAmount
  currencySwappedTotal1: CurrencyAmount | undefined
  highestPrice: CurrencyAmount | undefined
  lowestPrice: CurrencyAmount | undefined
  currencyCurrentPrice: CurrencyAmount | undefined
  currencyLowestBidPrice: CurrencyAmount | undefined
  currencyMaxAmount0PerWallet: CurrencyAmount | undefined
  nextRoundInSeconds: number | undefined
  times: number | undefined
  ethChainId: ChainId
  participant: {
    address?: string
    claimed?: boolean
    regreted?: boolean
    swappedAmount0?: string
    currencySwappedAmount0: CurrencyAmount | undefined // all token0
    currencySwappedAmount1: CurrencyAmount | undefined
    currencyCurReleasableAmount?: CurrencyAmount | undefined // current releasable. It means that the amount of all released token0
    currencyCurClaimableAmount?: CurrencyAmount | undefined // current claimable
    currencyMyReleased?: CurrencyAmount | undefined //current my Released token
    currencyUnfilledAmount1?: CurrencyAmount | undefined // current unfill amount1
  }
  releaseType?: IReleaseType | undefined
  releaseData?: { startAt: number; endAt: number | undefined; ratio: string | undefined }[]
  whitelistData?: {
    isUserInWhitelist: boolean | undefined
    isPermit: boolean | undefined
    loading: boolean
  }
}

export interface Erc20EnglishAuctionPoolProp extends FixedSwapPool {
  currencyAmountTotal0: CurrencyAmount
  currencySwappedAmount0: CurrencyAmount | undefined
  currencySwappedAmount1: CurrencyAmount | undefined
  currencyCurrentPrice: CurrencyAmount | undefined
  currencyMaxAmount1PerWallet: CurrencyAmount | undefined
  currencyAmountStartPrice: CurrencyAmount | undefined
  currencyAmountEndPrice: CurrencyAmount | undefined
  fragments: number | undefined
  ethChainId: ChainId
  participant: {
    address?: string
    claimed?: boolean
    regreted?: boolean
    swappedAmount0?: string
    currencySwappedAmount0: CurrencyAmount | undefined // all token0
    currencySwappedAmount1: CurrencyAmount | undefined
    currencyCurReleasableAmount?: CurrencyAmount | undefined // current releasable
    currencyCurClaimableAmount?: CurrencyAmount | undefined // current claimable
    currencyMyReleased?: CurrencyAmount | undefined //current my Released token
  }
  releaseType?: IReleaseType | undefined
  releaseData?: { startAt: number; endAt: number | undefined; ratio: string | undefined }[]
  whitelistData?: {
    isUserInWhitelist: boolean | undefined
    isPermit: boolean | undefined
    loading: boolean
  }
}

export interface EnglishAuctionNFTPoolProp extends FixedSwapPool {
  currencyAmountMin1: CurrencyAmount | undefined
  currencyAmountMinIncr1: CurrencyAmount | undefined
  ethChainId: ChainId
  participant: {
    address?: string
    claimed?: boolean
    is721?: 1 | 2
    tokenId?: string
    accountBidAmount: CurrencyAmount | undefined
  }
  creatorClaimed: boolean
  currentBidder: string | undefined
  currentBidderAmount1: CurrencyAmount | undefined
  currentBidderMinAmount: CurrencyAmount | undefined
  gasFee: CurrencyAmount | undefined
  isWinner: boolean
  // !TOTD
  isUserJoinedPool: boolean
}

export interface MutantEnglishAuctionNFTPoolProp
  extends Omit<EnglishAuctionNFTPoolProp, 'currencyAmountMinIncr1' | 'currentBidderMinAmount'> {
  amountMinIncrRatio1: CurrencyAmount | undefined
  currentBidderAmount: CurrencyAmount | undefined
  firstBidderAmount: CurrencyAmount | undefined
  extraAmount1: CurrencyAmount | undefined
  nextDistributionAmount1: CurrencyAmount | undefined
  closeIncrInterval: number | undefined
  claimDelay: number | undefined
  distributeRatios: {
    prevBidderRatio: CurrencyAmount | undefined
    lastBidderRatio: CurrencyAmount | undefined
    creatorRatio: CurrencyAmount | undefined
  }
  distributeRewards: {
    prevBidderRewardsEstimate: CurrencyAmount | undefined
    lastBidderRewards: CurrencyAmount | undefined
    creatorRewards: CurrencyAmount | undefined
  }
  whitelistData: {
    isUserInWhitelist: boolean | undefined
    isPermit: boolean | undefined
    loading: boolean
  }
  participant: {
    address?: string
    claimed?: boolean
    is721?: 1 | 2
    tokenId?: string
    accountBidAmount: CurrencyAmount | undefined
    prevBidderGasfeeAmount: CurrencyAmount | undefined
    prevBidderRewardAmount: CurrencyAmount | undefined
  }
}

export interface GetPoolInfoResponse {
  poolVersion: number | undefined
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
  event?: ('Swapped' | 'CreatorClaimed' | 'Reversed' | 'Bid' | 'Bet')[]
}

export interface GetWinnersListParams {
  limit: number
  offset: number
  chainId: number
  poolId: string
  category?: PoolType
}

export type PoolEvent = 'Swapped' | 'CreatorClaimed' | 'Reversed' | 'Bid' | 'Bet'

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

  token1Amount?: string

  //tx hash
  txHash: string

  avatar: string
  // previous round bid reward
  prevBidderReward: string
  prevBidderGasfee: string
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
