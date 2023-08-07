import { styled } from '@mui/material'
import { useMemo, useCallback } from 'react'
import { useCreatorClaim } from 'bounceHooks/auction/useCreatorClaimDutchAuction'
import ConnectWalletButton from 'bounceComponents/fixed-swap/ActionBox/CreatorActionBox/ConnectWalletButton'
import SwitchNetworkButton from 'bounceComponents/fixed-swap/SwitchNetworkButton'
import { show } from '@ebay/nice-modal-react'
import DialogTips from 'bounceComponents/common/DialogTips'
import { useActiveWeb3React } from 'hooks'
import { hideDialogConfirmation, showRequestConfirmDialog, showWaitingTxDialog } from 'utils/auction'
import { BigNumber } from 'bignumber.js'
import { LoadingButton } from '@mui/lab'
import { DutchAuctionPoolProp } from 'api/pool/type'
import { PoolStatus } from 'api/pool/type'

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
const ClaimBlock = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
  const { account, chainId } = useActiveWeb3React()
  const isCurrentChainEqualChainOfPool = useMemo(() => chainId === poolInfo.ethChainId, [chainId, poolInfo.ethChainId])
  const isAllTokenSwapped = useMemo(() => {
    return new BigNumber(poolInfo.swappedAmount0).isGreaterThanOrEqualTo(poolInfo.amountTotal0)
  }, [poolInfo])

  const { run: claim, submitted } = useCreatorClaim(poolInfo.poolId, poolInfo.name, poolInfo.contract)
  const successDialogContent = useMemo(() => {
    const hasToken0ToClaim = poolInfo?.currencyAmountTotal0?.greaterThan('0')
    const allUnSwappedAmount0 = poolInfo.currencySwappedAmount0
      ? poolInfo.currencyAmountTotal0?.subtract(poolInfo.currencySwappedAmount0).toExact()
      : poolInfo.currencyAmountTotal0?.toExact()
    const allToken0Value = BigNumber(poolInfo.currencySwappedAmount0?.toExact() || '0')
      .times(poolInfo.currencyLowestBidPrice?.toExact() || '0')
      .toString()
    const token0ToClaimText = `${allUnSwappedAmount0} ${poolInfo?.token0.symbol}`
    const token1ToClaimText =
      hasToken0ToClaim && poolInfo?.currencyAmountTotal1?.toSignificant() && poolInfo.token1.symbol
        ? ` and ${allToken0Value} ${poolInfo.token1.symbol}`
        : ''
    return `You have successfully claimed ${token0ToClaimText}${token1ToClaimText}(Platform fee charged 2.5%)`
  }, [
    poolInfo?.currencyAmountTotal0,
    poolInfo?.currencyAmountTotal1,
    poolInfo.currencyLowestBidPrice,
    poolInfo.currencySwappedAmount0,
    poolInfo?.token0.symbol,
    poolInfo.token1.symbol
  ])
  const toClaim = useCallback(
    async (isCancel: boolean) => {
      showRequestConfirmDialog()
      try {
        const { transactionReceipt } = await claim()

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
              content: isCancel
                ? 'You have successfully cancelled the pool and claimed your tokens'
                : successDialogContent
            })
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
          onAgain: () => toClaim(isCancel)
        })
      }
    },
    [claim, successDialogContent]
  )
  //   const btnStr = useMemo(() => {
  //     if (poolInfo.status === PoolStatus.Upcoming || poolInfo.status === PoolStatus.Live) {
  //       return 'Cancel & Claim tokens'
  //     } else if (poolInfo.status === PoolStatus.Closed || poolInfo.status === PoolStatus.Cancelled) {
  //       return Number(poolInfo.currentTotal0) !== 0 ? 'Claim your unswapped tokens and fund raised' : 'Claim fund raised'
  //     } else {
  //       return 'Cancel & Claim tokens'
  //     }
  //   }, [poolInfo.currentTotal0, poolInfo.status])
  if (!account) {
    return <ConnectWalletButton />
  }
  if (!isCurrentChainEqualChainOfPool) {
    return <SwitchNetworkButton targetChain={poolInfo.ethChainId} />
  }
  if (poolInfo.status === PoolStatus.Upcoming) {
    return (
      <ComBtn
        variant="outlined"
        fullWidth
        loadingPosition="start"
        sx={{ mt: 24, mb: 12 }}
        loading={submitted.complete || submitted.submitted}
        onClick={() => toClaim(true)}
      >
        Cancel & Claim tokens
      </ComBtn>
    )
  }
  if (poolInfo.status === PoolStatus.Closed && !poolInfo.creatorClaimed) {
    return (
      <ComBtn
        fullWidth
        loadingPosition="start"
        loading={submitted.complete || submitted.submitted}
        onClick={() => toClaim(false)}
      >
        <span>{!isAllTokenSwapped ? 'Claim your unswapped tokens and fund raised' : 'Claim fund raised'}</span>
      </ComBtn>
    )
  }
  return null
}
export default ClaimBlock
