import { useQueryParams } from 'hooks/useQueryParams'
import { useMemo } from 'react'
import { useUserInfo } from 'state/users/hooks'
// if pool use the whitelist and need to binding email,and then user is lack of email,we use this hook
const needEmailValidPoolId = [20509]
export const useRequireWhitelistAndEmail = () => {
  const { sysId } = useQueryParams()
  const { userInfo } = useUserInfo()
  const isRequireWhiteListAndEmail = useMemo(() => {
    return sysId && needEmailValidPoolId.indexOf(Number(sysId)) > -1 && userInfo?.email
  }, [sysId, userInfo?.email])
  return isRequireWhiteListAndEmail
}
