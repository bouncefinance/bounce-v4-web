import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Web3ReactProvider, Web3ReactHooks } from '@web3-react/core'
import 'inter-ui'
import { StyledEngineProvider } from '@mui/material'
import { MuiThemeProvider } from './themes'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import Blocklist from './components/essential/Blocklist'
// import { NetworkContextName } from './constants'
import App from './pages/App'
import store from './state'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import ApplicationUpdater from './state/application/updater'
import MulticallUpdater from './state/multicall/updater'
import TransactionUpdater from './state/transactions/updater'
// import getLibrary from './utils/getLibrary'
import { Buffer } from 'buffer'

import { hooks_metaMask as metaMaskHooks, connector_metaMask as metaMask } from './connectors'
import { hooks_okxWallet as okxWalletHooks, connector_okxWallet as okxWallet } from './connectors'
import { hooks_network as networkHooks, connector_network as network } from './connectors'
import {
  hooks_walletConnectV2 as walletConnectV2Hooks,
  connector_walletConnectV2 as walletConnectV2
} from './connectors'

import type { MetaMask } from '@web3-react/metamask'
import type { Network } from '@web3-react/network'
import type { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'
import { OKXWallet } from '@okwallet/web3-react-okxwallet'

// const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

const connectors: [MetaMask | OKXWallet | WalletConnectV2 | Network, Web3ReactHooks][] = [
  [metaMask, metaMaskHooks],
  [okxWallet, okxWalletHooks],
  [walletConnectV2, walletConnectV2Hooks],
  [network, networkHooks]
]

function Updaters() {
  return (
    <>
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
    </>
  )
}
window.Buffer = window.Buffer || Buffer

const container = document.getElementById('root')
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!)

root.render(
  <StrictMode>
    <Web3ReactProvider connectors={connectors}>
      <Blocklist>
        <Provider store={store}>
          <Updaters />
          <StyledEngineProvider injectFirst>
            <MuiThemeProvider>
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </MuiThemeProvider>
          </StyledEngineProvider>
        </Provider>
      </Blocklist>
    </Web3ReactProvider>
  </StrictMode>
)

serviceWorkerRegistration.unregister()
