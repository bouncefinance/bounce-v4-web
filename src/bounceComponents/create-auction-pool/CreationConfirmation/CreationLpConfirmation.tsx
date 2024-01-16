import { Box, IconButton, Stack, styled, Typography } from '@mui/material'
import Image from 'components/Image'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import { show } from '@ebay/nice-modal-react'
import { LoadingButton } from '@mui/lab'
import { CreationStep, IReleaseType } from '../types'
import {
  ActionType,
  useAuctionERC20Currency,
  useAuctionInChain,
  useValuesDispatch,
  useValuesState
} from '../ValuesProvider'
import DialogTips from 'bounceComponents/common/DialogTips'
import TokenImage from 'bounceComponents/common/TokenImage'
import { useCreateInitialLPOfferingPool } from 'hooks/useCreateInitialLPOfferingPool'
import { ReactComponent as CloseSVG } from 'assets/imgs/components/close.svg'
import { useQueryParams } from 'hooks/useQueryParams'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
import { useActiveWeb3React } from 'hooks'
import { shortenAddress } from 'utils'
import { ChainListMap } from 'constants/chain'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { CurrencyAmount } from 'constants/token'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { FIXED_SWAP_ERC20_ADDRESSES } from '../../../constants'
import {
  hideDialogConfirmation,
  showRequestApprovalDialog,
  showRequestConfirmDialog,
  showWaitingTxDialog
} from 'utils/auction'
import { useShowLoginModal } from 'state/users/hooks'
import AuctionNotification from '../AuctionNotification'
const ConfirmationSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[900],
  opacity: 0.5,
  textTransform: 'capitalize'
}))

const ConfirmationInfoItem = ({ children, title }: { children: ReactNode; title?: ReactNode }): JSX.Element => (
  <Stack direction="row" justifyContent="space-between" alignItems="center" columnGap={20}>
    {typeof title === 'string' ? <ConfirmationSubtitle>{title}</ConfirmationSubtitle> : title}
    {children}
  </Stack>
)

type TypeButtonCommitted = 'wait' | 'inProgress' | 'success'

export const tokenReleaseTypeText = (key: IReleaseType | 1000) => {
  switch (key) {
    case IReleaseType.Instant:
      return 'Unlock immediately'
    case IReleaseType.Cliff:
      return 'Delay unlocking'
    case IReleaseType.Linear:
      return 'Linear unlocking'
    case IReleaseType.Fragment:
      return 'Staged unlocking'
    default:
      return 'Unset'
  }
}

const CreatePoolButton = () => {
  const { redirect } = useQueryParams()
  const navigate = useNavigate()

  const { account, chainId } = useActiveWeb3React()
  const showLoginModal = useShowLoginModal()
  const auctionInChainId = useAuctionInChain()
  const switchNetwork = useSwitchNetwork()
  const { currencyTo } = useAuctionERC20Currency()
  const auctionAccountBalance = useCurrencyBalance(account || undefined, currencyTo)
  const values = useValuesState()
  const createInitialLPOfferingPool = useCreateInitialLPOfferingPool()
  const [buttonCommitted, setButtonCommitted] = useState<TypeButtonCommitted>()
  const auctionPoolSizeAmount = useMemo(
    () => (currencyTo && values.poolSize ? CurrencyAmount.fromAmount(currencyTo, values.poolSize) : undefined),
    [currencyTo, values.poolSize]
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
      const { getPoolId, transactionReceipt, sysId } = await createInitialLPOfferingPool()
      setButtonCommitted('inProgress')

      const handleCloseDialog = () => {
        if (redirect && typeof redirect === 'string') {
          navigate(redirect)
        } else {
          navigate(routes.market.index)
        }
      }

      const ret: Promise<string> = new Promise((resolve, rpt) => {
        showWaitingTxDialog(() => {
          hideDialogConfirmation()
          rpt()
          handleCloseDialog()
        })
        transactionReceipt.then(curReceipt => {
          const poolId = getPoolId(curReceipt.logs)
          if (poolId) {
            resolve(poolId)
            setButtonCommitted('success')
          } else {
            hideDialogConfirmation()
            show(DialogTips, {
              iconType: 'error',
              cancelBtn: 'Cancel',
              title: 'Oops..',
              content: 'The creation may have failed. Please check some parameters, such as the start time'
            })
            rpt()
          }
        })
      })
      ret
        .then(poolId => {
          console.log(poolId)
          hideDialogConfirmation()
          show(DialogTips, {
            iconType: 'success',
            cancelBtn: 'Close',
            title: 'Congratulations!',
            content: `You have successfully created the auction.The poolId is ${sysId}`,
            onCancel: handleCloseDialog,
            onClose: handleCloseDialog
          })
        })
        .catch()
    } catch (error) {
      const err: any = error
      console.error(err)
      hideDialogConfirmation()
      setButtonCommitted(undefined)
      show(DialogTips, {
        iconType: 'error',
        againBtn: 'Try Again',
        cancelBtn: 'Cancel',
        title: 'Oops..',
        content:
          typeof err === 'string'
            ? err
            : err?.data?.message || err?.error?.message || err?.message || 'Something went wrong',
        onAgain: toCreate
      })
    }
  }, [createInitialLPOfferingPool, navigate, redirect])

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
      console.error(err)
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
        run: showLoginModal
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
    if (!auctionAccountBalance || !auctionPoolSizeAmount || auctionPoolSizeAmount.greaterThan(auctionAccountBalance)) {
      return {
        text: 'Insufficient Balance',
        disabled: true
      }
    }
    if (approvalState !== ApprovalState.APPROVED) {
      if (approvalState === ApprovalState.PENDING) {
        return {
          text: `Approving use of ${currencyTo?.symbol} ...`,
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
          text: `Approve use of ${currencyTo?.symbol}`,
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
    currencyTo?.symbol,
    showLoginModal,
    switchNetwork,
    toApprove,
    toCreate
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
  console.log('valuesvalues', values)

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

      <Box sx={{ display: 'flex', flexDirection: 'column', pb: 48, width: 'fit-content', px: { xs: 16, md: 0 } }}>
        <Typography variant="h2" sx={{ textAlign: 'center', mb: 42 }}>
          Creation confirmation
        </Typography>

        <Box sx={{ borderRadius: '20px', border: '1px solid #D7D6D9', px: 24, py: 30 }}>
          <Typography variant="h3" sx={{ fontSize: 16, mb: 24 }}>
            {values.poolName} Initial LP Offering Auction Pool
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
            <ConfirmationInfoItem title="Pool type">
              <Typography>{auctionType}</Typography>
            </ConfirmationInfoItem>
            <Box>
              <Typography variant="h3" sx={{ fontSize: 14, mb: 12 }}>
                Token0 Information
              </Typography>

              <Stack spacing={15}>
                <ConfirmationInfoItem title="Token0 Contract address">
                  <Typography>{shortenAddress(values.tokenFrom.address)}</Typography>
                </ConfirmationInfoItem>

                <ConfirmationInfoItem title="Token0 symbol">
                  <Stack direction="row" spacing={8} alignItems="center">
                    <TokenImage alt={values.tokenFrom.symbol} src={values.tokenFrom.logoURI} size={20} />
                    <Typography>{values.tokenFrom.symbol}</Typography>
                  </Stack>
                </ConfirmationInfoItem>

                <ConfirmationInfoItem title="Token0 decimal">
                  <Typography>{values.tokenFrom.decimals}</Typography>
                </ConfirmationInfoItem>
              </Stack>
            </Box>
            <Box>
              <Typography variant="h3" sx={{ fontSize: 14, mb: 12 }}>
                Token1 Information
              </Typography>

              <Stack spacing={15}>
                <ConfirmationInfoItem title="Token1 Contract address">
                  <Typography>{shortenAddress(values.tokenTo.address)}</Typography>
                </ConfirmationInfoItem>

                <ConfirmationInfoItem title="Token1 symbol">
                  <Stack direction="row" spacing={8} alignItems="center">
                    <TokenImage alt={values.tokenTo.symbol} src={values.tokenTo.logoURI} size={20} />
                    <Typography>{values.tokenTo.symbol}</Typography>
                  </Stack>
                </ConfirmationInfoItem>

                <ConfirmationInfoItem title="Token1 decimal">
                  <Typography>{values.tokenTo.decimals}</Typography>
                </ConfirmationInfoItem>

                <ConfirmationInfoItem title="Amount">
                  <Typography>{values.poolSize}</Typography>
                </ConfirmationInfoItem>
              </Stack>
            </Box>

            <Box>
              <Typography variant="h3" sx={{ fontSize: 14, mb: 12 }}>
                Advanced Settings
              </Typography>

              <Stack spacing={15}>
                <ConfirmationInfoItem title="Pool openAt">
                  <Typography>{values.startTime?.format('MM.DD.Y HH:mm')}</Typography>
                </ConfirmationInfoItem>
                <ConfirmationInfoItem title="Pool closeAt">
                  <Typography>{values.endTime?.format('MM.DD.Y HH:mm')}</Typography>
                </ConfirmationInfoItem>
                <ConfirmationInfoItem title="Pool claimAt">
                  <Typography>{values.delayUnlockingTime?.format('MM.DD.Y HH:mm')}</Typography>
                </ConfirmationInfoItem>
                <ConfirmationInfoItem title="Max Participant Allowed">
                  <Typography>{values.maxParticipantAllowed}</Typography>
                </ConfirmationInfoItem>
                <ConfirmationInfoItem title="Winner Number">
                  <Typography>{values.winnerNumber}</Typography>
                </ConfirmationInfoItem>
                <ConfirmationInfoItem title="Whitelist">
                  <Typography>{values.whitelist.toString()}</Typography>
                </ConfirmationInfoItem>
              </Stack>
            </Box>
          </Stack>
        </Box>
        <AuctionNotification />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 32, width: '100%' }}>
          <CreatePoolButton />

          <ConfirmationSubtitle sx={{ mt: 12 }}>Transaction Fee is 2.5%</ConfirmationSubtitle>
        </Box>
      </Box>
    </Box>
  )
}

export default CreationConfirmation
