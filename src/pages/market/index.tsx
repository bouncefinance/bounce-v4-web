import React from 'react'
import FooterPc from 'components/Footer/FooterPc'
import ArrowBanner from '../../bounceComponents/auction/ArrowBanner'
import { AuctionRankCard } from '../../bounceComponents/common/AuctionCard/AuctionRankCard'
import { ActiveUser } from '../../bounceComponents/common/AuctionCard/AuctionActiveCard'
import TokenAuction from '../../components/TokenAuction'
import AuctionLaunchpadCard from '../../bounceComponents/common/AuctionCard/AuctionLaunchpadCard'
const Market: React.FC = ({}) => {
  return (
    <>
      <ArrowBanner type={'All'} />
      <AuctionLaunchpadCard />
      <AuctionRankCard />
      <TokenAuction />
      <ActiveUser />
      <FooterPc />
    </>
  )
}

export default Market
