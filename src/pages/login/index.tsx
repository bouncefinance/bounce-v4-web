import React, { useEffect } from 'react'
// import { LoadingButton } from '@mui/lab'
import { useUserInfo } from 'state/users/hooks'
// import { useQueryParams } from 'hooks/useQueryParams'
import { Box, Container, Typography, useTheme } from '@mui/material'
// import { toast } from 'react-toastify'
// import { useNavigate } from 'react-router-dom'
// import { routes } from 'constants/routes'
import loginIllustration from 'assets/images/login-cover.png'
import Footer from 'bounceComponents/common/Footer'
import { useGetWalletOptions } from 'components/Modal/WalletModal'
import { useActiveWeb3React } from 'hooks'
import { useOpenModal } from 'state/application/hooks'
import { ApplicationModal } from 'state/application/actions'
import { useWeb3React } from '@web3-react/core'
import { routes } from 'constants/routes'
import { useQueryParams } from 'hooks/useQueryParams'
import { useNavigate } from 'react-router-dom'

const illustrationWidth = 500

export function LoginLayout({ image, children }: { image: string; children: JSX.Element }) {
  const theme = useTheme()
  return (
    <Box
      sx={{
        backgroundColor: '#fff'
      }}
      display={'grid'}
      gridTemplateColumns={`1fr ${illustrationWidth}px`}
    >
      <Box>
        <Box minHeight={`calc(100vh - ${theme.height.header} - 60px)`}>{children}</Box>
        <Footer />
      </Box>
      <Box
        sx={{
          position: 'fixed',
          right: 0,
          width: illustrationWidth,
          top: theme => theme.height.header,
          bottom: 0,
          backgroundColor: 'var(--ps-yellow-1)',
          backgroundImage: `url(${image})`,
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'contain',
          backgroundPosition: 'center center'
        }}
      />
    </Box>
  )
}

const Login: React.FC = () => {
  const { redirect } = useQueryParams()
  const { token } = useUserInfo()
  const { error } = useWeb3React()

  const navigate = useNavigate()
  const getWalletOptions = useGetWalletOptions()
  const { account } = useActiveWeb3React()
  const openSignLoginModal = useOpenModal(ApplicationModal.SIGN_LOGIN)
  const openWalletModal = useOpenModal(ApplicationModal.WALLET)

  useEffect(() => {
    if (error) {
      openWalletModal()
    }
  }, [error, openWalletModal])

  useEffect(() => {
    if (account && !token) {
      openSignLoginModal()
    }
  }, [account, openSignLoginModal, token])

  useEffect(() => {
    if (token) {
      setTimeout(() => {
        if (window.location.pathname.includes(routes.login)) {
          navigate(redirect || routes.market.index)
        }
      }, 2000)
    }
  }, [navigate, redirect, token])

  return (
    <section>
      <LoginLayout image={loginIllustration}>
        <Container
          sx={{
            maxWidth: '676px !important',
            py: 94
          }}
        >
          <Typography variant="h1">Login</Typography>
          <Typography mt={10}>Connect to a wallet</Typography>
          <Box mt={40} display="grid" gap="16px" width="100%" gridTemplateColumns={'1fr 1fr'}>
            {getWalletOptions}
          </Box>
        </Container>
      </LoginLayout>
    </section>
  )
}

export default Login
