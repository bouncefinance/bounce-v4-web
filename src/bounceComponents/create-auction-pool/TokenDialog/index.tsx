import { useState } from 'react'
import { useModal, create, muiDialogV5 } from '@ebay/nice-modal-react'
import { useDebounce } from 'ahooks'
import { Box, CircularProgress, OutlinedInput, Stack, Typography } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import VirtualizedList from './TokenList'
import Dialog from 'bounceComponents/common/DialogBase'
import useTokenList from 'bounceHooks/auction/useTokenList'
import { ChainId } from 'constants/chain'
import { Token } from 'bounceComponents/fixed-swap/type'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
import { useActiveWeb3React } from 'hooks'

export interface BasicToken {
  address: string
  symbol: string
  name: string
  decimals: number
}

export interface TokenDialogProps {
  enableEth?: boolean
  onClose?: () => void
  chainId: ChainId
}

const Loading = () => {
  return (
    <Stack direction="row" alignItems="center" justifyContent="center">
      <CircularProgress sx={{ color: '#878A8E', mr: 10 }} size={16} />
      <Typography variant="h4" sx={{ color: '#878A8E' }}>
        Loading
      </Typography>
    </Stack>
  )
}

const TokenDialog = create(({ chainId }: TokenDialogProps) => {
  const modal = useModal()
  const { account } = useActiveWeb3React()
  const chainConfig = useChainConfigInBackend('ethChainId', chainId)

  const handleResolve = (token: Token) => {
    modal.resolve(token)
    modal.hide()
  }
  const handleReject = () => {
    modal.reject(new Error('Rejected'))
    modal.hide()
  }

  const [filterInputValue, setFilterInputValue] = useState<string>('')

  const debouncedFilterInputValue = useDebounce(filterInputValue, { wait: 400 })

  const {
    tokenList: tokenList,
    isGettingTokenList,
    isGettingSingleToken
  } = useTokenList(chainConfig?.id, account, debouncedFilterInputValue)

  console.log('>>>>> tokenList: ', tokenList)

  return (
    <Dialog title="Select a token" fullWidth {...muiDialogV5(modal)} onClose={handleReject}>
      <OutlinedInput
        onChange={event => {
          console.log('filterInputValue: ', event.target.value)
          setFilterInputValue(event.target.value)
        }}
        fullWidth
        sx={{ mb: 30 }}
        startAdornment={<SearchIcon sx={{ mr: 4 }} />}
        placeholder="Search by token name or contract address"
      />

      {tokenList && !isGettingTokenList && !isGettingSingleToken ? (
        <VirtualizedList data={tokenList} onOk={handleResolve} onCancel={handleReject} />
      ) : (
        <Box sx={{ height: 300 }}>
          <Loading />
        </Box>
      )}
    </Dialog>
  )
})

export default TokenDialog
