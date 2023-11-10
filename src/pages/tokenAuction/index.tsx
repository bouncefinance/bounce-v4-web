import FooterPc from 'components/Footer/FooterPc'
import TypesOfAuction from 'components/TypesOfAuction'
import ArrowBanner from '../../bounceComponents/auction/ArrowBanner'
import { NotableAuction } from '../../bounceComponents/auction/NotableAuction'
import { UpcomingAuction } from '../../bounceComponents/auction/UpcomingAuction'
import PoolListDialog from './components/listDialog'
import React, { useState } from 'react'

const TokenAuctionPage: React.FC = ({}) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  return (
    <>
      <ArrowBanner type={'Token'} />
      <TypesOfAuction handleViewAll={handleOpen} />
      <NotableAuction handleViewAll={handleOpen} />
      <UpcomingAuction handleViewAll={handleOpen} />
      <FooterPc />
      <PoolListDialog open={open} handleClose={handleClose} />
    </>
  )
}

export default TokenAuctionPage
