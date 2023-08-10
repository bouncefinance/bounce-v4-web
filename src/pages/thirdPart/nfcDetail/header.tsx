import { Stack } from '@mui/material'
import { useIsMDDown } from 'themes/useTheme'
import { ReactComponent as LogoSvg } from 'assets/imgs/thirdPart/nfcDetail/logo.svg'
import { ReactComponent as WalletSvg } from 'assets/imgs/thirdPart/nfcDetail/wallet.svg'

const Header = () => {
  const isMd = useIsMDDown()
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
      <LogoSvg />
      <WalletSvg />
    </Stack>
  )
}
export default Header
