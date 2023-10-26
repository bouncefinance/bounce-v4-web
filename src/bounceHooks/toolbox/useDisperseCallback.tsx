import { ChainId } from 'constants/chain'
import { useCurrencyBalance, useToken } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks'
import { useMemo } from 'react'
import { useTokenAllowance } from 'data/Allowances'
import { DISPERSE_CONTRACT_ADDRESSES } from '../../constants'
import { useRequest } from 'ahooks'
import { getMyDisperse } from '../../api/toolbox'
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
    return { tokenCurrency: res, balance: balance, allowance: currentAllowance, max }
  }, [balance, currentAllowance, max, res])
}

export const useDisperseList = (page: number, pageSize: number, token?: string) => {
  const { account } = useActiveWeb3React()
  return useRequest(
    async (): Promise<MyDisperseList | undefined> => {
      return account
        ? await getMyDisperse({
            address: account || '',
            token: token || '',
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
}
