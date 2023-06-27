import { useCallback, useMemo, useState } from 'react'
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core'
import { styled, Button, Box, useTheme, Typography, Popper, Stack, Link, MenuItem, Avatar } from '@mui/material'
import { NetworkContextName } from '../../constants'
import useENSName from '../../hooks/useENSName'
import { useWalletModalToggle } from '../../state/application/hooks'
import { isTransactionRecent, useAllTransactions } from '../../state/transactions/hooks'
import { TransactionDetails } from '../../state/transactions/reducer'
import { getEtherscanLink, shortenAddress } from '../../utils'
import WalletModal from 'components/Modal/WalletModal/index'
import Spinner from 'components/Spinner'
// import { ReactComponent as Web3StatusIconSvg } from 'assets/imgs/profile/yellow_avatar.svg'
import Web3StatusIconSvg from 'assets/imgs/profile/yellow_avatar.svg'
import useBreakpoint from 'hooks/useBreakpoint'
import { ChainList } from 'constants/chain'
import { useActiveWeb3React } from 'hooks'
import { ChevronLeft, ExpandLess, ExpandMore, IosShare } from '@mui/icons-material'
import Copy from 'components/essential/Copy'
import { setInjectedConnected } from 'utils/isInjectedConnectedPrev'
import { useETHBalance } from 'state/wallet/hooks'
import { Currency } from 'constants/token'
import { ClickAwayListener } from '@mui/base'
import Divider from 'components/Divider'
import { OutlinedCard } from 'components/Card'
import { clearAllTransactions } from 'state/transactions/actions'
import { renderTransactions } from 'components/Modal/WalletModal/AccountDetails'
import { AppDispatch } from 'state'
import { useDispatch } from 'react-redux'
import LogoText from 'components/LogoText'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import Tooltip from 'bounceComponents/common/Tooltip'
import { useLogout, useUserInfo } from 'state/users/hooks'
import { ReactComponent as DisconnectSvg } from 'assets/svg/account/disconnect.svg'
import { ReactComponent as TransactionsSvg } from 'assets/svg/account/transactions.svg'
import { ReactComponent as UserSvg } from 'assets/svg/account/user.svg'
import { routes } from 'constants/routes'
import { useNavigate } from 'react-router-dom'

const ActionButton = styled(Button)(({ theme }) => ({
  fontSize: '14px',
  marginBottom: 0,
  [theme.breakpoints.down('sm')]: {
    maxWidth: 320,
    width: '100%',
    borderRadius: 49,
    marginBottom: 0
  }
}))

const StyledBtn = styled('button')(`
  background-color: #F6F7F3;
  padding: 0 !important;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  height: 24px;
  width: 24px;
  min-width: auto !important,
  color: rgb(13, 17, 28);
  border: none;
  outline: none;
`)

const StyledMenuItem = styled(MenuItem)({
  height: 40,
  borderRadius: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between'
})
const StyleNetworkMenuItem = styled(StyledMenuItem)({
  padding: '6px',
  backgroundColor: 'var(--ps-gray-100)',
  '&:hover': {
    backgroundColor: 'var(--ps-gray-300)'
  }
})
// const Web3StatusIcon = styled(Web3StatusIconSvg)(({ theme }) => ({
//   [theme.breakpoints.down('sm')]: {
//     height: '24px',
//     width: '24px'
//   }
// }))

// we want the latest one to come first, so return negative if a is after b
function newTransactionsFirst(a: TransactionDetails, b: TransactionDetails) {
  return b.addedTime - a.addedTime
}

function Web3StatusInner() {
  const { account, error } = useWeb3React()
  const isSm = useBreakpoint('sm')
  const { userInfo } = useUserInfo()
  const { chainId } = useActiveWeb3React()
  const allTransactions = useAllTransactions()
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])
  const pending = sortedRecentTransactions.filter(tx => !tx.receipt).map(tx => tx.hash)
  const toggleWalletModal = useWalletModalToggle()
  const isDownSm = useBreakpoint()
  const theme = useTheme()
  const { ENSName } = useENSName(account || undefined)

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget)
  }

  if (account && chainId) {
    return (
      <ClickAwayListener
        onClickAway={() => {
          setAnchorEl(null)
        }}
      >
        {isSm ? (
          <Box role="presentation">
            <Button
              onClick={handleClick}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                width: '40px',
                height: '40px',
                minWidth: '40px',
                padding: 0,
                background: '#E1F25C',
                borderRadius: '6px',
                fontSize: 18
              }}
            >
              <UserSvg />
            </Button>
            <WalletPopper anchorEl={anchorEl} close={() => setAnchorEl(null)} />
          </Box>
        ) : (
          <Box>
            <Button
              onClick={handleClick}
              sx={{
                cursor: 'pointer',
                borderRadius: 8,
                padding: '0 12px',
                minWidth: isDownSm ? 54 : 64,
                border: '1px solid var(--ps-gray-20)',
                height: isDownSm ? 40 : 44,
                backgroundColor: theme.palette.background.paper,
                '&:hover .line': {
                  borderColor: 'var(--ps-text-4)'
                }
              }}
            >
              <Avatar
                sx={{ marginRight: 10, width: 24, height: 24 }}
                src={userInfo?.avatar?.fileUrl || Web3StatusIconSvg}
              />
              <Box
                className={'line'}
                sx={{
                  borderRight: '1px solid var(--ps-gray-20)',
                  mr: 10,
                  height: '100%'
                }}
              />
              {pending?.length ? (
                <Box sx={{ display: 'flex', alignItems: 'center', mr: { xs: 10, sm: 17 }, ml: { xs: 10, sm: 9 } }}>
                  <Spinner color={theme.palette.text.primary} size={isDownSm ? '10px' : '16px'} />
                  <Box component="span" sx={{ ml: 3 }}>
                    <Typography sx={{ fontSize: { xs: 9, sm: 14 }, ml: 8, color: theme.palette.text.primary }} noWrap>
                      {pending?.length} Pending
                    </Typography>
                  </Box>
                </Box>
              ) : (
                <Typography
                  sx={{
                    lineHeight: '16px',
                    fontSize: { xs: 9, sm: 14 },
                    color: theme.palette.text.primary
                  }}
                >
                  {ENSName || shortenAddress(account)}
                </Typography>
              )}
              {anchorEl ? <ExpandLess /> : <ExpandMore />}
            </Button>
            <WalletPopper anchorEl={anchorEl} close={() => setAnchorEl(null)} />
          </Box>
        )}
      </ClickAwayListener>
    )
  } else if (error) {
    return (
      <ActionButton
        sx={{
          width: isDownSm ? '128px' : '140px',
          height: isDownSm ? '28px' : '40px',
          fontSize: isDownSm ? '12px' : '14px'
        }}
        onClick={toggleWalletModal}
      >
        {error instanceof UnsupportedChainIdError ? 'Wrong Network' : 'Error'}
      </ActionButton>
    )
  } else {
    return (
      <ActionButton
        sx={{
          width: isDownSm ? '128px' : '140px',
          height: isDownSm ? '28px' : '40px',
          fontSize: isDownSm ? '12px' : '14px'
        }}
        onClick={toggleWalletModal}
      >
        Connect Wallet
      </ActionButton>
    )
  }
}

export default function Web3Status() {
  const { active, account } = useWeb3React()
  const { token } = useUserInfo()
  const contextNetwork = useWeb3React(NetworkContextName)

  const { ENSName } = useENSName(account ?? undefined)

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pending = sortedRecentTransactions.filter(tx => !tx.receipt).map(tx => tx.hash)
  const confirmed = sortedRecentTransactions.filter(tx => tx.receipt).map(tx => tx.hash)

  if (!contextNetwork.active && !active) {
    return null
  }

  return (
    <>
      {token && <Web3StatusInner />}
      <WalletModal ENSName={ENSName ?? undefined} pendingTransactions={pending} confirmedTransactions={confirmed} />
    </>
  )
}

enum WalletView {
  MAIN,
  TRANSACTIONS,
  SWITCH_NETWORK
}

function WalletPopper({ anchorEl, close }: { anchorEl: null | HTMLElement; close: () => void }) {
  const open = !!anchorEl
  const theme = useTheme()
  const { userInfo } = useUserInfo()
  const { deactivate, connector } = useWeb3React()
  const { account, chainId } = useActiveWeb3React()
  const { ENSName } = useENSName(account || undefined)
  const myETH = useETHBalance(account || undefined)
  const [curView, setCurView] = useState(WalletView.MAIN)
  const dispatch = useDispatch<AppDispatch>()
  const switchNetwork = useSwitchNetwork()

  const allTransactions = useAllTransactions()

  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  const pendingTransactions = sortedRecentTransactions.filter(tx => !tx.receipt).map(tx => tx.hash)
  const confirmedTransactions = sortedRecentTransactions.filter(tx => tx.receipt).map(tx => tx.hash)

  const clearAllTransactionsCallback = useCallback(() => {
    if (chainId) dispatch(clearAllTransactions({ chainId }))
  }, [dispatch, chainId])
  const { logout } = useLogout()
  const navigate = useNavigate()

  if (!chainId || !account) return null
  return (
    <Popper
      open={open}
      anchorEl={anchorEl}
      sx={{
        top: { xs: 0, sm: '20px !important' },
        width: 360,
        zIndex: theme.zIndex.modal,
        [theme.breakpoints.down('md')]: {
          width: '100%'
        }
      }}
    >
      <Box
        sx={{
          border: '1px solid rgba(18, 18, 18, 0.06)',
          bgcolor: 'background.paper',
          borderRadius: '12px',
          padding: '16px',
          minHeight: 250
        }}
      >
        {WalletView.MAIN === curView && (
          <Box>
            <Box display={'flex'} justifyContent="space-between" alignItems={'center'}>
              <Box display={'flex'} alignItems="center">
                <Avatar
                  sx={{ marginRight: 18, width: 40, height: 40 }}
                  src={userInfo?.avatar?.fileUrl || Web3StatusIconSvg}
                />
                <Stack>
                  <Box display={'flex'} alignItems={'center'}>
                    <Typography fontSize={12} fontWeight={500}>
                      {shortenAddress(account || '')}
                    </Typography>
                    <Tooltip title="Copy address">
                      <Copy toCopy={account || ''} />
                    </Tooltip>
                  </Box>
                  <Typography fontSize={12}>{ENSName}</Typography>
                </Stack>
              </Box>
              <Stack direction={'row'} spacing={8}>
                <Tooltip title="Transactions">
                  <StyledBtn onClick={() => setCurView(WalletView.TRANSACTIONS)}>
                    <TransactionsSvg />
                  </StyledBtn>
                </Tooltip>
                <Tooltip title="Explorer">
                  <StyledBtn>
                    <Link target={'_blank'} href={getEtherscanLink(chainId, account, 'address')}>
                      <IosShare sx={{ color: '#666', height: 18 }} />
                    </Link>
                  </StyledBtn>
                </Tooltip>
                <Tooltip title="Disconnect">
                  <StyledBtn>
                    <DisconnectSvg
                      onClick={() => {
                        logout()
                        setInjectedConnected()
                        deactivate()
                        connector?.deactivate()
                        close()
                      }}
                    />
                  </StyledBtn>
                </Tooltip>
              </Stack>
            </Box>
            <Box padding="20px 0">
              <Typography color={theme.palette.text.secondary} textAlign="center">
                ETH Balance
              </Typography>
              <Typography variant="h3" fontWeight={500} textAlign={'center'}>
                {myETH?.toSignificant() || '-'} {Currency.getNativeCurrency(chainId).symbol}
              </Typography>
            </Box>

            <Stack spacing={6}>
              <Button
                variant="contained"
                sx={{ height: 40 }}
                onClick={() => {
                  navigate(routes.account.dashboard)
                  close()
                }}
              >
                Dashboard
              </Button>
              <Button
                sx={{ height: 40 }}
                color="secondary"
                variant="contained"
                onClick={() => {
                  navigate(routes.account.myAccount)
                  close()
                }}
              >
                My account
              </Button>
            </Stack>
          </Box>
        )}
        {curView === WalletView.TRANSACTIONS && (
          <Box>
            <Box pb={15} display={'flex'} justifyContent="space-between" alignItems={'center'}>
              <StyledBtn>
                <ChevronLeft onClick={() => setCurView(WalletView.MAIN)} />
              </StyledBtn>
              <Box display={'flex'} alignItems={'center'}>
                <TransactionsSvg />
                <Typography ml={5}>Transactions</Typography>
              </Box>
            </Box>
            <Divider />
            <OutlinedCard style={{ border: 'none', marginTop: 15 }}>
              {!!pendingTransactions.length || !!confirmedTransactions.length ? (
                <Box display="grid" gap="16px" width="100%">
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems={'center'}
                    width="100%"
                    fontWeight={500}
                  >
                    <Typography variant="inherit">Recent Transactions</Typography>
                    <Typography
                      fontSize={12}
                      sx={{
                        cursor: 'pointer'
                      }}
                      onClick={clearAllTransactionsCallback}
                    >
                      (clear all)
                    </Typography>
                  </Box>
                  <Box
                    display="grid"
                    sx={{
                      maxHeight: '50vh',
                      paddingRight: '15px',
                      marginRight: '-15px',
                      overflowY: 'auto'
                    }}
                  >
                    {renderTransactions(pendingTransactions)}
                    {renderTransactions(confirmedTransactions)}
                  </Box>
                </Box>
              ) : (
                <Box display="flex" width="100%" justifyContent="center" marginTop={15}>
                  <Typography fontSize={12}> Your transactions will appear here...</Typography>
                </Box>
              )}
            </OutlinedCard>
          </Box>
        )}
        {curView === WalletView.SWITCH_NETWORK && (
          <Box>
            <Box pb={15} display={'flex'} justifyContent="space-between" alignItems={'center'}>
              <StyledBtn>
                <ChevronLeft onClick={() => setCurView(WalletView.MAIN)} />
              </StyledBtn>
              <Typography>Switch Network</Typography>
            </Box>
            <Divider />
            <Box>
              <Box
                sx={{
                  mt: 20,
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '10px',
                  overflowY: 'auto',
                  maxHeight: '60vh'
                }}
              >
                {ChainList.map(item => (
                  <StyleNetworkMenuItem
                    onClick={() => {
                      switchNetwork(item.id)
                      setCurView(WalletView.MAIN)
                      close()
                    }}
                    key={item.id}
                    sx={{ border: chainId === item.id ? '1px solid' : 'none' }}
                    disabled={chainId === item.id}
                  >
                    <LogoText fontSize={12} logo={item.logo} text={item.name} />
                  </StyleNetworkMenuItem>
                ))}
              </Box>
            </Box>
          </Box>
        )}
      </Box>
    </Popper>
  )
}
