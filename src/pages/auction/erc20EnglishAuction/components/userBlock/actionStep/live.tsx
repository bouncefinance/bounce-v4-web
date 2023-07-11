import { Box, Typography, Grid } from '@mui/material'
import PoolTextItem from '../../poolTextItem'
import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'
import TokenImage from 'bounceComponents/common/TokenImage'
import { RightText } from '../../creatorBlock/auctionInfo'
import PoolInfoItem from '../../poolInfoItem'
import { PoolStatus } from 'api/pool/type'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks'
import BidBlock from '../bidBlock'
import WarningIcon from 'assets/imgs/dutchAuction/warning.png'
import UserBidHistory from '../bidHistory'
import { ActionStep, StatusBox, TipsBox } from 'pages/auction/dutchAuction/components/userBlock/right'
import { useMemo } from 'react'
import BidInput from '../../bid'
import { CurrencyAmount } from 'constants/token'
import BigNumber from 'bignumber.js'
import { useMaxSwapAmount1Limit } from 'bounceHooks/auction/useErc20EnglishAuctionCallback'

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
      <Box
        sx={{
          background: '#E1F25C',
          border: '1px solid rgba(18, 18, 18, 0.06)',
          borderRadius: '20px',
          padding: '24px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography
            sx={{
              fontFamily: `'Public Sans'`,
              fontWeight: 600,
              fontSize: 20,
              color: '#000'
            }}
          >
            {!isUserJoined ? 'Join The Pool' : 'You Joined'}
          </Typography>
          <StatusBox poolInfo={poolInfo} />
        </Box>
        <Box
          sx={{
            width: '100%',
            height: 0,
            borderBottom: `1px solid rgba(18, 18, 18, 0.2)`,
            margin: '16px 0'
          }}
        ></Box>
        <Grid container rowGap={'16px'}>
          <Grid item xs={6}>
            <PoolTextItem title={'Current Price'}>
              <>
                <Box
                  sx={{
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    fontFamily: `'Public Sans'`,
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  1
                  <TokenImage
                    sx={{
                      margin: '0 4px'
                    }}
                    src={poolInfo.token0.largeUrl}
                    alt={poolInfo.token0.symbol}
                    size={16}
                  />
                  <span
                    style={{
                      fontFamily: `'Inter'`,
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#626262'
                    }}
                  >
                    {poolInfo.token0.symbol.toUpperCase()}
                  </span>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    fontFamily: `'Public Sans'`,
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  <span
                    style={{
                      fontFamily: `'Inter'`,
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#626262'
                    }}
                  >
                    =
                  </span>
                  &nbsp; {poolInfo.currencyCurrentPrice?.toSignificant()}
                  <TokenImage
                    sx={{
                      margin: '0 4px'
                    }}
                    src={poolInfo.token1.largeUrl}
                    alt={poolInfo.token1.symbol}
                    size={16}
                  />
                  <span
                    style={{
                      fontFamily: `'Inter'`,
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#626262'
                    }}
                  >
                    {(poolInfo.token1.symbol + '').toUpperCase()}
                  </span>
                </Box>
              </>
            </PoolTextItem>
          </Grid>
          <Grid item xs={6}>
            <PoolTextItem title={'Successful sold amount'} tip={'The amount of token you successfully secured.'}>
              <>
                <Box
                  sx={{
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    fontFamily: `'Public Sans'`,
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  {poolInfo.currencySwappedAmount0?.toSignificant()}
                  <TokenImage
                    sx={{
                      margin: '0 4px'
                    }}
                    src={poolInfo.token0.largeUrl}
                    alt={poolInfo.token0.symbol}
                    size={16}
                  />
                  <span
                    style={{
                      fontFamily: `'Inter'`,
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#626262'
                    }}
                  >
                    {poolInfo.token0.symbol.toUpperCase()}
                  </span>
                </Box>
              </>
            </PoolTextItem>
          </Grid>
          <Grid item xs={6}>
            <PoolTextItem title={'Total paid amount'} tip={'Total paid amount'}>
              <>
                <Box
                  sx={{
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    fontFamily: `'Public Sans'`,
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  {poolInfo?.currencySwappedAmount1 && poolInfo?.currencySwappedAmount1?.toExact()}
                  <TokenImage
                    sx={{
                      margin: '0 4px'
                    }}
                    src={poolInfo.token1.largeUrl}
                    alt={poolInfo.token1.symbol}
                    size={16}
                  />
                  <span
                    style={{
                      fontFamily: `'Inter'`,
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#626262'
                    }}
                  >
                    {(poolInfo.token1.symbol + '').toUpperCase()}
                  </span>
                </Box>
              </>
            </PoolTextItem>
          </Grid>
        </Grid>
      </Box>
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
              new BigNumber(amount1CurrencyAmount?.toExact()).toFixed() + ' ' + poolInfo.token1.symbol.toUpperCase()}
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
              new BigNumber(amount1CurrencyAmount?.toExact()).div(poolInfo?.currencyCurrentPrice.toExact()).toFixed() +
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
