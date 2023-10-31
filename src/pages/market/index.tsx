import React from 'react'
import FooterPc from 'components/Footer/FooterPc'
import ArrowBanner from '../../bounceComponents/auction/ArrowBanner'
import { AuctionRankCard } from '../../bounceComponents/common/AuctionCard/AuctionRankCard'
import { ActiveUser } from '../../bounceComponents/common/AuctionCard/AuctionActiveCard'
import TokenAuction from '../../components/TokenAuction'

const Market: React.FC = ({}) => {
  return (
    <>
      <ArrowBanner type={'All'} />
      <AuctionRankCard />
      <TokenAuction />
      <ActiveUser />
      <FooterPc />
    </>
  )
}

export default Market
