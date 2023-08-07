import { NetworkConnector } from './NetworkConnector'
import { StaticJsonRpcProvider, Web3Provider } from '@ethersproject/providers'
import { ChainId, SUPPORTED_NETWORKS, SUPPORT_NETWORK_CHAIN_IDS } from '../constants/chain'
import { AppJsonRpcProvider } from 'connection/providers'

export function getRpcUrl(chainId: ChainId) {
  switch (chainId) {
    case ChainId.MAINNET:
      return `https://rpc.ankr.com/eth/128bdedab70a53096c6b5132d94384254aee84b8491502b928ab6c08652a7b78`
    // return `https://mainnet.infura.io/v3/` + process.env.REACT_APP_INFURA_KEY
    case ChainId.SEPOLIA:
      return 'https://sepolia.infura.io/v3/' + process.env.REACT_APP_INFURA_KEY
    case ChainId.GÖRLI:
      return 'https://goerli.infura.io/v3/' + process.env.REACT_APP_INFURA_KEY
    default:
      return SUPPORTED_NETWORKS[chainId]?.rpcUrls[0] || ''
  }
}

export function getOtherNetworkLibrary(chainId: ChainId) {
  const rpc = getRpcUrl(chainId)
  if (!rpc) return undefined
  return new Web3Provider(
    new NetworkConnector({
      urls: {
        [chainId]: getRpcUrl(chainId)
      }
    }).provider as any
  )
}

/**
 * These are the only JsonRpcProviders used directly by the interface.
 */

const _RPC_PROVIDERS: any = {}
const _RPC_URLS_MAPS: any = {}
SUPPORT_NETWORK_CHAIN_IDS.map(c => {
  _RPC_PROVIDERS[c] = new AppJsonRpcProvider(c)
  _RPC_URLS_MAPS[c] = getRpcUrl(c)
})
export const RPC_PROVIDERS = _RPC_PROVIDERS as { [key in ChainId]: StaticJsonRpcProvider }
export const RPC_URLS_MAPS = _RPC_URLS_MAPS as { [key in ChainId]: string }
