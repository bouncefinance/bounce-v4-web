import { ChainId } from 'constants/chain'
import { useMemo } from 'react'

const safeAddress: { [key in ChainId]?: string[] } = {
  [ChainId.ZKSYNC_ERA_TESTNET]: ['0x3A518027cC1A258F63De8d259D8BE28637d415b6'],
  [ChainId.ZKSYNC_ERA]: ['0x591CAdFaF2F5dBBD09580C8b74A4770A9255bF28'],
  [ChainId.ARBITRUM]: ['0x80b9AD5D275CfA439a8a012D01C548Bac1a6313E']
}

export function useCertifiedTokenAddress(chainId: ChainId | undefined, address: string) {
  return useMemo(() => {
    if (!chainId) return false
    const ads = safeAddress?.[chainId] || []
    return !!ads.filter(i => address.toLowerCase() === i.toLowerCase()).length
  }, [address, chainId])
}
