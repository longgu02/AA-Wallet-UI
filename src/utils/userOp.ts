import { BrowserProvider, Contract, parseEther, parseUnits } from 'ethers'
import { ERC20_ABI } from 'src/constant/abis/erc20Abi'
import { Client, ICall, Presets } from 'userop'

const rpcUrl = 'https://api.stackup.sh/v1/node/6149257d4d56204640fd8ca4ed940fa4bbfbd716784a3c40e0ab74811515e8ac'
const paymasterUrl =
  'https://api.stackup.sh/v1/paymaster/6149257d4d56204640fd8ca4ed940fa4bbfbd716784a3c40e0ab74811515e8ac'

export const getAccountAddress = async (provider: BrowserProvider) => {
  const builder = await Presets.Builder.Kernel.init(await provider.getSigner(), rpcUrl)
  const address = await builder.getSender()

  return address
}

export const createApproveCall = async (to: string, value: string, erc20: Contract) => {
  return {
    to: to,
    value: parseEther(value),
    data: await erc20.interface.encodeFunctionData('approve', [to, parseUnits(value)])
  }
}

export const createTransferCall = async (to: string, value: string, erc20: Contract) => {
  return {
    to: to,
    value: parseEther(value),
    data: await erc20.interface.encodeFunctionData('transfer', [to, parseUnits(value)])
  }
}

export const createApproveAndTransferCalls = async (
  provider: BrowserProvider,
  requests: Array<{ to: string; value: string }>,
  erc20TokenAddress: string
) => {
  const userOps: Array<ICall> = []
  const erc20: Contract = new Contract(erc20TokenAddress, ERC20_ABI, provider)

  await requests.map(async item => {
    const approve = await createApproveCall(item.to, item.value, erc20)
    const transfer = await createTransferCall(item.to, item.value, erc20)
    userOps.push(approve)
    userOps.push(transfer)
    console.log(userOps)

    return
  })

  return userOps
}

export const transferToken = async (provider: BrowserProvider, calls: Array<ICall>, feeToken: string) => {
  console.log('transfer', provider, calls, feeToken)
  const paymasterMiddleware = Presets.Middleware.verifyingPaymaster(paymasterUrl, {
    type: 'payg',
    token: feeToken
  })

  // Sign here
  const builder = await Presets.Builder.Kernel.init(await provider.getSigner(), rpcUrl, { paymasterMiddleware })
  const client = await Client.init(rpcUrl)

  // Sign here
  const res = await client.sendUserOperation(
    calls.length === 1 ? builder.execute(calls[0]) : builder.executeBatch(calls),
    {
      onBuild: op => console.log('Signed UserOperation', op)
    }
  )
  console.log(`UserOpHash: ${res.userOpHash}`)
  console.log(`Waiting for transaction...`)
  const ev = await res.wait()
  console.log(`Transaction hash: ${ev?.transactionHash ?? null}`)
}

export const getBalance = async (provider: BrowserProvider, address: string) => {
  return await provider.getBalance(address)
}
