// import { injected, okInjected, walletconnect, connector_walletConnectV2 } from 'connectors'
// import { AbstractConnector } from '@web3-react/abstract-connector'
// import { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'
// const localSaveConnectedWalletKey = 'localSaveConnectedWalletKey'

// export function isInjectedConnected() {
//   const key = localStorage.getItem(localSaveConnectedWalletKey) || ''
//   return Boolean(key)
// }

// export function setInjectedConnected(connector?: AbstractConnector | WalletConnectV2) {
//   if (!connector) {
//     localStorage.setItem(localSaveConnectedWalletKey, '')
//     return
//   }
//   localStorage.setItem(localSaveConnectedWalletKey, connector === injected ? 'injected' :
//     connector === okInjected ? 'okInjected' : connector === walletconnect ? 'walletconnectV1' :
//       connector === connector_walletConnectV2 ? 'walletconnectV2' : '')
// }

type WalletType = 'MetaMask' | 'OKX Wallet' | 'WalletConnectV2'

export function setPrevConnectWallet(walletType?: WalletType | null) {
  localStorage.setItem('PREV_CONNECT_WALLET', walletType || '')
}

export function getPrevConnectWallet() {
  return localStorage.getItem('PREV_CONNECT_WALLET') as WalletType | undefined
}
