import { Box, Grid, Typography } from '@mui/material'
import TransactionAssetsCard from 'src/views/transaction/TransactionAssetsCard'
import TransactionCard, { INITIAL_STATE } from 'src/views/transaction/TransactionCard'
import { useImmer } from 'use-immer'

const Transactions = () => {
  const [transactionData, updateTransactionData] = useImmer([INITIAL_STATE])

  return (
    <Box>
      <Typography variant='h4' sx={{ marginBottom: 3 }}>
        Transfer
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TransactionAssetsCard updateTransactionData={updateTransactionData} />
        </Grid>
        <Grid item xs={12} md={6}>
          <TransactionCard updateTransactionData={updateTransactionData} transactionData={transactionData} />
        </Grid>
      </Grid>
      <Box></Box>
    </Box>
  )
}

export default Transactions
