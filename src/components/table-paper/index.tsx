import { Box, Grid } from '@mui/material'
import TablePaperRow from './row'

const TablePaper = () => {
  const colTitle = ['Token', 'Price', 'Value', 'Action']

  return (
    <Box>
      <Grid container sx={{ marginLeft: 2, marginBottom: 2 }}>
        {colTitle.map((item, index) => (
          <Grid item xs={3} key={index}>
            {item}
          </Grid>
        ))}
      </Grid>
      <TablePaperRow />
    </Box>
  )
}

export default TablePaper
