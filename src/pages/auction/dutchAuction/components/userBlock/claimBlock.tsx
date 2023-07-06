import { styled, Box } from '@mui/material'
import { useMemo, useCallback } from 'react'
import ConnectWalletButton from 'bounceComponents/fixed-swap/ActionBox/CreatorActionBox/ConnectWalletButton'
import SwitchNetworkButton from 'bounceComponents/fixed-swap/SwitchNetworkButton'
import { LoadingButton } from '@mui/lab'
import { DutchAuctionPoolProp } from 'api/pool/type'
import { ActionStep } from './right'
import { useActiveWeb3React } from 'hooks'
import useUserClaim from 'bounceHooks/auction/useUserClaimDutch'
import { hideDialogConfirmation, showRequestConfirmDialog, showWaitingTxDialog } from 'utils/auction'
import { show } from '@ebay/nice-modal-react'
import DialogTips from 'bounceComponents/common/DialogTips'

export const ComBtn = styled(LoadingButton)(() => ({
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

const ClaimBlock = ({
  poolInfo,
  handleSetActionStep
}: {
  poolInfo: DutchAuctionPoolProp
  handleSetActionStep?: (actionStep: ActionStep) => void
}) => {
  const { account, chainId } = useActiveWeb3React()
  const { run: claim, submitted: claimBidSubmitted } = useUserClaim(poolInfo)
  const isCurrentChainEqualChainOfPool = useMemo(() => chainId === poolInfo.ethChainId, [chainId, poolInfo.ethChainId])
  const toClaim = useCallback(async () => {
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
            content: `You have successfully claimed}`
          })
          handleSetActionStep && handleSetActionStep(ActionStep.ClosedAndClaimed)
        })
        .catch(() => {
          handleSetActionStep && handleSetActionStep(ActionStep.ClosedAndClaimed)
        })
    } catch (error) {
      const err: any = error
      hideDialogConfirmation()
      show(DialogTips, {
        iconType: 'error',
        againBtn: 'Try Again',
        cancelBtn: 'Cancel',
        title: 'Oops..',
        content: err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
        onAgain: toClaim
      })
      handleSetActionStep && handleSetActionStep(ActionStep.ClosedAndClaimed)
    }
  }, [claim, handleSetActionStep])
  if (!account) {
    return <ConnectWalletButton />
  }
  if (!isCurrentChainEqualChainOfPool) {
    return <SwitchNetworkButton targetChain={poolInfo.ethChainId} />
  }
  return (
    <Box
      sx={{
        width: '100%',
        padding: '0 24px'
      }}
    >
      <ComBtn fullWidth onClick={() => toClaim()} loading={claimBidSubmitted.submitted}>
        <span>
          {Number(poolInfo.participant.currencyCurReleasableAmount?.toExact()) > 0
            ? 'Claim token and extra payment'
            : 'Claim Token'}
        </span>
      </ComBtn>
    </Box>
  )
}
export default ClaimBlock
