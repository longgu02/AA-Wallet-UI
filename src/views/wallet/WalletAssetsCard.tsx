import { Card, CardContent, CircularProgress, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { fetchAllBalance } from 'src/utils/connection'
import { useSelector } from 'react-redux'
import { useImmer } from 'use-immer'
import { formatEther } from 'ethers'
import TablePaper from 'src/components/table-paper'

interface Data {
  token: string
  balance: string
  price: string
}

function createData(token: string, balance: string, price: string): Data {
  return { token, balance, price }
}

const WalletAssetsCard = () => {
  const { provider } = useSelector((state: any) => state.wallet)
  const [isLoading, setLoading] = useState<boolean>(false)
  const { accounts } = useSelector((state: any) => state.account)
  const [rows, updateRows] = useImmer<Array<Data>>([])

  useEffect(() => {
    setLoading(true)
    if (accounts.length > 0) {
      fetchAllBalance(accounts.find((acc: any) => acc.isSelected == true)?.address[0])
        .then((res: any) => {
          updateRows([])
          res.map((token: any) => {
            updateRows(
              draft => void draft.push(createData(token.name.toUpperCase(), formatEther(token.balance), token.price))
            )
          })
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
    setLoading(false)
  }, [provider, accounts, updateRows])

  console.log(rows)

  return (
    <Card sx={{ position: 'relative', opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'progress' : 'auto' }}>
      <CardContent>
        <Typography variant='h6' sx={{ marginBottom: 5, marginTop: 2 }}>
          Assets
        </Typography>

        {/* <TableContainer sx={{ height: 440 }}>
          <Table stickyHeader aria-label='sticky table'>
            <TableHead>
              <TableRow>
                {columns.map(column => (
                  <TableCell key={column.id} align={column.align} sx={{ minWidth: column.minWidth }}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            {genTableBody()}
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        /> */}
        {rows?.length > 0 ? (
          <TablePaper data={rows} />
        ) : (
          <CircularProgress sx={{ marginLeft: 'auto', marginRight: 'auto' }} />
        )}
      </CardContent>
    </Card>
  )
}

export default WalletAssetsCard
