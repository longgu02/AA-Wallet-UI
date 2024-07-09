import * as React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { ContractFactory, formatEther, parseEther } from 'ethers'
import { useSelector } from 'react-redux'
import { client } from 'src/services/client'
import { executeCalls } from 'src/utils/userOp'
import { SUBPLUGIN_ADDRESS } from 'src/constant/address'
import { subscriptionPluginAbi, subscriptionPluginBytecode } from 'src/constant/abis/plugins/subscriptionPluginAbi'
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import useNotify from 'src/hooks/useNotify'

export default function ServiceCard(props: { data: any }) {
  const { data } = props
  const { accounts } = useSelector((state: any) => state.account)
  const { provider } = useSelector((state: any) => state.wallet)
  const [open, setOpen] = React.useState<boolean>(false)
  const [otp, setOtp] = React.useState<string>('')
  const [isOtpSent, setOtpSent] = React.useState<boolean>(false)
  const [isLoading, setLoading] = React.useState<boolean>(false)
  const [password, setPassword] = React.useState<string>('')
  const { successNotify, errorNotify } = useNotify()

  const handleOpen = () => {
    if (accounts.find((acc: any) => acc.isSelected == true)?.logger != 'eoa') {
      setOpen(true)
    } else {
      handleSubscribe()
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  const handleSendOtp = async () => {
    await client
      .get(`/account/register-otp/${accounts.find((acc: any) => acc.isSelected == true)?.logger}`)
      .then(res => {
        setOtpSent(true)
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const handleSubscribe = async () => {
    setLoading(true)
    setOpen(false)
    const SubscriptionPlugin = new ContractFactory(subscriptionPluginAbi, subscriptionPluginBytecode)
    await executeCalls(
      accounts.find((acc: any) => acc.isSelected)?.address[0],
      accounts.find((acc: any) => acc.isSelected == true)?.publicKey,
      accounts.find((acc: any) => acc.isSelected == true)?.logger,
      provider,
      [
        {
          receiver: SUBPLUGIN_ADDRESS,
          amount: parseEther('0'),
          data: SubscriptionPlugin.interface.encodeFunctionData('subscribe', [data.address, data.amount])
        }
      ],

      // ERC20_TOKEN_ADDRESSES['6test'],
      password
    )
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .then(res => {
        successNotify('Subscribe successfully!')
      })
      .catch(err => {
        errorNotify('Error: ' + err.message)
      })
    setLoading(false)

    // await subscribeService(
    //   accounts.find((acc: any) => acc.isSelected)?.address[0],
    //   data.address,
    //   data.amount,
    //   accounts.find((acc: any) => acc.isSelected)?.logger,
    //   '12112002',
    //   accounts.find((acc: any) => acc.isSelected)?.publicKey
    // )
    //   .then(res => {
    //     client
    //       .post(`/plugin/subscription/services/${data.address}/subscribe`, {
    //         address: accounts.find((acc: any) => acc.isSelected)?.address[0]
    //       })
    //       .then(response => {
    //         console.log(res)
    //         console.log(response)
    //       })
    //       .catch(err => {
    //         console.log(err)
    //       })
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
  }

  return (
    <Card sx={{}}>
      <CardMedia component='img' alt='green iguana' height='140' image={data.logo} />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {data.name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          {data.description}
        </Typography>
        <Typography variant='body2' color='text.secondary' sx={{ marginTop: 3 }}>
          Price: {formatEther(data.amount)} ETH/{data.period} day(s)
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button size='small' onClick={handleOpen}>
          {isLoading ? <CircularProgress /> : 'Subscribe'}
        </Button>
      </CardActions>
      <Dialog open={open} onClose={handleClose} maxWidth='xs' fullWidth>
        <DialogTitle>Enter your password and OTP</DialogTitle>
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
          <Button onClick={handleSubscribe}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </Card>
  )
}
