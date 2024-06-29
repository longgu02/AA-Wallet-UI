import axios from 'axios'
import { AlchemyProvider, BrowserProvider, Contract } from 'ethers'
import { ERC20_ABI } from 'src/constant/abis/erc20Abi'
import { ERC20_TOKEN_ADDRESSES } from 'src/constant/addresses'

export const getBalance = async (
  provider: BrowserProvider | AlchemyProvider,
  erc20TokenAddress: string,
  address: string
) => {
  const tokenContract = new Contract(erc20TokenAddress, ERC20_ABI, provider)
  const balance = await tokenContract.balanceOf(address)

  return balance
}

export const fetchAllBalanceTable = async (address: string) => {
  // const weenusBalance = await getBalance(provider, ERC20_TOKEN_ADDRESSES.weenus, address)
  // const testBalance = await getBalance(provider, ERC20_TOKEN_ADDRESSES['6test'], address)
  const provider = new AlchemyProvider(11155111, process.env.NEXT_PUBLIC_ALCHEMY_API_KEY)
  const nativeBalance = await provider.getBalance(address)
  const uniBalance = await getBalance(provider, ERC20_TOKEN_ADDRESSES.uni, address)
  console.log(address)

  // return { ETH: nativeBalance, weenus: weenusBalance, ['6test']: testBalance }
  return { ETH: nativeBalance, UNI: uniBalance }
}

export const fetchNTFOwned = async (address: string) => {
  const baseUrl = `https://eth-sepolia.g.alchemy.com/nft/v3/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`
  const nftOwned = await axios.get(`${baseUrl}/getNFTsForOwner?owner=${address}`)

  return nftOwned.data.ownedNfts
}

export const fetchAllBalance = async (address: string) => {
  // const weenusBalance = await getBalance(provider, ERC20_TOKEN_ADDRESSES.weenus, address)
  // const testBalance = await getBalance(provider, ERC20_TOKEN_ADDRESSES['6test'], address)
  // const bundler = new JsonRpcProvider(`https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`)
  const provider = new AlchemyProvider(11155111, process.env.NEXT_PUBLIC_ALCHEMY_API_KEY)
  const nativeBalance = await provider.getBalance(address)
  const uniBalance = await getBalance(provider, ERC20_TOKEN_ADDRESSES.uni, address)
  const ethPrice = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD`)
  const uniPrice = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=UNI&tsyms=USD`)
  console.log(address)

  // return { ETH: nativeBalance, weenus: weenusBalance, ['6test']: testBalance }
  return [
    { name: 'ETH', balance: nativeBalance, price: ethPrice.data.USD },
    { name: 'UNI', balance: uniBalance, price: uniPrice.data.USD }
  ]
}
