import {
  Box,
  Button,
  Card,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { ContractFactory, JsonRpcProvider, ethers } from 'ethers'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { sessionManagerAbi, sessionManagerByteCode } from 'src/constant/abis/modules/sessionKeyManagerAbi'
import { ERC20SM_ADDRESS, NATIVESM_ADDRESS, SM_ADDRESS } from 'src/constant/address'
import { ERC20_TOKEN_ADDRESSES } from 'src/constant/addresses'
import { getJsonRpcProvider } from 'src/constant/chain'
import { client } from 'src/services/client'
import { SessionDetail } from 'src/types/interfaces'
import { genMerkleTree } from 'src/utils/session'
import { executeCalls } from 'src/utils/userOp'

interface SessionAddCardProp {
  sessions: Array<SessionDetail>
  setSessions: (session: Array<SessionDetail>) => void
}

const SessionsAddCard = (props: SessionAddCardProp) => {
  const { accounts } = useSelector((state: any) => state.account)
  const [address, setAddress] = useState<string>('')
  const [validAfter, setValidAfter] = useState<string>('')
  const [validUntil, setValidUntil] = useState<string>('')
  const [type, setType] = useState<string>('Native')
  const [tokenAddress, setTokenAddress] = useState<string>('')
  const [limit, setLimit] = useState<string>('')
  const [recipient, setRecipient] = useState<string>('')
  const { sessions, setSessions } = props

  const typeOption = ['Native', 'ERC-20', 'NFT (ERC-721)']

  const handleCreate = async () => {
    let sessionVerificationModule: string
    switch (type) {
      case 'Native':
        sessionVerificationModule = NATIVESM_ADDRESS
        break
      case 'ERC-20':
        sessionVerificationModule = ERC20SM_ADDRESS
        break
      case 'NFT (ERC-721)':
        sessionVerificationModule = '0x'
        break
      default:
        sessionVerificationModule = ''
    }

    // Contract
    const provider = getJsonRpcProvider()
    const SessionManger = new ContractFactory(sessionManagerAbi, sessionManagerByteCode, provider)
    const { merkleTree, data } = genMerkleTree(sessionVerificationModule, {
      address: address,
      recipient: recipient,
      maxAmount: ethers.parseEther(limit)
    })

    console.log(data)

    await executeCalls(
      accounts.find((acc: any) => acc.isSelected).address,
      '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
      accounts.find((acc: any) => acc.isSelected == true).logger,
      provider,
      [
        {
          receiver: SM_ADDRESS,
          amount: ethers.parseEther('0'),
          data: SessionManger.interface.encodeFunctionData('setMerkleRoot', [merkleTree.getHexRoot()])
        }
      ],
      ERC20_TOKEN_ADDRESSES['6test'],
      '12112002'
    )

    // Backend
    const sessionData = {
      account: accounts.find((acc: any) => acc.isSelected).address,
      authorized: address,
      recipient: recipient,
      validAfter: Number(validAfter),
      validUntil: Number(validUntil),
      sessionVerificationModule: sessionVerificationModule,
      token: type != 'Native' ? tokenAddress : 'native',
      limit: ethers.parseEther(limit).toString()
    }
    console.log(sessionData)
    client
      .post('/session', sessionData)
      .then((response: SessionDetail) => {
        // State
        setSessions([...sessions, response])
        console.log(response)
      })
      .catch(err => {
        console.log(err)
      })
  }

  return (
    <Card sx={{ marginBottom: 4, padding: 4 }}>
      <Typography variant='h6' sx={{ marginBottom: 5, marginTop: 2 }}>
        Add new session
      </Typography>
      <Stack spacing={2}>
        <TextField label='Authorized Address' fullWidth onChange={e => setAddress(e.target.value)} />
        <TextField label='Recipient' fullWidth onChange={e => setRecipient(e.target.value)} />
        <Box sx={{ display: 'flex', marginBottom: 2 }}>
          <TextField
            label='Valid After'
            sx={{ flex: 1, marginRight: 2 }}
            onChange={e => setValidAfter(e.target.value)}
          />
          <TextField label='Valid Until' sx={{ flex: 1 }} onChange={e => setValidUntil(e.target.value)} />
        </Box>
        {/* <Autocomplete
          fullWidth
          options={typeOption}
          sx={{ width: 300 }}
          renderInput={params => <TextField {...params} label='Type' defaultValue={'Native'} />}
        /> */}
        <FormControl>
          <RadioGroup row sx={{ display: 'flex' }} value={type} onChange={e => setType(e.target.value)}>
            {typeOption.map((type, index) => (
              <FormControlLabel key={index} value={type} control={<Radio />} sx={{ flex: 1 }} label={type} />
            ))}
          </RadioGroup>
        </FormControl>
        {type != 'Native' && (
          <TextField label='Token address' fullWidth onChange={e => setTokenAddress(e.target.value)} />
        )}
        <TextField label='Limit' fullWidth onChange={e => setLimit(e.target.value)} />
      </Stack>
      <Box sx={{ marginTop: 4, display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant='contained' onClick={handleCreate} disable={accounts.length == 0}>
          Add Session
        </Button>
      </Box>
    </Card>
  )
}

export default SessionsAddCard
