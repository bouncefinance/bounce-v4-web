import { TransactionResponse } from '@ethersproject/providers'
import { useRequest } from 'ahooks'
import {
  hideDialogConfirmation,
  showRequestApprovalDialog,
  showRequestConfirmDialog,
  showWaitingTxDialog
} from '../utils/auction'
import { show } from '@ebay/nice-modal-react'
import DialogTips from 'bounceComponents/common/DialogTips'

export function useTransactionModalWrapper(
  event: (...args: any) => Promise<TransactionResponse>,
  option?: {
    isApprove?: boolean
    successTipsText?: string
    onSuccess?: () => void
    hideSuccessTip?: boolean
  }
) {
  const { runAsync } = useRequest(
    async (...args) => {
      try {
        option?.isApprove ? showRequestApprovalDialog() : showRequestConfirmDialog()
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

            !option?.hideSuccessTip &&
              show(DialogTips, {
                iconType: 'success',
                againBtn: 'Close',
                title: 'Congratulations!',
                content: option?.successTipsText || `The transaction has been successfully confirmed`
              })
            option?.onSuccess && option.onSuccess()
          })
          .catch()
      } catch (err: any) {
        hideDialogConfirmation()
        show(DialogTips, {
          iconType: 'error',
          againBtn: 'Try Again',
          cancelBtn: 'Cancel',
          title: 'Oops..',
          content:
            err?.reason ||
            err?.error?.message ||
            err?.data?.message ||
            err?.message ||
            err?.toString() ||
            'Something went wrong',
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
