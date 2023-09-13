import { ChainId } from 'constants/chain'
import { useCurrencyBalance, useToken } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks'
import { useMemo } from 'react'
import { useTokenAllowance } from 'data/Allowances'
import { TOOL_BOX_TOKEN_LOCKER_CONTRACT_ADDRESSES } from 'constants/index'
import { Currency, CurrencyAmount } from 'constants/token'
export interface TokenlockResponse {
  tokenCurrency: Currency | undefined
  balance: CurrencyAmount | undefined
  allowance: CurrencyAmount | undefined
  max: string
}
export const useErc20TokenDetail = (tokenAddress: string, queryChainId: ChainId): TokenlockResponse => {
  const { account } = useActiveWeb3React()
  const res = useToken(tokenAddress, queryChainId)
  const balance = useCurrencyBalance(account, res ?? undefined, queryChainId)
  const currentAllowance = useTokenAllowance(
    res ?? undefined,
    account ?? undefined,
    TOOL_BOX_TOKEN_LOCKER_CONTRACT_ADDRESSES[queryChainId]
  )
  const max = useMemo(() => {
    return balance && currentAllowance
      ? balance?.greaterThan(currentAllowance)
        ? currentAllowance.toExact()
        : balance?.toExact()
      : '0'
  }, [balance, currentAllowance])
  return useMemo(() => {
    return { tokenCurrency: res || undefined, balance: balance, allowance: currentAllowance, max }
  }, [balance, currentAllowance, max, res])
}
