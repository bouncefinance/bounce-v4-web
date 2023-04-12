import { MenuItem, Select } from '@mui/material'
import FormItem from '../FormItem'
import { PoolType } from 'api/pool/type'

export default function AuctionTypeSelect({
  curPoolType,
  setCurPoolType
}: {
  curPoolType: PoolType
  setCurPoolType: (type: PoolType) => void
}) {
  return (
    <FormItem name="auctionType" label="Auction type" sx={{ width: 190 }}>
      <Select
        defaultValue={PoolType.FixedSwap}
        value={curPoolType}
        onChange={e => setCurPoolType(e.target.value as PoolType)}
      >
        <MenuItem value={PoolType.FixedSwap}>Fixed Price</MenuItem>
        <MenuItem value={PoolType.fixedSwapNft}>Fixed Swap NFT</MenuItem>
      </Select>
    </FormItem>
  )
}