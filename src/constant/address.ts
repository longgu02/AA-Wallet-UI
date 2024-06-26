import { NETWORKS } from './chain'

export const ADDRESS = {
  GOERLI_TESTNET: {
    ROLES_CONTRACT_ADDRESS: '0x235AF0181e89540ABE32f7315303510A2ab19aac',
    SUPPLY_CHAIN_CONTRACT_ADDRESS: '0xe8D2241B34577D7f19E3DB69f63E1b202B1Dd4e0',
    SHIPMENT_CONTRACT_ADDRESS: '0x41d54558E3CA411D43e57804D698a899B8C5678D',
    PRODUCT_CONTRACT_ADDRESS: '0x2D42e4Ec679A72fedB00CCb6181530f5EC6Ec7C6',
    SBT_CONTRACT_ADDRESS: '0x76E02A0F37878495791CA9EE140992A2939d5714',
    PRICING_CONTRACT_ADDRESS: '0x5E3973970748dcbDf006691d2978725aec345689'
  },
  BSC_TESTNET: {
    ROLES_CONTRACT_ADDRESS: '',
    SUPPLY_CHAIN_CONTRACT_ADDRESS: '',
    SHIPMENT_CONTRACT_ADDRESS: '',
    PRODUCT_CONTRACT_ADDRESS: '',
    PRICING_CONTRACT_ADDRESS: '',
    SBT_CONTRACT_ADDRESS: ''
  }
}

// Sepolia 2 ETH PM
// export const PM_ADDRESS = '0xAc8a8857840670D50629F5175FfCf07dF3420277'

export const SP_ADDRESS = '0x11c68f4FB6ef20cf27425B3271b58340673DB104'
export const AF_ADDRESS = '0xc0c317628033157e7A04999fF90cC779da9c1104'

export const EP_ADDRESS = '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789'
export const PM_ADDRESS = '0xAc8a8857840670D50629F5175FfCf07dF3420277'
export const SM_ADDRESS = '0x6a61AB7B90fc8154d5d5975767F02d2F0F1e6F4E'
export const ERC20SM_ADDRESS = '0x2f8539D1f432ad791bE864C079F1857C5C04D5Ef'
export const NATIVESM_ADDRESS = '0x0eaD091889CF2BF85c61Fda4ac59A68b195EfEd1'
export const ECDSASM_ADDRESS = '0xC9E19aAde4C9b8157667143F69EBED2425683b09'
export const CTPLUGIN_ADDRESS = '0x36e344b4bAD3828772A52703e5DaA88aA1266CF3'
export const SUBPLUGIN_ADDRESS = '0x159B550f49873A09c2543eE311711E434e36ec50'
export const FASTPLUGIN_ADDRESS = '0x3Fc41AdDd93ff57e43c2cba4c53a13c2c434427B'

export const getNetworkAddress = (chainId: number) => {
  if (chainId == -1) {
    return ADDRESS.GOERLI_TESTNET
  } else {
    if (chainId == NETWORKS.GOERLI_TESTNET.chainId) return ADDRESS.GOERLI_TESTNET
    else if (chainId == NETWORKS.BSC_TESTNET.chainId) return ADDRESS.BSC_TESTNET
    else throw Error(`Invalid network ${chainId}`)
  }

  // else
  // 	return {
  // 		ROLES_CONTRACT_ADDRESS: "",
  // 		SUPPLY_CHAIN_CONTRACT_ADDRESS: "",
  // 		SHIPMENT_CONTRACT_ADDRESS: "",
  // 		PRODUCT_CONTRACT_ADDRESS: "",
  // 		PRICING_CONTRACT_ADDRESS: "",
  // 		SBT_CONTRACT_ADDRESS: "",
  // 	};
}
