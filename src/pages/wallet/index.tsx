import { Box, Grid, Typography } from '@mui/material'
import WalletAssetsCard from 'src/views/wallet/WalletAssetsCard'
import WalletHeaderCard from 'src/views/wallet/WalletHeaderCard'
import WalletTransactionCard, { INITIAL_STATE } from 'src/views/wallet/WalletTransactionCard'
import { useImmer } from 'use-immer'

const WalletPage = () => {
  const [transactionData, updateTransactionData] = useImmer([INITIAL_STATE])

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
            <WalletAssetsCard updateTransactionData={updateTransactionData} />
          </Grid>
          <Grid item xs={6}>
            <WalletTransactionCard updateTransactionData={updateTransactionData} transactionData={transactionData} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default WalletPage
