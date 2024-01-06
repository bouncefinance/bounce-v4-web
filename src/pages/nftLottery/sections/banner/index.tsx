import useBreakpoint from 'hooks/useBreakpoint'
import PcBanner from '../../components/banner/pc'
import MobileBanner from '../../components/banner/mobile'
import { RandomSelectionNFTProps } from 'api/pool/type'
import { useGetRandomSelectionNFTPoolStatus } from 'bounceHooks/auction/useRandomSelectionNFTPoolInfo'
import LotteryCountdown from '../../components/lotteryCountdown'

export enum AnimateStep {
  'default' = 0,
  'enter' = 1,
  'moving' = 2,
  'leave' = 3
}

const CountdownCp = ({ poolInfo }: { poolInfo: RandomSelectionNFTProps }) => {
  const { poolStatus } = useGetRandomSelectionNFTPoolStatus(poolInfo)
  return (
    <LotteryCountdown
      status={poolStatus}
      timeList={[poolInfo.openAt, poolInfo.closeAt, poolInfo.claimAt]}
      poolInfo={poolInfo}
    />
  )
}

const Banner = ({ poolInfo }: { poolInfo: RandomSelectionNFTProps | undefined }) => {
  const isSm = useBreakpoint('md')

  if (isSm) {
    return <MobileBanner>{poolInfo && <CountdownCp poolInfo={poolInfo} />}</MobileBanner>
  }
  return <PcBanner>{poolInfo && <CountdownCp poolInfo={poolInfo} />}</PcBanner>
}
export default Banner
