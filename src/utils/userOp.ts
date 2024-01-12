import { BrowserProvider, Contract, JsonRpcProvider, ethers, parseEther, parseUnits } from 'ethers'
import { ERC20_ABI } from 'src/constant/abis/erc20Abi'
import { ERC20_TOKEN_ADDRESSES } from 'src/constant/addresses'
import { UserOpCall } from 'src/types'
import { Client, ICall, Presets } from 'userop'

const rpcUrl = 'https://api.stackup.sh/v1/node/6149257d4d56204640fd8ca4ed940fa4bbfbd716784a3c40e0ab74811515e8ac'
const paymasterUrl =
  'https://api.stackup.sh/v1/paymaster/6149257d4d56204640fd8ca4ed940fa4bbfbd716784a3c40e0ab74811515e8ac'

export const createApproveAndTransferCall = async (
  provider: BrowserProvider,
  value: string,
  to: string,
  erc20TokenAddress: string
) => {
  const erc20 = new Contract(erc20TokenAddress, ERC20_ABI, provider)

  // const decimals = await Promise.all([erc20.decimals()]);
  const amount = parseUnits(value)
  const approve = {
    to: to,
    value: parseEther(value),

    // value: ethers.toBigInt(amount),
    // data: '0x'
    data: erc20.interface.encodeFunctionData('approve', [to, amount])
  }
  const send = {
    to: to,
    // value: ethers.toBigInt(amount),
    value: parseEther(value),
    // data: '0x'
    data: erc20.interface.encodeFunctionData('transfer', [to, amount])
  }

  return [approve, send]
}

export const transferToken = async (provider: BrowserProvider, calls: Array<ICall>, feeToken: string) => {
  // const signer =
  // Token in testnet: 0x3870419Ba2BBf0127060bCB37f69A1b1C090992B
  /* For now, Stackup's paymaster only accepts USDC on mainnets and a special testnet token on testnets. */
  // const call = await createCalls(
  //   new JsonRpcProvider(rpcUrl)
  // );
  console.log('transfer', provider, calls, feeToken)
  const paymasterMiddleware = Presets.Middleware.verifyingPaymaster(paymasterUrl, {
    type: 'payg',
    token: feeToken
  })

  // Sign here
  const builder = await Presets.Builder.Kernel.init(await provider.getSigner(), rpcUrl, { paymasterMiddleware })

  // builder.executeBatch(calls)

  // // console.log(builder.getOp())
  // // console.log(calls)

  const client = await Client.init(rpcUrl)

  // Sign here
  const res = await client.sendUserOperation(
    calls.length === 1 ? builder.execute(calls[0]) : builder.executeBatch(calls),
    {
      onBuild: op => console.log('Signed UserOperation', op)
    }
  )
  console.log(`UserOpHash: ${res.userOpHash}`)
  console.log(`Waiting for transaction...`)
  const ev = await res.wait()
  console.log(`Transaction hash: ${ev?.transactionHash ?? null}`)
}

export const getBalance = async (provider: BrowserProvider, address: string) => {
  const goerliContract = new Contract('0x1B471d9440FE8e256B8b3568d55e84AA2811b9fc', ERC20_ABI, provider)

  return await provider.getBalance('0xAd97db8126589D4001895035216D1977fC0cE49d')
}
