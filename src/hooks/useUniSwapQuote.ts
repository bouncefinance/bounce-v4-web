import { useMemo } from 'react'
import { useActiveWeb3React } from '.'
import { ChainId } from '../constants/chain'
import { useUniV3QuoterContract } from './useContract'
import { useRequest } from 'ahooks'
import { USDC, WETH } from 'constants/uniswap'
import { Currency, CurrencyAmount } from 'constants/token'
import BigNumber from 'bignumber.js'

export function useUSDCQuoteSinglePrice(
  tokenAddress: string | undefined,
  tokenDecimals: number | undefined,
  fee: string | undefined,
  queryChainId?: ChainId | undefined
) {
  const { chainId: _chainId } = useActiveWeb3React()
  const chainId = useMemo(() => queryChainId || _chainId, [_chainId, queryChainId])
  const contract = useUniV3QuoterContract(chainId)

  const { data } = useRequest(
    async () => {
      const usdc = chainId ? USDC[chainId] : undefined
      if (!tokenAddress || !fee || !contract || !usdc || !chainId) {
        return undefined
      }

      try {
        const usdcCurrency = new Currency(chainId, usdc.address, usdc.decimals, usdc.symbol, usdc.name)
        const oneUsdc = CurrencyAmount.fromAmount(usdcCurrency, 1)?.raw.toString() as string

        const ret = await contract.callStatic.quoteExactInputSingle([usdc.address, tokenAddress, oneUsdc, fee, 0])
        return ret?.[0].toString()
      } catch (error) {
        console.log('🚀fdasfdafdasafsd ~ error:2222', error)
        return undefined
      }
    },
    {
      refreshDeps: [chainId, tokenAddress, fee, contract]
    }
  )

  return data
    ? BigNumber(1)
        .dividedBy(BigNumber(data))
        .times(`1e${tokenDecimals || 0}`)
    : undefined
}

export function useToken0QuoteForETH(
  tokenAddress: string | undefined,
  tokenDecimals: number | undefined,
  fee: string | undefined,
  queryChainId?: ChainId | undefined
) {
  const { chainId: _chainId } = useActiveWeb3React()
  const chainId = useMemo(() => queryChainId || _chainId, [_chainId, queryChainId])
  const contract = useUniV3QuoterContract(chainId)

  const { data } = useRequest(
    async () => {
      const weth = chainId ? WETH[chainId] : undefined
      if (!tokenAddress || !fee || !contract || !chainId || !tokenDecimals || !weth) {
        return undefined
      }

      try {
        const currency = new Currency(chainId, tokenAddress, tokenDecimals)
        const oneCurrency = CurrencyAmount.fromAmount(currency, 1)?.raw.toString() as string

        const ret = await contract.callStatic.quoteExactInputSingle([tokenAddress, weth.address, oneCurrency, fee, 0])
        return ret?.[0].toString()
      } catch (error) {
        console.log('🚀fdasfdafdasafsd ~ error:2222', error)
        return undefined
      }
    },
    {
      refreshDeps: [chainId, tokenAddress, fee, contract]
    }
  )

  return data ? BigNumber(data).dividedBy(`1e${tokenDecimals}`) : undefined
}

export function useTokenPriceByUni(
  token0Address: string | undefined,
  token0Decimals: number | undefined,
  token1Address: string | undefined,
  token1Decimals: number | undefined,
  fee: string | undefined,
  queryChainId?: ChainId | undefined
) {
  const { chainId: _chainId } = useActiveWeb3React()
  const chainId = useMemo(() => queryChainId || _chainId, [_chainId, queryChainId])
  const weth = useMemo(() => (chainId ? WETH[chainId] : undefined), [chainId])

  const token0IsWETH = useMemo(
    () => weth?.address.toLowerCase() === token0Address?.toLowerCase(),
    [token0Address, weth?.address]
  )

  const ethPrice = useUSDCQuoteSinglePrice(
    token0IsWETH ? token0Address : token1Address,
    token0IsWETH ? token0Decimals : token1Decimals,
    fee,
    chainId
  )

  const tokenForEth = useToken0QuoteForETH(
    token0IsWETH ? token1Address : token0Address,
    token0IsWETH ? token1Decimals : token0Decimals,
    fee,
    chainId
  )

  return useMemo(() => {
    if (!ethPrice || !tokenForEth) return [undefined, undefined]
    const tokenPrice = ethPrice.times(tokenForEth)
    return token0IsWETH ? [ethPrice, tokenPrice] : [tokenPrice, ethPrice]
  }, [ethPrice, token0IsWETH, tokenForEth])
}
