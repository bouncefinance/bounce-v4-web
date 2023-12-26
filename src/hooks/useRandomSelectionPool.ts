import { getWinnersList } from 'api/pool'
import { PoolType } from 'api/pool/type'
import { useRandomSelectionERC20Contract } from 'hooks/useContract'
import { useSingleCallResult } from '../state/multicall/hooks'
import { ChainId } from 'constants/chain'
import { useRequest } from 'ahooks'
import { getUserRandomIsWinterProof } from 'api/user'
import { useGetBackedChainIdByChain } from '../bounceHooks/auction/useGetBackedChainIdByChain'

export function useIsWinnerForRandomSelectionPool(
  poolId: string | number,
  address: string | undefined,
  contract: string,
  isWinnerSeedDone: boolean,
  category = PoolType.Lottery,
  chainId?: ChainId
): { isWinner: boolean } {
  const randomSelectionERC20Contract = useRandomSelectionERC20Contract(contract, chainId)

  const backedChainId = useGetBackedChainIdByChain(chainId)
  const { data: proof } = useRequest(
    async () => {
      if (!address || !poolId || !backedChainId || !isWinnerSeedDone) return ''
      try {
        const resp = await getUserRandomIsWinterProof({
          address,
          category,
          chainId: backedChainId,
          poolId: poolId.toString()
        })
        return JSON.parse(resp.data.proof)
      } catch (error) {
        return ''
      }
    },
    {
      refreshDeps: [backedChainId, address, poolId, isWinnerSeedDone]
    }
  )

  const args = [Number(poolId), address, proof]
  const { result } = useSingleCallResult(proof ? randomSelectionERC20Contract : null, 'isWinner', args)
  const isWinner = result?.[0]
  return {
    isWinner: !!isWinner
  }
}
export function useIsJoinedRandomSelectionPool(
  poolId: string | number,
  address: string | undefined,
  contract: string,
  chainId?: ChainId
) {
  const randomSelectionERC20Contract = useRandomSelectionERC20Contract(contract, chainId)
  const args = [address, Number(poolId)]
  const { result } = useSingleCallResult(randomSelectionERC20Contract, 'betNo', args)
  // betNo more that 0 means joined
  return !!result ? !!(Number(result?.toString && result?.toString()) > 0) : false
}
// winnerSeed more than 0 means winners list is ready
export function useIsWinnerSeedDone(
  poolId: number | string,
  contract: string,
  category = PoolType.Lottery,
  chainId?: ChainId
) {
  // const randomSelectionERC20Contract = useRandomSelectionERC20Contract(contract, chainId)
  // const args = [Number(poolId)]
  // const res = useSingleCallResult(randomSelectionERC20Contract, 'winnerMerkleRoot', args)
  // console.log('🚀 ~ file: useCreateRandomSelectionPool.ts:272 ~ useIsWinnerSeedDone ~ res:', res)

  // return useMemo(() => {
  //   const { result } = res
  //   // load winners list if isWinnerSeedDone is more that 0
  //   const ret = result?.[0].toString()
  //   return ret && ret !== ZERO_ADDRESS
  // }, [res])

  const backedChainId = useGetBackedChainIdByChain(chainId)

  const { data } = useRequest(
    async () => {
      if (!backedChainId || !contract) return
      const resp = await getWinnersList({
        offset: 0,
        limit: 10,
        poolId: poolId.toString(),
        category,
        chainId: backedChainId
      })
      return resp.data.total
    },
    {
      refreshDeps: [backedChainId, contract],
      refreshOnWindowFocus: true,
      pollingInterval: 20000,
      retryInterval: 20000
    }
  )

  return !!data
}
