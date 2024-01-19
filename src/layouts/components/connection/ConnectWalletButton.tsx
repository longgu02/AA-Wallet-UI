import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  Tooltip,
  Typography
} from '@mui/material'
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined'
import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import LaunchIcon from '@mui/icons-material/Launch'

import { useAppSelector } from 'src/redux/hooks'
import { formatAddress } from 'src/utils'
import Link from 'next/link'
import { getNetworkInfo } from 'src/constant/chain'
import { Eip1193Provider, ethers } from 'ethers'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateWallet } from 'src/redux/connection/walletSlice'
import { getAccountAddress } from 'src/utils/userOp'
import { updateAccountAddress, updateAccountBalance } from 'src/redux/connection/accountSlice'
import useNotify from 'src/hooks/useNotify'

declare global {
  interface Window {
    ethereum?: Eip1193Provider | any
  }
}

export default function ConnectWalletButton() {
  // ** Hooks
  const [isLoading, setLoading] = useState<boolean>(false)
  const [isOpen, setOpen] = useState<boolean>(false)
  const [isCopied, setCopy] = useState<boolean>(false)
  const { errorNotify } = useNotify()

  // Redux
  const { chainId, address, signer, balance } = useAppSelector((state: any) => state.wallet)
  const dispatch = useDispatch()

  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const handleCopyAddress = async () => {
    await navigator.clipboard.writeText(address)
    setCopy(true)
  }

  const handleDisconnect = async () => {
    dispatch(
      updateWallet({
        address: '',
        chainId: undefined,
        provider: undefined,
        signer: undefined,
        balance: 0,
        isAdmin: false
      })
    )
  }

  const connect = async () => {
    if (window.ethereum) {
      setLoading(true)
      const provider = new ethers.BrowserProvider(window.ethereum)
      provider.send('eth_requestAccounts', []).then(async accounts => {
        const accountBalance = await provider.getBalance(accounts[0])
        const network = await provider.getNetwork()
        const signer = await provider.getSigner()

        console.log('provider', await provider.getSigner())
        getAccountAddress(provider)
          .then(res => {
            dispatch(updateAccountAddress(res))
            provider
              .getBalance(res)
              .then((res: BigInt) => {
                dispatch(updateAccountBalance(res.toString()))
              })
              .catch((err: any) => {
                console.log(err)
              })
          })
          .catch(err => {
            console.error(err)
            errorNotify(err)
          })
        dispatch(
          updateWallet({
            address: accounts[0],
            chainId: Number(network.chainId),
            provider: provider,
            signer: signer,
            balance: Number(ethers.formatEther(accountBalance)),
            isAdmin: false
          })
        )

        // const signer = await provider.getSigner()
      })

      // window.ethereum.on('disconnect', handleDisconect)
    } else {
      console.log('Please install Metamask!')
    }
    setLoading(false)
  }

  return (
    <Box sx={{ margin: 2 }}>
      <Button variant='contained' disableElevation color='primary' disabled={isLoading} onClick={handleOpen}>
        {isLoading ? (
          <CircularProgress size={30} color='inherit' />
        ) : (
          <>
            <AccountBalanceWalletOutlinedIcon sx={{ mr: 1 }} />
            {address ? formatAddress(address, 5) : 'Connect Wallet'}
          </>
        )}
      </Button>
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        {signer && address ? (
          <Box>
            <DialogTitle
              id='alert-dialog-title'
              sx={{
                textAlign: 'center',
                backgroundColor: '#EBECEC'
              }}
            >
              <Typography variant='h5'>Wallet Connected</Typography>

              <Typography>Connected with Metamask</Typography>
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
              <Typography>
                <span style={{ fontWeight: 'bold' }}>Current Account: </span> {formatAddress(address, 7)}
                <Tooltip title={isCopied ? 'Copied' : 'Copy'}>
                  <IconButton onClick={handleCopyAddress}>
                    <ContentCopyIcon />
                  </IconButton>
                </Tooltip>
              </Typography>
              <Typography>
                <span style={{ fontWeight: 'bold' }}>Balance: </span> {balance}
              </Typography>
              <Box sx={{ alignItems: 'baseline', mt: 1 }}>
                <Link href={`${getNetworkInfo(chainId)?.blockExplorerUrls[0]}address/${address}`}>
                  View account on explorer
                </Link>
                <LaunchIcon sx={{ marginLeft: 0.5, fontSize: 15 }} />
              </Box>
            </DialogContent>
            <DialogActions sx={{ display: 'flex' }}>
              <Button variant='contained' color='error' sx={{ ml: 'auto', mr: 'auto' }} onClick={handleDisconnect}>
                Disconnect
              </Button>
            </DialogActions>
          </Box>
        ) : (
          <Box>
            <DialogTitle
              id='alert-dialog-title'
              sx={{
                textAlign: 'center',
                backgroundColor: '#EBECEC'
              }}
            >
              <Typography variant='h5'>Choose Wallet</Typography>

              <Typography>Safely connect to your existing blockchain wallet.</Typography>
            </DialogTitle>
            <DialogContent sx={{ mt: 2 }}>
              <List disablePadding={true} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <ListItem
                  button
                  onClick={() => connect()}
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '10px',
                    width: 180,
                    height: 120
                  }}
                >
                  <img
                    src='https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/1200px-MetaMask_Fox.svg.png'
                    alt='metamask'
                    style={{ height: 80, width: 80, objectFit: 'contain' }}
                  />
                  <Typography noWrap variant='subtitle2'>
                    Metamask
                  </Typography>
                </ListItem>

                <ListItem
                  disabled
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: '10px',
                    width: 180,
                    height: 120
                  }}
                >
                  <img
                    src='https://1000logos.net/wp-content/uploads/2022/05/WalletConnect-Logo.png'
                    alt='metamask'
                    style={{ height: 80, width: 80, objectFit: 'contain' }}
                  />
                  <Typography noWrap variant='subtitle2'>
                    Wallet Connect
                  </Typography>
                </ListItem>
              </List>
            </DialogContent>
          </Box>
        )}
      </Dialog>
    </Box>
  )
}
