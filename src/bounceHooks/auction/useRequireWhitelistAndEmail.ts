import { useActiveWeb3React } from 'hooks'
import { useQueryParams } from 'hooks/useQueryParams'
import { useMemo } from 'react'
import { useUserInfo } from 'state/users/hooks'
// if pool use the whitelist and need to binding email,and then user is lack of email,we use this hook
// const needEmailValidPoolId = [20508] // stage
const needEmailValidPoolId = [20519] // alpha
export const useRequireWhitelistAndEmail = (): boolean => {
  const { sysId } = useQueryParams()
  const { userInfo } = useUserInfo()
  const { account } = useActiveWeb3React()
  const isRequireWhiteListAndEmail = useMemo(() => {
    return !!(account && sysId && needEmailValidPoolId.indexOf(Number(sysId)) > -1 && !userInfo?.email)
  }, [account, sysId, userInfo?.email])
  return isRequireWhiteListAndEmail
}
