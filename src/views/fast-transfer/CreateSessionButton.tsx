import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography
} from '@mui/material'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import useNotify from 'src/hooks/useNotify'
import { client } from 'src/services/client'
import { createFastSession } from 'src/utils/plugin'

const CreateSessionButton = (props: any) => {
  const { startDate, setStartDate } = props
  const [isSessionLoading, setSessionLoading] = useState(false)
  const { accounts } = useSelector((state: any) => state.account)
  const [otp, setOtp] = useState<string>('')
  const [open, setOpen] = useState<boolean>(false)
  const [isOtpSent, setOtpSent] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const { successNotify, errorNotify } = useNotify()

  const handleOpen = () => {
    if (accounts.find((acc: any) => acc.isSelected == true)?.logger != 'eoa') {
      setOpen(true)
    } else {
      handleCreateSession()
    }
  }

  const handleClose = () => {
    setOpen(false)
  }
  console.log('aa', accounts)
  const handleCreateSession = async () => {
    setOpen(false)
    const date = Math.floor(new Date().getTime() / 1000)
    console.log({
      acc: accounts.find((acc: any) => acc.isSelected)?.address[0],
      date,
      log: accounts.find((acc: any) => acc.isSelected)?.logger,
      password,
      pub: accounts.find((acc: any) => acc.isSelected)?.publicKey
    })
    setSessionLoading(true)
    await createFastSession(
      accounts.find((acc: any) => acc.isSelected)?.address[0],
      date,
      accounts.find((acc: any) => acc.isSelected)?.logger,
      password,
      accounts.find((acc: any) => acc.isSelected)?.publicKey
    )
      .then(res => {
        setStartDate(date)
        successNotify('New Session Created!')
        console.log(res)
      })
      .catch(err => {
        errorNotify('Error: ' + err.message)
        console.log(err)
      })
    setSessionLoading(false)
  }

  const handleSendOtp = async () => {
    await client
      .get(`/account/register-otp/${accounts.find((acc: any) => acc.isSelected)?.logger}`)
      .then(res => {
        setOtpSent(true)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleCheckOtp = async () => {
    await client
      .get(`/account/check-otp/${accounts.find((acc: any) => acc.isSelected == true)?.logger}/${otp}`)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then(res => {
        handleCreateSession()
      })
      .catch(err => {
        errorNotify('Wrong OTP!')
        console.log(err)
      })
  }

  // const handleCheckOtp = async () => {
  //   await client
  //     .get(`/account/check-otp/${accounts.find((acc: any) => acc.isSelected)?.logger}/${otp}`)
  //     .then(res => {
  //       console.log(res)
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  return (
    <>
      <Button
        variant='contained'
        color='info'
        disabled={isSessionLoading || (startDate && Math.floor(new Date().getTime() / 1000) - startDate <= 2 * 60)}
        onClick={handleOpen}
      >
        {isSessionLoading ? <CircularProgress size={24} /> : 'Create Session'}
      </Button>
      <Dialog open={open} onClose={handleClose} maxWidth='xs' fullWidth>
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
    </>
  )
}

export default CreateSessionButton
