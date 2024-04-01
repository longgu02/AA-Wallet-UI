import { Box, Grid, Typography } from '@mui/material'
import ExternalPaymasterCard from 'src/views/paymaster/ExternalPaymasterCard'
import InternalPaymasterCard from 'src/views/paymaster/InternalPaymasterCard'

const WalletPage = () => {
  // const [transactionData, updateTransactionData] = useImmer([INITIAL_STATE])

  return (
    <Box>
      <Typography variant='h4' sx={{ marginBottom: 3 }}>
        Paymaster
      </Typography>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <InternalPaymasterCard />
          </Grid>
          <Grid item xs={6}>
            <ExternalPaymasterCard />
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default WalletPage
