import { useRequest } from 'ahooks'

import { getPoolHistory } from 'api/pool'
import { PoolType } from 'api/pool/type'
import { useActiveWeb3React } from 'hooks'
import getTokenType from 'utils/getTokenType'

const usePoolHistory = (backedChainId: number, poolId: string, category: PoolType) => {
  const { account } = useActiveWeb3React()

  return useRequest(
    async () => {
      if (typeof poolId !== 'string') {
        return Promise.reject(new Error('Invalid poolId'))
      }

      const response = await getPoolHistory({
        poolId,
        category,
        chainId: backedChainId || 0,
        address: account || '',
        tokenType: getTokenType(category)
      })

      return response.data
    },
    {
      // cacheKey: `POOL_HISTORY_${account}`,
      ready: !!poolId && !!backedChainId,
      pollingInterval: 30000,
      refreshDeps: [account]
    }
  )
}

export default usePoolHistory
