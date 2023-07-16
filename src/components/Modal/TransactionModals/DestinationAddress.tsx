import { Box, useTheme, styled, Typography } from '@mui/material'
// import { AbstractConnector } from '@web3-react/abstract-connector'
import Image from 'components/Image'
// import CoinbaseWalletIcon from 'assets/walletIcon/coinbaseWalletIcon.svg'
// import FortmaticIcon from 'assets/walletIcon/fortmaticIcon.png'
// import PortisIcon from 'assets/walletIcon/portisIcon.png'
import WalletConnectIcon from 'assets/walletIcon/walletConnectIcon.svg'
import Matamask from 'assets/walletIcon/metamask.png'
import { injected, hooks_walletConnectV2 } from 'connectors'
import { useActiveWeb3React } from 'hooks'
import { shortenAddress } from 'utils'

const Dot = styled('span')({
  width: 16,
  height: 16,
  background: 'linear-gradient(135deg, #ffffff 4.17%, rgba(255, 255, 255, 0) 75%)',
  border: '0.6px solid #ffffff',
  borderRadius: '50%'
})

function StatusIcon(connector: any | undefined) {
  const style = { height: 16, width: 16, objectFit: 'contain' as const }
  if (connector === injected) {
    const { ethereum } = window
    const isMetaMask = !!(ethereum && ethereum.isMetaMask)
    return isMetaMask ? <Image style={style} src={Matamask} /> : <Dot />
  } else if (connector === hooks_walletConnectV2) {
    return <Image style={style} src={WalletConnectIcon} />
  }
  return null
}

export default function DestinationAddress({ address, margin }: { address: string; margin?: string }) {
  const { connector } = useActiveWeb3React()
  const theme = useTheme()

  return (
    <>
      {address && (
        <Box display="flex" margin={margin || '16px 0 0'} fontSize="14px">
          <Typography marginRight="10px" color={theme.palette.text.secondary}>
            Destination:
          </Typography>
          <Box display="flex" alignItems={'center'}>
            {StatusIcon(connector)}
            <Typography marginLeft="8px" color={theme.palette.text.secondary}>
              {shortenAddress(address, 10)}
            </Typography>
          </Box>
        </Box>
      )}
    </>
  )
}
