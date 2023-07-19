import { Box } from '@mui/material'
import { TipsBox } from '../right'
import { DutchAuctionPoolProp } from 'api/pool/type'
import { RightText } from '../../creatorBlock/auctionInfo'
import PoolInfoItem from '../../poolInfoItem'
import { useIsUserJoinedDutchPool } from 'bounceHooks/auction/useIsUserJoinedPool'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks'
import BidInput from '../../bid'
import { useDutchCurrentPriceAndAmount1, AmountAndCurrentPriceParam } from 'bounceHooks/auction/useDutchAuctionInfo'
import BidBlock from '../bidBlock'
import WarningIcon from 'assets/imgs/dutchAuction/warning.png'
import UserBidHistory from '../bidHistory'
import { ActionStep } from '../right'
import PoolSaleInfo from '../poolSaleInfo'
const Live = ({
  poolInfo,
  amount,
  setAmount,
  setActionStep
}: {
  poolInfo: DutchAuctionPoolProp
  amount: number | string
  setAmount: (value: string) => void
  setActionStep: (actionStep: ActionStep) => void
}) => {
  const { account } = useActiveWeb3React()
  const isUserJoined = useIsUserJoinedDutchPool(poolInfo)
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
            {amount + poolInfo.token0.symbol.toUpperCase()} ={' '}
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
        {/* bid section */}
        <BidBlock
          poolInfo={poolInfo}
          amount={amount + ''}
          currentPriceAndAmount1={currentPriceAndAmount1}
          handleSetActionStep={setActionStep}
        />
        {/* live tips */}
        <TipsBox
          iconUrl={WarningIcon}
          style={{
            marginTop: '16px',
            border: 'none',
            padding: '0',
            alignItems: 'flex-start'
          }}
          imgStyle={{
            position: 'relative',
            top: '2px',
            width: '16px'
          }}
        >
          The final price is based on the lowest price bid at the end of the auction.
        </TipsBox>
      </Box>
      {/* bid history */}
      {isUserJoined && <UserBidHistory poolInfo={poolInfo} />}
    </>
  )
}
export default Live
