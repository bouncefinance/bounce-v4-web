import { Box, IconButton, Stack, styled, Typography } from '@mui/material'
import Image from 'components/Image'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import { show } from '@ebay/nice-modal-react'
import { LoadingButton } from '@mui/lab'
import { AllocationStatus, CreationStep, ParticipantStatus } from '../types'
import {
  ActionType,
  useAuctionERC20Currency,
  useAuctionInChain,
  useValuesDispatch,
  useValuesState
} from '../ValuesProvider'
import DialogTips from 'bounceComponents/common/DialogTips'
import TokenImage from 'bounceComponents/common/TokenImage'
import { useCreateFixedSwapPool } from 'hooks/useCreateFixedSwapPool'
import { ReactComponent as CloseSVG } from 'assets/imgs/components/close.svg'
import { useQueryParams } from 'hooks/useQueryParams'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
import { useActiveWeb3React } from 'hooks'
import { getLabelById, shortenAddress } from 'utils'
import { useWalletModalToggle } from 'state/application/hooks'
import { ChainListMap } from 'constants/chain'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { CurrencyAmount } from 'constants/token'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { FIXED_SWAP_ERC20_ADDRESSES } from '../../../constants'
import { TransactionReceipt } from '@ethersproject/providers'
import { useOptionDatas } from 'state/configOptions/hooks'
import {
  hideDialogConfirmation,
  showRequestApprovalDialog,
  showRequestConfirmDialog,
  showWaitingTxDialog
} from 'utils/auction'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'

const ConfirmationSubtitle = styled(Typography)(({ theme }) => ({ color: theme.palette.grey[900], opacity: 0.5 }))

const ConfirmationInfoItem = ({ children, title }: { children: ReactNode; title?: ReactNode }): JSX.Element => (
  <Stack direction="row" justifyContent="space-between" alignItems="center" columnGap={20}>
    {typeof title === 'string' ? <ConfirmationSubtitle>{title}</ConfirmationSubtitle> : title}
    {children}
  </Stack>
)

type TypeButtonCommitted = 'wait' | 'inProgress' | 'success'

const CreatePoolButton = () => {
  const { redirect } = useQueryParams()
  const navigate = useNavigate()

  const { account, chainId } = useActiveWeb3React()
  const walletModalToggle = useWalletModalToggle()
  const auctionInChainId = useAuctionInChain()
  const switchNetwork = useSwitchNetwork()
  const { currencyFrom } = useAuctionERC20Currency()
  const auctionAccountBalance = useCurrencyBalance(account || undefined, currencyFrom)
  const values = useValuesState()
  const createFixedSwapPool = useCreateFixedSwapPool()
  const optionDatas = useOptionDatas()
  const [buttonCommitted, setButtonCommitted] = useState<TypeButtonCommitted>()
  const chainConfigInBackend = useChainConfigInBackend('ethChainId', auctionInChainId)

  const auctionPoolSizeAmount = useMemo(
    () => (currencyFrom && values.poolSize ? CurrencyAmount.fromAmount(currencyFrom, values.poolSize) : undefined),
    [currencyFrom, values.poolSize]
  )
  const [approvalState, approveCallback] = useApproveCallback(
    auctionPoolSizeAmount,
    chainId === auctionInChainId ? FIXED_SWAP_ERC20_ADDRESSES[auctionInChainId] : undefined,
    true
  )

  const toCreate = useCallback(async () => {
    showRequestConfirmDialog()
    try {
      setButtonCommitted('wait')
      const { getPoolId, transactionReceipt } = await createFixedSwapPool()
      setButtonCommitted('inProgress')

      const handleCloseDialog = () => {
        if (redirect && typeof redirect === 'string') {
          navigate(redirect)
        } else {
          navigate(routes.market.pools)
        }
      }

      const ret: Promise<TransactionReceipt> = new Promise((resolve, rpt) => {
        showWaitingTxDialog(() => {
          hideDialogConfirmation()
          rpt()
          handleCloseDialog()
        })
        transactionReceipt.then(curReceipt => {
          resolve(curReceipt)
          setButtonCommitted('success')
        })
      })
      ret
        .then(curReceipt => {
          const goToPoolInfoPage = () => {
            const poolId = getPoolId(curReceipt.logs)

            if (!poolId) {
              navigate(routes.market.pools)
              return
            }
            navigate(
              routes.auction.fixedPrice
                .replace(':chainShortName', chainConfigInBackend?.shortName || '')
                .replace(':poolId', poolId)
            )
          }

          hideDialogConfirmation()
          show(DialogTips, {
            iconType: 'success',
            againBtn: 'To the pool',
            cancelBtn: 'Not now',
            title: 'Congratulations!',
            content: `You have successfully created the auction.`,
            onAgain: goToPoolInfoPage,
            onCancel: handleCloseDialog,
            onClose: handleCloseDialog
          })
        })
        .catch()
    } catch (error) {
      const err: any = error
      hideDialogConfirmation()
      setButtonCommitted(undefined)
      show(DialogTips, {
        iconType: 'error',
        againBtn: 'Try Again',
        cancelBtn: 'Cancel',
        title: 'Oops..',
        content: typeof err === 'string' ? err : err?.error?.message || err?.message || 'Something went wrong',
        onAgain: toCreate
      })
    }
  }, [chainConfigInBackend?.shortName, createFixedSwapPool, navigate, redirect])

  const toApprove = useCallback(async () => {
    showRequestApprovalDialog()
    try {
      const { transactionReceipt } = await approveCallback()
      // show(DialogTips, {
      //   iconType: 'success',
      //   cancelBtn: 'Close',
      //   title: 'Transaction Submitted!',
      //   content: `Approving use of ${currencyFrom?.symbol} ...`,
      //   handleCancel: () => hide(DialogTips)
      // })
      const ret = new Promise((resolve, rpt) => {
        showWaitingTxDialog(() => {
          hideDialogConfirmation()
          rpt()
        })
        transactionReceipt.then(curReceipt => {
          resolve(curReceipt)
        })
      })
      ret
        .then(() => {
          hideDialogConfirmation()
          toCreate()
        })
        .catch()
    } catch (error) {
      const err: any = error
      hideDialogConfirmation()
      show(DialogTips, {
        iconType: 'error',
        againBtn: 'Try Again',
        cancelBtn: 'Cancel',
        title: 'Oops..',
        content: typeof err === 'string' ? err : err?.error?.message || err?.message || 'Something went wrong',
        onAgain: toApprove
      })
    }
  }, [approveCallback, toCreate])

  const confirmBtn: {
    disabled?: boolean
    loading?: boolean
    text?: string
    run?: () => void
  } = useMemo(() => {
    if (!account) {
      return {
        text: 'Connect wallet',
        run: walletModalToggle
      }
    }
    if (chainId !== auctionInChainId) {
      return {
        text: 'Switch network',
        run: () => switchNetwork(auctionInChainId)
      }
    }
    if (buttonCommitted !== undefined) {
      if (buttonCommitted === 'success') {
        return {
          text: 'Success',
          disabled: true
        }
      }
      return {
        text: 'Confirm',
        loading: true
      }
    }
    if (!auctionAccountBalance || !auctionPoolSizeAmount || !auctionAccountBalance.greaterThan(auctionPoolSizeAmount)) {
      return {
        text: 'Insufficient Balance',
        disabled: true
      }
    }
    if (approvalState !== ApprovalState.APPROVED) {
      if (approvalState === ApprovalState.PENDING) {
        return {
          text: `Approving use of ${currencyFrom?.symbol} ...`,
          loading: true
        }
      }
      if (approvalState === ApprovalState.UNKNOWN) {
        return {
          text: 'Loading...',
          loading: true
        }
      }
      if (approvalState === ApprovalState.NOT_APPROVED) {
        return {
          text: `Approve use of ${currencyFrom?.symbol}`,
          run: toApprove
        }
      }
    }
    return {
      run: toCreate
    }
  }, [
    account,
    approvalState,
    auctionAccountBalance,
    auctionInChainId,
    auctionPoolSizeAmount,
    buttonCommitted,
    chainId,
    currencyFrom?.symbol,
    switchNetwork,
    toApprove,
    toCreate,
    walletModalToggle
  ])

  return (
    <LoadingButton
      fullWidth
      variant="contained"
      loadingPosition="start"
      loading={confirmBtn.loading}
      disabled={confirmBtn.disabled}
      onClick={confirmBtn.run}
    >
      {confirmBtn.text || 'Confirm'}
    </LoadingButton>
  )
}

const CreationConfirmation = () => {
  const values = useValuesState()
  const valuesDispatch = useValuesDispatch()
  const { auctionType } = useQueryParams()
  const auctionInChainId = useAuctionInChain()

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
      <IconButton
        color="primary"
        aria-label="back"
        sx={{ width: 52, height: 52, border: '1px solid rgba(0, 0, 0, 0.27)', ml: 'auto', mr: 22 }}
        onClick={() => {
          // onClose()
          valuesDispatch({
            type: ActionType.HandleStep,
            payload: {
              activeStep: CreationStep.ADVANCED_SETTINGS
            }
          })
        }}
      >
        <CloseSVG />
      </IconButton>

      <Box sx={{ display: 'flex', flexDirection: 'column', pb: 48, width: 'fit-content' }}>
        <Typography variant="h2" sx={{ textAlign: 'center', mb: 42 }}>
          Creation confirmation
        </Typography>

        <Box sx={{ borderRadius: '20px', border: '1px solid #D7D6D9', px: 24, py: 30 }}>
          <Typography variant="h3" sx={{ fontSize: 16, mb: 24 }}>
            {values.poolName} Fixed-price Pool
          </Typography>

          <Stack spacing={24}>
            <ConfirmationInfoItem title="Chain">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Image
                  src={auctionInChainId ? ChainListMap[auctionInChainId]?.logo || '' : ''}
                  alt={auctionInChainId ? ChainListMap[auctionInChainId]?.name : ''}
                  width={20}
                  height={20}
                />
                <Typography sx={{ ml: 4 }}>{auctionInChainId ? ChainListMap[auctionInChainId]?.name : ''}</Typography>
              </Box>
            </ConfirmationInfoItem>

            <Box>
              <Typography variant="h3" sx={{ fontSize: 14, mb: 12 }}>
                Token Information
              </Typography>

              <Stack spacing={15}>
                <ConfirmationInfoItem title="Token Contact address">
                  <Typography>{shortenAddress(values.tokenFrom.address)}</Typography>
                </ConfirmationInfoItem>

                <ConfirmationInfoItem title="Token symbol">
                  <Stack direction="row" spacing={8} alignItems="center">
                    <TokenImage alt={values.tokenFrom.symbol} src={values.tokenFrom.logoURI} size={20} />
                    <Typography>{values.tokenFrom.symbol}</Typography>
                  </Stack>
                </ConfirmationInfoItem>

                <ConfirmationInfoItem title="Token decimal">
                  <Typography>{values.tokenFrom.decimals}</Typography>
                </ConfirmationInfoItem>
              </Stack>
            </Box>

            <Box>
              <Typography variant="h3" sx={{ fontSize: 14, mb: 12 }}>
                Auction Parameters
              </Typography>

              <Stack spacing={15}>
                <ConfirmationInfoItem title="Pool type">
                  <Typography>{auctionType}</Typography>
                </ConfirmationInfoItem>

                <ConfirmationInfoItem title="To">
                  <Stack direction="row" spacing={8} alignItems="center">
                    <TokenImage alt={values.tokenTo.symbol} src={values.tokenTo.logoURI} size={20} />
                    <Typography>{values.tokenTo.symbol}</Typography>
                  </Stack>
                </ConfirmationInfoItem>

                <ConfirmationInfoItem title="Swap Ratio">
                  <Typography>
                    1 {values.tokenFrom.symbol} = {values.swapRatio} {values.tokenTo.symbol}
                  </Typography>
                </ConfirmationInfoItem>

                <ConfirmationInfoItem title="Amount">
                  <Typography>{values.poolSize}</Typography>
                </ConfirmationInfoItem>

                <ConfirmationInfoItem title="Allocation per Wallet">
                  <Typography>
                    {values.allocationStatus === AllocationStatus.NoLimits
                      ? 'No'
                      : `Limit ${Number(values.allocationPerWallet).toLocaleString()} ${values.tokenTo.symbol}`}
                  </Typography>
                </ConfirmationInfoItem>
              </Stack>
            </Box>

            <Box>
              <Typography variant="h3" sx={{ fontSize: 14, mb: 12 }}>
                Advanced Settings
              </Typography>

              <Stack spacing={15}>
                <ConfirmationInfoItem title="Pool duration">
                  <Typography>
                    From {values.startTime?.format('MM.DD.Y HH:mm')} - To {values.endTime?.format('MM.DD.Y HH:mm')}
                  </Typography>
                </ConfirmationInfoItem>

                <ConfirmationInfoItem title="Participant">
                  <Typography>
                    {values.participantStatus === ParticipantStatus.Public ? 'Public' : 'Whitelist'}
                  </Typography>
                </ConfirmationInfoItem>

                <ConfirmationInfoItem title="Delay Unlocking Token">
                  <Typography>
                    {values.delayUnlockingTime ? values.delayUnlockingTime.format('MM:DD:Y HH:mm') : 'No'}
                  </Typography>
                </ConfirmationInfoItem>
              </Stack>
            </Box>
          </Stack>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 32, width: '100%' }}>
          <CreatePoolButton />

          <ConfirmationSubtitle sx={{ mt: 12 }}>Transaction Fee is 2.5%</ConfirmationSubtitle>
        </Box>
      </Box>
    </Box>
  )
}

export default CreationConfirmation
