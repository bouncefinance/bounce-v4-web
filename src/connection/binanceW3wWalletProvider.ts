/* eslint-disable @typescript-eslint/unbound-method */
import WalletConnectProvider from '@binance/w3w-ethereum-provider'
import { ErrorResponse, IWCEthRpcConnectionOptions } from '@binance/w3w-types'
// import { AbstractConnector } from '@web3-react/abstract-connector'
import {
  Actions,
  Connector,
  ProviderConnectInfo,
  ProviderRpcError,
  RequestArguments,
  WatchAssetParameters
} from '@web3-react/types'

// const __DEV__: boolean = process.env.NODE_ENV !== 'production'

export const URI_AVAILABLE = 'URI_AVAILABLE'

export interface WalletConnectConnectorArguments extends IWCEthRpcConnectionOptions {
  supportedChainIds?: number[]
}

export class UserRejectedRequestError extends Error {
  public constructor() {
    super()
    this.name = this.constructor.name
    this.message = 'The user rejected the request.'
  }
}
export interface BinanceW3wWalletConstructorArgs {
  actions: Actions
  options: WalletConnectConnectorArguments
  onError?: (error: Error) => void
}
export interface BinanceW3WProvider extends WalletConnectProvider {
  request(args: RequestArguments): Promise<unknown>
  on(eventName: string | symbol, listener: (...args: any[]) => void): this
  removeListener(eventName: string | symbol, listener: (...args: any[]) => void): this
}

// function getSupportedChains({ supportedChainIds, rpc }: WalletConnectConnectorArguments): number[] | undefined {
//   if (supportedChainIds) {
//     return supportedChainIds
//   }

//   return rpc ? Object.keys(rpc).map(k => Number(k)) : undefined
// }
function parseChainId(chainId: string) {
  return Number.parseInt(chainId, 16)
}
export class BinanceW3WWeb3Connector extends Connector {
  public provider?: BinanceW3WProvider
  private readonly options: WalletConnectConnectorArguments
  private eagerConnection?: Promise<void>
  constructor({ actions, options, onError }: BinanceW3wWalletConstructorArgs) {
    super(actions, onError)
    this.options = options
  }

  private async isomorphicInitialize(): Promise<void> {
    if (this.eagerConnection) return
    return (this.eagerConnection = import('@binance/w3w-ethereum-provider').then(async m => {
      const provider = await new m.default(this.options)
      if (provider) {
        this.provider = Object.assign(provider, {
          on: provider.on as any,
          request: provider.request,
          removeListener: provider.removeListener as any
        })

        this.provider.on('connect', ({ chainId }: ProviderConnectInfo): void => {
          this.actions.update({ chainId: parseChainId(chainId) })
        })

        this.provider.on('disconnect', (error: ProviderRpcError): void => {
          this.actions.resetState()
          this.onError?.(error)
        })

        this.provider.on('chainChanged', (chainId: string): void => {
          this.actions.update({ chainId: parseChainId(chainId) })
        })

        this.provider.on('accountsChanged', (accounts: string[]): void => {
          if (accounts.length === 0) {
            // handle this edge case by disconnecting
            this.actions.resetState()
          } else {
            this.actions.update({ accounts })
          }
        })
      }
    }))
  }
  /** {@inheritdoc Connector.connectEagerly} */
  public async connectEagerly(): Promise<void> {
    const cancelActivation = this.actions.startActivation()

    try {
      await this.isomorphicInitialize()
      if (!this.provider) return cancelActivation()

      // Wallets may resolve eth_chainId and hang on eth_accounts pending user interaction, which may include changing
      // chains; they should be requested serially, with accounts first, so that the chainId can settle.
      const accounts = (await this.provider.request({ method: 'eth_accounts' })) as string[]
      if (!accounts.length) throw new Error('No accounts returned')
      const chainId = (await this.provider.request({ method: 'eth_chainId' })) as string
      this.actions.update({ chainId: parseChainId(chainId), accounts })
    } catch (error) {
      console.debug('Could not connect eagerly', error)
      // we should be able to use `cancelActivation` here, but on mobile, metamask emits a 'connect'
      // event, meaning that chainId is updated, and cancelActivation doesn't work because an intermediary
      // update has occurred, so we reset state instead
      this.actions.resetState()
    }
  }
  public async activate(chainId?: number): Promise<void> {
    try {
      await this.isomorphicInitialize()
      console.log('chainId', chainId)

      const account = await new Promise<string>((resolve, reject) => {
        if (!this.provider) {
          //   const WalletConnectProvider = (await import('@binance/w3w-ethereum-provider')).default
          //   this.provider = new WalletConnectProvider(this.options)
          throw 'no have provider'
        }
        const userReject = () => {
          // Erase the provider manually
          this.provider = undefined
          reject(new UserRejectedRequestError())
        }

        // Workaround to bubble up the error when user reject the connection
        this.provider.connector.on('disconnect', () => {
          // Check provider has not been enabled to prevent this event callback from being called in the future
          if (!account) {
            userReject()
          }
        })

        if (this.options.lng) this.provider.setLng(this.options.lng)
        if (this.provider.connector.connected) {
          console.log('this.provider.connector.connected', this.provider.connector.connected)
          this.deactivate()
        }
        return this.provider
          .enable(chainId || this.options.chainId)
          .then((accounts: string[]) => resolve(accounts[0]))
          .catch((error: ErrorResponse): void => {
            if (error.code === 100001) {
              userReject()
              return
            }
            reject(error)
          })
      }).catch(err => {
        throw err
      })
    } catch (error) {
      console.debug(error)
    }
    // this.walletConnectProvider.on('disconnect', this.handleDisconnect)
    // this.walletConnectProvider.on('chainChanged', this.handleChainChanged)
    // this.walletConnectProvider.on('accountsChanged', this.handleAccountsChanged)

    // return { provider: this.provider, account }
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public async getProvider(): Promise<any> {
    return this.provider
  }

  //   public async getChainId(): Promise<number | string> {
  //     return Promise.resolve(this.provider.chainId)
  //   }

  //   public async getAccount(): Promise<null | string> {
  //     return Promise.resolve(this.provider.accounts).then((accounts: string[]): string => accounts[0])
  //   }

  public deactivate() {
    if (this.provider) {
      //   this.provider.removeListener('disconnect', this.handleDisconnect)
      //   this.provider.removeListener('chainChanged', this.handleChainChanged)
      //   this.provider.removeListener('accountsChanged', this.handleAccountsChanged)
      this.provider.disconnect()
    }
  }

  //   public close() {
  //     this.emitDeactivate()
  //   }
  public async watchAsset({
    address,
    symbol,
    decimals,
    image
  }: Pick<WatchAssetParameters, 'address'> & Partial<Omit<WatchAssetParameters, 'address'>>): Promise<true> {
    if (!this.provider) throw new Error('No provider')

    return this.provider
      .request({
        method: 'wallet_watchAsset',
        params: {
          type: 'ERC20',
          options: {
            address, // The address that the token is at.
            symbol, // A ticker symbol or shorthand, up to 5 chars.
            decimals, // The number of decimals in the token
            image // A string url of the token logo
          }
        }
      })
      .then(success => {
        if (!success) throw new Error('Rejected')
        return true
      })
  }
}

// export const getWeb3Connector = () => {
//   if (isInBinance()) {
//     return InjectedConnector
//   }
//   return BinanceW3WWeb3Connector
// }
