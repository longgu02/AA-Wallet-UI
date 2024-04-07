import { BrowserProvider, Contract } from 'ethers'
import { ERC20_ABI } from 'src/constant/abis/erc20Abi'
import { ERC20_TOKEN_ADDRESSES } from 'src/constant/addresses'

export const getBalance = async (provider: BrowserProvider, erc20TokenAddress: string, address: string) => {
  const tokenContract = new Contract(erc20TokenAddress, ERC20_ABI, provider)
  const balance = await tokenContract.balanceOf(address)

  return balance
}

export const fetchAllBalance = async (provider: BrowserProvider, address: string) => {
  // const weenusBalance = await getBalance(provider, ERC20_TOKEN_ADDRESSES.weenus, address)
  // const testBalance = await getBalance(provider, ERC20_TOKEN_ADDRESSES['6test'], address)
  const nativeBalance = await provider.getBalance(address)
  console.log(address)

  // return { ETH: nativeBalance, weenus: weenusBalance, ['6test']: testBalance }
  return { ETH: nativeBalance }
}
