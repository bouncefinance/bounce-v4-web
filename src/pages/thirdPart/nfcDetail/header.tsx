import { Box, Stack } from '@mui/material'
import { useIsMDDown } from 'themes/useTheme'
import { ReactComponent as LogoSvg } from 'assets/imgs/thirdPart/nfcDetail/logo.svg'
import { ReactComponent as WalletSvg } from 'assets/imgs/thirdPart/nfcDetail/wallet.svg'
import { useActiveWeb3React } from 'hooks'
import { shortenAddress } from 'utils'
import { useShowLoginModal } from 'state/users/hooks'
import { routes } from 'constants/routes'
import { useNavigate } from 'react-router-dom'
const Header = () => {
  const isMd = useIsMDDown()
  const { account } = useActiveWeb3React()
  const showLoginModal = useShowLoginModal()
  const navigate = useNavigate()
  return (
    <Stack
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        maxWidth: isMd ? '100vw' : '360px',
        height: '72px',
        padding: '0 20px',
        margin: '0 auto'
      }}
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'center'}
    >
      <LogoSvg
        onClick={() => {
          navigate(routes.market.index)
        }}
      />
      {!account && (
        <WalletSvg
          onClick={() => {
            showLoginModal()
          }}
        />
      )}
      {account && (
        <Box
          sx={{
            height: '24px',
            padding: '0 16px',
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.20)',
            borderRadius: '90px',
            color: '#E1F25C',
            fontFamily: `'Poppins'`,
            fontSize: '14px'
          }}
        >
          {shortenAddress(account)}
        </Box>
      )}
    </Stack>
  )
}
export default Header
