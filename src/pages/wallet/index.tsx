import { Box, Grid, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { client } from 'src/services/client'
import WalletAssetsCard from 'src/views/wallet/WalletAssetsCard'
import WalletHeaderCard from 'src/views/wallet/WalletHeaderCard'
import WalletTransactionCard from 'src/views/wallet/WalletTransactionCard'

const WalletPage = () => {
  const [accountAddress, setAccountAddress] = useState<string>('')
  const [balance, setBalance] = useState<BigInt>()
  const { provider } = useSelector((state: any) => state.wallet)

  useEffect(() => {
    client
      .get('/wallet')
      .then(res => {
        console.log(res)
        setAccountAddress(res.address)
      })
      .catch((err: any) => {
        console.log(err)
      })
    if (provider) {
      provider
        .getBalance('0xAd97db8126589D4001895035216D1977fC0cE49d')
        .then((res: BigInt) => {
          setBalance(res)
        })
        .catch((err: any) => {
          console.log(err)
        })
    }
  }, [provider])

  return (
    <Box>
      <Typography variant='h4' sx={{ marginBottom: 3 }}>
        AA Wallet
      </Typography>
      <Grid>
        <WalletHeaderCard address={accountAddress} balance={balance} />
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
