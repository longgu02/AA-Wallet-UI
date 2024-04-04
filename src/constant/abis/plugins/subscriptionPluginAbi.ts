export const subscriptionPluginAbi = [
  {
    inputs: [],
    name: 'NotImplemented',
    type: 'error'
  },
  {
    inputs: [],
    name: 'AUTHOR',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'NAME',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'VERSION',
    outputs: [
      {
        internalType: 'string',
        name: '',
        type: 'string'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'subscriber',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'collect',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    name: 'onInstall',
    outputs: [],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    name: 'onUninstall',
    outputs: [],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [],
    name: 'pluginManifest',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes4[]',
            name: 'interfaceIds',
            type: 'bytes4[]'
          },
          {
            internalType: 'bytes4[]',
            name: 'dependencyInterfaceIds',
            type: 'bytes4[]'
          },
          {
            internalType: 'bytes4[]',
            name: 'executionFunctions',
            type: 'bytes4[]'
          },
          {
            internalType: 'bytes4[]',
            name: 'permittedExecutionSelectors',
            type: 'bytes4[]'
          },
          {
            internalType: 'bool',
            name: 'permitAnyExternalAddress',
            type: 'bool'
          },
          {
            internalType: 'bool',
            name: 'canSpendNativeToken',
            type: 'bool'
          },
          {
            components: [
              {
                internalType: 'address',
                name: 'externalAddress',
                type: 'address'
              },
              {
                internalType: 'bool',
                name: 'permitAnySelector',
                type: 'bool'
              },
              {
                internalType: 'bytes4[]',
                name: 'selectors',
                type: 'bytes4[]'
              }
            ],
            internalType: 'struct ManifestExternalCallPermission[]',
            name: 'permittedExternalCalls',
            type: 'tuple[]'
          },
          {
            components: [
              {
                internalType: 'bytes4',
                name: 'executionSelector',
                type: 'bytes4'
              },
              {
                components: [
                  {
                    internalType: 'enum ManifestAssociatedFunctionType',
                    name: 'functionType',
                    type: 'uint8'
                  },
                  {
                    internalType: 'uint8',
                    name: 'functionId',
                    type: 'uint8'
                  },
                  {
                    internalType: 'uint256',
                    name: 'dependencyIndex',
                    type: 'uint256'
                  }
                ],
                internalType: 'struct ManifestFunction',
                name: 'associatedFunction',
                type: 'tuple'
              }
            ],
            internalType: 'struct ManifestAssociatedFunction[]',
            name: 'userOpValidationFunctions',
            type: 'tuple[]'
          },
          {
            components: [
              {
                internalType: 'bytes4',
                name: 'executionSelector',
                type: 'bytes4'
              },
              {
                components: [
                  {
                    internalType: 'enum ManifestAssociatedFunctionType',
                    name: 'functionType',
                    type: 'uint8'
                  },
                  {
                    internalType: 'uint8',
                    name: 'functionId',
                    type: 'uint8'
                  },
                  {
                    internalType: 'uint256',
                    name: 'dependencyIndex',
                    type: 'uint256'
                  }
                ],
                internalType: 'struct ManifestFunction',
                name: 'associatedFunction',
                type: 'tuple'
              }
            ],
            internalType: 'struct ManifestAssociatedFunction[]',
            name: 'runtimeValidationFunctions',
            type: 'tuple[]'
          },
          {
            components: [
              {
                internalType: 'bytes4',
                name: 'executionSelector',
                type: 'bytes4'
              },
              {
                components: [
                  {
                    internalType: 'enum ManifestAssociatedFunctionType',
                    name: 'functionType',
                    type: 'uint8'
                  },
                  {
                    internalType: 'uint8',
                    name: 'functionId',
                    type: 'uint8'
                  },
                  {
                    internalType: 'uint256',
                    name: 'dependencyIndex',
                    type: 'uint256'
                  }
                ],
                internalType: 'struct ManifestFunction',
                name: 'associatedFunction',
                type: 'tuple'
              }
            ],
            internalType: 'struct ManifestAssociatedFunction[]',
            name: 'preUserOpValidationHooks',
            type: 'tuple[]'
          },
          {
            components: [
              {
                internalType: 'bytes4',
                name: 'executionSelector',
                type: 'bytes4'
              },
              {
                components: [
                  {
                    internalType: 'enum ManifestAssociatedFunctionType',
                    name: 'functionType',
                    type: 'uint8'
                  },
                  {
                    internalType: 'uint8',
                    name: 'functionId',
                    type: 'uint8'
                  },
                  {
                    internalType: 'uint256',
                    name: 'dependencyIndex',
                    type: 'uint256'
                  }
                ],
                internalType: 'struct ManifestFunction',
                name: 'associatedFunction',
                type: 'tuple'
              }
            ],
            internalType: 'struct ManifestAssociatedFunction[]',
            name: 'preRuntimeValidationHooks',
            type: 'tuple[]'
          },
          {
            components: [
              {
                internalType: 'bytes4',
                name: 'executionSelector',
                type: 'bytes4'
              },
              {
                components: [
                  {
                    internalType: 'enum ManifestAssociatedFunctionType',
                    name: 'functionType',
                    type: 'uint8'
                  },
                  {
                    internalType: 'uint8',
                    name: 'functionId',
                    type: 'uint8'
                  },
                  {
                    internalType: 'uint256',
                    name: 'dependencyIndex',
                    type: 'uint256'
                  }
                ],
                internalType: 'struct ManifestFunction',
                name: 'preExecHook',
                type: 'tuple'
              },
              {
                components: [
                  {
                    internalType: 'enum ManifestAssociatedFunctionType',
                    name: 'functionType',
                    type: 'uint8'
                  },
                  {
                    internalType: 'uint8',
                    name: 'functionId',
                    type: 'uint8'
                  },
                  {
                    internalType: 'uint256',
                    name: 'dependencyIndex',
                    type: 'uint256'
                  }
                ],
                internalType: 'struct ManifestFunction',
                name: 'postExecHook',
                type: 'tuple'
              }
            ],
            internalType: 'struct ManifestExecutionHook[]',
            name: 'executionHooks',
            type: 'tuple[]'
          }
        ],
        internalType: 'struct PluginManifest',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [],
    name: 'pluginMetadata',
    outputs: [
      {
        components: [
          {
            internalType: 'string',
            name: 'name',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'version',
            type: 'string'
          },
          {
            internalType: 'string',
            name: 'author',
            type: 'string'
          },
          {
            components: [
              {
                internalType: 'bytes4',
                name: 'functionSelector',
                type: 'bytes4'
              },
              {
                internalType: 'string',
                name: 'permissionDescription',
                type: 'string'
              }
            ],
            internalType: 'struct SelectorPermission[]',
            name: 'permissionDescriptors',
            type: 'tuple[]'
          }
        ],
        internalType: 'struct PluginMetadata',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'pure',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'functionId',
        type: 'uint8'
      },
      {
        internalType: 'bytes',
        name: 'preExecHookData',
        type: 'bytes'
      }
    ],
    name: 'postExecutionHook',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'functionId',
        type: 'uint8'
      },
      {
        internalType: 'address',
        name: 'sender',
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
      }
    ],
    name: 'preExecutionHook',
    outputs: [
      {
        internalType: 'bytes',
        name: '',
        type: 'bytes'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'functionId',
        type: 'uint8'
      },
      {
        internalType: 'address',
        name: 'sender',
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
      }
    ],
    name: 'preRuntimeValidationHook',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'functionId',
        type: 'uint8'
      },
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
      }
    ],
    name: 'preUserOpValidationHook',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'uint8',
        name: 'functionId',
        type: 'uint8'
      },
      {
        internalType: 'address',
        name: 'sender',
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
      }
    ],
    name: 'runtimeValidationFunction',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'beneficiary',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      }
    ],
    name: 'subscribe',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address'
      },
      {
        internalType: 'address',
        name: '',
        type: 'address'
      }
    ],
    name: 'subscriptions',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'lastPaid',
        type: 'uint256'
      },
      {
        internalType: 'bool',
        name: 'enabled',
        type: 'bool'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes4',
        name: 'interfaceId',
        type: 'bytes4'
      }
    ],
    name: 'supportsInterface',
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
        internalType: 'uint8',
        name: 'functionId',
        type: 'uint8'
      },
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
      }
    ],
    name: 'userOpValidationFunction',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'nonpayable',
    type: 'function'
  }
]
export const subscriptionPluginBytecode =
  '0x6080806040523461001657610e00908161001c8239f35b600080fdfe60808060405260048036101561001457600080fd5b60003560e01c91826301ffc9a7146108c2575081630c7ecd84146104685781631128186d14610876578163118a53891461076357816346d60eb2146107415781636207d31b146106d05781636b8357ac1461052e5781636d61fe701461052957816388e18ce41461046d5781638a91b0e3146105295781638de69284146104aa578163a3f4df7e1461048e578163a7be85c614610472578163af8734831461046d578163bfd151c114610468578163c776313014610115575063ffa1ad74146100dc57600080fd5b346101105760003660031901126101105761010c6100f8610c64565b604051918291602083526020830190610a0f565b0390f35b600080fd5b346101105760003660031901126101105761012e610cd2565b5061025b6101b261013d610cd2565b9263f23b1ed760e01b61016b60405161015581610ae5565b6001815260203681830137806020880152610d3f565b5260405161017881610ae5565b60018152602036818301378060408601527f8de6928400000000000000000000000000000000000000000000000000000000928391610d3f565b5261020b6040516101c281610ab3565b6002815260006020820152600060408201526101dc610d62565b60e0870152604051906101ee82610ae5565b848252602082015260e08601519061020582610d3f565b52610d3f565b50610214610d62565b6101408501526040519061022782610ab3565b815260006020820152600060408201526040519161024483610ae5565b825260208201526101408301519061020582610d3f565b5060016080820152600160a08201526040518091602082526102d66102c06102aa610294845161018060208801526101a0870190610b95565b6020850151868203601f19016040880152610b95565b6040840151858203601f19016060870152610b95565b6060830151848203601f19016080860152610b95565b6080820151151560a084015260a0820151151560c084015260c082015190601f198482030160e0850152815180825260208201916020808360051b8301019401926000915b83831061040f578780886103788961036261034960e08501519261010093601f198883030185890152610c0f565b918401519161012092601f198783030184880152610c0f565b90830151848203601f1901610140860152610c0f565b6103966101408301519161016092601f198683030184870152610c0f565b91015190601f19838203016101808401526020808351928381520192019060005b8181106103c5575050500390f35b91935091602060e0600192610401604088516001600160e01b031981511684526103f58682015187860190610bd3565b01516080830190610bd3565b0194019101918493926103b7565b91939596509193602080610455600193601f19868203018752606060408b516001600160a01b038151168452858101511515868501520151918160408201520190610b95565b970193019301909287969594929361031b565b6109c8565b610a65565b346101105760003660031901126101105761010c6100f8610b5c565b346101105760003660031901126101105761010c6100f8610b23565b34610110576040366003190112610110576104c361092e565b60026040516104d181610ab3565b602435815260208101600081526001600160a01b03604083019460018652166000526000602052604060002033600052602052604060002091518255516001820155019051151560ff80198354169116179055600080f35b610a34565b346101105760403660031901126101105761054761092e565b6024359133600052602092600084526001600160a01b03604060002093169283600052845260406000209281845403610110576001840193845442034281116106bb576224ea0011610110576002015460ff16156101105760a460009492859342905560405195869384927f38997b110000000000000000000000000000000000000000000000000000000084523388850152602484015260606044840152600260648401527f307800000000000000000000000000000000000000000000000000000000000060848401525af180156106af5761062157005b3d806000843e6106318184610b01565b820192808385031261011057825167ffffffffffffffff9384821161011057019184601f8401121561011057825193841161069a57506040519361067e601f8501601f1916830186610b01565b8385528184840101116101105780610698940191016109ec565b005b604190634e487b7160e01b6000525260246000fd5b6040513d6000823e3d90fd5b601185634e487b7160e01b6000525260246000fd5b34610110576040366003190112610110576106e961092e565b602435906001600160a01b0390818316809303610110571660005260006020526040600020906000526020526060604060002080549060ff600260018301549201541690604051928352602083015215156040820152f35b346101105761074f36610972565b505050505060405163d623472560e01b8152fd5b346101105760003660031901126101105761077c610c9d565b50610785610c9d565b61078d610b23565b8152610797610c64565b60208083019182526107a7610b5c565b916040840192835260606107f9604051948486526107e96107d388516080888a015260a0890190610a0f565b945194601f1995868983030160408a0152610a0f565b9051848783030184880152610a0f565b940151918184860301608085015282519081865280860181808460051b8901019501936000975b84891061082d5787870388f35b9091929394958480610864838686600196030188526040838c516001600160e01b0319815116845201519181858201520190610a0f565b98019401980197919094939294610820565b3461011057604036600319011261011057803560ff8116036101105760243567ffffffffffffffff8111610110576108b19036908301610944565b505060405163d623472560e01b8152fd5b90346101105760203660031901126101105735906001600160e01b03198216809203610110578163f23b1ed760e01b60209314908115610904575b5015158152f35b7f01ffc9a700000000000000000000000000000000000000000000000000000000915014836108fd565b600435906001600160a01b038216820361011057565b9181601f840112156101105782359167ffffffffffffffff8311610110576020838186019501011161011057565b9060806003198301126101105760043560ff8116810361011057916024356001600160a01b03811681036101105791604435916064359067ffffffffffffffff8211610110576109c491600401610944565b9091565b34610110576109d636610972565b5050505050600460405163d623472560e01b8152fd5b60005b8381106109ff5750506000910152565b81810151838201526020016109ef565b90602091610a28815180928185528580860191016109ec565b601f01601f1916010190565b346101105760203660031901126101105760043567ffffffffffffffff811161011057610698903690600401610944565b34610110576003196060368201126101105760043560ff811603610110576024359067ffffffffffffffff821161011057610160913603011261011057600460405163d623472560e01b8152fd5b6060810190811067ffffffffffffffff821117610acf57604052565b634e487b7160e01b600052604160045260246000fd5b6040810190811067ffffffffffffffff821117610acf57604052565b90601f8019910116810190811067ffffffffffffffff821117610acf57604052565b60405190610b3082610ae5565b600e82527f436f756e74657220506c7567696e0000000000000000000000000000000000006020830152565b60405190610b6982610ae5565b600782527f416c6368656d79000000000000000000000000000000000000000000000000006020830152565b90815180825260208080930193019160005b828110610bb5575050505090565b83516001600160e01b03191685529381019392810192600101610ba7565b80516005811015610bf9576040918291845260ff60208201511660208501520151910152565b634e487b7160e01b600052602160045260246000fd5b90815180825260208080930193019160005b828110610c2f575050505090565b90919293826080600192610c588389516001600160e01b03198151168452015184830190610bd3565b01950193929101610c21565b60405190610c7182610ae5565b600582527f312e302e300000000000000000000000000000000000000000000000000000006020830152565b604051906080820182811067ffffffffffffffff821117610acf57604052606080838181528160208201528160408201520152565b60405190610180820182811067ffffffffffffffff821117610acf5760405281610160606091828152826020820152826040820152828082015260006080820152600060a08201528260c08201528260e08201528261010082015282610120820152826101408201520152565b805115610d4c5760200190565b634e487b7160e01b600052603260045260246000fd5b60409060405191610d7283610ae5565b60018352829160005b602080821015610dc257835160209291610d9482610ae5565b600082528551610da381610ab3565b6000815260008282015260008782015281830152828801015201610d7b565b50509192505056fea264697066735822122084c2f9cd7716b9c7b3a4bbe5aa0d1534482fd606046ca859e388ddc4a7bc21f764736f6c63430008180033'
