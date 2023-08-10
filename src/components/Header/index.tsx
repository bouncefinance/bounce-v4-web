import { useCallback, useMemo, useState } from 'react'
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom'
import { AppBar, Box, Button, IconButton, Stack, styled, Typography } from '@mui/material'
// import { ExternalLink } from 'themes/components'
import Web3Status from './Web3Status'
import { ShowOnMobile } from 'themes/index'
// import PlainSelect from 'components/Select/PlainSelect'
import Image from 'components/Image'
import logo from '../../assets/svg/logo.svg'
import logoWhite from '../../assets/svg/logo-white.svg'
import logoIcon from '../../assets/svg/logo-icon.svg'
import { routes } from 'constants/routes'
import MobileMenu from './MobileMenu'
import NetworkPopperSelect from './NetworkPopperSelect'
import Search from 'bounceComponents/common/Header/Search'
import CreateBtn from 'bounceComponents/common/Header/CreateBtn'
import { useUserInfo } from 'state/users/hooks'
import { ReactComponent as UserIcon } from 'assets/svg/account/user.svg'
import { ReactComponent as WalletIcon } from 'assets/svg/account/wallet.svg'
import { useHeaderBgOpacity } from 'hooks/useScroll'
import Resources from './Resources'
import HeaderLink from './HeaderLink'
import useBreakpoint from '../../hooks/useBreakpoint'
import MenuIcon from '@mui/icons-material/Menu'
interface TabContent {
  title: string
  route?: string
  link?: string
  titleContent?: JSX.Element
}

interface Tab extends TabContent {
  subTab?: TabContent[]
}

export const Tabs: Tab[] = [
  {
    title: 'Token&NFT Auction',
    route: routes.market.index
  },
  {
    title: 'Real World Collectibles Auction',
    route: routes.realAuction.index
  },
  {
    title: 'Ads Auction',
    route: routes.adsAuction.index
  },

  { title: 'Token', link: 'https://token.bounce.finance/staking' }
]

const StyledAppBar = styled(AppBar)<{ isTransparent?: boolean }>(({ theme, isTransparent }) => ({
  position: 'fixed',
  height: theme.height.header,
  backgroundColor: isTransparent ? 'transparent' : theme.palette.background.paper,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  boxShadow: 'none',
  padding: '0 40px 0 40px!important',
  zIndex: theme.zIndex.drawer,
  // borderBottom: '1px solid rgba(0, 0, 0, 0.1)',
  '& .link': {
    textDecoration: 'none',
    fontSize: 16,
    color: theme.palette.text.primary,
    marginRight: 24,
    paddingBottom: '3px',
    borderBottom: '1px solid transparent',
    '&.active': {
      opacity: 1,
      borderColor: theme.palette.text.primary
    },
    '&:hover': {
      opacity: 0.5
    }
  },
  [theme.breakpoints.down('lg')]: {
    '& .link': { marginRight: 15 },
    padding: '0 24px 0 24!important'
  },
  [theme.breakpoints.down('md')]: {
    position: 'fixed'
  },
  [theme.breakpoints.down('sm')]: {
    height: theme.height.mobileHeader,
    padding: '12px 20px !important'
  }
}))

const Filler = styled('div')(({ theme }) => ({
  display: 'none',
  [theme.breakpoints.down('md')]: {
    height: theme.height.header,
    display: 'block'
  },
  [theme.breakpoints.down('sm')]: {
    height: theme.height.mobileHeader,
    padding: '0 20px'
  }
}))

const MainLogo = styled(Link)(({ theme }) => ({
  '& img': {
    height: 29
  },
  '&:hover': {
    cursor: 'pointer'
  },
  [theme.breakpoints.down('sm')]: {
    '& img': { width: 'auto', height: '22px' },
    marginBottom: -10
  }
}))

const transparentRoutes = [
  routes.market.index,
  routes.market.nftPools,
  routes.nftAuction.index,
  routes.tokenAuction.index,
  routes.adsAuction.index,
  routes.realAuction.index,
  routes.launchpad.index,
  routes.launchpad.bladeDao,
  routes.launchpad.bladeDaoInfo,
  routes.thirdPart.poseiswapAuction,
  routes.thirdPart.foundoDetail,
  routes.launchpad.bladeDaoInfo,
  routes.thirdPart.OmegaAuction,
  routes.thirdPart.TypeitAuction,
  routes.thirdPart.TypeitAuctionWhitelist,
  routes.thirdPart.poseiswapAuction,
  routes.thirdPart.OpenfabricAuction,
  routes.thirdPart.DeelanceAuction,
  routes.thirdPart.LasMetaAuction,
  routes.thirdPart.MetaBloxAuction,
  routes.thirdPart.DipExchange
]

// const transparentRoutesWithParams = [routes.launchpad.projectInfo]

export const whiteLogoRoutes = [
  routes.launchpad.bladeDao,
  routes.thirdPart.foundoDetail,
  routes.launchpad.bladeDaoInfo,
  routes.thirdPart.TypeitAuction,
  routes.thirdPart.TypeitAuctionWhitelist,
  routes.thirdPart.OpenfabricAuction,
  routes.thirdPart.DeelanceAuction,
  routes.thirdPart.LasMetaAuction,
  routes.thirdPart.MetaBloxAuction,
  routes.thirdPart.DipExchange
]

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const isSm = useBreakpoint('sm')
  const location = useLocation()
  // const routesWithoutParams = transparentRoutesWithParams.map(r => {
  //   const pattern = /^(\/[^/:]+\/[^/:]+)/
  //   const match = r.match(pattern)
  //   if (match) {
  //     return match[1]
  //   } else {
  //     return ''
  //   }
  // })
  const handleMobileMenuDismiss = useCallback(() => {
    setMobileMenuOpen(false)
  }, [])

  const { token } = useUserInfo()
  const { pathname } = useLocation()

  const mobileHideHeader = useMemo(() => {
    return pathname.includes('okxActivity') || pathname.includes('nfc_detail')
  }, [pathname])

  const navigate = useNavigate()
  const headerBgOpacity = useHeaderBgOpacity()

  const isTransparentRoute = useMemo(
    () => transparentRoutes.includes(pathname) || transparentRoutes.some(route => matchPath(route, pathname)),
    [pathname]
  )

  const isWhiteLogo = useMemo(
    () => whiteLogoRoutes.includes(pathname) || whiteLogoRoutes.some(route => matchPath(route, pathname)),
    [pathname]
  )

  const headerBg = useMemo(() => {
    if (!isTransparentRoute) return {}
    return { backgroundColor: `rgba(255,255,255,${headerBgOpacity})` }
  }, [headerBgOpacity, isTransparentRoute])

  const walletClick = () => {
    if (location.pathname === routes.login) {
      return
    }
    const _redirect = location.pathname + location.search
    navigate(routes.login + (_redirect ? `?redirect=${_redirect}` : ''))
  }
  const walletWithoutToken = isSm ? (
    <Button
      onClick={walletClick}
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0px 12px',
        width: '78px',
        height: '40px',
        background: '#E1F25C',
        borderRadius: '6px'
      }}
    >
      Connect
    </Button>
  ) : (
    <Button
      onClick={walletClick}
      sx={{
        minWidth: 212,
        borderRadius: 8,
        padding: '0 12px',
        border: '1px solid var(--ps-gray-20)',
        height: isSm ? 40 : 44,
        backgroundColor: theme => theme.palette.background.paper,
        '&:hover .line': {
          borderColor: 'var(--ps-text-4)'
        }
      }}
    >
      <UserIcon />
      <Box
        className="line"
        sx={{
          borderRight: '1px solid var(--ps-gray-20)',
          mx: 10,
          height: '100%'
        }}
      />
      <WalletIcon />
      <Typography variant="h5" ml={5} sx={{ whiteSpace: 'nowrap' }}>
        Connect wallet
      </Typography>
    </Button>
  )
  return (
    <Box
      sx={{
        display: { xs: mobileHideHeader ? 'none' : 'block', md: 'block' }
      }}
    >
      <MobileMenu isOpen={mobileMenuOpen} onDismiss={handleMobileMenuDismiss} />
      <Filler />
      <StyledAppBar isTransparent={isTransparentRoute} sx={headerBg}>
        <Box display="flex" alignItems="center">
          <MainLogo id={'logo'} to={'/'}>
            <Image
              style={isWhiteLogo && !isSm ? { mixBlendMode: 'difference' } : {}}
              src={isSm ? logoIcon : isWhiteLogo ? logoWhite : logo}
              alt={'logo'}
            />
          </MainLogo>
          {!isTransparentRoute && !isSm && <HeaderLink />}
        </Box>
        <Stack display={isSm ? 'none' : 'inherit'} direction={'row'} alignItems="center" spacing={8} flex={1}>
          <Search />
          <Resources />
          <CreateBtn />
          {token && <NetworkPopperSelect />}
          <Web3Status />
          {!token && walletWithoutToken}
        </Stack>
        <Box display={isSm ? 'inherit' : 'none'} alignItems="center" gap={{ xs: '6px', sm: '20px' }}>
          {/* <Web3Status /> */}
          <ShowOnMobile breakpoint="md">
            <Stack direction={'row'} spacing={10} display={'flex'} alignItems={'center'}>
              {token && <NetworkPopperSelect />}
              <Web3Status />
              {!token && walletWithoutToken}
              <IconButton
                sx={{
                  height: { xs: 24, sm: 32 },
                  width: { xs: 24, sm: 32 },
                  mb: { xs: 0, sm: 15 },
                  mt: { xs: 0, sm: 8 },
                  padding: '4px'
                }}
                onClick={() => {
                  setMobileMenuOpen(open => !open)
                }}
              >
                <MenuIcon sx={{ color: 'black' }} />
              </IconButton>
            </Stack>
          </ShowOnMobile>
        </Box>
      </StyledAppBar>
    </Box>
  )
}
