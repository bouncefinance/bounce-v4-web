import { ChainId } from 'constants/chain'
import { useCurrencyBalance, useToken } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks'
import { useMemo } from 'react'
import { useTokenAllowance } from 'data/Allowances'
import { DISPERSE_CONTRACT_ADDRESSES } from '../../constants'
import { useRequest } from 'ahooks'
import { getMyDisperse } from '../../api/toolbox'
import useChainConfigInBackend from '../web3/useChainConfigInBackend'
import { MyDisperseList } from '../../api/toolbox/type'

export const useErc20TokenDetail = (tokenAddress: string, queryChainId: ChainId): any => {
  const { account } = useActiveWeb3React()
  const res = useToken(tokenAddress, queryChainId)
  const balance = useCurrencyBalance(account, res ?? undefined, queryChainId)
  const currentAllowance = useTokenAllowance(
    res ?? undefined,
    account ?? undefined,
    DISPERSE_CONTRACT_ADDRESSES[queryChainId]
  )
  const max = useMemo(() => {
    return balance && currentAllowance
      ? balance?.greaterThan(currentAllowance)
        ? currentAllowance.toExact()
        : balance?.toExact()
      : '0'
  }, [balance, currentAllowance])
  return useMemo(() => {
    return { ...res, balance: balance, allowance: currentAllowance, max }
  }, [balance, currentAllowance, max, res])
}

export const useDisperseList = (chain?: ChainId, token?: string) => {
  const { account, chainId } = useActiveWeb3React()
  const chainConfigInBackend = useChainConfigInBackend('ethChainId', chain || chainId || '')
  return useRequest(
    async (): Promise<MyDisperseList> => {
      return await getMyDisperse({
        address: account || '',
        chainId: chainConfigInBackend?.id || 0,
        token: token || ''
      }).then(resp => resp.data)
    },
    {
      refreshDeps: [account],
      retryInterval: 10000,
      retryCount: 20
    }
  )
}
