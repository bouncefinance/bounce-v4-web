import { useEffect, useMemo, useState } from 'react'
import { useRequest } from 'ahooks'
import { isAddress } from '@ethersproject/address'
import { GOERLI_TOKEN_LIST, TOKEN_LIST_API } from 'constants/auction'
import { Token } from 'bounceComponents/fixed-swap/type'
import { ChainId } from 'constants/chain'
import { useTokenContract } from 'hooks/useContract'

const filterToken = (list: Token[], filterValue: string) => {
  return list.filter(
    token =>
      token.name.toLowerCase().includes(filterValue.trim().toLowerCase()) ||
      token.symbol.toLowerCase().includes(filterValue.trim().toLowerCase()) ||
      (isAddress(filterValue.trim().toLowerCase()) &&
        token.address.toLowerCase().includes(filterValue.trim().toLowerCase()))
  )
}

const getGetApiTokenList = async (chainId: ChainId) => {
  if (!TOKEN_LIST_API?.[chainId]) return null

  const response = await fetch(TOKEN_LIST_API?.[chainId] || '')
  const jsonResponse: { tokens: Token[] } = await response?.json()
  return jsonResponse.tokens
}

const useTokenList = (chainId: ChainId, filterValue?: string, enableEth = false) => {
  const isChainHasTokenApi = typeof TOKEN_LIST_API[chainId] === 'string'

  const { data: apiTokenList, loading: isGettingApiTokenList } = useRequest(() => getGetApiTokenList(chainId), {
    cacheKey: `API_TOKEN_LIST_${chainId}`,
    ready: !!chainId && isChainHasTokenApi,
    refreshDeps: [chainId]
  })

  const baseTokenList = useMemo(
    () => (chainId === ChainId.GÖRLI ? GOERLI_TOKEN_LIST : apiTokenList ?? []),
    [apiTokenList, chainId]
  )

  const filteredApiTokenList = useMemo(() => {
    if (!baseTokenList) {
      return []
    }

    return filterToken(baseTokenList, filterValue || '')
  }, [baseTokenList, filterValue])

  const contract = useTokenContract(filterValue)

  const [singleToken, setSingleToken] = useState<Token>()

  const { loading: isGettingSingleToken } = useRequest(
    async () => {
      if (!contract) {
        return Promise.reject('no contract')
      }

      const [symbol, name, decimals] = await Promise.all([contract.symbol(), contract.name(), contract.decimals()])

      return {
        address: filterValue,
        symbol,
        name,
        decimals,
        dangerous: true
      }
    },
    {
      cacheKey: `ERC20_${filterValue}`,
      ready: !!contract && !!isAddress(filterValue || '') && filterToken(baseTokenList, filterValue || '').length <= 0,
      refreshDeps: [filterValue],
      debounceWait: 300,
      onSuccess: data => {
        // console.log('>>>>> single token: ', data)
        setSingleToken(data)
      },
      onError: () => {
        // console.log('query token info error: ', error)
      }
    }
  )

  useEffect(() => {
    setSingleToken(undefined)
  }, [filterValue])

  console.log('>>>>> singleToken: ', singleToken)

  console.log('>>> filteredApiTokenList: ', filteredApiTokenList)

  const tokenList = useMemo(() => {
    const isFilterValueNotFoundInApiTokenList = filteredApiTokenList.length <= 0
    const isSingleTokenValid = singleToken && !isGettingSingleToken

    if (isAddress(filterValue || '') && isFilterValueNotFoundInApiTokenList && isSingleTokenValid) {
      return [singleToken]
    } else {
      // TOTD NATIVE_TOKENS
      return enableEth ? [...filteredApiTokenList] : filteredApiTokenList
    }
  }, [enableEth, filterValue, filteredApiTokenList, isGettingSingleToken, singleToken])

  return {
    tokenList,
    isGettingTokenList: chainId === ChainId.GÖRLI ? false : isGettingApiTokenList,
    isGettingSingleToken
  }
}

export default useTokenList
