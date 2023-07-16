import { Web3Provider } from '@ethersproject/providers'
import { OKXConnector } from './OKXWalletConnector'
import { BscConnector } from '@binance-chain/bsc-connector'
import { OKXWallet } from '@okwallet/web3-react-okxwallet'
import { Network } from '@web3-react/network'
import { MetaMask } from '@web3-react/metamask'
import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'
import { initializeConnector } from '@web3-react/core'
import { MetamaskConnector } from './MetamaskConnector'
import { NetworkConnector } from './NetworkConnector'
import { SUPPORT_NETWORK_CHAIN_IDS, NETWORK_CHAIN_ID, ChainId } from 'constants/chain'
import { getRpcUrl } from './MultiNetworkConnector'
// import { docCookies } from './cookie'

const NETWORK_URL = process.env.REACT_APP_NETWORK_URL
export const REACT_APP_WALLET_CONNECT_PROJECT_ID = process.env.REACT_APP_WALLET_CONNECT_PROJECT_ID

if (typeof NETWORK_URL === 'undefined') {
  throw new Error(`REACT_APP_NETWORK_URL must be a defined environment variable`)
}

export const network = new NetworkConnector({
  urls: { [NETWORK_CHAIN_ID]: NETWORK_URL }
})

let networkLibrary: Web3Provider | undefined
export function getNetworkLibrary(): Web3Provider {
  return (networkLibrary = networkLibrary ?? new Web3Provider(network.provider as any))
}

export const injected = new MetamaskConnector({
  supportedChainIds: SUPPORT_NETWORK_CHAIN_IDS
})

// binance only
export const binance = new BscConnector({ supportedChainIds: [56] })

export const okInjected = new OKXConnector({
  supportedChainIds: SUPPORT_NETWORK_CHAIN_IDS
})

const walletConnectRpc: { [key in number]: string } = {}
for (const id of SUPPORT_NETWORK_CHAIN_IDS) {
  walletConnectRpc[id] = getRpcUrl(id)
}

// @web3-react/core 8.2.0
// docCookies.getItem('selectWallet') !== 'Metamask' &&
//   docCookies.setItem('selectWallet', 'Metamask', 'Fri, 31 Dec 9999 23:59:59 GMT') &&
//   window.location.reload()
export const [connector_network, hooks_network] = initializeConnector<Network>(
  actions => new Network({ actions, urlMap: { [NETWORK_CHAIN_ID]: NETWORK_URL } })
)
export const [connector_okxWallet, hooks_okxWallet] = initializeConnector<OKXWallet>(
  actions =>
    new OKXWallet({
      actions,
      options: {
        mustBeOKXWallet: true
      }
    })
)
export const [connector_metaMask, hooks_metaMask] = initializeConnector<MetaMask>(
  actions =>
    new MetaMask({
      actions,
      options: {
        mustBeMetaMask: true
      }
    })
)

export const [connector_walletConnectV2, hooks_walletConnectV2] = initializeConnector<WalletConnectV2>(actions => {
  return new WalletConnectV2({
    // actions, options, defaultChainId, timeout, onError
    actions,
    options: {
      projectId: `${REACT_APP_WALLET_CONNECT_PROJECT_ID}`,
      chains: SUPPORT_NETWORK_CHAIN_IDS,
      showQrModal: true
      // projectId: string;
      // chains: number[];
      // optionalChains?: number[];
      // methods?: string[];
      // optionalMethods?: string[];
      // events?: string[];
      // optionalEvents?: string[];
      // rpcMap?: EthereumRpcMap;
      // metadata?: Metadata;
      // showQrModal: boolean;
      // qrModalOptions?: QrModalOptions;
    }
  })
})

export const OVERLAY_READY = 'OVERLAY_READY'

export type FormaticSupportedChains = Extract<ChainId, ChainId.MAINNET | ChainId.SEPOLIA | ChainId.GÖRLI>

export const CHAIN_ID_NETWORK_ARGUMENT: { readonly [chainId in FormaticSupportedChains]: string | undefined } = {
  [ChainId.MAINNET]: 'Ethereum',
  [ChainId.SEPOLIA]: 'Sepolia',
  [ChainId.GÖRLI]: 'Goerli'
}
