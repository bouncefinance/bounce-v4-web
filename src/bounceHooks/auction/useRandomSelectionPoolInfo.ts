import { FixedSwapPoolProp, PoolType } from 'api/pool/type'
import { Currency, CurrencyAmount } from 'constants/token'
import { useActiveWeb3React } from 'hooks'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useRandomSelectionERC20Contract } from 'hooks/useContract'
import { useMemo } from 'react'
import { useBackedPoolInfo } from './usePoolInfo'

const useRandomSelectionPoolInfo = (backedId?: number) => {
  const { data: poolInfo, run: getPoolInfo, loading } = useBackedPoolInfo(PoolType.Lottery, backedId)

  const randomSelectionERC20Contract = useRandomSelectionERC20Contract(poolInfo?.contract || '', poolInfo?.ethChainId)
  const { account } = useActiveWeb3React()
  const myClaimedRes = useSingleCallResult(
    randomSelectionERC20Contract,
    'myClaimed',
    [account || undefined, poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const playerCount = useSingleCallResult(randomSelectionERC20Contract, 'getPlayerCount', [poolInfo?.poolId])
  // console.log('myClaimedRes---', myClaimedRes?.[0], poolInfo?.participant.claimed)
  // !TOTD contract data
  const data: FixedSwapPoolProp | undefined = useMemo(() => {
    if (!poolInfo) return undefined
    const _t0 = poolInfo.token0
    const t0 = new Currency(poolInfo.ethChainId, _t0.address, _t0.decimals, _t0.symbol, _t0.name, _t0.smallUrl)
    const _t1 = poolInfo.token1
    const t1 = new Currency(poolInfo.ethChainId, _t1.address, _t1.decimals, _t1.symbol, _t1.name, _t1.smallUrl)

    return {
      ...poolInfo,
      currentBounceContractAddress: poolInfo.contract,
      token0: {
        ...poolInfo.token0,
        symbol: poolInfo.token0.symbol.toUpperCase()
      },
      token1: {
        ...poolInfo.token1,
        symbol: poolInfo.token1.symbol.toUpperCase()
      },
      participant: {
        ...poolInfo.participant,
        claimed: myClaimedRes?.[0] || poolInfo.participant.claimed,
        currencySwappedAmount0: CurrencyAmount.fromRawAmount(t0, poolInfo.participant.swappedAmount0 || '0'),
        // !TOTD
        currencySwappedAmount1: CurrencyAmount.fromRawAmount(t1, '0')
      },
      currencySwappedAmount0: CurrencyAmount.fromRawAmount(t0, poolInfo.swappedAmount0),
      currencySwappedTotal1: CurrencyAmount.fromRawAmount(t1, poolInfo.currentTotal1),
      currencyAmountTotal0: CurrencyAmount.fromRawAmount(t0, poolInfo.amountTotal0),
      currencyAmountTotal1: CurrencyAmount.fromRawAmount(t1, poolInfo.amountTotal1),
      currencyMaxAmount1PerWallet: CurrencyAmount.fromRawAmount(t1, poolInfo.maxAmount1PerWallet),
      currencySurplusTotal0: CurrencyAmount.fromRawAmount(t0, poolInfo.currentTotal0),
      curPlayer: playerCount.result?.[0].toString() || 0
    }
  }, [playerCount.result, myClaimedRes, poolInfo])

  return {
    loading,
    run: getPoolInfo,
    data
  }
}

export default useRandomSelectionPoolInfo
