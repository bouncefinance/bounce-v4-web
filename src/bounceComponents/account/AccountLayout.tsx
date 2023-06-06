import { Box, Typography, useTheme } from '@mui/material'
import { routes } from 'constants/routes'
import { useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useUserInfo } from 'state/users/hooks'
import LeftMenu from './LeftMenu'
import Divider from 'components/Divider'
import useBreakpoint from '../../hooks/useBreakpoint'
import { ReactComponent as DashboardIcon } from '../../assets/svg/account/dashboard.svg'
import { ReactComponent as ProfileIcon } from '../../assets/svg/account/my-profile.svg'
import { ReactComponent as AccountIcon } from '../../assets/svg/account/my-account.svg'
import { ReactComponent as CredentialsIcon } from '../../assets/svg/account/my-credentials.svg'
import { ReactComponent as TokenIcon } from '../../assets/svg/account/my-token.svg'
import { ReactComponent as NFTIcon } from '../../assets/svg/account/my-nft.svg'
import { ReactComponent as RealIcon } from '../../assets/svg/account/my-real.svg'
import { ReactComponent as AdsIcon } from '../../assets/svg/account/my-ads.svg'
import { ReactComponent as PrivateIcon } from '../../assets/svg/account/my-private-launchpad.svg'
import { ReactComponent as SdkIcon } from '../../assets/svg/account/sdk.svg'
import { ReactComponent as JobsIcon } from '../../assets/svg/account/jobs.svg'

export type LinksProps = {
  name: string
  svg: JSX.Element
  route?: string
  link?: string
  _blank?: boolean
  disabled?: boolean
}

export default function AccountLayout({ children, bgColor }: { children: JSX.Element | string; bgColor?: string }) {
  const { userId, token } = useUserInfo()
  const theme = useTheme()
  const navigate = useNavigate()
  const isMd = useBreakpoint('lg')
  const { pathname } = useLocation()

  const Links: LinksProps[][] = useMemo(
    () => [
      [
        {
          name: 'Dashboard',
          svg: <DashboardIcon />,
          route: routes.account.dashboard
        },
        {
          name: 'My Profile',
          svg: <ProfileIcon />,
          route: routes.account.myProfile
        },
        {
          name: 'My Account',
          svg: <AccountIcon />,
          route: routes.account.myAccount
        },
        {
          name: 'My Credentials',
          svg: <CredentialsIcon />,
          route: routes.account.myCredentials
        }
      ],
      [
        {
          name: 'Token Auction',
          svg: <TokenIcon />,
          route: routes.account.tokenAuction
        },
        {
          name: 'NFT Auction',
          svg: <NFTIcon />,
          route: routes.account.nftAuction
        },
        {
          name: 'Real World Collectibles Auction',
          svg: <RealIcon />,
          route: routes.account.realAuction
        },
        {
          name: 'Advertisement Auction',
          svg: <AdsIcon />,
          route: routes.account.adsAuction
        },
        {
          name: 'Private Launchpad',
          svg: <PrivateIcon />,
          route: routes.account.myPrivateLaunchpad
        }
      ],
      [
        {
          name: 'Developer & SDK',
          svg: <SdkIcon />,
          _blank: true,
          link: 'https://www.npmjs.com/package/bounce-sdk-beta'
        },
        {
          name: 'Jobs Network',
          svg: <JobsIcon />,
          link: `https://jobs.bounce.finance/?token=${token}&userId=${userId}&userType=1`
        }
      ]
    ],
    [token, userId]
  )

  useEffect(() => {
    if (!token) {
      navigate(routes.market.index)
    }
  }, [navigate, token])

  return (
    <>
      {!isMd && (
        <Box
          sx={{
            display: 'grid',
            // borderTop: '1px solid var(--ps-text-5)',
            gridTemplateColumns: '240px 1fr'
          }}
        >
          <Box
            sx={{
              position: 'fixed',
              zIndex: 1,
              top: theme => `${theme.height.header}`,
              left: 0,
              right: 0
            }}
          >
            <Divider />
          </Box>
          <LeftMenu Links={Links} pathname={pathname} />
          <Box
            sx={{
              minHeight: `calc(100vh - ${theme.height.header})`,
              backgroundColor: bgColor || '#fff'
            }}
          >
            {children}
          </Box>
        </Box>
      )}
      {isMd && (
        <Box>
          <Box
            sx={{
              height: '41px',
              display: 'flex',
              alignItems: 'center',
              fontSize: '13px',
              color: 'rgba(18, 18, 18, 0.6)',
              background: '#fff',
              overflowX: 'scroll',
              whiteSpace: 'nowrap',
              '&::-webkit-scrollbar': {
                display: 'none'
              }
            }}
          >
            {Links.map(list =>
              list.map(item => (
                <Typography
                  sx={{
                    padding: '0 12px',
                    lineHeight: '40px',
                    borderBottom: !!(item.route && pathname.includes(item.route))
                      ? '1px solid var(--ps-yellow-1)'
                      : 'none'
                  }}
                  onClick={() =>
                    item.route
                      ? navigate(item.route)
                      : item.link
                      ? item._blank
                        ? window.open(item.link)
                        : (location.href = item.link!)
                      : {}
                  }
                  key={item.name}
                >
                  {item.name}
                </Typography>
              ))
            )}
          </Box>
          <Box>{children}</Box>
        </Box>
      )}
    </>
  )
}
