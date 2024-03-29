import { ERC20_ABI } from 'src/constant/abis/erc20Abi'
import { Contract, ContractFactory, JsonRpcProvider, ethers, BrowserProvider, parseEther, Wallet } from 'ethers'
import { UserOp } from 'src/types/interfaces'

// import { AF_ADDRESS, EP_ADDRESS, PM_ADDRESS } from 'src/constant/address'
import { Client, ICall, Presets } from 'userop'
import { accountAbi, accountByteCode } from 'src/constant/abis/accountAbi'
import { AF_ADDRESS, ECDSASM_ADDRESS, EP_ADDRESS, PM_ADDRESS } from 'src/constant/address'
import { AF_BYTECODE, accountFactoryAbi } from 'src/constant/abis/accountFactory'
import { entryPointAbi } from 'src/constant/abis/entryPointAbi'

const rpcUrl = 'https://api.stackup.sh/v1/node/6c329f2e1b005e3e456b00c8e627486477b6c60e2c234d4e028ad30b370d5508'
const paymasterUrl =
  'https://api.stackup.sh/v1/paymaster/6c329f2e1b005e3e456b00c8e627486477b6c60e2c234d4e028ad30b370d5508'

export const getAccountAddress = async (provider: BrowserProvider) => {
  console.log(provider)
  const builder = await Presets.Builder.Kernel.init((await provider.getSigner()) as any, rpcUrl)
  const address = await builder.getSender()

  return address
}

export const createApproveCall = async (to: string, value: string, erc20TokenAddress: string, erc20: Contract) => {
  return {
    receiver: erc20TokenAddress,
    amount: BigInt(0),
    data: await erc20.interface.encodeFunctionData('approve', [to, parseEther(value)])
  }
}

export const createTransferCall = async (to: string, value: string, erc20TokenAddress: string, erc20: Contract) => {
  return {
    receiver: erc20TokenAddress,
    amount: BigInt(0),
    data: await erc20.interface.encodeFunctionData('transfer', [to, parseEther(value)])
  }
}

export const createERC20TransferCalls = async (
  provider: BrowserProvider,
  to: string,
  value: string,
  erc20TokenAddress: string
) => {
  const userOps: [
    {
      receiver: string
      amount: bigint
      data: string
    }
  ] = []
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
    receiver: to,
    amount: parseEther(value),
    data: '0x'
  }

  return transfer
}

export const createCalls = async (
  provider: BrowserProvider,
  requests: Array<{ to: string; value: string; tokenAddress?: string }>
) => {
  let userOps: [
    {
      receiver: string
      amount: bigint
      data: string
    }
  ] = []
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

export const executeCalls = async (
  publicKey: string,
  logger: string,
  provider: BrowserProvider | JsonRpcProvider,
  calls: [
    {
      receiver: string
      amount: bigint
      data: string
    }
  ],
  feeToken: string
) => {
  // const paymasterMiddleware = Presets.Middleware.verifyingPaymaster(paymasterUrl, {
  //   type: 'payg',
  //   token: feeToken
  // })
  const bundler = new JsonRpcProvider('http://localhost:8545')
  const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'

  const wallet = new Wallet(privateKey)
  const signer = wallet.connect(bundler)

  const entryPoint = new Contract(EP_ADDRESS, entryPointAbi, signer)
  const AccountFactory = new ContractFactory(accountFactoryAbi, AF_BYTECODE, bundler)
  const Account = new ContractFactory(accountAbi, accountByteCode, bundler)

  let sender: any

  // Calculate address from the entry point

  let initCode =
    AF_ADDRESS +
    AccountFactory.interface.encodeFunctionData('createAccount', [publicKey, ECDSASM_ADDRESS, EP_ADDRESS]).slice(2)

  try {
    await entryPoint.getSenderAddress(initCode)
  } catch (ex: any) {
    // Local
    // console.log(ex)
    // sender = '0x' + ex.data.data.slice(-40)

    // Testnet
    sender = '0x' + ex.data.slice(-40)

    // console.log(ex);
  }
  console.log({ sender })
  const code = await bundler.getCode(sender)
  if (code !== '0x') {
    initCode = '0x'
  }

  const { userOp, userOpHash } = await fillUserOp(sender, Account, entryPoint, initCode, calls)
  console.log({ userOp, userOpHash })

  if (logger != 'eoa') {
    // Sign the userOp
  } else {
    // Sign the userOp
  }

  // Sign here
  // const builder = await Presets.Builder.Kernel.init((await provider.getSigner()) as any, rpcUrl, {
  //   paymasterMiddleware
  // })
  // const client = await Client.init(rpcUrl)

  // // Sign here
  // const res = await client.sendUserOperation(
  //   calls.length === 1 ? builder.execute(calls[0]) : builder.executeBatch(calls),
  //   {
  //     onBuild: op => console.log('Signed UserOperation', op)
  //   }
  // )
  // const ev = await res.wait()

  // console.log(ev)
}

export const fillUserOp = async (
  sender: string,
  Account: ContractFactory,
  entryPoint: Contract,
  initCode: string,
  callDatas: [
    {
      receiver: string
      amount: bigint
      data: string
    }
  ]
) => {
  // const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY

  // const bundler = new JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`)

  // Get addresses

  // const epAddress: string = EP_ADDRESS
  const pmAddress: string = PM_ADDRESS

  let receivers: string[] | string
  let amounts: bigint[] | bigint
  let datas: string[] | string

  if (callDatas.length > 1) {
    receivers = []
    amounts = []
    datas = []
    callDatas.map(callData => {
      ;(receivers as string[]).push(callData.receiver)
      ;(amounts as bigint[]).push(callData.amount)
      ;(datas as string[]).push(callData.data)
    })
  } else {
    receivers = callDatas[0].receiver
    amounts = callDatas[0].amount
    datas = callDatas[0].data
  }

  // Fill user operation
  const userOp: UserOp = {
    sender, // smart account address
    nonce: '0x' + (await entryPoint.getNonce(sender, 0)).toString(16),
    initCode,
    callData: Account.interface.encodeFunctionData('execute', [receivers, amounts, datas]),
    paymasterAndData: pmAddress,
    signature:
      '0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c'
  }

  // const { preVerificationGas, verificationGasLimit, callGasLimit } = await bundler.send(
  //   'eth_estimateUserOperationGas',
  //   [userOp, epAddress]
  // )

  // userOp.preVerificationGas = preVerificationGas
  // userOp.verificationGasLimit = verificationGasLimit
  // userOp.callGasLimit = callGasLimit
  userOp.preVerificationGas = 900_000 * 4
  userOp.verificationGasLimit = 900_000 * 4
  userOp.callGasLimit = 900_000 * 4

  // const { maxFeePerGas } = await bundler.getFeeData()
  // userOp.maxFeePerGas = '0x' + maxFeePerGas?.toString(16)
  userOp.maxFeePerGas = ethers.parseUnits('100', 'gwei')

  // const maxPriorityFeePerGas = await bundler.send('rundler_maxPriorityFeePerGas', [])
  // userOp.maxPriorityFeePerGas = maxPriorityFeePerGas
  userOp.maxPriorityFeePerGas = ethers.parseUnits('50', 'gwei')

  return { userOp: userOp, userOpHash: await entryPoint.getUserOpHash(userOp) }
}
