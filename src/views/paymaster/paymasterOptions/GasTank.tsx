import { Box, Button, TextField, Typography } from '@mui/material'
import { ContractFactory, JsonRpcProvider, formatEther, parseEther } from 'ethers'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { entryPointAbi, entryPointBytecode } from 'src/constant/abis/entryPointAbi'
import { EP_ADDRESS, PM_ADDRESS } from 'src/constant/address'
import { ERC20_TOKEN_ADDRESSES } from 'src/constant/addresses'
import { executeCalls } from 'src/utils/userOp'

interface PaymasterGasTank {
  setOpenDialog: (arg0: boolean) => void
}

const PaymasterGasTank = (props: PaymasterGasTank) => {
  const [depositAmount, setDepositAmount] = useState<string>('0')
  const { accounts } = useSelector((state: any) => state.account)
  const [balance, setBalance] = useState<string>('0')
  const [paymasterBalance, setPaymasterBalance] = useState<string>('0')
  const { setOpenDialog } = props
  const [provider, setProvider] = useState()

  useEffect(() => {
    const provider = new JsonRpcProvider('http://localhost:8545')

    provider
      .getBalance(accounts.find((acc: any) => acc.isSelected).address)
      .then(res => setBalance(res.toString()))
      .catch(err => console.error(err))

    provider
      .getBalance(PM_ADDRESS)
      .then(res => setPaymasterBalance(res.toString()))
      .catch(err => console.error(err))
  })

  const handleDeposit = async () => {
    const provider = new JsonRpcProvider('http://localhost:8545')
    const EntryPoint = new ContractFactory(entryPointAbi, entryPointBytecode, provider)

    await executeCalls(
      accounts.find((acc: any) => acc.isSelected).address,
      '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      accounts.find((acc: any) => acc.isSelected == true).logger,
      provider,
      [
        {
          receiver: EP_ADDRESS,
          amount: parseEther(depositAmount),
          data: await EntryPoint.interface.encodeFunctionData('depositTo', [PM_ADDRESS])
        }
      ],
      ERC20_TOKEN_ADDRESSES['6test'],
      '12112002'
    )
      .then(res => {
        console.log(res)
        setOpenDialog(false)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Box>
      {' '}
      <Typography sx={{ marginBottom: 3 }}>
        Funds: <strong>{formatEther(paymasterBalance)} ETH</strong>{' '}
      </Typography>
      <Box
        sx={{
          backgroundColor: '#24263D',
          padding: 3
        }}
      >
        <Box sx={{ marginBottom: 4 }}>
          <Typography>Deposit</Typography>
          <Typography>Balance: {formatEther(balance)} ETH</Typography>
        </Box>
        <TextField label='Amount' value={depositAmount} fullWidth onChange={e => setDepositAmount(e.target.value)} />
        <Box sx={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end', marginTop: 5 }}>
          <Button variant='contained' sx={{ display: 'flex' }} onClick={handleDeposit}>
            Deposit
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default PaymasterGasTank
