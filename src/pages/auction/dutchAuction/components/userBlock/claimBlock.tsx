import { styled, Box, Typography } from '@mui/material'
import { useMemo, useCallback } from 'react'
import ConnectWalletButton from 'bounceComponents/fixed-swap/ActionBox/CreatorActionBox/ConnectWalletButton'
import SwitchNetworkButton from 'bounceComponents/fixed-swap/SwitchNetworkButton'
import { LoadingButton } from '@mui/lab'
import { Erc20EnglishAuctionPoolProp, DutchAuctionPoolProp, PoolStatus } from 'api/pool/type'
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
import { useErc20EnglishUserClaim } from 'bounceHooks/auction/useErc20EnglishAuctionCallback'

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
enum ClaimStatus {
  'NotTimeToClaim' = 0,
  'NeedClaim' = 1,
  'Claimed' = 2
}
const ClaimBlock = ({
  isErc20EnglishAuction = false,
  poolInfo,
  handleSetActionStep,
  style,
  notTimeStyle
}: {
  isErc20EnglishAuction: boolean
  poolInfo: DutchAuctionPoolProp | Erc20EnglishAuctionPoolProp
  handleSetActionStep?: (actionStep: ActionStep) => void
  style?: React.CSSProperties
  notTimeStyle?: React.CSSProperties
}) => {
  const { claimAt } = poolInfo
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate: claimAt * 1000
  })
  const { account, chainId } = useActiveWeb3React()
  const { run: claimDutch, submitted: claimBidDutchSubmitted } = useUserClaim(poolInfo as DutchAuctionPoolProp)
  const { run: claimEnglish, submitted: claimBidEnglishSubmitted } = useErc20EnglishUserClaim(
    poolInfo as Erc20EnglishAuctionPoolProp
  )
  const isCurrentChainEqualChainOfPool = useMemo(() => chainId === poolInfo.ethChainId, [chainId, poolInfo.ethChainId])
  const toClaim = useCallback(async () => {
    showRequestConfirmDialog()
    try {
      const { transactionReceipt } = isErc20EnglishAuction ? await claimEnglish() : await claimDutch()
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
  }, [claimDutch, claimEnglish, handleSetActionStep, isErc20EnglishAuction])
  //   const isNotTimeToClaim = useMemo(() => {
  //     return Number(poolInfo?.claimAt) * 1000 >= new Date().valueOf()
  //   }, [poolInfo?.claimAt])
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
    return <ConnectWalletButton />
  }
  if (!isCurrentChainEqualChainOfPool) {
    return <SwitchNetworkButton targetChain={poolInfo.ethChainId} />
  }
  if (claimStatus === ClaimStatus.NotTimeToClaim) {
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
  if (claimStatus === ClaimStatus.Claimed) {
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
      <ComBtn
        fullWidth
        onClick={() => toClaim()}
        loading={isErc20EnglishAuction ? claimBidEnglishSubmitted.submitted : claimBidDutchSubmitted.submitted}
      >
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
