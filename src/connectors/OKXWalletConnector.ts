import { AbstractConnector } from '@web3-react/abstract-connector'
import { AbstractConnectorArguments } from '@web3-react/types'
import warning from 'tiny-warning'

function parseSendReturn(sendReturn: any) {
  return sendReturn.hasOwnProperty('result') ? sendReturn.result : sendReturn
}

export class NoOKXProviderError extends Error {
  constructor() {
    super()
    this.name = this.constructor.name
    this.message = 'No OKX provider was found on window.okxwallet.'
  }
}

export class UserRejectedRequestError extends Error {
  constructor() {
    super()
    this.name = this.constructor.name
    this.message = 'The user rejected the request.'
  }
}

export class OKXConnector extends AbstractConnector {
  constructor(kwargs: AbstractConnectorArguments | undefined) {
    super(kwargs)

    this.handleNetworkChanged = this.handleNetworkChanged.bind(this)
    this.handleChainChanged = this.handleChainChanged.bind(this)
    this.handleAccountsChanged = this.handleAccountsChanged.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleChainChanged(chainId: any) {
    this.emitUpdate({ chainId, provider: window.okxwallet })
  }

  handleAccountsChanged(accounts: string | any[]) {
    if (accounts.length === 0) {
      this.emitDeactivate()
    } else {
      this.emitUpdate({ account: accounts[0] })
    }
  }

  handleClose() {
    this.emitDeactivate()
  }

  handleNetworkChanged(networkId: any) {
    this.emitUpdate({ chainId: networkId, provider: window.okxwallet })
  }

  async activate() {
    if (!window.okxwallet) {
      throw new NoOKXProviderError()
    }

    if (window.okxwallet.on) {
      window.okxwallet.on('chainChanged', this.handleChainChanged)
      window.okxwallet.on('accountsChanged', this.handleAccountsChanged)
      window.okxwallet.on('close', this.handleClose)
      window.okxwallet.on('networkChanged', this.handleNetworkChanged)
    }

    if (window.okxwallet.isMetaMask) {
      window.okxwallet.autoRefreshOnNetworkChange = false
    }

    // try to activate + get account via eth_requestAccounts
    let account
    try {
      account = await window.okxwallet.send('eth_requestAccounts').then(sendReturn => parseSendReturn(sendReturn)[0])
    } catch (error) {
      const err: any = error
      if (err.code === 4001) {
        throw new UserRejectedRequestError()
      }
      warning(false, 'eth_requestAccounts was unsuccessful, falling back to enable')
    }

    // if unsuccessful, try enable
    if (!account) {
      // if enable is successful but doesn't return accounts, fall back to getAccount (not happy i have to do this...)
      account = await window.okxwallet.enable().then(sendReturn => sendReturn && parseSendReturn(sendReturn)[0])
    }

    return { provider: window.okxwallet, ...(account ? { account } : {}) }
  }

  async getProvider() {
    return window.okxwallet
  }

  async getChainId() {
    if (!window.okxwallet) {
      throw new NoOKXProviderError()
    }

    let chainId
    try {
      chainId = await window.okxwallet.send('eth_chainId').then(parseSendReturn)
    } catch {
      warning(false, 'eth_chainId was unsuccessful, falling back to net_version')
    }

    if (!chainId) {
      try {
        chainId = await window.okxwallet.send('net_version').then(parseSendReturn)
      } catch {
        warning(false, 'net_version was unsuccessful, falling back to net version v2')
      }
    }

    if (!chainId) {
      try {
        chainId = parseSendReturn(window.okxwallet.send({ method: 'net_version' }))
      } catch {
        warning(false, 'net_version v2 was unsuccessful, falling back to manual matches and static properties')
      }
    }

    if (!chainId) {
      if (window.okxwallet.isDapper) {
        chainId = parseSendReturn(window.okxwallet.cachedResults.net_version)
      } else {
        chainId =
          window.okxwallet.chainId ||
          window.okxwallet.netVersion ||
          window.okxwallet.networkVersion ||
          window.okxwallet._chainId
      }
    }

    return chainId
  }

  async getAccount() {
    if (!window.okxwallet) {
      throw new NoOKXProviderError()
    }

    let account
    try {
      account = await window.okxwallet.send('eth_accounts').then(sendReturn => parseSendReturn(sendReturn)[0])
    } catch {
      warning(false, 'eth_accounts was unsuccessful, falling back to enable')
    }

    if (!account) {
      try {
        account = await window.okxwallet.enable().then(sendReturn => parseSendReturn(sendReturn)[0])
      } catch {
        warning(false, 'enable was unsuccessful, falling back to eth_accounts v2')
      }
    }

    if (!account) {
      account = parseSendReturn(window.okxwallet.send({ method: 'eth_accounts' }))[0]
    }

    return account
  }

  deactivate() {
    if (window.okxwallet && window.okxwallet.removeListener) {
      window.okxwallet.removeListener('chainChanged', this.handleChainChanged)
      window.okxwallet.removeListener('accountsChanged', this.handleAccountsChanged)
      window.okxwallet.removeListener('close', this.handleClose)
      window.okxwallet.removeListener('networkChanged', this.handleNetworkChanged)
    }
  }

  async isAuthorized() {
    if (!window?.okxwallet) {
      return false
    }

    try {
      return await window.okxwallet.send('eth_accounts').then(sendReturn => {
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
