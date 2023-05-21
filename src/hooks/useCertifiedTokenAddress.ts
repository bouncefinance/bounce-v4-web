import { ChainId } from 'constants/chain'

const safeAddress: { [key in ChainId]?: string[] } = {
  [ChainId.ZKSYNC_ERA_TESTNET]: ['0x3A518027cC1A258F63De8d259D8BE28637d415b6'],
  [ChainId.ZKSYNC_ERA]: ['0x591CAdFaF2F5dBBD09580C8b74A4770A9255bF28']
}

export function useCertifiedTokenAddress(chainId: ChainId, address: string) {
  const ads = safeAddress?.[chainId] || []
  return !!ads.filter(i => address.toLowerCase() === i.toLowerCase()).length
}
