import LiveCard from 'pages/nftLottery/components/poolCard/card/liveCard'
import { PoolHeadTitle } from '../../components/poolCard/poolHeadTitle'
import BidPanel from 'pages/nftLottery/components/poolCard/bidPanel'
import { useMemo, useState } from 'react'
import ClosedTip from 'pages/nftLottery/components/poolCard/closedTip'
import MobileLiveCard from 'pages/nftLottery/components/poolCard/card/mobileLiveCard'
import useBreakpoint from 'hooks/useBreakpoint'
import { WithAnimation } from 'components/WithAnimation'
import { RandomPoolStatus, RandomSelectionNFTProps, RandomSelectionNFTResultProps } from 'api/pool/type'
import { Box } from '@mui/material'
interface IProps {
  allStatus: RandomSelectionNFTResultProps
  poolInfo: RandomSelectionNFTProps
}

const BeforeOpenLottery = ({ allStatus, poolInfo }: IProps) => {
  const isSm = useBreakpoint('sm')
  const [isZoom, setIsZoom] = useState(false)
  const setZoomHandle = (zoom?: boolean) => {
    if (typeof zoom === 'boolean') {
      setIsZoom(zoom)
      return
    }
    setIsZoom(!isZoom)
  }
  const allNotInvolved = useMemo(() => {
    return !Number(poolInfo.curPlayer) && allStatus.poolStatus === RandomPoolStatus.Waiting
  }, [allStatus.poolStatus, poolInfo.curPlayer])
  return (
    <Box pt={isSm ? 48 : 120} sx={{ pb: { xs: 48, md: 120 } }}>
      <WithAnimation>
        <PoolHeadTitle allStatus={allStatus} isZoom={isZoom} allNotInvolved={allNotInvolved} />
      </WithAnimation>
      <WithAnimation>
        {!isSm && <LiveCard isZoom={isZoom} poolInfo={poolInfo} allStatus={allStatus} />}
        {isSm && <MobileLiveCard isZoom={isZoom} poolInfo={poolInfo} allStatus={allStatus} />}
      </WithAnimation>

      {(allStatus.poolStatus === RandomPoolStatus.Waiting || allStatus.poolStatus === RandomPoolStatus.Closed) && (
        <ClosedTip />
      )}

      <BidPanel setZoom={setZoomHandle} poolInfo={poolInfo} allStatus={allStatus} />
    </Box>
  )
}
export default BeforeOpenLottery
