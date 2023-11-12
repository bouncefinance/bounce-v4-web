import { useMemo } from 'react'

const list = [
  {
    poolId: '189',
    address: '0x73282A63F0e3D7e9604575420F777361ecA3C86A'
  },
  {
    poolId: '191',
    address: '0x73282A63F0e3D7e9604575420F777361ecA3C86A'
  },
  {
    poolId: '41',
    address: '0x9e2C12D9240BF267fbeBD510d47Ac3AbD4D9d9ee'
  }
]

export function useIgnoreWhitelistPool(
  whitelist: boolean | undefined,
  contract: string | undefined,
  poolId: string | undefined
) {
  return useMemo(() => {
    if (!whitelist) return true
    if (!contract || !poolId) return true
    return !!list.filter(
      i => contract.toLowerCase() === i.address.toLowerCase() && poolId.toString() === i.poolId.toString()
    ).length
  }, [contract, poolId, whitelist])
}
