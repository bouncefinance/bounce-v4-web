import { Box, styled, Typography } from '@mui/material'
import { useMemo, useCallback } from 'react'
import { CurrencyAmount } from 'constants/token'
import ConnectWalletButton from 'bounceComponents/fixed-swap/ActionBox/CreatorActionBox/ConnectWalletButton'
import SwitchNetworkButton from 'bounceComponents/fixed-swap/SwitchNetworkButton'
import { show } from '@ebay/nice-modal-react'
import DialogTips from 'bounceComponents/common/DialogTips'
import { useActiveWeb3React } from 'hooks'
import { hideDialogConfirmation, showRequestConfirmDialog, showWaitingTxDialog } from 'utils/auction'
import { LoadingButton } from '@mui/lab'
import { DutchAuctionPoolProp } from 'api/pool/type'
import { useCountDown } from 'ahooks'
import { PoolStatus } from 'api/pool/type'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { BigNumber } from 'bignumber.js'
import usePlaceBidDutch from 'bounceHooks/auction/usePlaceBidDutch'
import { AmountAndCurrentPriceParam } from 'bounceHooks/auction/useDutchAuctionInfo'

const ComBtn = styled(LoadingButton)(() => ({
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
  currentPriceAndAmount1
}: {
  poolInfo: DutchAuctionPoolProp
  amount?: string
  currentPriceAndAmount1: AmountAndCurrentPriceParam
}) => {
  const { account, chainId } = useActiveWeb3React()
  const { run: bid, submitted } = usePlaceBidDutch(poolInfo)
  const userToken1Balance = useCurrencyBalance(account || undefined, poolInfo.currencyAmountTotal1?.currency)
  // max amount of token0 by token1 banlance
  const userToken0limit = useMemo(() => {
    const highestPrice = poolInfo.highestPrice?.toExact() || 0
    const currencyCurrentPrice = poolInfo.currencyCurrentPrice?.toExact() || 0
    return BigNumber(userToken1Balance?.toExact() || 0)
      .div(poolInfo.status === PoolStatus.Upcoming ? highestPrice : currencyCurrentPrice)
      .toString()
  }, [userToken1Balance, poolInfo.currencyCurrentPrice, poolInfo.status, poolInfo.highestPrice])
  const maxValue = useMemo(() => {
    // MaxAmount0PerWallet from contract, not from http
    const currencyMaxAmount0PerWallet =
      Number(poolInfo.currencyMaxAmount0PerWallet?.toExact()) > 0
        ? poolInfo.currencyMaxAmount0PerWallet?.toExact()
        : poolInfo.currencyAmountTotal0?.toExact()
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
  }, [
    poolInfo.currencyAmountTotal0,
    poolInfo.currencyMaxAmount0PerWallet,
    poolInfo?.currencySwappedAmount0,
    userToken0limit
  ])
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
  const amount0CurrencyAmount = poolInfo?.currencyAmountTotal0
    ? CurrencyAmount.fromAmount(poolInfo?.currencyAmountTotal0?.currency, amount || '0')
    : 0
  const amount1CurrencyAmount = poolInfo?.currencyAmountTotal1
    ? CurrencyAmount.fromAmount(
        poolInfo?.currencyAmountTotal1?.currency,
        BigNumber(currentPriceAndAmount1.amount1).toString()
      )
    : 0
  const toBid = useCallback(async () => {
    if (!amount1CurrencyAmount || !amount0CurrencyAmount) return
    showRequestConfirmDialog()
    try {
      const { transactionReceipt } = await bid(amount0CurrencyAmount, amount1CurrencyAmount)
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
          show(DialogTips, {
            iconType: 'success',
            againBtn: 'Close',
            title: 'Congratulations!',
            content: `You have successfully bid ${amount1CurrencyAmount.toSignificant()} ${poolInfo.token1.symbol}`
          })
        })
        .catch()
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
    }
  }, [amount1CurrencyAmount, amount0CurrencyAmount, bid, poolInfo.token1.symbol])
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
          Claim Token
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
  if (poolInfo.status === PoolStatus.Closed && !poolInfo.creatorClaimed) {
    return (
      <ComBtn
        fullWidth
        loadingPosition="start"
        loading={submitted.complete || submitted.submitted}
        onClick={() => toBid()}
      >
        <span>{'Place a Bid'}</span>
      </ComBtn>
    )
  }
  if (poolInfo.status === PoolStatus.Live) {
    return (
      <ComBtn
        fullWidth
        loading={submitted.complete || submitted.submitted}
        disabled={!amount || Number(amount) === 0 || Number(amount) > maxValue}
        onClick={() => toBid()}
      >
        <span>{Number(amount) > maxValue ? 'Insufficient Balance' : 'Place a Bid'}</span>
      </ComBtn>
    )
  }
  return null
}
export default BidBlock
