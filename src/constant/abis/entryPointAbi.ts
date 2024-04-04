export const entryPointAbi = [
  {
    inputs: [
      { internalType: 'uint256', name: 'preOpGas', type: 'uint256' },
      { internalType: 'uint256', name: 'paid', type: 'uint256' },
      { internalType: 'uint48', name: 'validAfter', type: 'uint48' },
      { internalType: 'uint48', name: 'validUntil', type: 'uint48' },
      { internalType: 'bool', name: 'targetSuccess', type: 'bool' },
      { internalType: 'bytes', name: 'targetResult', type: 'bytes' }
    ],
    name: 'ExecutionResult',
    type: 'error'
  },
  {
    inputs: [
      { internalType: 'uint256', name: 'opIndex', type: 'uint256' },
      { internalType: 'string', name: 'reason', type: 'string' }
    ],
    name: 'FailedOp',
    type: 'error'
  },
  {
    inputs: [{ internalType: 'address', name: 'sender', type: 'address' }],
    name: 'SenderAddressResult',
    type: 'error'
  },
  {
    inputs: [{ internalType: 'address', name: 'aggregator', type: 'address' }],
    name: 'SignatureValidationFailed',
    type: 'error'
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'preOpGas', type: 'uint256' },
          { internalType: 'uint256', name: 'prefund', type: 'uint256' },
          { internalType: 'bool', name: 'sigFailed', type: 'bool' },
          { internalType: 'uint48', name: 'validAfter', type: 'uint48' },
          { internalType: 'uint48', name: 'validUntil', type: 'uint48' },
          { internalType: 'bytes', name: 'paymasterContext', type: 'bytes' }
        ],
        internalType: 'struct IEntryPoint.ReturnInfo',
        name: 'returnInfo',
        type: 'tuple'
      },
      {
        components: [
          { internalType: 'uint256', name: 'stake', type: 'uint256' },
          { internalType: 'uint256', name: 'unstakeDelaySec', type: 'uint256' }
        ],
        internalType: 'struct IStakeManager.StakeInfo',
        name: 'senderInfo',
        type: 'tuple'
      },
      {
        components: [
          { internalType: 'uint256', name: 'stake', type: 'uint256' },
          { internalType: 'uint256', name: 'unstakeDelaySec', type: 'uint256' }
        ],
        internalType: 'struct IStakeManager.StakeInfo',
        name: 'factoryInfo',
        type: 'tuple'
      },
      {
        components: [
          { internalType: 'uint256', name: 'stake', type: 'uint256' },
          { internalType: 'uint256', name: 'unstakeDelaySec', type: 'uint256' }
        ],
        internalType: 'struct IStakeManager.StakeInfo',
        name: 'paymasterInfo',
        type: 'tuple'
      }
    ],
    name: 'ValidationResult',
    type: 'error'
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'uint256', name: 'preOpGas', type: 'uint256' },
          { internalType: 'uint256', name: 'prefund', type: 'uint256' },
          { internalType: 'bool', name: 'sigFailed', type: 'bool' },
          { internalType: 'uint48', name: 'validAfter', type: 'uint48' },
          { internalType: 'uint48', name: 'validUntil', type: 'uint48' },
          { internalType: 'bytes', name: 'paymasterContext', type: 'bytes' }
        ],
        internalType: 'struct IEntryPoint.ReturnInfo',
        name: 'returnInfo',
        type: 'tuple'
      },
      {
        components: [
          { internalType: 'uint256', name: 'stake', type: 'uint256' },
          { internalType: 'uint256', name: 'unstakeDelaySec', type: 'uint256' }
        ],
        internalType: 'struct IStakeManager.StakeInfo',
        name: 'senderInfo',
        type: 'tuple'
      },
      {
        components: [
          { internalType: 'uint256', name: 'stake', type: 'uint256' },
          { internalType: 'uint256', name: 'unstakeDelaySec', type: 'uint256' }
        ],
        internalType: 'struct IStakeManager.StakeInfo',
        name: 'factoryInfo',
        type: 'tuple'
      },
      {
        components: [
          { internalType: 'uint256', name: 'stake', type: 'uint256' },
          { internalType: 'uint256', name: 'unstakeDelaySec', type: 'uint256' }
        ],
        internalType: 'struct IStakeManager.StakeInfo',
        name: 'paymasterInfo',
        type: 'tuple'
      },
      {
        components: [
          { internalType: 'address', name: 'aggregator', type: 'address' },
          {
            components: [
              { internalType: 'uint256', name: 'stake', type: 'uint256' },
              { internalType: 'uint256', name: 'unstakeDelaySec', type: 'uint256' }
            ],
            internalType: 'struct IStakeManager.StakeInfo',
            name: 'stakeInfo',
            type: 'tuple'
          }
        ],
        internalType: 'struct IEntryPoint.AggregatorStakeInfo',
        name: 'aggregatorInfo',
        type: 'tuple'
      }
    ],
    name: 'ValidationResultWithAggregation',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'userOpHash', type: 'bytes32' },
      { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
      { indexed: false, internalType: 'address', name: 'factory', type: 'address' },
      { indexed: false, internalType: 'address', name: 'paymaster', type: 'address' }
    ],
    name: 'AccountDeployed',
    type: 'event'
  },
  { anonymous: false, inputs: [], name: 'BeforeExecution', type: 'event' },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'account', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'totalDeposit', type: 'uint256' }
    ],
    name: 'Deposited',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [{ indexed: true, internalType: 'address', name: 'aggregator', type: 'address' }],
    name: 'SignatureAggregatorChanged',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'account', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'totalStaked', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'unstakeDelaySec', type: 'uint256' }
    ],
    name: 'StakeLocked',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'account', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'withdrawTime', type: 'uint256' }
    ],
    name: 'StakeUnlocked',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'account', type: 'address' },
      { indexed: false, internalType: 'address', name: 'withdrawAddress', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'StakeWithdrawn',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'userOpHash', type: 'bytes32' },
      { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
      { indexed: true, internalType: 'address', name: 'paymaster', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'nonce', type: 'uint256' },
      { indexed: false, internalType: 'bool', name: 'success', type: 'bool' },
      { indexed: false, internalType: 'uint256', name: 'actualGasCost', type: 'uint256' },
      { indexed: false, internalType: 'uint256', name: 'actualGasUsed', type: 'uint256' }
    ],
    name: 'UserOperationEvent',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'bytes32', name: 'userOpHash', type: 'bytes32' },
      { indexed: true, internalType: 'address', name: 'sender', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'nonce', type: 'uint256' },
      { indexed: false, internalType: 'bytes', name: 'revertReason', type: 'bytes' }
    ],
    name: 'UserOperationRevertReason',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      { indexed: true, internalType: 'address', name: 'account', type: 'address' },
      { indexed: false, internalType: 'address', name: 'withdrawAddress', type: 'address' },
      { indexed: false, internalType: 'uint256', name: 'amount', type: 'uint256' }
    ],
    name: 'Withdrawn',
    type: 'event'
  },
  {
    inputs: [],
    name: 'SIG_VALIDATION_FAILED',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'bytes', name: 'initCode', type: 'bytes' },
      { internalType: 'address', name: 'sender', type: 'address' },
      { internalType: 'bytes', name: 'paymasterAndData', type: 'bytes' }
    ],
    name: '_validateSenderAndPaymaster',
    outputs: [],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint32', name: 'unstakeDelaySec', type: 'uint32' }],
    name: 'addStake',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'depositTo',
    outputs: [],
    stateMutability: 'payable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'deposits',
    outputs: [
      { internalType: 'uint112', name: 'deposit', type: 'uint112' },
      { internalType: 'bool', name: 'staked', type: 'bool' },
      { internalType: 'uint112', name: 'stake', type: 'uint112' },
      { internalType: 'uint32', name: 'unstakeDelaySec', type: 'uint32' },
      { internalType: 'uint48', name: 'withdrawTime', type: 'uint48' }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: 'account', type: 'address' }],
    name: 'getDepositInfo',
    outputs: [
      {
        components: [
          { internalType: 'uint112', name: 'deposit', type: 'uint112' },
          { internalType: 'bool', name: 'staked', type: 'bool' },
          { internalType: 'uint112', name: 'stake', type: 'uint112' },
          { internalType: 'uint32', name: 'unstakeDelaySec', type: 'uint32' },
          { internalType: 'uint48', name: 'withdrawTime', type: 'uint48' }
        ],
        internalType: 'struct IStakeManager.DepositInfo',
        name: 'info',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: 'sender', type: 'address' },
      { internalType: 'uint192', name: 'key', type: 'uint192' }
    ],
    name: 'getNonce',
    outputs: [{ internalType: 'uint256', name: 'nonce', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'bytes', name: 'initCode', type: 'bytes' }],
    name: 'getSenderAddress',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'sender', type: 'address' },
          { internalType: 'uint256', name: 'nonce', type: 'uint256' },
          { internalType: 'bytes', name: 'initCode', type: 'bytes' },
          { internalType: 'bytes', name: 'callData', type: 'bytes' },
          { internalType: 'uint256', name: 'callGasLimit', type: 'uint256' },
          { internalType: 'uint256', name: 'verificationGasLimit', type: 'uint256' },
          { internalType: 'uint256', name: 'preVerificationGas', type: 'uint256' },
          { internalType: 'uint256', name: 'maxFeePerGas', type: 'uint256' },
          { internalType: 'uint256', name: 'maxPriorityFeePerGas', type: 'uint256' },
          { internalType: 'bytes', name: 'paymasterAndData', type: 'bytes' },
          { internalType: 'bytes', name: 'signature', type: 'bytes' }
        ],
        internalType: 'struct UserOperation',
        name: 'userOp',
        type: 'tuple'
      }
    ],
    name: 'getUserOpHash',
    outputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              { internalType: 'address', name: 'sender', type: 'address' },
              { internalType: 'uint256', name: 'nonce', type: 'uint256' },
              { internalType: 'bytes', name: 'initCode', type: 'bytes' },
              { internalType: 'bytes', name: 'callData', type: 'bytes' },
              { internalType: 'uint256', name: 'callGasLimit', type: 'uint256' },
              { internalType: 'uint256', name: 'verificationGasLimit', type: 'uint256' },
              { internalType: 'uint256', name: 'preVerificationGas', type: 'uint256' },
              { internalType: 'uint256', name: 'maxFeePerGas', type: 'uint256' },
              { internalType: 'uint256', name: 'maxPriorityFeePerGas', type: 'uint256' },
              { internalType: 'bytes', name: 'paymasterAndData', type: 'bytes' },
              { internalType: 'bytes', name: 'signature', type: 'bytes' }
            ],
            internalType: 'struct UserOperation[]',
            name: 'userOps',
            type: 'tuple[]'
          },
          { internalType: 'contract IAggregator', name: 'aggregator', type: 'address' },
          { internalType: 'bytes', name: 'signature', type: 'bytes' }
        ],
        internalType: 'struct IEntryPoint.UserOpsPerAggregator[]',
        name: 'opsPerAggregator',
        type: 'tuple[]'
      },
      { internalType: 'address payable', name: 'beneficiary', type: 'address' }
    ],
    name: 'handleAggregatedOps',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'sender', type: 'address' },
          { internalType: 'uint256', name: 'nonce', type: 'uint256' },
          { internalType: 'bytes', name: 'initCode', type: 'bytes' },
          { internalType: 'bytes', name: 'callData', type: 'bytes' },
          { internalType: 'uint256', name: 'callGasLimit', type: 'uint256' },
          { internalType: 'uint256', name: 'verificationGasLimit', type: 'uint256' },
          { internalType: 'uint256', name: 'preVerificationGas', type: 'uint256' },
          { internalType: 'uint256', name: 'maxFeePerGas', type: 'uint256' },
          { internalType: 'uint256', name: 'maxPriorityFeePerGas', type: 'uint256' },
          { internalType: 'bytes', name: 'paymasterAndData', type: 'bytes' },
          { internalType: 'bytes', name: 'signature', type: 'bytes' }
        ],
        internalType: 'struct UserOperation[]',
        name: 'ops',
        type: 'tuple[]'
      },
      { internalType: 'address payable', name: 'beneficiary', type: 'address' }
    ],
    name: 'handleOps',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'uint192', name: 'key', type: 'uint192' }],
    name: 'incrementNonce',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'bytes', name: 'callData', type: 'bytes' },
      {
        components: [
          {
            components: [
              { internalType: 'address', name: 'sender', type: 'address' },
              { internalType: 'uint256', name: 'nonce', type: 'uint256' },
              { internalType: 'uint256', name: 'callGasLimit', type: 'uint256' },
              { internalType: 'uint256', name: 'verificationGasLimit', type: 'uint256' },
              { internalType: 'uint256', name: 'preVerificationGas', type: 'uint256' },
              { internalType: 'address', name: 'paymaster', type: 'address' },
              { internalType: 'uint256', name: 'maxFeePerGas', type: 'uint256' },
              { internalType: 'uint256', name: 'maxPriorityFeePerGas', type: 'uint256' }
            ],
            internalType: 'struct EntryPoint.MemoryUserOp',
            name: 'mUserOp',
            type: 'tuple'
          },
          { internalType: 'bytes32', name: 'userOpHash', type: 'bytes32' },
          { internalType: 'uint256', name: 'prefund', type: 'uint256' },
          { internalType: 'uint256', name: 'contextOffset', type: 'uint256' },
          { internalType: 'uint256', name: 'preOpGas', type: 'uint256' }
        ],
        internalType: 'struct EntryPoint.UserOpInfo',
        name: 'opInfo',
        type: 'tuple'
      },
      { internalType: 'bytes', name: 'context', type: 'bytes' }
    ],
    name: 'innerHandleOp',
    outputs: [{ internalType: 'uint256', name: 'actualGasCost', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address', name: '', type: 'address' },
      { internalType: 'uint192', name: '', type: 'uint192' }
    ],
    name: 'nonceSequenceNumber',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'sender', type: 'address' },
          { internalType: 'uint256', name: 'nonce', type: 'uint256' },
          { internalType: 'bytes', name: 'initCode', type: 'bytes' },
          { internalType: 'bytes', name: 'callData', type: 'bytes' },
          { internalType: 'uint256', name: 'callGasLimit', type: 'uint256' },
          { internalType: 'uint256', name: 'verificationGasLimit', type: 'uint256' },
          { internalType: 'uint256', name: 'preVerificationGas', type: 'uint256' },
          { internalType: 'uint256', name: 'maxFeePerGas', type: 'uint256' },
          { internalType: 'uint256', name: 'maxPriorityFeePerGas', type: 'uint256' },
          { internalType: 'bytes', name: 'paymasterAndData', type: 'bytes' },
          { internalType: 'bytes', name: 'signature', type: 'bytes' }
        ],
        internalType: 'struct UserOperation',
        name: 'op',
        type: 'tuple'
      },
      { internalType: 'address', name: 'target', type: 'address' },
      { internalType: 'bytes', name: 'targetCallData', type: 'bytes' }
    ],
    name: 'simulateHandleOp',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          { internalType: 'address', name: 'sender', type: 'address' },
          { internalType: 'uint256', name: 'nonce', type: 'uint256' },
          { internalType: 'bytes', name: 'initCode', type: 'bytes' },
          { internalType: 'bytes', name: 'callData', type: 'bytes' },
          { internalType: 'uint256', name: 'callGasLimit', type: 'uint256' },
          { internalType: 'uint256', name: 'verificationGasLimit', type: 'uint256' },
          { internalType: 'uint256', name: 'preVerificationGas', type: 'uint256' },
          { internalType: 'uint256', name: 'maxFeePerGas', type: 'uint256' },
          { internalType: 'uint256', name: 'maxPriorityFeePerGas', type: 'uint256' },
          { internalType: 'bytes', name: 'paymasterAndData', type: 'bytes' },
          { internalType: 'bytes', name: 'signature', type: 'bytes' }
        ],
        internalType: 'struct UserOperation',
        name: 'userOp',
        type: 'tuple'
      }
    ],
    name: 'simulateValidation',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { inputs: [], name: 'unlockStake', outputs: [], stateMutability: 'nonpayable', type: 'function' },
  {
    inputs: [{ internalType: 'address payable', name: 'withdrawAddress', type: 'address' }],
    name: 'withdrawStake',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      { internalType: 'address payable', name: 'withdrawAddress', type: 'address' },
      { internalType: 'uint256', name: 'withdrawAmount', type: 'uint256' }
    ],
    name: 'withdrawTo',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  { stateMutability: 'payable', type: 'receive' }
]

export const entryPointBytecode =
  '0x60a08060405234620000895760016002556101ba8181016001600160401b0381118382101762000073578291620048ff833903906000f08015620000675760805260405161487090816200008f8239608051818181610f7d015281816143aa015261461b0152f35b6040513d6000823e3d90fd5b634e487b7160e01b600052604160045260246000fd5b600080fdfe60806040526004361015610023575b361561001957600080fd5b610021612403565b005b60003560e01c80630396cb60146101635780630bd28e3b1461015e5780631b2e01b8146101595780631d732756146101545780631fad948c1461014f578063205c28781461014a57806335567e1a146101455780634b1d7cf5146101405780635287ce121461013b57806370a08231146101365780638f41ec5a14610131578063957122ab1461012c5780639b249f6914610127578063a619353114610122578063b760faf91461011d578063bb9fe6bf14610118578063c23a5cea14610113578063d6383f941461010e578063ee219423146101095763fc7e286d0361000e576115fb565b611424565b6112e8565b6111b1565b611091565b611071565b611051565b610f1b565b610db5565b610d99565b610d47565b610c31565b610920565b6108af565b610790565b6106b7565b61053f565b61036a565b6102d6565b60203660031901126102bb5760043563ffffffff81168082036102bb576102b67fa5ae833d0bb1dcd632d98a8b70973e8516812898e19bf27b70071ebc8dc52c01916101f56101c5336001600160a01b03166000526000602052604060002090565b916101d181151561167f565b6101ee6101e5600185015463ffffffff1690565b63ffffffff1690565b11156116ca565b54926102986001600160701b039461026361021534888460781c1661172b565b9661022188151561173d565b61022d81891115611788565b61024a81610239610471565b941684906001600160701b03169052565b6001602084015287166001600160701b03166040830152565b63ffffffff8316606082015260006080820152610293336001600160a01b03166000526000602052604060002090565b6117d3565b6040805194855263ffffffff90911660208501523393918291820190565b0390a2005b600080fd5b602435906001600160c01b03821682036102bb57565b346102bb5760203660031901126102bb576004356001600160c01b03811681036102bb57610324903360005260016020526040600020906001600160c01b0316600052602052604060002090565b61032e81546118d1565b9055005b6001600160a01b038116036102bb57565b6024359061035082610332565b565b60c4359061035082610332565b359061035082610332565b346102bb5760403660031901126102bb5760206103c260043561038c81610332565b6001600160a01b0361039c6102c0565b9116600052600183526040600020906001600160c01b0316600052602052604060002090565b54604051908152f35b634e487b7160e01b600052604160045260246000fd5b60a0810190811067ffffffffffffffff8211176103fd57604052565b6103cb565b610100810190811067ffffffffffffffff8211176103fd57604052565b67ffffffffffffffff81116103fd57604052565b6060810190811067ffffffffffffffff8211176103fd57604052565b90601f8019910116810190811067ffffffffffffffff8211176103fd57604052565b60405190610350826103e1565b6040519060c0820182811067ffffffffffffffff8211176103fd57604052565b604051906040820182811067ffffffffffffffff8211176103fd57604052565b67ffffffffffffffff81116103fd57601f01601f191660200190565b9291926104e6826104be565b916104f4604051938461044f565b8294818452818301116102bb578281602093846000960137010152565b9181601f840112156102bb5782359167ffffffffffffffff83116102bb57602083818601950101116102bb57565b346102bb576101c03660031901126102bb5767ffffffffffffffff6004358181116102bb57366023820112156102bb576105839036906024816004013591016104da565b90366023190161018081126102bb57610100604051916105a2836103e1565b126102bb576040516105b381610402565b6105bb610343565b815260443560208201526064356040820152608435606082015260a43560808201526105e5610352565b60a082015260e43560c08201526101043560e082015281526101243560208201526101443560408201526101643560608201526101843560808201526101a4359182116102bb5761065992610641610649933690600401610511565b9290916119a2565b6040519081529081906020820190565b0390f35b9060406003198301126102bb5760043567ffffffffffffffff928382116102bb57806023830112156102bb5781600401359384116102bb5760248460051b830101116102bb5760240191906024356106b481610332565b90565b346102bb576106c53661065d565b6106d0929192612bc6565b6106d983611b38565b60005b84811061075957506000927fbb47ee3e183a558b1a2ff0874b079f3fc5478b7454eacf2bfc5af2ff5878f9728480a183915b8583106107295761071f8585613468565b6100216001600255565b90919360019061074f61073d878987611bb7565b6107478886611b9e565b519088613360565b019401919061070e565b8061078761078061076e600194869896611b9e565b5161077a848a88611bb7565b84612e13565b9083612fc0565b019290926106dc565b346102bb5760403660031901126102bb576004356107ad81610332565b6024359060009133835282602052604083206001600160701b038154169283831161086b5784836001600160a01b0382959361081b84966108016107f587986108689c611bda565b6001600160701b031690565b6001600160701b03166001600160701b0319825416179055565b604080516001600160a01b03831681526020810185905233917fd1c19fbcd4551a5edfb66d43d2e337c04837afda3482b42bdf569a8fccdae5fb91a2165af1610862611be7565b50611c17565b80f35b606460405162461bcd60e51b815260206004820152601960248201527f576974686472617720616d6f756e7420746f6f206c61726765000000000000006044820152fd5b346102bb5760403660031901126102bb5760206004356108ce81610332565b6001600160a01b036108de6102c0565b911660005260018252610908816040600020906001600160c01b0316600052602052604060002090565b546040805192901b67ffffffffffffffff1916178152f35b346102bb5761092e3661065d565b610936612bc6565b6000805b838210610af35761094b9150611b38565b7fbb47ee3e183a558b1a2ff0874b079f3fc5478b7454eacf2bfc5af2ff5878f972600080a16000805b848110610a6b57505060008093815b8181106109ba5761071f868660007f575ff3acadd5ab348fe1855e217e0f3678f8d767d7494c9f9fefbee2e17cca4d8180a2613468565b610a116109c882848a611c62565b6109e66109da6109da60208401611cba565b6001600160a01b031690565b7f575ff3acadd5ab348fe1855e217e0f3678f8d767d7494c9f9fefbee2e17cca4d600080a280611c84565b906000915b808310610a2857505050600101610983565b90919497610a62610a5c600192610a568c8b610a4f82610a498e8b8d611bb7565b92611b9e565b5191613360565b9061172b565b996118d1565b95019190610a16565b610a76818688611c62565b6020610a8e610a858380611c84565b92909301611cba565b916001600160a01b0360009316905b828410610ab05750505050600101610974565b90919294610ae981610ae485610add610acb6001968d611b9e565b51610ad78c8b8a611bb7565b85612e13565b908b613167565b6118d1565b9501929190610a9d565b610afe828587611c62565b90610b098280611c84565b92610b196109da60208301611cba565b916001600160a01b038316610b316001821415611cc4565b610b4d575b505050600191610b459161172b565b91019061093a565b909592610b666040999693999895989788810190611d0f565b92908a3b156102bb5789938b918a5193849283927fe3563a4f00000000000000000000000000000000000000000000000000000000845260049e8f850193610bad94611e6f565b03815a93600094fa9081610c18575b50610c035786517f86a9f7500000000000000000000000000000000000000000000000000000000081526001600160a01b038a16818a0190815281906020010390fd5b0390fd5b9497509295509093509181610b456001610b36565b80610c25610c2b9261041f565b80610d8e565b38610bbc565b346102bb5760203660031901126102bb576106596001600160a01b03600435610c5981610332565b608060409283928351610c6b816103e1565b600093818580935282602082015282878201528260608201520152168152806020522090610cf365ffffffffffff6001835194610ca7866103e1565b80546001600160701b038082168852607082901c60ff161515602089015260789190911c1685870152015463ffffffff8116606086015260201c16608084019065ffffffffffff169052565b5191829182919091608065ffffffffffff8160a08401956001600160701b03808251168652602082015115156020870152604082015116604086015263ffffffff6060820151166060860152015116910152565b346102bb5760203660031901126102bb576001600160a01b03600435610d6c81610332565b16600052600060205260206001600160701b0360406000205416604051908152f35b60009103126102bb57565b346102bb5760003660031901126102bb57602060405160018152f35b346102bb5760603660031901126102bb57600467ffffffffffffffff81358181116102bb57610de79036908401610511565b905060243591610df683610332565b6044359081116102bb57610e0d9036908501610511565b929091159081610f11575b50610ec4576014821015610e4e575b610bff8360405191829162461bcd60e51b8352820160409060208152600060208201520190565b610e5e610e6a92610e6492611f04565b90611f12565b60601c90565b3b15610e77573880610e27565b610bff9060405191829162461bcd60e51b8352820160609060208152601b60208201527f41413330207061796d6173746572206e6f74206465706c6f796564000000000060408201520190565b610bff8360405191829162461bcd60e51b8352820160609060208152601960208201527f41413230206163636f756e74206e6f74206465706c6f7965640000000000000060408201520190565b90503b1538610e18565b346102bb5760203660031901126102bb5760043567ffffffffffffffff81116102bb576020610f51610f76923690600401610511565b6001600160a01b0392916040519485928392632b870d1b60e11b845260048401611f58565b03816000857f0000000000000000000000000000000000000000000000000000000000000000165af190811561101257602492600092610fe1575b50604051917f6ca7b806000000000000000000000000000000000000000000000000000000008352166004820152fd5b61100491925060203d60201161100b575b610ffc818361044f565b810190611f43565b9038610fb1565b503d610ff2565b611ef8565b90816101609103126102bb5790565b60206003198201126102bb576004359067ffffffffffffffff82116102bb576106b491600401611017565b346102bb57602061106961106436611026565b611f69565b604051908152f35b60203660031901126102bb5761002160043561108c81610332565b612075565b346102bb576000806003193601126111ae573381528060205260408120600181019063ffffffff82541690811561116a576111176110f161112f936110e36110de855460ff9060701c1690565b6120cd565b65ffffffffffff4216612118565b845469ffffffffffff000000001916602082901b69ffffffffffff000000001617909455565b80546eff000000000000000000000000000019169055565b60405165ffffffffffff91909116815233907ffa9b3c14cc825c412c9ed81b3ba365a5b459439403f18829e572ed53a4180f0a90602090a280f35b606460405162461bcd60e51b815260206004820152600a60248201527f6e6f74207374616b6564000000000000000000000000000000000000000000006044820152fd5b80fd5b346102bb5760203660031901126102bb576004356111ce81610332565b6108686001600160a01b036111f6336001600160a01b03166000526000602052604060002090565b926112926112126107f586546001600160701b039060781c1690565b9461121e861515612132565b61126a6001820161125765ffffffffffff611243835465ffffffffffff9060201c1690565b1661124f81151561217d565b4210156121c8565b805469ffffffffffffffffffff19169055565b7fffffff0000000000000000000000000000ffffffffffffffffffffffffffffff8154169055565b604080516001600160a01b03831681526020810186905233917fb7c918e0e249f999e965cafeb6c664271b3f4317d296461500e71da39f0cbda391a2600080809581948294165af16112e2611be7565b50612213565b346102bb5760603660031901126102bb5767ffffffffffffffff6004358181116102bb5761131a903690600401611017565b6024359161132783610332565b6044359081116102bb57611342610bff913690600401610511565b61134a611ad5565b611353856135e4565b6113666113608287612c64565b906136e7565b946113768260009243845261324d565b9643825281936060956001600160a01b0383166113f0575b5050505060800151936113bd60406113af602084015165ffffffffffff1690565b92015165ffffffffffff1690565b906040519687967f8b7ac9800000000000000000000000000000000000000000000000000000000088526004880161226c565b8395508394965061140a604094929394518094819361225e565b03925af1906080611419611be7565b92919038808061138e565b346102bb5761143236611026565b61143a611ad5565b611443826135e4565b61144d8183612c64565b825160a0015191939161146d906001600160a01b031661378c565b61378c565b9061148461146885516001600160a01b0390511690565b9461148d6122a8565b5061149d60409485810190611d0f565b90601482106115ef57610e64610e5e6114b99361146893611f04565b916114c3916136e7565b80516001600160a01b0316906001600160a01b038216600181149160808801519787810151918860208201516114fe9065ffffffffffff1690565b91015165ffffffffffff1691606001519261151761047e565b9a8b5260208b0152841515898b015265ffffffffffff1660608a015265ffffffffffff16608089015260a0880152151590816115e6575b506115885750610bff92519485947fe0cff05f000000000000000000000000000000000000000000000000000000008652600486016123a9565b9190610bff936115978461378c565b6115b16115a261049e565b6001600160a01b039096168652565b6020850152519586957ffaecb4e400000000000000000000000000000000000000000000000000000000875260048701612324565b9050153861154e565b50506114b9600061378c565b346102bb5760203660031901126102bb576001600160a01b0360043561162081610332565b16600052600060205260a0604060002065ffffffffffff81549160016001600160701b039101549060405193818116855260ff8160701c161515602086015260781c16604084015263ffffffff8116606084015260201c166080820152f35b1561168657565b606460405162461bcd60e51b815260206004820152601a60248201527f6d757374207370656369667920756e7374616b652064656c61790000000000006044820152fd5b156116d157565b606460405162461bcd60e51b815260206004820152601c60248201527f63616e6e6f7420646563726561736520756e7374616b652074696d65000000006044820152fd5b634e487b7160e01b600052601160045260246000fd5b9190820180921161173857565b611715565b1561174457565b606460405162461bcd60e51b815260206004820152601260248201527f6e6f207374616b652073706563696669656400000000000000000000000000006044820152fd5b1561178f57565b606460405162461bcd60e51b815260206004820152600e60248201527f7374616b65206f766572666c6f770000000000000000000000000000000000006044820152fd5b9065ffffffffffff608060016103509461180d6001600160701b0386511682906001600160701b03166001600160701b0319825416179055565b602085015115156eff000000000000000000000000000082549160701b16806eff00000000000000000000000000001983161783557fffffff000000000000000000000000000000ffffffffffffffffffffffffffff7cffffffffffffffffffffffffffff000000000000000000000000000000604089015160781b16921617178155019263ffffffff60608201511663ffffffff1985541617845501511669ffffffffffff0000000082549160201b169069ffffffffffff000000001916179055565b60001981146117385760010190565b156118e757565b606460405162461bcd60e51b815260206004820152601760248201527f4141393220696e7465726e616c2063616c6c206f6e6c790000000000000000006044820152fd5b60005b83811061193e5750506000910152565b818101518382015260200161192e565b906020916119678151809281855285808601910161192b565b601f01601f1916010190565b9060406106b49260008152816020820152019061194e565b6040906106b493928152816020820152019061194e565b909291925a936119b33033146118e0565b8151946040860151955a611388606083015189010111611aac576106b49660009580516119fa575b505050906119f4915a90036080840151019436916104da565b91612598565b611a1c91611a1891611a1385516001600160a01b031690565b61240c565b1590565b611a28575b80806119db565b6119f492919450611a3761241e565b908151611a4b575b50506001939091611a21565b7f1c4fada7374c0a9ee8841fc38afe82932dc0f8e69012e927f061a8bae611a2016001600160a01b03602087015192611aa26020611a9083516001600160a01b031690565b9201519560405193849316968361198b565b0390a33880611a3f565b63deaddead60e01b60005260206000fd5b67ffffffffffffffff81116103fd5760051b60200190565b60405190611ae2826103e1565b604051608083611af183610402565b60009283815283602082015283604082015283606082015283838201528360a08201528360c08201528360e082015281528260208201528260408201528260608201520152565b90611b4282611abd565b611b4f604051918261044f565b8281528092611b60601f1991611abd565b019060005b828110611b7157505050565b602090611b7c611ad5565b82828501015201611b65565b634e487b7160e01b600052603260045260246000fd5b8051821015611bb25760209160051b010190565b611b88565b9190811015611bb25760051b8101359061015e19813603018212156102bb570190565b9190820391821161173857565b3d15611c12573d90611bf8826104be565b91611c06604051938461044f565b82523d6000602084013e565b606090565b15611c1e57565b606460405162461bcd60e51b815260206004820152601260248201527f6661696c656420746f20776974686472617700000000000000000000000000006044820152fd5b9190811015611bb25760051b81013590605e19813603018212156102bb570190565b903590601e19813603018212156102bb570180359067ffffffffffffffff82116102bb57602001918160051b360383136102bb57565b356106b481610332565b15611ccb57565b606460405162461bcd60e51b815260206004820152601760248201527f4141393620696e76616c69642061676772656761746f720000000000000000006044820152fd5b903590601e19813603018212156102bb570180359067ffffffffffffffff82116102bb576020019181360383136102bb57565b9035601e19823603018112156102bb57016020813591019167ffffffffffffffff82116102bb5781360383136102bb57565b908060209392818452848401376000828201840152601f01601f1916010190565b6106b491611e50611e01611de6610160611dbf85611db28861035f565b6001600160a01b03169052565b60208601356020860152611dd66040870187611d42565b9091806040880152860191611d74565b611df36060860186611d42565b908583036060870152611d74565b6080840135608084015260a084013560a084015260c084013560c084015260e084013560e08401526101008085013590840152610120611e4381860186611d42565b9185840390860152611d74565b91611e616101409182810190611d42565b929091818503910152611d74565b949391929083604087016040885252606086019360608160051b88010194826000906000915b848310611eb4575050505050508460206106b495968503910152611d74565b909192939497605f198b8203018552883561015e1984360301811215611ef45760019184611ee29201611d95565b98602090810196950193019190611e95565b8280fd5b6040513d6000823e3d90fd5b906014116102bb5790601490565b6bffffffffffffffffffffffff199035818116939260148110611f3457505050565b60140360031b82901b16169150565b908160209103126102bb57516106b481610332565b9160206106b4938181520191611d74565b611f7f611f796040830183611d0f565b9061482f565b90611f90611f796060830183611d0f565b9061202c611fa5611f79610120840184611d0f565b60405194859360208501956101008201359260e08301359260c08101359260a0820135926080830135926001600160a01b0360208201359135168c9693909a999895926101209895926001600160a01b036101408a019d168952602089015260408801526060870152608086015260a085015260c084015260e08301526101008201520152565b0391612040601f199384810183528261044f565b5190206040805160208101928352309181019190915246606082015260809283018152909161206f908261044f565b51902090565b6001600160a01b03906120883482613518565b168060005260006020527f2da466a7b24304f47e87fa2e1e5a81b9831ce54fec19055ce277ca2f39ba42c460206001600160701b0360406000205416604051908152a2565b156120d457565b606460405162461bcd60e51b815260206004820152601160248201527f616c726561647920756e7374616b696e670000000000000000000000000000006044820152fd5b91909165ffffffffffff8080941691160191821161173857565b1561213957565b606460405162461bcd60e51b815260206004820152601460248201527f4e6f207374616b6520746f2077697468647261770000000000000000000000006044820152fd5b1561218457565b606460405162461bcd60e51b815260206004820152601d60248201527f6d7573742063616c6c20756e6c6f636b5374616b6528292066697273740000006044820152fd5b156121cf57565b606460405162461bcd60e51b815260206004820152601b60248201527f5374616b65207769746864726177616c206973206e6f742064756500000000006044820152fd5b1561221a57565b606460405162461bcd60e51b815260206004820152601860248201527f6661696c656420746f207769746864726177207374616b6500000000000000006044820152fd5b908092918237016000815290565b9290936106b496959260c0958552602085015265ffffffffffff8092166040850152166060830152151560808201528160a0820152019061194e565b604051906040820182811067ffffffffffffffff8211176103fd5760405260006020838281520152565b9060c060a06106b4938051845260208101516020850152604081015115156040850152606081015165ffffffffffff809116606086015260808201511660808501520151918160a0820152019061194e565b92946123856103509561237361010095999861236161234d602097610140808c528b01906122d2565b9b878a019060208091805184520151910152565b80516060890152602001516080880152565b805160a08701526020015160c0860152565b6001600160a01b0381511660e0850152015191019060208091805184520151910152565b6123f2610350946123e06123cb60a0959998969960e0865260e08601906122d2565b98602085019060208091805184520151910152565b80516060840152602001516080830152565b019060208091805184520151910152565b61035033612075565b9060009283809360208451940192f190565b3d610800808211612445575b50604051906020818301016040528082526000602083013e90565b90503861242a565b6003111561245757565b634e487b7160e01b600052602160045260246000fd5b92919061248b6040916002865260606020870152606086019061194e565b930152565b9392919060038110156124575760409161248b91865260606020870152606086019061194e565b60009060033d116124c457565b905060046000803e60005160e01c90565b600060443d106106b457604051600319913d83016004833e815167ffffffffffffffff918282113d6024840111176125335781840194855193841161253b573d8501016020848701011161253357506106b49291016020019061044f565b949350505050565b50949350505050565b90610350603660405180947f4141353020706f73744f702072657665727465643a20000000000000000000006020830152612588815180926020868601910161192b565b810103601681018552018361044f565b909392915a948051916125aa836137cd565b9260a08101956125c187516001600160a01b031690565b6001600160a01b039381851691826126e9575050506125e782516001600160a01b031690565b985b5a90030193840297604084019089825110612695577f49628fd1471006c1482da88028e9ce4dbb080b815c9b0344d39e5a8e6ec1419f946126336020928c61269095510390613518565b61263c8861244d565b01519489602061266461265686516001600160a01b031690565b9a516001600160a01b031690565b940151604080519182529815602082015297880152606087015290821695909116939081906080820190565b0390a4565b604051631101335b60e11b815280610bff600482016080906000815260406020820152602060408201527f414135312070726566756e642062656c6f772061637475616c476173436f737460608201520190565b9a9181516126f9575b50506125e9565b8784026127058a61244d565b60028a14612769576060860151823b156102bb5761273f93600080948d6040519788968795869363a9a2340960e01b855260048501612490565b0393f1801561101257612756575b505b38806126f2565b80610c256127639261041f565b3861274d565b6060860151823b156102bb5761279b93600080948d6040519788968795869363a9a2340960e01b855260048501612490565b0393f1908161284e575b50612849576127b26124b7565b6308c379a014612811575b604051631101335b60e11b815280610bff600482016080906000815260406020820152601260408201527f4141353020706f73744f7020726576657274000000000000000000000000000060608201520190565b6128196124d5565b8061282457506127bd565b612830610bff91612544565b604051918291631101335b60e11b835260048301611973565b61274f565b80610c2561285b9261041f565b386127a5565b929190925a93600091805191612876836137cd565b9260a081019561288d87516001600160a01b031690565b6001600160a01b0393908481169081612948575050506128b482516001600160a01b031690565b985b5a90030193840297604084019089825110612695577f49628fd1471006c1482da88028e9ce4dbb080b815c9b0344d39e5a8e6ec1419f946129006020928c61269095510390613518565b01519489602061291a61265686516001600160a01b031690565b9401519785604051968796169a16988590949392606092608083019683521515602083015260408201520152565b9a918051612958575b50506128b6565b6060850151600099509091803b156129c35791899189836129929560405180978196829563a9a2340960e01b84528c02906004840161246d565b0393f190816129b0575b506129a9576127b26124b7565b3880612951565b80610c256129bd9261041f565b3861299c565b8980fd5b9392915a906000928051906129db826137cd565b9360a08301966129f288516001600160a01b031690565b6001600160a01b0395908681169081612ab557505050612a1984516001600160a01b031690565b915b5a9003019485029860408301908a825110612a6857507f49628fd1471006c1482da88028e9ce4dbb080b815c9b0344d39e5a8e6ec1419f949392612900612690938c602094510390613518565b60408051631101335b60e11b815260048101929092526024820152602060448201527f414135312070726566756e642062656c6f772061637475616c476173436f73746064820152608490fd5b93918051612ac5575b5050612a1b565b606087015160009a509091803b15612bc257918a918a83612aff9560405180978196829563a9a2340960e01b84528c02906004840161246d565b0393f19081612baf575b50612ba8578a612b176124b7565b6308c379a014612b6f575b60408051631101335b60e11b815260048101929092526024820152601260448201527f4141353020706f73744f702072657665727400000000000000000000000000006064820152608490fd5b612b776124d5565b80612b825750612b22565b612b8b90612544565b90610bff604051928392631101335b60e11b84526004840161198b565b3880612abe565b80610c25612bbc9261041f565b38612b09565b8a80fd5b6002805414612bd55760028055565b606460405162461bcd60e51b815260206004820152601f60248201527f5265656e7472616e637947756172643a207265656e7472616e742063616c6c006044820152fd5b15612c2057565b606460405162461bcd60e51b815260206004820152601860248201527f41413934206761732076616c756573206f766572666c6f7700000000000000006044820152fd5b916000915a93815190612c778282613840565b612c8081611f69565b6020840152612cbe6effffffffffffffffffffffffffffff60808401516060850151176040850151176101008401359060e085013517171115612c19565b612cc7826138e8565b612cd281858461399c565b9790612cf6611a18612ceb87516001600160a01b031690565b602088015190613dcd565b612dbf57612d0343600052565b6001600160a01b03612d2160a060609701516001600160a01b031690565b16612da5575b505a810360a084013510612d515760809360c092604087015260608601525a900391013501910152565b604051631101335b60e11b815280610bff600482016080906000815260406020820152601e60408201527f41413430206f76657220766572696669636174696f6e4761734c696d6974000060608201520190565b90935081612db69297508584613f19565b95909238612d27565b604051631101335b60e11b815280610bff600482016080906000815260406020820152601a60408201527f4141323520696e76616c6964206163636f756e74206e6f6e636500000000000060608201520190565b9290916000925a8251612e268184613840565b612e2f83611f69565b6020850152612e6d6effffffffffffffffffffffffffffff60808301516060840151176040840151176101008601359060e087013517171115612c19565b612e76816138e8565b612e828186868b613c21565b9890612ea6611a18612e9b86516001600160a01b031690565b602087015190613dcd565b612f6b57612eb343600052565b6001600160a01b03612ed160a060609601516001600160a01b031690565b16612f50575b505a840360a086013510612f035750604085015260608401526080919060c0905a900391013501910152565b60408051631101335b60e11b815260048101929092526024820152601e60448201527f41413430206f76657220766572696669636174696f6e4761734c696d697400006064820152608490fd5b90925081612f62929850868685614112565b96909138612ed7565b610bff82604051918291631101335b60e11b835260048301608091815260406020820152601a60408201527f4141323520696e76616c6964206163636f756e74206e6f6e636500000000000060608201520190565b9190612fcb906142b7565b6001600160a01b0392918316613112576130bd57612fe8906142b7565b911661306857612ff55750565b60408051631101335b60e11b815260048101929092526024820152602160448201527f41413332207061796d61737465722065787069726564206f72206e6f7420647560648201527f6500000000000000000000000000000000000000000000000000000000000000608482015260a490fd5b610bff82604051918291631101335b60e11b835260048301608091815260406020820152601460408201527f41413334207369676e6174757265206572726f7200000000000000000000000060608201520190565b610bff83604051918291631101335b60e11b835260048301608091815260406020820152601760408201527f414132322065787069726564206f72206e6f742064756500000000000000000060608201520190565b610bff84604051918291631101335b60e11b835260048301608091815260406020820152601460408201527f41413234207369676e6174757265206572726f7200000000000000000000000060608201520190565b929190613173906142b7565b90926001600160a01b0380809516911603613112576130bd57612fe8906142b7565b908160209103126102bb575190565b906131be6080916106b496946101c0808652850191611d74565b9360e081516001600160a01b0380825116602087015260208201516040870152604082015160608701526060820151858701528482015160a087015260a08201511660c086015260c081015182860152015161010084015260208101516101208401526040810151610140840152606081015161016084015201516101808201526101a081840391015261194e565b905a918160206132666060830151936060810190611d0f565b90613286856040519586948594630eb993ab60e11b8652600486016131a4565b03816000305af16000918161332f575b50613328575060206000803e63deaddead60e01b600051146132d4576132ce6132c36106b4945a90611bda565b60808401519061172b565b91612861565b604051631101335b60e11b815280610bff600482016080906000815260406020820152600f60408201527f41413935206f7574206f6620676173000000000000000000000000000000000060608201520190565b9250505090565b61335291925060203d602011613359575b61334a818361044f565b810190613195565b9038613296565b503d613340565b909291925a9380602061337c6060830151946060810190611d0f565b9061339c866040519586948594630eb993ab60e11b8652600486016131a4565b03816000305af160009181613447575b50613440575060206000803e63deaddead60e01b600051146133eb576133e56133da6106b495965a90611bda565b60808301519061172b565b926129c7565b610bff83604051918291631101335b60e11b835260048301608091815260406020820152600f60408201527f41413935206f7574206f6620676173000000000000000000000000000000000060608201520190565b9450505050565b61346191925060203d6020116133595761334a818361044f565b90386133ac565b6001600160a01b031680156134d457600080809381935af1613488611be7565b501561349057565b606460405162461bcd60e51b815260206004820152601f60248201527f41413931206661696c65642073656e6420746f2062656e6566696369617279006044820152fd5b606460405162461bcd60e51b815260206004820152601860248201527f4141393020696e76616c69642062656e656669636961727900000000000000006044820152fd5b6001600160a01b0316600052600060205260406000206001600160701b03808254169283018093116117385780831161356a5761035092166001600160701b03166001600160701b0319825416179055565b606460405162461bcd60e51b815260206004820152601060248201527f6465706f736974206f766572666c6f77000000000000000000000000000000006044820152fd5b906135d06001600160a01b03916106b497959694606085526060850191611d74565b941660208201526040818503910152611d74565b6135f16040820182611d0f565b6136096135fd84611cba565b93610120810190611d0f565b9290303b156102bb5760009361364d9160405196879586957f957122ab000000000000000000000000000000000000000000000000000000008752600487016135ae565b0381305afa90816136b5575b506103505760016136686124b7565b6308c379a014613679575b61101257565b6136816124d5565b8061368d575b50613673565b8051600092501561368757610bff90604051918291631101335b60e11b835260048301611973565b80610c256136c29261041f565b38613659565b604051906136d582610433565b60006040838281528260208201520152565b6136fc613702916136f66136c8565b50614306565b91614306565b906001600160a01b039182825116928315613781575b65ffffffffffff928391826040816020850151169301511693836040816020840151169201511690808410613779575b50808511613771575b506040519561375f87610433565b16855216602084015216604082015290565b935038613751565b925038613748565b815181169350613718565b906001600160a01b0361379d6122a8565b9216600052600060205263ffffffff600160406000206001600160701b03815460781c1685520154166020830152565b60e060c08201519101518082146137f1574801808210156137ec575090565b905090565b5090565b156137fc57565b606460405162461bcd60e51b815260206004820152601d60248201527f4141393320696e76616c6964207061796d6173746572416e64446174610000006044820152fd5b6138a59061385d61385082611cba565b6001600160a01b03168452565b602081013560208401526080810135604084015260a0810135606084015260c0810135608084015260e081013560c084015261010081013560e0840152610120810190611d0f565b9081156138dd576138cf610e64610e5e8460a0946138ca6014610350999810156137f5565b611f04565b6001600160a01b0316910152565b505060a06000910152565b60a08101516001600160a01b03161561391d5760c060035b60ff60408401519116606084015102016080830151019101510290565b60c06001613900565b61393e60409295949395606083526060830190611d95565b9460208201520152565b90610350602f60405180947f414132332072657665727465643a200000000000000000000000000000000000602083015261398c815180926020868601910161192b565b810103600f81018552018361044f565b90915a91613a4260208551956139b987516001600160a01b031690565b936139d16139ca6040830183611d0f565b9084614354565b60a08801516001600160a01b0316906139e943600052565b6000926001600160a01b0380931615998a613bc7575b90856060600093015191015192604051978896879586937f3a871cdd00000000000000000000000000000000000000000000000000000000855260048501613926565b0393881690f160009181613ba6575b50613adc57613a5e6124b7565b6308c379a014613abd575b604051631101335b60e11b815280610bff600482016080906000815260406020820152601660408201527f4141323320726576657274656420286f72204f4f47290000000000000000000060608201520190565b613ac56124d5565b80613ad05750613a69565b612830610bff91613948565b93613aea575b50505a900391565b613b07906001600160a01b03166000526000602052604060002090565b613b1b6107f582546001600160701b031690565b808311613b5257613b4b926001600160701b039103166001600160701b03166001600160701b0319825416179055565b3880613ae2565b604051631101335b60e11b815280610bff600482016080906000815260406020820152601760408201527f41413231206469646e2774207061792070726566756e6400000000000000000060608201520190565b613bc091925060203d6020116133595761334a818361044f565b9038613a51565b9350600090613bfc6107f5613bef8a6001600160a01b03166000526000602052604060002090565b546001600160701b031690565b8981118314613c165750856060835b9692935050506139ff565b606087918b03613c0b565b93925a91613c576020855195613c3e87516001600160a01b031690565b936139d1613c4f6040830183611d0f565b90848d6145c2565b0393881690f160009181613dac575b50613ce85786613c746124b7565b6308c379a014613ccc575b60408051631101335b60e11b815260048101929092526024820152601660448201527f4141323320726576657274656420286f72204f4f4729000000000000000000006064820152608490fd5b613cd46124d5565b80613cdf5750613c7f565b612b8b90613948565b94959293613cfa575b5050505a900391565b613d17906001600160a01b03166000526000602052604060002090565b91613d2c6107f584546001600160701b031690565b90818311613d5f575082546dffffffffffffffffffffffffffff19169190036001600160701b0316179055388080613cf1565b60408051631101335b60e11b815260048101929092526024820152601760448201527f41413231206469646e2774207061792070726566756e640000000000000000006064820152608490fd5b613dc691925060203d6020116133595761334a818361044f565b9038613c66565b6001600160a01b0316600052600160205267ffffffffffffffff613e0b8260401c6040600020906001600160c01b0316600052602052604060002090565b91825492613e18846118d1565b9055161490565b15613e2657565b606460405162461bcd60e51b815260206004820152601f60248201527f4141343120746f6f206c6974746c6520766572696669636174696f6e476173006044820152fd5b91906040838203126102bb57825167ffffffffffffffff81116102bb5783019080601f830112156102bb57815191613ea1836104be565b91613eaf604051938461044f565b838352602084830101116102bb57602092613ecf9184808501910161192b565b92015190565b90610350602f60405180947f414133332072657665727465643a200000000000000000000000000000000000602083015261398c815180926020868601910161192b565b9190939293805192613f4560a0606086015195613f37898811613e1f565b01516001600160a01b031690565b91613f63836001600160a01b03166000526000602052604060002090565b94613f786107f587546001600160701b031690565b978589106140be576001600160a01b03602060009894613fbc8a966001600160701b038b613ff59f03166001600160701b03166001600160701b0319825416179055565b0151946040519a8b98899788937ff465c77e00000000000000000000000000000000000000000000000000000000855260048501613926565b0395169103f19182600091600094614097575b50614093576140156124b7565b6308c379a014614074575b604051631101335b60e11b815280610bff600482016080906000815260406020820152601660408201527f4141333320726576657274656420286f72204f4f47290000000000000000000060608201520190565b61407c6124d5565b806140875750614020565b612830610bff91613ed5565b9190565b9093506140b791503d806000833e6140af818361044f565b810190613e6a565b9238614008565b604051631101335b60e11b815280610bff600482016080906000815260406020820152601e60408201527f41413331207061796d6173746572206465706f73697420746f6f206c6f77000060608201520190565b939094929194855161413060a0606083015192613f37868511613e1f565b9261414e846001600160a01b03166000526000602052604060002090565b6141626107f582546001600160701b031690565b86811061426257916001600160a01b0360206141aa9a9b613fbc8a999897956001600160701b0360009c8d9903166001600160701b03166001600160701b0319825416179055565b0395169103f19182600091600094614243575b5061423f57836141cb6124b7565b6308c379a014614223575b60408051631101335b60e11b815260048101929092526024820152601660448201527f4141333320726576657274656420286f72204f4f4729000000000000000000006064820152608490fd5b61422b6124d5565b8061423657506141d6565b612b8b90613ed5565b9250565b90935061425b91503d806000833e6140af818361044f565b92386141bd565b610bff89604051918291631101335b60e11b835260048301608091815260406020820152601e60408201527f41413331207061796d6173746572206465706f73697420746f6f206c6f77000060608201520190565b80156142fd576142c690614306565b6001600160a01b0365ffffffffffff8060408401511642119081156142ed575b5091511691565b90506020830151164210386142e6565b50600090600090565b61430e6136c8565b5065ffffffffffff808260a01c16801561434d575b6040519261433084610433565b6001600160a01b038116845260d01c602084015216604082015290565b5080614323565b90918061436057505050565b8151516001600160a01b031692833b61456e576001600160a01b036060845101519060206040518093632b870d1b60e11b8252816000816143a58a8a60048401611f58565b0392867f00000000000000000000000000000000000000000000000000000000000000001690f19182156110125760009261454d575b508082169586156144f957168095036144a5573b1561445157610e64610e5e7fd51a9c61267aa6196961883ecf5ff2da6619c37dac0fa92122513fb32c032d2d9361442593611f04565b602083810151935160a00151604080516001600160a01b039485168152939091169183019190915290a3565b604051631101335b60e11b815280610bff600482016080906000815260406020820152602060408201527f4141313520696e6974436f6465206d757374206372656174652073656e64657260608201520190565b604051631101335b60e11b815280610bff600482016080906000815260406020820152602060408201527f4141313420696e6974436f6465206d7573742072657475726e2073656e64657260608201520190565b604051631101335b60e11b815280610bff600482016080906000815260406020820152601b60408201527f4141313320696e6974436f6465206661696c6564206f72204f4f47000000000060608201520190565b61456791925060203d60201161100b57610ffc818361044f565b90386143db565b604051631101335b60e11b815280610bff600482016080906000815260406020820152601f60408201527f414131302073656e64657220616c726561647920636f6e73747275637465640060608201520190565b929091816145d1575b50505050565b8251516001600160a01b031693843b6147e2576001600160a01b036060855101519060206040518093632b870d1b60e11b8252816000816146168b8b60048401611f58565b0392867f00000000000000000000000000000000000000000000000000000000000000001690f1918215611012576000926147c1575b5080821696871561476c5716809603614717573b156146ca5750610e64610e5e7fd51a9c61267aa6196961883ecf5ff2da6619c37dac0fa92122513fb32c032d2d9361469793611f04565b602083810151935160a00151604080516001600160a01b039485168152939091169183019190915290a3388080806145cb565b60408051631101335b60e11b815260048101929092526024820152602060448201527f4141313520696e6974436f6465206d757374206372656174652073656e6465726064820152608490fd5b610bff82604051918291631101335b60e11b835260048301608091815260406020820152602060408201527f4141313420696e6974436f6465206d7573742072657475726e2073656e64657260608201520190565b610bff84604051918291631101335b60e11b835260048301608091815260406020820152601b60408201527f4141313320696e6974436f6465206661696c6564206f72204f4f47000000000060608201520190565b6147db91925060203d60201161100b57610ffc818361044f565b903861464c565b60408051631101335b60e11b815260048101929092526024820152601f60448201527f414131302073656e64657220616c726561647920636f6e7374727563746564006064820152608490fd5b81604051918237209056fea2646970667358221220dbb21b74ae042e6a55f9e55e1e97de4db53b918b61e571770c5a8c2a2314a09d64736f6c63430008180033608080604052346100165761019e908161001c8239f35b600080fdfe6080604052600436101561001257600080fd5b6000803560e01c63570e1a361461002857600080fd5b346100ab5760203660031901126100ab5760043567ffffffffffffffff918282116100ab57366023830112156100ab5781600401359283116100ab5736602484840101116100ab576100a761008084602485016100dd565b60405173ffffffffffffffffffffffffffffffffffffffff90911681529081906020820190565b0390f35b80fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b908060141161015e5767ffffffffffffffff9160131982018381116101635760405193600b8401601f19908116603f0116850190811185821017610163576040528084526020840190368484011161015e576020946000600c819682946014880187378301015251923560601c5af190600051911561015857565b60009150565b600080fd5b6100ae56fea2646970667358221220da80bb6a0c6311ad3fe50775185a324ac829380329dc7f6e8e7e9deb65460d0d64736f6c63430008180033'
