import { Box, Grid, Typography } from '@mui/material'
import WalletAssetsCard from 'src/views/wallet/WalletAssetsCard'
import WalletHeaderCard from 'src/views/wallet/WalletHeaderCard'
import WalletTransactionCard from 'src/views/wallet/WalletTransactionCard'

const WalletPage = () => {
  return (
    <Box>
      <Typography variant='h4' sx={{ marginBottom: 3 }}>
        AA Wallet
      </Typography>
      <Grid>
        <WalletHeaderCard />
      </Grid>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <WalletAssetsCard />
          </Grid>
          <Grid item xs={6}>
            <WalletTransactionCard />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default WalletPage
