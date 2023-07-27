import { useCallback, useEffect, useMemo, useState } from 'react'
import { Box, Button } from '@mui/material'
import moment from 'moment'
import SuccessfullyClaimedAlert from '../../Alerts/SuccessfullyClaimedAlert'
import BidOrRegret from './BidOrRegret'
import Check from './Check'
import InputRegretAmount from './InputRegretAmount'
import ConfirmRegret from './ConfirmRegret'
import Bid from './Bid'
import ClaimingCountdownButton from './ClaimingCountdownButton'
import ClaimButton from './ClaimButton'
import usePlaceBid from 'bounceHooks/auction/usePlaceBid'
import useRegretBid from 'bounceHooks/auction/useRegretBid'
import useIsUserJoinedPool from 'bounceHooks/auction/useIsUserJoinedPool'
import { FixedSwapPoolProp, PoolStatus } from 'api/pool/type'
import useUserClaim from 'bounceHooks/auction/useUserClaim'
import { fixToDecimals, formatNumber } from 'utils/number'
import { useActiveWeb3React } from 'hooks'
import { hideDialogConfirmation, showRequestConfirmDialog, showWaitingTxDialog } from 'utils/auction'
import { CurrencyAmount } from 'constants/token'
import { show } from '@ebay/nice-modal-react'
import DialogTips from 'bounceComponents/common/DialogTips'
import { BigNumber } from 'bignumber.js'
import { IReleaseType } from 'bounceComponents/create-auction-pool/types'

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
  v2Data: {
    poolVersion: number | undefined
    releaseType: IReleaseType | undefined
    v2ParticipantClaimable: boolean
  },
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
      }
      if (v2Data.poolVersion === 1) {
        if (moment().unix() > (claimAt || 0)) {
          return 'NEED_TO_CLAIM'
        }
        return 'WAIT_FOR_DELAY'
      }
      if (v2Data.releaseType === IReleaseType.Instant) {
        return 'CLAIMED'
      }
      if (v2Data.v2ParticipantClaimable) {
        return 'NEED_TO_CLAIM'
      }
      return 'WAIT_FOR_DELAY'
    } else {
      return 'POOL_CLOSED_AND_NOT_JOINED'
    }
  }
  return 'GO_TO_CHECK'
}

export type UserBidAction = 'GO_TO_CHECK' | 'FIRST_BID' | 'MORE_BID'

const ActionBlock = ({ poolInfo, getPoolInfo }: { poolInfo: FixedSwapPoolProp; getPoolInfo: () => void }) => {
  const { chainId } = useActiveWeb3React()

  const isCurrentChainEqualChainOfPool = useMemo(() => chainId === poolInfo.ethChainId, [chainId, poolInfo.ethChainId])

  const isJoined = useIsUserJoinedPool(poolInfo)
  const isUserClaimed = useMemo(() => !!poolInfo.participant.claimed, [poolInfo])

  const [action, setAction] = useState<UserAction>()
  const [bidAmount, setBidAmount] = useState('')
  const [regretAmount, setRegretAmount] = useState('')

  const slicedBidAmount = bidAmount ? fixToDecimals(bidAmount, poolInfo.token1.decimals).toString() : ''
  const slicedRegretAmount = regretAmount ? fixToDecimals(regretAmount, poolInfo.token0.decimals).toString() : ''

  const currencyBidAmount = CurrencyAmount.fromAmount(poolInfo.currencyAmountTotal1.currency, slicedBidAmount)
  const currencyRegretAmount = CurrencyAmount.fromAmount(poolInfo.currencyAmountTotal0.currency, slicedRegretAmount)

  const { swapCallback: bid, swapPermitCallback, submitted: placeBidSubmitted } = usePlaceBid(poolInfo)

  const toBid = useCallback(async () => {
    if (!currencyBidAmount) return
    showRequestConfirmDialog()
    try {
      const func = poolInfo.enableWhiteList && poolInfo.whitelistData?.isPermit ? swapPermitCallback : bid
      const { transactionReceipt } = await func(currencyBidAmount)
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
            content: `You have successfully bid ${formatNumber(
              new BigNumber(currencyBidAmount.toSignificant(64, { groupSeparator: '' })).div(poolInfo.ratio),
              {
                unit: 0
              }
            )} ${poolInfo.token0.symbol}`
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
  }, [
    bid,
    currencyBidAmount,
    poolInfo.enableWhiteList,
    poolInfo.ratio,
    poolInfo.token0.symbol,
    poolInfo.whitelistData?.isPermit,
    swapPermitCallback
  ])

  const { run: regret, submitted: regretBidSubmitted } = useRegretBid(poolInfo)

  const toRegret = useCallback(async () => {
    if (!currencyRegretAmount) return
    showRequestConfirmDialog()
    try {
      const { transactionReceipt } = await regret(currencyRegretAmount)
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
            content: 'You have successfully refunded.'
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
  }, [currencyRegretAmount, regret])

  const { run: claim, submitted: claimBidSubmitted } = useUserClaim(poolInfo)

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

          const content =
            poolInfo.poolVersion === 1
              ? `You have successfully claimed ${poolInfo.participant.currencySwappedAmount0?.toSignificant()} ${
                  poolInfo.token0.symbol
                }`
              : `You have successfully claimed ${poolInfo.participant.currencyCurClaimableAmount?.toSignificant()} ${
                  poolInfo.token0.symbol
                }`

          show(DialogTips, {
            iconType: 'success',
            againBtn: 'Close',
            title: 'Congratulations!',
            content
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
  }, [
    claim,
    poolInfo.participant.currencyCurClaimableAmount,
    poolInfo.participant.currencySwappedAmount0,
    poolInfo.poolVersion,
    poolInfo.token0.symbol
  ])

  const v2ParticipantClaimable = useMemo(() => {
    if (poolInfo.participant.currencyCurClaimableAmount?.greaterThan('0')) {
      return true
    }
    return false
  }, [poolInfo.participant.currencyCurClaimableAmount])

  useEffect(() => {
    if (!isCurrentChainEqualChainOfPool) {
      setAction('GO_TO_CHECK')
      return
    }

    setAction(
      getInitialAction(
        {
          poolVersion: poolInfo.poolVersion,
          releaseType: poolInfo.releaseType,
          v2ParticipantClaimable
        },
        isJoined,
        isUserClaimed,
        poolInfo?.status,
        poolInfo?.claimAt
      )
    )
  }, [
    isCurrentChainEqualChainOfPool,
    isJoined,
    isUserClaimed,
    poolInfo?.claimAt,
    poolInfo.poolVersion,
    poolInfo.releaseType,
    poolInfo?.status,
    v2ParticipantClaimable
  ])

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
    console.log('action')
    console.log(action)
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
          hideRegret={!poolInfo.enableReverses || poolInfo.releaseType === IReleaseType.Instant}
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

      {action === 'WAIT_FOR_DELAY' && (
        <>
          {poolInfo.poolVersion === 1 || poolInfo.releaseType === IReleaseType.Cliff ? (
            <ClaimingCountdownButton claimAt={poolInfo.claimAt} getPoolInfo={getPoolInfo} />
          ) : (
            <Button variant="contained" fullWidth sx={{ px: 36 }} disabled>
              Waiting for token release.
            </Button>
          )}
        </>
      )}

      {action === 'NEED_TO_CLAIM' && <ClaimButton onClick={toClaim} loading={claimBidSubmitted.submitted} />}
    </Box>
  )
}

export default ActionBlock
