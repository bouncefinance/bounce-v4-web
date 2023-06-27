import { useRequest } from 'ahooks'

import { getPoolHistory } from 'api/pool'
import { PoolType } from 'api/pool/type'
import getTokenType from 'utils/getTokenType'

const usePoolHistory = (
  backedChainId: number,
  poolId: string,
  category: PoolType,
  account?: string,
  _event?: ('Swapped' | 'CreatorClaimed' | 'Reversed' | 'Bid' | 'Bet')[]
) => {
  return useRequest(
    async () => {
      if (typeof poolId !== 'string') {
        return Promise.reject(new Error('Invalid poolId'))
      }

      const params = _event ? { event: _event } : {}

      const response = await getPoolHistory({
        poolId,
        category,
        chainId: backedChainId || 0,
        address: account || '',
        tokenType: getTokenType(category),
        ...params
      })

      return response.data
    },
    {
      // cacheKey: `POOL_HISTORY_${account}`,
      ready: !!poolId && !!backedChainId,
      pollingInterval: 30000,
      refreshDeps: [account, poolId, backedChainId]
    }
  )
}

export default usePoolHistory
