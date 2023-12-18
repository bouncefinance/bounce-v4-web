import Card from 'pages/nftLottery/components/poolDetail/card/'
import { PoolHeadTitle } from '../../components/poolDetail/poolHeadTitle'
import BidPanel from './bidPanel'
const BeforeOpenLottery = () => {
  return (
    <div>
      <PoolHeadTitle />
      <Card />
      <BidPanel />
    </div>
  )
}
export default BeforeOpenLottery
