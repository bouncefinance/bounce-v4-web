import React, { useState } from 'react'
import { AppBar, Avatar, Button, Container, Menu, MenuItem, Stack, Toolbar } from '@mui/material'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import HeartMenu from './Menu'
import styles from './styles'
import { ReactComponent as LogoSVG } from './logo.svg'

import Search from './Search'
import CreateBtn from './CreateBtn'
import { useLogout } from 'bounceHooks/user/useLogin'
import { USER_TYPE } from 'api/user/type'
import DefaultAvatarSVG from 'assets/imgs/profile/yellow_avatar.svg'
import { useUserInfo } from 'state/users/hooks'

const Header: React.FC = () => {
  const router = useRouter()
  const token = useSelector((state: RootState) => state.user.token)

  const { userId, userType, userInfo, companyInfo } = useUserInfo()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const userOpen = Boolean(anchorEl)
  const handleUserMenuClose = () => {
    setAnchorEl(null)
  }
  const { logout } = useLogout()
  const UserDialog = () => (
    <Menu
      open={userOpen}
      anchorEl={anchorEl}
      onClose={handleUserMenuClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center'
      }}
      sx={{
        mt: 4,
        '& .MuiPopover-paper': {
          borderRadius: 20,
          padding: '10px 0px'
        },
        '& .MuiList-padding': {
          padding: '0px 0px 0px 0px',
          background: '#FFFFFF',
          boxShadow: 'none',
          borderRadius: 20
        },
        '& .MuiMenuItem-gutters': {
          padding: '10px 20px'
        }
      }}
    >
      <MenuItem
        onClick={() => {
          router.push(
            Number(userType) === USER_TYPE.USER ? `/profile/summary?id=${userId}` : `/company/summary?id=${userId}`
          )
          setAnchorEl(null)
        }}
      >
        My Homepage
      </MenuItem>
      <MenuItem
        onClick={() => {
          router.push('/profile/account/settings')
          setAnchorEl(null)
        }}
      >
        Account settings
      </MenuItem>
      <MenuItem
        onClick={() => {
          logout()
          setAnchorEl(null)
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  )
  const handleUserClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  return (
    <AppBar sx={styles.root}>
      <Toolbar>
        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Link href="/market" legacyBehavior>
              <a>
                <LogoSVG />
              </a>
            </Link>
            <HeartMenu />
            <Stack direction={'row'} alignItems="center" spacing={24} flex={'1'}>
              <Search />
              <CreateBtn />
              <Stack direction="row" alignItems="center" spacing={20}>
                {token ? (
                  <div>
                    <Avatar
                      component={'button'}
                      id="userAvatar"
                      src={
                        (Number(userType) === USER_TYPE.USER
                          ? userInfo?.avatar?.fileUrl
                          : companyInfo?.avatar?.fileUrl) || DefaultAvatarSVG
                      }
                      sx={{
                        width: 52,
                        height: 52,
                        padding: 0,
                        cursor: 'pointer',
                        border: 0
                      }}
                      onClick={handleUserClick}
                    />
                    <UserDialog />
                  </div>
                ) : (
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ width: 120, height: 40, borderRadius: 20 }}
                    onClick={() => {
                      if (location.pathname === '/login') {
                        router.push('/login')
                      } else {
                        router.push(`/login?path=${location.pathname}${location.search}`)
                      }
                    }}
                  >
                    Login
                  </Button>
                )}
              </Stack>
            </Stack>
          </Stack>
        </Container>
      </Toolbar>
    </AppBar>
  )
}

export default Header
