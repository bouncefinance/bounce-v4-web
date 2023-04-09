import { FixedSwapNFTPoolProp, FixedSwapPoolProp } from 'api/pool/type'
import { useMemo } from 'react'

const useIsUserJoinedPool = (poolInfo: FixedSwapPoolProp) => {
  return useMemo(() => {
    if (!poolInfo) return undefined
    return poolInfo.participant && (poolInfo.participant.currencySwappedAmount0?.greaterThan('0') || false)
  }, [poolInfo])
}

export default useIsUserJoinedPool

export function useIsUserJoined1155Pool(poolInfo: FixedSwapNFTPoolProp) {
  return useMemo(() => {
    return poolInfo?.participant && Number(poolInfo.participant.swappedAmount0) > 0
  }, [poolInfo])
}
