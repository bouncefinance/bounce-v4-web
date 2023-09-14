import { useActiveWeb3React } from 'hooks'
import { useRequest } from 'ahooks'
import { getTokenLocksInfo } from '../../api/toolbox'
import { LockInfo } from '../../api/toolbox/type'

export const useTokenLockInfo = (chain: number, hash?: string) => {
  const { account } = useActiveWeb3React()

  const { data, loading } = useRequest(
    async (): Promise<LockInfo | undefined> => {
      return await getTokenLocksInfo({
        address: account || '',
        chainId: chain,
        hash: hash
      }).then(resp => resp.data.list.find(i => i.hash == hash))
    },
    {
      refreshDeps: [account, hash, chain],
      retryInterval: 10000,
      retryCount: 20
    }
  )
  return { data, loading }
}
