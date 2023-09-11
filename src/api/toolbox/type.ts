export interface DisperseListParam {
  address: string
  chainId: number
  token?: string
}

export interface TokenInfoList {
  list: TokenInfo[]
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
