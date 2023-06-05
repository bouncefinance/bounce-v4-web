import PayAttentionAlert from '../../Alerts/PayAttentionAlert'
import ClaimYourTokenAlert from '../../Alerts/ClaimYourTokenAlert'
import AuctionClosedAlert from '../../Alerts/AuctionClosedAlert'
import NotEligibleAlert from '../../Alerts/NotEligibleAlert'
import { FixedSwapPoolProp, PoolStatus } from 'api/pool/type'
import useIsUserInWhitelist from 'bounceHooks/auction/useIsUserInWhitelist'
import useIsUserJoinedPool from 'bounceHooks/auction/useIsUserJoinedPool'

const Alert = ({ poolInfo }: { poolInfo: FixedSwapPoolProp }) => {
  const { data: isUserInWhitelist, loading: isCheckingWhitelist } = useIsUserInWhitelist(poolInfo, poolInfo.category)
  const isUserJoinedPool = useIsUserJoinedPool(poolInfo)

  if (isCheckingWhitelist) {
    return null
  }

  if (typeof isUserInWhitelist !== 'undefined' && !isUserInWhitelist) {
    return <NotEligibleAlert />
  }

  if (poolInfo.status === PoolStatus.Live || poolInfo.status === PoolStatus.Upcoming) {
    return <PayAttentionAlert />
  }

  if ((poolInfo.status === PoolStatus.Closed || poolInfo.status === PoolStatus.Cancelled) && !isUserJoinedPool) {
    return <AuctionClosedAlert />
  }

  if (poolInfo.status === PoolStatus.Closed && poolInfo.participant.swappedAmount0 && !poolInfo.participant.claimed) {
    return <ClaimYourTokenAlert />
  }

  return null
}

export default Alert
