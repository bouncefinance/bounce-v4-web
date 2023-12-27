import { PoolType, RandomPoolStatus, RandomSelectionNFTProps, RandomSelectionNFTResultProps } from 'api/pool/type'
import { Currency } from 'constants/token'
import { useActiveWeb3React } from 'hooks'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useRandomSelectionNFTContract } from 'hooks/useContract'
import { useMemo } from 'react'
import { useBackedPoolInfo } from './usePoolInfo'
import {
  useIsJoinedRandomSelectionPool,
  useIsWinnerForRandomSelectionPool,
  useIsWinnerSeedDone
} from 'hooks/useRandomSelectionPool'
import { useRequest } from 'ahooks'
import { getCurrentTimeStamp } from 'utils'

const useRandomSelectionNFTPoolInfo = (backedId?: number) => {
  const { data: poolInfo, run: getPoolInfo, loading } = useBackedPoolInfo(PoolType.LOTTERY_NFT, backedId || 21163) //21161

  const contract = useRandomSelectionNFTContract(poolInfo?.contract || '', poolInfo?.ethChainId)
  const { account } = useActiveWeb3React()
  const myClaimedRes = useSingleCallResult(
    contract,
    'myClaimed',
    [account || undefined, poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const playerCount = useSingleCallResult(contract, 'getPlayerCount', [poolInfo?.poolId])
  const creatorClaimRes = useSingleCallResult(contract, 'creatorClaimed', [poolInfo?.poolId])
  const poolsInfo = useSingleCallResult(contract, 'pools', [poolInfo?.poolId]).result

  const data: RandomSelectionNFTProps | undefined = useMemo(() => {
    if (!poolInfo) return undefined
    const _t1 = poolInfo.token1
    const t1 = new Currency(poolInfo.ethChainId, _t1.address, _t1.decimals, _t1.symbol, _t1.name, _t1.smallUrl)

    return {
      ...poolInfo,
      userTokenAmount: t1,
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
      curPlayer: playerCount.result?.[0].toString() || 0,
      creatorClaimed: creatorClaimRes?.result?.[0] || false
    }
  }, [
    poolInfo,
    myClaimedRes,
    poolsInfo?.mintContract,
    poolsInfo?.nShare,
    poolsInfo?.maxPlayer,
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
    PoolType.LOTTERY_NFT,
    poolInfo.ethChainId
  )
  const { isWinner } = useIsWinnerForRandomSelectionPool(
    poolInfo.poolId,
    account,
    poolInfo.contract,
    isWinnerSeedDone,
    PoolType.LOTTERY_NFT,
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
