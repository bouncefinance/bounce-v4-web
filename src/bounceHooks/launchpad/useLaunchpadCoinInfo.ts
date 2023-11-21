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
type FinalAllocationType = {
  mySwappedAmount0: BigNumber
  myUnSwappedAmount1: BigNumber
}
export type CoinResultType = {
  poolInfo?: PoolInfoType
  token1Amount?: BigNumber
  totalParticipants?: BigNumber
  myToken1Amount?: BigNumber
  swappedtoken0?: BigNumber
  myToken1Claimed?: boolean
  finalAllocation?: FinalAllocationType
  claimedToken0?: BigNumber
}
export const useGetLaunchpadCoinInfo = (contract: Contract | null, poolId: number, account: string | undefined) => {
  const poolInfo = useSingleCallResult(contract, 'pools', [poolId])
  const totalStake = useSingleCallResult(contract, 'amountCommitted1', [poolId])
  const totalParticipants = useSingleCallResult(contract, 'participantCount')
  const myTotalStake = useSingleCallResult(contract, 'myAmountCommitted1', [account, poolId])
  const swappedtoken0 = useSingleCallResult(contract, 'completedCommitment', [poolId])
  const myToken1Claimed = useSingleCallResult(contract, 'myToken1Claimed', [account, poolId])
  const finalAllocation = useSingleCallResult(contract, 'finalAllocation', [poolId, account])
  const claimedToken0 = useSingleCallResult(contract, 'myToken0Claimed', [account, poolId])

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
    if (totalStake.result) {
      result.token1Amount = totalStake.result[0]
    }
    if (totalParticipants.result) {
      result.totalParticipants = totalParticipants.result[0]
    }
    if (myTotalStake.result) {
      result.myToken1Amount = myTotalStake.result[0]
    }
    if (swappedtoken0.result) {
      result.swappedtoken0 = swappedtoken0.result[0]
    }
    if (myToken1Claimed.result) {
      result.myToken1Claimed = myToken1Claimed.result[0]
    }
    if (finalAllocation.result) {
      result.finalAllocation = {
        mySwappedAmount0: finalAllocation.result[0],
        myUnSwappedAmount1: finalAllocation.result[1]
      } as FinalAllocationType
    }
    if (claimedToken0.result) {
      result.claimedToken0 = claimedToken0.result[0]
    }
    return result
  }, [
    claimedToken0.result,
    finalAllocation.result,
    myToken1Claimed.result,
    myTotalStake.result,
    poolInfo.result,
    swappedtoken0.result,
    totalParticipants.result,
    totalStake.result
  ])

  return coinInfo
}
export const useCoinToken0 = () => {
  const token0 = SEPOLIA_TOKEN_LIST[1]
  const token1 = SEPOLIA_TOKEN_LIST[2]
  const token0Currency = new Currency(token0.chainId as any, token0.address, token0.decimals, token0.symbol)
  const token0Amount = CurrencyAmount.fromAmount(token0Currency, 200000)
  return { token0Amount, token1 }
}
