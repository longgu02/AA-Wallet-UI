export interface UserOp {
  sender?: string // smart account address
  nonce: string
  initCode: string
  callData: string
  callGasLimit?: number
  verificationGasLimit?: number
  preVerificationGas?: number
  maxFeePerGas?: bigint
  maxPriorityFeePerGas?: bigint
  paymasterAndData: string
  signature: string
}

export enum AccountType {
  EOA,
  EMAIL
}
