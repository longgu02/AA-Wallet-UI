import { Card, CardContent, CircularProgress, Typography } from '@mui/material'
import { useState, ChangeEvent, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { fetchAllBalance } from 'src/utils/userOp'
import { useSelector } from 'react-redux'
import { useImmer } from 'use-immer'
import { formatEther } from 'ethers'

interface Column {
  id: 'token' | 'balance'
  label: string
  minWidth?: number
  align?: 'right'
  format?: (value: number) => string
}

const columns: readonly Column[] = [
  { id: 'token', label: 'Token', minWidth: 170 },
  { id: 'balance', label: 'Balance', minWidth: 100 }
]

interface Data {
  token: string
  balance: string
}

function createData(token: string, balance: string): Data {
  return { token, balance }
}

const WalletAssetsCard = () => {
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const { provider } = useSelector((state: any) => state.wallet)
  const [isLoading, setLoading] = useState<boolean>(false)
  const { accountAddress } = useSelector((state: any) => state.account)
  const [rows, updateRows] = useImmer<Array<Data>>([])

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const genTableBody = () => {
    if (provider) {
      if (accountAddress) {
        if (isLoading) {
          return (
            <CircularProgress
              sx={{ position: 'absolute', top: '50%', left: '45%', transform: 'translate(-50%, -50%)' }}
            />
          )
        } else {
          return (
            <TableBody>
              {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
                return (
                  <TableRow hover role='checkbox' tabIndex={-1} key={row.balance}>
                    {columns.map((column, index) => {
                      const value = row[column.id]

                      return (
                        <TableCell key={column.id + index} align={column.align}>
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>
                      )
                    })}
                  </TableRow>
                )
              })}
            </TableBody>
          )
        }
      } else {
        return <Typography>Please sign to get your account</Typography>
      }
    } else {
      return <Typography>Connect to your wallet</Typography>
    }
  }

  useEffect(() => {
    if (provider) {
      if (accountAddress) {
        setLoading(true)
        fetchAllBalance(provider, accountAddress)
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
    }
  }, [provider, accountAddress])

  return (
    <Card sx={{ position: 'relative', opacity: isLoading ? 0.7 : 1, cursor: 'progress' }}>
      <CardContent>
        <Typography variant='h6' sx={{ marginBottom: 5, marginTop: 2 }}>
          Assets
        </Typography>
        <TableContainer sx={{ height: 440 }}>
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
        />
      </CardContent>
    </Card>
  )
}

export default WalletAssetsCard
