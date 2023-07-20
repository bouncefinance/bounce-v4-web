import { WalletConnect as WalletConnectv2 } from '@web3-react/walletconnect-v2'
import Modal from 'components/Modal'
import { uniwalletWCV2ConnectConnection } from 'connection'
import { ActivationStatus, useActivationState } from 'connection/activate'
import { ConnectionType } from 'connection/types'
import { UniwalletConnect as UniwalletConnectV2 } from 'connection/WalletConnectV2'
import { QRCodeSVG } from 'qrcode.react'
import { useEffect, useState } from 'react'
import { DownloadButton } from './WalletModal/DownloadButton'
import uniPng from 'assets/walletIcon/uniswap-wallet-icon.png'
import { Box, Divider, Stack, Typography } from '@mui/material'

export default function UniwalletModal() {
  const { activationState, cancelActivation } = useActivationState()
  const [uri, setUri] = useState<string>()

  // Displays the modal if a Uniswap Wallet Connection is pending & qrcode URI is available
  const open =
    activationState.status === ActivationStatus.PENDING &&
    activationState.connection.type === ConnectionType.UNISWAP_WALLET_V2 &&
    !!uri

  useEffect(() => {
    const connectorV2 = uniwalletWCV2ConnectConnection.connector as WalletConnectv2
    connectorV2.events.addListener(UniwalletConnectV2.UNI_URI_AVAILABLE, (uri: string) => {
      uri && setUri(uri)
    })
  }, [])

  return (
    <Modal
      width="450px"
      maxWidth="450px"
      padding="30px"
      customIsOpen={open}
      closeIcon
      customOnDismiss={cancelActivation}
    >
      <Box>
        <Typography variant="h3">Scan with Uniswap Wallet</Typography>
        <Box padding={'30px'}>
          {uri && (
            <QRCodeSVG
              value={uri}
              width="100%"
              height="100%"
              level="M"
              fgColor={'#000'}
              imageSettings={{
                src: uniPng,
                height: 33,
                width: 33,
                excavate: false
              }}
            />
          )}
        </Box>
        <Divider />
        <InfoSection />
      </Box>
    </Modal>
  )
}

function InfoSection() {
  return (
    <Box mt={10}>
      <Stack gap="4px">
        <Box display={'flex'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography>Don&apos;t have Uniswap Wallet?</Typography>
          <DownloadButton />
        </Box>
        <Typography color="textSecondary" fontSize={12}>
          Download in the App Store to safely store your tokens and NFTs, swap tokens, and connect to crypto apps.
        </Typography>
      </Stack>
    </Box>
  )
}
