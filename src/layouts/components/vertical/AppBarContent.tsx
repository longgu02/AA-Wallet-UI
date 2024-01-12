// ** MUI Imports
import Box from '@mui/material/Box'
import { Theme } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import useMediaQuery from '@mui/material/useMediaQuery'
import InputAdornment from '@mui/material/InputAdornment'

// ** Icons Imports
import Menu from 'mdi-material-ui/Menu'
import Magnify from 'mdi-material-ui/Magnify'

// ** Type Import
import { Settings } from 'src/@core/context/settingsContext'

// ** Components
import ModeToggler from 'src/@core/layouts/components/shared-components/ModeToggler'
import UserDropdown from 'src/@core/layouts/components/shared-components/UserDropdown'
import NotificationDropdown from 'src/@core/layouts/components/shared-components/NotificationDropdown'
import { Button } from '@mui/material'
import { BrowserProvider, ethers } from 'ethers'
import { useState } from 'react'
import ConnectWalletButton from '../connection/ConnectWalletButton'
// import { Connector, useConnect } from 'wagmi'

interface Props {
  hidden: boolean
  settings: Settings
  toggleNavVisibility: () => void
  saveSettings: (values: Settings) => void
}

const AppBarContent = (props: Props) => {
  // ** Props
  const { hidden, settings, saveSettings, toggleNavVisibility } = props

  // ** Hook
  const hiddenSm = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'))
  const [curProvider, setCurProvider] = useState<BrowserProvider>()
  // const { connectors, connect } = useConnect()

  // ** Wallet
  // const provider = new ethers.BrowserProvider(window.ethereum)
  // const connectwalletHandler = () => {
  //   if (window.ethereum) {
  //     provider.send('eth_requestAccounts', []).then(async wallet => {
  //       console.log(wallet)
  //       console.log('provider', await provider.getSigner())
  //       const signer = await provider.getSigner()
  //       setCurProvider(provider)
  // setCurProvider(provider);
  // await handleGetAccount();
  // const recp = await transferToken(
  // 	provider,
  // 	"0",
  // 	ERC20_TOKEN_ADDRESSES.goerliETH
  // );
  // console.log(recp);
  // await axios
  // 	.post("http://localhost:4000/wallet/test", {
  // 		signer: JSON.stringify(signer.provider),
  // 	})
  // 	.then(function (response) {
  // 		console.log(response);
  // 	})
  // 	.catch(function (error) {
  // 		console.log(error);
  // 	});
  // setDefaultAccount(await signer.getAddress());
  // const signer2 = new Wallet(provider)
  // await accountChangedHandler(await provider.getSigner());
  //     })
  //   } else {
  //     console.log('Please Install Metamask!!!')
  //   }
  // }

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'

        // top: 0,
        // position: 'fixed',
        // zIndex: 500
        // backgroundColor: '#c0c0c0'
      }}
    >
      <Box className='actions-left' sx={{ mr: 2, display: 'flex', alignItems: 'center' }}>
        {hidden ? (
          <IconButton
            color='inherit'
            onClick={toggleNavVisibility}
            sx={{ ml: -2.75, ...(hiddenSm ? {} : { mr: 3.5 }) }}
          >
            <Menu />
          </IconButton>
        ) : null}
        <TextField
          size='small'
          sx={{ '& .MuiOutlinedInput-root': { borderRadius: 4 } }}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <Magnify fontSize='small' />
              </InputAdornment>
            )
          }}
        />
      </Box>
      <Box className='actions-right' sx={{ display: 'flex', alignItems: 'center' }}>
        {/* <Button variant='contained' sx={{ margin: 3 }}>
          Connect Wallet
        </Button> */}
        <ConnectWalletButton />
        {/* {connectors.map((connector) => (
    <button key={connector.uid} onClick={() => connect({ connector })}>
      {connector.name}
    </button>)} */}
        {/* {connectors.map(connector => (
          <button key={connector.uid} onClick={() => connect({ connector })}>
            {connector.name}
          </button>
        ))} */}
        <ModeToggler settings={settings} saveSettings={saveSettings} />
        <NotificationDropdown />
        <UserDropdown />
      </Box>
    </Box>
  )
}

export default AppBarContent
