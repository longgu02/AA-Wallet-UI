import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { formatEther } from 'ethers'
import { useSelector } from 'react-redux'

const WalletHeaderCard = () => {
  const { accountAddress, accountBalance } = useSelector((state: any) => state.account)

  return (
    <Card sx={{ marginBottom: 4 }}>
      <Grid container spacing={6}>
        <CardContent
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: 0,
            paddingBottom: 0,
            marginLeft: 5
          }}
        >
          <AccountBalanceWalletIcon sx={{ fontSize: 100, color: '#C3B1E1', marginTop: 'auto', marginBottom: 'auto' }} />
        </CardContent>
        <Grid
          item
          xs={12}
          md={7}
          sx={{
            paddingTop: ['0 !important', '0 !important', '1.5rem !important'],
            paddingLeft: ['1.5rem !important', '1.5rem !important', '0 !important']
          }}
        >
          <CardContent>
            <Typography variant='h6' sx={{ marginBottom: 2 }}>
              {accountAddress ? accountAddress : 'Connect to your wallet!'}
            </Typography>
            <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>
              Balance:{' '}
              <Box component='span' sx={{ fontWeight: 'bold' }}>
                {accountBalance ? formatEther(accountBalance.toString()) : 'X'} ETH
              </Box>
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default WalletHeaderCard
