import { PoolStatus } from 'api/pool/type'
import { useCreatorClaimEnglishAuctionNFT } from 'bounceHooks/auction/useCreatorClaimNFT'
import { useActiveWeb3React } from 'hooks'
import { useCallback, useMemo } from 'react'
import { LoadingButton } from '@mui/lab'
import { show } from '@ebay/nice-modal-react'
import { hideDialogConfirmation, showRequestConfirmDialog, showWaitingTxDialog } from 'utils/auction'
import DialogTips from 'bounceComponents/common/DialogTips'
import SwitchNetworkButton from 'bounceComponents/fixed-swap/SwitchNetworkButton'
import ConnectWalletButton from 'bounceComponents/fixed-swap/ActionBox/CreatorActionBox/ConnectWalletButton'
import { useEnglishAuctionPoolInfo } from 'pages/auction/englishAuctionNFT/ValuesProvider'
import isZero from 'utils/isZero'

const ButtonBlock = () => {
  const { data: poolInfo } = useEnglishAuctionPoolInfo()
  const { account, chainId } = useActiveWeb3React()
  const isCurrentChainEqualChainOfPool = useMemo(
    () => chainId === poolInfo?.ethChainId,
    [chainId, poolInfo?.ethChainId]
  )

  const isAllTokenSwapped = useMemo(() => !!poolInfo?.currentBidder && !isZero(poolInfo.currentBidder), [poolInfo])

  const { run: claim, submitted } = useCreatorClaimEnglishAuctionNFT(
    poolInfo?.poolId || '',
    poolInfo?.name || '',
    poolInfo?.contract
  )

  const successDialogContent = useMemo(() => {
    const token1ToClaimText = `${poolInfo?.currentBidderAmount1?.toSignificant()} ${poolInfo?.token1.symbol}`
    const token0ToClaimText = `You have successfully claimed ${poolInfo?.token0.symbol}`
    return isAllTokenSwapped ? `You have successfully claimed ${token1ToClaimText}` : token0ToClaimText
  }, [isAllTokenSwapped, poolInfo?.currentBidderAmount1, poolInfo?.token0.symbol, poolInfo?.token1.symbol])

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
                ? '`You have successfully cancelled the pool and claimed your tokens`'
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
          content: err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
          onAgain: () => toClaim(isCancel)
        })
      }
    },
    [claim, successDialogContent]
  )

  if (!poolInfo) {
    return <></>
  }

  if (!account) {
    return <ConnectWalletButton />
  }

  if (!isCurrentChainEqualChainOfPool) {
    return <SwitchNetworkButton targetChain={poolInfo?.ethChainId} />
  }

  if (poolInfo?.status === PoolStatus.Closed && !poolInfo?.creatorClaimed) {
    return (
      <LoadingButton
        variant="contained"
        fullWidth
        loadingPosition="start"
        loading={submitted.complete || submitted.submitted}
        onClick={() => toClaim(false)}
      >
        <span>{'Claim fund raised'}</span>
      </LoadingButton>
    )
  }

  if (poolInfo?.status === PoolStatus.Upcoming) {
    return (
      <LoadingButton
        variant="outlined"
        fullWidth
        loadingPosition="start"
        sx={{ mt: 24, mb: 12 }}
        loading={submitted.complete || submitted.submitted}
        onClick={() => toClaim(true)}
      >
        Cancel & Claim tokens
      </LoadingButton>
    )
  }

  return null
}

export default ButtonBlock
