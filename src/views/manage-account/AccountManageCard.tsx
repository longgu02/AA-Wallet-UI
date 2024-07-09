import { Button, Card, Grid, Paper, Typography } from '@mui/material'

// import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
// import { formatEther } from 'ethers'
// import { useSelector } from 'react-redux'

const AccountManageCard = () => {
  // const { accountAddress, accountBalance } = useSelector((state: any) => state.account)

  return (
    <Card sx={{ marginBottom: 4, padding: 4 }}>
      <Typography variant='h6' sx={{ marginBottom: 5, marginTop: 2 }}>
        Account
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={3}>
          <Paper sx={{ marginRight: 4, backgroundColor: '#24263D', padding: 3 }}>
            <Typography>Action</Typography>
            <Button fullWidth variant='contained' sx={{ marginTop: 5, textTransform: 'none' }}>
              Freeze
            </Button>
            <Button fullWidth variant='contained' sx={{ marginTop: 2, textTransform: 'none' }}>
              Change password
            </Button>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper sx={{ marginRight: 4, backgroundColor: '#24263D', padding: 3 }}>
            <Typography>Backup</Typography>
            <Typography>Download backup file or upload file to recover</Typography>
            <Button fullWidth variant='contained' color='warning' sx={{ marginTop: 2, textTransform: 'none' }}>
              Upload
            </Button>
            <Button fullWidth variant='contained' color='info' sx={{ marginTop: 2, textTransform: 'none' }}>
              Download
            </Button>
          </Paper>
        </Grid>
        {/* <Grid item xs={4}>
          <Paper sx={{ marginRight: 4, backgroundColor: '#24263D', padding: 3 }}>
            <Typography>Multi-signature</Typography>
            <Typography>Current multi-sig signers:</Typography>
            <Typography>0x6969 X</Typography>
            <Typography>0x9898 X</Typography>
            <TextField label='Signers' />

            <Typography>0x6969</Typography>
            <Button fullWidth variant='contained' sx={{ marginTop: 2 }}>
              Add
            </Button>
          </Paper>
        </Grid> */}
      </Grid>
    </Card>
  )
}

export default AccountManageCard
