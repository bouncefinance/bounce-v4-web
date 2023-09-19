import { useActiveWeb3React } from 'hooks'
import { useRequest } from 'ahooks'
import { getTokenLocksInfo } from '../../api/toolbox'
import { LockInfo, LockInfoList } from '../../api/toolbox/type'

export const useTokenLockInfo = (chain: number | undefined, hash?: string) => {
  const { account } = useActiveWeb3React()
  const { data, loading } = useRequest(
    async (): Promise<LockInfo | undefined> => {
      if (!chain || !hash) {
        return Promise.reject(undefined)
      }
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

export const useMyLocks = (page: number, pageSize: number) => {
  const { account } = useActiveWeb3React()
  const { data, loading } = useRequest(
    async (): Promise<LockInfoList | undefined> => {
      return account
        ? await getTokenLocksInfo({
            address: account || '',
            offset: (page - 1) * pageSize,
            limit: pageSize
          }).then(resp => resp.data)
        : undefined
    },
    {
      refreshDeps: [account, page],
      retryInterval: 10000,
      retryCount: 20
    }
  )
  return { data, loading }
}
