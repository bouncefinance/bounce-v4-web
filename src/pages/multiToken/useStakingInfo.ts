import { useSingleCallResult } from 'state/multicall/hooks'
import { Contract } from '@ethersproject/contracts'
import { useMemo } from 'react'
import { ChainId } from 'constants/chain'
import {
  FinalAllocationType,
  MultiTokenPoolInfoType,
  MultiTokenResultType,
  PoolStakeToken1WeightMapType,
  TotalStakeToken1Type,
  UserStakeToken1WeightMapType
} from 'bounceHooks/launchpad/useLaunchpadCoinInfo'
import { useTokens } from 'state/wallet/hooks'
import { Currency, CurrencyAmount } from 'constants/token'

export const useGetStakingAuctionInfo = (contract: Contract | null, poolId: number, account: string | undefined) => {
  const chainId = ChainId.SEPOLIA
  // const chainId = ChainId.MAINNET
  const poolInfo = useSingleCallResult(contract, 'pools', [poolId], undefined, chainId)
  const totalStake = useSingleCallResult(contract, 'getToken1Amounts', [poolId], undefined, chainId)
  const totalParticipants = useSingleCallResult(contract, 'participantCount', [poolId], undefined, chainId)
  const myToken1Claimed = useSingleCallResult(contract, 'myToken1Claimed', [account, poolId], undefined, chainId)
  const finalAllocation = useSingleCallResult(contract, 'finalAllocation', [poolId, account], undefined, chainId)
  const claimedToken0 = useSingleCallResult(contract, 'myToken0Claimed', [account, poolId], undefined, chainId)
  const myStakeToken1WeightAmountMapRes = useSingleCallResult(
    contract,
    'getMyToken1WeightAmountMap',
    [poolId, account],
    undefined,
    chainId
  )
  const poolToken1WeightAmountMapRes = useSingleCallResult(
    contract,
    'getPoolToken1WeightAmountMap',
    [poolId],
    undefined,
    chainId
  )
  const creatorClaimed = useSingleCallResult(contract, 'creatorClaimed', [poolId], undefined, chainId)

  const token1sAddress = useMemo(() => {
    if (!totalStake.result?.[0]) return [undefined]
    return totalStake.result[0]
  }, [totalStake.result])
  const token1sCurrency = useTokens(token1sAddress, chainId)

  const [poolStakeToken1WeightAmounts, myStakeToken1WeightAmounts] = useMemo(() => {
    if (
      !token1sCurrency ||
      token1sCurrency.some(i => !i) ||
      !poolToken1WeightAmountMapRes.result?.[2] ||
      !myStakeToken1WeightAmountMapRes.result?.[2]
    ) {
      return []
    }
    const poolStakeToken1WeightAmounts = token1sCurrency.map((cr, id) =>
      CurrencyAmount.fromRawAmount(cr as Currency, poolToken1WeightAmountMapRes.result?.[2][id])
    )
    const myStakeToken1WeightAmounts = token1sCurrency.map((cr, id) =>
      CurrencyAmount.fromRawAmount(cr as Currency, myStakeToken1WeightAmountMapRes.result?.[2][id])
    )
    return [poolStakeToken1WeightAmounts, myStakeToken1WeightAmounts]
  }, [myStakeToken1WeightAmountMapRes.result, poolToken1WeightAmountMapRes.result, token1sCurrency])

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
      result.token1StakedStats = {
        stakeTokenAddress: totalStake.result[0],
        totalStakeAmount: totalStake.result[1]
      } as TotalStakeToken1Type
    }
    if (myStakeToken1WeightAmountMapRes.result) {
      result.myStakeToken1WeightAmountMap = {
        myStakeToken1WeightTokenAddr: myStakeToken1WeightAmountMapRes.result[0],
        myStakeToken1Weight: myStakeToken1WeightAmountMapRes.result[1],
        myStakeToken1WeightAmounts: myStakeToken1WeightAmounts
      } as UserStakeToken1WeightMapType
    }
    if (poolToken1WeightAmountMapRes.result) {
      result.poolStakeToken1WeightAmountMap = {
        poolStakeToken1WeightTokenAddr: poolToken1WeightAmountMapRes.result[0],
        poolStakeToken1Weight: poolToken1WeightAmountMapRes.result[1],
        poolStakeToken1WeightAmounts: poolStakeToken1WeightAmounts
      } as PoolStakeToken1WeightMapType
    }
    if (totalParticipants.result) {
      result.totalParticipants = totalParticipants.result[0]
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
    myStakeToken1WeightAmountMapRes.result,
    myStakeToken1WeightAmounts,
    myToken1Claimed.result,
    poolInfo.result,
    poolStakeToken1WeightAmounts,
    poolToken1WeightAmountMapRes.result,
    totalParticipants.result,
    totalStake.result
  ])
  return coinInfo
}
