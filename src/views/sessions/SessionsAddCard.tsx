/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { ContractFactory, ethers } from 'ethers'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { sessionManagerAbi, sessionManagerByteCode } from 'src/constant/abis/modules/sessionKeyManagerAbi'
import { ERC20SM_ADDRESS, NATIVESM_ADDRESS, SM_ADDRESS } from 'src/constant/address'
import { getJsonRpcProvider } from 'src/constant/chain'
import { client } from 'src/services/client'
import { SessionDetail } from 'src/types/interfaces'
import { genMerkleTree } from 'src/utils/session'
import { executeCalls } from 'src/utils/userOp'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import useNotify from 'src/hooks/useNotify'

interface SessionAddCardProp {
  sessions: Array<SessionDetail>
  setSessions: (session: Array<SessionDetail>) => void
}

const SessionsAddCard = (props: SessionAddCardProp) => {
  const { accounts } = useSelector((state: any) => state.account)
  const [address, setAddress] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [otp, setOtp] = useState<string>('')
  const [isOtpSent, setOtpSent] = useState<boolean>(false)
  const [type, setType] = useState<string>('Native')
  const [tokenAddress, setTokenAddress] = useState<string>('')
  const [limit, setLimit] = useState<string>('')
  const [recipient, setRecipient] = useState<string>('')
  const [fromDate, setFromDate] = useState(dayjs(new Date()))
  const [toDate, setToDate] = useState(dayjs(new Date()))
  const [open, setOpen] = useState<boolean>(false)
  const [password, setPassword] = useState<string>('')
  const { successNotify, errorNotify } = useNotify()
  const { sessions, setSessions } = props

  const typeOption = ['Native', 'ERC-20', 'NFT (ERC-721)']

  const handleCreate = async () => {
    setOpen(false)
    setLoading(true)
    let sessionVerificationModule: string
    switch (type) {
      case 'Native':
        sessionVerificationModule = NATIVESM_ADDRESS
        break
      case 'ERC-20':
        sessionVerificationModule = ERC20SM_ADDRESS
        break
      case 'NFT (ERC-721)':
        sessionVerificationModule = '0x'
        break
      default:
        sessionVerificationModule = ''
    }

    // Contract
    const provider = getJsonRpcProvider()
    const SessionManger = new ContractFactory(sessionManagerAbi, sessionManagerByteCode, provider)
    const { merkleTree, data } = genMerkleTree(sessionVerificationModule, {
      address: address,
      recipient: recipient,
      maxAmount: ethers.parseEther(limit)
    })

    console.log(data)

    await executeCalls(
      accounts.find((acc: any) => acc.isSelected).address[0],
      accounts.find((acc: any) => acc.isSelected).publicKey,
      accounts.find((acc: any) => acc.isSelected == true).logger,
      provider,
      [
        {
          receiver: SM_ADDRESS,
          amount: ethers.parseEther('0'),
          data: SessionManger.interface.encodeFunctionData('setMerkleRoot', [merkleTree.getHexRoot()])
        }
      ],
      password
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    ).catch(e => {
      setLoading(false)
    })

    // Backend
    const sessionData = {
      account: accounts.find((acc: any) => acc.isSelected).address[0],
      authorized: address,
      recipient: recipient,
      validAfter: fromDate.unix(),
      validUntil: toDate.unix(),
      sessionVerificationModule: sessionVerificationModule,
      token: type != 'Native' ? tokenAddress : 'native',
      limit: ethers.parseEther(limit).toString(),
      receiver: recipient
    }
    console.log(sessionData)
    client
      .post('/session', sessionData)
      .then((response: SessionDetail) => {
        // State
        setSessions([...sessions, response])
        successNotify('Session created successfully!')
        setLoading(false)

        console.log(response)
      })
      .catch(err => {
        setLoading(false)
        errorNotify('Error creating session')
        console.log(err)
      })
    setLoading(false)
  }

  const handleOpen = () => {
    if (accounts.find((acc: any) => acc.isSelected == true)?.logger != 'eoa') {
      setOpen(true)
    } else {
      handleCreate()
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

  const handleClose = () => {
    setOpen(false)
  }

  const handleCheckOtp = async () => {
    await client
      .get(`/account/check-otp/${accounts.find((acc: any) => acc.isSelected == true)?.logger}/${otp}`)
      .then(res => {
        if (res) {
          handleCreate()
        } else {
          errorNotify('Wrong OTP!')
        }
      })
      .catch(err => {
        errorNotify(err.message)
        console.log(err)
      })
  }

  console.log(fromDate.unix(), toDate.unix())

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Card sx={{ marginBottom: 4, padding: 4 }}>
        <Typography variant='h6' sx={{ marginBottom: 5, marginTop: 2 }}>
          Add new session
        </Typography>
        <Stack spacing={2}>
          <TextField label='Authorized Address' fullWidth onChange={e => setAddress(e.target.value)} />
          <TextField label='Recipient' fullWidth onChange={e => setRecipient(e.target.value)} />
          <Box sx={{ display: 'flex', marginBottom: 2 }}>
            <DateTimePicker
              sx={{ color: 'red', zIndex: 10 }}
              label='From'
              value={fromDate}
              onChange={(newValue: any) => setFromDate(newValue)}
            />
            <DateTimePicker label='To' value={toDate} onChange={(newValue: any) => setToDate(newValue)} />
            {/* <TextField
            label='Valid After'
            sx={{ flex: 1, marginRight: 2 }}
            onChange={e => setValidAfter(e.target.value)}
          />
          <TextField label='Valid Until' sx={{ flex: 1 }} onChange={e => setValidUntil(e.target.value)} /> */}
          </Box>
          {/* <Autocomplete
          fullWidth
          options={typeOption}
          sx={{ width: 300 }}
          renderInput={params => <TextField {...params} label='Type' defaultValue={'Native'} />}
        /> */}
          <FormControl>
            <RadioGroup row sx={{ display: 'flex' }} value={type} onChange={e => setType(e.target.value)}>
              {typeOption.map((type, index) => (
                <FormControlLabel key={index} value={type} control={<Radio />} sx={{ flex: 1 }} label={type} />
              ))}
            </RadioGroup>
          </FormControl>
          {type != 'Native' && (
            <TextField label='Token address' fullWidth onChange={e => setTokenAddress(e.target.value)} />
          )}
          <TextField label='Limit' fullWidth onChange={e => setLimit(e.target.value)} />
        </Stack>
        <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'flex-end' }}>
          <Button variant='contained' onClick={handleOpen} disabled={accounts.length == 0 || loading}>
            {loading ? <CircularProgress size={20} color='secondary' /> : 'Add Session'}
          </Button>
        </Box>
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
      </Card>
    </LocalizationProvider>
  )
}

export default SessionsAddCard
