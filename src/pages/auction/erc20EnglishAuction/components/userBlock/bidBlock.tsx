import { Box, styled, Typography } from '@mui/material'
import { useMemo, useCallback } from 'react'
import { CurrencyAmount } from 'constants/token'
import ConnectWalletButton from 'bounceComponents/fixed-swap/ActionBox/CreatorActionBox/ConnectWalletButton'
import SwitchNetworkButton from 'bounceComponents/fixed-swap/SwitchNetworkButton'
import { show } from '@ebay/nice-modal-react'
import DialogTips from 'bounceComponents/common/DialogTips'
import { useActiveWeb3React } from 'hooks'
import { hideDialogConfirmation, showRequestApprovalDialog, showWaitingTxDialog } from 'utils/auction'
import { LoadingButton } from '@mui/lab'
import { Erc20EnglishAuctionPoolProp, PoolType } from 'api/pool/type'
import { useCountDown } from 'ahooks'
import { PoolStatus } from 'api/pool/type'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { Dots } from 'themes'
import useIsUserInWhitelist from 'bounceHooks/auction/useIsUserInWhitelist'
import { ActionStep } from 'pages/auction/dutchAuction/components/userBlock/right'
import { useMaxSwapAmount1Limit } from 'bounceHooks/auction/useErc20EnglishAuctionCallback'

export const ComBtn = styled(LoadingButton)(() => ({
  '&.MuiButtonBase-root': {
    background: 'transparent',
    border: '1px solid #FFFFFF',
    color: '#FFFFFF'
  },
  '&.MuiButtonBase-root:hover': {
    background: '#E1F25C',
    border: '1px solid #E1F25C',
    color: '#121212'
  }
}))
export const DisableBtn = styled(Box)(() => ({
  width: '100%',
  background: '#D7D6D9',
  height: '52px',
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '0 24px',
  borderRadius: '8px',
  cursor: 'pointer'
}))
const BidBlock = ({
  poolInfo,
  amount,
  handleSetActionStep
}: {
  poolInfo: Erc20EnglishAuctionPoolProp
  amount?: string
  handleSetActionStep?: (actionStep: ActionStep) => void
}) => {
  const { account, chainId } = useActiveWeb3React()
  const { data: isUserInWhitelist, loading: isCheckingWhitelist } = useIsUserInWhitelist(
    poolInfo,
    PoolType.ENGLISH_AUCTION
  )
  const userToken1Balance = useCurrencyBalance(account || undefined, poolInfo.currencyAmountStartPrice?.currency)
  const maxValue = useMaxSwapAmount1Limit(poolInfo)
  const isCurrentChainEqualChainOfPool = useMemo(() => chainId === poolInfo.ethChainId, [chainId, poolInfo.ethChainId])
  const { status, openAt, closeAt, claimAt } = poolInfo
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate:
      status === PoolStatus.Upcoming
        ? openAt * 1000
        : status === PoolStatus.Live
        ? closeAt * 1000
        : status === PoolStatus.Closed
        ? claimAt * 1000
        : undefined
  })
  const amount1CurrencyAmount =
    poolInfo?.currencyAmountEndPrice &&
    CurrencyAmount.fromAmount(poolInfo?.currencyAmountEndPrice?.currency, amount || '')

  const [approvalState, approveCallback] = useApproveCallback(
    amount1CurrencyAmount || undefined,
    poolInfo.contract,
    true
  )

  console.log('poolInfo', poolInfo.currencyAmountTotal0.toExact(), poolInfo.currencySwappedAmount0?.toExact())

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
  }, [approveCallback])
  const goToBid = () => {
    handleSetActionStep && handleSetActionStep(ActionStep.BidConfirm)
  }
  if (!account) {
    return <ConnectWalletButton />
  }
  if (!isCurrentChainEqualChainOfPool) {
    return <SwitchNetworkButton targetChain={poolInfo.ethChainId} />
  }
  if (poolInfo.status === PoolStatus.Upcoming) {
    return (
      <DisableBtn>
        <Typography
          sx={{
            fontFamily: `'Inter'`,
            color: '#fff',
            fontSize: '16px'
          }}
        >
          Place a Bid
        </Typography>
        <Typography
          sx={{
            fontFamily: `'Inter'`,
            color: '#fff',
            fontSize: '16px'
          }}
        >
          {countdown > 0 ? `${days}d : ${hours}h : ${minutes}m : ${seconds}s` : 'Upcoming'}
        </Typography>
      </DisableBtn>
    )
  }
  if (poolInfo.status === PoolStatus.Live) {
    if (
      !amount ||
      Number(amount) === 0 ||
      isCheckingWhitelist ||
      (isUserInWhitelist !== undefined && !isUserInWhitelist)
    ) {
      return (
        <ComBtn fullWidth disabled={true}>
          <span>Input Amount</span>
        </ComBtn>
      )
    } else if (approvalState !== ApprovalState.APPROVED) {
      if (!userToken1Balance || amount1CurrencyAmount?.greaterThan(userToken1Balance)) {
        return (
          <ComBtn fullWidth disabled={true}>
            <span>Insufficient Balance</span>
          </ComBtn>
        )
      }
      if (Number(amount) > Number(maxValue?.toExact())) {
        return (
          <ComBtn fullWidth disabled={true}>
            <span>Limit exceeded</span>
          </ComBtn>
        )
      }
      if (
        poolInfo?.currencySwappedAmount0 &&
        poolInfo?.currencyAmountTotal0.equalTo(poolInfo?.currencySwappedAmount0)
      ) {
        return (
          <ComBtn fullWidth disabled={true}>
            <span>Sold Out</span>
          </ComBtn>
        )
      }
      if (approvalState === ApprovalState.PENDING) {
        return (
          <ComBtn loadingPosition="start" variant="contained" fullWidth loading>
            Approving {poolInfo.token1?.symbol}
          </ComBtn>
        )
      }
      if (approvalState === ApprovalState.UNKNOWN) {
        return (
          <ComBtn loadingPosition="start" variant="contained" fullWidth loading>
            Loading <Dots />
          </ComBtn>
        )
      }
      if (approvalState === ApprovalState.NOT_APPROVED) {
        return (
          <ComBtn variant="contained" onClick={toApprove} fullWidth>
            Approve use of {poolInfo.token1?.symbol}
          </ComBtn>
        )
      }
    } else {
      if (!userToken1Balance || amount1CurrencyAmount?.greaterThan(userToken1Balance)) {
        return (
          <ComBtn fullWidth disabled={true}>
            <span>Insufficient Balance</span>
          </ComBtn>
        )
      }
      if (Number(amount) > Number(maxValue?.toExact())) {
        return (
          <ComBtn fullWidth disabled={true}>
            <span>Limit exceeded</span>
          </ComBtn>
        )
      }
      if (
        poolInfo?.currencySwappedAmount0 &&
        poolInfo?.currencyAmountTotal0.equalTo(poolInfo?.currencySwappedAmount0)
      ) {
        return (
          <ComBtn fullWidth disabled={true}>
            <span>Sold Out</span>
          </ComBtn>
        )
      }
      return (
        <ComBtn
          fullWidth
          disabled={
            !amount ||
            Number(amount) === 0 ||
            Number(amount) > Number(maxValue?.toExact()) ||
            (amount1CurrencyAmount && userToken1Balance?.lessThan(amount1CurrencyAmount))
          }
          onClick={goToBid}
        >
          <span>Place a Bid</span>
        </ComBtn>
      )
    }
  }
  return null
}
export default BidBlock
