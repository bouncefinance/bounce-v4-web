import { useActiveWeb3React } from 'hooks'
import { useQueryParams } from 'hooks/useQueryParams'
import { useMemo } from 'react'
import { useUserInfo } from 'state/users/hooks'

// if pool use the whitelist and need to binding email,and then user is lack of email,we use this hook
// const needEmailValidPoolId = [20508] // stage
const needEmailValidPoolId = [20519, 20562, 20698, 20764] // alpha
export const useRequireWhitelistAndEmail = (): boolean => {
  const { poolId, chainShortName, sysId } = useQueryParams()

  const { userInfo } = useUserInfo()
  const { account } = useActiveWeb3React()
  const isZetachainathens3 = useMemo(() => {
    return chainShortName === 'zetachainathens3' && (Number(poolId) === 1 || [20916].indexOf(Number(sysId)) > -1)
  }, [chainShortName, poolId, sysId])
  const isRequireWhiteListAndEmail = useMemo(() => {
    return !!(account && sysId && needEmailValidPoolId.indexOf(Number(sysId)) > -1 && !userInfo?.email)
  }, [account, sysId, userInfo?.email])
  return isRequireWhiteListAndEmail || isZetachainathens3
}
export const useIsSpecialPoolId = (): boolean => {
  const { poolId, chainShortName, sysId } = useQueryParams()
  const isZetachainathens3 = useMemo(() => {
    return chainShortName === 'zetachainathens3' && (Number(poolId) === 1 || [20916].indexOf(Number(sysId)) > -1)
  }, [chainShortName, poolId, sysId])
  const isSpecialPoolId = useMemo(() => {
    return !!(sysId && needEmailValidPoolId.indexOf(Number(sysId)) > -1)
  }, [sysId])
  return isSpecialPoolId || isZetachainathens3
}
