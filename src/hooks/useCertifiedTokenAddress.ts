import { ChainId } from 'constants/chain'
import { useMemo } from 'react'

const safeAddress: { [key in ChainId]?: string[] } = {
  [ChainId.MAINNET]: [
    '0x7d60de2e7d92cb5c863bc82f8d59b37c59fc0a7a',
    '0x18b9fD3f712AcbF2c1edD6C717039C3acde912D9',
    '0x38e382F74dfb84608F3C1F10187f6bEf5951DE93',
    '0xda31D0d1Bc934fC34F7189E38A413ca0A5e8b44F',
    '0x5016878159e84daDB05bB04135F3eAc339ae201f'
  ],
  [ChainId.OMNI_TESTNET]: ['0xB10BAe3C2750a8ABFdB4cAf4Ba4306E9e3770148', '0x59f85f769F42BA7C7BD55e246adaa4b2F88f46a7'],
  [ChainId.ZKSYNC_ERA_TESTNET]: ['0x3A518027cC1A258F63De8d259D8BE28637d415b6'],
  [ChainId.BSC]: [
    '0xd7518E8cFd7448201155BbBEDEed88888E3575aE',
    '0xd9a44c40584288505931880c9915C6a5eB5f2fB1',
    '0x009aE6fC4bfED1E5C244f92e7b6e5C6C395D64dA'
  ],
  [ChainId.ZKSYNC_ERA]: ['0x591CAdFaF2F5dBBD09580C8b74A4770A9255bF28', '0x5abF89A3702F33B930293B7B04cBfF07a9a0f6F1'],
  [ChainId.ARBITRUM]: ['0x80b9AD5D275CfA439a8a012D01C548Bac1a6313E'],
  [ChainId.BASE]: ['0xE2986FD09A8c1d698EC50bD31F155e165C241D12']
}

export function useCertifiedTokenAddress(chainId: ChainId | undefined, address: string) {
  return useMemo(() => {
    if (!chainId) return false
    const ads = safeAddress?.[chainId] || []
    return !!ads.filter(i => address.toLowerCase() === i.toLowerCase()).length
  }, [address, chainId])
}
