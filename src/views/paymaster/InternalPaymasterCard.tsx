import { Box, Divider, Grid, Paper, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'

const PaymasterBox = () => {
  return (
    <Box sx={{ backgroundColor: '#24263D', padding: 3 }}>
      <Typography>Name: Paymaster for my groceries Status</Typography>
      <Typography>Status: Active</Typography>
      <Divider />
      <Typography>Network: Sepolia</Typography>
      <Typography>Type: Pay-as-you-go </Typography>
    </Box>
  )
}

const InternalPaymasterCard = () => {
  return (
    <Paper sx={{ padding: 3 }}>
      <Typography variant='h5'>Internal Paymaster</Typography>
      <Typography variant='subtitle1'>Sponsor your transactions with Paymaster provided by Accountify</Typography>
      <Box sx={{ marginTop: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <PaymasterBox />
          </Grid>
          <Grid item xs={6}>
            <Box
              sx={{
                padding: 3,
                border: '1px dashed #ffffff',
                height: '100%',
                minHeight: 158,
                position: 'relative',
                '&:hover': { backgroundColor: '#24263D', cursor: 'pointer' }
              }}
            >
              <AddIcon
                sx={{
                  marginTop: 'auto',
                  marginBottom: 'auto',
                  fontSize: 50,
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)'
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  )
}

export default InternalPaymasterCard
