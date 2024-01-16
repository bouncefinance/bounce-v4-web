import { useMemo } from 'react'
import { useActiveWeb3React } from '.'
import { ChainId } from '../constants/chain'
import { useUniV3QuoterContract } from './useContract'
import { useRequest } from 'ahooks'
import { USDC } from 'constants/uniswap'
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
      refreshDeps: [chainId, tokenAddress, fee, contract],
      pollingInterval: 5000
    }
  )

  return data ? BigNumber(1).dividedBy(BigNumber(data)).times(`1e${tokenDecimals}`) : undefined
}
