import { MenuItem, Select } from '@mui/material'
import { PoolType } from 'api/pool/type'
import { BackedTokenType } from 'pages/account/MyTokenOrNFT'
import { useMemo } from 'react'

export default function AuctionTypeSelect({
  curPoolType,
  setCurPoolType,
  tokenType,
  noBorder
}: {
  curPoolType: PoolType | 0
  setCurPoolType: (type: PoolType) => void
  tokenType?: BackedTokenType
  noBorder?: boolean
}) {
  const list = useMemo(() => {
    if (tokenType === BackedTokenType.TOKEN) {
      return [
        { label: 'Fixed Price', value: PoolType.FixedSwap },
        { label: 'Random Selection', value: PoolType.Lottery }
      ]
    } else if (tokenType === BackedTokenType.NFT) {
      return [{ label: 'Fixed Swap NFT', value: PoolType.fixedSwapNft }]
    }
    return [
      { label: 'Fixed Price', value: PoolType.FixedSwap },
      { label: 'Random Selection', value: PoolType.Lottery },
      { label: 'Fixed Swap NFT', value: PoolType.fixedSwapNft }
    ]
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
