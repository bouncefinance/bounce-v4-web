import { Currency } from 'constants/token/currency'
import { CurrencyAmount } from 'constants/token/fractions/currencyAmount'
import { useMemo } from 'react'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useBackedPoolInfo } from './usePoolInfo'
import { useActiveWeb3React } from 'hooks'
import { useFixedSwapNftContract } from 'hooks/useContract'
import { FixedSwapNFTPoolProp, PoolType } from 'api/pool/type'
import JSBI from 'jsbi'

const useNftPoolInfo = () => {
  const { data: poolInfo, run: getPoolInfo, loading } = useBackedPoolInfo(PoolType.fixedSwapNft)

  const fixedSwapNftContract = useFixedSwapNftContract(poolInfo?.contract || '', poolInfo?.ethChainId)
  const { account } = useActiveWeb3React()
  const amountSwap0Res = useSingleCallResult(
    fixedSwapNftContract,
    'amountSwap0',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const amountSwap1PRes = useSingleCallResult(
    fixedSwapNftContract,
    'amountSwap1',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const creatorClaimedRes = useSingleCallResult(
    fixedSwapNftContract,
    'creatorClaimed',
    [poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const myAmountSwapped0Res = useSingleCallResult(
    fixedSwapNftContract,
    'myAmountSwapped0',
    [account || undefined, poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const myAmountSwapped1Res = useSingleCallResult(
    fixedSwapNftContract,
    'myAmountSwapped1',
    [account || undefined, poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result
  const myClaimedRes = useSingleCallResult(
    fixedSwapNftContract,
    'myClaimed',
    [account || undefined, poolInfo?.poolId],
    undefined,
    poolInfo?.ethChainId
  ).result

  const data: FixedSwapNFTPoolProp | undefined = useMemo(() => {
    if (!poolInfo) return undefined
    const _t1 = poolInfo.token1
    const t1 = new Currency(poolInfo.ethChainId, _t1.address, _t1.decimals, _t1.symbol, _t1.name, _t1.smallUrl)

    return {
      ...poolInfo,
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
        swappedAmount0: myAmountSwapped0Res?.[0].toString() || poolInfo.participant.swappedAmount0 || '0',
        currencySwappedAmount1: CurrencyAmount.fromRawAmount(t1, myAmountSwapped1Res?.[0].toString() || '0')
      },
      creatorClaimed: creatorClaimedRes?.[0] || poolInfo.creatorClaimed,
      currencyAmountTotal1: CurrencyAmount.fromRawAmount(t1, poolInfo.amountTotal1) as CurrencyAmount,
      ratio:
        CurrencyAmount.fromRawAmount(t1, poolInfo.amountTotal1)
          ?.divide(JSBI.BigInt(poolInfo.amountTotal0))
          .toSignificant(64) || '0',
      swappedAmount0: amountSwap0Res?.[0].toString() || poolInfo.swappedAmount0 || '0',
      currencySwappedTotal1: CurrencyAmount.fromRawAmount(
        t1,
        amountSwap1PRes?.[0].toString() || poolInfo.currentTotal1
      ) as CurrencyAmount
    }
  }, [
    amountSwap0Res,
    amountSwap1PRes,
    creatorClaimedRes,
    myAmountSwapped0Res,
    myAmountSwapped1Res,
    myClaimedRes,
    poolInfo
  ])

  return {
    loading,
    run: getPoolInfo,
    data
  }
}

export default useNftPoolInfo
