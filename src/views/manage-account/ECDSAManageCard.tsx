import { Box, Button, Card, Paper, Typography } from '@mui/material'
import { useSelector } from 'react-redux'
import AddIcon from '@mui/icons-material/Add'

const ECDSAManageCard = () => {
  const { accounts } = useSelector((state: any) => state.account)

  return (
    <Card sx={{ marginBottom: 4, minHeight: 265, padding: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
        <Typography variant='h6'>Signers</Typography>
        <Button sx={{ display: 'flex', textTransform: 'none' }}>
          <AddIcon sx={{ marginTop: 'auto', marginBottom: 'auto', fontSize: 24 }} />
          <Typography sx={{ marginTop: 'auto', marginBottom: 'auto' }}>Add Signer</Typography>
        </Button>
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'start', alignItems: 'stretch', height: '100%' }}>
        <Paper
          sx={{
            marginRight: 4,
            backgroundColor: '#24263D',
            padding: 3,
            minWidth: '200px',
            minHeight: '150px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}
        >
          <Box>
            <Typography>phamlong121120022@gmail.com</Typography>
            <Typography>Email/Password Signer</Typography>

            <Typography>0x6969</Typography>
          </Box>
          <Button variant='contained' sx={{ marginTop: 2 }}>
            Remove
          </Button>
        </Paper>
      </Box>
    </Card>
  )
}

export default ECDSAManageCard
