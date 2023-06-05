import PoolInfoItem from '../../PoolInfoItem'
import { FixedSwapPoolProp } from 'api/pool/type'

const BidAmountLimit = ({ poolInfo }: { poolInfo: FixedSwapPoolProp }) => {
  const userSwappedUnits1GteToken1Allocation = !poolInfo.currencyMaxAmount1PerWallet.greaterThan(
    poolInfo.participant.currencySwappedAmount1 || '0'
  )

  return (
    <PoolInfoItem
      title="Bid amount limit"
      sx={{ mt: 8, color: userSwappedUnits1GteToken1Allocation ? '#F53030' : 'black' }}
    >
      {poolInfo.participant.currencySwappedAmount1?.toSignificant()} {poolInfo.token1.symbol} /{' '}
      {poolInfo.currencyMaxAmount1PerWallet.toSignificant()}&nbsp;
      {poolInfo.token1.symbol}
    </PoolInfoItem>
  )
}

export default BidAmountLimit
