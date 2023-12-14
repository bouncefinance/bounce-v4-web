import { useMemo } from 'react'
import { useOptionDatas } from '../../state/configOptions/hooks'
import { ChainId } from 'constants/chain'

export function useGetBackedChainIdByChain(chainId?: ChainId) {
  const optionDatas = useOptionDatas()
  return useMemo(() => {
    if (!chainId) return undefined
    const arr = optionDatas.chainInfoOpt?.filter(item => item.ethChainId === chainId)
    return arr?.[0].id
  }, [chainId, optionDatas.chainInfoOpt])
}
