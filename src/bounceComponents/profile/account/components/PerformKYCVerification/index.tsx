import { Stack, Typography, Box } from '@mui/material'
import { ReactComponent as GreeErrSvg } from 'assets/imgs/icon/gree-err.svg'
import useBreakpoint from 'hooks/useBreakpoint'
import SumsubWebDialog from 'bounceComponents/account/SumsubWebDialog'
import { show } from '@ebay/nice-modal-react'
import { useCallback, useMemo, useState } from 'react'
import { useShowLoginModal, useUserInfo } from 'state/users/hooks'
import { VerifyStatus } from 'api/profile/type'
import { routes } from 'constants/routes'
import { IS_TEST_ENV } from '../../../../../constants'
import CloseIcon from '@mui/icons-material/Close'

const homeShowList = [
  routes.market.index,
  routes.launchpad.index,
  routes.tokenAuction.index,
  routes.nftAuction.index,
  routes.realAuction.index,
  routes.adsAuction.index,
  routes.tokenToolBox.index,
  routes.loyaltyprogram.index
]

const sessionStorage_KYC_HIDE_NOTICE = 'sessionStorage_KYC_HIDE_NOTICE'

const accountShowList = Object.values(routes.account)
const PerformKYCVerification = () => {
  const [showNotice, setShowNotice] = useState(sessionStorage.getItem(sessionStorage_KYC_HIDE_NOTICE) ? false : true)

  const closeNotice = useCallback(() => {
    setShowNotice(false)
    sessionStorage.setItem(sessionStorage_KYC_HIDE_NOTICE, 'hide')
  }, [])

  const isSm = useBreakpoint('sm')
  const { userInfo } = useUserInfo()
  const { token } = useUserInfo()
  const showLoginModal = useShowLoginModal()
  const isNoVerify = useMemo(() => !userInfo || userInfo.ifKyc === VerifyStatus.NoVerify, [userInfo])
  const { pathname } = window.location
  const isHomeShow = useMemo(() => homeShowList.includes(pathname), [pathname])
  const isAccountShow = useMemo(() => accountShowList.includes(pathname), [pathname])
  const isLg = useBreakpoint('lg')
  return (
    <>
      {isNoVerify && (isHomeShow || isAccountShow) && !IS_TEST_ENV && showNotice && (
        <Box
          mb={isSm ? 8 : 0}
          sx={{
            background: '#F9FCDE',
            padding: '16px 0',

            marginLeft: isAccountShow && !isLg ? 240 : 'auto',
            '@media(max-width:1296px)': {
              marginBottom: 24,
              '&>div': {
                marginLeft: 16
              }
            }
          }}
        >
          <Stack
            direction={'row'}
            sx={{
              maxWidth: '1296px',
              margin: '0 auto',
              justifyContent: 'space-between'
            }}
          >
            <Stack
              sx={{ cursor: 'pointer' }}
              spacing={16}
              direction={'row'}
              alignItems={'center'}
              onClick={() => (!userInfo || !token ? showLoginModal() : show(SumsubWebDialog))}
            >
              <GreeErrSvg />
              <Box
                sx={{
                  color: '#908E96',
                  '&>span,&': {
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '150%'
                  }
                }}
              >
                <Typography sx={{ color: '#171717' }} component={'span'}>
                  Perform Sumsub KYC Verification{' '}
                </Typography>
                You have not performed KYC verification on the bounce platform yet, Please click to verify.
              </Box>
            </Stack>

            <CloseIcon sx={{ cursor: 'pointer' }} color="warning" onClick={closeNotice} />
          </Stack>
        </Box>
      )}
    </>
  )
}

const UpgradeNotice = () => {
  const isSm = useBreakpoint('sm')
  const { pathname } = window.location
  const isHomeShow = useMemo(() => homeShowList.includes(pathname), [pathname])
  const isAccountShow = useMemo(() => accountShowList.includes(pathname), [pathname])
  const isLg = useBreakpoint('lg')
  return (
    <>
      {(isHomeShow || isAccountShow) && !IS_TEST_ENV && (
        <Box
          mb={isSm ? 8 : 0}
          sx={{
            background: '#F9FCDE',
            padding: '16px 0',

            marginLeft: isAccountShow && !isLg ? 240 : 'auto',
            '@media(max-width:1296px)': {
              marginBottom: 24,
              '&>div': {
                marginLeft: 16
              }
            }
          }}
        >
          <Stack
            direction={'row'}
            sx={{
              maxWidth: '1400px',
              margin: '0 auto',
              justifyContent: 'space-between'
            }}
          >
            <Stack spacing={16} direction={'row'} alignItems={'center'}>
              <GreeErrSvg />
              <Box
                sx={{
                  color: '#908E96',
                  '&>span,&': {
                    fontFamily: 'Inter',
                    fontSize: '14px',
                    fontStyle: 'normal',
                    fontWeight: 400,
                    lineHeight: '150%'
                  }
                }}
              >
                <Typography sx={{ color: '#171717' }} component={'span'}>
                  {/* We are in the process of enhancing the dapp to improve the user experience. While this upgrade is
                  underway, there may be temporary service interruptions. Rest assured, we will expedite the upgrade to
                  deliver an enhanced service experience. */}
                  Our{' '}
                  <a
                    target="_blank"
                    href={'https://twitter.com/bounce_finance'}
                    style={{
                      color: 'blue'
                    }}
                    rel="noreferrer"
                  >
                    @bounce_finance
                  </a>{' '}
                  Twitter has been hacked; please report any suspicious activity as we resolve this issue.
                </Typography>
              </Box>
            </Stack>
          </Stack>
        </Box>
      )}
    </>
  )
}

export default UpgradeNotice
export { PerformKYCVerification }
