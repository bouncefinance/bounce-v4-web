import { styled, Box, Typography } from '@mui/material'
import { useMemo, useCallback } from 'react'
import ConnectWalletButton from 'bounceComponents/fixed-swap/ActionBox/CreatorActionBox/ConnectWalletButton'
import SwitchNetworkButton from 'bounceComponents/fixed-swap/SwitchNetworkButton'
import { LoadingButton } from '@mui/lab'
import { DutchAuctionPoolProp, PoolStatus } from 'api/pool/type'
import { ActionStep } from '../../../auction/dutchAuction/components/userBlock/right'
import { useActiveWeb3React } from 'hooks'
import useUserClaim from 'bounceHooks/auction/useUserClaimDutch'
import { hideDialogConfirmation, showRequestConfirmDialog, showWaitingTxDialog } from 'utils/auction'
import { show } from '@ebay/nice-modal-react'
import DialogTips from 'bounceComponents/common/DialogTips'
import { useCountDown } from 'ahooks'
import SuccessIcon from 'assets/imgs/dutchAuction/success.png'
import BigNumber from 'bignumber.js'
export const TipsBox = ({
  style,
  children,
  iconUrl,
  imgStyle
}: {
  iconUrl?: string
  style?: React.CSSProperties
  children?: string
  imgStyle?: React.CSSProperties
}) => (
  <Box
    sx={{
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      borderRadius: 6,
      border: `1px solid var(--dip, #4F5FFC)`,
      padding: '16px',
      cursor: 'pointer',
      ...style
    }}
  >
    <img
      src={iconUrl}
      style={{ width: '20px', marginRight: '6px', verticalAlign: 'middle', ...imgStyle }}
      alt=""
      srcSet=""
    />
    <Typography
      variant="body1"
      sx={{
        fontFamily: `'Inter'`,
        fontSize: '14px',
        color: '#959595',
        fontWeight: 600
      }}
    >
      {children}
    </Typography>
  </Box>
)
export const ComBtn = styled(LoadingButton)(() => ({
  '&.Mui-disabled': {
    background: '#D7D6D9 !important',
    color: '#121212 !important'
  },
  '&.MuiButtonBase-root': {
    background: `linear-gradient(180deg, #5086FD 0%, #312C87 99.99%, #312C87 100%)`,
    border: 'none',
    color: '#FFF'
  },
  '&.MuiButtonBase-root:hover': {
    background: `linear-gradient(180deg, #5086FD 0%, #312C87 99.99%, #312C87 100%)`,
    border: 'none',
    color: '#FFF'
  }
}))
export enum ClaimStatus {
  'NotTimeToClaim' = 0,
  'NeedClaim' = 1,
  'Claimed' = 2
}
const ClaimBlock = ({
  poolInfo,
  handleSetActionStep
}: {
  poolInfo: DutchAuctionPoolProp
  handleSetActionStep?: (actionStep: ActionStep) => void
}) => {
  const { claimAt } = poolInfo
  const [countdown] = useCountDown({
    targetDate: claimAt * 1000
  })
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
            content: 'You have successfully claimed'
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
        content: err?.reason || err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
        onAgain: toClaim
      })
      handleSetActionStep && handleSetActionStep(ActionStep.ClosedAndClaimed)
    }
  }, [claim, handleSetActionStep])
  const claimStatus = useMemo(() => {
    if (poolInfo.status === PoolStatus.Closed && countdown > 0) {
      return ClaimStatus.NotTimeToClaim
    } else if (
      poolInfo.status === PoolStatus.Closed &&
      BigNumber(poolInfo?.participant?.currencyCurClaimableAmount?.toExact() || '0').isGreaterThan(0)
    ) {
      return ClaimStatus.NeedClaim
    } else {
      return ClaimStatus.Claimed
    }
  }, [countdown, poolInfo?.participant?.currencyCurClaimableAmount, poolInfo.status])
  if (!account) {
    return (
      <Box id={'claimBtn'}>
        <ConnectWalletButton />
      </Box>
    )
  }
  if (!isCurrentChainEqualChainOfPool) {
    return (
      <Box id={'claimBtn'}>
        <SwitchNetworkButton targetChain={poolInfo.ethChainId} />
      </Box>
    )
  }
  if (claimStatus === ClaimStatus.Claimed) {
    return (
      <TipsBox
        iconUrl={SuccessIcon}
        style={{
          marginTop: '16px'
        }}
      >
        Successfully Claimed
      </TipsBox>
    )
  }
  return (
    <Box
      id={'claimBtn'}
      sx={{
        width: '100%',
        padding: '0 16px'
      }}
    >
      <ComBtn fullWidth onClick={() => toClaim()} loading={claimBidSubmitted.submitted}>
        <span>{'Claim'}</span>
      </ComBtn>
    </Box>
  )
}
export default ClaimBlock
