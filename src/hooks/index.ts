import { Web3Provider } from '@ethersproject/providers'
import { Web3ReactHooks } from '@web3-react/core'
// import { Web3ReactContextInterface } from '@web3-react/core/dist/types'
import { useEffect, useState } from 'react'
import { isMobile } from 'react-device-detect'
import {
  connector_okxWallet,
  connector_walletConnectV2,
  injected,
  okInjected,
  connector_metaMask,
  hooks_okxWallet,
  hooks_metaMask,
  hooks_walletConnectV2,
  hooks_network,
  connector_network
} from '../connectors'
import { getPrevConnectWallet } from 'utils/isInjectedConnectedPrev'
import { Connector } from '@web3-react/types'
import { ChainId, isSupportNetwork } from 'constants/chain'
// const walletKey = localStorage.getItem('localSaveConnectedWalletKey') || ''
const walletKey = getPrevConnectWallet()
// import { hooks, walletConnectV2 } from 'connectors/walletConnectV2'

const getCurrentConnector = (): [Connector, Web3ReactHooks] => {
  const prveConnectWallet = getPrevConnectWallet()
  switch (prveConnectWallet) {
    case 'WalletConnectV2':
      return [connector_walletConnectV2, hooks_walletConnectV2]
    case 'OKX Wallet':
      return [connector_okxWallet, hooks_okxWallet]
    case 'MetaMask':
      return [connector_metaMask, hooks_metaMask]
    default:
      connector_network.activate()
      return [connector_network, hooks_network]
  }
}

export function useActiveWeb3React(): {
  chainId?: ChainId
  account?: string
  connector?: Connector
  library?: Web3Provider
  hooks?: Web3ReactHooks
  errorNetwork: boolean | undefined
} {
  // const { connector, hooks } = useWeb3ReactCore()
  const [connector, hooks] = getCurrentConnector()
  const chainId = hooks.useChainId()
  const library = hooks.useProvider()

  let account = hooks.useAccount()
  if (chainId && !isSupportNetwork(chainId)) {
    account = undefined
  }

  return {
    chainId,
    account,
    connector: connector,
    library,
    errorNetwork: chainId === undefined ? undefined : !isSupportNetwork(chainId),
    hooks: hooks
  }
}

export function useEagerConnect() {
  // const { connector, hooks } = useWeb3ReactCore() // specifically using useWeb3ReactCore because of what this hook does
  const { connector, hooks } = useActiveWeb3React()
  const active = hooks?.useIsActive()
  const activate = connector?.activate
  const [tried, setTried] = useState(false)

  useEffect(() => {
    const isInjected = walletKey && walletKey === 'MetaMask'

    if (!isInjected) {
      setTried(true)
      return
    }

    if (!activate) return

    if (walletKey === 'MetaMask') {
      injected.isAuthorized().then(isAuthorized => {
        if (isAuthorized) {
          activate?.(injected, undefined, true)?.catch(() => {
            setTried(true)
          })
        } else {
          if (isMobile && window.ethereum) {
            activate?.(injected, undefined, true)?.catch(() => {
              setTried(true)
            })
          } else {
            setTried(true)
          }
        }
      })
    } else if (walletKey === 'OKX Wallet') {
      okInjected.isAuthorized().then(isAuthorized => {
        if (isAuthorized) {
          activate?.(connector_okxWallet, undefined, true)?.catch(() => {
            setTried(true)
          })
        } else {
          if (isMobile && window.ethereum) {
            activate?.(connector_okxWallet, undefined, true)?.catch(() => {
              setTried(true)
            })
          } else {
            setTried(true)
          }
        }
      })
    } else if (walletKey === 'WalletConnectV2') {
      okInjected.isAuthorized().then(isAuthorized => {
        if (isAuthorized) {
          activate?.(connector_walletConnectV2, undefined, true)?.catch(() => {
            setTried(true)
          })
        } else {
          if (isMobile && window.ethereum) {
            activate?.(connector_walletConnectV2, undefined, true)?.catch(() => {
              setTried(true)
            })
          } else {
            setTried(true)
          }
        }
      })
    }
  }, [activate]) // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (active) {
      setTried(true)
    }
  }, [active])

  return tried
}

/**
 * Use for network and injected - logs user in
 * and out after checking what network theyre on
 */

// HOMIE 这里控制的是 inject 钱包的自动连接
export function useInactiveListener(suppress = false) {
  // const { connector, error, hooks } = useWeb3ReactCore() // specifically using useWeb3React because of what this hook does
  // const { connector, hooks } = useWeb3ReactCore() // specifically using useWeb3React because of what this hook does
  const [connector, hooks] = getCurrentConnector()
  const active = hooks.useIsActive()
  const activate = connector.activate

  useEffect(() => {
    const { ethereum } = window

    // if (ethereum && ethereum.on && !active && !error && !suppress) {
    if (ethereum && ethereum.on && !active && !suppress) {
      const handleChainChanged = () => {
        // eat errors
        if (walletKey === 'MetaMask') {
          activate(injected, undefined, true)?.catch(error => {
            console.error('Failed to activate after chain changed', error)
          })
        }
        if (walletKey === 'OKX Wallet') {
          activate(okInjected, undefined, true)?.catch(error => {
            console.error('Failed to activate after chain changed', error)
          })
        }

        if (walletKey === 'WalletConnectV2') {
          activate(connector_walletConnectV2, undefined, true)?.catch(error => {
            console.error('Failed to activate after chain changed', error)
          })
        }
      }

      const handleAccountsChanged = (accounts: string[]) => {
        if (accounts.length > 0) {
          // eat errors
          if (walletKey === 'MetaMask') {
            activate(injected, undefined, true)?.catch(error => {
              console.error('Injected, Failed to activate after accounts changed', error)
            })
          }
          if (walletKey === 'OKX Wallet') {
            activate(okInjected, undefined, true)?.catch(error => {
              console.error('OkWallet, Failed to activate after accounts changed', error)
            })
          }
          if (walletKey === 'WalletConnectV2') {
            activate(connector_walletConnectV2, undefined, true)?.catch(error => {
              console.error('WalletConnectV2, Failed to activate after accounts changed', error)
            })
          }
        }
      }

      // const localSaveConnectedWalletKey = 'localSaveConnectedWalletKey'
      // if (localStorage.getItem(localSaveConnectedWalletKey)) {
      // TODO HOMIE Metamask auto connect
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      // }

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
        }
      }
    }
    return undefined
  }, [activate, active, suppress])
}
