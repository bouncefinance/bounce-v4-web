import { ChainId } from 'constants/chain'
import { useERC1155Contract, useERC721Contract } from './useContract'
import { useSingleCallResult, useSingleContractMultipleData } from 'state/multicall/hooks'
import { useMemo } from 'react'

export function useERC1155Balance(
  tokenAddress: string | undefined,
  account: string | undefined,
  tokenId: number | string | undefined,
  queryChainId?: ChainId
): string | undefined {
  const contract = useERC1155Contract(tokenAddress, queryChainId)
  const res = useSingleCallResult(
    tokenId && account ? contract : null,
    'balanceOf',
    [account, tokenId],
    undefined,
    queryChainId
  ).result

  return res?.[0].toString()
}
export function useERC721Balance(
  tokenAddress: string | undefined,
  account: string | undefined,
  queryChainId?: ChainId
): string | undefined {
  const contract = useERC721Contract(tokenAddress, queryChainId)
  const res = useSingleCallResult(account ? contract : null, 'balanceOf', [account], undefined, queryChainId).result
  return res?.[0].toString()
}
export function useERC721MultiOwner(
  tokenAddress: string | undefined,
  account: string | undefined,
  tokenIds: string[],
  queryChainId?: ChainId
) {
  const contract = useERC721Contract(tokenAddress, queryChainId)

  const res = useSingleContractMultipleData(
    tokenIds.length && account ? contract : null,
    'ownerOf',
    tokenIds.map(i => [i]),
    undefined,
    queryChainId
  )

  return useMemo(() => {
    const ret: string[] = []
    for (const idx in tokenIds) {
      if (Object.prototype.hasOwnProperty.call(tokenIds, idx)) {
        if (account && res?.[idx].result?.toString().toLowerCase() === account.toLowerCase()) {
          ret.push(tokenIds[idx])
        }
      }
    }
    return {
      loading: res?.[0]?.loading || false,
      ownerIds: ret
    }
  }, [account, res, tokenIds])
}
