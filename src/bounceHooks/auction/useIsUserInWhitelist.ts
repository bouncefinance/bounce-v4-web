import { useCallback, useEffect, useState } from 'react'

import { PoolType } from 'api/pool/type'
import { getUserPermitSign, getUserWhitelistProof } from 'api/user'
import { useActiveWeb3React } from 'hooks'
import { PoolInfoProp } from 'bounceComponents/fixed-swap/type'
import getTokenType from 'utils/getTokenType'
import { useUserInfo } from 'state/users/hooks'

const useIsUserInWhitelist = (poolInfo: PoolInfoProp, category: PoolType = PoolType.FixedSwap) => {
  const { account } = useActiveWeb3React()
  const { token } = useUserInfo()

  const [isUserInWhitelist, setIsUserInWhitelist] = useState<boolean>()
  const [isCheckingWhitelist, setIsCheckingWhitelist] = useState(true)

  const checkIsUserInWhitelist = useCallback(async () => {
    // console.log('account: ', account)
    // console.log('chainConfigInBackend?.id: ', chainConfigInBackend?.id)
    // console.log('poolId: ', poolId)

    if (!poolInfo.enableWhiteList) {
      setIsUserInWhitelist(true)
      setIsCheckingWhitelist(false)
      return
    }

    if (!account) {
      setIsUserInWhitelist(undefined)
      setIsCheckingWhitelist(false)
      return
    }

    try {
      const proof = await getUserWhitelistProof({
        address: account,
        category: category,
        chainId: poolInfo.chainId,
        poolId: String(poolInfo.poolId),
        tokenType: getTokenType(category)
      })
      console.log('proof>>>', proof)
      setIsUserInWhitelist(!!proof)
    } catch (error) {
      setIsUserInWhitelist(false)
    } finally {
      setIsCheckingWhitelist(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, category, poolInfo.chainId, poolInfo.enableWhiteList, poolInfo.poolId, token])

  useEffect(() => {
    checkIsUserInWhitelist()
  }, [checkIsUserInWhitelist])

  return { data: isUserInWhitelist, loading: isCheckingWhitelist }
}
export default useIsUserInWhitelist

export function useIsUserInAllWhitelist(
  backedChainId: number | undefined,
  poolId: string | number | undefined,
  enableWhiteList: boolean,
  category: PoolType = PoolType.FixedSwap
) {
  const { account } = useActiveWeb3React()
  const { token } = useUserInfo()

  const [isUserInWhitelist, setIsUserInWhitelist] = useState<boolean>()
  const [isUserPermitWhitelist, setIsUserPermitWhitelist] = useState<boolean>()

  const [isCheckingWhitelist1, setIsCheckingWhitelist1] = useState(true)
  const [isCheckingWhitelist2, setIsCheckingWhitelist2] = useState(true)

  const checkIsUserInWhitelist = useCallback(async () => {
    if (!enableWhiteList) {
      setIsUserInWhitelist(true)
      setIsCheckingWhitelist1(false)
      return
    }

    if (!account || !backedChainId || !poolId) {
      setIsUserInWhitelist(undefined)
      setIsCheckingWhitelist1(false)
      return
    }

    try {
      const params = {
        address: account,
        category: category,
        chainId: backedChainId,
        poolId: String(poolId),
        tokenType: getTokenType(category)
      }
      const proofOrSign = await getUserWhitelistProof(params)

      setIsUserInWhitelist(!!proofOrSign.data.proof)
    } catch (error) {
      setIsUserInWhitelist(false)
    } finally {
      setIsCheckingWhitelist1(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, category, backedChainId, enableWhiteList, poolId])

  const checkIsUserInPermitWhitelist = useCallback(async () => {
    if (!enableWhiteList) {
      setIsUserPermitWhitelist(true)
      setIsCheckingWhitelist2(false)
      return
    }

    if (!account || !backedChainId || !poolId) {
      setIsUserPermitWhitelist(undefined)
      setIsCheckingWhitelist2(false)
      return
    }

    try {
      const params = {
        address: account,
        category: category,
        chainId: backedChainId,
        poolId: String(poolId),
        tokenType: getTokenType(category)
      }
      const proofOrSign = await getUserPermitSign(params)

      setIsUserPermitWhitelist(!!proofOrSign.data.signature)
    } catch (error) {
      setIsUserPermitWhitelist(false)
    } finally {
      setIsCheckingWhitelist2(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enableWhiteList, account, backedChainId, poolId, category, token])

  useEffect(() => {
    checkIsUserInWhitelist()
  }, [checkIsUserInWhitelist])

  useEffect(() => {
    checkIsUserInPermitWhitelist()
  }, [checkIsUserInPermitWhitelist])

  return {
    isUserInWhitelist: isUserInWhitelist || isUserPermitWhitelist,
    isPermit: isUserPermitWhitelist,
    loading: isCheckingWhitelist1 || isCheckingWhitelist2
  }
}
