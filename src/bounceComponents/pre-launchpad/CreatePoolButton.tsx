import { useCallback, useMemo, useState } from 'react'

import { useActiveWeb3React } from 'hooks'

import { IPoolInfoParams } from 'pages/launchpad/create-launchpad/type'

import { useCurrencyBalance } from 'state/wallet/hooks'
import { Currency, CurrencyAmount } from 'constants/token'
import { useShowLoginModal } from 'state/users/hooks'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import {
  hideDialogConfirmation,
  showRequestApprovalDialog,
  showRequestConfirmDialog,
  showWaitingTxDialog
} from 'utils/auction'
import { show } from '@ebay/nice-modal-react'
import DialogTips from 'bounceComponents/common/DialogTips'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { LoadingButton } from '@mui/lab'
import { FIXED_SWAP_ERC20_ADDRESSES } from 'constants/index'
import { useCreateLaunchpadFixedSwapPool } from 'hooks/useCreateLaunchpadFixedSwapPool'

import DialogDarkTips from 'bounceComponents/common/DialogTips/DialogDarkTips'
type TypeButtonCommitted = 'wait' | 'inProgress' | 'success'
const CreatePoolButton = ({
  poolInfo,
  currencyFrom,
  currencyTo
}: {
  poolInfo: IPoolInfoParams & { opId?: number }
  currencyFrom: Currency | undefined
  currencyTo: Currency | undefined
}) => {
  const { account, chainId } = useActiveWeb3React()
  const showLoginModal = useShowLoginModal()
  const auctionInChainId = poolInfo.chainId
  const switchNetwork = useSwitchNetwork()
  const auctionAccountBalance = useCurrencyBalance(account || undefined, currencyFrom)

  const createFixedSwapPool = useCreateLaunchpadFixedSwapPool({
    currencyFrom: currencyFrom as Currency,
    currencyTo: currencyTo as Currency,
    poolInfo
  })
  const [buttonCommitted, setButtonCommitted] = useState<TypeButtonCommitted>()

  const auctionPoolSizeAmount = useMemo(
    () =>
      currencyFrom && poolInfo.totalAmount0
        ? CurrencyAmount.fromAmount(currencyFrom, poolInfo.totalAmount0)
        : undefined,
    [currencyFrom, poolInfo.totalAmount0]
  )
  const [approvalState, approveCallback] = useApproveCallback(
    auctionPoolSizeAmount,
    // erc20
    chainId === auctionInChainId ? FIXED_SWAP_ERC20_ADDRESSES[auctionInChainId] : undefined,
    true
  )

  const toCreate = useCallback(async () => {
    showRequestConfirmDialog()
    try {
      setButtonCommitted('wait')
      const { getPoolId, transactionReceipt } = await createFixedSwapPool()
      setButtonCommitted('inProgress')

      const ret: Promise<string> = new Promise((resolve, rpt) => {
        showWaitingTxDialog(() => {
          hideDialogConfirmation()
          rpt()
        })
        transactionReceipt.then((curReceipt: any) => {
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
        .then(() => {
          hideDialogConfirmation()
          show(DialogDarkTips, {
            iconType: 'success',
            cancelBtn: 'Confirm',
            title: 'Congratulations!',
            content: 'Operation successful, please wait patiently for 5 to 10 minutes.',
            // onAgain: goToPoolInfoPage
            onCancel: () => {},
            PaperProps: {
              sx: {
                '&.MuiPaper-root': {
                  '& .MuiButtonBase-root': {
                    backgroundColor: '#121212',
                    color: '#fff'
                  },
                  backgroundColor: '#fff',
                  '& svg path': {
                    stroke: '#171717'
                  },
                  '& .MuiDialogContent-root h2': {
                    color: '#121212'
                  }
                }
              }
            }
          })
        })
        .catch()
    } catch (error) {
      const err: any = error
      console.error(err)
      hideDialogConfirmation()
      setButtonCommitted(undefined)
      show(DialogDarkTips, {
        iconType: 'error',
        againBtn: 'Try Again',
        cancelBtn: 'Cancel',
        title: 'Oops..',
        content:
          typeof err === 'string'
            ? err
            : err?.data?.message || err?.error?.message || err?.message || 'Something went wrong',
        onAgain: toCreate,
        PaperProps: {
          sx: {
            '&.MuiPaper-root': {
              '& .MuiButtonBase-root': {
                backgroundColor: '#121212',
                color: '#fff'
              },
              backgroundColor: '#fff',
              '& svg path': {
                stroke: '#171717'
              },
              '& .MuiDialogContent-root h2': {
                color: '#121212'
              }
            }
          }
        }
      })
    }
  }, [createFixedSwapPool])

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
export default CreatePoolButton
