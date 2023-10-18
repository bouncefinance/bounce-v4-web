// import SwitchNetworkButton from 'bounceComponents/fixed-swap/SwitchNetworkButton'
import ConnectWalletButton from 'bounceComponents/fixed-swap/ActionBox/CreatorActionBox/ConnectWalletButton'
import { PoolStatus } from 'api/pool/type'
import { useBotCreatorClaim } from 'bounceHooks/auction/useBotCreatorClaim'
import { useActiveWeb3React } from 'hooks'
import { useCallback } from 'react'
import { IconButton } from '@mui/material'
import { show } from '@ebay/nice-modal-react'
import { hideDialogConfirmation, showRequestConfirmDialog, showWaitingTxDialog } from 'utils/auction'
import DialogBotTips from 'bounceComponents/common/DialogTips/DialogBotTips'
import DialogTips from 'bounceComponents/common/DialogTips'
import { ReactComponent as Close } from './svg/close.svg'

const ButtonBlock = ({ poolData }: { poolData: any }) => {
  const { account } = useActiveWeb3React()

  const { run: claim, submitted } = useBotCreatorClaim(poolData.poolId, poolData.name, poolData.contract)

  const toClaim = useCallback(
    async (isCancel: boolean) => {
      showRequestConfirmDialog({ isBot: true, dark: false })
      try {
        const { transactionReceipt } = await claim()

        const ret = new Promise((resolve, rpt) => {
          showWaitingTxDialog(
            () => {
              hideDialogConfirmation()
              rpt()
            },
            { isBot: true, dark: false }
          )
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
          content: err?.reason || err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
          onAgain: () => {
            show(DialogTips, {
              iconType: 'error',
              againBtn: 'Try Again',
              cancelBtn: 'Cancel',
              title: 'Oops..',
              content:
                err?.reason || err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
              onAgain: () => toClaim(isCancel)
            })
          }
        })
      }
    },
    [claim]
  )

  if (!account) {
    return <ConnectWalletButton />
  }

  // if (!poolData.creatorClaimed && !isCurrentChainEqualChainOfPool) {
  //   return <SwitchNetworkButton targetChain={poolData.ethChainId} />
  // }

  // if (poolData.status === PoolStatus.Closed && !poolData.creatorClaimed) {
  //   return (
  //     <IconButton
  //       disabled={submitted.complete || submitted.submitted}
  //       onClick={() => {
  //         show(DialogBotTips, {
  //           cancelBtn: 'Cancel',
  //           againBtn: 'Again',
  //           title: 'delete auction',
  //           content: 'Are you sure to delete this auction? ',
  //           onAgain: () => toClaim(false)
  //         })
  //       }}
  //     >
  //       <Close />
  //     </IconButton>
  //   )
  // }

  if (poolData.status === PoolStatus.Upcoming) {
    return (
      <IconButton
        disabled={submitted.complete || submitted.submitted}
        onClick={() => {
          show(DialogBotTips, {
            cancelBtn: 'Cancel',
            againBtn: 'Again',
            title: 'delete auction',
            content: 'Are you sure to delete this auction? ',
            onAgain: () => toClaim(true)
          })
        }}
      >
        <Close />
      </IconButton>
    )
  }

  return null
}

export default ButtonBlock
