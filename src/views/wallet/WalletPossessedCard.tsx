import { Box, Card, Typography } from '@mui/material'
import { useSelector } from 'react-redux'

const WalletPossessedCard = () => {
  const { accounts } = useSelector((state: any) => state.account)

  return (
    <Card sx={{ marginBottom: 4, height: 265, padding: 4 }}>
      <Typography variant='h6' sx={{ marginBottom: 5, marginTop: 2 }}>
        Possessed Accounts
      </Typography>
      <Box>
        {accounts
          .find((acc: any) => acc.isSelected)
          ?.address?.map((add: any) => (
            <Box key={add} sx={{ cursor: 'pointer' }}>
              <Typography>{add}</Typography>
            </Box>
          ))}
        {/* {accounts.find((acc: any) => acc.isSelected)?.address[0]} */}
      </Box>
    </Card>
  )
}

export default WalletPossessedCard
