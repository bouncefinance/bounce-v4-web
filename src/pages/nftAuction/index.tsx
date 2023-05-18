import React, { useState } from 'react'
import FooterPc from 'components/Footer/FooterPc'
import TypesOfAuction from 'components/TypesOfAuction'
import HeaderTab from 'bounceComponents/auction/HeaderTab'
import NftListDialog from './components/listDialog'
import { Notable1155 } from '../../bounceComponents/auction/Notable1155'
import ArrowBanner from '../../bounceComponents/auction/ArrowBanner'
import { Notable721 } from '../../bounceComponents/auction/Notable721'

const NFTAcution: React.FC = ({}) => {
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    setOpen(true)
  }
  return (
    <>
      <HeaderTab />
      <ArrowBanner type={'NFT'} />
      <TypesOfAuction />
      <Notable1155 handleViewAll={handleOpen} />
      <Notable721 handleViewAll={handleOpen} />
      <FooterPc />
      <NftListDialog open={open} handleClose={handleClose} />
    </>
  )
}

export default NFTAcution
