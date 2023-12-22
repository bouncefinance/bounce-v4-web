import { FixedSwapPoolProp, PoolStatus } from 'api/pool/type'
import { useCreatorClaim } from 'bounceHooks/auction/useRandomSelectionCreatorClaim'
import { useActiveWeb3React } from 'hooks'
import { useCallback, useMemo } from 'react'
import useIsAllRandomSelectionTokenSwapped from 'bounceHooks/auction/useIsAllRandomSelectionTokenSwapped'
import { LoadingButton } from '@mui/lab'
import { show } from '@ebay/nice-modal-react'
import { hideDialogConfirmation, showRequestConfirmDialog, showWaitingTxDialog } from 'utils/auction'
import DialogTips from 'bounceComponents/common/DialogTips'
import { formatNumber } from 'utils/number'
import { BigNumber } from 'bignumber.js'
import ConnectWalletButton from 'bounceComponents/fixed-swap/ActionBox/CreatorActionBox/ConnectWalletButton'
import { TX_FEE_RATIO } from 'bounceHooks/auction/useCreatorClaimTxFee'
import SwitchNetworkButton from 'bounceComponents/fixed-swap/SwitchNetworkButton'

const ButtonBlock = ({ poolInfo }: { poolInfo: FixedSwapPoolProp }) => {
  console.log('🚀 ~ file: ButtonBlock.tsx:17 ~ ButtonBlock ~ poolInfo:', poolInfo)
  const { account, chainId } = useActiveWeb3React()
  const isCurrentChainEqualChainOfPool = useMemo(() => chainId === poolInfo.ethChainId, [chainId, poolInfo.ethChainId])

  const isAllTokenSwapped = useIsAllRandomSelectionTokenSwapped(poolInfo)

  const { run: claim, submitted } = useCreatorClaim(poolInfo.poolId, poolInfo.name, poolInfo.contract)

  const successDialogContent = useMemo(() => {
    const singleShare = new BigNumber(poolInfo?.amountTotal0).div(Number(poolInfo?.totalShare)).toString()
    const canClaimToken0Amount = new BigNumber(
      Number(poolInfo.totalShare) - Number(poolInfo.curPlayer) > 0
        ? Number(poolInfo.totalShare) - Number(poolInfo.curPlayer)
        : 0
    )
      .times(singleShare)
      .toString()
    const canClaimToken1Amount = new BigNumber(Number(poolInfo.curPlayer))
      .times(poolInfo.maxAmount1PerWallet)
      .multipliedBy(1 - TX_FEE_RATIO)
      .toString()
    const amountTotal0 = formatNumber(canClaimToken0Amount, {
      unit: poolInfo.token0.decimals,
      decimalPlaces: poolInfo.token0.decimals
    })
    const amountTotal1 = formatNumber(canClaimToken1Amount, {
      unit: poolInfo.token1.decimals,
      decimalPlaces: poolInfo.token1.decimals
    })
    const token0ToClaimText = `${amountTotal0} ${poolInfo.token0.symbol}`
    const token1ToClaimText = ` and ${amountTotal1} ${poolInfo.token1.symbol}`
    return `You have successfully claimed ${token0ToClaimText}${token1ToClaimText}`
  }, [
    poolInfo.amountTotal0,
    poolInfo.curPlayer,
    poolInfo.maxAmount1PerWallet,
    poolInfo.token0.decimals,
    poolInfo.token0.symbol,
    poolInfo.token1.decimals,
    poolInfo.token1.symbol,
    poolInfo.totalShare
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
    return <SwitchNetworkButton targetChain={poolInfo.ethChainId} />
  }

  if (poolInfo.status === PoolStatus.Closed && !poolInfo.creatorClaimed) {
    return (
      <LoadingButton
        variant="contained"
        fullWidth
        loadingPosition="start"
        loading={submitted.complete || submitted.submitted}
        onClick={() => toClaim(false)}
      >
        <span>{!isAllTokenSwapped ? 'Claim your unswapped tokens and fund raised' : 'Claim fund raised'}</span>
      </LoadingButton>
    )
  }

  if (poolInfo.status === PoolStatus.Upcoming) {
    return (
      <LoadingButton
        variant="outlined"
        fullWidth
        disabled={poolInfo.creatorClaimed}
        loadingPosition="start"
        sx={{ mt: 24, mb: 12 }}
        loading={submitted.complete || submitted.submitted}
        onClick={() => toClaim(true)}
      >
        Cancel and claim back tokens
      </LoadingButton>
    )
  }

  return null
}

export default ButtonBlock
