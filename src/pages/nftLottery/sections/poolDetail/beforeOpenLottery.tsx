import LiveCard from 'pages/nftLottery/components/poolDetail/card/liveCard'
import { PoolHeadTitle } from '../../components/poolDetail/poolHeadTitle'
import BidPanel from 'pages/nftLottery/components/poolDetail/bidPanel'
import { useState } from 'react'
import ClosedTip from 'pages/nftLottery/components/poolDetail/closedTip'

const BeforeOpenLottery = () => {
  const [isZoom, setIsZoom] = useState(false)
  const setZoomHandle = () => {
    setIsZoom(true)
  }
  return (
    <div>
      <PoolHeadTitle />
      <LiveCard isZoom={isZoom} />
      <ClosedTip />
      <BidPanel setZoom={setZoomHandle} />
    </div>
  )
}
export default BeforeOpenLottery
