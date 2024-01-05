import { useSingleCallResult } from 'state/multicall/hooks'
import { Contract } from '@ethersproject/contracts'
import { Currency } from 'constants/token/currency'
import { CurrencyAmount } from 'constants/token/fractions/currencyAmount'
import { useMemo } from 'react'
import { BigNumber } from 'ethers'
import { ChainId } from 'constants/chain'
export type PoolInfoType = {
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
export type MultiTokenPoolInfoType = {
  amountTotal0: BigNumber
  closeAt: number
  creator: string
  openAt: number
  releaseAt: number
  releaseDuration: number
  quoteAmountTotal1: BigNumber
  token0: string
}
export type FinalAllocationType = {
  mySwappedAmount0: BigNumber
  myUnSwappedAmount1: BigNumber
}
export type TotalStakeToken1Type = {
  totalStakeAmount: BigNumber[]
  stakeTokenAddress: string[]
}
export type UserStakeToken1WeightMapType = {
  myStakeToken1WeightTokenAddr: string[]
  myStakeToken1Weight: BigNumber[]
  myStakeToken1WeightAmounts: CurrencyAmount[] | undefined
}
export type PoolStakeToken1WeightMapType = {
  poolStakeToken1WeightTokenAddr: string[]
  poolStakeToken1Weight: BigNumber[]
  poolStakeToken1WeightAmounts: CurrencyAmount[] | undefined
}
export type CoinResultType = {
  poolInfo?: PoolInfoType
  token1Amount?: BigNumber
  totalParticipants?: BigNumber
  myToken1Amount?: BigNumber
  swappedtoken0?: BigNumber
  myToken1Claimed?: boolean
  creatorClaimed?: boolean
  finalAllocation?: FinalAllocationType
  claimedToken0?: BigNumber
}
export type MultiTokenResultType = {
  poolInfo?: MultiTokenPoolInfoType
  totalParticipants?: BigNumber
  myToken1Claimed?: boolean
  creatorClaimed?: boolean
  token1StakedStats?: TotalStakeToken1Type
  myStakeToken1WeightAmountMap?: UserStakeToken1WeightMapType
  poolStakeToken1WeightAmountMap?: PoolStakeToken1WeightMapType
  finalAllocation?: FinalAllocationType
  claimedToken0?: BigNumber
}
export const useGetLaunchpadCoinInfo = (contract: Contract | null, poolId: number, account: string | undefined) => {
  const chainId = ChainId.MAINNET
  const poolInfo = useSingleCallResult(contract, 'pools', [poolId], undefined, chainId)
  const totalStake = useSingleCallResult(contract, 'amountCommitted1', [poolId], undefined, chainId)
  const totalParticipants = useSingleCallResult(contract, 'participantCount', undefined, undefined, chainId)
  const myTotalStake = useSingleCallResult(contract, 'myAmountCommitted1', [account, poolId], undefined, chainId)
  const swappedtoken0 = useSingleCallResult(contract, 'completedCommitment', [poolId], undefined, chainId)
  const myToken1Claimed = useSingleCallResult(contract, 'myToken1Claimed', [account, poolId], undefined, chainId)
  const finalAllocation = useSingleCallResult(contract, 'finalAllocation', [poolId, account], undefined, chainId)
  const claimedToken0 = useSingleCallResult(contract, 'myToken0Claimed', [account, poolId], undefined, chainId)

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
  const token1 = new Currency(ChainId.MAINNET, '0xA9B1Eb5908CfC3cdf91F9B8B3a74108598009096', 18, 'AUCTION', 'AUCTION')
  const token0 = new Currency(ChainId.MAINNET, '0xda31D0d1Bc934fC34F7189E38A413ca0A5e8b44F', 18, 'BSSB', 'BSSB')
  const token0Amount = CurrencyAmount.fromAmount(token0, '6300000000000000000000000')
  return { token0Amount, token1 }
}
