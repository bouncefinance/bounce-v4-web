import React from 'react'
import { Box, Typography } from '@mui/material'
import Image from 'components/Image'
import EmptyCollectionIcon from './emptyCollectionIcon.png'
import { UserNFTCollection } from 'api/user/type'

import { ReactComponent as SelectedIcon } from 'assets/imgs/components/seleced.svg'
interface NftCardProps {
  nft: UserNFTCollection
  isSelect: boolean
  handleClick: () => void
  style?: React.CSSProperties
}
const NFTCard = (props: NftCardProps) => {
  const { balance, name, contractName, tokenId, image } = props.nft
  const { handleClick, isSelect, style } = props
  console.log('image', image)

  return (
    <Box
      sx={{
        position: 'relative',
        width: 170,
        height: 220,
        background: '#FFFFFF',
        border: '1px solid rgba(23, 23, 23, 0.1)',
        borderRadius: '10px',
        overflow: 'hidden',
        boxSizing: 'border-box',
        cursor: 'pointer',
        '&:hover': {
          border: '1px solid #2B51DA'
        },
        ...style
      }}
      onClick={handleClick}
    >
      <Image
        style={{
          display: 'block',
          objectFit: 'cover'
        }}
        width={170}
        height={170}
        altSrc={EmptyCollectionIcon}
        src={image || EmptyCollectionIcon}
        alt={'nft'}
      />
      <Box
        sx={{
          position: 'absolute',
          left: 8,
          top: 8,
          height: 22,
          lineHeight: '22px',
          textAlign: 'center',
          padding: '0 8px',
          background: '#2B51DA',
          borderRadius: '100px',
          fontFamily: 'Sharp Grotesk DB Cyr Book 20',
          color: '#fff'
        }}
      >
        x{balance}
      </Box>
      <Box
        sx={{
          height: 50,
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          padding: '0 16px'
        }}
      >
        <Typography
          component="h1"
          sx={{
            fontFamily: 'Sharp Grotesk DB Cyr Book 20',
            fontWeight: 400,
            fontSize: 14,
            height: '18px',
            lineHeight: '18px',
            color: '#171717',
            width: '100%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          }}
        >
          {contractName || name}
        </Typography>
        <Typography
          component="h1"
          sx={{
            fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
            fontWeight: 400,
            fontSize: 14,
            height: '20px',
            lineHeight: '20px',
            color: '#171717',
            width: '100%',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis'
          }}
        >
          ID:{tokenId ? (tokenId.length > 8 ? `${tokenId.slice(0, 5)}...${tokenId.slice(-5)}` : tokenId) : '--'}
        </Typography>
      </Box>
      {isSelect && (
        <SelectedIcon
          style={{
            position: 'absolute',
            right: 8,
            top: 8
          }}
        />
      )}
    </Box>
  )
}

export default NFTCard
