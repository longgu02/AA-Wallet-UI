import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { formatEther } from 'ethers'

const WalletHeaderCard = (props: { address: string; balance?: BigInt }) => {
  const { address, balance } = props

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
          {/* <img width={137} height={176} alt='Apple iPhone 11 Pro' src='/images/cards/iPhone-11-pro.png' /> */}
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
              {address}
            </Typography>
            {/* <Typography variant='body2' sx={{ marginBottom: 3.5 }}>
              Address: 0x696969696969
            </Typography> */}
            <Typography sx={{ fontWeight: 500, marginBottom: 3 }}>
              Balance:{' '}
              <Box component='span' sx={{ fontWeight: 'bold' }}>
                {balance && formatEther(balance.toString())} ETH
              </Box>
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Card>
  )
}

export default WalletHeaderCard
