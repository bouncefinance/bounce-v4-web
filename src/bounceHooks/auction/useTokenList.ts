import { useEffect, useMemo, useState } from 'react'
import { useRequest } from 'ahooks'
import { isAddress } from '@ethersproject/address'
import { GOERLI_TOKEN_LIST, OMNI_TESTNET_TOKEN_LIST, SEPOLIA_TOKEN_LIST } from 'constants/auction'
import { Token } from 'bounceComponents/fixed-swap/type'
import { ChainId } from 'constants/chain'
import { useTokenContract } from 'hooks/useContract'
import localDefaultAllList from 'assets/tokenList/default.json'
import { getUserSearchTokenList, getUserTokenList } from 'api/user'
import { ZERO_ADDRESS } from '../../constants'
import { useOptionDatas } from 'state/configOptions/hooks'

const filterToken = (list: Token[], filterValue: string) => {
  return list.filter(
    token =>
      token.name?.toLowerCase().includes(filterValue.trim().toLowerCase()) ||
      token.symbol?.toLowerCase().includes(filterValue.trim().toLowerCase()) ||
      (isAddress(filterValue.trim().toLowerCase()) &&
        token.address.toLowerCase().includes(filterValue.trim().toLowerCase()))
  )
}

const getGetApiTokenList = async (chainId: number | undefined, action: 1 | 2) => {
  if (!chainId) return []
  const params = {
    chainId: chainId,
    action: action
  }
  const response = await getUserTokenList(params)
  const jsonResponse = await response?.data
  return jsonResponse.map((item: any) => ({ ...item, chainId })) as Token[]
}

const useTokenList = (chainId: number | undefined, action: 1 | 2, filterValue?: string, enableEth = false) => {
  // const isChainHasTokenApi = typeof TOKEN_LIST_API[chainId] === 'string'
  const options = useOptionDatas()
  const backedChainId = options.chainInfoOpt?.find(i => i.ethChainId === chainId)?.id
  const { data: apiTokenList, loading: isGettingApiTokenList } = useRequest(
    () => getGetApiTokenList(backedChainId, action),
    {
      cacheKey: `API_TOKEN_LIST_${chainId}`,
      ready: !!chainId,
      refreshDeps: [chainId]
    }
  )

  const baseTokenList = useMemo(() => {
    if (chainId === ChainId.GÖRLI) {
      return (GOERLI_TOKEN_LIST || apiTokenList) ?? []
    }
    if (chainId === ChainId.OMNI_TESTNET) {
      return OMNI_TESTNET_TOKEN_LIST || []
    }
    if (chainId === ChainId.SEPOLIA) {
      return (SEPOLIA_TOKEN_LIST || apiTokenList) ?? []
    } else {
      const localDefaultList = localDefaultAllList.token.filter(i => i.chainId === chainId)
      return [...localDefaultList, ...(apiTokenList || [])]
    }
  }, [apiTokenList, chainId])

  const filteredApiTokenList = useMemo(() => {
    if (!baseTokenList) {
      return []
    }

    return filterToken(baseTokenList, filterValue || '')
  }, [baseTokenList, filterValue])

  const contract = useTokenContract(
    isAddress(filterValue || '') && filteredApiTokenList.length === 0 ? filterValue : undefined
  )

  const [singleToken, setSingleToken] = useState<Token>()

  const { loading: isGettingSingleToken } = useRequest(
    async (): Promise<Token> => {
      if (!contract) {
        return Promise.reject('no contract')
      }

      const [symbol, name, decimals] = await Promise.all([contract.symbol(), contract.name(), contract.decimals()])

      return {
        chainId,
        address: filterValue || '',
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

  const tokenList = useMemo(() => {
    const isFilterValueNotFoundInApiTokenList = filteredApiTokenList.length <= 0
    const isSingleTokenValid = singleToken && !isGettingSingleToken

    if (isAddress(filterValue || '') && isFilterValueNotFoundInApiTokenList && isSingleTokenValid) {
      return [singleToken]
    } else {
      return enableEth ? filteredApiTokenList : filteredApiTokenList.filter(item => item.address !== ZERO_ADDRESS)
    }
  }, [enableEth, filterValue, filteredApiTokenList, isGettingSingleToken, singleToken])

  return {
    tokenList,
    isGettingTokenList: chainId === ChainId.GÖRLI ? false : isGettingApiTokenList,
    isGettingSingleToken
  }
}

export function useGetListBySearchValue(chainId: ChainId, value: string) {
  return useRequest(
    async () => {
      const response = await getUserSearchTokenList({
        chainId,
        limit: 100,
        value
      })
      return response.data.list
    },
    {
      ready: !!chainId,
      refreshDeps: [chainId, value],
      debounceWait: 100
    }
  )
}

export default useTokenList
