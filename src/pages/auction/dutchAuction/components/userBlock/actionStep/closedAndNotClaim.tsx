import { DutchAuctionPoolProp } from 'api/pool/type'
import UserBidHistory from '../bidHistory'
import ClaimBlock from '../claimBlock'
import { ActionStep } from '../right'
import PoolSaleInfo from '../poolSaleInfo'
import UserFinalAuctionResult from '../userFinalAuctionResult'
const ClosedAndNotClaimed = ({
  poolInfo,
  handleSetActionStep
}: {
  poolInfo: DutchAuctionPoolProp
  handleSetActionStep?: (actionStep: ActionStep) => void
}) => {
  return (
    <>
      <PoolSaleInfo poolInfo={poolInfo} />
      <UserFinalAuctionResult poolInfo={poolInfo} />
      <ClaimBlock isErc20EnglishAuction={false} poolInfo={poolInfo} handleSetActionStep={handleSetActionStep} />
      {/* bid history */}
      <UserBidHistory poolInfo={poolInfo} />
    </>
  )
}
export default ClosedAndNotClaimed
