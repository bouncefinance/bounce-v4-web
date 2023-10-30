import {
  Box,
  // IconButton,
  Typography,
  Stack,
  styled,
  Button
} from '@mui/material'
import { TgBotActiveStep, TgBotTabValue } from '../types'
import { useValuesDispatch, useValuesState, ActionType, useAuctionERC20Currency } from '../ValuesProvider'
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
  // showRequestApprovalDialog,
  showWaitingTxDialog,
  hideBotDialogConfirmation,
  showRequestConfirmDialog
} from 'utils/auction'
import { show } from '@ebay/nice-modal-react'
import DialogTips from 'bounceComponents/common/DialogTips'
import { useCreateBotSwapPool } from 'hooks/useCreateBotSwapPool'
import { ReactComponent as TgLeft } from 'assets/svg/tg_left.svg'
import useBreakpoint from 'hooks/useBreakpoint'

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

const TwoColumnPanel = ({ children }: { children: JSX.Element }) => {
  const isMobile = useBreakpoint('md')

  if (isMobile) {
    return (
      <Box width={'100%'} padding={16} display={'flex'} justifyContent={'center'}>
        <Box
          sx={{
            width: '100%',
            borderRadius: '16px',
            background: '#fff',
            padding: '24px 16px'
          }}
        >
          {children}
        </Box>
      </Box>
    )
  }

  return (
    <Box width={'100%'} mt={24} mb={68} height={'552px'} display={'flex'} justifyContent={'center'}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          maxWidth: '544px',
          background: 'var(--yellow, #E1F25C)',
          borderRadius: '24px 0 0 24px'
        }}
      >
        <TgLeft />
      </Box>
      <Box
        sx={{
          width: '100%',
          borderRadius: '0 24px 24px 0',
          background: '#fff',
          padding: '56px 0px 0'
        }}
      >
        <Box
          sx={{
            minWidth: '600px',
            padding: '0 56px 0',
            height: '100%',
            overflowY: 'scroll'
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}

const ComfirmGreenRow = styled(Stack)`
  padding: 24px;
  gap: 10px;
  align-self: stretch;
  border-radius: 16px;
  background: var(--yellow, #e1f25c);
`
const ComfirmRow = styled(Stack)`
  padding: 24px;
  gap: 10px;
  align-self: stretch;
  border-radius: 16px;
  background: var(--white-100, #fff);
`

const ConfirmationSubtitle = styled(Typography)`
  color: var(--grey-03, #959595);
  font-family: Inter;
  font-size: 13px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  text-transform: capitalize;
  white-space: nowrap;
  @media (max-width: 860px) {
    font-size: 12px;
  }
`

const ConfirmationInfoItem = ({ children, title }: { children: ReactNode; title?: ReactNode }): JSX.Element => {
  const isMobile = useBreakpoint('md')
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center" columnGap={20}>
      {typeof title === 'string' ? <ConfirmationSubtitle>{title}</ConfirmationSubtitle> : title}
      <Typography color={'#20201E'} fontSize={isMobile ? 12 : 13} fontWeight={400} fontFamily={'Inter'}>
        {children}
      </Typography>
    </Stack>
  )
}

type TypeButtonCommitted = 'wait' | 'inProgress' | 'success'

const CreatePoolButton = () => {
  const { account, chainId } = useActiveWeb3React()
  const showLoginModal = useShowLoginModal()
  const values = useValuesState()
  console.log('create btn values', values)
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
    // showRequestApprovalDialog({ isBot: true, dark: false })
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
        .then(() => {
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
      color="secondary"
    >
      {confirmBtn.text || 'Confirm'}
    </LoadingButton>
  )
}

const CreationBotConfirmation = () => {
  const isMobile = useBreakpoint('md')
  const values = useValuesState()
  const valuesDispatch = useValuesDispatch()
  console.log('CreationBotConfirmation values', values)

  return (
    <TwoColumnPanel>
      <Stack mb={56}>
        <Typography
          mb={32}
          color={'#20201E'}
          fontFamily={'Public Sans'}
          fontWeight={600}
          fontSize={20}
          textAlign={'center'}
        >
          Creation confirmation
        </Typography>
        <Stack
          sx={{
            borderRadius: '20px',
            background: 'var(--grey-06, #F6F6F3)',
            padding: isMobile ? '24px 16px' : '30px'
          }}
        >
          <Typography fontFamily={'Public Sans'} fontSize={isMobile ? 16 : 20} fontWeight={600}>
            {values.poolName} Fixed-price Pool
          </Typography>
          <Stack spacing={isMobile ? 12 : 24}>
            <ComfirmGreenRow justifyContent={'space-between'} direction={'row'} mt={12}>
              <Typography color={'#121212'} fontFamily={'Public Sans'} fontSize={14} fontWeight={600}>
                Chain
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Image
                  src={values.auctionInChain ? (ChainListMap as any)[values.auctionInChain]?.logo || '' : ''}
                  alt={values.auctionInChain ? (ChainListMap as any)[values.auctionInChain]?.name : ''}
                  width={20}
                  height={20}
                />
                <Typography fontSize={isMobile ? 13 : 12} sx={{ ml: 4 }}>
                  {values.auctionInChain ? (ChainListMap as any)[values.auctionInChain]?.name : ''}
                </Typography>
              </Box>
            </ComfirmGreenRow>
            <ComfirmRow>
              <Typography color={'#20201E'} fontFamily={'Public Sans'} fontSize={13} fontWeight={600}>
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
            </ComfirmRow>
            {!isMobile && (
              <Box
                sx={{
                  background: '#D4D6CF',
                  opacity: 0.7,
                  height: '1px',
                  width: '100%',
                  margin: '24px 0'
                }}
              ></Box>
            )}

            <ComfirmRow>
              <Typography color={'#20201E'} fontFamily={'Public Sans'} fontSize={14} fontWeight={600}>
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
            </ComfirmRow>
            {!isMobile && (
              <Box
                sx={{
                  background: '#D4D6CF',
                  opacity: 0.7,
                  height: '1px',
                  width: '100%',
                  margin: '24px 0'
                }}
              ></Box>
            )}
            <ComfirmRow>
              <Typography color={'#20201E'} fontFamily={'Public Sans'} fontSize={14} fontWeight={600}>
                Advanced Settings
              </Typography>

              <Stack spacing={15}>
                <ConfirmationInfoItem title="Pool duration">
                  <Typography>
                    From {values.startTime?.format('MM.DD.Y HH:mm')} - To {values.endTime?.format('MM.DD.Y HH:mm')}
                  </Typography>
                </ConfirmationInfoItem>
              </Stack>
            </ComfirmRow>
            {!isMobile && (
              <Box
                sx={{
                  background: '#D4D6CF',
                  opacity: 0.7,
                  height: '1px',
                  width: '100%',
                  margin: '24px 0'
                }}
              ></Box>
            )}
            <ComfirmRow>
              <Typography color={'#20201E'} fontFamily={'Public Sans'} fontSize={14} fontWeight={600}>
                Participant Settings
              </Typography>

              <Stack spacing={15}>
                <ConfirmationInfoItem title="Participant">
                  <Typography>
                    {values.participantStatus === ParticipantStatus.Public ? 'Public' : 'Credentials'}
                  </Typography>
                </ConfirmationInfoItem>
              </Stack>
            </ComfirmRow>
          </Stack>
          <Stack gap={10} direction={'row'} mt={32}>
            <Button
              sx={{
                width: '100%'
              }}
              type="submit"
              variant="outlined"
              onClick={() => {
                window.scrollTo(0, 0)
                valuesDispatch({
                  type: ActionType.SetTgBotActiveStep,
                  payload: {
                    tgBotActiveStep: TgBotActiveStep.GUIDEFORM
                  }
                })
              }}
            >
              Cancel
            </Button>
            <CreatePoolButton />
            {/* <ConfirmationSubtitle sx={{ mt: 12 }}>Transaction Fee is 2.5%</ConfirmationSubtitle> */}
          </Stack>
        </Stack>
      </Stack>
    </TwoColumnPanel>
  )
}

export default CreationBotConfirmation
