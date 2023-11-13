import { useActiveWeb3React } from 'hooks'
import { useQueryParams } from 'hooks/useQueryParams'
import { useMemo } from 'react'
import { useUserInfo } from 'state/users/hooks'

// if pool use the whitelist and need to binding email,and then user is lack of email,we use this hook
// const needEmailValidPoolId = [20508] // stage
const needEmailValidPoolId = [20519, 20562, 20698, 20764, 20916, 20917, 20918, 20930] // alpha
/**
 * sysId 20764 & /zetachainathens3/1
 * sysId 20916 & /zetachainathens3/2
 * sysId 20917 & /zetachainathens3/3
 * sysId 20918 & /zetachainathens3/4
 * sysId 20930 & /zetachainathens3/5 the new
 */
export const useRequireWhitelistAndEmail = (): boolean => {
  const { poolId, chainShortName, sysId } = useQueryParams()
  const { userInfo } = useUserInfo()
  const { account } = useActiveWeb3React()
  console.log('WhitelistAndEmail >>>', poolId, chainShortName, sysId, userInfo?.email)
  const isZetachainathens3 = useMemo(() => {
    return chainShortName === 'zetachainathens3' && [1, 2, 3, 4, 5].indexOf(Number(poolId)) > -1
  }, [chainShortName, poolId])
  const isRequireWhiteListAndEmail = useMemo(() => {
    return !!(account && sysId && needEmailValidPoolId.indexOf(Number(sysId)) > -1 && !userInfo?.email)
  }, [account, sysId, userInfo?.email])
  return isRequireWhiteListAndEmail || isZetachainathens3
}
export const useIsSpecialPoolId = (): boolean => {
  const { poolId, chainShortName, sysId } = useQueryParams()
  const isZetachainathens3 = useMemo(() => {
    return chainShortName === 'zetachainathens3' && [1, 2, 3, 4, 5].indexOf(Number(poolId)) > -1
  }, [chainShortName, poolId])
  const isSpecialPoolId = useMemo(() => {
    return !!(sysId && needEmailValidPoolId.indexOf(Number(sysId)) > -1)
  }, [sysId])
  return isSpecialPoolId || isZetachainathens3
}
