import { useActiveWeb3React } from 'hooks'
import { useRequest } from 'ahooks'
import { getTokenInfo } from '../../api/toolbox'
import { TokenInfo, TokenInfoList } from '../../api/toolbox/type'

export const useTokenInfo = (chain?: number, token?: string) => {
  const { account } = useActiveWeb3React()

  const { data, loading } = useRequest(
    async (): Promise<TokenInfo | undefined> => {
      return await getTokenInfo({
        address: account || '',
        chainId: chain
      }).then(resp => resp.data.list.find(i => i.hash == token))
    },
    {
      refreshDeps: [account, token, chain],
      retryInterval: 10000,
      retryCount: 20
    }
  )
  return { data, loading }
}
export const useTokenList = (account?: string) => {
  const { data, loading } = useRequest(
    async (): Promise<TokenInfoList | undefined> => {
      return await getTokenInfo({
        address: account || ''
      }).then(resp => resp.data)
    },
    {
      refreshDeps: [account],
      retryInterval: 10000,
      retryCount: 20
    }
  )
  return { data, loading }
}
