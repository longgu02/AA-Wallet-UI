import {
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Paper,
  TextField,
  Typography
} from '@mui/material'
import { parseEther } from 'ethers'
import { Box } from 'mdi-material-ui'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { createFastSession, fastTranfer } from 'src/utils/plugin'

const CreateSessionButton = (props: any) => {
  const { startDate, setStartDate } = props
  const [isSessionLoading, setSessionLoading] = useState(false)
  const { accounts } = useSelector(state => state.account)
  const [open, setOpen] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')

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
      acc: accounts.find(acc => acc.isSelected)?.address[0],
      date,
      log: accounts.find(acc => acc.isSelected)?.logger,
      password,
      pub: accounts.find(acc => acc.isSelected)?.publicKey
    })
    setSessionLoading(true)
    await createFastSession(
      accounts.find(acc => acc.isSelected)?.address[0],
      date,
      accounts.find(acc => acc.isSelected)?.logger,
      password,
      accounts.find(acc => acc.isSelected)?.publicKey
    )
      .then(res => {
        setStartDate(date)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    setSessionLoading(false)
  }

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
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleCreateSession}>Execute</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default CreateSessionButton
