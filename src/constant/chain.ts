import { AlchemyProvider, JsonRpcProvider } from 'ethers'
import { ADDRESS } from './address'

export interface NetworksType {
  [key: string]: {
    chainId: number
    hexChainId: string
    blockExplorerUrls: Array<string>
    metadata: {
      chainName: string
      shortName: string
      image: string
    }
    nativeCurrency: {
      name: string
      symbol: string
      decimals: number
    }
    // openSeaURL: string;
  }
}

export const NETWORKS: NetworksType = {
  GOERLI_TESTNET: {
    chainId: 5,
    hexChainId: '0x38',
    blockExplorerUrls: ['https://goerli.etherscan.io/'],
    metadata: {
      chainName: 'Goerli Testnet',
      shortName: 'GoerliETH',
      image:
        'https://assets-global.website-files.com/5f973c970bea5548ad4287ef/61e70d05f3c7146ab79e66bb_ethereum-eth.svg'
    },
    nativeCurrency: {
      name: 'ETH',
      symbol: 'ETH',
      decimals: 18
    }
    // openSeaURL: `https://testnets.opensea.io/assets/goerli/${ADDRESS.GOERLI_TESTNET.SBT_CONTRACT_ADDRESS}/`, //:id
  },
  BSC_TESTNET: {
    chainId: 97,
    hexChainId: '0xfa',
    blockExplorerUrls: ['https://bscscan.com/'],
    metadata: {
      chainName: 'BSC Testnet',
      shortName: 'BSC',
      image: 'https://umbria.network/assets/images/icon/bsclogo.png?v1'
    },
    nativeCurrency: {
      name: 'BNB',
      symbol: 'BNB',
      decimals: 18
    }
  }
}

export const getJsonRpcProvider = (): JsonRpcProvider => {
  const ALCHEMY_API_KEY = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY

  // `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`
  // const provider = new JsonRpcProvider()
  const provider = new AlchemyProvider(11155111, ALCHEMY_API_KEY)

  // const provider = new JsonRpcProvider('http://localhost:8545')

  // console.log('aaaa', ALCHEMY_API_KEY)

  return provider
}

export const getNetworkInfo = (chainId: number) => {
  if (chainId == NETWORKS.GOERLI_TESTNET.chainId) return NETWORKS.GOERLI_TESTNET
  else if (chainId == NETWORKS.BSC_TESTNET.chainId) return NETWORKS.BSC_TESTNET
  // else throw Error("Invalid network");
  return undefined
}
