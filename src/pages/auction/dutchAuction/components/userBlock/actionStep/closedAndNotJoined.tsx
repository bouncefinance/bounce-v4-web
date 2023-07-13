import { DutchAuctionPoolProp } from 'api/pool/type'
import PoolSaleInfo from '../poolSaleInfo'
const Upcoming = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
  return (
    <>
      <PoolSaleInfo poolInfo={poolInfo} />
    </>
  )
}
export default Upcoming
