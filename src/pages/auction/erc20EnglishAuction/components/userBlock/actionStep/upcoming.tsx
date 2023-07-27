import { Box } from '@mui/material'
import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'
import { RightText } from '../../creatorBlock/auctionInfo'
import { PoolStatus } from 'api/pool/type'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks'
import BidBlock from '../bidBlock'
import BidInput from '../../bid'
import { CurrencyAmount } from 'constants/token'
import BigNumber from 'bignumber.js'
import PoolInfoItem from 'pages/auction/dutchAuction/components/poolInfoItem'
import { PoolSaleInfo } from '../poolSaleInfo'

const Upcoming = ({
  poolInfo,
  amount,
  setAmount
}: {
  poolInfo: Erc20EnglishAuctionPoolProp
  amount: number | string
  setAmount: (value: string) => void
}) => {
  const { account } = useActiveWeb3React()
  const userToken1Balance = useCurrencyBalance(account || undefined, poolInfo.currencyAmountEndPrice?.currency)
  const amount1CurrencyAmount =
    poolInfo.currencyAmountStartPrice?.currency &&
    CurrencyAmount.fromAmount(poolInfo.currencyAmountStartPrice?.currency, amount)
  return (
    <>
      <PoolSaleInfo poolInfo={poolInfo} />
      {/* Current bid price & Bid Amount */}
      <Box
        sx={{
          padding: '30px 24px 0'
        }}
      >
        <PoolInfoItem
          title={'Current bid price'}
          sx={{
            marginBottom: '9px'
          }}
        >
          {poolInfo.status === PoolStatus.Upcoming && (
            <RightText
              style={{
                color: '#E1F25C'
              }}
            >
              {poolInfo.currencyCurrentPrice?.toSignificant() + ' ' + poolInfo.token1.symbol.toUpperCase()}
            </RightText>
          )}
          {poolInfo.status !== PoolStatus.Upcoming && (
            <RightText
              style={{
                color: '#E1F25C'
              }}
            >
              {poolInfo.currencyCurrentPrice?.toSignificant() + ' ' + poolInfo.token1.symbol.toUpperCase()}
            </RightText>
          )}
        </PoolInfoItem>
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
            {amount1CurrencyAmount &&
              new BigNumber(amount1CurrencyAmount?.toSignificant()).toFixed() +
                ' ' +
                poolInfo.token1.symbol.toUpperCase()}
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
        <BidBlock poolInfo={poolInfo} amount={amount + ''} />
        {/* success tips */}
      </Box>
    </>
  )
}
export default Upcoming
