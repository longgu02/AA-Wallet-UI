import { BrowserProvider, Contract, parseEther, parseUnits } from 'ethers'
import { ERC20_ABI } from 'src/constant/abis/erc20Abi'
import { Client, ICall, Presets } from 'userop'

const rpcUrl = 'https://api.stackup.sh/v1/node/6c329f2e1b005e3e456b00c8e627486477b6c60e2c234d4e028ad30b370d5508'
const paymasterUrl =
  'https://api.stackup.sh/v1/paymaster/6c329f2e1b005e3e456b00c8e627486477b6c60e2c234d4e028ad30b370d5508'

export const getAccountAddress = async (provider: BrowserProvider) => {
  console.log(provider)
  const builder = await Presets.Builder.Kernel.init(await provider.getSigner(), rpcUrl)
  const address = await builder.getSender()

  return address
}

export const createApproveCall = async (to: string, value: string, erc20TokenAddress: string, erc20: Contract) => {
  return {
    to: erc20TokenAddress,
    value: BigInt(0),
    data: await erc20.interface.encodeFunctionData('approve', [to, parseEther(value)])
  }
}

export const createTransferCall = async (to: string, value: string, erc20TokenAddress: string, erc20: Contract) => {
  return {
    to: erc20TokenAddress,
    value: BigInt(0),
    data: await erc20.interface.encodeFunctionData('transfer', [to, parseEther(value)])
  }
}

export const createERC20TransferCalls = async (
  provider: BrowserProvider,
  to: string,
  value: string,
  erc20TokenAddress: string
) => {
  const userOps: Array<ICall> = []
  const erc20: Contract = new Contract(erc20TokenAddress, ERC20_ABI, provider)

  const approve = await createApproveCall(to, value, erc20TokenAddress, erc20)
  const transfer = await createTransferCall(to, value, erc20TokenAddress, erc20)
  userOps.push(approve)
  userOps.push(transfer)
  console.log(userOps)

  return userOps
}

export const createTransferNativeCalls = (to: string, value: string) => {
  // const approve = await createApproveCall(item.to, item.value, erc20)
  const transfer = {
    to: to,
    value: parseEther(value),
    data: '0x'
  }

  return transfer
}

export const createCalls = async (
  provider: BrowserProvider,
  requests: Array<{ to: string; value: string; tokenAddress?: string }>
) => {
  let userOps: Array<ICall> = []
  console.log(requests)
  for (const item of requests) {
    if (item.tokenAddress && item.tokenAddress != 'native') {
      const res = await createERC20TransferCalls(provider, item.to, item.value, item.tokenAddress)
      userOps = userOps.concat(res)
    } else if (item.tokenAddress == 'native') {
      const op = await createTransferNativeCalls(item.to, item.value)
      userOps.push(op)
    }
  }

  return userOps
}

export const executeCalls = async (provider: BrowserProvider, calls: Array<ICall>, feeToken: string) => {
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
  const ev = await res.wait()

  console.log(ev)
}
