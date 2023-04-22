import SwitchNetworkButton from '../../SwitchNetworkButton'
import ConnectWalletButton from './ConnectWalletButton'
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

const ButtonBlock = ({ poolInfo }: { poolInfo: FixedSwapPoolProp }) => {
  const { account, chainId } = useActiveWeb3React()
  const isCurrentChainEqualChainOfPool = useMemo(() => chainId === poolInfo.ethChainId, [chainId, poolInfo.ethChainId])

  const isAllTokenSwapped = useIsAllRandomSelectionTokenSwapped(poolInfo)

  const { run: claim, submitted } = useCreatorClaim(poolInfo.poolId, poolInfo.name)

  const successDialogContent = useMemo(() => {
    const amountTotal0 = formatNumber(poolInfo.amountTotal0, {
      unit: poolInfo.token0.decimals,
      decimalPlaces: poolInfo.token0.decimals
    })
    const token1ToClaimText = `${amountTotal0} ${poolInfo.token0.symbol}`
    return `You have successfully claimed ${token1ToClaimText}`
  }, [poolInfo.amountTotal0, poolInfo.token0.decimals, poolInfo.token0.symbol])

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
        loadingPosition="start"
        disabled={true}
        sx={{ mt: 24, mb: 12 }}
        loading={submitted.complete || submitted.submitted}
        onClick={() => toClaim(true)}
      >
        Cancel & Claim tokens only after pool is closed
      </LoadingButton>
    )
  }

  return null
}

export default ButtonBlock
