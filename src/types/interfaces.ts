export interface UserOp {
  sender?: string // smart account address
  nonce: string
  initCode: string
  callData: string
  callGasLimit?: number
  verificationGasLimit?: number
  preVerificationGas?: number
  maxFeePerGas?: bigint | null
  maxPriorityFeePerGas?: bigint
  paymasterAndData: string
  signature: string
}

export interface SessionDetail {
  _id: string
  account: string
  authorized: string
  validAfter: number
  validUntil: number
  sessionVerificationModule: string
  token: string
  limit: string
}

export enum AccountType {
  EOA,
  EMAIL
}
