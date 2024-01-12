import { Box } from '@mui/material'
import { BrowserProvider, Eip1193Provider, ethers } from 'ethers'
import { ReactElement, useState } from 'react'

declare global {
  interface Window {
    ethereum: Eip1193Provider // or ExternalProvider
  }
}

export default function ConnectWalletWrapper(props: { children: ReactElement }) {
  // ** Props
  const { children } = props

  // ** Hooks
  const [curProvider, setCurProvider] = useState<BrowserProvider>()

  const connectwalletHandler = () => {
    if (window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      provider.send('eth_requestAccounts', []).then(async wallet => {
        console.log(wallet)
        console.log('provider', await provider.getSigner())
        setCurProvider(provider)
  
        // const signer = await provider.getSigner()
      })
    } else {
      console.log('Please Install Metamask!!!')
    }
  }

  return <Box>{children}</Box>
}
