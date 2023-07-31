import { useMemo, useState } from 'react'
import { Box, Typography } from '@mui/material'
import TestIcon from '../NFTCard/emptyCollectionIcon.png'
import { UserNFTCollection } from 'api/user/type'
import { ReactComponent as ArrowIcon } from 'assets/imgs/components/arrow.svg'
import Image from 'components/Image'
import { Response1155Token } from 'bounceHooks/auction/use1155TokenList'

export interface BasicToken {
  address: string
  symbol: string
  name: string
  decimals: number
}

export interface CollectionProps {
  list?: Response1155Token
  onSelected?: (data: UserNFTCollection[]) => void
}
const CollectionSelect = (props: CollectionProps) => {
  const { list, onSelected } = useMemo(() => props, [props])
  const [selectedItem, setSelectedItem] = useState<UserNFTCollection | null>(null)
  const [selectedLength, setSelectedLength] = useState<number>(0)
  const [openSelect, setOpenSelect] = useState(false)
  interface SelectRowProps {
    item: UserNFTCollection
    onClick?: () => void
    len?: number
  }
  const SelectRow = (props: SelectRowProps) => {
    const { item, onClick, len } = props
    return (
      <Box
        sx={{
          width: '100%',
          height: '60px',
          padding: '10px 30px',
          margin: '0 auto',
          cursor: 'pointer',
          display: 'flex',
          flexFlow: 'row nowrap',
          alignItems: 'center',
          '&:hover': {
            background: '#F5F5F5'
          }
        }}
        onClick={onClick}
      >
        <Image
          style={{
            display: 'block',
            objectFit: 'cover',
            marginRight: '10px'
          }}
          width={32}
          height={32}
          altSrc={TestIcon}
          src={item.image || TestIcon}
          alt={'nft'}
        />
        <Box
          sx={{
            flex: 'none',
            width: { xs: 'calc(100% - 32px)', md: '100%' }
          }}
        >
          <Typography
            component="h1"
            sx={{
              fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
              fontWeight: 'bold',
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
            {`${item.contractName || '--'}(${len})`}
          </Typography>
          <Typography
            component="h1"
            sx={{
              fontFamily: 'Sharp Grotesk DB Cyr Book 20',
              fontWeight: 400,
              fontSize: 14,
              height: '20px',
              lineHeight: '20px',
              color: '#4B4B4B',
              width: '100%',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis'
            }}
          >
            {item.contractAddr || '--'}
          </Typography>
        </Box>
      </Box>
    )
  }
  return (
    <Box
      sx={{
        position: 'relative',
        maxWidth: 600,
        width: '100%',
        height: 60,
        margin: '0 auto 33px'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '350px',
          maxHeight: openSelect ? '350px' : '0px',
          overflow: 'hidden',
          transition: 'max-height 0.6s padding 1s',
          width: '100%',
          boxSizing: 'border-box',
          zIndex: openSelect ? 1 : 'unset',
          border: openSelect ? '1px solid #D7D6D9' : 'none',
          borderRadius: 20,
          padding: openSelect ? '80px 0 0' : '0',
          background: '#fff'
        }}
        onMouseLeave={() => setOpenSelect(false)}
        onMouseEnter={() => setOpenSelect(true)}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            overflowX: 'hidden',
            padding: '0 10px 30px',
            overflowY: 'auto',
            '&::-webkit-scrollbar-thumb': {
              background: '#D8DBE7',
              borderRadius: '6px'
            },
            '&::-webkit-scrollbar': {
              width: '6px',
              borderRadius: '6px',
              background: '#fff'
            }
          }}
        >
          {list &&
            Object.keys(list).map((key, index) => {
              const item = list[key] as UserNFTCollection[]
              const firstChild = item[0]
              return (
                <SelectRow
                  key={index}
                  item={firstChild}
                  len={item.length}
                  onClick={() => {
                    setOpenSelect(false)
                    onSelected && onSelected(item)
                    setSelectedItem(firstChild)
                    setSelectedLength(item.length)
                  }}
                />
              )
            })}
        </Box>
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 60,
          lineHeight: '60px',
          border: '1px solid #D7D6D9',
          borderRadius: 20,
          padding: '0 20px',
          fontFamily: 'Sharp Grotesk DB Cyr Book 20',
          fontWeight: 400,
          fontSize: '14px',
          color: '#878A8E',
          cursor: 'pointer',
          zIndex: 2
        }}
        onClick={() => {
          setOpenSelect(!openSelect)
        }}
      >
        {!selectedItem && (
          <>
            Select collection ({list ? Object.keys(list).length : 0} items)
            <ArrowIcon
              style={{
                position: 'absolute',
                right: 22,
                top: '50%',
                transform: openSelect ? 'translateY(-50%) rotateZ(-180deg)' : 'translateY(-50%)'
              }}
            />
          </>
        )}
        {selectedItem && (
          <>
            <SelectRow item={selectedItem} len={selectedLength} />
            <ArrowIcon
              style={{
                position: 'absolute',
                right: 22,
                top: '50%',
                transform: openSelect ? 'translateY(-50%) rotateZ(-180deg)' : 'translateY(-50%)'
              }}
            />
          </>
        )}
      </Box>
    </Box>
  )
}

export default CollectionSelect
