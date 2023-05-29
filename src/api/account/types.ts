import { PoolEvent, PoolType } from 'api/pool/type'
import { ChainId } from 'constants/chain'
import { CurrencyAmount } from 'constants/token'

export interface GetUserPoolsDashboardParams {
  address?: string
  category: PoolType | 0 // 1="fixed_swap", 2="dutch", 3="lottery", 4="sealed_bid", 5="fixed_swap_nft"
  chainId: number
  limit?: number
  offset?: number
  tokenType?: 1 | 2
  queryType: DashboardQueryType | 0
}

export enum DashboardQueryType {
  ongoing = 1,
  claim = 2
}

export interface GetUserPoolsDashboardRes {
  category: PoolType
  chainId: number
  poolId: number
}

export interface GetUserPoolsDashboardCollectRes extends GetUserPoolsDashboardRes {
  openAt: number
}

export interface GetUserPoolsDashboardStatRes {
  buyVolume: string
  createdCount: number
  participantCount: number
  saledVolume: string
}

export interface GetAddressActivitiesParams {
  address: string
  category: PoolType | 0 // 1="fixed_swap", 2="dutch", 3="lottery", 4="sealed_bid", 5="fixed_swap_nft"
  chainId: number
  limit?: number
  offset?: number
  tokenType: 1 | 2
}

export interface GetAddressActivitiesRes {
  blockTs: number
  category: PoolType
  chainId: number
  ethChainId?: ChainId
  event: PoolEvent
  id: number
  is721: number
  poolId: string
  regreted: boolean
  requestor: string
  token0Amount: string
  token0Decimals: number
  token0Symbol: string
  token0Volume: string
  currency0Amount?: CurrencyAmount
  tokenId: string
  txHash: string
}
