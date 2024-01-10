import { Web3ReactHooks } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import { ChainId } from 'constants/chain'

export enum ConnectionType {
  INJECTED = 'INJECTED',
  COINBASE_WALLET = 'COINBASE_WALLET',
  WALLET_CONNECT_V2 = 'WALLET_CONNECT_V2',
  UNISWAP_WALLET_V2 = 'UNISWAP_WALLET_V2',
  NETWORK = 'NETWORK',
  OKX_WALLET = 'OKX_WALLET',
  // BINANCE_WALLET = 'BINANCE_WALLET',
  GNOSIS_SAFE = 'GNOSIS_SAFE',
  BIT_GET = 'BIT_GET',
  BINANCE_W3W_WALL = 'BINANCE_W3W_WALL'
}

export interface Connection {
  getName(): string
  connector: Connector
  hooks: Web3ReactHooks
  type: ConnectionType
  getIcon?(isDarkMode: boolean): string
  shouldDisplay(): boolean
  overrideActivate?: (chainId?: ChainId) => boolean
  active?: false
}
