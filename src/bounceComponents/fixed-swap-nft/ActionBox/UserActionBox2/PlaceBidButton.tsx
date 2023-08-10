import { SxProps } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { FixedSwapPoolParams } from 'bounceComponents/fixed-swap-nft/MainBlock/UserMainBlock'
import useIsUserInWhitelist from 'bounceHooks/auction/useIsUserInWhitelist'
import { PoolType } from 'api/pool/type'
import { Dots } from 'themes'
import { CurrencyAmount } from 'constants/token'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { useCallback, useMemo } from 'react'
import { hideDialogConfirmation, showRequestApprovalDialog, showWaitingTxDialog } from 'utils/auction'
import DialogTips from 'bounceComponents/common/DialogTips'
import { show } from '@ebay/nice-modal-react'
import { BigNumber } from 'bignumber.js'
import { useFixedSwapNftContract } from 'hooks/useContract'

export interface PlaceBidButtonProps {
  bidAmount: string
  sx?: SxProps
  onClick: () => void
  loading?: boolean
}

const PlaceBidButton = ({
  bidAmount,
  sx,
  onClick,
  poolInfo,
  loading
}: PlaceBidButtonProps & FixedSwapPoolParams): JSX.Element => {
  const { data: isUserInWhitelist, loading: isCheckingWhitelist } = useIsUserInWhitelist(
    poolInfo,
    PoolType.fixedSwapNft
  )

  const currencyBid1Amount = useMemo(
    () =>
      CurrencyAmount.fromAmount(
        poolInfo.currencyAmountTotal1.currency,
        new BigNumber(bidAmount).times(poolInfo.ratio).toString()
      ),
    [bidAmount, poolInfo.currencyAmountTotal1.currency, poolInfo.ratio]
  )
  const fixedSwapNftContract = useFixedSwapNftContract(poolInfo.contract)

  const [approvalState, approveCallback] = useApproveCallback(currencyBid1Amount, fixedSwapNftContract?.address, true)

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
        content: err?.reason || err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
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
      disabled={!bidAmount || Number(bidAmount) === 0 || (!isUserInWhitelist && !isCheckingWhitelist)}
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
