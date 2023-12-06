import React from 'react'
import FooterPc from 'components/Footer/FooterPc'
import ArrowBanner from '../../bounceComponents/auction/ArrowBanner'
// import { AuctionRankCard } from '../../bounceComponents/common/AuctionCard/AuctionRankCard'
import { ActiveUser } from '../../bounceComponents/common/AuctionCard/AuctionActiveCard'
import TokenAuction from '../../components/TokenAuction'
import AuctionLaunchpadCard from '../../bounceComponents/common/AuctionCard/AuctionLaunchpadCard'
import AuctionToolBoxCard from '../../bounceComponents/common/AuctionCard/AuctionToolBoxCard'
import AuctionBotDoCard from 'bounceComponents/common/AuctionCard/AuctionBotDoCard'
import useBreakpoint from 'hooks/useBreakpoint'
const Market: React.FC = ({}) => {
  const isMd = useBreakpoint('md')
  return (
    <>
      <ArrowBanner type={'All'} />
      <AuctionLaunchpadCard />
      {/* <AuctionRankCard /> */}
      <TokenAuction />
      <AuctionToolBoxCard />
      <ActiveUser />
      {!isMd && <AuctionBotDoCard />}
      <FooterPc />
    </>
  )
}

export default Market
