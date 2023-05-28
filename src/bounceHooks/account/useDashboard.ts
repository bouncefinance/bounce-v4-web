import { useRequest } from 'ahooks'
import { getUserDashboardStat, getUserPoolsDashboardCollect, getUserPoolsDashboardCreated } from 'api/account'
import { DashboardQueryType } from 'api/account/types'
import { useActiveWeb3React } from 'hooks'

export function useDashboardUserCreated(queryType: DashboardQueryType) {
  const { account } = useActiveWeb3React()
  return useRequest(
    async () => {
      const response = await getUserPoolsDashboardCreated({
        address: account || '',
        category: 0,
        chainId: 0,
        queryType,
        limit: 100
      })

      return response.data.list
    },
    {
      ready: !!account,
      debounceWait: 100
    }
  )
}

export function useDashboardUserCollect(queryType?: DashboardQueryType) {
  return useRequest(
    async () => {
      const response = await getUserPoolsDashboardCollect({
        chainId: 0,
        category: 0,
        limit: 100,
        queryType: queryType || 0
      })

      return response.data.list
    },
    { debounceWait: 100 }
  )
}

export function useDashboardStat() {
  return useRequest(
    async () => {
      const response = await getUserDashboardStat()

      return response.data
    },
    { debounceWait: 100 }
  )
}
