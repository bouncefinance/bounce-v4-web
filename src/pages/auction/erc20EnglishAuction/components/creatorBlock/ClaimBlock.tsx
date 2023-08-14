import { styled } from '@mui/material'
import { useMemo, useCallback } from 'react'
import ConnectWalletButton from 'bounceComponents/fixed-swap/ActionBox/CreatorActionBox/ConnectWalletButton'
import SwitchNetworkButton from 'bounceComponents/fixed-swap/SwitchNetworkButton'
import { show } from '@ebay/nice-modal-react'
import DialogTips from 'bounceComponents/common/DialogTips'
import { useActiveWeb3React } from 'hooks'
import { hideDialogConfirmation, showRequestConfirmDialog, showWaitingTxDialog } from 'utils/auction'
import { BigNumber } from 'bignumber.js'
import { LoadingButton } from '@mui/lab'
import { PoolStatus } from 'api/pool/type'
import { useErc20EnglishAuctionPoolInfo } from '../../ValuesProvider'
import { useErc20EnglishCreatorClaim } from 'bounceHooks/auction/useErc20EnglishAuctionCallback'

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
const ClaimBlock = () => {
  const { data: poolInfo } = useErc20EnglishAuctionPoolInfo()
  const { account, chainId } = useActiveWeb3React()
  const isCurrentChainEqualChainOfPool = useMemo(
    () => chainId === poolInfo?.ethChainId,
    [chainId, poolInfo?.ethChainId]
  )
  const isAllTokenSwapped = useMemo(() => {
    return new BigNumber(poolInfo?.swappedAmount0 || '').isGreaterThanOrEqualTo(poolInfo?.amountTotal0 || '')
  }, [poolInfo])

  const { run: claim, submitted } = useErc20EnglishCreatorClaim(
    poolInfo?.poolId || '',
    poolInfo?.name || '',
    poolInfo?.contract
  )
  const successDialogContent = useMemo(() => {
    const fee =
      poolInfo?.currencySwappedAmount1 &&
      new BigNumber(poolInfo?.currencySwappedAmount1.toExact())
        .times(new BigNumber(25))
        .div(new BigNumber(1000))
        .toFixed()
    const hasToken0ToClaim = poolInfo?.currencySwappedAmount0?.greaterThan('0')
    const token0ToClaimText =
      poolInfo?.currencySwappedAmount0 &&
      poolInfo?.currencyAmountTotal0 &&
      `${poolInfo?.currencyAmountTotal0?.subtract(poolInfo?.currencySwappedAmount0).toExact()} ${
        poolInfo?.token0.symbol
      }`
    const token1ToClaimText =
      hasToken0ToClaim && poolInfo?.currencySwappedAmount1?.toSignificant() && poolInfo?.token1.symbol
        ? ` and ${poolInfo?.currencySwappedAmount1?.toSignificant()} ${poolInfo.token1.symbol}`
        : ''
    return `You have successfully claimed ${token0ToClaimText}${token1ToClaimText}, platform fee charged is ${fee} ${poolInfo?.token1.symbol}`
  }, [
    poolInfo?.currencyAmountTotal0,
    poolInfo?.currencySwappedAmount0,
    poolInfo?.currencySwappedAmount1,
    poolInfo?.token0.symbol,
    poolInfo?.token1.symbol
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
  if (!account) {
    return <ConnectWalletButton />
  }
  if (!isCurrentChainEqualChainOfPool) {
    return <SwitchNetworkButton targetChain={poolInfo?.ethChainId || 1} />
  }
  if (poolInfo?.status === PoolStatus.Upcoming) {
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
  if (poolInfo?.status === PoolStatus.Closed && !poolInfo?.creatorClaimed) {
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
