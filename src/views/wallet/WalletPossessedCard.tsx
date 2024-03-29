import { Box, Card, CardContent, Grid, Typography } from '@mui/material'
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { formatEther } from 'ethers'
import { useSelector } from 'react-redux'

const WalletPossessedCard = () => {
  const { accountAddress, accountBalance } = useSelector((state: any) => state.account)

  return (
    <Card sx={{ marginBottom: 4, height: 265, padding: 4 }}>
      <Typography variant='h6' sx={{ marginBottom: 5, marginTop: 2 }}>
        Possessed Accounts
      </Typography>
    </Card>
  )
}

export default WalletPossessedCard
