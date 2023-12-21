import useBreakpoint from 'hooks/useBreakpoint'
import PcBanner from '../../components/banner/pc'
import MobileBanner from '../../components/banner/mobile'
export enum AnimateStep {
  'default' = 0,
  'enter' = 1,
  'moving' = 2,
  'leave' = 3
}
const Banner = () => {
  const isSm = useBreakpoint('md')
  if (isSm) {
    return <MobileBanner />
  }
  return <PcBanner />
}
export default Banner
