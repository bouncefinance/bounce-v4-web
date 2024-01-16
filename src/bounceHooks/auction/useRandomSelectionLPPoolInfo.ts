import { PoolType, RandomPoolStatus, RandomSelectionLPProps, RandomSelectionNFTResultProps } from 'api/pool/type'
import { useActiveWeb3React } from 'hooks'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useContract, useRandomSelectionLPContract, useUniV3PositionContract } from 'hooks/useContract'
import { useMemo } from 'react'
import { useBackedPoolInfo } from './usePoolInfo'
import {
  useIsJoinedRandomSelectionPool,
  useIsWinnerForRandomSelectionPool,
  useIsWinnerSeedDone
} from 'hooks/useRandomSelectionPool'
import { useRequest } from 'ahooks'
import { getCurrentTimeStamp } from 'utils'
import { useToken } from 'state/wallet/hooks'
import { ChainId } from 'constants/chain'
import { Token } from '@uniswap/sdk-core'
import { CurrencyAmount } from 'constants/token'
import { FeeAmount, Pool, Position, computePoolAddress } from '@uniswap/v3-sdk'
import IUniswapV3PoolABI from '@uniswap/v3-core/artifacts/contracts/interfaces/IUniswapV3Pool.sol/IUniswapV3Pool.json'

const useRandomSelectionLPPoolInfo = (chainId: ChainId, backedId?: number) => {
  const _backedId = backedId
  const {
    data: poolInfo,
    run: getPoolInfo,
    loading
  } = useBackedPoolInfo(PoolType.RANDOM_SELECTION_LP, Number(_backedId))
  const contract = useRandomSelectionLPContract(poolInfo?.contract || '', poolInfo?.ethChainId)
  const posContract = useUniV3PositionContract(chainId)
  const res = useSingleCallResult(posContract, 'positions', [7204], undefined, chainId)?.result
  const _token0 = useToken(res?.token0, chainId)
  const token0 = useMemo(() => {
    if (res?.token0) {
      return new Token(chainId, res?.token0, _token0?.decimals || 18)
    }
    return undefined
  }, [chainId, _token0?.decimals, res?.token0])
  const _token1 = useToken(res?.token1, chainId)
  const token1 = useMemo(() => {
    if (res?.token1) {
      return new Token(chainId, res?.token1, _token1?.decimals || 18)
    }
    return undefined
  }, [chainId, _token1?.decimals, res?.token1])

  const positionInfo = useMemo(() => {
    if (res && _token1) {
      return {
        liquidity: res?.liquidity,
        fee: res?.fee ? CurrencyAmount.fromRawAmount(_token1, res.fee) : undefined,
        tickLower: res?.tickLower,
        tickUpper: res?.tickUpper,
        tokens0Wed0: res?.tokens0Wed0,
        tokens0Wed1: res?.tokens0Wed1,
        feeGrowthInside0LastX128: res?.feeGrowthInside0LastX128,
        feeGrowthInside1LastX128: res?.feeGrowthInside1LastX128
      }
    }
    return undefined
  }, [_token1, res])

  const poolAddress = useMemo(() => {
    if (token0 && token1) {
      return computePoolAddress({
        factoryAddress: '0x0227628f3F023bb0B980b67D528571c95c6DaC1c',
        tokenA: token0,
        tokenB: token1,
        fee: res?.fee.toString() as FeeAmount
      })
    }
    return undefined
  }, [res?.fee, token0, token1])

  const poolContract = useContract(poolAddress, IUniswapV3PoolABI.abi, false, chainId)

  const slot0s = useSingleCallResult(poolContract, 'slot0', undefined, undefined, chainId)?.result
  const liquidity = useSingleCallResult(poolContract, 'liquidity', undefined, undefined, chainId)?.result
  const pool = useMemo(() => {
    if (slot0s && liquidity && token0 && token1 && res?.fee) {
      return new Pool(token0, token1, Number(res?.fee), slot0s.sqrtPriceX96, liquidity[0], slot0s.tick)
    }
    return undefined
  }, [slot0s, liquidity, token0, token1, res?.fee])

  const position = useMemo(() => {
    if (
      pool &&
      liquidity &&
      positionInfo &&
      typeof positionInfo?.tickLower === 'number' &&
      typeof positionInfo.tickUpper === 'number'
    ) {
      return new Position({
        pool,
        liquidity: liquidity.toString(),
        tickLower: positionInfo?.tickLower,
        tickUpper: positionInfo?.tickUpper
      })
    }
    return undefined
  }, [liquidity, pool, positionInfo])

  const { account } = useActiveWeb3React()
  const poolFeesRes = useSingleCallResult(
    contract,
    'getFees',
    [poolInfo?.poolId, account || undefined],
    undefined,
    poolInfo?.ethChainId
  ).result
  const poolTotal0FeesRes = useSingleCallResult(
    contract,
    'feeTotal0',
    [poolAddress],
    undefined,
    poolInfo?.ethChainId
  ).result

  const PoolTotal0Fees = useMemo(() => {
    if (poolTotal0FeesRes && _token0) {
      return CurrencyAmount.fromRawAmount(_token0, poolTotal0FeesRes.feesTotal0 || '0')
    }
    return undefined
  }, [_token0, poolTotal0FeesRes])
  const poolTotal1FeesRes = useSingleCallResult(
    contract,
    'feeTotal1',
    [poolAddress],
    undefined,
    poolInfo?.ethChainId
  ).result
  const PoolTotal1Fees = useMemo(() => {
    if (poolTotal1FeesRes && _token1) {
      return CurrencyAmount.fromRawAmount(_token1, poolTotal1FeesRes.feesTotal1 || '0')
    }
    return undefined
  }, [_token1, poolTotal1FeesRes])

  const userTotalFeesReward = useMemo(() => {
    if (poolFeesRes && _token0 && _token1) {
      return {
        claimableToken0: CurrencyAmount.fromRawAmount(_token0, poolFeesRes.claimableToken0 || '0'),
        claimableToken1: CurrencyAmount.fromRawAmount(_token1, poolFeesRes.claimableToken1 || '0'),
        claimedToken0: CurrencyAmount.fromRawAmount(_token0, poolFeesRes.claimedToken0 || '0'),
        claimedToken1: CurrencyAmount.fromRawAmount(_token1, poolFeesRes.claimedToken1 || '0')
      }
    }
    return undefined
  }, [_token0, _token1, poolFeesRes])

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

  const poolsInfo = useSingleCallResult(contract, 'pools', [poolInfo?.poolId], undefined, poolInfo?.ethChainId).result

  const data: RandomSelectionLPProps | undefined = useMemo(() => {
    if (!poolInfo) return undefined

    return {
      ...poolInfo,
      position,
      userTotalFeesReward,
      PoolTotal0Fees,
      PoolTotal1Fees,
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
    position,
    userTotalFeesReward,
    PoolTotal0Fees,
    PoolTotal1Fees,
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

export const useGetRandomSelectionLPPoolStatus = (poolInfo: RandomSelectionLPProps): RandomSelectionNFTResultProps => {
  const { account } = useActiveWeb3React()
  const { participant, claimAt, openAt, closeAt } = poolInfo
  const isJoined = useIsJoinedRandomSelectionPool(poolInfo.poolId, account, poolInfo.contract, poolInfo.ethChainId)
  const isWinnerSeedDone = useIsWinnerSeedDone(
    poolInfo.poolId,
    poolInfo.contract,
    PoolType.RANDOM_SELECTION_LP,
    poolInfo.ethChainId
  )
  const { isWinner } = useIsWinnerForRandomSelectionPool(
    poolInfo.poolId,
    account,
    poolInfo.contract,
    isWinnerSeedDone,
    PoolType.RANDOM_SELECTION_LP,
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

export default useRandomSelectionLPPoolInfo
