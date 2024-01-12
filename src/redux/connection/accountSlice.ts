import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type AccountState = {
  accountAddress: string
  accountBalance?: string
}

const initialState: AccountState = {
  accountAddress: '',
  accountBalance: undefined
}

export const accountSlice = createSlice({
  name: 'wallet',
  initialState: initialState,
  reducers: {
    updateAccount: (state, action: PayloadAction<AccountState>) => {
      state.accountAddress = action.payload.accountAddress
      state.accountBalance = action.payload.accountBalance
    },
    updateAccountAddress: (state, action: PayloadAction<string>) => {
      state.accountAddress = action.payload
    },
    updateAccountBalance: (state, action: PayloadAction<string>) => {
      state.accountBalance = action.payload
    },
    removeAccount: state => {
      state.accountAddress = ''
      state.accountBalance = undefined
    }
  }
})

export const { updateAccount, updateAccountAddress, updateAccountBalance, removeAccount } = accountSlice.actions

export default accountSlice.reducer
