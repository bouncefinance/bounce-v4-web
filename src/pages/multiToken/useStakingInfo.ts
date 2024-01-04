import { useSingleCallResult } from 'state/multicall/hooks'
import { Contract } from '@ethersproject/contracts'
import { useMemo } from 'react'
import { ChainId } from 'constants/chain'
import {
  FinalAllocationType,
  MultiTokenPoolInfoType,
  MultiTokenResultType
} from 'bounceHooks/launchpad/useLaunchpadCoinInfo'

export const useGetStakingAuctionInfo = (contract: Contract | null, poolId: number, account: string | undefined) => {
  const chainId = ChainId.SEPOLIA
  // const chainId = ChainId.MAINNET
  const poolInfo = useSingleCallResult(contract, 'pools', [poolId], undefined, chainId)
  const totalStake = useSingleCallResult(contract, 'getToken1Amounts', [poolId], undefined, chainId)
  const totalParticipants = useSingleCallResult(contract, 'participantCount', [poolId], undefined, chainId)
  const swappedtoken0 = useSingleCallResult(contract, 'completedCommitment', [poolId], undefined, chainId)
  const myToken1Claimed = useSingleCallResult(contract, 'myToken1Claimed', [account, poolId], undefined, chainId)
  const finalAllocation = useSingleCallResult(contract, 'finalAllocation', [poolId, account], undefined, chainId)
  const claimedToken0 = useSingleCallResult(contract, 'myToken0Claimed', [account, poolId], undefined, chainId)
  const creatorClaimed = useSingleCallResult(contract, 'creatorClaimed', [poolId], undefined, chainId)

  const coinInfo = useMemo<MultiTokenResultType | undefined>(() => {
    const result: MultiTokenResultType = {}
    if (poolInfo.result) {
      const _poolInfo: MultiTokenPoolInfoType = {
        amountTotal0: poolInfo.result.amountTotal0,
        closeAt: poolInfo.result.closeAt,
        creator: poolInfo.result.creator,
        openAt: poolInfo.result.openAt,
        releaseAt: poolInfo.result.releaseAt,
        releaseDuration: poolInfo.result.releaseDuration,
        token0: poolInfo.result.token0,
        quoteAmountTotal1: poolInfo.result.quoteAmountTotal1
      }
      result.poolInfo = _poolInfo
    }
    if (totalStake.result) {
      result.token1StakedAmount = totalStake.result[0]
    }
    if (totalParticipants.result) {
      result.totalParticipants = totalParticipants.result[0]
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
    if (creatorClaimed.result) {
      result.creatorClaimed = creatorClaimed.result[0]
    }
    return result
  }, [
    claimedToken0.result,
    creatorClaimed.result,
    finalAllocation.result,
    myToken1Claimed.result,
    poolInfo.result,
    swappedtoken0.result,
    totalParticipants.result,
    totalStake.result
  ])
  return coinInfo
}
