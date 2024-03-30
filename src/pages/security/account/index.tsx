import { Box, Grid, Typography } from '@mui/material'
import AccountManageCard from 'src/views/manage-account/AccountManageCard'
import ECDSAManageCard from 'src/views/manage-account/ECDSAManageCard'

const Account = () => {
  return (
    <Box>
      <Typography variant='h4' sx={{ marginBottom: 3 }}>
        Manage Account
      </Typography>
      <ECDSAManageCard />
      <AccountManageCard />
      <Grid container spacing={3}>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}></Grid>
      </Grid>
    </Box>
  )
}

export default Account
