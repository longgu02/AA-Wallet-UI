import { Box, Grid, Paper, Typography } from '@mui/material'

const TablePaperRow = (props: { data: any }) => {
  const ETHIconUrl = 'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png'
  const otherTokenIconUrl = 'https://sepolia.etherscan.io/images/main/empty-token.png'
  const { data } = props

  return (
    <Paper sx={{ backgroundColor: '#24263D', padding: 3 }}>
      <Grid container>
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', justifyContent: 'start' }}>
            {data?.token == 'ETH' ? (
              <img src={ETHIconUrl} width={40} height={40} alt='SepoliaETH' />
            ) : (
              <img src={otherTokenIconUrl} width={40} height={40} alt='SepoliaETH' />
            )}
            <Typography sx={{ margin: 'auto 0 auto 6px' }}>{data.token}</Typography>
          </Box>
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', justifyContent: 'start' }}>
            <Typography sx={{ margin: 'auto 0 auto 0' }}>{data.balance}</Typography>
          </Box>
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', justifyContent: 'start' }}>
            <Typography sx={{ margin: 'auto 0 auto 0' }}>${data.price}</Typography>
          </Box>
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', justifyContent: 'start' }}>
            <Typography sx={{ margin: 'auto 0 auto 0' }}>${data.price * data.balance}</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default TablePaperRow
