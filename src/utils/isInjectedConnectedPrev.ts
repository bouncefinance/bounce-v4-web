import { OKXWalletConnector, injected } from 'connectors'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { autoConnectInjectedEveryone } from '../constants'

const localSaveConnectedWalletKey = 'localSaveConnectedWalletKey'

export function isInjectedConnected() {
  const key = localStorage.getItem(localSaveConnectedWalletKey) || ''
  return autoConnectInjectedEveryone || key === 'injected'
}

export function setInjectedConnected(connector?: AbstractConnector) {
  if (!connector) {
    localStorage.setItem(localSaveConnectedWalletKey, '')
    return
  }
  localStorage.setItem(
    localSaveConnectedWalletKey,
    connector === injected || connector === OKXWalletConnector ? 'injected' : ''
  )
}
