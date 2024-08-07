import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export type AccountState = {
  accounts: Array<{
    address: Array<string>
    publicKey: string
    isSelected: boolean
    logger: string
  }>
}

const initialState: AccountState = {
  accounts: []

  // accountAddress: '',
  // accountBalance: undefined
  // assets: Array<{
  //   symbol: string,
  //   balance: string
  // }>
}

export const accountSlice = createSlice({
  name: 'wallet',
  initialState: initialState,
  reducers: {
    updateAccount: (
      state: AccountState,
      action: PayloadAction<
        Array<{
          address: Array<string>
          publicKey: string
          isSelected: boolean
          logger: string
        }>
      >
    ) => {
      state.accounts = action.payload
    },
    selectAccount: (state: AccountState, action: PayloadAction<string>) => {
      const acc: Array<{
        address: Array<string>
        publicKey: string
        isSelected: boolean
        logger: string
      }> = state.accounts

      acc.forEach(account => {
        if (account.isSelected) {
          account.isSelected = false
        }
      })

      // Select the account with the given address
      const accountToSelect = acc.find(account => account.publicKey === action.payload)
      if (accountToSelect) {
        accountToSelect.isSelected = true
      } else {
        console.log(`No account found with the address ${action.payload}`)
      }

      state.accounts = acc
    },
    addAccount: (
      state: AccountState,
      action: PayloadAction<{ address: Array<string>; logger: string; publicKey: string }>
    ) => {
      let curSelected: any
      const temp = state.accounts

      temp.forEach(account => {
        // Validate duplicates
        if (account.address == action.payload.address) {
          selectAccount(curSelected)
          throw new Error(`Duplicate account ${action.payload.address}`)
        }
        if (account.isSelected) {
          account.isSelected = false
          curSelected = account.address
        }
      })

      // Push to accounts and select
      temp.push({
        address: action.payload.address,
        logger: action.payload.logger,
        isSelected: true,
        publicKey: action.payload.publicKey
      })
      state.accounts = temp
      console.log(state.accounts)
    },
    removeAccount: (state: AccountState, action: PayloadAction<string>) => {
      state.accounts.filter((account: any) => account.address != action.payload)
    }

    // updateAccount: (state, action: PayloadAction<AccountState>) => {
    //   state.accountAddress = action.payload.accountAddress
    //   state.accountBalance = action.payload.accountBalance
    // },
    // updateAccountAddress: (state, action: PayloadAction<string>) => {
    //   state.accountAddress = action.payload
    // },
    // updateAccountBalance: (state, action: PayloadAction<string>) => {
    //   state.accountBalance = action.payload
    // },
    // removeAccount: state => {
    //   state.accountAddress = ''
    //   state.accountBalance = undefined
    // }
  }
})

export const { updateAccount, selectAccount, addAccount, removeAccount } = accountSlice.actions

export default accountSlice.reducer
