import { Box, Grid, Stack } from '@mui/material'
import TablePaperRow from './row'

const TablePaper = (props: { data: any }) => {
  const colTitle = ['Token', 'Balance', 'Price', 'Value']
  const data = props.data

  return (
    <Box>
      <Grid container sx={{ marginLeft: 2, marginBottom: 2 }}>
        {colTitle.map((item, index) => (
          <Grid item xs={3} key={index}>
            {item}
          </Grid>
        ))}
      </Grid>
      <Stack spacing={2}>
        {data.map((item: any, index: number) => (
          <TablePaperRow key={index} data={item} />
        ))}
      </Stack>
    </Box>
  )
}

export default TablePaper
