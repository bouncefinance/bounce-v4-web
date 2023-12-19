import LiveCard from 'pages/nftLottery/components/poolCard/card/liveCard'
import { PoolHeadTitle } from '../../components/poolCard/poolHeadTitle'
import BidPanel from 'pages/nftLottery/components/poolCard/bidPanel'
import { useState } from 'react'
import ClosedTip from 'pages/nftLottery/components/poolCard/closedTip'

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
