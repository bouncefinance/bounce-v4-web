import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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
import Web3Provider from 'components/Web3Provider'

// const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName)

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
    <Provider store={store}>
      <BrowserRouter>
        <Web3Provider>
          <Blocklist>
            <Updaters />
            <StyledEngineProvider injectFirst>
              <MuiThemeProvider>
                <App />
              </MuiThemeProvider>
            </StyledEngineProvider>
          </Blocklist>
        </Web3Provider>
      </BrowserRouter>
    </Provider>
  </StrictMode>
)

serviceWorkerRegistration.unregister()
