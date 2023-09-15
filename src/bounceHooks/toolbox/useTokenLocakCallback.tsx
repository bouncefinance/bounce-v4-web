import { ChainId } from 'constants/chain'
import { useCurrencyBalance, useToken } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks'
import { useMemo } from 'react'
import { useTokenAllowance } from 'data/Allowances'
import {
  TOOL_BOX_LINEAR_TOKEN_LOCKER_CONTRACT_ADDRESSES,
  TOOL_BOX_TOKEN_LOCKER_CONTRACT_ADDRESSES,
  TOOL_BOX_LINEAR_TOKEN_721_LOCKER_CONTRACT_ADDRESSES
} from 'constants/index'
import { Currency, CurrencyAmount } from 'constants/token'
import { IReleaseType } from 'bounceComponents/create-auction-pool/types'
import { VersionType } from 'pages/tokenToolBox/components/tokenLPLockerForm'
export interface TokenlockResponse {
  tokenCurrency: Currency | undefined
  balance: CurrencyAmount | undefined
  allowance: CurrencyAmount | undefined
  max: string
}
export const useErc20TokenDetail = (
  tokenAddress: string,
  queryChainId: ChainId,
  releaseType: IReleaseType
): TokenlockResponse => {
  const { account } = useActiveWeb3React()
  const res = useToken(tokenAddress, queryChainId)
  const balance = useCurrencyBalance(account, res ?? undefined, queryChainId)
  const contractAddress = useMemo(() => {
    return releaseType === IReleaseType.Linear
      ? TOOL_BOX_LINEAR_TOKEN_LOCKER_CONTRACT_ADDRESSES[queryChainId]
      : TOOL_BOX_TOKEN_LOCKER_CONTRACT_ADDRESSES[queryChainId]
  }, [queryChainId, releaseType])
  const currentAllowance = useTokenAllowance(res ?? undefined, account ?? undefined, contractAddress)
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
export const useErc721TokenDetail = (
  tokenAddress: string,
  queryChainId: ChainId,
  version: VersionType
): TokenlockResponse => {
  const { account } = useActiveWeb3React()
  const res = useToken(tokenAddress, queryChainId)
  const balance = useCurrencyBalance(account, res ?? undefined, queryChainId)
  const contractAddress = useMemo(() => {
    return version === VersionType.v2
      ? TOOL_BOX_TOKEN_LOCKER_CONTRACT_ADDRESSES[queryChainId]
      : TOOL_BOX_LINEAR_TOKEN_721_LOCKER_CONTRACT_ADDRESSES[queryChainId]
  }, [queryChainId, version])
  const currentAllowance = useTokenAllowance(res ?? undefined, account ?? undefined, contractAddress)
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
