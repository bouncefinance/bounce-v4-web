import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import { save, load } from 'redux-localstorage-simple'

import application from './application/reducer'
import { updateVersion } from './global/actions'
// import user from './user/reducer'
import transactions from './transactions/reducer'
import multicall from './multicall/reducer'
import users from './users/reducer'
import wallets from './wallet/reducer'
import userWallet from './userWallet/reducer'
import configOptions from './configOptions/reducer'

const PERSISTED_KEYS: string[] = ['transactions', 'userWallet']

const store = configureStore({
  reducer: {
    application,
    // user,
    transactions,
    multicall,
    users,
    wallets,
    userWallet,
    configOptions
  },
  middleware: [...getDefaultMiddleware({ thunk: true }), save({ states: PERSISTED_KEYS })],
  preloadedState: load({ states: PERSISTED_KEYS })
})

store.dispatch(updateVersion())

export default store

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
