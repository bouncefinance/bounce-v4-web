import React from 'react'
import FooterPc from 'components/Footer/FooterPc'
import HeaderTab from '../../bounceComponents/auction/HeaderTab'
import ArrowBanner from '../../bounceComponents/auction/ArrowBanner'
import { AuctionRankCard } from '../../bounceComponents/common/AuctionCard/AuctionRankCard'
import { ActiveUser } from '../../bounceComponents/common/AuctionCard/AuctionActiveCard'

const Market: React.FC = ({}) => {
  return (
    <>
      <HeaderTab onTabChange={tab => console.log(tab)} />
      <ArrowBanner type={'All'} />
      <AuctionRankCard />
      {/*<TokenAuction />*/}
      <ActiveUser />
      <FooterPc />
    </>
  )
}

export default Market
