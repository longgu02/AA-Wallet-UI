import { keccak256 } from 'ethereumjs-util'
import MerkleTree from 'merkletreejs'
import { Signer, ethers } from 'ethers'
import { UserOp } from 'src/types/interfaces'

const defaultAbiCoder = ethers.AbiCoder.defaultAbiCoder()

export const genMerkleTree = (
  sessionValidationModuleAddress: string,
  sessionData: { address: string; recipient: string; maxAmount: bigint }
) => {
  const data = ethers.concat([
    ethers.zeroPadValue('0x00', 6),
    ethers.zeroPadValue('0x00', 6),
    ethers.zeroPadValue(sessionValidationModuleAddress, 20),
    calculateNativeSessionKeyData(sessionData.address, sessionData.recipient, sessionData.maxAmount)
  ])

  console.log('hioho', [
    ethers.zeroPadValue('0x00', 6),
    ethers.zeroPadValue('0x00', 6),
    ethers.zeroPadValue(sessionValidationModuleAddress, 20),
    calculateNativeSessionKeyData(sessionData.address, sessionData.recipient, sessionData.maxAmount)
  ])

  const merkleTree = new MerkleTree([ethers.keccak256(data), ethers.keccak256(data)], keccak256, {
    sortPairs: false,
    hashLeaves: false
  })

  console.log({
    hehe: [
      ethers.zeroPadValue('0x00', 6),
      ethers.zeroPadValue('0x00', 6),
      ethers.zeroPadValue(sessionValidationModuleAddress, 20),
      calculateNativeSessionKeyData(sessionData.address, sessionData.recipient, sessionData.maxAmount)
    ],
    merkleTree,
    data
  })

  return { merkleTree, data }
}

export function calculateNativeSessionKeyData(sessionPublicKey: string, recipient: string, maxAmount: bigint) {
  return defaultAbiCoder.encode(['address', 'address', 'uint256'], [sessionPublicKey, recipient, maxAmount])
}

export const signNativeSessionUserOp = async (
  userOp: UserOp,
  userOpHash: string,
  sessionSigner: Signer,
  validationModuleAddress: string,
  receiverAddress: string,
  amount: bigint,
  merkleProof: [string],
  sessionManagerAddress: string
) => {
  const sessionKeySig = await sessionSigner.signMessage(ethers.getBytes(userOpHash))

  // validUntil, validAfter, sessionVerificationModule address, validationData, merkleProof, signature
  const paddedSig = defaultAbiCoder.encode(
    ['uint48', 'uint48', 'address', 'bytes', 'bytes32[]', 'bytes'],
    [
      0,
      0,
      validationModuleAddress,
      await calculateNativeSessionKeyData(await sessionSigner.getAddress(), receiverAddress, amount),
      merkleProof,
      sessionKeySig
    ]
  )

  const signatureWithModuleAddress = defaultAbiCoder.encode(['bytes', 'address'], [paddedSig, sessionManagerAddress])

  userOp.signature = signatureWithModuleAddress

  return userOp
}

// export const fillAndSignNativeSessionUserOp = async (
//   sender: string,
//   initCode: string,
//   callData: { receiver: string; amount: bigint; data: string },
//   sessionSigner: Signer,
//   validationModuleAddress: string,
//   sessionManagerAddress: string,
//   merkleProof: [string]
// ) => {
//   const privateKey = String(process.env.NEXT_PUBLIC_ACCOUNTIFY_KEY)
//   const bundler = new JsonRpcProvider('http://localhost:8545')

//   const wallet = new Wallet(privateKey)
//   const signer = wallet.connect(bundler)

//   const entryPoint = new Contract(EP_ADDRESS, entryPointAbi, signer)
//   const Account = new ContractFactory(accountAbi, accountByteCode, bundler)

//   const { userOp, userOpHash } = await fillUserOp(sender, Account, initCode, entryPoint, [callData])

//   return await signNativeSessionUserOp(
//     userOp,
//     userOpHash,
//     sessionSigner,
//     validationModuleAddress,
//     callData.receiver,
//     callData.amount,
//     merkleProof,
//     sessionManagerAddress
//   )
// }
