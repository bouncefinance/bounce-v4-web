// import SwitchNetworkButton from 'bounceComponents/fixed-swap/SwitchNetworkButton'
import ConnectWalletButton from 'bounceComponents/fixed-swap/ActionBox/CreatorActionBox/ConnectWalletButton'
import { PoolStatus } from 'api/pool/type'
import { useBotCreatorClaim } from 'bounceHooks/auction/useBotCreatorClaim'
import { useActiveWeb3React } from 'hooks'
import { useCallback } from 'react'
import { IconButton } from '@mui/material'
import { show } from '@ebay/nice-modal-react'
import { hideBotDialogConfirmation, showRequestConfirmDialog, showWaitingTxDialog } from 'utils/auction'
import DialogBotTips from 'bounceComponents/common/DialogTips/DialogBotTips'
import DialogTips from 'bounceComponents/common/DialogTips'
import { ReactComponent as Close } from './svg/close.svg'
import { LoadingButton } from '@mui/lab'

const ButtonBlock = ({ poolData, flushed }: { poolData: any; flushed: () => void }) => {
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
              hideBotDialogConfirmation()
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
            flushed()
            hideBotDialogConfirmation()
          })
          .catch()
      } catch (error) {
        const err: any = error
        console.error(err)
        hideBotDialogConfirmation()
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
    [claim, flushed]
  )

  if (!account) {
    return <ConnectWalletButton />
  }

  if (poolData.status === PoolStatus.Closed) {
    return (
      <LoadingButton
        size="small"
        variant="contained"
        fullWidth
        loadingPosition="start"
        loading={submitted.submitted}
        disabled={poolData.creatorClaimed || poolData.creatorClaimed === undefined}
        onClick={() => toClaim(false)}
      >
        {poolData.creatorClaimed ? 'Claimed' : 'Claim fund raised'}
      </LoadingButton>
    )
  }

  if (poolData.status === PoolStatus.Upcoming) {
    return (
      <IconButton
        disabled={submitted.complete || submitted.submitted}
        onClick={() => {
          show(DialogBotTips, {
            cancelBtn: 'Cancel',
            againBtn: 'Confirm',
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
