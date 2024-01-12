import { configureStore } from '@reduxjs/toolkit'
import walletReducer from './connection/walletSlice'
import accountReducer from './connection/accountSlice'

export const store = configureStore({
  reducer: {
    wallet: walletReducer,
    account: accountReducer
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false
    })
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
