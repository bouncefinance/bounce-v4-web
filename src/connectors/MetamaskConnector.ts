import { AbstractConnector } from '@web3-react/abstract-connector'
import warning from 'tiny-warning'
function parseSendReturn(sendReturn: any) {
  return sendReturn.hasOwnProperty('result') ? sendReturn.result : sendReturn
}
export class NoBscProviderError extends Error {
  constructor() {
    super()
    this.name = this.constructor.name
    this.message = 'No BSC provider was found on window.BinanceChain.'
  }
}
export class UserRejectedRequestError extends Error {
  constructor() {
    super()
    this.name = this.constructor.name
    this.message = 'The user rejected the request.'
  }
}
export class MetamaskConnector extends AbstractConnector {
  constructor(kwargs: { supportedChainIds?: number[] }) {
    super(kwargs)
    this.handleNetworkChanged = this.handleNetworkChanged.bind(this)
    this.handleChainChanged = this.handleChainChanged.bind(this)
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }
  handleChainChanged(chainId: any) {
    this.emitUpdate({ chainId, provider: window?.web3?.currentProvider })
  }
  handleAccountsChanged(accounts: any) {
    if (accounts.length === 0) {
      this.emitDeactivate()
    } else {
      this.emitUpdate({ account: accounts[0] })
    }
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  handleClose(code: any, reason: any) {
    this.emitDeactivate()
  }
  handleNetworkChanged(networkId: any) {
    this.emitUpdate({ chainId: networkId, provider: window?.web3?.currentProvider })
  }
  async activate() {
    if (!window?.web3?.currentProvider) {
      throw new NoBscProviderError()
    }
    if (window?.web3?.currentProvider.on) {
      window?.web3?.currentProvider.on('chainChanged', this.handleChainChanged)
      window?.web3?.currentProvider.on('accountsChanged', this.handleAccountsChanged)
      window?.web3?.currentProvider.on('close', this.handleClose)
      window?.web3?.currentProvider.on('networkChanged', this.handleNetworkChanged)
    }
    if (window?.web3?.currentProvider.isMetaMask && window?.web3?.currentProvider) {
      window.web3.currentProvider.autoRefreshOnNetworkChange = false
    }
    // try to activate + get account via eth_requestAccounts
    let account
    try {
      account = await window?.web3?.currentProvider
        .send('eth_requestAccounts')
        .then((sendReturn: any) => parseSendReturn(sendReturn)[0])
    } catch (error: any) {
      if (error.code === 4001) {
        throw new UserRejectedRequestError()
      }
      warning(false, 'eth_requestAccounts was unsuccessful, falling back to enable')
    }
    // if unsuccessful, try enable
    if (!account) {
      // if enable is successful but doesn't return accounts, fall back to getAccount (not happy i have to do this...)
      account = await window?.web3?.currentProvider
        .enable()
        .then((sendReturn: any) => sendReturn && parseSendReturn(sendReturn)[0])
    }
    return { provider: window?.web3?.currentProvider, ...(account ? { account } : {}) }
  }
  async getProvider() {
    return window?.web3?.currentProvider
  }
  async getChainId() {
    if (!window?.web3?.currentProvider) {
      throw new NoBscProviderError()
    }
    let chainId
    try {
      chainId = await window?.web3?.currentProvider.send('eth_chainId').then(parseSendReturn)
    } catch {
      warning(false, 'eth_chainId was unsuccessful, falling back to net_version')
    }
    if (!chainId) {
      try {
        chainId = await window?.web3?.currentProvider.send('net_version').then(parseSendReturn)
      } catch {
        warning(false, 'net_version was unsuccessful, falling back to net version v2')
      }
    }
    if (!chainId) {
      try {
        chainId = parseSendReturn(window?.web3?.currentProvider.send({ method: 'net_version' }))
      } catch {
        warning(false, 'net_version v2 was unsuccessful, falling back to manual matches and static properties')
      }
    }
    if (!chainId) {
      if (window?.web3?.currentProvider.isDapper) {
        chainId = parseSendReturn(window?.web3?.currentProvider.cachedResults.net_version)
      } else {
        chainId =
          window?.web3?.currentProvider.chainId ||
          window?.web3?.currentProvider.netVersion ||
          window?.web3?.currentProvider.networkVersion ||
          window?.web3?.currentProvider._chainId
      }
    }
    return chainId
  }
  async getAccount() {
    if (!window?.web3?.currentProvider) {
      throw new NoBscProviderError()
    }
    let account
    try {
      account = await window?.web3?.currentProvider
        .send('eth_accounts')
        .then((sendReturn: any) => parseSendReturn(sendReturn)[0])
    } catch {
      warning(false, 'eth_accounts was unsuccessful, falling back to enable')
    }
    if (!account) {
      try {
        account = await window?.web3?.currentProvider.enable().then((sendReturn: any) => parseSendReturn(sendReturn)[0])
      } catch {
        warning(false, 'enable was unsuccessful, falling back to eth_accounts v2')
      }
    }
    if (!account) {
      account = parseSendReturn(window?.web3?.currentProvider.send({ method: 'eth_accounts' }))[0]
    }
    return account
  }
  deactivate() {
    if (window?.web3?.currentProvider && window?.web3?.currentProvider.removeListener) {
      window?.web3?.currentProvider.removeListener('chainChanged', this.handleChainChanged)
      window?.web3?.currentProvider.removeListener('accountsChanged', this.handleAccountsChanged)
      window?.web3?.currentProvider.removeListener('close', this.handleClose)
      window?.web3?.currentProvider.removeListener('networkChanged', this.handleNetworkChanged)
    }
  }
  async isAuthorized() {
    if (!window?.web3?.currentProvider) {
      return false
    }
    try {
      return await window?.web3?.currentProvider.send('eth_accounts').then((sendReturn: any) => {
        if (parseSendReturn(sendReturn).length > 0) {
          return true
        } else {
          return false
        }
      })
    } catch {
      return false
    }
  }
}
