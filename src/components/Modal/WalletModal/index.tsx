import { useEffect } from 'react'
import { Typography, Box, Button } from '@mui/material'
// import { OVERLAY_READY } from 'connectors/Fortmatic'
// import usePrevious from 'hooks/usePrevious'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useWalletModalToggle } from 'state/application/hooks'
import AccountDetails from 'components/Modal/WalletModal/AccountDetails'

import Modal from '../index'
import Option from './Option'
import PendingView from './PendingView'
import useBreakpoint from 'hooks/useBreakpoint'
import { ChainId, NETWORK_CHAIN_ID, SUPPORTED_NETWORKS, isSupportedChain } from '../../../constants/chain'
import { useActiveWeb3React } from 'hooks'
import { getConnection, getConnections, networkConnection } from 'connection'
import { useWeb3React } from '@web3-react/core'
import { ActivationStatus, useActivationState } from 'connection/activate'
import { useAppSelector } from 'state/hooks'

// const WALLET_VIEWS = {
//   OPTIONS: 'options',
//   ACCOUNT: 'account',
//   PENDING: 'pending'
// }

// get wallets user can switch too, depending on device/browser
export function useGetWalletOptions(isModal?: boolean) {
  const { connector, chainId } = useWeb3React()

  const connections = getConnections()

  // Keep the network connector in sync with any active user connector to prevent chain-switching on wallet disconnection.
  useEffect(() => {
    if (chainId && isSupportedChain(chainId) && connector !== networkConnection.connector) {
      networkConnection.connector.activate(chainId)
    }
  }, [chainId, connector])

  return connections
    .filter(connection => connection.shouldDisplay())
    .map(connection => (
      <Option
        header={connection.getName()}
        isModal={isModal}
        id={connection.getName()}
        key={connection.getName()}
        connection={connection}
        icon={(connection.getIcon && connection.getIcon(false)) || ''}
        active={connection.shouldDisplay()}
      />
    ))
}

export default function WalletModal({
  pendingTransactions,
  confirmedTransactions,
  ENSName
}: {
  pendingTransactions: string[] // hashes of pending
  confirmedTransactions: string[] // hashes of confirmed
  ENSName?: string
}) {
  const isUpToMD = useBreakpoint('md')

  // important that these are destructed from the account-specific web3-react context
  const { account, provider, errorNetwork } = useActiveWeb3React()
  const { activationState, tryActivation, cancelActivation } = useActivationState()
  const selectedWallet = useAppSelector(state => state.userWallet.selectedWallet)
  const curConnection = selectedWallet ? getConnection(selectedWallet) : undefined

  const walletModalOpen = useModalOpen(ApplicationModal.WALLET)
  const toggleWalletModal = useWalletModalToggle()

  // const previousAccount = usePrevious(account)

  // close on connection, when logged out before
  // useEffect(() => {
  //   if (account && !previousAccount && walletModalOpen) {
  //     toggleWalletModal()
  //   }
  // }, [account, previousAccount, toggleWalletModal, walletModalOpen])

  const getWalletOptions = useGetWalletOptions(true)

  function getModalContent() {
    if (errorNetwork) {
      return (
        <>
          <Typography variant="h3" fontWeight={500}>
            {'Wrong Network'}
          </Typography>
          <Box padding={isUpToMD ? '16px' : '2rem'}>
            <Typography>
              {`Please connect to the ${
                SUPPORTED_NETWORKS[NETWORK_CHAIN_ID]
                  ? SUPPORTED_NETWORKS[NETWORK_CHAIN_ID]?.chainName
                  : 'Binance Smart Chain'
              }.`}
            </Typography>
          </Box>
          <Button
            variant="contained"
            onClick={() => {
              const id = Object.values(ChainId).find(val => val === NETWORK_CHAIN_ID)
              if (!id) {
                return
              }
              const params = SUPPORTED_NETWORKS[id as ChainId]
              provider
                ?.send('wallet_switchEthereumChain', [{ chainId: params?.hexChainId }, ''])
                .catch((err: { code: number }) => {
                  if (err?.code === 4001) return
                  const obj: any = {}
                  obj.chainId = params?.hexChainId
                  obj.chainName = params?.chainName
                  obj.nativeCurrency = params?.nativeCurrency
                  obj.rpcUrls = params?.rpcUrls
                  obj.blockExplorerUrls = params?.blockExplorerUrls

                  provider?.send('wallet_addEthereumChain', [obj, ''])
                })
            }}
          >
            Connect to {SUPPORTED_NETWORKS[NETWORK_CHAIN_ID] ? SUPPORTED_NETWORKS[NETWORK_CHAIN_ID]?.chainName : 'BSC'}
          </Button>
        </>
      )
    }
    if (account) {
      return (
        <AccountDetails
          toggleWalletModal={toggleWalletModal}
          pendingTransactions={pendingTransactions}
          confirmedTransactions={confirmedTransactions}
          ENSName={ENSName}
          openOptions={() => {}}
        />
      )
    }
    return (
      <>
        {activationState.status !== ActivationStatus.ERROR && (
          <Typography variant="h3" fontWeight={500} width="100%">
            Connect to a wallet
          </Typography>
        )}

        {activationState.status === ActivationStatus.ERROR ? (
          <PendingView
            connector={curConnection}
            error={activationState.status === ActivationStatus.ERROR}
            setPendingError={() => {}}
            tryActivation={tryActivation}
          >
            <Button variant="outlined" color="primary" onClick={cancelActivation} style={{ whiteSpace: 'nowrap' }}>
              Cancel
            </Button>
          </PendingView>
        ) : (
          <Box
            display="grid"
            gap="16px"
            width="100%"
            gridTemplateColumns={isUpToMD ? '1fr' : '1fr 1fr'}
            flexDirection={isUpToMD ? 'column' : 'unset'}
          >
            {getWalletOptions}
          </Box>
        )}
      </>
    )
  }

  return (
    <Modal customIsOpen={walletModalOpen} customOnDismiss={toggleWalletModal} maxWidth="772px" closeIcon={true}>
      <Box width={'100%'} padding="48px" display="flex" flexDirection="column" alignItems="center" gap={20}>
        {getModalContent()}
      </Box>
    </Modal>
  )
}
