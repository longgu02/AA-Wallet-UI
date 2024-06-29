import { Box, Button, Grid, Paper, Stack, TextField, Typography } from '@mui/material'
import { ContractFactory, parseEther } from 'ethers'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { ecdsaByteCode, ecdsaRegistryAbi } from 'src/constant/abis/modules/ecdsaRegistryAbi'
import { ECDSASM_ADDRESS } from 'src/constant/address'
import { ERC20_TOKEN_ADDRESSES } from 'src/constant/addresses'
import { executeCalls } from 'src/utils/userOp'
import AccountManageCard from 'src/views/manage-account/AccountManageCard'
import ECDSAManageCard from 'src/views/manage-account/ECDSAManageCard'

const Account = () => {
  const [address, setPassword] = useState<string>('')
  const { accounts } = useSelector(state => state.account)
  const { provider } = useSelector((state: any) => state.wallet)

  const handleTransfer = async () => {
    await executeCalls(
      accounts.find((acc: any) => acc.isSelected)?.address[0],
      accounts.find((acc: any) => acc.isSelected == true)?.publicKey,
      accounts.find((acc: any) => acc.isSelected == true)?.logger,
      provider,
      [
        {
          receiver: ECDSASM_ADDRESS,
          amount: parseEther('0'),
          data: new ContractFactory(ecdsaRegistryAbi, ecdsaByteCode).interface.encodeFunctionData('transferOwnership', [
            address
          ])
        }
      ],
      ERC20_TOKEN_ADDRESSES['6test'],
      '12112002'
    )
  }

  return (
    <Box>
      <Typography variant='h4' sx={{ marginBottom: 3 }}>
        Manage Account
      </Typography>
      <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'space-around' }}>
        <Paper sx={{ padding: 4 }}>
          <Typography>Account</Typography>
          <Stack spacing={3}>
            <Box>
              <TextField fullWidth label='Address' onChange={e => setPassword(e.target.value)} value={address} />
              <Button variant='contained' sx={{ marginTop: 2 }} onClick={handleTransfer}>
                Transfer Owner
              </Button>
            </Box>
            <Box>
              <Button variant='contained'>Renounce</Button>
            </Box>
          </Stack>
        </Paper>
        {/* <ECDSAManageCard />
      <AccountManageCard />
      <Grid container spacing={3}>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}></Grid>
      </Grid> */}
      </Box>
    </Box>
  )
}

export default Account
