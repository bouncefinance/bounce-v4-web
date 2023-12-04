import { useRequest } from 'ahooks'
import { getUserCredentialEligible } from 'api/pool'

const useUserEligible = (id: number, address?: string) => {
  return useRequest(
    async () => {
      if (!id || !address) {
        return
      }
      const response = await getUserCredentialEligible({
        id,
        address
      })
      return response.data.data.verifyCredentials
    },
    {
      ready: !!address && !!id,
      pollingInterval: 30000,
      refreshDeps: [id, address]
    }
  )
}

export default useUserEligible
