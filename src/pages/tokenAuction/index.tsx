import { Box, Container } from '@mui/material'
import React from 'react'
import MarketPNG from 'assets/imgs/company/banner/market.png'
import FooterPc from 'components/Footer/FooterPc'
import TokenAuction from 'components/TokenAuction'
import TypesOfAuction from 'components/TypesOfAuction'
import HeaderTab from '../../bounceComponents/auction/HeaderTab'
import ArrowBanner, { IBanner } from '../../bounceComponents/auction/ArrowBanner'
import Photo28 from '../../assets/imgs/company/banner/photo_28_banner.jpg'
import { NotableAuction } from '../../bounceComponents/auction/NotableAuction'
import { UpcomingAuction } from '../../bounceComponents/auction/UpcomingAuction'

const TokenAuctionPage: React.FC = ({}) => {
  const testBanner: IBanner[] = [
    {
      title: 'Austin McBroom: Lover and Fighter',
      tag: ['NFT', 'English auction', '23.00 BNB'],
      countDown: '1682833200',
      pic: MarketPNG
    },
    {
      title: 'Austin McBroom: Lover and Fighter',
      tag: ['NFT', 'English auction', '23.00 BNB'],
      countDown: '1682833200',
      pic: Photo28
    }
  ]
  return (
    <>
      <Container maxWidth="lg">
        <HeaderTab onTabChange={tab => console.log(tab)} />
        <Box mt={16}>
          <ArrowBanner list={testBanner} />
        </Box>
      </Container>
      <TokenAuction />
      <TypesOfAuction />
      <NotableAuction />
      <UpcomingAuction />
      <FooterPc />
    </>
  )
}

export default TokenAuctionPage
