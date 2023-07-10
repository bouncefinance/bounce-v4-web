import { styled, Box, Typography } from '@mui/material'
import { useMemo, useCallback, useState, useEffect } from 'react'
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
import { useCountDown } from 'ahooks'
import { TipsBox } from './right'
import SuccessIcon from 'assets/imgs/dutchAuction/success.png'
import BigNumber from 'bignumber.js'

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
  handleSetActionStep,
  style,
  notTimeStyle
}: {
  poolInfo: DutchAuctionPoolProp
  handleSetActionStep?: (actionStep: ActionStep) => void
  style?: React.CSSProperties
  notTimeStyle?: React.CSSProperties
}) => {
  const { claimAt } = poolInfo
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate: claimAt * 1000
  })
  const { account, chainId } = useActiveWeb3React()
  const { run: claim, submitted: claimBidSubmitted } = useUserClaim(poolInfo)
  const [isNotTimeToClaim, setIsNotTimeToClaim] = useState<boolean>(false)
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
            content: `You have successfully claimed`
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
  //   const isNotTimeToClaim = useMemo(() => {
  //     return Number(poolInfo?.claimAt) * 1000 >= new Date().valueOf()
  //   }, [poolInfo?.claimAt])
  useEffect(() => {
    setIsNotTimeToClaim(Number(poolInfo?.claimAt) * 1000 >= new Date().valueOf())
    const timer: NodeJS.Timeout = setInterval(() => {
      if (Number(poolInfo?.claimAt) * 1000 >= new Date().valueOf()) {
        setIsNotTimeToClaim(true)
      }
    }, 5000)
    return () => {
      clearInterval(timer)
    }
  }, [poolInfo?.claimAt])
  const isCanClaim = useMemo(() => {
    return BigNumber(poolInfo?.participant?.currencyCurClaimableAmount?.toExact() || '0').isGreaterThan(0)
  }, [poolInfo?.participant?.currencyCurClaimableAmount])
  if (!account) {
    return <ConnectWalletButton />
  }
  if (!isCurrentChainEqualChainOfPool) {
    return <SwitchNetworkButton targetChain={poolInfo.ethChainId} />
  }
  if (isNotTimeToClaim) {
    return (
      <Box
        sx={{
          width: 'calc(100% - 48px)',
          background: '#D7D6D9',
          height: '52px',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 24px',
          borderRadius: '8px',
          cursor: 'pointer',
          margin: '0 auto',
          ...notTimeStyle
        }}
      >
        <Typography
          sx={{
            fontFamily: `'Inter'`,
            color: '#fff',
            fontSize: '16px'
          }}
        >
          Claim Token
        </Typography>
        <Typography
          sx={{
            fontFamily: `'Inter'`,
            color: '#fff',
            fontSize: '16px'
          }}
        >
          {countdown > 0 ? `${days}d : ${hours}h : ${minutes}m : ${seconds}s` : 'waiting for claim'}
        </Typography>
      </Box>
    )
  }
  if (!isCanClaim) {
    return (
      <TipsBox
        iconUrl={SuccessIcon}
        style={{
          marginTop: '16px'
        }}
      >
        You have successfully claimed your tokens. See you next time!
      </TipsBox>
    )
  }
  return (
    <Box
      sx={{
        width: '100%',
        padding: '0 24px',
        ...style
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
