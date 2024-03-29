import { Card, CardContent, CircularProgress, Typography } from '@mui/material'
import { useState, ChangeEvent, useEffect } from 'react'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import { fetchAllBalance } from 'src/utils/connection'
import { useSelector } from 'react-redux'
import { Updater, useImmer } from 'use-immer'
import { JsonRpcProvider, formatEther } from 'ethers'
import { ERC20_TOKEN_ADDRESSES } from 'src/constant/addresses'
import { INITIAL_STATE } from './TransactionCard'

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

const TransactionAssetsCard = (props: {
  updateTransactionData: Updater<{ amount: string; to: string; feeToken: string; token: string }[]>
}) => {
  const [page, setPage] = useState<number>(0)
  const [rowsPerPage, setRowsPerPage] = useState<number>(10)
  const [rpcProvider, setRpcProvider] = useState<JsonRpcProvider | undefined>()
  const { provider } = useSelector((state: any) => state.wallet)
  const [isLoading, setLoading] = useState<boolean>(false)
  const { accounts } = useSelector((state: any) => state.account)
  const [rows, updateRows] = useImmer<Array<Data>>([])
  const { updateTransactionData } = props
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }

  const genTableBody = () => {
    if (provider || rpcProvider) {
      if (accounts.length > 0) {
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
                  <TableRow
                    hover
                    role='checkbox'
                    tabIndex={-1}
                    key={row.balance}
                    onClick={() =>
                      handleClickToken(
                        row.token != 'ETH'
                          ? ERC20_TOKEN_ADDRESSES[row.token.toLowerCase() as keyof typeof ERC20_TOKEN_ADDRESSES]
                          : 'native'
                      )
                    }
                  >
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
      return <Typography>Connecting to your wallet...</Typography>
    }
  }

  const handleClickToken = (token: string) => {
    console.log(token)
    updateTransactionData(draft => void draft.push({ ...INITIAL_STATE, token: token }))
  }

  useEffect(() => {
    if (provider || rpcProvider) {
      if (accounts.find(acc => acc.isSelected == true).address) {
        setLoading(true)
        fetchAllBalance(provider ? provider : rpcProvider, accounts.find(acc => acc.isSelected == true).address)
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
      setRpcProvider(new JsonRpcProvider('http://localhost:8545'))
    }
  }, [provider, accounts, updateRows, rpcProvider])

  return (
    <Card sx={{ position: 'relative', opacity: isLoading ? 0.7 : 1, cursor: isLoading ? 'progress' : 'auto' }}>
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

export default TransactionAssetsCard
