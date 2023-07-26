import { Box, IconButton, Stack, styled, Typography } from '@mui/material'
import Image from 'components/Image'
import { ReactNode, useCallback, useMemo, useState } from 'react'
import { show } from '@ebay/nice-modal-react'
import { LoadingButton } from '@mui/lab'
import { AllocationStatus, CreationStep, ParticipantStatus } from '../types'
import { ActionType, useAuctionInChain, useValuesDispatch, useValuesState } from '../ValuesProvider'
import EmptyNFTIcon from '../TokenERC1155InforationForm/components/NFTCard/emptyNFTIcon.png'
import DialogTips from 'bounceComponents/common/DialogTips'
import TokenImage from 'bounceComponents/common/TokenImage'

import { ReactComponent as CloseSVG } from 'assets/imgs/components/close.svg'
// import { ReactComponent as ZeroIcon } from 'assets/imgs/auction/zero-icon.svg'
import { useQueryParams } from 'hooks/useQueryParams'
import { useActiveWeb3React } from 'hooks'
import { ChainListMap } from 'constants/chain'
import { shortenAddress } from 'utils'
import { formatNumber } from 'utils/number'
import { useCreateFixedSwap1155Pool } from 'hooks/useCreateFixedSwap1155Pool'
import {
  hideDialogConfirmation,
  showRequestApprovalDialog,
  showRequestConfirmDialog,
  showWaitingTxDialog
} from 'utils/auction'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
import useChainConfigInBackend from 'bounceHooks/web3/useChainConfigInBackend'
import { useNFTApproveAllCallback } from 'hooks/useNFTApproveAllCallback'
import { FIXED_SWAP_NFT_CONTRACT_ADDRESSES } from '../../../constants'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { useERC1155Balance } from 'hooks/useNFTTokenBalance'
import JSBI from 'jsbi'
import { ApprovalState } from 'hooks/useApproveCallback'
import { useShowLoginModal } from 'state/users/hooks'
import getAuctionPoolLink from 'utils/auction/getAuctionPoolRouteLink'
import { PoolType } from 'api/pool/type'
import AuctionNotification from '../AuctionNotification'
export const ConfirmationSubtitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.grey[900],
  opacity: 0.5
}))

export const ConfirmationInfoItem = ({ children, title }: { children: ReactNode; title?: ReactNode }): JSX.Element => (
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
  const values = useValuesState()
  const createFixedSwap1155Pool = useCreateFixedSwap1155Pool()
  const auctionInChainId = useAuctionInChain()
  const showLoginModal = useShowLoginModal()

  const switchNetwork = useSwitchNetwork()
  const auctionAccountBalance = useERC1155Balance(
    values.nftTokenFrom.contractAddr,
    account || undefined,
    values.nftTokenFrom.tokenId,
    auctionInChainId
  )

  const [buttonCommitted, setButtonCommitted] = useState<TypeButtonCommitted>()
  const chainConfigInBackend = useChainConfigInBackend('ethChainId', auctionInChainId)
  const [approvalState, approveCallback] = useNFTApproveAllCallback(
    values.nftTokenFrom.contractAddr,
    chainId === auctionInChainId ? FIXED_SWAP_NFT_CONTRACT_ADDRESSES[auctionInChainId] : undefined
  )

  const toCreate = useCallback(async () => {
    showRequestConfirmDialog()
    try {
      setButtonCommitted('wait')
      const { getPoolId, transactionReceipt, sysId } = await createFixedSwap1155Pool()
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
          const goToPoolInfoPage = () => {
            const route = getAuctionPoolLink(sysId, PoolType.fixedSwapNft, chainConfigInBackend?.id as number, poolId)
            navigate(route)
          }

          hideDialogConfirmation()
          show(DialogTips, {
            iconType: 'success',
            againBtn: 'To the pool',
            cancelBtn: 'Not now',
            title: 'Congratulations!',
            content: 'You have successfully created the auction.',
            onAgain: goToPoolInfoPage,
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
        content: err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
        onAgain: toCreate
      })
    }
  }, [chainConfigInBackend?.id, createFixedSwap1155Pool, navigate, redirect])

  const toApprove = useCallback(async () => {
    showRequestApprovalDialog()
    try {
      const { transactionReceipt } = await approveCallback()
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
        content:
          typeof err === 'string'
            ? err
            : err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
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
    if (
      !auctionAccountBalance ||
      !values.poolSize ||
      JSBI.lessThan(JSBI.BigInt(auctionAccountBalance), JSBI.BigInt(values.poolSize))
    ) {
      return {
        text: 'Insufficient Balance',
        disabled: true
      }
    }
    if (approvalState !== ApprovalState.APPROVED) {
      if (approvalState === ApprovalState.PENDING) {
        return {
          text: `Approving use of ${values.nftTokenFrom.contractName || 'NFT'} ...`,
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
          text: `Approve use of ${values.nftTokenFrom.contractName || 'NFT'}`,
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
    buttonCommitted,
    chainId,
    switchNetwork,
    toApprove,
    toCreate,
    values.nftTokenFrom.contractName,
    values.poolSize,
    showLoginModal
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
  const { account } = useActiveWeb3React()

  const auctionChainId = useAuctionInChain()
  const showLoginModal = useShowLoginModal()

  const values = useValuesState()
  const valuesDispatch = useValuesDispatch()
  const { auctionType } = useQueryParams()

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
            {values.poolName} Fixed-swap Pool
          </Typography>

          <Stack spacing={24}>
            <ConfirmationInfoItem title="Chain">
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Image
                  src={ChainListMap[auctionChainId]?.logo || ''}
                  alt={ChainListMap[auctionChainId]?.name || ''}
                  width={20}
                  height={20}
                />
                <Typography sx={{ ml: 4 }}>{ChainListMap[auctionChainId]?.name || ''}</Typography>
              </Box>
            </ConfirmationInfoItem>

            <Box>
              <Typography variant="h3" sx={{ fontSize: 14, mb: 12 }}>
                Token Information
              </Typography>

              <Stack spacing={15}>
                <ConfirmationInfoItem title="Token Contract address">
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Image
                      src={ChainListMap[auctionChainId]?.logo || ''}
                      alt={ChainListMap[auctionChainId]?.name || ''}
                      width={20}
                      height={20}
                    />
                    <Typography ml={4}>{shortenAddress(values.nftTokenFrom?.contractAddr || '')}</Typography>
                  </Box>
                </ConfirmationInfoItem>
                <ConfirmationInfoItem title="Token Type">
                  <Typography>ERC1155</Typography>
                </ConfirmationInfoItem>
                <ConfirmationInfoItem title="Token symbol">
                  <Stack direction="row" spacing={8} alignItems="center">
                    <TokenImage
                      alt={values.nftTokenFrom.contractName}
                      src={values.nftTokenFrom.image || EmptyNFTIcon}
                      size={20}
                    />
                    <Typography>{values.nftTokenFrom.contractName || '--'}</Typography>
                  </Stack>
                </ConfirmationInfoItem>
                {/* <ConfirmationInfoItem title="Token decimal">
                  <Typography>{values.tokenFrom.decimals}</Typography>
                </ConfirmationInfoItem> */}
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
                    1 {values.nftTokenFrom.contractName} ={' '}
                    {formatNumber(values.swapRatio, { unit: 0, decimalPlaces: 10 })} {values.tokenTo.symbol}
                  </Typography>
                </ConfirmationInfoItem>

                <ConfirmationInfoItem title="Amount">
                  <Typography>{values.poolSize}</Typography>
                </ConfirmationInfoItem>

                <ConfirmationInfoItem title="Allocation per Wallet">
                  <Typography>
                    {values.allocationStatus === AllocationStatus.NoLimits
                      ? 'No'
                      : `Limit ${Number(values.allocationPerWallet).toLocaleString()} NFT`}
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
        <AuctionNotification />
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 32, width: '100%' }}>
          {account ? (
            <CreatePoolButton />
          ) : (
            <LoadingButton fullWidth variant="contained" onClick={showLoginModal}>
              Connect Wallet
            </LoadingButton>
          )}

          {/* <ConfirmationSubtitle sx={{ mt: 12, opacity: 1, color: '#908E96' }}>
            Transaction Fee is{' '}
            <span
              style={{
                textDecoration: 'line-through'
              }}
            >
              2.5%
            </span>
            <ZeroIcon
              style={{
                marginLeft: '6px',
                verticalAlign: 'middle'
              }}
            />
          </ConfirmationSubtitle> */}
          <ConfirmationSubtitle sx={{ mt: 12 }}>Transaction Fee is 2.5%</ConfirmationSubtitle>
        </Box>
      </Box>
    </Box>
  )
}

export default CreationConfirmation
