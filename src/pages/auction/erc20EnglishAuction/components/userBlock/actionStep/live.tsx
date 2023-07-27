import { Box } from '@mui/material'
import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'
import { RightText } from '../../creatorBlock/auctionInfo'
import { PoolStatus } from 'api/pool/type'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks'
import BidBlock from '../bidBlock'
import WarningIcon from 'assets/imgs/dutchAuction/warning.png'
import UserBidHistory from '../bidHistory'
import { ActionStep, TipsBox } from 'pages/auction/dutchAuction/components/userBlock/right'
import { useMemo } from 'react'
import BidInput from '../../bid'
import { CurrencyAmount } from 'constants/token'
import BigNumber from 'bignumber.js'
import { useMaxSwapAmount1Limit } from 'bounceHooks/auction/useErc20EnglishAuctionCallback'
import PoolInfoItem from 'pages/auction/dutchAuction/components/poolInfoItem'
import { formatNumberWithCommas } from 'utils'
import { PoolSaleInfo } from '../poolSaleInfo'

const Live = ({
  poolInfo,
  amount,
  setAmount,
  setActionStep
}: {
  poolInfo: Erc20EnglishAuctionPoolProp
  amount: number | string
  setAmount: (value: string) => void
  setActionStep: (actionStep: ActionStep) => void
}) => {
  const { account } = useActiveWeb3React()
  const isUserJoined = useMemo(
    () => Number(poolInfo.participant.swappedAmount0) > 0,
    [poolInfo.participant.swappedAmount0]
  )
  const amount1LimitAmount = useMaxSwapAmount1Limit(poolInfo)
  const amount1CurrencyAmount =
    poolInfo.currencyAmountStartPrice?.currency &&
    CurrencyAmount.fromAmount(poolInfo.currencyAmountStartPrice?.currency, amount)
  const userToken1Balance = useCurrencyBalance(account || undefined, poolInfo.currencyAmountEndPrice?.currency)
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
              {poolInfo.currencyAmountStartPrice?.toSignificant() + ' ' + poolInfo.token1.symbol.toUpperCase()}
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
      <Box
        sx={{
          padding: '9px 24px 0'
        }}
      >
        <PoolInfoItem title={'Bid Amount Limit'}>
          <RightText
            style={{
              color: '#E1F25C'
            }}
          >
            {amount1LimitAmount && amount1LimitAmount?.toExact() + ' ' + poolInfo.token1.symbol.toUpperCase()}
          </RightText>
        </PoolInfoItem>
      </Box>
      {/* Token you will pay */}
      <Box
        sx={{
          padding: '9px 24px'
        }}
      >
        <PoolInfoItem title={'Token You Will Pay'}>
          <RightText
            style={{
              color: '#E1F25C'
            }}
          >
            {amount1CurrencyAmount &&
              formatNumberWithCommas(new BigNumber(amount1CurrencyAmount?.toExact()).toFixed()) +
                ' ' +
                poolInfo.token1.symbol.toUpperCase()}
          </RightText>
        </PoolInfoItem>
      </Box>
      <Box
        sx={{
          padding: '0 24px 10px'
        }}
      >
        <PoolInfoItem
          title={'Token You Will Receive'}
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
              poolInfo?.currencyCurrentPrice &&
              formatNumberWithCommas(
                new BigNumber(amount1CurrencyAmount?.toExact()).div(poolInfo?.currencyCurrentPrice.toExact()).toFixed()
              ) +
                ' ' +
                poolInfo.token0.symbol.toUpperCase()}
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
        <BidBlock poolInfo={poolInfo} amount={amount + ''} handleSetActionStep={setActionStep} />
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
          The final transaction price is based on the current price obtained when the transaction is submitted, which
          may be higher than the price displayed on the page.
        </TipsBox>
      </Box>
      {/* bid history */}
      {isUserJoined && <UserBidHistory poolInfo={poolInfo} />}
    </>
  )
}
export default Live
