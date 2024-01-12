import {
  Box,
  Card,
  CardContent,
  Grid,
  TextField,
  Typography,
  IconButton,
  CircularProgress,
  Select,
  MenuItem
} from '@mui/material'
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow'
import { useEffect, useState } from 'react'
import { createApproveAndTransferCall, getBalance, transferToken } from 'src/utils/userOp'
import { useSelector } from 'react-redux'
import { ERC20_TOKEN_ADDRESSES } from 'src/constant/addresses'
import { client } from 'src/services/client'
import useNotify from 'src/hooks/useNotify'
import { useImmer } from 'use-immer'
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline'
import ClearIcon from '@mui/icons-material/Clear'

const ETHIconUrl = 'https://icons.iconarchive.com/icons/cjdowner/cryptocurrency-flat/512/Ethereum-ETH-icon.png'

const TransactionPad = (props: {
  index: number
  data: { amount: string; to: string; feeToken: string }
  updateInput: (index: number, field: string, data: string) => void
}) => {
  const { index, data, updateInput } = props
  const [amount, setAmount] = useState<string>('')
  const [to, setTo] = useState<string>('')
  const [feeToken, setFeeToken] = useState<string>('')

  return (
    <Box sx={{ marginBottom: 5 }}>
      <Typography sx={{ marginBottom: 2 }}>Amount</Typography>
      <Grid container sx={{ marginBottom: 2 }}>
        <Grid item xs={9}>
          <TextField
            placeholder='Amount'
            sx={{ display: 'flex' }}
            fullWidth
            value={data.amount}
            onChange={(e: any) => updateInput(index, 'amount', e.target.value)}
          />
        </Grid>
        <Grid item xs={3} sx={{ textAlign: 'center' }}>
          <img src={ETHIconUrl} width={40} height={40} alt='GoerliETH' />
          <Typography>GoerliETH</Typography>
        </Grid>
      </Grid>
      <Box sx={{ flexWrap: 'wrap', display: 'flex', justifyContent: 'space-between' }}>
        {/* <TextField placeholder='Amount' sx={{ display: 'flex' }} fullWidth /> */}
        {/* <TextField placeholder='Amount' /> */}
      </Box>
      <Typography sx={{ marginBottom: 2 }}>Receiver</Typography>
      <TextField
        placeholder='To'
        fullWidth
        sx={{ marginBottom: 2 }}
        value={data.to}
        onChange={(e: any) => updateInput(index, 'to', e.target.value)}
      />
      <Typography sx={{ marginBottom: 2 }}>Fee Token</Typography>
      <Select
        placeholder='Fee Token'
        value={data.feeToken}
        fullWidth
        onChange={event => updateInput(index, 'feeToken', event.target.value)}
      >
        <MenuItem value={ERC20_TOKEN_ADDRESSES['6test']}>6TEST</MenuItem>
        <MenuItem value={ERC20_TOKEN_ADDRESSES.usdc}>USDC</MenuItem>
      </Select>
    </Box>
  )
}

const WalletTransactionCard = () => {
  const [amount, setAmount] = useState<string>('')
  const [to, setTo] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [transactionData, updateTransactionData] = useImmer([
    { amount: '', to: '', feeToken: '' },
    { amount: '', to: '', feeToken: '' }
  ])
  const [feeToken, setFeeToken] = useState<string>('')

  const { provider } = useSelector((state: any) => state.wallet)
  const { successNotify, errorNotify } = useNotify()

  const updateTransactionInput = (index: number, field: string, data: string) => {
    updateTransactionData(draft => void (draft[index] = { ...transactionData[index], [field]: data }))
  }

  const handleAddTransaction = () => {
    updateTransactionData(draft => void draft.push({ amount: '', to: '', feeToken: '' }))
  }

  const handleRemoveTransaction = (index: number) => {
    updateTransactionData(draft => void draft.splice(index, 1))
  }

  console.log(transactionData)
  const handleSendTransaction = async () => {
    console.log('handleSendTransaction')
    setLoading(true)
    try {
      const calls = await createApproveAndTransferCall(provider, amount, to, ERC20_TOKEN_ADDRESSES.goerliETH)

      await transferToken(provider, calls, feeToken)

      // const data = await getBalance(provider, '0xa10cf1b64fafcd75ed18a905f96408f38f570fa6')
      // console.log(data)
      successNotify('Transaction completed!')
    } catch (err: any) {
      errorNotify(err.message)
      console.log(err)
    }
    setLoading(false)
  }

  return (
    <Card>
      <CardContent sx={{ paddingTop: 0 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='h6' sx={{ marginTop: 'auto', marginBottom: 'auto' }}>
            Send transaction
          </Typography>
          {!loading ? (
            <IconButton sx={{ display: 'flex' }} onClick={handleSendTransaction}>
              <DoubleArrowIcon sx={{ fontSize: 50 }} />
            </IconButton>
          ) : (
            <CircularProgress sx={{ display: 'flex', margin: '20px auto 10px auto' }} />
          )}
        </Box>
        {transactionData &&
          transactionData.map((data, index) => (
            <Box key={index}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontWeight: 'bold', marginTop: 'auto', marginBottom: 'auto' }}>
                  Transaction {index + 1}:
                </Typography>
                <IconButton sx={{ display: 'flex' }} onClick={() => handleRemoveTransaction(index)}>
                  <ClearIcon sx={{ fontSize: 30, margin: 'auto' }} />
                </IconButton>
              </Box>
              <TransactionPad updateInput={updateTransactionInput} index={index} data={data} />
            </Box>
          ))}
        <IconButton sx={{ display: 'flex', margin: '20px auto 0 auto' }} onClick={handleAddTransaction}>
          <AddCircleOutlineIcon sx={{ fontSize: 50, margin: 'auto' }} />
        </IconButton>
      </CardContent>
    </Card>
  )
}

export default WalletTransactionCard
