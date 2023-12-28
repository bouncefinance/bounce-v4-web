import { CurrencyAmount } from 'constants/token'
import { useActiveWeb3React } from 'hooks'
import { useCallback, useMemo } from 'react'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { RandomPoolStatus, RandomSelectionNFTProps } from 'api/pool/type'
import { useGetRandomSelectionNFTPoolStatus } from 'bounceHooks/auction/useRandomSelectionNFTPoolInfo'
import { styled } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { useRandomNFTBetCallback, useRandomNFTUserClaim } from 'bounceHooks/auction/useRandomNFTAuctionCallback'
import { hideDialogConfirmation, showRequestApprovalDialog, showWaitingTxDialog } from 'utils/auction'
import { show } from '@ebay/nice-modal-react'
import DialogTips from 'bounceComponents/common/DialogTips'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { Dots } from 'themes'
import { CloseBtn, DrawedBtn, TipTitle } from './bidBtnBox'
import { useShowLoginModal } from 'state/users/hooks'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'

interface BidButtonBlockProps {
  poolInfo: RandomSelectionNFTProps
  otherBtns?: JSX.Element
}

export const BidButton = styled(LoadingButton)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
  maxWidth: 534,
  margin: '0 auto',
  padding: '20px',
  borderRadius: '100px',
  background: '#0f0f0f',
  color: '#fff',
  '&.dis': {
    background: '#d7d6d9',
    '&:hover': {
      background: '#d7d6d9'
    }
  },
  '&:hover': {
    opacity: 0.8
  },
  [theme.breakpoints.down('sm')]: {
    height: '48px'
  }
}))

const BidButtonBlock = ({ poolInfo, otherBtns }: BidButtonBlockProps) => {
  const { account, chainId } = useActiveWeb3React()
  const showLoginModal = useShowLoginModal()
  const switchNetwork = useSwitchNetwork()
  const { poolStatus, isUserJoined, isUserWinner } = useGetRandomSelectionNFTPoolStatus(poolInfo)
  const isCurrentChainEqualChainOfPool = useMemo(() => poolInfo.ethChainId === chainId, [poolInfo.ethChainId, chainId])
  const userBalance = useCurrencyBalance(account || undefined, poolInfo.userTokenAmount)
  const currencySlicedBidAmount = useMemo(
    () => CurrencyAmount.fromRawAmount(poolInfo.userTokenAmount, poolInfo.maxAmount1PerWallet),
    [poolInfo.maxAmount1PerWallet, poolInfo.userTokenAmount]
  )
  const isBalanceInsufficient = useMemo(() => {
    if (!userBalance || !currencySlicedBidAmount) return true
    return userBalance.lessThan(currencySlicedBidAmount)
  }, [currencySlicedBidAmount, userBalance])

  const isLimitExceeded = useMemo(() => {
    return `${poolInfo.curPlayer}` === `${poolInfo.maxPlayere}`
  }, [poolInfo.curPlayer, poolInfo.maxPlayere])
  const [approvalState, approveCallback] = useApproveCallback(currencySlicedBidAmount, poolInfo.contract)
  const toApprove = useCallback(async () => {
    showRequestApprovalDialog()
    try {
      const { transactionReceipt } = await approveCallback()
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
        })
        .catch()
    } catch (error) {
      const err: any = error
      hideDialogConfirmation()
      show(DialogTips, {
        iconType: 'error',
        againBtn: 'Try Again',
        cancelBtn: 'Cancel',
        title: 'Oops..',
        content: err?.reason || err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
        onAgain: toApprove
      })
    }
  }, [approveCallback])

  const { runWithModal: bid, submitted: placeBidSubmitted } = useRandomNFTBetCallback(poolInfo)
  const toBid = useCallback(async () => {
    if (!currencySlicedBidAmount || !account) return
    bid(currencySlicedBidAmount)
  }, [account, bid, currencySlicedBidAmount])

  const { runWithModal: userClaim, submitted: placeUserSubmitted } = useRandomNFTUserClaim(
    poolInfo,
    isUserWinner,
    poolInfo.contract
  )
  const toClaim = useCallback(async () => {
    if (!account) return
    userClaim()
  }, [account, userClaim])

  // if (poolStatus === RandomPoolStatus.Upcoming) {
  //   return <UpcomingBtn poolInfo={poolInfo} />
  // }

  if (!account) {
    return (
      <BidButton variant="contained" fullWidth sx={{ my: 12, mx: 'auto' }} onClick={showLoginModal}>
        Connect Wallet
      </BidButton>
    )
  }

  if (!isCurrentChainEqualChainOfPool) {
    return (
      <>
        <BidButton
          variant="contained"
          fullWidth
          sx={{ mt: 24, mb: 12 }}
          onClick={() => {
            switchNetwork(poolInfo.ethChainId || 1)
          }}
        >
          Switch Network
        </BidButton>
      </>
    )
  }
  if (poolStatus === RandomPoolStatus.Live && isUserJoined) {
    return <DrawedBtn />
  }
  if (isLimitExceeded) {
    return (
      <>
        <BidButton variant="contained" fullWidth disabled>
          Sold Out
        </BidButton>
        <TipTitle mt={24} align="center">
          Sorry, you are too late...{' '}
        </TipTitle>
      </>
    )
  }

  if (isBalanceInsufficient) {
    return (
      <BidButton variant="contained" fullWidth disabled>
        {!userBalance ? 'Loading' : 'Insufficient balance'}
      </BidButton>
    )
  }

  if (!!otherBtns) {
    return otherBtns
  }
  if (approvalState !== ApprovalState.APPROVED && !isUserJoined) {
    if (approvalState === ApprovalState.PENDING) {
      return (
        <BidButton loadingPosition="start" variant="contained" fullWidth loading>
          Approving {poolInfo.token1?.symbol}
        </BidButton>
      )
    }
    if (approvalState === ApprovalState.UNKNOWN) {
      return (
        <BidButton loadingPosition="start" variant="contained" fullWidth loading>
          Loading <Dots />
        </BidButton>
      )
    }
    if (approvalState === ApprovalState.NOT_APPROVED) {
      return (
        <BidButton variant="contained" onClick={toApprove} fullWidth>
          Approve use of {poolInfo.token1?.symbol}
        </BidButton>
      )
    }
  }
  if (RandomPoolStatus.Live === poolStatus) {
    if (!isUserJoined) {
      return (
        <BidButton sx={{ mt: 24 }} onClick={toBid} loading={placeBidSubmitted.submitted}>
          Purchase
        </BidButton>
      )
    }
  }

  if (RandomPoolStatus.Waiting === poolStatus) {
    if (!isUserJoined) {
      return <CloseBtn />
    } else {
    }
  }
  if (RandomPoolStatus.Waiting === poolStatus) {
    if (!isUserJoined) {
      return (
        <>
          <CloseBtn />
          <TipTitle mt={24}>Sorry, you are too late... </TipTitle>
        </>
      )
    }
    return <DrawedBtn />
  }
  if (RandomPoolStatus.OpenSeed === poolStatus) {
    if (!isUserJoined) {
      return (
        <>
          <CloseBtn />
          <TipTitle mt={24}>Sorry, you are too late... </TipTitle>
        </>
      )
    } else {
      if (poolInfo.participant.claimed) {
        return (
          <BidButton sx={{ mt: 24 }} className="dis">
            Claimed
          </BidButton>
        )
      } else {
        return (
          <BidButton sx={{ mt: 24 }} onClick={toClaim} loading={placeUserSubmitted.submitted}>
            Claim
          </BidButton>
        )
      }
    }
  }
  return null
}

export default BidButtonBlock
