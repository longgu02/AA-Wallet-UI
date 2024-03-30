import { Box, Button, Card, CardContent, Grid, Paper, TextField, Typography } from '@mui/material'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { formatEther } from 'ethers'
import { useSelector } from 'react-redux'

const SessionsAddCard = () => {
  const { accountAddress, accountBalance } = useSelector((state: any) => state.account)

  return (
    <Card sx={{ marginBottom: 4, padding: 4 }}>
      <Typography variant='h6' sx={{ marginBottom: 5, marginTop: 2 }}>
        Add new session
      </Typography>
      <TextField label='Valid After' fullWidth />
      <TextField label='Valid Until' fullWidth />
      <TextField label='Module Address' fullWidth />
      <TextField label='Valid After' fullWidth />
      <Button variant='contained'>Add Session</Button>
    </Card>
  )
}

export default SessionsAddCard
