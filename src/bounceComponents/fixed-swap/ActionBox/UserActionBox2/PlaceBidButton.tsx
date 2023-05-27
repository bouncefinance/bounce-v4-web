import { SxProps } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { FixedSwapPoolProp } from 'api/pool/type'
import { Dots } from 'themes'
import { CurrencyAmount } from 'constants/token'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { useFixedSwapERC20Contract } from 'hooks/useContract'
import { useCallback } from 'react'
import { hideDialogConfirmation, showRequestApprovalDialog, showWaitingTxDialog } from 'utils/auction'
import { show } from '@ebay/nice-modal-react'
import DialogTips from 'bounceComponents/common/DialogTips'

export interface PlaceBidButtonProps {
  bidAmount: string
  sx?: SxProps
  onClick: () => void
  loading?: boolean
  poolInfo: FixedSwapPoolProp
}

const PlaceBidButton = ({ bidAmount, sx, onClick, loading, poolInfo }: PlaceBidButtonProps): JSX.Element => {
  const fixedSwapERC20Contract = useFixedSwapERC20Contract(poolInfo.currentBounceContractAddress)

  // console.log('>>>>>> isUserInWhitelist: ', isUserInWhitelist)
  const currencyBidAmount = CurrencyAmount.fromAmount(poolInfo.currencyAmountTotal1.currency, bidAmount)
  const [approvalState, approveCallback] = useApproveCallback(currencyBidAmount, fixedSwapERC20Contract?.address, true)

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
          onClick()
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
        content: err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
        onAgain: toApprove
      })
    }
  }, [approveCallback, onClick])

  if (approvalState !== ApprovalState.APPROVED) {
    if (approvalState === ApprovalState.PENDING) {
      return (
        <LoadingButton loadingPosition="start" variant="contained" fullWidth loading sx={{ ...sx }}>
          Approving {poolInfo.token1?.symbol}
        </LoadingButton>
      )
    }
    if (approvalState === ApprovalState.UNKNOWN) {
      return (
        <LoadingButton loadingPosition="start" variant="contained" fullWidth loading sx={{ ...sx }}>
          Loading <Dots />
        </LoadingButton>
      )
    }
    if (approvalState === ApprovalState.NOT_APPROVED) {
      return (
        <LoadingButton variant="contained" onClick={toApprove} fullWidth sx={{ ...sx }}>
          Approve use of {poolInfo.token1?.symbol}
        </LoadingButton>
      )
    }
  }

  return (
    <LoadingButton
      variant="contained"
      fullWidth
      sx={{ ...sx }}
      loadingPosition="start"
      loading={loading}
      disabled={!bidAmount || !poolInfo.whitelistData.isUserInWhitelist || poolInfo.whitelistData.loading}
      onClick={onClick}
    >
      {loading ? (
        <>
          Place a Bid
          <Dots />
        </>
      ) : (
        'Place a Bid'
      )}
    </LoadingButton>
  )
}

export default PlaceBidButton
