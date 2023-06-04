import { useEffect, useState, useCallback } from 'react'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { WalletConnectConnector } from '@web3-react/walletconnect-connector'
import { isMobile } from 'react-device-detect'
import { Typography, Box, Button } from '@mui/material'
import MetamaskIcon from 'assets/walletIcon/metamask.png'
import { /*fortmatic,*/ injected, portis } from 'connectors'
// import { OVERLAY_READY } from 'connectors/Fortmatic'
import { SUPPORTED_WALLETS } from 'constants/index'
import usePrevious from 'hooks/usePrevious'
import { ApplicationModal } from 'state/application/actions'
import { useModalOpen, useSignLoginModalToggle, useWalletModalToggle } from 'state/application/hooks'
import AccountDetails from 'components/Modal/WalletModal/AccountDetails'

import Modal from '../index'
import Option from './Option'
import PendingView from './PendingView'
import useBreakpoint from 'hooks/useBreakpoint'
import { ChainId, NETWORK_CHAIN_ID, SUPPORTED_NETWORKS } from '../../../constants/chain'
import { setInjectedConnected } from 'utils/isInjectedConnectedPrev'

const WALLET_VIEWS = {
  OPTIONS: 'options',
  ACCOUNT: 'account',
  PENDING: 'pending'
}

// get wallets user can switch too, depending on device/browser
export function useGetWalletOptions(
  isModal?: boolean,
  activation?: (connector: (() => Promise<AbstractConnector>) | AbstractConnector | undefined) => Promise<void>
) {
  const { activate, connector } = useWeb3React()
  const toggleWalletModal = useWalletModalToggle()
  const signLoginModalToggle = useSignLoginModalToggle()

  const defaultActivation = useCallback(
    async (connector: (() => Promise<AbstractConnector>) | AbstractConnector | undefined) => {
      const conn = typeof connector === 'function' ? await connector() : connector

      // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
      if (conn instanceof WalletConnectConnector && conn.walletConnectProvider?.connector?.connected) {
        conn.walletConnectProvider = undefined
      }

      conn &&
        activate(conn, undefined, true)
          .then(() => {
            setInjectedConnected(conn)
            signLoginModalToggle()
          })
          .catch(error => {
            if (error instanceof UnsupportedChainIdError) {
              activate(conn) // a little janky...can't use setError because the connector isn't set
            }
            setInjectedConnected()
          })
    },
    [activate, signLoginModalToggle]
  )
  const tryActivation = activation || defaultActivation

  const isMetamask = window.ethereum && window.ethereum.isMetaMask
  return Object.keys(SUPPORTED_WALLETS).map(key => {
    const option = SUPPORTED_WALLETS[key]
    // check for mobile options

    if (isMobile) {
      //disable portis on mobile for now
      if (option.connector === portis) {
        return null
      }

      if (!window.web3 && !window.ethereum && option.mobile) {
        return (
          <Option
            onClick={() => {
              option.connector !== connector && !option.href && tryActivation(option.connector)
            }}
            id={`connect-${key}`}
            key={key}
            clickable={!option.disabled}
            active={option.connector && option.connector === connector}
            link={option.href}
            header={option.name}
            icon={require('../../../assets/walletIcon/' + option.iconName)}
          />
        )
      } else if (isMetamask && option.name === 'MetaMask') {
        return (
          <Option
            onClick={() => {
              option.connector !== connector && !option.href && tryActivation(option.connector)
            }}
            id={`connect-${key}`}
            clickable={!option.disabled}
            key={key}
            active={option.connector && option.connector === connector}
            link={option.href}
            header={option.name}
            icon={require('../../../assets/walletIcon/' + option.iconName)}
          />
        )
      } else if (option.name === 'OKX Wallet') {
        return (
          <Option
            onClick={() => {
              option.connector !== connector && !option.href && tryActivation(option.connector)
            }}
            id={`connect-${key}`}
            clickable={!option.disabled}
            key={key}
            active={option.connector && option.connector === connector}
            link={option.href}
            header={option.name}
            icon={require('../../../assets/walletIcon/' + option.iconName)}
          />
        )
      }
      return null
    }

    // overwrite injected when needed
    if (option.connector === injected) {
      // don't show injected if there's no injected provider
      if (!(window.web3 || window.ethereum)) {
        if (option.name === 'MetaMask') {
          return (
            <Option
              id={`connect-${key}`}
              clickable={!option.disabled}
              key={key}
              header={'Install Metamask'}
              link={'https://metamask.io/'}
              icon={MetamaskIcon}
            />
          )
        } else {
          return null //dont want to return install twice
        }
      }
      // don't return metamask if injected provider isn't metamask
      else if (option.name === 'MetaMask' && !isMetamask) {
        return null
      }
      // likewise for generic
      else if (option.name === 'Injected' && isMetamask) {
        return null
      }
    }

    // return rest of options
    return !isMobile && !option.mobileOnly ? (
      <Option
        id={`connect-${key}`}
        clickable={!option.disabled}
        onClick={() => {
          option.connector === connector
            ? isModal
              ? toggleWalletModal()
              : null
            : !option.href && tryActivation(option.connector)
        }}
        key={key}
        active={option.connector === connector}
        link={option.href}
        header={option.name}
        icon={require('../../../assets/walletIcon/' + option.iconName)}
      />
    ) : null
  })
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
  const { active, account, connector, activate, error } = useWeb3React()

  const [walletView, setWalletView] = useState(WALLET_VIEWS.ACCOUNT)

  const [pendingWallet, setPendingWallet] = useState<AbstractConnector | undefined>()

  const [pendingError, setPendingError] = useState<boolean>()

  const walletModalOpen = useModalOpen(ApplicationModal.WALLET)
  const toggleWalletModal = useWalletModalToggle()

  const previousAccount = usePrevious(account)

  // close on connection, when logged out before
  useEffect(() => {
    if (account && !previousAccount && walletModalOpen) {
      toggleWalletModal()
    }
  }, [account, previousAccount, toggleWalletModal, walletModalOpen])

  // always reset to account view
  useEffect(() => {
    if (walletModalOpen) {
      setPendingError(false)
      setWalletView(WALLET_VIEWS.OPTIONS)
    }
  }, [walletModalOpen])

  // close modal when a connection is successful
  const activePrevious = usePrevious(active)
  const connectorPrevious = usePrevious(connector)
  const signLoginModalToggle = useSignLoginModalToggle()
  useEffect(() => {
    if (walletModalOpen && ((active && !activePrevious) || (connector && connector !== connectorPrevious && !error))) {
      setWalletView(WALLET_VIEWS.OPTIONS)
    }
  }, [setWalletView, active, error, connector, walletModalOpen, activePrevious, connectorPrevious])

  const tryActivation = useCallback(
    async (connector: (() => Promise<AbstractConnector>) | AbstractConnector | undefined) => {
      const conn = typeof connector === 'function' ? await connector() : connector

      setPendingWallet(conn) // set wallet for pending view
      setWalletView(WALLET_VIEWS.PENDING)

      // if the connector is walletconnect and the user has already tried to connect, manually reset the connector
      if (conn instanceof WalletConnectConnector && conn.walletConnectProvider?.connector?.connected) {
        conn.walletConnectProvider = undefined
      }

      conn &&
        activate(conn, undefined, true)
          .then(() => {
            setInjectedConnected(conn)
            signLoginModalToggle()
          })
          .catch(error => {
            if (error instanceof UnsupportedChainIdError) {
              activate(conn) // a little janky...can't use setError because the connector isn't set
            } else {
              setPendingError(true)
            }
            setInjectedConnected()
          })
    },
    [activate, signLoginModalToggle]
  )
  const getWalletOptions = useGetWalletOptions(true, tryActivation)

  // close wallet modal if fortmatic modal is active
  // useEffect(() => {
  //   fortmatic.on(OVERLAY_READY, () => {
  //     toggleWalletModal()
  //   })
  // }, [toggleWalletModal])

  // get wallets user can switch too, depending on device/browser
  // function getOptions() {
  //   const isMetamask = window.ethereum && window.ethereum.isMetaMask
  //   return Object.keys(SUPPORTED_WALLETS).map(key => {
  //     const option = SUPPORTED_WALLETS[key]
  //     // check for mobile options
  //     if (isMobile) {
  //       //disable portis on mobile for now
  //       if (option.connector === portis) {
  //         return null
  //       }

  //       if (!window.web3 && !window.ethereum && option.mobile) {
  //         return (
  //           <Option
  //             onClick={() => {
  //               option.connector !== connector && !option.href && tryActivation(option.connector)
  //             }}
  //             id={`connect-${key}`}
  //             key={key}
  //             active={option.connector && option.connector === connector}
  //             link={option.href}
  //             header={option.name}
  //             icon={require('../../../assets/walletIcon/' + option.iconName)}
  //           />
  //         )
  //       } else if (isMetamask && option.name === 'MetaMask') {
  //         return (
  //           <Option
  //             onClick={() => {
  //               option.connector !== connector && !option.href && tryActivation(option.connector)
  //             }}
  //             id={`connect-${key}`}
  //             key={key}
  //             active={option.connector && option.connector === connector}
  //             link={option.href}
  //             header={option.name}
  //             icon={require('../../../assets/walletIcon/' + option.iconName)?.default}
  //           />
  //         )
  //       }
  //       return null
  //     }

  //     // overwrite injected when needed
  //     if (option.connector === injected) {
  //       // don't show injected if there's no injected provider
  //       if (!(window.web3 || window.ethereum)) {
  //         if (option.name === 'MetaMask') {
  //           return (
  //             <Option
  //               id={`connect-${key}`}
  //               key={key}
  //               header={'Install Metamask'}
  //               link={'https://metamask.io/'}
  //               icon={MetamaskIcon}
  //             />
  //           )
  //         } else {
  //           return null //dont want to return install twice
  //         }
  //       }
  //       // don't return metamask if injected provider isn't metamask
  //       else if (option.name === 'MetaMask' && !isMetamask) {
  //         return null
  //       }
  //       // likewise for generic
  //       else if (option.name === 'Injected' && isMetamask) {
  //         return null
  //       }
  //     }

  //     // return rest of options
  //     return (
  //       !isMobile &&
  //       !option.mobileOnly && (
  //         <Option
  //           id={`connect-${key}`}
  //           onClick={() => {
  //             option.connector === connector ? toggleWalletModal() : !option.href && tryActivation(option.connector)
  //           }}
  //           key={key}
  //           active={option.connector === connector}
  //           link={option.href}
  //           header={option.name}
  //           icon={require('../../../assets/walletIcon/' + option.iconName)}
  //         />
  //       )
  //     )
  //   })
  // }

  function getModalContent() {
    if (error) {
      return (
        <>
          <Typography variant="h3" fontWeight={500}>
            {error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error connecting'}
          </Typography>
          <Box padding={isUpToMD ? '16px' : '2rem'}>
            <Typography>
              {error instanceof UnsupportedChainIdError
                ? `Please connect to the ${
                    SUPPORTED_NETWORKS[NETWORK_CHAIN_ID]
                      ? SUPPORTED_NETWORKS[NETWORK_CHAIN_ID]?.chainName
                      : 'Binance Smart Chain'
                  }.`
                : 'Error connecting. Try refreshing the page.'}
            </Typography>
          </Box>
          {window.ethereum && window.ethereum.isMetaMask && (
            <Button
              variant="contained"
              onClick={() => {
                const id = Object.values(ChainId).find(val => val === NETWORK_CHAIN_ID)
                if (!id) {
                  return
                }
                const params = SUPPORTED_NETWORKS[id as ChainId]
                params?.nativeCurrency.symbol === 'ETH'
                  ? window.ethereum?.request?.({
                      method: 'wallet_switchEthereumChain',
                      params: [{ chainId: params.hexChainId }, account]
                    })
                  : window.ethereum?.request?.({ method: 'wallet_addEthereumChain', params: [params, account] })
              }}
            >
              Connect to{' '}
              {SUPPORTED_NETWORKS[NETWORK_CHAIN_ID] ? SUPPORTED_NETWORKS[NETWORK_CHAIN_ID]?.chainName : 'BSC'}
            </Button>
          )}
        </>
      )
    }
    if (account && walletView === WALLET_VIEWS.ACCOUNT) {
      return (
        <AccountDetails
          toggleWalletModal={toggleWalletModal}
          pendingTransactions={pendingTransactions}
          confirmedTransactions={confirmedTransactions}
          ENSName={ENSName}
          openOptions={() => setWalletView(WALLET_VIEWS.OPTIONS)}
        />
      )
    }
    return (
      <>
        {walletView === WALLET_VIEWS.ACCOUNT ||
          (walletView === WALLET_VIEWS.OPTIONS && (
            <Typography variant="h3" fontWeight={500} width="100%">
              Connect to a wallet
            </Typography>
          ))}

        {walletView === WALLET_VIEWS.PENDING ? (
          <PendingView
            connector={pendingWallet}
            error={pendingError}
            setPendingError={setPendingError}
            tryActivation={tryActivation}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={() => {
                setPendingError(false)
                setWalletView(WALLET_VIEWS.OPTIONS)
              }}
              style={{ whiteSpace: 'nowrap' }}
            >
              Change Wallet
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
