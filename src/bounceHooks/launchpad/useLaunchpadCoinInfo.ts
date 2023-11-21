import { useSingleCallResult } from 'state/multicall/hooks'
import { Contract } from '@ethersproject/contracts'
import { SEPOLIA_TOKEN_LIST } from 'constants/auction'
import { Currency } from 'constants/token/currency'
import { CurrencyAmount } from 'constants/token/fractions/currencyAmount'
import { useMemo } from 'react'
import { BigNumber } from 'ethers'
type PoolInfoType = {
  amountTotal0: BigNumber
  amountTotal1: BigNumber
  closeAt: number
  creator: string
  openAt: number
  releaseAt: number
  releaseDuration: number
  token0: string
  token1: string
}
export type CoinResultType = {
  poolInfo?: PoolInfoType
}
export const useGetLaunchpadCoinInfo = (contract: Contract | null, poolId: number) => {
  const poolInfo = useSingleCallResult(contract, 'pools', [poolId])
  const coinInfo = useMemo<CoinResultType | undefined>(() => {
    const result: CoinResultType = {}
    if (poolInfo.result) {
      const _poolInfo: PoolInfoType = {
        amountTotal0: poolInfo.result.amountTotal0,
        amountTotal1: poolInfo.result.amountTotal1,
        closeAt: poolInfo.result.closeAt,
        creator: poolInfo.result.creator,
        openAt: poolInfo.result.openAt,
        releaseAt: poolInfo.result.releaseAt,
        releaseDuration: poolInfo.result.releaseDuration,
        token0: poolInfo.result.token0,
        token1: poolInfo.result.token1
      }
      result.poolInfo = _poolInfo
    }

    return result
  }, [poolInfo.result])

  return coinInfo
}
export const useCoinToken0 = () => {
  const token1 = SEPOLIA_TOKEN_LIST[1]
  const token1Currency = new Currency(token1.chainId as any, token1.address, token1.decimals, token1.symbol)
  const token1Amount = CurrencyAmount.fromAmount(token1Currency, 200000)
  return token1Amount
}
