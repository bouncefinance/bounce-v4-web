import { useSingleCallResult } from 'state/multicall/hooks'
import { Contract } from '@ethersproject/contracts'
import { Currency } from 'constants/token/currency'
import { CurrencyAmount } from 'constants/token/fractions/currencyAmount'
import { useMemo } from 'react'
import { ChainId } from 'constants/chain'
import { CoinResultType, FinalAllocationType, PoolInfoType } from 'bounceHooks/launchpad/useLaunchpadCoinInfo'

export const useGetStakingAuctionInfo = (contract: Contract | null, poolId: number, account: string | undefined) => {
  const chainId = ChainId.MAINNET
  const poolInfo = useSingleCallResult(contract, 'pools', [poolId], undefined, chainId)
  const totalStake = useSingleCallResult(contract, 'amountCommitted1', [poolId], undefined, chainId)
  const totalParticipants = useSingleCallResult(contract, 'participantCount', [poolId], undefined, chainId)
  const myTotalStake = useSingleCallResult(contract, 'myAmountCommitted1', [account, poolId], undefined, chainId)
  const swappedtoken0 = useSingleCallResult(contract, 'completedCommitment', [poolId], undefined, chainId)
  const myToken1Claimed = useSingleCallResult(contract, 'myToken1Claimed', [account, poolId], undefined, chainId)
  const finalAllocation = useSingleCallResult(contract, 'finalAllocation', [poolId, account], undefined, chainId)
  const claimedToken0 = useSingleCallResult(contract, 'myToken0Claimed', [account, poolId], undefined, chainId)
  const creatorClaimed = useSingleCallResult(contract, 'creatorClaimed', [poolId], undefined, chainId)

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
    if (creatorClaimed.result) {
      result.creatorClaimed = creatorClaimed.result[0]
    }
    return result
  }, [
    claimedToken0.result,
    creatorClaimed.result,
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
export const useTokenInfo = () => {
  const token0 = new Currency(ChainId.MAINNET, '0xC881255e4D639B42E326158c7b8ccb7F33459261', 18, 'AMMX', 'AMMX')
  const token1 = new Currency(ChainId.MAINNET, '0xA9B1Eb5908CfC3cdf91F9B8B3a74108598009096', 18, 'AUCTION', 'AUCTION')
  const token0Amount = CurrencyAmount.fromAmount(token0, '472500000000000000000000000')
  return { token0Amount, token1 }
}
