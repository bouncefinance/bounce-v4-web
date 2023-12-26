import { PoolType, RandomSelectionNFTProps } from 'api/pool/type'
import { Currency } from 'constants/token'
import { useActiveWeb3React } from 'hooks'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useRandomSelectionNFTContract } from 'hooks/useContract'
import { useMemo } from 'react'
import { useBackedPoolInfo } from './usePoolInfo'

const useRandomSelectionNFTPoolInfo = (backedId?: number) => {
  const { data: poolInfo, run: getPoolInfo, loading } = useBackedPoolInfo(PoolType.LOTTERY_NFT, backedId)

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
      totalShare: poolsInfo?.nShares,
      maxPlayere: poolsInfo?.maxPlayer,
      curPlayer: playerCount.result?.[0].toString() || 0,
      creatorClaimed: creatorClaimRes?.result?.[0] || false
    }
  }, [
    poolInfo,
    myClaimedRes,
    poolsInfo?.mintContract,
    poolsInfo?.nShares,
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

export default useRandomSelectionNFTPoolInfo
