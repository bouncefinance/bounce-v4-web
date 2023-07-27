import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'
import { PoolSaleInfo } from '../poolSaleInfo'

const Upcoming = ({ poolInfo }: { poolInfo: Erc20EnglishAuctionPoolProp }) => {
  return (
    <>
      <PoolSaleInfo poolInfo={poolInfo} />
    </>
  )
}
export default Upcoming
