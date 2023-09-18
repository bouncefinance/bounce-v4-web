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
import { useERC721Contract } from 'hooks/useContract'
import { useERC721Balance } from 'hooks/useNFTTokenBalance'
import { useGetApproved } from 'hooks/useNFTApproveAllCallback'
import { useSingleCallResult } from 'state/multicall/hooks'
export interface TokenlockResponse {
  tokenCurrency: Currency | undefined
  balance: CurrencyAmount | undefined
  allowance: CurrencyAmount | undefined
  max: string
}
export interface Token721lockResponse {
  isApprovedAll: any
  balance: string | undefined
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
// TODO delete
export function useErc721BalanceOf(
  tokenAddress: string | undefined,
  account: string | undefined,
  queryChainId: ChainId
): string | undefined {
  const result = useERC721Balance(tokenAddress, account, queryChainId)
  return result
}
export function useERC721Owner(
  tokenAddress: string | undefined,
  account: string | undefined,
  queryChainId: ChainId,
  tokenId: string | number
) {
  const contract = useERC721Contract(tokenAddress || '', queryChainId)
  const res = useSingleCallResult(account ? contract : null, 'ownerOf', [tokenId])
  return useMemo(() => {
    if (res.loading || !res.result) return undefined
    return res.result?.[0]
  }, [res.loading, res.result])
}
export const useErc721TokenDetail = (tokenAddress: string, queryChainId: ChainId): Token721lockResponse => {
  const { account } = useActiveWeb3React()
  const contractAddress = TOOL_BOX_LINEAR_TOKEN_721_LOCKER_CONTRACT_ADDRESSES[queryChainId]
  const contract = useERC721Contract(tokenAddress, queryChainId)
  //   const balance = useErc721BalanceOf(tokenAddress, account, queryChainId)
  const balance = useErc721BalanceOf(tokenAddress, account, queryChainId)
  //   const isApprovedAll = useErc721IsApprovedAll(tokenAddress, account, queryChainId)
  const isApprovedAll = useGetApproved(contract || undefined, contractAddress)
  return useMemo(() => {
    return { isApprovedAll, balance }
  }, [balance, isApprovedAll])
}
