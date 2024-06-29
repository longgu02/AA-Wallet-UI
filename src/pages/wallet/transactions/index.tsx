// ** MUI Imports
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Chip from '@mui/material/Chip'
import Table from '@mui/material/Table'
import TableRow from '@mui/material/TableRow'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import Typography from '@mui/material/Typography'
import TableContainer from '@mui/material/TableContainer'

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types'
import { formatAddress } from 'src/utils'
import { formatEther, formatUnits } from 'ethers'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { client } from 'src/services/client'

interface RowType {
  from: string
  to: string
  value: string
  type: string
  timeStamp: string
  hash: string
  gas: string
}

interface StatusObj {
  [key: string]: {
    color: ThemeColor
  }
}

const statusObj: StatusObj = {
  deposit: { color: 'info' },
  rejected: { color: 'error' },
  creation: { color: 'primary' },
  resigned: { color: 'warning' },
  internal: { color: 'success' }
}

const TransactionsPage = () => {
  const [rows, setRows] = useState<RowType[]>([])
  const { accounts } = useSelector(state => state.account)

  useEffect(() => {
    if (accounts.length > 0) {
      client
        .get(`/tx/${accounts.find(acc => acc.isSelected)?.address[0]}`)
        .then(res => {
          setRows(res)
          console.log(res)
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [])

  return (
    <Box>
      <Typography variant='h4' sx={{ marginBottom: 3 }}>
        Transactions
      </Typography>
      <Card>
        <TableContainer>
          <Table sx={{ minWidth: 800 }} aria-label='table in dashboard'>
            <TableHead>
              <TableRow>
                <TableCell>From</TableCell>
                <TableCell>To</TableCell>
                <TableCell>Value</TableCell>
                <TableCell>Gas</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Tx Hash</TableCell>
                <TableCell>Type</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: RowType) => (
                <TableRow hover key={row.from} sx={{ '&:last-of-type td, &:last-of-type th': { border: 0 } }}>
                  <TableCell sx={{ py: theme => `${theme.spacing(0.5)} !important` }}>
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ fontWeight: 500, fontSize: '0.875rem !important' }}>
                        {formatAddress(row.from, 9)}
                      </Typography>
                      {/* <Typography variant='caption'>{row.to}</Typography> */}
                    </Box>
                  </TableCell>
                  <TableCell>{formatAddress(row.to, 9)}</TableCell>
                  <TableCell>{formatEther(row.value)} ETH</TableCell>
                  <TableCell>{row.gas} WEI</TableCell>
                  <TableCell>{new Date(Number(row.timeStamp) * 1000).toLocaleString('en-GB')}</TableCell>
                  <TableCell>
                    <Box sx={{ '&:hover': { textDecoration: 'underline', cursor: 'pointer' } }}>
                      <a
                        href={`https://sepolia.etherscan.io/tx/${row.hash}`}
                        target='_blank'
                        style={{ color: 'inherit', textDecoration: 'none' }}
                        rel='noopener noreferrer'
                      >
                        {formatAddress(row.hash, 10)}
                      </a>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={row.type}
                      color={statusObj[row.type].color}
                      sx={{
                        height: 24,
                        fontSize: '0.75rem',
                        textTransform: 'capitalize',
                        '& .MuiChip-label': { fontWeight: 500 }
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  )
}

export default TransactionsPage
