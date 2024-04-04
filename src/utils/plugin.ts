import { Contract, ContractFactory, JsonRpcProvider, Wallet, ethers } from 'ethers'
import { UserOp } from 'src/types/interfaces'
import {
  AF_ADDRESS,
  ECDSASM_ADDRESS,
  EP_ADDRESS,
  PM_ADDRESS,
  SP_ADDRESS,
  SUBPLUGIN_ADDRESS
} from 'src/constant/address'
import { pack } from '.'
import { accountAbi, accountByteCode } from 'src/constant/abis/accountAbi'
import { AF_BYTECODE, accountFactoryAbi } from 'src/constant/abis/accountFactory'
import { entryPointAbi } from 'src/constant/abis/entryPointAbi'
import { subscriptionPluginAbi, subscriptionPluginBytecode } from 'src/constant/abis/plugins/subscriptionPluginAbi'

export const installPlugin = async (sender: string, publicKey: string, pluginAddress: string, pluginAbi: any) => {
  // const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY
  const defaultAbi = ethers.AbiCoder.defaultAbiCoder()

  const provider = new JsonRpcProvider('http://localhost:8545')
  const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
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

  // Fill user operation
  const userOp: UserOp = {
    sender, // smart account address
    nonce: '0x' + (await entryPoint.getNonce(sender, 0)).toString(16),
    initCode,
    callData: Account.interface.encodeFunctionData('installPlugin', [pluginAddress, manifestHash, '0x', dependencies]),
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
  const userOpHash = await entryPoint.getUserOpHash(userOp)

  userOp.signature = defaultAbi.encode(
    ['bytes', 'address'],
    [await signer.signMessage(ethers.getBytes(userOpHash)), ECDSASM_ADDRESS]
  )

  console.log({ userOp, userOpHash })

  const tx = await entryPoint.handleOps([userOp], publicKey)
  const receipt = await tx.wait()
  console.log(receipt)

  return receipt
}

export const subscribeService = async (
  subscriber: string,
  serviceAddress: string,
  amount: string,
  publicKey: string
) => {
  const defaultAbi = ethers.AbiCoder.defaultAbiCoder()

  const provider = new JsonRpcProvider('http://localhost:8545')
  const privateKey = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80'
  const wallet = new Wallet(privateKey)
  const signer = wallet.connect(provider)

  const entryPoint = new Contract(EP_ADDRESS, entryPointAbi, signer)
  const Account = new ContractFactory(accountAbi, accountByteCode, provider)

  // const bundler = new JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`)

  // Get addresses

  // const epAddress: string = EP_ADDRESS
  const pmAddress: string = PM_ADDRESS

  const SubscriptionPlugin = new ContractFactory(subscriptionPluginAbi, subscriptionPluginBytecode)

  // Fill user operation
  const userOp: UserOp = {
    sender: subscriber, // smart account address
    nonce: await entryPoint.getNonce(subscriber, 0),
    initCode: '0x',
    callData: Account.interface.encodeFunctionData('execute', [
      SUBPLUGIN_ADDRESS,
      ethers.parseEther('0'),
      SubscriptionPlugin.interface.encodeFunctionData('subscribe', [serviceAddress, ethers.parseEther(amount)])
    ]),
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
  const userOpHash = await entryPoint.getUserOpHash(userOp)

  userOp.signature = defaultAbi.encode(
    ['bytes', 'address'],
    [await signer.signMessage(ethers.getBytes(userOpHash)), ECDSASM_ADDRESS]
  )

  console.log({ userOp, userOpHash })

  const tx = await entryPoint.handleOps([userOp], publicKey)
  const receipt = await tx.wait()
  console.log(receipt)

  return receipt
}
