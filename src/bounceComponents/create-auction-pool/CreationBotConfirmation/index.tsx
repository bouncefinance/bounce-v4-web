import { Box, IconButton, Typography, Stack, styled } from '@mui/material'
import { TgBotActiveStep, TgBotTabValue } from '../types'
import { useValuesDispatch, useValuesState, ActionType, useAuctionERC20Currency } from '../ValuesProvider'
import { ReactComponent as CloseSVG } from 'assets/imgs/components/close.svg'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import Image from 'components/Image'
import { ChainListMap } from 'constants/chain'
import { shortenAddress } from 'utils'
import TokenImage from 'bounceComponents/common/TokenImage'
import { AllocationStatus, ParticipantStatus, IReleaseType } from '../types'
import { LoadingButton } from '@mui/lab'
import { useActiveWeb3React } from 'hooks'
import { useShowLoginModal } from 'state/users/hooks'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { CurrencyAmount } from 'constants/token'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { FIXED_SWAP_BOT_ERC20_ADDRESSES } from '../../../constants'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'

import {
  showRequestApprovalDialog,
  showWaitingTxDialog,
  hideBotDialogConfirmation,
  showRequestConfirmDialog
} from 'utils/auction'
import { show } from '@ebay/nice-modal-react'
import DialogTips from 'bounceComponents/common/DialogTips'
import { useCreateBotSwapPool } from 'hooks/useCreateBotSwapPool'

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

const CreatePoolButton = () => {
  const { account, chainId } = useActiveWeb3React()
  const showLoginModal = useShowLoginModal()
  const values = useValuesState()
  const switchNetwork = useSwitchNetwork()
  const [buttonCommitted, setButtonCommitted] = useState<TypeButtonCommitted>()
  const { currencyFrom } = useAuctionERC20Currency()
  const auctionAccountBalance = useCurrencyBalance(account || undefined, currencyFrom)
  const auctionPoolSizeAmount = useMemo(
    () => (currencyFrom && values.poolSize ? CurrencyAmount.fromAmount(currencyFrom, values.poolSize) : undefined),
    [currencyFrom, values.poolSize]
  )
  const valuesDispatch = useValuesDispatch()
  const navigate = useNavigate()

  const [approvalState, approveCallback] = useApproveCallback(
    auctionPoolSizeAmount,
    values.auctionInChain && chainId === values.auctionInChain
      ? FIXED_SWAP_BOT_ERC20_ADDRESSES[values.auctionInChain]
      : undefined,
    true
  )
  const createBotSwapPool = useCreateBotSwapPool()

  const toCreate = useCallback(async () => {
    showRequestConfirmDialog({ isBot: true, dark: false })

    try {
      setButtonCommitted('wait')
      const { getPoolId, transactionReceipt } = await createBotSwapPool()
      setButtonCommitted('inProgress')
      const ret: Promise<string> = new Promise((resolve, rpt) => {
        showWaitingTxDialog(
          () => {
            hideBotDialogConfirmation()
            rpt()
            // handleCloseDialog()
          },
          { isBot: true, dark: false }
        )
        transactionReceipt.then(curReceipt => {
          const poolId = getPoolId(curReceipt.logs)
          if (poolId) {
            resolve(poolId)
            setButtonCommitted('success')
          } else {
            hideBotDialogConfirmation()
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
        .then(() => {
          hideBotDialogConfirmation()
          show(DialogTips, {
            iconType: 'success',
            againBtn: 'Confirm',
            title: 'Congratulations!',
            content: 'You have successfully created the auction.',
            onAgain: () => {
              hideBotDialogConfirmation()
              valuesDispatch({
                type: ActionType.SetTgBotTabValue,
                payload: {
                  tgBotActiveStep: TgBotTabValue.BOTSETUP
                }
              })
              navigate(routes.telegramBot.index)
            },
            onClose: () => {
              hideBotDialogConfirmation()
            }
          })
        })
        .catch()
    } catch (error) {
      const err: any = error
      console.error(err)
      hideBotDialogConfirmation()
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
  }, [createBotSwapPool, navigate, valuesDispatch])

  const toApprove = useCallback(async () => {
    showRequestApprovalDialog({ isBot: true, dark: false })
    try {
      const { transactionReceipt } = await approveCallback()
      const ret = new Promise((resolve, rpt) => {
        showWaitingTxDialog(
          () => {
            hideBotDialogConfirmation()
            rpt()
          },
          { isBot: true, dark: false }
        )
        transactionReceipt.then(curReceipt => {
          resolve(curReceipt)
        })
      })
      ret
        .then(handleFulfilled => {
          console.log('handleFulfilled', handleFulfilled)
          hideBotDialogConfirmation()
          toCreate()
        })
        .catch()
    } catch (error) {
      const err: any = error
      console.error('error>>>', err)
      hideBotDialogConfirmation()
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
    if (chainId !== values.auctionInChain) {
      return {
        text: 'Switch network',
        run: () => switchNetwork(values.auctionInChain)
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
    console.log('1', approvalState)
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
    auctionPoolSizeAmount,
    buttonCommitted,
    chainId,
    currencyFrom?.symbol,
    showLoginModal,
    switchNetwork,
    toApprove,
    toCreate,
    values.auctionInChain
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

const CreationBotConfirmation = () => {
  const values = useValuesState()
  const valuesDispatch = useValuesDispatch()
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', background: '#fff' }}>
      <IconButton
        color="primary"
        aria-label="back"
        sx={{ width: 52, height: 52, border: '1px solid rgba(0, 0, 0, 0.27)', ml: 'auto', mr: 22 }}
        onClick={() => {
          // onClose()
          valuesDispatch({
            type: ActionType.SetTgBotActiveStep,
            payload: {
              tgBotActiveStep: TgBotActiveStep.GUIDEFORM
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
            {values.poolName} Fixed-price Pool
          </Typography>
          <Stack spacing={24}>
            <ConfirmationInfoItem title="Chain">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Image
                  src={values.auctionInChain ? (ChainListMap as any)[values.auctionInChain]?.logo || '' : ''}
                  alt={values.auctionInChain ? (ChainListMap as any)[values.auctionInChain]?.name : ''}
                  width={20}
                  height={20}
                />
                <Typography sx={{ ml: 4 }}>
                  {values.auctionInChain ? (ChainListMap as any)[values.auctionInChain]?.name : ''}
                </Typography>
              </Box>
            </ConfirmationInfoItem>
            <Box>
              <Typography variant="h3" sx={{ fontSize: 14, mb: 12 }}>
                Token Information
              </Typography>

              <Stack spacing={15}>
                <ConfirmationInfoItem title="Token Contract address">
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

                <ConfirmationInfoItem title="Unlocking Token Type">
                  <Typography>{tokenReleaseTypeText(values.releaseType)}</Typography>
                </ConfirmationInfoItem>
              </Stack>
            </Box>
          </Stack>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 32, width: '100%' }}>
            <CreatePoolButton />
            {/* <ConfirmationSubtitle sx={{ mt: 12 }}>Transaction Fee is 2.5%</ConfirmationSubtitle> */}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default CreationBotConfirmation
