import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Modal,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { Contract, parseEther } from 'ethers'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { accountAbi } from 'src/constant/abis/accountAbi'
import { subscriptionPluginAbi } from 'src/constant/abis/plugins/subscriptionPluginAbi'
import { FASTPLUGIN_ADDRESS } from 'src/constant/address'
import { getJsonRpcProvider } from 'src/constant/chain'
import useNotify from 'src/hooks/useNotify'
import { client } from 'src/services/client'
import { fastTranfer, installPlugin } from 'src/utils/plugin'
import CreateSessionButton from 'src/views/fast-transfer/CreateSessionButton'
import { useImmer } from 'use-immer'

const SubscriptionPage = () => {
  const [services, setServices] = useState([])
  const { accounts } = useSelector(state => state.account)
  const [isInstalled, setInstalled] = useState<boolean | undefined>()
  const [amounts, setAmounts] = useImmer({})
  const [isInstallLoading, setInstallLoading] = useState<boolean>(false)
  const [startDate, setStartDate] = useState()
  const [newName, setNewName] = useState<string>('')
  const [newAddress, setNewAddress] = useState<string>('')
  const [contacts, setContacts] = useState()
  const [open, setOpen] = useState(false)
  const [password, setPassword] = useState<string>('')
  const [openPassword, setOpenPassword] = useState(false)
  const [isTxLoading, setTxLoading] = useImmer<any>({})
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)
  const { successNotify, errorNotify } = useNotify()

  useEffect(() => {
    client
      .get(`/account/${accounts.find(acc => acc.isSelected)?.publicKey}/address-book`)
      .then(res => {
        console.log(res)
        setContacts(res)
      })
      .catch(err => {
        console.log(err)
      })
  }, [])

  const handleInstall = async () => {
    setInstallLoading(true)
    await installPlugin(
      accounts.find(acc => acc.isSelected)?.address[0],
      accounts.find(acc => acc.isSelected)?.publicKey,
      accounts.find(acc => acc.isSelected)?.logger,
      password,
      FASTPLUGIN_ADDRESS,
      subscriptionPluginAbi
    )
      .then(res => {
        console.log(res)
        setInstalled(true)
      })
      .catch(err => {
        console.log(err)
      })
    setInstallLoading(false)
  }

  useEffect(() => {
    const provider = getJsonRpcProvider()
    if (accounts.length > 0) {
      client
        .get('/plugin/subscription/services')
        .then(res => {
          setServices(res)
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })

      const account = new Contract(accounts.find(acc => acc.isSelected)?.address[0], accountAbi, provider)
      account
        .checkPluginInstalled(FASTPLUGIN_ADDRESS)
        .then(res => {
          console.log(res)
          setInstalled(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [])

  // const handleCreateSession = async () => {
  //   const date = Math.floor(new Date().getTime() / 1000)
  //   setSessionLoading(true)
  //   await createFastSession(
  //     accounts.find(acc => acc.isSelected)?.address[0],
  //     date,
  //     accounts.find(acc => acc.isSelected)?.logger,
  //     '12112002',
  //     accounts.find(acc => acc.isSelected)?.publicKey
  //   )
  //     .then(res => {
  //       setStartDate(date)
  //       console.log(res)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  //   setSessionLoading(false)
  // }

  const handleTransfer = async (receiver: string, amount: string) => {
    setTxLoading(draft => {
      draft[receiver] = true
    })
    await fastTranfer(
      accounts.find(acc => acc.isSelected)?.address[0],
      startDate,
      1,
      receiver,
      parseEther(amount),
      accounts.find(acc => acc.isSelected)?.publicKey
    )
      .then(res => {
        successNotify('Tranfer successfully!')
        console.log(res)
      })
      .catch(err => {
        errorNotify('Error: ' + err.message)
        console.log(err)
      })
    setTxLoading(draft => {
      draft[receiver] = false
    })
  }

  const handlePasswordOpen = () => {
    if (accounts.find((acc: any) => acc.isSelected == true)?.logger != 'eoa') {
      setOpenPassword(true)
    } else {
      handleInstall()
    }
  }

  return (
    <Box sx={{ position: 'relative', height: '80vh' }}>
      {isInstalled ? (
        <Box>
          <Typography variant='h4' sx={{ marginBottom: 3 }}>
            Address Book
          </Typography>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
            <CreateSessionButton startDate={startDate} setStartDate={setStartDate} />
            {/* <Button
              variant='contained'
              color='info'
              disabled={
                isSessionLoading || (startDate && Math.floor(new Date().getTime() / 1000) - startDate <= 2 * 60)
              }
              onClick={handleCreateSession}
            >
              {isSessionLoading ? <CircularProgress size={24} /> : 'Create Session'}
            </Button> */}
          </div>
          <Box>
            <Stack spacing={3}>
              {contacts &&
                contacts.map(contact => (
                  <Paper key={contact.address} sx={{ padding: 3, display: 'flex', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500 }}>{contact.name}</Typography>
                      <Typography variant='caption'>{contact.address}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <TextField
                        label='Amount'
                        value={amounts[contact.address]}
                        onChange={e => {
                          setAmounts(draft => {
                            draft[contact.address] = e.target.value
                          })
                        }}
                      />
                      <Button
                        variant='contained'
                        disabled={!startDate || isTxLoading[contact.address]}
                        onClick={() => {
                          console.log(contact.address, amounts[contact.address])
                          handleTransfer(contact.address, amounts[contact.address])
                        }}
                        sx={{ marginTop: 2 }}
                      >
                        {isTxLoading[contact.address] ? <CircularProgress size={24} /> : 'Send'}
                      </Button>
                    </Box>
                  </Paper>
                ))}
            </Stack>
            <Button variant='contained' onClick={handleOpen} sx={{ marginTop: 2 }}>
              Add Address
            </Button>
            <Dialog
              open={open}
              keepMounted
              onClose={handleClose}
              maxWidth='sm'
              fullWidth
              aria-describedby='alert-dialog-slide-description'
            >
              <DialogTitle>Add address</DialogTitle>
              <DialogContent>
                <DialogContentText id='alert-dialog-slide-description'>
                  <Stack spacing={2}>
                    <TextField label='Name' fullWidth value={newName} onChange={e => setNewName(e.target.value)} />
                    <TextField
                      label='Address'
                      fullWidth
                      value={newAddress}
                      onChange={e => setNewAddress(e.target.value)}
                    />
                  </Stack>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose}>Close</Button>
                <Button
                  onClick={() => {
                    client
                      .put('/account/add-address', {
                        account: accounts.find(acc => acc.isSelected)?.publicKey,
                        address: newAddress,
                        name: newName
                      })
                      .then(res => {
                        setContacts([...contacts, { address: newAddress, name: newName }])
                      })
                      .catch(err => {
                        console.log(err)
                      })
                    handleClose()
                  }}
                >
                  Add
                </Button>
              </DialogActions>
            </Dialog>
          </Box>
        </Box>
      ) : (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}
        >
          {isInstallLoading ? (
            <Box>
              <CircularProgress />
            </Box>
          ) : (
            <Box>
              <Typography>
                {accounts.length > 0 ? 'Please install the plugin to your account!' : 'Connect your account first!'}
              </Typography>
              {accounts.length > 0 && (
                <Button variant='contained' sx={{ marginTop: 4 }} onClick={handlePasswordOpen}>
                  Install
                </Button>
              )}
            </Box>
          )}
          <Typography>
            {/* Subscription plugin allows users to “subscribe” to various services or other users, much like one would
            subscribe to a magazine or online service. This could include anything from subscribing to updates from a
            particular user, to subscribing to a recurring service provided by a smart contract */}
          </Typography>
        </Box>
      )}
      <Dialog open={openPassword} onClose={() => setOpenPassword(false)} maxWidth='xs' fullWidth>
        <DialogTitle>Enter your password</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin='dense'
            label='Password'
            type='password'
            fullWidth
            variant='standard'
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          {/* <TextField
              margin='dense'
              label='OTP'
              type='text'
              fullWidth
              variant='standard'
              value={otp}
              onChange={e => setOtp(e.target.value)}
            /> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPassword(false)}>Cancel</Button>
          <Button onClick={handleInstall}>Execute</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default SubscriptionPage
