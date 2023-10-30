import { Button } from '@mui/material'
// import { useWalletModalToggle } from 'state/application/hooks'
import { useShowLoginModal } from 'state/users/hooks'

const ConnectWalletButton = ({ size = 'medium' }: { size?: 'small' | 'medium' | 'large' }) => {
  const showLoginModal = useShowLoginModal()
  return (
    <Button size={size} variant="contained" fullWidth sx={{ my: 12 }} onClick={showLoginModal}>
      Connect Wallet
    </Button>
  )
}

export default ConnectWalletButton
