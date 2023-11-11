import PayAttentionAlert from '../../Alerts/PayAttentionAlert'
import ClaimYourTokenAlert from '../../Alerts/ClaimYourTokenAlert'
import AuctionClosedAlert from '../../Alerts/AuctionClosedAlert'
import NotEligibleAlert from '../../Alerts/NotEligibleAlert'
import { FixedSwapPoolProp, PoolStatus } from 'api/pool/type'
import useIsUserJoinedPool from 'bounceHooks/auction/useIsUserJoinedPool'
import { useIgnoreWhitelistPool } from 'hooks/useIgnoreWhitelistPool'

const Alert = ({ poolInfo }: { poolInfo: FixedSwapPoolProp }) => {
  const isUserJoinedPool = useIsUserJoinedPool(poolInfo)
  const isIgnoreWhitelistPool = useIgnoreWhitelistPool(poolInfo.enableWhiteList, poolInfo.contract, poolInfo.poolId)

  if (poolInfo.whitelistData?.loading) {
    return null
  }

  if (!poolInfo.whitelistData?.isUserInWhitelist && !isIgnoreWhitelistPool) {
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
