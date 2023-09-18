import { useActiveWeb3React } from 'hooks'
import { useRequest } from 'ahooks'
import { getTokenInfo } from '../../api/toolbox'
import { TokenInfo, TokenInfoList } from '../../api/toolbox/type'

export const useTokenInfo = (chain?: number, token?: string, hash?: string) => {
  const { account } = useActiveWeb3React()

  const { data, loading } = useRequest(
    async (): Promise<TokenInfo | undefined> => {
      return await getTokenInfo({
        address: account || '',
        chainId: chain,
        hash: hash
      }).then(resp => resp.data.list.find(i => i.hash == token))
    },
    {
      refreshDeps: [account, token, chain, hash],
      retryInterval: 10000,
      retryCount: 20
    }
  )
  return { data, loading }
}
export const useTokenList = (page: number, pageSize: number, account?: string) => {
  const { data, loading } = useRequest(
    async (): Promise<TokenInfoList | undefined> => {
      return await getTokenInfo({
        address: account || '',
        offset: (page - 1) * pageSize,
        limit: pageSize
      }).then(resp => resp.data)
    },
    {
      refreshDeps: [account, page, pageSize],
      retryInterval: 10000,
      retryCount: 20
    }
  )
  return { data, loading }
}

export const useMyTokenList = (page: number, pageSize: number, account?: string) => {
  const { data, loading } = useRequest(
    async (): Promise<TokenInfoList | undefined> => {
      return account
        ? await getTokenInfo({
            address: account || '',
            offset: (page - 1) * pageSize,
            limit: pageSize
          }).then(resp => resp.data)
        : undefined
    },
    {
      refreshDeps: [account, page, pageSize],
      retryInterval: 10000,
      retryCount: 20
    }
  )
  return { data, loading }
}
