import { useEffect, useState, useCallback } from 'react'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { isMobile } from 'react-device-detect'
import { Typography, Box, Button } from '@mui/material'
import MetamaskIcon from 'assets/walletIcon/metamask.png'
import OkxIcon from 'assets/walletIcon/okxIcon.png'
import { connector_metaMask, injected, connector_okxWallet } from '../../../connectors'
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
import { useActiveWeb3React } from 'hooks'
import { URI_AVAILABLE } from '@web3-react/walletconnect-v2'
import { setPrevConnectWallet } from 'utils/isInjectedConnectedPrev'

const WALLET_VIEWS = {
  OPTIONS: 'options',
  ACCOUNT: 'account',
  PENDING: 'pending'
}

// get wallets user can switch too, depending on device/browser
export function useGetWalletOptions(
  isModal?: boolean,
  activation?: (connector: AbstractConnector | undefined) => void
) {
  const toggleWalletModal = useWalletModalToggle()
  const signLoginModalToggle = useSignLoginModalToggle()

  const defaultActivation = useCallback(
    (connector: AbstractConnector | undefined) => {
      type WalletType = 'MetaMask' | 'OKX Wallet' | 'WalletConnectV2'
      let name = '' as WalletType
      Object.keys(SUPPORTED_WALLETS).map(key => {
        if (connector === SUPPORTED_WALLETS[key].connector) {
          return (name = SUPPORTED_WALLETS[key].name as WalletType)
        }
        return true
      })
      connector
        ?.activate()
        .then(() => {
          setPrevConnectWallet(name)
          signLoginModalToggle()
        })
        .catch(error => {
          isModal && toggleWalletModal()
          setPrevConnectWallet(null)
          // localStorage.removeItem('wc@2:core:0.3//subscription')
          if (!String(error).includes(`User rejected methods`)) {
            localStorage.removeItem('localSaveWalletKey')
          }
        })
    },
    [isModal, signLoginModalToggle, toggleWalletModal]
  )

  const tryActivation = activation || defaultActivation

  const isMetamask = window.ethereum && window.ethereum.isMetaMask

  return Object.keys(SUPPORTED_WALLETS).map(key => {
    const option = SUPPORTED_WALLETS[key]
    if (isMobile && option.name === 'MetaMask' && (!window.web3 || !window.ethereum || window.okxwallet)) {
      return null
    }
    if (isMobile && option.name === 'OKX Wallet' && (!window.okxwallet || !window.ethereum)) {
      return null
    }
    // if (isMobile && option.name === 'WalletConnectV2' && (window.web3 || window.ethereum)) {
    //   return null
    // }

    // overwrite injected when needed
    if (
      option.connector === connector_metaMask ||
      option.connector === connector_okxWallet ||
      option.connector === injected
    ) {
      // don't show injected if there's no injected provider
      if (!window.web3 && option.name === 'MetaMask') {
        return (
          <Option
            clickable={!option.disabled}
            id={`connect-${key}`}
            key={key}
            header={'Install Metamask'}
            link={'https://metamask.io/'}
            icon={MetamaskIcon}
            onClick={() => {
              toggleWalletModal()
            }}
          />
        )
      } else if (!window.okxwallet && option.name === 'OKX Wallet') {
        return (
          <Option
            clickable={!option.disabled}
            id={`connect-${key}`}
            key={key}
            header={'Install OKX Wallet'}
            link={'https://www.okx.com/'}
            icon={OkxIcon}
            onClick={() => {
              toggleWalletModal()
            }}
          />
        )
      } else if (!window.web3 && !window.okxwallet && option.name === 'Injected') {
        return null
      }
      // don't return metamask if injected provider isn't metamask
      else if (option.name === 'MetaMask' && !isMetamask) {
        return null
      } else if (option.name === 'OKX Wallet' && !isMetamask) {
        return null
      }
      // likewise for generic
      else if (!isMobile && option.name === 'Injected') {
        return null
      }
    }
    // return rest of options
    return (
      !option.mobileOnly && (
        <Option
          clickable={!option.disabled}
          id={`connect-${key}`}
          onClick={() => {
            localStorage.setItem('localSaveWalletKey', option.name)
            // option.connector === connector
            //   ? setWalletView(WALLET_VIEWS.ACCOUNT)
            //   : !option.href && tryActivation(option.connector)
            // TODO HOMIE 硬处理强制连接
            !option.href && tryActivation(option.connector)
          }}
          key={key}
          // active={option.connector === connector}
          active={false}
          link={option.href}
          header={option.name}
          icon={require('../../../assets/walletIcon/' + option.iconName)}
        />
      )
    )
  })

  // return Object.keys(SUPPORTED_WALLETS).map(key => {
  //   const option = SUPPORTED_WALLETS[key]
  //   // check for mobile options

  //   if (isMobile) {
  //     //disable portis on mobile for now
  //     if (option.connector === portis) {
  //       return null
  //     }

  //     if (!window.web3 && !window.ethereum && option.mobile) {
  //       return (
  //         <Option
  //           onClick={() => {
  //             option.connector !== connector && !option.href && tryActivation(option.connector)
  //           }}
  //           id={`connect-${key}`}
  //           key={key}
  //           clickable={!option.disabled}
  //           active={option.connector && option.connector === connector}
  //           link={option.href}
  //           header={option.name}
  //           icon={require('../../../assets/walletIcon/' + option.iconName)}
  //         />
  //       )
  //     } else if (isMetamask && option.name === 'MetaMask') {
  //       return (
  //         <Option
  //           onClick={() => {
  //             option.connector !== connector && !option.href && tryActivation(option.connector)
  //           }}
  //           id={`connect-${key}`}
  //           clickable={!option.disabled}
  //           key={key}
  //           active={option.connector && option.connector === connector}
  //           link={option.href}
  //           header={option.name}
  //           icon={require('../../../assets/walletIcon/' + option.iconName)}
  //         />
  //       )
  //     } else if (option.name === 'OKX Wallet') {
  //       return (
  //         <Option
  //           onClick={() => {
  //             option.connector !== connector && !option.href && tryActivation(option.connector)
  //           }}
  //           id={`connect-${key}`}
  //           clickable={!option.disabled}
  //           key={key}
  //           active={option.connector && option.connector === connector}
  //           link={option.href}
  //           header={option.name}
  //           icon={require('../../../assets/walletIcon/' + option.iconName)}
  //         />
  //       )
  //     }
  //     return null
  //   }

  //   // overwrite injected when needed
  //   if (option.connector === injected) {
  //     // don't show injected if there's no injected provider
  //     if (!(window.web3 || window.ethereum)) {
  //       if (option.name === 'MetaMask') {
  //         return (
  //           <Option
  //             id={`connect-${key}`}
  //             clickable={!option.disabled}
  //             key={key}
  //             header={'Install Metamask'}
  //             link={'https://metamask.io/'}
  //             icon={MetamaskIcon}
  //           />
  //         )
  //       } else {
  //         return null //dont want to return install twice
  //       }
  //     }
  //     // don't return metamask if injected provider isn't metamask
  //     else if (option.name === 'MetaMask' && !isMetamask) {
  //       return null
  //     }
  //     // likewise for generic
  //     else if (option.name === 'Injected' && isMetamask) {
  //       return null
  //     }
  //   }

  //   // return rest of options
  //   return !isMobile && !option.mobileOnly ? (
  //     <Option
  //       id={`connect-${key}`}
  //       clickable={!option.disabled}
  //       onClick={() => {
  //         option.connector === connector
  //           ? isModal
  //             ? toggleWalletModal()
  //             : null
  //           : !option.href && tryActivation(option.connector)
  //       }}
  //       key={key}
  //       active={option.connector === connector}
  //       link={option.href}
  //       header={option.name}
  //       icon={require('../../../assets/walletIcon/' + option.iconName)}
  //     />
  //   ) : null
  // })
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
  const { connector, hooks, account, chainId, errorNetwork } = useActiveWeb3React()
  const active = hooks?.useIsActive()
  const provider = hooks?.useProvider()
  const walletKey = localStorage.getItem('localSaveWalletKey')

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
    if (walletModalOpen && !walletKey) {
      setPendingError(false)
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [walletModalOpen])

  // close modal when a connection is successful
  const activePrevious = usePrevious(active)
  const connectorPrevious = usePrevious(connector)
  const signLoginModalToggle = useSignLoginModalToggle()
  useEffect(() => {
    if (
      walletModalOpen &&
      ((active && !activePrevious) || (connector && connector !== connectorPrevious && NETWORK_CHAIN_ID === chainId))
    ) {
      setWalletView(WALLET_VIEWS.ACCOUNT)
    }
  }, [setWalletView, active, connector, walletModalOpen, activePrevious, connectorPrevious, chainId])

  const tryActivation = useCallback(
    (connector: AbstractConnector | undefined) => {
      type WalletType = 'MetaMask' | 'OKX Wallet' | 'WalletConnectV2'
      let name = '' as WalletType
      Object.keys(SUPPORTED_WALLETS).map(key => {
        if (connector === SUPPORTED_WALLETS[key].connector) {
          return (name = SUPPORTED_WALLETS[key].name as WalletType)
        }
        return true
      })

      setPendingWallet(connector) // set wallet for pending view
      connector
        ?.activate()
        .then(() => {
          setPrevConnectWallet(name)
          // HOMIE 链接钱包回调
          // window.location.reload()
          signLoginModalToggle()
        })
        .catch(error => {
          console.error('error:', error)
          setPrevConnectWallet(null)
          // localStorage.removeItem('wc@2:core:0.3//subscription')
          if (!String(error).includes(`User rejected methods`)) {
            localStorage.removeItem('localSaveWalletKey')
          }
        })
    },
    [signLoginModalToggle]
  )
  const getWalletOptions = useGetWalletOptions(true, tryActivation)

  useEffect(() => {
    ;(pendingWallet as any)?.events?.on(URI_AVAILABLE, () => {
      toggleWalletModal()
    })
  }, [pendingWallet, toggleWalletModal, walletModalOpen])

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
