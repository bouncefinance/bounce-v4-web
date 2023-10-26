export interface DisperseListParam {
  address?: string
  chainId?: number
  token?: string
  hash?: string
  offset?: number
  limit?: number
}

export interface LocksListParam {
  address: string
  chainId?: number
  hash?: string
  token?: string
  offset?: number
  limit?: number
}

export interface TokenInfoList {
  list: TokenInfo[]
  total: number
}

export interface LockInfoList {
  list: LockInfo[]
  total: number
}

export interface ExchangeInfo {
  id: number
  chain_id: number
  name: string
  logo?: string
  uniswap: string
  chain_type: number
  created_at: string
  updated_at: string
}

export interface ExchangeList {
  list: ExchangeInfo[]
  total: number
}

export interface TokenInfo {
  id: number
  contract: string
  creator: string
  token_type: number
  chain_id: string
  token: string
  name: string
  symbol: string
  decimals: number
  thumb_url: string
  small_url: string
  large_url: string
  price: string
  supply: string
  hash: string
  tx_ts: number
  block_height: number
  created_at: string
  updated_at: string
}

export interface LockInfo {
  id: number
  contract: string
  creator: string
  chain_id: number
  exchange_id: number
  token0: string
  token0_name: string
  token1: string
  token1_name: string
  token: string
  token_id: string
  deploy_contract: string
  new_owner: string
  title: string
  amount: string
  lock_type: number
  lock_start: number
  lock_end: number
  release_data: ''
  hash: string
  tx_ts: number
  block_height: number
  created_at: string
  updated_at: string
  status: number
  released_amount: string
}

export interface MyDisperseList {
  list: Disperse[]
  total: number
}

export interface Disperse {
  id: number
  contract: string
  creator: string
  chain_id: number
  token: string
  name: string
  amount: string
  total_count: string
  decimals: number
  hash: string
  tx_ts: number
  block_height: number
  created_at: string
  updated_at: string
}

export interface ExchangeParam {
  chainId: number
  uniVersion: number
  limit?: number
  offset?: number
}
