export const ecdsaRegistryAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'smartAccount',
        type: 'address'
      }
    ],
    name: 'AlreadyInitedForSmartAccount',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'smartAccount',
        type: 'address'
      }
    ],
    name: 'NoOwnerRegisteredForSmartAccount',
    type: 'error'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'account',
        type: 'address'
      }
    ],
    name: 'NotEOA',
    type: 'error'
  },
  {
    inputs: [],
    name: 'WrongSignatureLength',
    type: 'error'
  },
  {
    inputs: [],
    name: 'ZeroAddressNotAllowedAsOwner',
    type: 'error'
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: 'address',
        name: 'smartAccount',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'oldOwner',
        type: 'address'
      },
      {
        indexed: true,
        internalType: 'address',
        name: 'newOwner',
        type: 'address'
      }
    ],
    name: 'OwnershipTransferred',
    type: 'event'
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
        name: 'smartAccount',
        type: 'address'
      }
    ],
    name: 'getOwner',
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
        name: 'eoaOwner',
        type: 'address'
      }
    ],
    name: 'initForSmartAccount',
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
        internalType: 'bytes32',
        name: 'dataHash',
        type: 'bytes32'
      },
      {
        internalType: 'bytes',
        name: 'moduleSignature',
        type: 'bytes'
      }
    ],
    name: 'isValidSignature',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: 'dataHash',
        type: 'bytes32'
      },
      {
        internalType: 'bytes',
        name: 'moduleSignature',
        type: 'bytes'
      },
      {
        internalType: 'address',
        name: 'smartAccount',
        type: 'address'
      }
    ],
    name: 'isValidSignatureForAddress',
    outputs: [
      {
        internalType: 'bytes4',
        name: '',
        type: 'bytes4'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'owner',
        type: 'address'
      }
    ],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
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
      }
    ],
    name: 'validateUserOp',
    outputs: [
      {
        internalType: 'uint256',
        name: '',
        type: 'uint256'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  }
]

export const ecdsaByteCode =
  '0x6080806040523461001657610992908161001c8239f35b600080fdfe6040608081526004908136101561001557600080fd5b6000803560e01c80631626ba7e146104415780632ede3bc014610398578063715018a61461032a578063a3f4df7e146102d7578063f2fde38b1461020a578063f44c339d14610183578063fa5441611461012b578063ffa1ad74146100d45763fff35b721461008357600080fd5b346100cd576003199082823601126100cd5783359167ffffffffffffffff83116100d0576101609083360301126100cd57506020926100c69160243591016105f6565b9051908152f35b80fd5b5080fd5b5090346100d057816003193601126100d057610127906100f26104a2565b90600582527f302e322e3000000000000000000000000000000000000000000000000000000060208301525191829182610556565b0390f35b5082346100d05760203660031901126100d0576001600160a01b038381610150610540565b16938481528060205220541691821561016d576020838551908152f35b60249250835191633d3fff5360e21b8352820152fd5b5091346102065760603660031901126102065760243567ffffffffffffffff8111610202576101b590369083016104d8565b90604435936001600160a01b03851685036100cd57506020937fffffffff00000000000000000000000000000000000000000000000000000000926101fa923561059f565b915191168152f35b8380fd5b8280fd5b5091903461020657602036600319011261020657610226610540565b90813b61029f576001600160a01b0380921692831561029157503384528360205283208054908373ffffffffffffffffffffffffffffffffffffffff19831617905516337fc8894f26f396ce8c004245c8b7cd1b92103a6e4302fcbab883987149ac01b7ec8480a480f35b90516307e179e960e31b8152fd5b916001600160a01b0360249351927f77817ac30000000000000000000000000000000000000000000000000000000084521690820152fd5b5090346100d057816003193601126100d057610127906102f56104a2565b90601f82527f4543445341204f776e657273686970205265676973747279204d6f64756c650060208301525191829182610556565b508091346103955781600319360112610395576001600160a01b039033835282602052822080549073ffffffffffffffffffffffffffffffffffffffff198216905516337fc8894f26f396ce8c004245c8b7cd1b92103a6e4302fcbab883987149ac01b7ec8380a480f35b50fd5b509134610206576020366003190112610206576103b3610540565b338452836020526001600160a01b03908184862054166104125716908115610404575081602093338152808552209073ffffffffffffffffffffffffffffffffffffffff1982541617905551308152f35b82516307e179e960e31b8152fd5b83517fb137edf40000000000000000000000000000000000000000000000000000000081523381850152602490fd5b50346100cd57816003193601126100cd576024359067ffffffffffffffff82116100cd57506101fa60209361049a7fffffffff0000000000000000000000000000000000000000000000000000000093369083016104d8565b33913561059f565b604051906040820182811067ffffffffffffffff8211176104c257604052565b634e487b7160e01b600052604160045260246000fd5b81601f8201121561053b5780359067ffffffffffffffff928383116104c25760405193601f8401601f19908116603f01168501908111858210176104c2576040528284526020838301011161053b57816000926020809301838601378301015290565b600080fd5b600435906001600160a01b038216820361053b57565b6020808252825181830181905290939260005b82811061058b57505060409293506000838284010152601f8019910116010190565b818101860151848201604001528501610569565b906105aa929161068b565b6105d2577fffffffff0000000000000000000000000000000000000000000000000000000090565b7f1626ba7e0000000000000000000000000000000000000000000000000000000090565b610140810135601e198236030181121561053b57810167ffffffffffffffff813581811161053b576020830190803603821361053b5783019060408483031261053b573591821161053b576040916020806106559301918501016104d8565b910135916001600160a01b03928381160361053b5735918216820361053b5761067d9261068b565b61068657600190565b600090565b916001600160a01b0380911691600093838552846020528260408620541693841561075157506041825110610727577f19457468657265756d205369676e6564204d6573736167653a0a333200000000855280601c52826106fa6106f284603c8920610769565b9190916107a1565b16841461071d5761070e916106f291610769565b16146107175790565b50600190565b5050505050600190565b60046040517f5763538a000000000000000000000000000000000000000000000000000000008152fd5b60249060405190633d3fff5360e21b82526004820152fd5b90604181511460001461079757610793916020820151906060604084015193015160001a906108d3565b9091565b5050600090600290565b60058110156108bd57806107b25750565b600181036107fe57606460405162461bcd60e51b815260206004820152601860248201527f45434453413a20696e76616c6964207369676e617475726500000000000000006044820152fd5b6002810361084a57606460405162461bcd60e51b815260206004820152601f60248201527f45434453413a20696e76616c6964207369676e6174757265206c656e677468006044820152fd5b60031461085357565b608460405162461bcd60e51b815260206004820152602260248201527f45434453413a20696e76616c6964207369676e6174757265202773272076616c60448201527f75650000000000000000000000000000000000000000000000000000000000006064820152fd5b634e487b7160e01b600052602160045260246000fd5b9291907f7fffffffffffffffffffffffffffffff5d576e7357a4501ddfe92f46681b20a083116109505791608094939160ff602094604051948552168484015260408301526060820152600093849182805260015afa156109435781516001600160a01b03811615610717579190565b50604051903d90823e3d90fd5b5050505060009060039056fea2646970667358221220f1bee9a48e32ee88cc473bc0b7953c62f6a4f858f420ab5406acacc29341ed7f64736f6c63430008180033'
