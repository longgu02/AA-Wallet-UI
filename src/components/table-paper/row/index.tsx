import { Box, Grid, Paper, Typography } from '@mui/material'

const TablePaperRow = () => {
  const ETHIconUrl = 'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png'

  return (
    <Paper sx={{ backgroundColor: '#24263D', padding: 3 }}>
      <Grid container>
        <Grid item xs={3}>
          <Box sx={{ display: 'flex', justifyContent: 'start' }}>
            <img src={ETHIconUrl} width={40} height={40} alt='SepoliaETH' />
            <Typography sx={{ margin: 'auto 0 auto 6px' }}>ETH</Typography>
          </Box>
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', justifyContent: 'start' }}>
            <Typography sx={{ margin: 'auto 0 auto 0' }}>$3000</Typography>
          </Box>
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', justifyContent: 'start' }}>
            <Typography sx={{ margin: 'auto 0 auto 0' }}>$600.000</Typography>
          </Box>
        </Grid>
        <Grid item xs={3} sx={{ display: 'flex' }}>
          <Box sx={{ display: 'flex', justifyContent: 'start' }}>
            <Typography sx={{ margin: 'auto 0 auto 0' }}>Transfer</Typography>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default TablePaperRow
