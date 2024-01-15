import { PoolType, RandomPoolStatus, RandomSelectionNFTProps, RandomSelectionNFTResultProps } from 'api/pool/type'
import { useActiveWeb3React } from 'hooks'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useRandomSelectionLPContract } from 'hooks/useContract'
import { useMemo } from 'react'
import { useBackedPoolInfo } from './usePoolInfo'
import {
  useIsJoinedRandomSelectionPool,
  useIsWinnerForRandomSelectionPool,
  useIsWinnerSeedDone
} from 'hooks/useRandomSelectionPool'
import { useRequest } from 'ahooks'
import { getCurrentTimeStamp } from 'utils'
import { useTokens } from 'state/wallet/hooks'

const useRandomSelectionNFTPoolInfo = (backedId?: number) => {
  const _backedId = backedId
  const {
    data: poolInfo,
    run: getPoolInfo,
    loading
  } = useBackedPoolInfo(PoolType.RANDOM_SELECTION_LP, Number(_backedId))
  const contract = useRandomSelectionLPContract(poolInfo?.contract || '', poolInfo?.ethChainId)
  const { account } = useActiveWeb3React()
  const myClaimedRes = useSingleCallResult(
    contract,
    'myClaimed',
    [account || undefined, poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const playerCount = useSingleCallResult(
    contract,
    'getPlayerCount',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  )
  const creatorClaimRes = useSingleCallResult(
    contract,
    'creatorClaimed',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  )
  const tokensInfo = useSingleCallResult(
    contract,
    'getBetInfo',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result

  const poolsInfo = useSingleCallResult(contract, 'pools', [poolInfo?.poolId], undefined, poolInfo?.ethChainId).result
  const token1Currency = useTokens(tokensInfo?.[0] ?? [], poolInfo?.ethChainId)

  const data: RandomSelectionNFTProps | undefined = useMemo(() => {
    if (!poolInfo || !token1Currency) return undefined

    return {
      ...poolInfo,
      token1: {
        ...poolInfo.token1,
        symbol: poolInfo.token1.symbol.toUpperCase()
      },
      participant: {
        ...poolInfo.participant,
        claimed: myClaimedRes?.[0] || poolInfo.participant.claimed
      },
      mintContractAddress: poolsInfo?.mintContract,
      totalShare: poolsInfo?.nShare,
      maxPlayere: poolsInfo?.maxPlayer,
      burnedTokens: tokensInfo?.[2],
      tokensAddress: tokensInfo?.[0],
      betTokenAmount: tokensInfo?.[1],
      token1Currency: token1Currency,
      curPlayer: playerCount.result?.[0].toString() || 0,
      creatorClaimed: creatorClaimRes?.result?.[0] || false
    }
  }, [
    poolInfo,
    myClaimedRes,
    poolsInfo?.mintContract,
    poolsInfo?.nShare,
    poolsInfo?.maxPlayer,
    tokensInfo,
    token1Currency,
    playerCount.result,
    creatorClaimRes?.result
  ])

  return {
    loading,
    run: getPoolInfo,
    data
  }
}

export const useGetRandomSelectionNFTPoolStatus = (
  poolInfo: RandomSelectionNFTProps
): RandomSelectionNFTResultProps => {
  const { account } = useActiveWeb3React()
  const { participant, claimAt, openAt, closeAt } = poolInfo
  const isJoined = useIsJoinedRandomSelectionPool(poolInfo.poolId, account, poolInfo.contract, poolInfo.ethChainId)
  const isWinnerSeedDone = useIsWinnerSeedDone(
    poolInfo.poolId,
    poolInfo.contract,
    PoolType.LOTTERY_BURNING,
    poolInfo.ethChainId
  )
  const { isWinner } = useIsWinnerForRandomSelectionPool(
    poolInfo.poolId,
    account,
    poolInfo.contract,
    isWinnerSeedDone,
    PoolType.LOTTERY_BURNING,
    poolInfo.ethChainId
  )
  const { claimed } = participant
  const { data } = useRequest(
    async () => {
      const now = getCurrentTimeStamp()
      if (now < openAt) {
        return RandomPoolStatus.Upcoming
      }
      if (now > openAt && now < closeAt) {
        return RandomPoolStatus.Live
      }
      if (now > closeAt && now < claimAt) {
        return isWinnerSeedDone ? RandomPoolStatus.OpenSeed : RandomPoolStatus.Waiting
      }
      if (!isWinnerSeedDone) return RandomPoolStatus.Waiting
      return RandomPoolStatus.Closed
    },
    {
      pollingInterval: 2000,
      refreshDeps: [claimAt, openAt, closeAt, isWinnerSeedDone]
    }
  )
  return useMemo(
    () => ({
      poolStatus: data || RandomPoolStatus.Upcoming,
      isUserClaimed: claimed,
      isUserJoined: isJoined,
      isWinnerSeedDone,
      isUserWinner: isWinner
    }),
    [claimed, data, isJoined, isWinner, isWinnerSeedDone]
  )
}

export default useRandomSelectionNFTPoolInfo
