export const fastTransferPluginAbi = [
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
        internalType: 'uint256',
        name: 'startDate',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'publicKey',
        type: 'address'
      }
    ],
    name: 'createSession',
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
        name: '',
        type: 'address'
      }
    ],
    name: 'sessions',
    outputs: [
      {
        internalType: 'bytes32',
        name: '',
        type: 'bytes32'
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
        internalType: 'address',
        name: 'sender',
        type: 'address'
      },
      {
        internalType: 'address',
        name: 'receiver',
        type: 'address'
      },
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'startDate',
        type: 'uint256'
      },
      {
        internalType: 'uint256',
        name: 'nonce',
        type: 'uint256'
      },
      {
        internalType: 'address',
        name: 'publicKey',
        type: 'address'
      }
    ],
    name: 'transfer',
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

export const fastTransferBytecode =
  '0x6080806040523461001b576078600155610f0190816100218239f35b600080fdfe60808060405260048036101561001457600080fd5b60003560e01c91826301ffc9a7146109c3575081630c7ecd84146104685781631128186d14610977578163118a538914610864578163431a1b971461082a57816346d60eb2146108085781636d61fe701461080357816388e18ce41461046d5781638a91b0e314610803578163a3100b0c1461077a578163a3f4df7e1461075e578163a7be85c614610742578163adc176dd14610472578163af8734831461046d578163bfd151c114610468578163c776313014610115575063ffa1ad74146100dc57600080fd5b346101105760003660031901126101105761010c6100f8610d65565b604051918291602083526020830190610b10565b0390f35b600080fd5b346101105760003660031901126101105761012e610dd3565b5061025b6101b261013d610dd3565b9263f23b1ed760e01b61016b60405161015581610be6565b6001815260203681830137806020880152610e40565b5260405161017881610be6565b60018152602036818301378060408601527fa3100b0c00000000000000000000000000000000000000000000000000000000928391610e40565b5261020b6040516101c281610bb4565b6002815260006020820152600060408201526101dc610e63565b60e0870152604051906101ee82610be6565b848252602082015260e08601519061020582610e40565b52610e40565b50610214610e63565b6101408501526040519061022782610bb4565b815260006020820152600060408201526040519161024483610be6565b825260208201526101408301519061020582610e40565b5060016080820152600160a08201526040518091602082526102d66102c06102aa610294845161018060208801526101a0870190610c96565b6020850151868203601f19016040880152610c96565b6040840151858203601f19016060870152610c96565b6060830151848203601f19016080860152610c96565b6080820151151560a084015260a0820151151560c084015260c082015190601f198482030160e0850152815180825260208201916020808360051b8301019401926000915b83831061040f578780886103788961036261034960e08501519261010093601f198883030185890152610d10565b918401519161012092601f198783030184880152610d10565b90830151848203601f1901610140860152610d10565b6103966101408301519161016092601f198683030184870152610d10565b91015190601f19838203016101808401526020808351928381520192019060005b8181106103c5575050500390f35b91935091602060e0600192610401604088516001600160e01b031981511684526103f58682015187860190610cd4565b01516080830190610cd4565b0194019101918493926103b7565b91939596509193602080610455600193601f19868203018752606060408b516001600160a01b038151168452858101511515868501520151918160408201520190610c96565b970193019301909287969594929361031b565b610ac9565b610b66565b346101105760c03660031901126101105761048b610a2f565b6001600160a01b0360248035828116949390859003610110576064359460a4359380851685036101105786420342811161072e57600154106106c65760405196876105036020978883019360843590859160549391835260208301526bffffffffffffffffffffffff199060601b1660408201520190565b0397610517601f19998a8101835282610c02565b519020921691826000526000855260406000205480151591826106bc575b5050156106545760009493929160a4869260405197889384927f38997b11000000000000000000000000000000000000000000000000000000008452898401526044358784015260606044840152600260648401527f307800000000000000000000000000000000000000000000000000000000000060848401525af18015610648576105be57005b3d806000863e6105ce8186610c02565b840190828583031261011057845167ffffffffffffffff9586821161011057019382601f860112156101105784519586116106355750506106198260405196601f8701160186610c02565b838552818484010111610110578061063394019101610aed565b005b604190634e487b7160e01b600052526000fd5b6040513d6000823e3d90fd5b608485602185876040519362461bcd60e51b85528401528201527f46617374207472616e73666572206572726f723a20556e617574686f72697a6560448201527f64000000000000000000000000000000000000000000000000000000000000006064820152fd5b1490508780610535565b6084868560206040519262461bcd60e51b8452830152808201527f46617374207472616e73666572206572726f723a2053657373696f6e2065787060448201527f69726564000000000000000000000000000000000000000000000000000000006064820152fd5b84601188634e487b7160e01b600052526000fd5b346101105760003660031901126101105761010c6100f8610c5d565b346101105760003660031901126101105761010c6100f8610c24565b34610110576060366003190112610110576044356001600160a01b0381168103610110576107ec6107de9160405192839160208301956024359035879160549391835260208301526bffffffffffffffffffffffff199060601b1660408201520190565b03601f198101835282610c02565b519020336000526000602052604060002055600080f35b610b35565b346101105761081636610a73565b505050505060405163d623472560e01b8152fd5b34610110576020366003190112610110576001600160a01b0361084b610a2f565b1660005260006020526020604060002054604051908152f35b346101105760003660031901126101105761087d610d9e565b50610886610d9e565b61088e610c24565b8152610898610d65565b60208083019182526108a8610c5d565b916040840192835260606108fa604051948486526108ea6108d488516080888a015260a0890190610b10565b945194601f1995868983030160408a0152610b10565b9051848783030184880152610b10565b940151918184860301608085015282519081865280860181808460051b8901019501936000975b84891061092e5787870388f35b9091929394958480610965838686600196030188526040838c516001600160e01b0319815116845201519181858201520190610b10565b98019401980197919094939294610921565b3461011057604036600319011261011057803560ff8116036101105760243567ffffffffffffffff8111610110576109b29036908301610a45565b505060405163d623472560e01b8152fd5b90346101105760203660031901126101105735906001600160e01b03198216809203610110578163f23b1ed760e01b60209314908115610a05575b5015158152f35b7f01ffc9a700000000000000000000000000000000000000000000000000000000915014836109fe565b600435906001600160a01b038216820361011057565b9181601f840112156101105782359167ffffffffffffffff8311610110576020838186019501011161011057565b9060806003198301126101105760043560ff8116810361011057916024356001600160a01b03811681036101105791604435916064359067ffffffffffffffff821161011057610ac591600401610a45565b9091565b3461011057610ad736610a73565b5050505050600460405163d623472560e01b8152fd5b60005b838110610b005750506000910152565b8181015183820152602001610af0565b90602091610b2981518092818552858086019101610aed565b601f01601f1916010190565b346101105760203660031901126101105760043567ffffffffffffffff811161011057610633903690600401610a45565b34610110576003196060368201126101105760043560ff811603610110576024359067ffffffffffffffff821161011057610160913603011261011057600460405163d623472560e01b8152fd5b6060810190811067ffffffffffffffff821117610bd057604052565b634e487b7160e01b600052604160045260246000fd5b6040810190811067ffffffffffffffff821117610bd057604052565b90601f8019910116810190811067ffffffffffffffff821117610bd057604052565b60405190610c3182610be6565b601482527f46617374205472616e7366657220506c7567696e0000000000000000000000006020830152565b60405190610c6a82610be6565b600982527f4c6f6e67205068616d00000000000000000000000000000000000000000000006020830152565b90815180825260208080930193019160005b828110610cb6575050505090565b83516001600160e01b03191685529381019392810192600101610ca8565b80516005811015610cfa576040918291845260ff60208201511660208501520151910152565b634e487b7160e01b600052602160045260246000fd5b90815180825260208080930193019160005b828110610d30575050505090565b90919293826080600192610d598389516001600160e01b03198151168452015184830190610cd4565b01950193929101610d22565b60405190610d7282610be6565b600582527f312e302e300000000000000000000000000000000000000000000000000000006020830152565b604051906080820182811067ffffffffffffffff821117610bd057604052606080838181528160208201528160408201520152565b60405190610180820182811067ffffffffffffffff821117610bd05760405281610160606091828152826020820152826040820152828082015260006080820152600060a08201528260c08201528260e08201528261010082015282610120820152826101408201520152565b805115610e4d5760200190565b634e487b7160e01b600052603260045260246000fd5b60409060405191610e7383610be6565b60018352829160005b602080821015610ec357835160209291610e9582610be6565b600082528551610ea481610bb4565b6000815260008282015260008782015281830152828801015201610e7c565b50509192505056fea2646970667358221220bf86250378f582495a4a10f23e6a644bceb3c5f3e2c6fc2ed3921603093da15864736f6c63430008180033'
