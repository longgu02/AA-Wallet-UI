export const accountAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_owner',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_initModuleAddress',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '_entryPointAddress',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'constructor'
  },
  {
    inputs: [],
    name: 'AlreadyInitialized',
    type: 'error'
  },
  {
    inputs: [],
    name: 'BaseImplementationCannotBeZero',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'caller',
        type: 'address'
      }
    ],
    name: 'CallerIsNotAnEntryPoint',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'caller',
        type: 'address'
      }
    ],
    name: 'CallerIsNotEntryPoint',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'caller',
        type: 'address'
      }
    ],
    name: 'CallerIsNotEntryPointOrOwner',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'caller',
        type: 'address'
      }
    ],
    name: 'CallerIsNotEntryPointOrSelf',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'caller',
        type: 'address'
      }
    ],
    name: 'CallerIsNotOwner',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'caller',
        type: 'address'
      }
    ],
    name: 'CallerIsNotSelf',
    type: 'error'
  },
  {
    inputs: [],
    name: 'DelegateCallsOnly',
    type: 'error'
  },
  {
    inputs: [],
    name: 'EntryPointCannotBeZero',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'implementationAddress',
        type: 'address'
      }
    ],
    name: 'InvalidImplementation',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'caller',
        type: 'address'
      }
    ],
    name: 'MixedAuthFail',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'module',
        type: 'address'
      }
    ],
    name: 'ModuleAlreadyEnabled',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'expectedModule',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'returnedModule',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'prevModule',
        type: 'address'
      }
    ],
    name: 'ModuleAndPrevModuleMismatch',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'module',
        type: 'address'
      }
    ],
    name: 'ModuleCannotBeZeroOrSentinel',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'module',
        type: 'address'
      }
    ],
    name: 'ModuleNotEnabled',
    type: 'error'
  },
  {
    inputs: [],
    name: 'ModulesAlreadyInitialized',
    type: 'error'
  },
  {
    inputs: [],
    name: 'ModulesSetupExecutionFailed',
    type: 'error'
  },
  {
    inputs: [],
    name: 'OwnerCanNotBeSelf',
    type: 'error'
  },
  {
    inputs: [],
    name: 'OwnerCannotBeZero',
    type: 'error'
  },
  {
    inputs: [],
    name: 'OwnerProvidedIsSame',
    type: 'error'
  },
  {
    inputs: [],
    name: 'TransferToZeroAddressAttempt',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'destLength',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'valueLength',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'funcLength',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'operationLength',
        type: 'uint256'
      }
    ],
    name: 'WrongBatchProvided',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: 'contractSignature',
        type: 'bytes'
      }
    ],
    name: 'WrongContractSignature',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: 'uintS',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'contractSignatureLength',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'signatureLength',
        type: 'uint256'
      }
    ],
    name: 'WrongContractSignatureFormat',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'moduleAddressProvided',
        type: 'address'
      }
    ],
    name: 'WrongValidationModule',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'module',
        type: 'address'
      }
    ],
    name: 'DisabledModule',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'module',
        type: 'address'
      }
    ],
    name: 'EnabledModule',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'bytes',
        name: 'data',
        type: 'bytes'
      },
      {
        indexed: false,
        internalType: 'enum Enum.Operation',
        name: 'operation',
        type: 'uint8'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'txGas',
        type: 'uint256'
      }
    ],
    name: 'ExecutionFailure',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'module',
        type: 'address'
      }
    ],
    name: 'ExecutionFromModuleFailure',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'module',
        type: 'address'
      }
    ],
    name: 'ExecutionFromModuleSuccess',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      },
      {
        indexed: true,
        internalType: 'bytes',
        name: 'data',
        type: 'bytes'
      },
      {
        indexed: false,
        internalType: 'enum Enum.Operation',
        name: 'operation',
        type: 'uint8'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'txGas',
        type: 'uint256'
      }
    ],
    name: 'ExecutionSuccess',
    type: 'event'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: 'module',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      },
      {
        indexed: false,
        internalType: 'bytes',
        name: 'data',
        type: 'bytes'
      },
      {
        indexed: false,
        internalType: 'enum Enum.Operation',
        name: 'operation',
        type: 'uint8'
      }
    ],
    name: 'ModuleTransaction',
    type: 'event'
  },
  {
    stateMutability: 'payable',
    type: 'fallback'
  },
  {
    inputs: [],
    name: 'count',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'module',
        type: 'address'
      }
    ],
    name: 'enableModule',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'to',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: 'value',
        type: 'uint256[]'
      },
      {
        internalType: 'bytes[]',
        name: 'data',
        type: 'bytes[]'
      },
      {
        internalType: 'enum Enum.Operation[]',
        name: 'operations',
        type: 'uint8[]'
      }
    ],
    name: 'execBatchTransactionFromModule',
    outputs: [
      {
        internalType: 'bool',
        name: 'success',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes'
      },
      {
        internalType: 'enum Enum.Operation',
        name: 'operation',
        type: 'uint8'
      },
      {
        internalType: 'uint256',
        name: 'txGas',
        type: 'uint256'
      }
    ],
    name: 'execTransactionFromModule',
    outputs: [
      {
        internalType: 'bool',
        name: 'success',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes'
      },
      {
        internalType: 'enum Enum.Operation',
        name: 'operation',
        type: 'uint8'
      }
    ],
    name: 'execTransactionFromModule',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'to',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: 'data',
        type: 'bytes'
      },
      {
        internalType: 'enum Enum.Operation',
        name: 'operation',
        type: 'uint8'
      }
    ],
    name: 'execTransactionFromModuleReturnData',
    outputs: [
      {
        internalType: 'bool',
        name: 'success',
        type: 'bool'
      },
      {
        internalType: 'bytes',
        name: 'returnData',
        type: 'bytes'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'dest',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: 'func',
        type: 'bytes'
      }
    ],
    name: 'execute',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'dest',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: 'value',
        type: 'uint256[]'
      },
      {
        internalType: 'bytes[]',
        name: 'func',
        type: 'bytes[]'
      }
    ],
    name: 'executeBatch',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address[]',
        name: 'dest',
        type: 'address[]'
      },
      {
        internalType: 'uint256[]',
        name: 'value',
        type: 'uint256[]'
      },
      {
        internalType: 'bytes[]',
        name: 'func',
        type: 'bytes[]'
      }
    ],
    name: 'executeBatch_y6U',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'dest',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'value',
        type: 'uint256'
      },
      {
        internalType: 'bytes',
        name: 'func',
        type: 'bytes'
      }
    ],
    name: 'execute_ncC',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'start',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'pageSize',
        type: 'uint256'
      }
    ],
    name: 'getModulesPaginated',
    outputs: [
      {
        internalType: 'address[]',
        name: 'array',
        type: 'address[]'
      },
      {
        internalType: 'address',
        name: 'next',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'module',
        type: 'address'
      }
    ],
    name: 'isModuleEnabled',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'setupContract',
        type: 'address'
      },
      {
        internalType: 'bytes',
        name: 'setupData',
        type: 'bytes'
      }
    ],
    name: 'setupAndEnableModule',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'signable',
    outputs: [
      {
        internalType: 'bool',
        name: '',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'sender',
            type: 'address'
          },
          {
            internalType: 'uint256',
            name: 'nonce',
            type: 'uint256'
          },
          {
            internalType: 'bytes',
            name: 'initCode',
            type: 'bytes'
          },
          {
            internalType: 'bytes',
            name: 'callData',
            type: 'bytes'
          },
          {
            internalType: 'uint256',
            name: 'callGasLimit',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'verificationGasLimit',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'preVerificationGas',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'maxFeePerGas',
            type: 'uint256'
          },
          {
            internalType: 'uint256',
            name: 'maxPriorityFeePerGas',
            type: 'uint256'
          },
          {
            internalType: 'bytes',
            name: 'paymasterAndData',
            type: 'bytes'
          },
          {
            internalType: 'bytes',
            name: 'signature',
            type: 'bytes'
          }
        ],
        internalType: 'struct UserOperation',
        name: 'userOp',
        type: 'tuple'
      },
      {
        internalType: 'bytes32',
        name: 'userOpHash',
        type: 'bytes32'
      },
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    name: 'validateUserOp',
    outputs: [
      {
        internalType: 'uint256',
        name: 'validationData',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    stateMutability: 'payable',
    type: 'receive'
  }
]

export const accountByteCode =
  '0x60c08060405234620000f1576060816200140880380380916200002382856200010b565b833981010312620000f157806200003c60249262000145565b9060206200005a60406200005283850162000145565b930162000145565b60405162bb78ef60e61b81526001600160a01b0394851660048201529394909392839190829060009088165af18015620000ff57620000b9575b50166080523060a0526040516112ad90816200015b823960805181505060a051815050f35b6020813d602011620000f6575b81620000d5602093836200010b565b81010312620000f157620000e99062000145565b503862000094565b600080fd5b3d9150620000c6565b6040513d6000823e3d90fd5b601f909101601f19168101906001600160401b038211908210176200012f57604052565b634e487b7160e01b600052604160045260246000fd5b51906001600160a01b0382168203620000f15756fe60806040526004361015610018575b361561001657005b005b60003560e01c8061189a146100ce5780614680146100f157806306661abd1461010a57806321632045146101055780632d9ad53d146101005780633a871cdd146100fb578063468721a7146100f657806347e1da2a146100f15780635229073f146100ec5780635305dd27146100e7578063610b5925146100e257806361c41934146100dd5780638da5cb5b146100d8578063acfdf503146100d3578063b61d27f6146100ce5763cc2f84520361000e5761095c565b610132565b610860565b610839565b6107f6565b6107d1565b6106dd565b610696565b6101d3565b610632565b6104c2565b610465565b6103a8565b6102de565b6001600160a01b0381160361012057565b600080fd5b35906101308261010f565b565b346101205760603660031901126101205760043561014f8161010f565b6044359067ffffffffffffffff80831161012057366023840112156101205782600401359081116101205736602482850101116101205761001692610198916024369201610339565b9060243590610e49565b9181601f840112156101205782359167ffffffffffffffff8311610120576020808501948460051b01011161012057565b346101205760603660031901126101205767ffffffffffffffff600435818111610120576102059036906004016101a2565b906024358381116101205761021e9036906004016101a2565b93604435908111610120576102379036906004016101a2565b92841580156102d4575b80156102ca575b61029e5760005b85811061025857005b8061029861027161026c6001948a87610a80565b610a95565b61027c838b89610a80565b3561029261028b858b8a610ad2565b3691610339565b91610e49565b0161024f565b5050506084926040519263470c355760e01b845260048401526024830152604482015260006064820152fd5b5083861415610248565b5085851415610241565b34610120576000366003190112610120576020601954604051908152f35b634e487b7160e01b600052604160045260246000fd5b90601f8019910116810190811067ffffffffffffffff82111761033457604052565b6102fc565b92919267ffffffffffffffff82116103345760405191610363601f8201601f191660200184610312565b829481845281830111610120578281602093846000960137010152565b9080601f830112156101205781602061039b93359101610339565b90565b6002111561012057565b346101205760a0366003190112610120576004356103c58161010f565b60443567ffffffffffffffff8111610120576103e5903690600401610380565b90606435906103f38261039e565b60843591600133148015610446575b61042f5760209361041f938061042957505a925b60243590610ec5565b6040519015158152f35b92610416565b60246040516321ac7c5f60e01b8152336004820152fd5b503360005260006020526001600160a01b036040600020541615610402565b346101205760203660031901126101205760206004356104848161010f565b6001600160a01b0380911690816001141591826104a8575b50506040519015158152f35b90915060005260008252604060002054161515388061049c565b34610120576003196060368201126101205767ffffffffffffffff90600435828111610120576101608160040192823603011261012057610144610507910182610a9f565b810191604082840312610120578135938411610120576001600160a01b0360208361053a829660009861058a9701610380565b5001356105468161010f565b169061055182610f83565b6040519485809481937ffff35b720000000000000000000000000000000000000000000000000000000083526024359060048401610b8c565b03925af180156105e4576105b1916000916105b5575b506040519081529081906020820190565b0390f35b6105d7915060203d6020116105dd575b6105cf8183610312565b810190610b2a565b386105a0565b503d6105c5565b610c83565b6080600319820112610120576004356106018161010f565b91602435916044359067ffffffffffffffff82116101205761062591600401610380565b9060643561039b8161039e565b3461012057602061041f610645366105e9565b92919091610aed565b60005b8381106106615750506000910152565b8181015183820152602001610651565b9060209161068a8151809281855285808601910161064e565b601f01601f1916010190565b34610120576106a7610645366105e9565b6040519060203d8301016040523d82523d6000602084013e6105b160405192839215158352604060208401526040830190610671565b34610120576040366003190112610120576004356106fa8161010f565b60243567ffffffffffffffff81116101205761071a903690600401610380565b906001600160a01b0381161561077357600082819282602083519301915af1604051903d6000833e1561076f576105b1905161075581610ff4565b6040516001600160a01b0390911681529081906020820190565b3d90fd5b60646040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152601a60248201527f57726f6e67204d6f64756c6520536574757020416464726573730000000000006044820152fd5b34610120576020366003190112610120576100166004356107f18161010f565b610ff4565b34610120576020366003190112610120576001600160a01b0360043561081b8161010f565b16600052601b602052602060ff604060002054166040519015158152f35b346101205760003660031901126101205760206001600160a01b03601a5416604051908152f35b346101205760803660031901126101205767ffffffffffffffff600435818111610120576108929036906004016101a2565b602492919235828111610120576108ad9036906004016101a2565b604494919435848111610120576108c89036906004016101a2565b91606435958611610120576105b1966108e86108f09736906004016101a2565b969095610c99565b60405190151581529081906020820190565b909291926040820190604083528051809252606083019160208092019160005b82811061093f57505050506001600160a01b036020919416910152565b83516001600160a01b031685529381019392810192600101610922565b34610120576040366003190112610120576004356109798161010f565b60243561098581610df8565b6109926040519182610312565b818152601f196109a183610df8565b013660208301376109d76109ca6000946001600160a01b03166000526000602052604060002090565b546001600160a01b031690565b6001600160a01b0381168015159081610a5e575b5080610a55575b15610a4257610a366109ca82610a1d610a3c94610a0f8988610e10565b906001600160a01b03169052565b6001600160a01b03166000526000602052604060002090565b93610e24565b926109d7565b908381526105b160405192839283610902565b508284106109f2565b600191501415386109eb565b634e487b7160e01b600052603260045260246000fd5b9190811015610a905760051b0190565b610a6a565b3561039b8161010f565b903590601e1981360301821215610120570180359067ffffffffffffffff82116101205760200191813603831361012057565b90821015610a9057610ae99160051b810190610a9f565b9091565b91929092600133148015610b0b575b61042f5761039b935a93610ec5565b503360005260006020526001600160a01b036040600020541615610afc565b90816020910312610120575190565b9035601e198236030181121561012057016020813591019167ffffffffffffffff821161012057813603831361012057565b908060209392818452848401376000828201840152601f01601f1916010190565b929190610c7e610be960209260408752610bb960408801610bac83610125565b6001600160a01b03169052565b838101356060880152610c6e610bd26040830183610b39565b9390610160948560808c01526101a08b0191610b6b565b91610c65610c11610bfd6060840184610b39565b603f198d8803810160a08f01529691610b6b565b608083013560c08c015260a083013560e08c01528a6101009660c085013588830152610c5561012060e087013581850152610140998701358a850152860186610b39565b9290918882860301910152610b6b565b93810190610b39565b9188840301610180890152610b6b565b930152565b6040513d6000823e3d90fd5b3561039b8161039e565b9497969391929795909560009887158015610dee575b8015610de4575b8015610dda575b610dab57600197600133148015610d7b575b610d635797969594939291906000985b808a10610cf25750505050505050505050565b9091929394959697899b50610d53888888610d4d89869f8f81610d38818e610d318f968f97610d2b61026c83610d459b610d409b610a80565b9c610a80565b3598610ad2565b989094610a80565b610c8f565b943691610339565b916111a8565b9b01989796959493929190610cdf565b6040516321ac7c5f60e01b8152336004820152602490fd5b506001600160a01b03610da46109ca336001600160a01b03166000526000602052604060002090565b1615610ccf565b60405163470c355760e01b81526004810189905260248101919091526044810182905260648101869052608490fd5b5085821415610cbd565b5081811415610cb6565b5080881415610caf565b67ffffffffffffffff81116103345760051b60200190565b8051821015610a905760209160051b010190565b6000198114610e335760010190565b634e487b7160e01b600052601160045260246000fd5b916000928392602083519301915af1604051903d6000833e1561076f5750565b610e819060206040519282848094519384920161064e565b810103902090565b906002821015610e965752565b634e487b7160e01b600052602160045260246000fd5b60209093929193610ec1816040810196610e89565b0152565b9493929091946002821015610e965760018203610f70576000808751602089018488f4955b8615610f3a577f81d12fffced46c214dfae8ab8fa0b9f7b69f70c9d500e33f612f2105deb261ee91610f35610f266001600160a01b0393610e69565b96604051938493169583610eac565b0390a4565b7f3ddd038f78c876172d5dbfd730b14c9f8692dfa197ef104eaac6df3f85a0874a91610f35610f266001600160a01b0393610e69565b600080875160208901868589f195610eea565b604051906001600160a01b0360208301917f2c2ecbc200000000000000000000000000000000000000000000000000000000835216602483015260248252606082019082821067ffffffffffffffff83111761033457600092839260405251906a636f6e736f6c652e6c6f675afa50565b6001600160a01b038116801590811561119d575b506111615761103c6110306109ca836001600160a01b03166000526000602052604060002090565b6001600160a01b031690565b61112557600160009081526020527fecdf3a3effea5783a3c4c2140e677577666428d44ed9d474a0b3a4c9943f844090611120906110ec61109c7fada5013122d395ba3c54772283fb069b10426056ef8ca54750cb9bb552a59e7d6109ca565b6110b9836001600160a01b03166000526000602052604060002090565b906001600160a01b03167fffffffffffffffffffffffff0000000000000000000000000000000000000000825416179055565b60016000908152602052610755817fada5013122d395ba3c54772283fb069b10426056ef8ca54750cb9bb552a59e7d6110b9565b0390a1565b6040517fb29d45950000000000000000000000000000000000000000000000000000000081526001600160a01b03919091166004820152602490fd5b6040517fcadb248f0000000000000000000000000000000000000000000000000000000081526001600160a01b03919091166004820152602490fd5b600191501438611008565b9392936111b85a86858585610ec5565b94851561124b576112206112157f8c014e41cffd68ba64f3e7830b8b2e4ee860509d8deab25ebbcbba2f0405e2da956001600160a01b0395604051968796338852166020870152604086015260a0606086015260a0850190610671565b916080840190610e89565b0390a1337f6895c13664aa4f67288b25d7a21d7aaa34916e355fb9b6fae0a139a9085becb8600080a2565b50505050337facd2c8702804128fdb0db2bb49f6d127dd0181c13fd45dbfe16de0930e2bd375600080a256fea26469706673582212201c1181a78c4d1542371eed69a7e5f7ca889f6f8035ff2e5460bd6a76459e01c564736f6c63430008180033'
