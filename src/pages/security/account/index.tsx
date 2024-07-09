import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  Paper,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { ContractFactory, parseEther } from 'ethers'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { ecdsaByteCode, ecdsaRegistryAbi } from 'src/constant/abis/modules/ecdsaRegistryAbi'
import { ECDSASM_ADDRESS } from 'src/constant/address'
import useNotify from 'src/hooks/useNotify'
import { client } from 'src/services/client'
import { executeCalls } from 'src/utils/userOp'

const Account = () => {
  const [address, setAddress] = useState<string>('')
  const { accounts } = useSelector((state: any) => state.account)
  const { provider } = useSelector((state: any) => state.wallet)
  const [otp, setOtp] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [isOtpSent, setOtpSent] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)
  const { successNotify, errorNotify } = useNotify()

  const handleTransfer = async () => {
    setOpen(false)
    setLoading(true)
    await executeCalls(
      accounts.find((acc: any) => acc.isSelected)?.address[0],
      accounts.find((acc: any) => acc.isSelected == true)?.publicKey,
      accounts.find((acc: any) => acc.isSelected == true)?.logger,
      provider,
      [
        {
          receiver: ECDSASM_ADDRESS,
          amount: parseEther('0'),
          data: new ContractFactory(ecdsaRegistryAbi, ecdsaByteCode).interface.encodeFunctionData('transferOwnership', [
            address
          ])
        }
      ],
      password
    )
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then(res => {
        successNotify(`Transfer owner successfully to ${address}`)
      })
      .catch(err => {
        errorNotify(err.message)
      })
    setLoading(false)
  }

  const handleSendOtp = async () => {
    await client
      .get(`/account/tx-otp/${accounts.find((acc: any) => acc.isSelected == true)?.logger}`)
      .then(res => {
        setOtpSent(true)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleOpen = () => {
    if (accounts.find((acc: any) => acc.isSelected == true)?.logger != 'eoa') {
      setOpen(true)
    } else {
      handleTransfer()
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleCheckOtp = async () => {
    await client
      .get(`/account/check-otp/${accounts.find((acc: any) => acc.isSelected == true)?.logger}/${otp}`)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then(res => {
        if (res) {
          handleTransfer()
        } else {
          errorNotify('Wrong OTP!')
        }
      })
      .catch(err => {
        errorNotify(err.message)
        console.log(err)
      })
  }

  return (
    <Box>
      <Typography variant='h4' sx={{ marginBottom: 3 }}>
        Manage Account
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 4 }}>
            <Typography variant='h6'>Transfer owner</Typography>
            <Stack spacing={3}>
              <Typography>
                You can delegate owner rights for other address. The account then will be possessed by the wallet have
                the address key provided.
              </Typography>
              <Box>
                {/* <Typography sx={{ marginBottom: 2 }}>
                  Owner public key: {accounts.find((acc: any) => acc.isSelected == true)?.publicKey}
                </Typography> */}
                <Typography sx={{ marginBottom: 2, marginTop: 2 }}>
                  After this action, you wont be able to sign for this account's transactions.
                </Typography>
                <TextField fullWidth label='Address' onChange={e => setAddress(e.target.value)} value={address} />
                <Button variant='contained' disabled={isLoading} sx={{ marginTop: 2 }} onClick={handleOpen}>
                  {isLoading ? <CircularProgress /> : 'Transfer Owner'}
                </Button>
              </Box>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ padding: 4 }}>
            <Typography variant='h6'>Renounce</Typography>
            <Typography>
              Make sure the account not holding any assets, or they will stay in the account forever after you renounce
              your owner right!
            </Typography>
            {/* <Typography sx={{ marginBottom: 2 }}>
              Owner public key: {accounts.find((acc: any) => acc.isSelected == true)?.publicKey}
            </Typography> */}
            <Typography sx={{ marginBottom: 2 }}>Be cautious when you click on Renounce button!</Typography>
            <Stack spacing={3} sx={{ marginTop: 4 }}>
              <Box>
                <Button variant='contained'>Renounce</Button>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Enter your details</DialogTitle>
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
          <TextField
            margin='dense'
            label='OTP'
            type='text'
            fullWidth
            variant='standard'
            value={otp}
            onChange={e => setOtp(e.target.value)}
          />
          <Typography
            color={isOtpSent ? 'secondary' : 'primary'}
            sx={{ '&:hover': { cursor: isOtpSent ? 'default' : 'pointer' } }}
            onClick={handleSendOtp}
          >
            {isOtpSent ? 'Otp sent to your email, please check your email!' : 'Send OTP to my email.'}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCheckOtp}>Execute</Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default Account
