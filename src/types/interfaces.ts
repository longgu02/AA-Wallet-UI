export interface UserOp {
  sender?: string // smart account address
  nonce: string
  initCode: string
  callData: string
  callGasLimit?: number | string
  verificationGasLimit?: number | string
  preVerificationGas?: number | string
  maxFeePerGas?: bigint | null | string
  maxPriorityFeePerGas?: bigint | string
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
  receiver: string
  token: string
  limit: string
}

export enum AccountType {
  EOA,
  EMAIL
}
