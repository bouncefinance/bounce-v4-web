import { MenuItem, Select } from '@mui/material'
import { PoolType } from 'api/pool/type'
import { BackedTokenType } from 'pages/account/MyTokenOrNFT'
import { useMemo } from 'react'
import { TokenType as ERCType } from 'bounceComponents/create-auction-pool/types'
export default function AuctionTypeSelect({
  curPoolType,
  setCurPoolType,
  tokenType,
  noBorder,
  ercType
}: {
  curPoolType: PoolType | 0
  setCurPoolType: (type: PoolType) => void
  tokenType?: BackedTokenType
  noBorder?: boolean
  ercType?: ERCType
}) {
  const list = useMemo(() => {
    if (tokenType === BackedTokenType.TOKEN) {
      return [
        { label: 'Fixed Price', value: PoolType.FixedSwap },
        { label: 'Random Selection', value: PoolType.Lottery },
        { label: 'Dutch Auction', value: PoolType.DUTCH_AUCTION },
        { label: 'ERC20 English', value: PoolType.ENGLISH_AUCTION }
      ]
    } else if (tokenType === BackedTokenType.NFT) {
      if (ercType === ERCType.ERC1155) {
        return [{ label: 'Fixed Swap NFT', value: PoolType.fixedSwapNft }]
      }
      if (ercType === ERCType.ERC721) {
        return [{ label: 'English Auction NFT', value: PoolType.ENGLISH_AUCTION_NFT }]
      }
      return [
        { label: 'Fixed Swap NFT', value: PoolType.fixedSwapNft },
        { label: 'English Auction NFT', value: PoolType.ENGLISH_AUCTION_NFT }
      ]
    }
    return [
      { label: 'Fixed Price', value: PoolType.FixedSwap },
      { label: 'Random Selection', value: PoolType.Lottery },
      { label: 'Dutch Auction', value: PoolType.DUTCH_AUCTION },
      { label: 'Fixed Swap NFT', value: PoolType.fixedSwapNft }
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tokenType])

  return (
    <Select
      sx={{
        width: [160, '200px'],
        height: 38,
        fieldset: {
          border: noBorder ? 0 : '1px solid var(--ps-text-8)'
        }
      }}
      defaultValue={PoolType.FixedSwap}
      value={curPoolType}
      onChange={e => setCurPoolType(e.target.value as PoolType)}
    >
      <MenuItem value={0}>Auction Type</MenuItem>
      {list.map(({ label, value }) => (
        <MenuItem key={value} value={value}>
          {label}
        </MenuItem>
      ))}
    </Select>
  )
}
