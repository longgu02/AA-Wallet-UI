//** React
import { useState } from 'react'

//** MUI
import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  IconButton,
  CircularProgress,
  Select,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material'

//** Constant
import { ERC20_TOKEN_ADDRESSES } from 'src/constant/addresses'

//** Utils
import { createCalls, executeCalls } from 'src/utils/userOp'

//** Hooks
import { Updater } from 'use-immer'
import { useSelector } from 'react-redux'
import useNotify from 'src/hooks/useNotify'

//** Icon
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ClearIcon from '@mui/icons-material/Clear'
import { client } from 'src/services/client'

const ETHIconUrl = 'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png'
const emptyTokenIconUrl = 'https://sepolia.etherscan.io/images/main/empty-token.png'

const TransactionPad = (props: {
  index: number
  data: { amount: string; to: string; feeToken: string; token: string }
  updateInput: (index: number, field: string, data: string) => void
}) => {
  const { index, data, updateInput } = props

  const renderTokenIcon = (token?: string) => {
    switch (token) {
      case 'native':
        return (
          <>
            <img src={ETHIconUrl} width={40} height={40} alt='GoerliETH' />
            <Typography>SepoliaETH</Typography>
          </>
        )
      default:
        return (
          <>
            <img src={emptyTokenIconUrl} width={40} height={40} alt='GoerliETH' />
            <Typography>{token?.toUpperCase()}</Typography>
          </>
        )
    }
  }

  return (
    <Box sx={{ marginBottom: 5 }}>
      <Typography sx={{ marginBottom: 2 }}>Amount</Typography>
      <Grid container sx={{ marginBottom: 2 }}>
        <Grid item xs={9}>
          <TextField
            placeholder='Amount'
            sx={{ display: 'flex' }}
            fullWidth
            value={data.amount}
            onChange={(e: any) => updateInput(index, 'amount', e.target.value)}
          />
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'center' }}>
          {renderTokenIcon(
            data.token == 'native'
              ? 'native'
              : Object.keys(ERC20_TOKEN_ADDRESSES).find(
                  key => ERC20_TOKEN_ADDRESSES[key as keyof typeof ERC20_TOKEN_ADDRESSES] === data.token
                )
          )}
        </Grid>
      </Grid>
      <Box sx={{ flexWrap: 'wrap', display: 'flex', justifyContent: 'space-between' }}>
        {/* <TextField placeholder='Amount' sx={{ display: 'flex' }} fullWidth /> */}
        {/* <TextField placeholder='Amount' /> */}
      </Box>
      <Typography sx={{ marginBottom: 2 }}>Receiver</Typography>
      <TextField
        placeholder='To'
        fullWidth
        sx={{ marginBottom: 2 }}
        value={data.to}
        onChange={(e: any) => updateInput(index, 'to', e.target.value)}
      />
    </Box>
  )
}

export const INITIAL_STATE = { amount: '', to: '', token: 'native', feeToken: '' }

const TransactionCard = (props: {
  updateTransactionData: Updater<{ amount: string; to: string; feeToken: string; token: string }[]>
  transactionData: {
    amount: string
    to: string
    feeToken: string
    token: string
  }[]
}) => {
  //** Hooks
  const [loading, setLoading] = useState<boolean>(false)
  const { transactionData, updateTransactionData } = props
  const { successNotify, errorNotify, infoNotify } = useNotify()
  const { accounts } = useSelector((state: any) => state.account)
  const [sender, setSender] = useState<string>(accounts.find((acc: any) => acc.isSelected)?.address[0])
  const [open, setOpen] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const [otp, setOtp] = useState<string>('')
  const [isOtpSent, setOtpSent] = useState<boolean>(false)

  //** Redux
  const { provider } = useSelector((state: any) => state.wallet)

  const updateTransactionInput = (index: number, field: string, data: string) => {
    updateTransactionData(draft => void (draft[index] = { ...transactionData[index], [field]: data }))
  }

  const handleAddTransaction = () => {
    updateTransactionData(draft => void draft.push(INITIAL_STATE))
  }

  const handleRemoveTransaction = (index: number) => {
    updateTransactionData(draft => void draft.splice(index, 1))
  }

  const handleSendTransaction = async () => {
    handleClose()
    setLoading(true)
    if (accounts.length > 0) {
      try {
        const requests: Array<{ to: string; value: string; tokenAddress: string }> = []
        console.log(transactionData)
        transactionData.map(item => {
          requests.push({ to: item.to, value: item.amount, tokenAddress: item.token })
        })
        const calls = await createCalls(provider, requests)
        await executeCalls(
          sender,
          accounts.find((acc: any) => acc.isSelected == true)?.publicKey,
          accounts.find((acc: any) => acc.isSelected == true)?.logger,
          provider,
          calls,
          password
        )

        successNotify('Transaction completed!')
      } catch (err: any) {
        errorNotify(err.message)
        console.error(err)
      }
    } else {
      infoNotify('Connect your account first!')
    }
    setLoading(false)
  }

  const handleOpen = () => {
    if (accounts.find((acc: any) => acc.isSelected == true)?.logger != 'eoa') {
      setOpen(true)
    } else {
      handleSendTransaction()
    }
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

  const handleCheckOtp = async () => {
    await client
      .get(`/account/check-otp/${accounts.find((acc: any) => acc.isSelected == true)?.logger}/${otp}`)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then(res => {
        if (res) {
          handleSendTransaction()
        } else {
          errorNotify('Wrong OTP!')
        }
      })
      .catch(err => {
        errorNotify(err.message)
        console.log(err)
      })
  }

  const handleClose = () => {
    setOpen(false)
  }

  // const handleExecute = () => {
  //   // Handle the execution logic here
  //   console.log('Password:', password)
  //   console.log('OTP:', otp)
  //   handleClose()
  // }

  return (
    <>
      <Card sx={{ position: 'relative', opacity: loading ? 0.7 : 1, cursor: loading ? 'progress' : 'auto' }}>
        <CardContent>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant='h6' sx={{ marginTop: 'auto', marginBottom: 'auto' }}>
              Send transaction
            </Typography>
            <IconButton sx={{ display: 'flex' }} onClick={handleOpen} disabled={loading}>
              <DoubleArrowIcon sx={{ fontSize: 30 }} />
            </IconButton>
            {loading && (
              <CircularProgress
                sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}
              />
            )}
          </Box>
          {/* <Typography sx={{ marginBottom: 2 }}>Fee Token</Typography> */}
          <Select placeholder='Account' value={sender} fullWidth onChange={event => setSender(event.target.value)}>
            {accounts
              .find((acc: any) => acc.isSelected)
              ?.address.map((address: string, index: number) => (
                <MenuItem key={address} value={address} defaultChecked={index == 0}>
                  {address}
                </MenuItem>
              ))}
          </Select>
          {transactionData &&
            transactionData.map((data, index) => (
              <Box key={index}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontWeight: 'bold', marginTop: 'auto', marginBottom: 'auto' }}>
                    Transaction {index + 1}:
                  </Typography>
                  <IconButton sx={{ display: 'flex' }} onClick={() => handleRemoveTransaction(index)}>
                    <ClearIcon sx={{ fontSize: 30, margin: 'auto' }} />
                  </IconButton>
                </Box>
                <TransactionPad updateInput={updateTransactionInput} index={index} data={data} />
              </Box>
            ))}
          <IconButton sx={{ display: 'flex', margin: '20px auto 0 auto' }} onClick={handleAddTransaction}>
            <AddCircleOutlineIcon sx={{ fontSize: 50, margin: 'auto' }} />
          </IconButton>
        </CardContent>
      </Card>
      <div>
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
              sx={{ '&:hover': { cursor: isOtpSent ? 'pointer' : 'default' } }}
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
      </div>
    </>
  )
}

export default TransactionCard
