import { Box } from '@mui/material'
import { DutchAuctionPoolProp } from 'api/pool/type'
import { RightText } from '../../creatorBlock/auctionInfo'
import PoolInfoItem from '../../poolInfoItem'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks'
import BidInput from '../../bid'
import { useDutchCurrentPriceAndAmount1, AmountAndCurrentPriceParam } from 'bounceHooks/auction/useDutchAuctionInfo'
import BidBlock from '../bidBlock'
import PoolSaleInfo from '../poolSaleInfo'

const Upcoming = ({
  poolInfo,
  amount,
  setAmount
}: {
  poolInfo: DutchAuctionPoolProp
  amount: number | string
  setAmount: (value: string) => void
}) => {
  const { account } = useActiveWeb3React()
  const userToken1Balance = useCurrencyBalance(account || undefined, poolInfo.currencyAmountTotal1?.currency)
  const currentPriceAndAmount1: AmountAndCurrentPriceParam = useDutchCurrentPriceAndAmount1(amount, poolInfo)
  return (
    <>
      <PoolSaleInfo poolInfo={poolInfo} />
      {/* Current bid price & Bid Amount */}
      <Box
        sx={{
          padding: '30px 24px 0'
        }}
      >
        <PoolInfoItem title={'Bid Amount'}>
          <RightText
            style={{
              color: '#E1F25C'
            }}
          >
            Balance: {userToken1Balance?.toSignificant() || '--'} {poolInfo.token1.symbol}
          </RightText>
        </PoolInfoItem>
      </Box>
      {/* bid input */}
      <BidInput poolInfo={poolInfo} amount={amount + ''} setAmount={setAmount} />
      {/* Token you will pay */}
      <Box
        sx={{
          padding: '12px 24px 30px'
        }}
      >
        <PoolInfoItem
          title={'Token you will pay'}
          sx={{
            marginBottom: '9px'
          }}
        >
          <RightText
            style={{
              color: '#E1F25C'
            }}
          >
            {currentPriceAndAmount1.amount1 + ' ' + poolInfo.token1.symbol.toUpperCase()}
          </RightText>
        </PoolInfoItem>
      </Box>
      {/* bid and text tips */}
      <Box
        sx={{
          padding: '0 24px '
        }}
      >
        {/* bid and section */}
        <BidBlock poolInfo={poolInfo} amount={amount + ''} currentPriceAndAmount1={currentPriceAndAmount1} />
        {/* success tips */}
      </Box>
    </>
  )
}
export default Upcoming
