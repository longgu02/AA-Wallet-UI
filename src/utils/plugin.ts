/* eslint-disable @typescript-eslint/no-unused-vars */
import { Contract, ContractFactory, JsonRpcProvider, Wallet, ethers } from 'ethers'
import { UserOp } from 'src/types/interfaces'
import {
  AF_ADDRESS,
  ECDSASM_ADDRESS,
  EP_ADDRESS,
  FASTPLUGIN_ADDRESS,
  PM_ADDRESS,
  SP_ADDRESS,
  SUBPLUGIN_ADDRESS
} from 'src/constant/address'
import { pack } from '.'
import { accountAbi, accountByteCode } from 'src/constant/abis/accountAbi'
import { AF_BYTECODE, accountFactoryAbi } from 'src/constant/abis/accountFactory'
import { entryPointAbi } from 'src/constant/abis/entryPointAbi'
import { subscriptionPluginAbi, subscriptionPluginBytecode } from 'src/constant/abis/plugins/subscriptionPluginAbi'
import { getJsonRpcProvider } from 'src/constant/chain'
import { client } from 'src/services/client'
import { fillUserOp } from './userOp'
import { fastTransferBytecode, fastTransferPluginAbi } from 'src/constant/abis/plugins/fastTransferPluginAbi'

export const installPlugin = async (
  sender: string,
  publicKey: string,
  logger: string,
  password: string,
  pluginAddress: string,
  pluginAbi: any
) => {
  // const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY
  const defaultAbi = ethers.AbiCoder.defaultAbiCoder()

  const provider = getJsonRpcProvider()
  const privateKey = String(process.env.NEXT_PUBLIC_ACCOUNTIFY_KEY)
  const wallet = new Wallet(privateKey)
  const signer = wallet.connect(provider)

  const entryPoint = new Contract(EP_ADDRESS, entryPointAbi, signer)
  const Account = new ContractFactory(accountAbi, accountByteCode, provider)
  const AccountFactory = new ContractFactory(accountFactoryAbi, AF_BYTECODE, provider)

  let initCode =
    AF_ADDRESS +
    AccountFactory.interface.encodeFunctionData('createAccount', [publicKey, ECDSASM_ADDRESS, EP_ADDRESS]).slice(2)

  const code = await provider.getCode(sender)
  if (code !== '0x') {
    initCode = '0x'
  }

  // const bundler = new JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`)

  // Get addresses
  const dependencies = [pack(SP_ADDRESS, 1)]

  // const epAddress: string = EP_ADDRESS
  const pmAddress: string = PM_ADDRESS

  const pluginContract = new Contract(pluginAddress, pluginAbi, provider)

  const manifest = await pluginContract.pluginManifest()
  const types = [
    'bytes4[]', // interfaceIds
    'bytes4[]', // dependencyInterfaceIds
    'bytes4[]', // executionFunctions
    'bytes4[]', // permittedExecutionSelectors
    'bool', // permitAnyExternalAddress
    'bool', // canSpendNativeToken
    'tuple(address,bool,bytes4[])[]', // permittedExternalCalls
    'tuple(bytes4,tuple(uint8,uint8,uint256))[]', // userOpValidationFunctions
    'tuple(bytes4,tuple(uint8,uint8,uint256))[]', // runtimeValidationFunctions
    'tuple(bytes4,tuple(uint8,uint8,uint256))[]', // preUserOpValidationHooks
    'tuple(bytes4,tuple(uint8,uint8,uint256))[]', // preRuntimeValidationHooks
    'tuple(bytes4,tuple(uint8,uint8,uint256),tuple(uint8,uint8,uint256))[]' // executionHooks
  ]
  const encoded = defaultAbi.encode(types, manifest)
  const manifestHash = ethers.keccak256(
    '0x0000000000000000000000000000000000000000000000000000000000000020' + encoded.slice(2)
  )

  console.log([pluginAddress, manifestHash, '0x', dependencies])

  // Fill user operation
  const userOp: UserOp = {
    sender, // smart account address
    nonce: '0x' + (await entryPoint.getNonce(sender, 0)).toString(16),
    initCode,
    callData: Account.interface.encodeFunctionData('installPlugin', [pluginAddress, manifestHash, '0x', dependencies]),
    callGasLimit: '0x0',
    verificationGasLimit: '0x0',
    preVerificationGas: '0x0',
    maxFeePerGas: '0x0',
    maxPriorityFeePerGas: '0x0',
    paymasterAndData: pmAddress,
    signature: defaultAbi.encode(
      ['bytes', 'address'],
      [
        '0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c',
        ECDSASM_ADDRESS
      ]
    )
  }

  const { preVerificationGas, verificationGasLimit, callGasLimit } = await provider.send(
    'eth_estimateUserOperationGas',
    [userOp, EP_ADDRESS]
  )

  userOp.preVerificationGas = preVerificationGas
  userOp.verificationGasLimit = verificationGasLimit
  userOp.callGasLimit = callGasLimit

  // userOp.preVerificationGas = 900_000 * 4
  // userOp.verificationGasLimit = 900_000 * 4
  // userOp.callGasLimit = 900_000 * 4

  const { maxFeePerGas } = await provider.getFeeData()
  userOp.maxFeePerGas = '0x' + maxFeePerGas?.toString(16)

  // userOp.maxFeePerGas = ethers.parseUnits('100', 'gwei')

  const maxPriorityFeePerGas = await provider.send('rundler_maxPriorityFeePerGas', [])
  userOp.maxPriorityFeePerGas = maxPriorityFeePerGas

  // userOp.maxPriorityFeePerGas = ethers.parseUnits('50', 'gwei')
  // userOp.callData = Account.interface.encodeFunctionData('installPlugin', [
  //   pluginAddress,
  //   manifestHash,
  //   '0x',
  //   dependencies
  // ])
  const userOpHash = await entryPoint.getUserOpHash(userOp)

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

  const opHash = await provider.send('eth_sendUserOperation', [userOp, EP_ADDRESS])

  // const receipt = await ethers.provider.waitForTransaction(opHash);
  // console.log("Transaction has been mined");
  // console.log(receipt);

  let transactionHash
  while (!transactionHash || transactionHash == null) {
    await provider.send('eth_getUserOperationByHash', [opHash]).then(res => {
      if (res != null) {
        transactionHash = res.transactionHash
      }

      // console.log(res);
    })
  }
  console.log(transactionHash)

  return transactionHash
}

export const subscribeService = async (
  subscriber: string,
  serviceAddress: string,
  amount: string,
  logger: string,
  password: string,
  publicKey: string
) => {
  const defaultAbi = ethers.AbiCoder.defaultAbiCoder()

  const provider = getJsonRpcProvider()
  const privateKey = String(process.env.NEXT_PUBLIC_ACCOUNTIFY_KEY)
  const wallet = new Wallet(privateKey)
  const signer = wallet.connect(provider)

  const entryPoint = new Contract(EP_ADDRESS, entryPointAbi, signer)
  const Account = new ContractFactory(accountAbi, accountByteCode)

  // const bundler = new JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`)

  // Get addresses

  // const epAddress: string = EP_ADDRESS
  const pmAddress: string = PM_ADDRESS

  const SubscriptionPlugin = new ContractFactory(subscriptionPluginAbi, subscriptionPluginBytecode)

  // Fill user operation
  // const userOp: UserOp = {
  //   sender: subscriber, // smart account address
  //   nonce: '0x' + (await entryPoint.getNonce(subscriber, 0)).toString(16),
  //   initCode: '0x',
  //   callData: Account.interface.encodeFunctionData('execute', [
  //     SUBPLUGIN_ADDRESS,
  //     ethers.parseEther('0'),
  //     SubscriptionPlugin.interface.encodeFunctionData('subscribe', [serviceAddress, amount])
  //   ]),
  //   callGasLimit: '0x0',
  //   verificationGasLimit: '0x0',
  //   preVerificationGas: '0x0',
  //   maxFeePerGas: '0x0',
  //   maxPriorityFeePerGas: '0x0',
  //   paymasterAndData: pmAddress,
  //   signature: defaultAbi.encode(
  //     ['bytes', 'address'],
  //     [
  //       '0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c',
  //       ECDSASM_ADDRESS
  //     ]
  //   )
  // }

  // const { preVerificationGas, verificationGasLimit, callGasLimit } = await provider.send(
  //   'eth_estimateUserOperationGas',
  //   [userOp, EP_ADDRESS]
  // )

  // userOp.preVerificationGas = preVerificationGas
  // userOp.verificationGasLimit = verificationGasLimit
  // userOp.callGasLimit = callGasLimit

  // // userOp.preVerificationGas = 900_000 * 4
  // // userOp.verificationGasLimit = 900_000 * 4
  // // userOp.callGasLimit = 900_000 * 4
  // console.log(1)

  // const { maxFeePerGas } = await provider.getFeeData()
  // userOp.maxFeePerGas = '0x' + maxFeePerGas?.toString(16)
  // console.log(2)

  // // userOp.maxFeePerGas = ethers.parseUnits('100', 'gwei')

  // const maxPriorityFeePerGas = await provider.send('rundler_maxPriorityFeePerGas', [])
  // userOp.maxPriorityFeePerGas = maxPriorityFeePerGas
  // console.log(3)

  // userOp.maxPriorityFeePerGas = ethers.parseUnits('50', 'gwei')
  const { userOp, userOpHash } = await fillUserOp(
    subscriber,
    Account,
    entryPoint,
    '0x',
    [
      {
        receiver: SUBPLUGIN_ADDRESS,
        amount: ethers.parseEther('0'),
        data: SubscriptionPlugin.interface.encodeFunctionData('subscribe', [serviceAddress, amount])
      }
    ],
    logger
  )

  // const userOpHash = await entryPoint.getUserOpHash(userOp)

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

  const opHash = await provider.send('eth_sendUserOperation', [userOp, EP_ADDRESS])

  // const receipt = await ethers.provider.waitForTransaction(opHash);
  // console.log("Transaction has been mined");
  // console.log(receipt);

  let transactionHash
  while (!transactionHash || transactionHash == null) {
    await provider.send('eth_getUserOperationByHash', [opHash]).then(res => {
      if (res != null) {
        transactionHash = res.transactionHash
      }

      // console.log(res);
    })
  }
  console.log(transactionHash)

  return transactionHash
}

export const createFastSession = async (
  sender: string,
  startDate: number,
  logger: string,
  password: string,
  publicKey: string
) => {
  const defaultAbi = ethers.AbiCoder.defaultAbiCoder()

  const provider = getJsonRpcProvider()
  console.log(process.env.NEXT_PUBLIC_ACCOUNTIFY_KEY)
  const privateKey = String(process.env.NEXT_PUBLIC_ACCOUNTIFY_KEY)
  const wallet = new Wallet(privateKey)
  const signer = wallet.connect(provider)

  const entryPoint = new Contract(EP_ADDRESS, entryPointAbi, signer)
  const Account = new ContractFactory(accountAbi, accountByteCode)

  // const bundler = new JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`)

  // Get addresses

  // const epAddress: string = EP_ADDRESS
  const pmAddress: string = PM_ADDRESS

  const FastTransferPlugin = new ContractFactory(fastTransferPluginAbi, fastTransferBytecode)

  // Fill user operation
  // const userOp: UserOp = {
  //   sender: subscriber, // smart account address
  //   nonce: '0x' + (await entryPoint.getNonce(subscriber, 0)).toString(16),
  //   initCode: '0x',
  //   callData: Account.interface.encodeFunctionData('execute', [
  //     SUBPLUGIN_ADDRESS,
  //     ethers.parseEther('0'),
  //     SubscriptionPlugin.interface.encodeFunctionData('subscribe', [serviceAddress, amount])
  //   ]),
  //   callGasLimit: '0x0',
  //   verificationGasLimit: '0x0',
  //   preVerificationGas: '0x0',
  //   maxFeePerGas: '0x0',
  //   maxPriorityFeePerGas: '0x0',
  //   paymasterAndData: pmAddress,
  //   signature: defaultAbi.encode(
  //     ['bytes', 'address'],
  //     [
  //       '0xfffffffffffffffffffffffffffffff0000000000000000000000000000000007aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa1c',
  //       ECDSASM_ADDRESS
  //     ]
  //   )
  // }

  // const { preVerificationGas, verificationGasLimit, callGasLimit } = await provider.send(
  //   'eth_estimateUserOperationGas',
  //   [userOp, EP_ADDRESS]
  // )

  // userOp.preVerificationGas = preVerificationGas
  // userOp.verificationGasLimit = verificationGasLimit
  // userOp.callGasLimit = callGasLimit

  // // userOp.preVerificationGas = 900_000 * 4
  // // userOp.verificationGasLimit = 900_000 * 4
  // // userOp.callGasLimit = 900_000 * 4
  // console.log(1)

  // const { maxFeePerGas } = await provider.getFeeData()
  // userOp.maxFeePerGas = '0x' + maxFeePerGas?.toString(16)
  // console.log(2)

  // // userOp.maxFeePerGas = ethers.parseUnits('100', 'gwei')

  // const maxPriorityFeePerGas = await provider.send('rundler_maxPriorityFeePerGas', [])
  // userOp.maxPriorityFeePerGas = maxPriorityFeePerGas
  // console.log(3)

  // userOp.maxPriorityFeePerGas = ethers.parseUnits('50', 'gwei')

  const { userOp, userOpHash } = await fillUserOp(
    sender,
    Account,
    entryPoint,
    '0x',
    [
      {
        receiver: FASTPLUGIN_ADDRESS,
        amount: ethers.parseEther('0'),
        data: FastTransferPlugin.interface.encodeFunctionData('createSession', [startDate, 1, publicKey])
      }
    ],
    logger
  )

  // const userOpHash = await entryPoint.getUserOpHash(userOp)

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

  const opHash = await provider.send('eth_sendUserOperation', [userOp, EP_ADDRESS])

  // const receipt = await ethers.provider.waitForTransaction(opHash);
  // console.log("Transaction has been mined");
  // console.log(receipt);

  let transactionHash
  while (!transactionHash || transactionHash == null) {
    await provider.send('eth_getUserOperationByHash', [opHash]).then(res => {
      if (res != null) {
        transactionHash = res.transactionHash
      }

      // console.log(res);
    })
  }
  console.log(transactionHash)

  return transactionHash
}

export const fastTranfer = async (
  account: string,
  startDate: number,
  nonce: number,
  receiver: string,
  amount: string,
  publicKey: string
) => {
  const provider = getJsonRpcProvider()
  const privateKey = String(process.env.NEXT_PUBLIC_ACCOUNTIFY_KEY)
  const wallet = new Wallet(privateKey)
  const signer = wallet.connect(provider)
  const fastPluginContract = new Contract(FASTPLUGIN_ADDRESS, fastTransferPluginAbi, signer)
  const tx = await fastPluginContract.transfer(account, receiver, amount, startDate, nonce, publicKey)
  const receipt = tx.wait()

  return receipt
}
