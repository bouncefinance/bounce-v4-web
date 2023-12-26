import LiveCard from 'pages/nftLottery/components/poolCard/card/liveCard'
import { PoolHeadTitle } from '../../components/poolCard/poolHeadTitle'
import BidPanel from 'pages/nftLottery/components/poolCard/bidPanel'
import { useState } from 'react'
import ClosedTip from 'pages/nftLottery/components/poolCard/closedTip'
import MobileLiveCard from 'pages/nftLottery/components/poolCard/card/mobileLiveCard'
import useBreakpoint from 'hooks/useBreakpoint'
import { WithAnimation } from 'components/WithAnimation'
import { RandomSelectionNFTProps } from 'api/pool/type'
const BeforeOpenLottery = ({ poolInfo }: { poolInfo: RandomSelectionNFTProps }) => {
  const isSm = useBreakpoint('sm')
  const [isZoom, setIsZoom] = useState(false)
  const setZoomHandle = () => {
    setIsZoom(true)
  }
  return (
    <div>
      <WithAnimation>
        <PoolHeadTitle />
      </WithAnimation>
      <WithAnimation>
        {!isSm && <LiveCard isZoom={isZoom} />}
        {isSm && <MobileLiveCard isZoom={isZoom} />}
      </WithAnimation>
      <ClosedTip />
      <BidPanel setZoom={setZoomHandle} poolInfo={poolInfo} />
    </div>
  )
}
export default BeforeOpenLottery
