import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { Typography, Box, useTheme, styled, Button } from '@mui/material'
import { useActiveWeb3React } from 'hooks/'
import { AppDispatch } from 'state/'
import { clearAllTransactions } from 'state/transactions/actions'
import { shortenAddress } from 'utils/'
import Copy from 'components/essential/Copy'
import Transaction from './Transaction'
// import { SUPPORTED_WALLETS } from 'constants/index'
// import { injected } from 'connectors/'
import { OutlinedCard } from 'components/Card'
import { useWalletDeactivate } from 'connection/activate'

const Dot = styled('span')({
  width: 24,
  height: 24,
  background: 'linear-gradient(135deg, #ffffff 4.17%, rgba(255, 255, 255, 0) 75%)',
  border: '0.6px solid #ffffff',
  borderRadius: '50%'
})

export function renderTransactions(transactions: string[]) {
  return (
    <>
      {transactions.map((hash, i) => {
        return <Transaction key={i} hash={hash} />
      })}
    </>
  )
}

interface AccountDetailsProps {
  toggleWalletModal: () => void
  pendingTransactions: string[]
  confirmedTransactions: string[]
  ENSName?: string
  openOptions: () => void
}

export default function AccountDetails({
  toggleWalletModal,
  pendingTransactions,
  confirmedTransactions,
  ENSName,
  openOptions
}: AccountDetailsProps) {
  const { chainId, account, connector } = useActiveWeb3React()
  const dispatch = useDispatch<AppDispatch>()
  const theme = useTheme()
  const walletDeactivate = useWalletDeactivate()

  function formatConnectorName() {
    const { ethereum } = window
    const isMetaMask = !!(ethereum && ethereum.isMetaMask)
    const name = isMetaMask ? 'Metamask' : 'wallet'
    return (
      <Typography fontSize="0.825rem" fontWeight={500}>
        Connected with {name}
      </Typography>
    )
  }

  const clearAllTransactionsCallback = useCallback(() => {
    if (chainId) dispatch(clearAllTransactions({ chainId }))
  }, [dispatch, chainId])

  return (
    <>
      <Box display="grid" width="100%" padding="16px" gridTemplateRows="50px 20px 20px" gap="12px">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          marginBottom="10px"
          color={theme.palette.text.secondary}
        >
          {formatConnectorName()}
          <Button
            color="secondary"
            sx={{ ml: '8px', width: 120, height: 30 }}
            onClick={() => {
              walletDeactivate()
            }}
          >
            Disconnect
          </Button>
        </Box>

        <Box
          display="flex"
          fontSize={24}
          fontWeight={500}
          gap="16px"
          alignItems="center"
          width="100%"
          justifyContent="center"
          id="web3-account-identifier-row"
        >
          {connector && <Dot />}
          {ENSName ? <span> {ENSName}</span> : <span> {account && shortenAddress(account)}</span>}
        </Box>

        <Box display="flex" justifyContent="center" width="100%" color={theme.palette.text.secondary}>
          {account && (
            <Copy toCopy={account}>
              <Typography variant="body2">Copy Address</Typography>
            </Copy>
          )}
        </Box>
      </Box>
      <Box display="flex" gap="10px" width="100%" justifyContent="center">
        <Button size={'small'} variant="outlined" onClick={toggleWalletModal}>
          Close
        </Button>
        <Button
          size={'small'}
          onClick={() => {
            openOptions()
          }}
        >
          Change
        </Button>
      </Box>
      <OutlinedCard width="100%" padding="20px">
        {!!pendingTransactions.length || !!confirmedTransactions.length ? (
          <Box display="grid" gap="16px" width="100%">
            <Box display="flex" justifyContent="space-between" alignItems={'center'} width="100%" fontWeight={500}>
              <Typography variant="inherit">Recent Transactions</Typography>
              <Button size="small" variant="text" onClick={clearAllTransactionsCallback}>
                (clear all)
              </Button>
            </Box>
            <Box
              display="grid"
              sx={{
                maxHeight: '200px',
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
          <Box display="flex" width="100%" justifyContent="center" marginTop={1}>
            <Typography> Your transactions will appear here...</Typography>
          </Box>
        )}
      </OutlinedCard>
    </>
  )
}
