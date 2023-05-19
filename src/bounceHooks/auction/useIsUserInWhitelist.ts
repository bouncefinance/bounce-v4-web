import { useCallback, useEffect, useState } from 'react'

import { PoolType } from 'api/pool/type'
import { getUserPermitSign, getUserWhitelistProof } from 'api/user'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
import { useActiveWeb3React } from 'hooks'
import { useQueryParams } from 'hooks/useQueryParams'
import { PoolInfoProp } from 'bounceComponents/fixed-swap/type'
import getTokenType from 'utils/getTokenType'
import { useUserInfo } from 'state/users/hooks'

const useIsUserInWhitelist = (poolInfo: PoolInfoProp, category: PoolType = PoolType.FixedSwap) => {
  const { account } = useActiveWeb3React()
  const { token } = useUserInfo()

  const { poolId, chainShortName } = useQueryParams()

  const chainConfigInBackend = useChainConfigInBackend('shortName', chainShortName || '')

  const [isUserInWhitelist, setIsUserInWhitelist] = useState<boolean>()
  const [isCheckingWhitelist, setisCheckingWhitelist] = useState(true)

  const checkIsUserInWhitelist = useCallback(async () => {
    // console.log('account: ', account)
    // console.log('chainConfigInBackend?.id: ', chainConfigInBackend?.id)
    // console.log('poolId: ', poolId)

    if (!poolInfo.enableWhiteList) {
      setIsUserInWhitelist(true)
      setisCheckingWhitelist(false)
      return
    }

    if (!account || !chainConfigInBackend?.id || !poolId) {
      setIsUserInWhitelist(undefined)
      setisCheckingWhitelist(false)
      return
    }

    try {
      const proof = await getUserWhitelistProof({
        address: account,
        category: category,
        chainId: chainConfigInBackend?.id,
        poolId: String(poolId)
      })

      setIsUserInWhitelist(!!proof)
    } catch (error) {
      setIsUserInWhitelist(false)
    } finally {
      setisCheckingWhitelist(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account, category, chainConfigInBackend?.id, poolId, poolInfo.enableWhiteList, token])

  useEffect(() => {
    checkIsUserInWhitelist()
  }, [checkIsUserInWhitelist])

  return { data: isUserInWhitelist, loading: isCheckingWhitelist }
}
export default useIsUserInWhitelist

export function useIsUserInAllWhitelist(enableWhiteList: boolean, category: PoolType = PoolType.FixedSwap) {
  const { account } = useActiveWeb3React()
  const { token } = useUserInfo()

  const { poolId, chainShortName } = useQueryParams()

  const chainConfigInBackend = useChainConfigInBackend('shortName', chainShortName || '')

  const [isUserInWhitelist, setIsUserInWhitelist] = useState<boolean>()
  const [isUserPermitWhitelist, setIsUserPermitWhitelist] = useState<boolean>()

  const [isCheckingWhitelist1, setisCheckingWhitelist1] = useState(true)
  const [isCheckingWhitelist2, setisCheckingWhitelist2] = useState(true)

  const checkIsUserInWhitelist = useCallback(async () => {
    if (!enableWhiteList) {
      setIsUserInWhitelist(true)
      setisCheckingWhitelist1(false)
      return
    }

    if (!account || !chainConfigInBackend?.id || !poolId) {
      setIsUserInWhitelist(undefined)
      setisCheckingWhitelist1(false)
      return
    }

    try {
      const params = {
        address: account,
        category: category,
        chainId: chainConfigInBackend?.id,
        poolId: String(poolId),
        tokenType: getTokenType(category)
      }
      const proofOrSign = await getUserWhitelistProof(params)

      setIsUserInWhitelist(!!proofOrSign.data.proof)
    } catch (error) {
      setIsUserInWhitelist(false)
    } finally {
      setisCheckingWhitelist1(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, category, chainConfigInBackend?.id, enableWhiteList, poolId])

  const checkIsUserInPermitWhitelist = useCallback(async () => {
    if (!enableWhiteList) {
      setIsUserPermitWhitelist(true)
      setisCheckingWhitelist2(false)
      return
    }

    if (!account || !chainConfigInBackend?.id || !poolId) {
      setIsUserPermitWhitelist(undefined)
      setisCheckingWhitelist2(false)
      return
    }

    try {
      const params = {
        address: account,
        category: category,
        chainId: chainConfigInBackend?.id,
        poolId: String(poolId),
        tokenType: getTokenType(category)
      }
      const proofOrSign = await getUserPermitSign(params)

      setIsUserPermitWhitelist(!!proofOrSign.data.signature)
    } catch (error) {
      setIsUserPermitWhitelist(false)
    } finally {
      setisCheckingWhitelist2(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, category, chainConfigInBackend?.id, enableWhiteList, poolId])

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
