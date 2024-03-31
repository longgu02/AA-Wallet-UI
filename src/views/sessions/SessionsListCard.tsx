import { Box, Button, Card, Paper, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

const SessionsListCard = () => {
  const { accountAddress, accountBalance } = useSelector((state: any) => state.account)

  return (
    <Card sx={{ marginBottom: 4, padding: 4 }}>
      <Typography variant='h6' sx={{ marginBottom: 5, marginTop: 2 }}>
        Session List
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'start', flexDirection: 'column' }}>
        <Paper sx={{ marginBottom: 4, backgroundColor: '#24263D', padding: 3 }}>
          <Typography>Public key: 0x1239084719270483708</Typography>
          <Typography>Max amount</Typography>
          <Typography>Token: 0x12093701270370 | Native</Typography>
          <Typography>Valid after: 6/9/2024</Typography>
          <Typography>Valid until: 9/6/2024</Typography>

          <Typography>Beneficiaries:</Typography>
          <Typography>0x012370127393</Typography>
          <Typography>0x120937120379</Typography>
          <Button fullWidth variant='contained' sx={{ marginTop: 2 }}>
            Renounce
          </Button>
        </Paper>
        <Paper sx={{ marginBottom: 4, backgroundColor: '#24263D', padding: 3 }}>
          <Typography>phamlong121120022@gmail.com</Typography>
          <Typography>Email/Password Signer</Typography>

          <Typography>0x6969</Typography>
          <Button fullWidth variant='contained' sx={{ marginTop: 2 }}>
            Renounce
          </Button>
        </Paper>{' '}
        <Paper sx={{ marginBottom: 4, backgroundColor: '#24263D', padding: 3 }}>
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

export default SessionsListCard
