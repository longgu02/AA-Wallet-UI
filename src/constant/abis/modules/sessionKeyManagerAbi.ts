export const sessionManagerAbi = [
  {
    inputs: [
      {
        internalType: 'address',
        name: 'smartAccount',
        type: 'address'
      }
    ],
    name: 'getSessionKeys',
    outputs: [
      {
        components: [
          {
            internalType: 'bytes32',
            name: 'merkleRoot',
            type: 'bytes32'
          }
        ],
        internalType: 'struct SessionStorage',
        name: '',
        type: 'tuple'
      }
    ],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'bytes32',
        name: '_dataHash',
        type: 'bytes32'
      },
      {
        internalType: 'bytes',
        name: '_signature',
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
        name: '_merkleRoot',
        type: 'bytes32'
      }
    ],
    name: 'setMerkleRoot',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: 'smartAccount',
        type: 'address'
      },
      {
        internalType: 'uint48',
        name: 'validUntil',
        type: 'uint48'
      },
      {
        internalType: 'uint48',
        name: 'validAfter',
        type: 'uint48'
      },
      {
        internalType: 'address',
        name: 'sessionValidationModule',
        type: 'address'
      },
      {
        internalType: 'bytes',
        name: 'sessionKeyData',
        type: 'bytes'
      },
      {
        internalType: 'bytes32[]',
        name: 'merkleProof',
        type: 'bytes32[]'
      }
    ],
    name: 'validateSessionKey',
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
    stateMutability: 'nonpayable',
    type: 'function'
  }
]
export const sessionManagerByteCode =
  '0x60808060405234610016576109be908161001c8239f35b600080fdfe6080604052600436101561001257600080fd5b60003560e01c80631626ba7e146105ed5780637cb64759146105c5578063b13152ee146104e0578063fde5354d146104875763fff35b721461005357600080fd5b346104595760403660031901126104595767ffffffffffffffff6004351161045957600435360361016060031982011261045957600435610144013590602219018112156104595760043501600481013567ffffffffffffffff811161045957602482019080360382136104595782019060408383031261045957359067ffffffffffffffff8211610459576044916024806100f39301918501016106d2565b9101356001600160a01b03811603610459578051810160c0828203126104595761011f602083016108b8565b61012b604084016108b8565b9160608401516001600160a01b038116810361045957608085015167ffffffffffffffff811161045957610167906020808501918801016108cb565b9160a08601519567ffffffffffffffff87116104595760208201603f888301011215610459576020878201015161019d8161072f565b976101ab604051998a610694565b81895260208901906020850160408460051b8387010101116104595790604082850101915b60408460051b82870101018310610472575050505060c08101519167ffffffffffffffff83116104595761020b9260208092019201016108cb565b906004803501356001600160a01b03811690036104595761039960006001600160a01b038561024b6103ab9a6020988488168c8c6004356004013561076a565b604051998a96879586937f84f16a4d0000000000000000000000000000000000000000000000000000000085526080600486015285600435600401351660848601526024600435013560a486015261037f6102c66102b3604460043501600435600401610910565b61016060c48a01526101e4890191610942565b6103596102f46102e0606460043501600435600401610910565b6083198b8603810160e48d01529491610942565b61034861010460846004350135818c01526101249060a46004350135828d015260c460043501356101448d015260e460043501356101648d015260043501356101848c015260043501600435600401610910565b90848b8403016101a48c0152610942565b9061036f61014460043501600435600401610910565b91898403016101c48a0152610942565b906024356024870152600319868303016044870152610963565b83810360031901606485015290610963565b0393165af1801561046657600090610423575b6020935061041c5760015b60ff79ffffffffffff00000000000000000000000000000000000000007fffffffffffff00000000000000000000000000000000000000000000000000006040519560d01b169360a01b16911617178152f35b60006103c9565b50916020813d60201161045e575b8161043e60209383610694565b810103126104595751918215158303610459576020926103be565b600080fd5b3d9150610431565b6040513d6000823e3d90fd5b602080604093855181520193019291506101d0565b34610459576020366003190112610459576001600160a01b036104a8610719565b60006040516104b681610649565b5216600052600060205260206040600020604051906104d482610649565b54809152604051908152f35b346104595760c0366003190112610459576104f9610719565b65ffffffffffff6024358181168103610459576044359182168203610459576064356001600160a01b03811681036104595767ffffffffffffffff926084358481116104595761054d9036906004016106d2565b9260a4359485116104595736602386011215610459578460040135956105728761072f565b956105806040519788610694565b8787526020976024602089019160051b8301019136831161045957602401905b8282106105b6575050506105b4965061076a565b005b813581529089019089016105a0565b3461045957602036600319011261045957336000526000602052600435604060002055600080f35b346104595760403660031901126104595760243567ffffffffffffffff81116104595761061e9036906004016106d2565b5060206040517fffffffff000000000000000000000000000000000000000000000000000000008152f35b6020810190811067ffffffffffffffff82111761066557604052565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b90601f8019910116810190811067ffffffffffffffff82111761066557604052565b67ffffffffffffffff811161066557601f01601f191660200190565b81601f82011215610459578035906106e9826106b6565b926106f76040519485610694565b8284526020838301011161045957816000926020809301838601378301015290565b600435906001600160a01b038216820361045957565b67ffffffffffffffff81116106655760051b60200190565b60005b83811061075a5750506000910152565b818101518382015260200161074a565b9290939495916001600160a01b0360009416845260209184835261080360408097818820998251948592888401977fffffffffffff0000000000000000000000000000000000000000000000000000809260d01b16895260d01b1660268401526bffffffffffffffffffffffff199060601b16602c8301526107f481518092898686019101610747565b81010385810184520182610694565b5190209454949183925b875184101561084b57828460051b890101519081811060001461083c578552825260018585205b93019261080d565b90855282526001858520610834565b925095509391500361085b575050565b6064925051907f08c379a00000000000000000000000000000000000000000000000000000000082526004820152601260248201527f53657373696f6e4e6f74417070726f76656400000000000000000000000000006044820152fd5b519065ffffffffffff8216820361045957565b81601f820112156104595780516108e1816106b6565b926108ef6040519485610694565b818452602082840101116104595761090d9160208085019101610747565b90565b9035601e198236030181121561045957016020813591019167ffffffffffffffff821161045957813603831361045957565b908060209392818452848401376000828201840152601f01601f1916010190565b9060209161097c81518092818552858086019101610747565b601f01601f191601019056fea2646970667358221220ce9358d0d73668967705dda52c81abe503fbae3a6f79be6c63b2d54bf53cec1a64736f6c63430008180033'