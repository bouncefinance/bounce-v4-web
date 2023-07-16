import { useRequest } from 'ahooks'

import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { useLinkedIn } from 'react-linkedin-login-oauth2'
import { addressRegisterOrLogin, login, logout } from 'api/user'
import { ACCOUNT_TYPE, ILoginParams } from 'api/user/type'
import { fetchUserInfo, saveLoginInfo, removeUserInfo, ICacheLoginInfo, getLocalUserToken } from 'state/users/reducer'
import { useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { routes } from 'constants/routes'
import { useCallback, useEffect, useState } from 'react'
import { useSignMessage } from 'hooks/useWeb3Instance'
import { useActiveWeb3React } from 'hooks'
import { IResponse } from 'api/type'
import { useSignLoginModalToggle, useWalletModalToggle } from 'state/application/hooks'
import { useQueryParams } from 'hooks/useQueryParams'
import useIsWindowVisible from 'hooks/useIsWindowVisible'

export const hellojs = typeof window !== 'undefined' ? require('hellojs') : null
export type IAuthName = 'google' | 'twitter'

export const useLogin = (path?: string) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  return useRequest((params: ILoginParams) => login(params), {
    manual: true,
    onSuccess: async response => {
      const { code, data } = response
      if (code === 10412) {
        return toast.error('Incorrect password')
      }
      if (code === 10401) {
        return toast.error('Incorrect Account')
      }
      if (code === 10457) {
        return toast.error(
          'Your account already exists. For Metalents users who log in to Bounce for the first time, please click Forgot Password to verify your email.'
        )
      }
      if (code === 10406 || code === 10418 || code === 10407) {
        return toast.error('Sorry, your account has not been registered yet. Please register first.')
      }
      if (code !== 200) {
        return toast.error('Login fail')
      }
      toast.success('Welcome to Bounce')
      dispatch({
        type: 'users/saveLoginInfo',
        payload: {
          token: data?.token,
          userId: data?.userId,
          userType: data?.userType
        }
      })
      const res = await dispatch(
        fetchUserInfo({
          userId: data?.userId
        })
      )
      if (path) {
        return navigate(path)
      }
      if (res.payload?.avatar?.fileUrl) {
        navigate(routes.market.index)
      } else {
        navigate(routes.market.index)
      }
    }
  })
}

export const useWeb3Login = (path?: string) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { redirect } = useQueryParams()
  const location = useLocation()

  const { account } = useActiveWeb3React()
  const signMessage = useSignMessage()
  return useRequest(
    () =>
      new Promise(async (resolve: (value: IResponse<any>) => void, reject) => {
        try {
          const message = 'Register or login for Bounce'
          const signRes = await signMessage(message)
          const res = await addressRegisterOrLogin({ address: account || '', message, signature: signRes })
          resolve(res)
        } catch (error) {
          reject(error)
        }
      }),
    {
      manual: true,
      onSuccess: async response => {
        const { code, data } = response
        if (code === 10412) {
          return toast.error('Incorrect password')
        }
        if (code === 10401) {
          return toast.error('Incorrect Account')
        }
        if (code === 10457) {
          return toast.error(
            'Your account already exists. For Metalents users who log in to Bounce for the first time, please click Forgot Password to verify your email.'
          )
        }
        if (code === 10406 || code === 10418 || code === 10407) {
          return toast.error('Sorry, your account has not been registered yet. Please register first.')
        }
        if (code !== 200) {
          return toast.error('Login fail')
        }
        toast.success('Welcome to Bounce')
        dispatch({
          type: 'users/saveLoginInfo',
          payload: {
            token: data?.token,
            userId: data?.userId,
            userType: data?.userType,
            address: account
          }
        })
        await dispatch(
          fetchUserInfo({
            userId: data?.userId
          })
        )

        if (location.pathname.includes('okxActivity')) {
          return
        }

        if (data?.ifLogin === false) {
          const _redirect = redirect
            ? redirect
            : location.pathname === routes.login
            ? routes.market.index
            : location.pathname + location.search
          navigate(routes.loginBase + `?redirect=${_redirect}`)
          return
        }
        if (path) {
          return navigate(path)
        }
        if (location.pathname === routes.login) {
          if (redirect) {
            return navigate(redirect)
          }
          return navigate(routes.market.index)
        }
      }
    }
  )
}

export const useLogout = () => {
  const dispatch = useDispatch()
  const handleLogout = () => {
    logout()
    dispatch(
      saveLoginInfo({
        token: '',
        userId: '',
        userType: '',
        address: ''
      })
    )
    dispatch(removeUserInfo())
    // navigate(`${routes.login}?path=${location.pathname}${location.search}`)
  }
  return { logout: handleLogout }
}

export const useOauth = () => {
  hellojs?.init(
    {
      google: '117868071955-dkealrsgucq1bkcmu5u6cljmko7i90b8.apps.googleusercontent.com',
      twitter: 'aXlqMi1pS21uYkZDYlhNZzIzMG86MTpjaQ'
    },
    {
      redirect_uri: '/'
    }
  )
  const handleOauth = async (oauthName: string) => {
    const response = await hellojs(oauthName).login({ scope: 'email' })
    return response?.authResponse?.access_token
  }
  return {
    handleOauth
  }
}

export const useLinkedInOauth = (onChange: (accessToken: string, oauthType: ACCOUNT_TYPE) => void) => {
  const { linkedInLogin } = useLinkedIn({
    clientId: '86tbcvp8g3jtq0',
    redirectUri: typeof window !== 'undefined' ? `${window.location.origin}/linkedin` : '',
    scope: 'r_emailaddress r_liteprofile',
    onSuccess: async (code: string) => {
      onChange(code, ACCOUNT_TYPE.LINKEDIN)
    }
  })
  return { linkedInLogin }
}

interface IUserInfoData {
  address: string
  id: number
  email: string
  passwordSet: boolean
  fullName: string
  fullNameId: number
  avatar: {
    id: number
    type: number
    userId: number
    fileName: string
    fileType: string
    fileSize: number
    fileUrl: string
    fileThumbnailUrl: string
  }
  banner: string
  location: string
  timezone: string
  publicRole: number[]
  companyRole: number
  company: { name: string; avatar: string; link: string }
  companyId: number
  thirdpartId: number
  university: { name: string; avatar: string; link: string }
  description: string
  contactEmail: string
  website: string
  github: string
  discord: string
  instagram: string
  googleEmail: string
  twitter: string
  twitterName: string
  linkedin: string
  linkedinName: string
  userType: number
  isMember: number
  primaryRole: number
  years: number
  skills: string
  currentState: string
  jobTypes: any[]
  ifRemotely: 0
  desiredSalary: string
  desiredCompanySize: number
  desiredMarket: any[]
  careJobs: any[]
  resumes: any[]
  isVerify: number
}

export function useUserInfo(): ICacheLoginInfo & {
  userInfo?: IUserInfoData
  companyInfo: any
} {
  const { account } = useActiveWeb3React()
  const loginInfo = useSelector<AppState, AppState['users']>(state => state.users)
  if (account !== loginInfo.address) {
    return {
      address: '',
      token: '',
      userId: 0,
      userType: '0',
      userInfo: undefined,
      companyInfo: {}
    }
  }
  return loginInfo
}

// export function useAutoLogin() {
//   const { token, userId, userType } = useQueryParams()
//   const { token: loginToken, userId: loginUserId } = useUserInfo()
//   const { pathname } = useLocation()
//   const navigate = useNavigate()
//   const dispatch = useDispatch()
//   useEffect(() => {
//     ;(async () => {
//       if (token && userId && userType && pathname === '/') {
//         dispatch({
//           type: 'users/saveLoginInfo',
//           payload: {
//             token: token,
//             userId: Number(userId),
//             userType
//           }
//         })
//         dispatch(
//           fetchUserInfo({
//             userId: userId
//           })
//         )
//       }
//     })()
//   }, [dispatch, navigate, pathname, token, userId, userType])

//   useEffect(() => {
//     loginToken &&
//       dispatch(
//         fetchUserInfo({
//           userId: loginUserId
//         })
//       )
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])
// }

export function useRefreshUserInfoByFirstLoad() {
  const [first, setFirst] = useState(true)
  const dispatch = useDispatch()
  const { token, userId } = useUserInfo()

  useEffect(() => {
    if (!first || !token || !userId) return
    setFirst(false)
    dispatch(
      fetchUserInfo({
        userId: userId
      })
    )
  }, [dispatch, first, token, userId])
}

export function useRefreshUserInfoCallback() {
  const dispatch = useDispatch()
  const { token, userId } = useUserInfo()

  return useCallback(() => {
    if (!token || !userId) return
    dispatch(
      fetchUserInfo({
        userId: userId
      })
    )
  }, [dispatch, token, userId])
}

export function useShowLoginModal() {
  const walletModalToggle = useWalletModalToggle()
  const signLoginModalToggle = useSignLoginModalToggle()
  const { account } = useActiveWeb3React()

  return !account ? walletModalToggle : signLoginModalToggle
}

export function useUpdateUserLoginInfoWithWindowVisible() {
  const windowVisible = useIsWindowVisible()
  const dispatch = useDispatch()

  useEffect(() => {
    const localUserToken = getLocalUserToken()

    if (windowVisible) {
      dispatch({
        type: 'users/saveLoginInfo',
        payload: {
          token: localUserToken?.token,
          userId: localUserToken?.userId,
          address: localUserToken?.address
        }
      })
    }
  }, [dispatch, windowVisible])
}
