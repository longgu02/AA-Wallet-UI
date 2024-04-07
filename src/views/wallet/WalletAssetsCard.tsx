import { Card, CardContent, Typography } from '@mui/material'
import { useState, useEffect } from 'react'
import { fetchAllBalance } from 'src/utils/connection'
import { useSelector } from 'react-redux'
import { useImmer } from 'use-immer'
import { JsonRpcProvider, formatEther } from 'ethers'
import TablePaper from 'src/components/table-paper'
import { getJsonRpcProvider } from 'src/constant/chain'

interface Data {
  token: string
  balance: string
}

function createData(token: string, balance: string): Data {
  return { token, balance }
}

const WalletAssetsCard = () => {
  const [rpcProvider, setRpcProvider] = useState<JsonRpcProvider | undefined>()
  const { provider } = useSelector((state: any) => state.wallet)
  const [isLoading, setLoading] = useState<boolean>(false)
  const { accounts } = useSelector((state: any) => state.account)
  const [rows, updateRows] = useImmer<Array<Data>>([])

  useEffect(() => {
    if (provider || rpcProvider) {
      if (accounts > 0) {
        setLoading(true)
        fetchAllBalance(provider ? provider : rpcProvider, accounts.find((acc: any) => acc.isSelected == true)?.address)
          .then((res: any) => {
            updateRows([])
            Object.keys(res).map((token: any) => {
              updateRows(draft => void draft.push(createData(token.toUpperCase(), formatEther(res[token]))))
            })
            console.log(res)
            setLoading(false)
          })
          .catch(err => {
            console.log(err)
            setLoading(false)
          })
      } else {
      }
    } else {
      setRpcProvider(getJsonRpcProvider())
    }
  }, [provider, accounts, updateRows])

  return (
    <Card sx={{ position: 'relative', opacity: isLoading ? 0.7 : 1, cursor: 'progress' }}>
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
        {rows && rows.map((row, index) => <TablePaper />)}
      </CardContent>
    </Card>
  )
}

export default WalletAssetsCard
