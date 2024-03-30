import { Box, Button, Card, CardContent, Grid, Paper, Typography } from '@mui/material'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { formatEther } from 'ethers'
import { useSelector } from 'react-redux'

const ECDSAManageCard = () => {
  const { accountAddress, accountBalance } = useSelector((state: any) => state.account)

  return (
    <Card sx={{ marginBottom: 4, height: 265, padding: 4 }}>
      <Typography variant='h6' sx={{ marginBottom: 5, marginTop: 2 }}>
        Signers
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'start' }}>
        <Paper sx={{ marginRight: 4, backgroundColor: '#24263D', padding: 3 }}>
          <Typography>phamlong121120022@gmail.com</Typography>
          <Typography>Email/Password Signer</Typography>

          <Typography>0x6969</Typography>
          <Button fullWidth variant='contained' sx={{ marginTop: 2 }}>
            Renounce
          </Button>
        </Paper>
        <Paper sx={{ marginRight: 4, backgroundColor: '#24263D', padding: 3 }}>
          <Typography>phamlong121120022@gmail.com</Typography>
          <Typography>Email/Password Signer</Typography>

          <Typography>0x6969</Typography>
          <Button fullWidth variant='contained' sx={{ marginTop: 2 }}>
            Renounce
          </Button>
        </Paper>{' '}
        <Paper sx={{ marginRight: 4, backgroundColor: '#24263D', padding: 3 }}>
          <Typography>phamlong121120022@gmail.com</Typography>
          <Typography>Email/Password Signer</Typography>

          <Typography>0x6969</Typography>
          <Button fullWidth variant='contained' sx={{ marginTop: 2 }}>
            Renounce
          </Button>
        </Paper>
      </Box>
    </Card>
  )
}

export default ECDSAManageCard
