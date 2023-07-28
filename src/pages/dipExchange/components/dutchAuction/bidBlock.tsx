import { Box, styled, Typography } from '@mui/material'
import { useMemo, useCallback, useState } from 'react'
import { CurrencyAmount } from 'constants/token'
import ConnectWalletButton from 'bounceComponents/fixed-swap/ActionBox/CreatorActionBox/ConnectWalletButton'
import SwitchNetworkButton from 'bounceComponents/fixed-swap/SwitchNetworkButton'
import { show } from '@ebay/nice-modal-react'
import DialogTips from 'bounceComponents/common/DialogTips'
import { useActiveWeb3React } from 'hooks'
import { DutchAuctionPoolProp, PoolType } from 'api/pool/type'
import { useCountDown } from 'ahooks'
import { PoolStatus } from 'api/pool/type'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { BigNumber } from 'bignumber.js'
import { AmountAndCurrentPriceParam } from 'bounceHooks/auction/useDutchAuctionInfo'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { Dots } from 'themes'
import useIsUserInWhitelist from 'bounceHooks/auction/useIsUserInWhitelist'
import { ComBtn } from './claimBlock'
import usePlaceBidDutch from 'bounceHooks/auction/usePlaceBidDutch'

import {
  hideDialogConfirmation,
  showRequestApprovalDialog,
  showRequestConfirmDialog,
  showWaitingTxDialog
} from 'utils/auction'

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
  currentPriceAndAmount1,
  maxValue,
  onConfirm
}: {
  poolInfo: DutchAuctionPoolProp
  amount?: string
  currentPriceAndAmount1: AmountAndCurrentPriceParam
  maxValue: number | string
  onConfirm?: () => void
}) => {
  const { account, chainId } = useActiveWeb3React()
  const { data: isUserInWhitelist, loading: isCheckingWhitelist } = useIsUserInWhitelist(
    poolInfo,
    PoolType.DUTCH_AUCTION
  )
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
  const amount0CurrencyAmount = poolInfo?.currencyAmountTotal0
    ? CurrencyAmount.fromAmount(poolInfo?.currencyAmountTotal0?.currency, amount || '0')
    : 0
  const [confirmLoading, setConfirmLoading] = useState<boolean>(false)
  const { swapCallback: bid, swapPermitCallback } = usePlaceBidDutch(poolInfo)

  const toBid = useCallback(async () => {
    if (!amount1CurrencyAmount || !amount0CurrencyAmount) return
    showRequestConfirmDialog()
    setConfirmLoading(true)
    try {
      const func = poolInfo.enableWhiteList && poolInfo.whitelistData?.isPermit ? swapPermitCallback : bid
      const { transactionReceipt } = await func(amount0CurrencyAmount, amount1CurrencyAmount)
      const ret = new Promise((resolve, rpt) => {
        showWaitingTxDialog(() => {
          hideDialogConfirmation()
          rpt()
        })
        transactionReceipt.then((curReceipt: unknown) => {
          resolve(curReceipt)
        })
      })
      ret
        .then(() => {
          hideDialogConfirmation()
          show(DialogTips, {
            iconType: 'success',
            againBtn: 'Close',
            title: 'Congratulations!',
            content: `You have successfully bid ${amount1CurrencyAmount.toSignificant()} ${poolInfo.token1.symbol}`
          })
          setConfirmLoading(false)
          onConfirm && onConfirm()
        })
        .catch(() => {
          setConfirmLoading(false)
          onConfirm && onConfirm()
        })
    } catch (error) {
      const err: any = error
      hideDialogConfirmation()
      show(DialogTips, {
        iconType: 'error',
        againBtn: 'Try Again',
        cancelBtn: 'Cancel',
        title: 'Oops..',
        content: err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
        onAgain: toBid
      })
      setConfirmLoading(false)
      onConfirm && onConfirm()
    }
  }, [
    amount1CurrencyAmount,
    amount0CurrencyAmount,
    poolInfo.enableWhiteList,
    poolInfo.whitelistData?.isPermit,
    poolInfo.token1.symbol,
    swapPermitCallback,
    bid,
    onConfirm
  ])
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
          <span>{'Bid'}</span>
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
          loading={confirmLoading}
          disabled={!amount || Number(amount) === 0 || Number(amount) > Number(maxValue)}
          onClick={() => toBid()}
        >
          <span>
            {Number(amount) > Number(userToken0limit) // banlance
              ? 'Insufficient Balance'
              : Number(amount) > Number(currencyMaxAmount0PerWallet) // bidable
              ? 'Limit exceeded'
              : 'Bid'}
          </span>
        </ComBtn>
      )
    }
  }
  return null
}
export default BidBlock
