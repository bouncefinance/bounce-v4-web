import { useCallback, useEffect, useMemo, useState } from 'react'
import { Box } from '@mui/material'
import moment from 'moment'
import SuspiciousTips from '../SuspiciousStatisTip'
import InputRegretAmount from './InputRegretAmount'
import ConfirmRegret from './ConfirmRegret'
import Bid from './Bid'
import usePlaceBid1155 from 'bounceHooks/auction/usePlaceBid1155'
import useRegretBid1155 from 'bounceHooks/auction/useRegretBid1155'
import { PoolStatus } from 'api/pool/type'
import useUserClaim1155 from 'bounceHooks/auction/useUserClaim1155'
import useNftGoApi from 'bounceHooks/auction/useNftInfoByNftGo'
import { FixedSwapPoolParams } from 'bounceComponents/fixed-swap-nft/MainBlock/UserMainBlock'
import { useActiveWeb3React } from 'hooks'
import { useIsUserJoined1155Pool } from 'bounceHooks/auction/useIsUserJoinedPool'
import SuccessfullyClaimedAlert from 'bounceComponents/fixed-swap/Alerts/SuccessfullyClaimedAlert'
import { hideDialogConfirmation, showRequestConfirmDialog, showWaitingTxDialog } from 'utils/auction'
import { show } from '@ebay/nice-modal-react'
import DialogTips from 'bounceComponents/common/DialogTips'
import Check from 'bounceComponents/fixed-swap/ActionBox/UserActionBox2/Check'
import BidOrRegret from 'bounceComponents/fixed-swap/ActionBox/UserActionBox2/BidOrRegret'
import ClaimingCountdownButton from 'bounceComponents/fixed-swap/ActionBox/UserActionBox2/ClaimingCountdownButton'
import ClaimButton from 'bounceComponents/fixed-swap/ActionBox/UserActionBox2/ClaimButton'
import { ChainId } from 'constants/chain'

export type UserAction =
  | 'GO_TO_CHECK'
  | 'CHECK'
  | 'FIRST_BID'
  | 'BID_OR_REGRET'
  | 'INPUT_REGRET_AMOUNT'
  | 'CONFIRM_REGRET'
  | 'MORE_BID'
  | 'POOL_CLOSED_AND_NOT_JOINED'
  | 'NEED_TO_CLAIM'
  | 'CLAIMED'
  | 'WAIT_FOR_DELAY'

const getInitialAction = (
  isJoined?: boolean,
  isClaimed?: boolean,
  poolStatus?: PoolStatus,
  claimAt?: number
): UserAction => {
  // console.log('internal isJoined: ', isJoined)
  // console.log('internal isClaimed: ', isClaimed)
  if (poolStatus === PoolStatus.Upcoming || poolStatus === PoolStatus.Cancelled) {
    return 'GO_TO_CHECK'
  }
  if (poolStatus === PoolStatus.Live) {
    if (isJoined) {
      return 'BID_OR_REGRET'
    } else {
      return 'GO_TO_CHECK'
    }
  }
  if (poolStatus === PoolStatus.Closed) {
    if (isJoined) {
      if (isClaimed) {
        return 'CLAIMED'
      } else {
        if (moment().unix() > (claimAt || 0)) {
          return 'NEED_TO_CLAIM'
        } else {
          return 'WAIT_FOR_DELAY'
        }
      }
    } else {
      return 'POOL_CLOSED_AND_NOT_JOINED'
    }
  }
  return 'GO_TO_CHECK'
}

export type UserBidAction = 'GO_TO_CHECK' | 'FIRST_BID' | 'MORE_BID'

const ActionBlock = (props: FixedSwapPoolParams) => {
  const { poolInfo, getPoolInfo } = props
  const { chainId } = useActiveWeb3React()
  const nftGoInfo = useNftGoApi(poolInfo.contract, poolInfo.tokenId)

  const isCurrentChainEqualChainOfPool = useMemo(() => chainId === poolInfo.ethChainId, [chainId, poolInfo.ethChainId])
  const isJoined = useIsUserJoined1155Pool(poolInfo)
  const isUserClaimed = useMemo(() => !!poolInfo.participant.claimed, [poolInfo])

  const [action, setAction] = useState<UserAction>()
  const [bidAmount, setBidAmount] = useState('')
  const [regretAmount, setRegretAmount] = useState('')

  const slicedRegretAmount = regretAmount || ''

  const { run: bid, submitted: placeBidSubmitted } = usePlaceBid1155(poolInfo)
  const toBid = useCallback(async () => {
    if (!bidAmount) return
    showRequestConfirmDialog()
    try {
      const { transactionReceipt } = await bid(bidAmount)
      setBidAmount('')
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
          // TOTD ?
          setAction('BID_OR_REGRET')
          show(DialogTips, {
            iconType: 'success',
            againBtn: 'Close',
            title: 'Congratulations!',
            content: `You have successfully bid ${bidAmount} ${poolInfo.token0.symbol}`
          })
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
        content: err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
        onAgain: toBid
      })
    }
  }, [bid, bidAmount, poolInfo.token0.symbol])

  const { run: regret, submitted: regretBidSubmitted } = useRegretBid1155(poolInfo)
  const toRegret = useCallback(async () => {
    if (!regretAmount) return
    showRequestConfirmDialog()
    try {
      const { transactionReceipt } = await regret(regretAmount)
      const ret = new Promise((resolve, rpt) => {
        showWaitingTxDialog(() => {
          hideDialogConfirmation()
          rpt()
          setAction('INPUT_REGRET_AMOUNT')
          setRegretAmount('')
        })
        transactionReceipt.then(curReceipt => {
          resolve(curReceipt)
        })
      })
      ret
        .then(() => {
          hideDialogConfirmation()
          setRegretAmount('')
          setAction('INPUT_REGRET_AMOUNT')
          show(DialogTips, {
            iconType: 'success',
            againBtn: 'Close',
            title: 'Congratulations!',
            content: `You have successfully refunded.`
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
        onAgain: toRegret
      })
    }
  }, [regret, regretAmount])

  const { run: claim, submitted: claimBidSubmitted } = useUserClaim1155(poolInfo)
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
          setAction('CLAIMED')

          show(DialogTips, {
            iconType: 'success',
            againBtn: 'Close',
            title: 'Congratulations!',
            content: `You have successfully claimed ${poolInfo.participant.swappedAmount0} ${poolInfo.token0.symbol}`
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
        onAgain: toClaim
      })
    }
  }, [claim, poolInfo.participant.swappedAmount0, poolInfo.token0.symbol])

  useEffect(() => {
    if (!isCurrentChainEqualChainOfPool) {
      setAction('GO_TO_CHECK')
      return
    }

    if (typeof isJoined === 'undefined') return

    setAction(getInitialAction(isJoined, isUserClaimed, poolInfo?.status, poolInfo?.claimAt))
  }, [isCurrentChainEqualChainOfPool, isJoined, isUserClaimed, poolInfo?.claimAt, poolInfo?.status])

  useEffect(() => {
    if (action === 'BID_OR_REGRET') {
      setBidAmount('')
      setRegretAmount('')
    }
    if (action === 'INPUT_REGRET_AMOUNT' || action === 'CONFIRM_REGRET') {
      setBidAmount('')
    }
    if (action === 'GO_TO_CHECK' || action === 'CHECK' || action === 'FIRST_BID' || action === 'MORE_BID') {
      setRegretAmount('')
    }
  }, [action])

  return (
    <Box sx={{ mt: 32 }}>
      {(action === 'GO_TO_CHECK' || action === 'FIRST_BID' || action === 'MORE_BID') && (
        <Bid
          action={action}
          bidAmount={bidAmount}
          setBidAmount={setBidAmount}
          handleGoToCheck={() => {
            setAction('CHECK')
          }}
          handleCancelButtonClick={() => {
            setAction('BID_OR_REGRET')
          }}
          handlePlaceBid={toBid}
          poolInfo={poolInfo}
          isBidding={placeBidSubmitted.submitted}
        />
      )}

      {action === 'CHECK' && (
        <Check
          onConfirm={() => {
            setAction(isJoined ? 'MORE_BID' : 'FIRST_BID')
          }}
        />
      )}

      {action === 'BID_OR_REGRET' && (
        <BidOrRegret
          onBidButtonClick={() => {
            setAction('MORE_BID')
          }}
          onRegretButtonClick={() => {
            setAction('INPUT_REGRET_AMOUNT')
          }}
          hideRegret={ChainId.ZKSYNC_ERA === poolInfo.ethChainId}
        />
      )}

      {action === 'INPUT_REGRET_AMOUNT' && (
        <InputRegretAmount
          regretAmount={regretAmount}
          slicedRegretAmount={slicedRegretAmount}
          setRegretAmount={setRegretAmount}
          poolInfo={poolInfo}
          isRegretting={regretBidSubmitted.submitted}
          onCancel={() => {
            setAction('BID_OR_REGRET')
          }}
          onConfirm={() => {
            setAction('CONFIRM_REGRET')
          }}
        />
      )}

      {action === 'CONFIRM_REGRET' && (
        <ConfirmRegret
          poolInfo={poolInfo}
          regretAmount={regretAmount}
          onCancel={() => {
            setAction('BID_OR_REGRET')
          }}
          handleRegret={() => {
            toRegret()
          }}
          isRegretting={regretBidSubmitted.submitted}
        />
      )}

      {action === 'POOL_CLOSED_AND_NOT_JOINED' && <></>}

      {action === 'CLAIMED' && <SuccessfullyClaimedAlert />}

      {action === 'WAIT_FOR_DELAY' && <ClaimingCountdownButton claimAt={poolInfo.claimAt} getPoolInfo={getPoolInfo} />}

      {action === 'NEED_TO_CLAIM' && <ClaimButton onClick={toClaim} loading={claimBidSubmitted.submitted} />}
      {!!nftGoInfo?.data?.suspicious && <SuspiciousTips />}
    </Box>
  )
}

export default ActionBlock
