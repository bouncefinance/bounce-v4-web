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

  return useMemo(
    () =>
      data
        ? BigNumber(1)
            .dividedBy(BigNumber(data))
            .times(`1e${tokenDecimals || 0}`)
        : undefined,
    [data, tokenDecimals]
  )
}

export function useTokenAQuoteTokenB(
  pricingToken: {
    tokenAddress: string | undefined
    tokenDecimals: number | undefined
  },
  quoteToken: {
    tokenAddress: string | undefined
    tokenDecimals: number | undefined
  },
  fee: string | undefined,
  queryChainId?: ChainId | undefined
) {
  const { chainId: _chainId } = useActiveWeb3React()
  const chainId = useMemo(() => queryChainId || _chainId, [_chainId, queryChainId])
  const contract = useUniV3QuoterContract(chainId)

  const { data } = useRequest(
    async () => {
      if (
        !pricingToken.tokenAddress ||
        !pricingToken.tokenDecimals ||
        !quoteToken.tokenAddress ||
        !quoteToken.tokenDecimals ||
        !fee ||
        !contract ||
        !chainId
      ) {
        return undefined
      }

      try {
        const currency = new Currency(chainId, quoteToken.tokenAddress, quoteToken.tokenDecimals)
        const oneCurrency = CurrencyAmount.fromAmount(currency, 1)?.raw.toString() as string

        const ret = await contract.callStatic.quoteExactInputSingle([
          quoteToken.tokenAddress,
          pricingToken.tokenAddress,
          oneCurrency,
          fee,
          0
        ])
        return ret?.[0].toString()
      } catch (error) {
        console.log('🚀fdasfdafdasafsd ~ error:2222', error)
        return undefined
      }
    },
    {
      refreshDeps: [
        pricingToken.tokenAddress,
        pricingToken.tokenDecimals,
        quoteToken.tokenAddress,
        quoteToken.tokenDecimals,
        fee,
        contract,
        chainId
      ]
    }
  )

  return useMemo(
    () => (data ? BigNumber(data).dividedBy(`1e${quoteToken.tokenDecimals || 0}`) : undefined),
    [data, quoteToken.tokenDecimals]
  )
}

export function useTokenPriceByUni(
  token0Address: string | undefined,
  token0Decimals: number | undefined,
  token1Address: string | undefined,
  token1Decimals: number | undefined,
  fee: string | undefined,
  queryChainId?: ChainId | undefined
): {
  token0Price: BigNumber | undefined
  token1Price: BigNumber | undefined
  singleQuoteTokenNumber: BigNumber | undefined
} {
  const { chainId: _chainId } = useActiveWeb3React()
  const chainId = useMemo(() => queryChainId || _chainId, [_chainId, queryChainId])

  const _pricingAddresses = useMemo(
    () =>
      chainId
        ? ([WETH[chainId]?.address.toLowerCase(), USDC[chainId]?.address.toLowerCase()].filter(i => i) as string[])
        : [],
    [chainId]
  )

  const [pricingToken, quoteToken]: {
    tokenAddress: string | undefined
    tokenDecimals: number | undefined
  }[] = useMemo(() => {
    if (!chainId) throw new Error('UnSupported chainId')
    if (!token0Address || !token0Decimals || !token1Address || !token1Decimals)
      return [
        {
          tokenAddress: undefined,
          tokenDecimals: undefined
        },
        {
          tokenAddress: undefined,
          tokenDecimals: undefined
        }
      ]
    if (
      !_pricingAddresses.includes(token0Address?.toLowerCase()) &&
      !_pricingAddresses.includes(token1Address?.toLowerCase())
    ) {
      throw new Error('UnSupported pricingToken')
    }
    const _token0IsPricing = _pricingAddresses.includes(token0Address?.toLowerCase())
    return [
      {
        tokenAddress: _token0IsPricing ? token0Address : token1Address,
        tokenDecimals: _token0IsPricing ? token0Decimals : token1Decimals
      },
      {
        tokenAddress: _token0IsPricing ? token1Address : token0Address,
        tokenDecimals: _token0IsPricing ? token1Decimals : token0Decimals
      }
    ]
  }, [_pricingAddresses, chainId, token0Address, token0Decimals, token1Address, token1Decimals])

  const pricingPrice = useUSDCQuoteSinglePrice(pricingToken.tokenAddress, pricingToken.tokenDecimals, fee, chainId)

  const quoteTokenNumber = useTokenAQuoteTokenB(
    {
      tokenAddress: pricingToken.tokenAddress,
      tokenDecimals: pricingToken.tokenDecimals
    },
    { tokenAddress: quoteToken.tokenAddress, tokenDecimals: quoteToken.tokenDecimals },
    fee,
    chainId
  )

  return useMemo(() => {
    if (!pricingPrice || !quoteTokenNumber)
      return {
        token0Price: undefined,
        token1Price: undefined,
        singleQuoteTokenNumber: undefined
      }
    const tokenPrice = pricingPrice.times(quoteTokenNumber)
    const _token0IsPricing = token0Address && _pricingAddresses.includes(token0Address.toLowerCase())

    return {
      token0Price: _token0IsPricing ? pricingPrice : tokenPrice,
      token1Price: _token0IsPricing ? tokenPrice : pricingPrice,
      singleQuoteTokenNumber: quoteTokenNumber
    }
  }, [pricingPrice, quoteTokenNumber, token0Address, _pricingAddresses])
}
