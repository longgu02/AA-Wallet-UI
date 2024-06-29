import { ERC20_ABI } from 'src/constant/abis/erc20Abi'
import {
  Contract,
  ContractFactory,
  JsonRpcProvider,
  ethers,
  BrowserProvider,
  parseEther,
  Wallet,
  AbiCoder
} from 'ethers'
import { UserOp } from 'src/types/interfaces'

// import { AF_ADDRESS, EP_ADDRESS, PM_ADDRESS } from 'src/constant/address'
import { Client, ICall, Presets } from 'userop'
import { accountAbi, accountByteCode } from 'src/constant/abis/accountAbi'
import { AF_ADDRESS, ECDSASM_ADDRESS, EP_ADDRESS, PM_ADDRESS } from 'src/constant/address'
import { AF_BYTECODE, accountFactoryAbi } from 'src/constant/abis/accountFactory'
import { entryPointAbi } from 'src/constant/abis/entryPointAbi'
import { client } from 'src/services/client'
import { getJsonRpcProvider } from 'src/constant/chain'

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
  sender: string,
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
  // feeToken?: string,
  password?: string
) => {
  // const paymasterMiddleware = Presets.Middleware.verifyingPaymaster(paymasterUrl, {
  //   type: 'payg',
  //   token: feeToken
  // })
  const bundler = getJsonRpcProvider()
  const privateKey = String(process.env.NEXT_PUBLIC_ACCOUNTIFY_KEY)
  const defaultAbi = AbiCoder.defaultAbiCoder()
  const wallet = new Wallet(privateKey)
  const signer = wallet.connect(bundler)

  const entryPoint = new Contract(EP_ADDRESS, entryPointAbi, signer)
  const AccountFactory = new ContractFactory(accountFactoryAbi, AF_BYTECODE, bundler)
  const Account = new ContractFactory(accountAbi, accountByteCode, bundler)

  // Calculate address from the entry point

  let initCode =
    AF_ADDRESS +
    AccountFactory.interface.encodeFunctionData('createAccount', [publicKey, ECDSASM_ADDRESS, EP_ADDRESS]).slice(2)

  // try {
  //   await entryPoint.getSenderAddress(initCode)
  // } catch (ex: any) {
  //   // Local
  //   // console.log(ex)
  //   // sender = '0x' + ex.data.data.slice(-40)

  //   // Testnet
  //   sender = '0x' + ex.data.slice(-40)

  //   // console.log(ex);
  // }
  // console.log({ sender })
  const code = await bundler.getCode(sender)
  if (code !== '0x') {
    initCode = '0x'
  } else {
    const rundler = getJsonRpcProvider()
    const privateKey: string = String(process.env.NEXT_PUBLIC_ACCOUNTIFY_KEY)
    const wallet = new Wallet(privateKey)
    const signer = wallet.connect(rundler)
    const walletFactory = new Contract(AF_ADDRESS, accountFactoryAbi, signer)
    const tx = await walletFactory.createAccount(publicKey, ECDSASM_ADDRESS, EP_ADDRESS)
    const rec = await tx.wait()
    console.log('create', rec)
    initCode = '0x'
  }

  const { userOp, userOpHash } = await fillUserOp(sender, Account, entryPoint, initCode, calls, logger, password)
  console.log({ userOp, userOpHash })

  if (logger == 'eoa') {
    // Sign the userOp
    const eoaProvider = new ethers.BrowserProvider(window.ethereum)
    userOp.signature = defaultAbi.encode(
      ['bytes', 'address'],
      [await (await eoaProvider.getSigner()).signMessage(ethers.getBytes(userOpHash)), ECDSASM_ADDRESS]
    )
  } else {
    // Sign the userOp
    await client
      .post('/account/sign-message', {
        email: logger,
        password: password,
        message: userOpHash.toString()
      })
      .then(response => {
        console.log({ response })
        userOp.signature = defaultAbi.encode(['bytes', 'address'], [response, ECDSASM_ADDRESS])
      })
      .catch(err => {
        console.log(err)
      })
  }

  console.log({ userOp, userOpHash })

  // const tx = await entryPoint.handleOps([userOp], publicKey)
  // const receipt = await tx.wait()
  // console.log(receipt)

  const opHash = await bundler.send('eth_sendUserOperation', [userOp, EP_ADDRESS])

  // const receipt = await ethers.bundler.waitForTransaction(opHash);
  // console.log("Transaction has been mined");
  // console.log(receipt);

  let transactionHash
  while (!transactionHash || transactionHash == null) {
    await bundler.send('eth_getUserOperationByHash', [opHash]).then(res => {
      if (res != null) {
        transactionHash = res.transactionHash
      }

      // console.log(res);
    })
  }
  console.log(transactionHash)

  // setTimeout(async () => {
  //   const { transactionHash } = await bundler.send('eth_getUserOperationByHash', [opHash])

  //   console.log(transactionHash)
  // }, 50000)

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
  ],
  logger: string,
  password?: string
) => {
  const bundler = getJsonRpcProvider()
  console.log(bundler)
  const defaultAbi = ethers.AbiCoder.defaultAbiCoder()

  const epAddress: string = EP_ADDRESS
  const pmAddress: string = PM_ADDRESS

  let receivers: string[] | string
  let amounts: bigint[] | bigint
  let datas: string[] | string
  let callData: string

  if (callDatas.length > 1) {
    receivers = []
    amounts = []
    datas = []
    callDatas.map(callData => {
      ;(receivers as string[]).push(callData.receiver)
      ;(amounts as bigint[]).push(callData.amount)
      ;(datas as string[]).push(callData.data)
    })
    callData = Account.interface.encodeFunctionData('executeBatch', [receivers, amounts, datas])
  } else {
    receivers = callDatas[0].receiver
    amounts = callDatas[0].amount
    datas = callDatas[0].data
    console.log('execute ', receivers, amounts, datas)
    callData = Account.interface.encodeFunctionData('execute', [receivers, amounts, datas])
  }

  console.log([receivers, amounts, datas])
  console.log({ callData })

  // Fill user operation
  const userOp: UserOp = {
    sender, // smart account address
    nonce: '0x' + (await entryPoint.getNonce(sender, 0)).toString(16),
    initCode,
    callData,
    callGasLimit: '0x0',
    verificationGasLimit: '0x0',
    preVerificationGas: '0x0',
    maxFeePerGas: '0x0',
    maxPriorityFeePerGas: '0x0',

    paymasterAndData: pmAddress,

    // paymasterAndData: '0x',
    signature: defaultAbi.encode(
      ['bytes', 'address'],
      [
        '0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c',
        ECDSASM_ADDRESS
      ]
    )
  }

  // const userOpHash = await entryPoint.getUserOpHash(userOp)

  // if (logger == 'eoa') {
  //   const eoaProvider = new ethers.BrowserProvider(window.ethereum)
  //   userOp.signature = defaultAbi.encode(
  //     ['bytes', 'address'],
  //     [
  //       '0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c',
  //       ECDSASM_ADDRESS
  //     ]
  //   )
  // } else {
  //   await client
  //     .post('/account/sign-message', {
  //       email: logger,
  //       password: password,
  //       message: userOpHash.toString()
  //     })
  //     .then(response => {
  //       console.log({ response })
  //       const signatureWithModuleAddress = defaultAbi.encode(['bytes', 'address'], [response, ECDSASM_ADDRESS])
  //       userOp.signature = signatureWithModuleAddress
  //     })
  //     .catch(err => {
  //       console.log(err)
  //     })
  // }

  console.log({ userOp })

  const { preVerificationGas, verificationGasLimit, callGasLimit } = await bundler.send(
    'eth_estimateUserOperationGas',
    [userOp, epAddress]
  )

  userOp.preVerificationGas = preVerificationGas
  userOp.verificationGasLimit = verificationGasLimit
  userOp.callGasLimit = callGasLimit

  // userOp.preVerificationGas = 900_000 * 10
  // userOp.verificationGasLimit = 900_000 * 10
  // userOp.callGasLimit = 900_000 * 10

  const { maxFeePerGas } = await bundler.getFeeData()
  userOp.maxFeePerGas = '0x' + maxFeePerGas?.toString(16)

  // userOp.maxFeePerGas = ethers.parseUnits('1000', 'gwei')

  const maxPriorityFeePerGas = await bundler.send('rundler_maxPriorityFeePerGas', [])
  userOp.maxPriorityFeePerGas = maxPriorityFeePerGas

  // userOp.maxPriorityFeePerGas = ethers.parseUnits('500', 'gwei')

  return { userOp: userOp, userOpHash: await entryPoint.getUserOpHash(userOp) }
}
