import { TransactionResponse } from '@ethersproject/providers'
import { useRequest } from 'ahooks'
import { hideDialogConfirmation, showRequestConfirmDialog, showWaitingTxDialog } from '../utils/auction'
import { show } from '@ebay/nice-modal-react'
import DialogTips from 'bounceComponents/common/DialogTips'

export function useTransactionModalWrapper(
  event: (...args: any) => Promise<TransactionResponse>,
  successTipsText?: string
) {
  const { runAsync } = useRequest(
    async (...args) => {
      try {
        showRequestConfirmDialog()
        const { wait } = await event(...args)
        const ret = new Promise((resolve, reject) => {
          showWaitingTxDialog(() => {
            hideDialogConfirmation()
            reject()
          })
          wait(1).then(curReceipt => {
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
              content: successTipsText || `The transaction has been successfully confirmed`
            })
          })
          .catch()
      } catch (err: any) {
        hideDialogConfirmation()
        show(DialogTips, {
          iconType: 'error',
          againBtn: 'Try Again',
          cancelBtn: 'Cancel',
          title: 'Oops..',
          content: err?.reason || err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
          onAgain: runAsync
        })
      }
    },
    {
      manual: true
    }
  )

  return runAsync
}
