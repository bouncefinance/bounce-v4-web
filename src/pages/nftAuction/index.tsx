import React, { useState } from 'react'
import FooterPc from 'components/Footer/FooterPc'
import TypesOfAuction from 'components/TypesOfAuction'
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
      <ArrowBanner type={'NFT'} />
      <TypesOfAuction handleViewAll={handleOpen} />
      <Notable1155 />
      <Notable721 />
      <FooterPc />
      <NftListDialog open={open} handleClose={handleClose} />
    </>
  )
}

export default NFTAcution
