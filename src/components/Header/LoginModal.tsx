import { useModalOpen, useSignLoginModalToggle } from 'state/application/hooks'
import Modal from '../Modal'
import { ApplicationModal } from 'state/application/actions'
import { Box, Button, Typography } from '@mui/material'
import logo from 'assets/svg/logo-icon.svg'
import Image from 'components/Image'
import { useUserInfo, useWeb3Login } from 'state/users/hooks'
import { useCallback, useEffect } from 'react'
import { setInjectedConnected } from 'utils/isInjectedConnectedPrev'
import { useWeb3React } from '@web3-react/core'
import { useActiveWeb3React } from 'hooks'
import { LoadingButton } from '@mui/lab'

export default function LoginModal() {
  const { connector, deactivate } = useWeb3React()
  const { account } = useActiveWeb3React()
  const walletModalOpen = useModalOpen(ApplicationModal.SIGN_LOGIN)
  const toggleSignLoginModal = useSignLoginModalToggle()
  const { run: login, loading } = useWeb3Login()

  const { token } = useUserInfo()

  const closeModal = useCallback(() => {
    if (token && walletModalOpen) {
      toggleSignLoginModal()
    }
  }, [toggleSignLoginModal, token, walletModalOpen])

  const openModal = useCallback(() => {
    if (!token && !walletModalOpen && account) {
      toggleSignLoginModal()
    }
  }, [account, toggleSignLoginModal, token, walletModalOpen])

  useEffect(() => {
    closeModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  useEffect(() => {
    openModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])

  const cancel = useCallback(() => {
    setInjectedConnected()
    deactivate()
    connector?.deactivate()
    toggleSignLoginModal()
  }, [connector, deactivate, toggleSignLoginModal])

  return (
    <Modal customIsOpen={walletModalOpen && !token} customOnDismiss={cancel} maxWidth="480px">
      <Box width={'100%'} padding="48px" display="flex" flexDirection="column" alignItems="center" gap={20}>
        <Image width={50} src={logo} />
        <Typography variant="h2">Welcome to Bounce</Typography>
        <Typography>By connecting your wallet and using Bounce</Typography>
        <Box width={'100%'} display={'grid'} gridTemplateColumns={'1fr 1fr'} gap="20px">
          <Button variant="outlined" onClick={cancel}>
            Cancel
          </Button>
          <LoadingButton
            loading={loading}
            loadingPosition="start"
            variant="contained"
            color="secondary"
            onClick={login}
          >
            Accept and sign
          </LoadingButton>
        </Box>
      </Box>
    </Modal>
  )
}
