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
import { DutchAuctionPoolProp } from 'api/pool/type'
import { useCountDown } from 'ahooks'
import { PoolStatus } from 'api/pool/type'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { BigNumber } from 'bignumber.js'
import { AmountAndCurrentPriceParam } from 'bounceHooks/auction/useDutchAuctionInfo'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { ActionStep } from './right'
import { Dots } from 'themes'

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

const BidBlock = ({
  poolInfo,
  amount,
  currentPriceAndAmount1,
  handleSetActionStep
}: {
  poolInfo: DutchAuctionPoolProp
  amount?: string
  currentPriceAndAmount1: AmountAndCurrentPriceParam
  handleSetActionStep?: (actionStep: ActionStep) => void
}) => {
  const { account, chainId } = useActiveWeb3React()
  const userToken1Balance = useCurrencyBalance(account || undefined, poolInfo.currencyAmountTotal1?.currency)
  // max amount of token0 by token1 banlance
  const userToken0limit = useMemo(() => {
    const highestPrice = poolInfo.highestPrice?.toExact() || 0
    const currencyCurrentPrice = poolInfo.currencyCurrentPrice?.toExact() || 0
    return BigNumber(userToken1Balance?.toExact() || 0)
      .div(poolInfo.status === PoolStatus.Upcoming ? highestPrice : currencyCurrentPrice)
      .toString()
  }, [userToken1Balance, poolInfo.currencyCurrentPrice, poolInfo.status, poolInfo.highestPrice])
  // MaxAmount0PerWallet from contract, not from http
  const currencyMaxAmount0PerWallet = useMemo(() => {
    return poolInfo.currencyMaxAmount0PerWallet && Number(poolInfo.currencyMaxAmount0PerWallet?.toExact()) > 0
      ? BigNumber(poolInfo.currencyMaxAmount0PerWallet?.toExact() || '0')
          .minus(poolInfo.participant.currencySwappedAmount0?.toExact() || '0')
          .toString()
      : poolInfo.currencyAmountTotal0?.toExact()
  }, [poolInfo.currencyMaxAmount0PerWallet, poolInfo.currencyAmountTotal0, poolInfo.participant.currencySwappedAmount0])
  const maxValue = useMemo(() => {
    // All tradable quantities for token0
    const swappedAmount0 =
      poolInfo?.currencySwappedAmount0 &&
      poolInfo?.currencyAmountTotal0 &&
      poolInfo?.currencyAmountTotal0?.subtract(poolInfo?.currencySwappedAmount0)
    const result = Math.min(
      Number(swappedAmount0?.toExact()),
      Number(userToken0limit),
      Number(currencyMaxAmount0PerWallet)
    )
    return result
  }, [currencyMaxAmount0PerWallet, poolInfo.currencyAmountTotal0, poolInfo?.currencySwappedAmount0, userToken0limit])
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
  const amount1CurrencyAmount = poolInfo?.currencyAmountTotal1
    ? CurrencyAmount.fromAmount(
        poolInfo?.currencyAmountTotal1?.currency,
        BigNumber(currentPriceAndAmount1.amount1).toString()
      )
    : 0
  const [approvalState, approveCallback] = useApproveCallback(
    amount1CurrencyAmount || undefined,
    poolInfo.contract,
    true
  )
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
          //   onClick()
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
      <Box
        sx={{
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
        }}
      >
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
      </Box>
    )
  }
  if (poolInfo.status === PoolStatus.Live) {
    if (!amount || Number(amount) === 0) {
      return (
        <ComBtn fullWidth disabled={true}>
          <span>{'Place a Bid'}</span>
        </ComBtn>
      )
    } else if (approvalState !== ApprovalState.APPROVED) {
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
      return (
        <ComBtn
          fullWidth
          disabled={!amount || Number(amount) === 0 || Number(amount) > maxValue}
          onClick={() => goToBid()}
        >
          <span>
            {Number(amount) > maxValue
              ? 'Insufficient Balance'
              : Number(currencyMaxAmount0PerWallet) === 0
              ? 'Limit exceeded'
              : 'Place a Bid'}
          </span>
        </ComBtn>
      )
    }
  }
  return null
}
export default BidBlock
