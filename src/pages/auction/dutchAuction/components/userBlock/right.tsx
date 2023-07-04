import { Box, Typography, Grid } from '@mui/material'
import { PoolStatus } from 'api/pool/type'
import { useCountDown } from 'ahooks'
import PoolTextItem from '../poolTextItem'
import TokenImage from 'bounceComponents/common/TokenImage'
import PoolInfoItem from '../poolInfoItem'
import { RightText } from '../creatorBlock/auctionInfo'
import { useState } from 'react'
import SuccessIcon from 'assets/imgs/dutchAuction/success.png'
import WarningIcon from 'assets/imgs/dutchAuction/warning.png'
import UserBidHistory from './bidHistory'
import { DutchAuctionPoolProp } from 'api/pool/type'
import { useIsUserJoinedDutchPool } from 'bounceHooks/auction/useIsUserJoinedPool'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks'
import Bid from '../bid'
import JSBI from 'jsbi'
import { useDuctchCurrentPriceAndAmout1, AmountAndCurrentPriceParam } from 'bounceHooks/auction/useDutchAuctionInfo'
import BidBlock from './bidBlock'
const StatusBox = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
  const { status, openAt, closeAt, claimAt } = poolInfo
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate:
      status === PoolStatus.Upcoming
        ? openAt * 1000
        : status === PoolStatus.Live
        ? closeAt * 1000
        : status === PoolStatus.Closed
        ? claimAt * 1000
        : undefined
  })
  switch (status) {
    case PoolStatus.Upcoming:
      return (
        <Box
          sx={{
            height: '25px',
            lineHeight: '25px',
            padding: '0 12px',
            bgcolor: '#D7D6D9',
            borderRadius: '100px',
            backdropFilter: 'blur(2px)',
            fontFamily: `'Inter'`,
            color: '#626262'
          }}
        >
          {countdown > 0 ? `Upcoming in ${days}d : ${hours}h : ${minutes}m : ${seconds}s` : 'Upcoming'}
        </Box>
      )
    case PoolStatus.Live:
      return (
        <Box
          sx={{
            height: '25px',
            lineHeight: '25px',
            padding: '0 12px',
            bgcolor: '#CFF8D1',
            borderRadius: '100px',
            backdropFilter: 'blur(2px)',
            fontFamily: `'Inter'`,
            color: '#30A359'
          }}
        >
          {countdown > 0 ? `Live ${days}d : ${hours}h : ${minutes}m : ${seconds}s` : 'Upcoming'}
        </Box>
      )
    case PoolStatus.Closed:
    case PoolStatus.Cancelled:
      return (
        <Box
          sx={{
            height: '25px',
            lineHeight: '25px',
            padding: '0 12px',
            bgcolor: '#D6DFF6',
            borderRadius: '100px',
            backdropFilter: 'blur(2px)',
            fontFamily: `'Inter'`,
            color: '#2B51DA'
          }}
        >
          Closed
        </Box>
      )
    default:
      return <></>
  }
}
const TipsBox = ({
  style,
  children,
  iconUrl,
  imgStyle
}: {
  iconUrl?: string
  style?: React.CSSProperties
  children?: string
  imgStyle?: React.CSSProperties
}) => (
  <Box
    sx={{
      display: 'flex',
      flexFlow: 'row nowrap',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: '100%',
      borderRadius: 8,
      border: '1px solid #626262',
      padding: '16px 24px',
      ...style
    }}
  >
    <img
      src={iconUrl}
      style={{ width: '24px', marginRight: '12px', verticalAlign: 'middle', ...imgStyle }}
      alt=""
      srcSet=""
    />
    <Typography
      variant="body1"
      sx={{
        fontFamily: `'Inter'`,
        fontSize: '13px',
        color: '#959595'
      }}
    >
      {children}
    </Typography>
  </Box>
)
const RightBox = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
  const isUserJoined = useIsUserJoinedDutchPool(poolInfo)
  const { account } = useActiveWeb3React()
  const [amount, setAmount] = useState('0')
  const userToken1Balance = useCurrencyBalance(account || undefined, poolInfo.currencyAmountTotal1?.currency)
  const currentPriceAndAmount1: AmountAndCurrentPriceParam = useDuctchCurrentPriceAndAmout1(amount, poolInfo)
  const bidHistory = [
    {
      amount: '2000 AUCTION',
      price: '0.25 ETH',
      date: '12 Dec 12:00'
    },
    {
      amount: '2000 AUCTION',
      price: '0.25 ETH',
      date: '12 Dec 12:00'
    },
    {
      amount: '2000 AUCTION',
      price: '0.25 ETH',
      date: '12 Dec 12:00'
    },
    {
      amount: '2000 AUCTION',
      price: '0.25 ETH',
      date: '12 Dec 12:00'
    },
    {
      amount: '2000 AUCTION',
      price: '0.25 ETH',
      date: '12 Dec 12:00'
    },
    {
      amount: '2000 AUCTION',
      price: '0.25 ETH',
      date: '12 Dec 12:00'
    },
    {
      amount: '2000 AUCTION',
      price: '0.25 ETH',
      date: '12 Dec 12:00'
    },
    {
      amount: '2000 AUCTION',
      price: '0.25 ETH',
      date: '12 Dec 12:00'
    },
    {
      amount: '2000 AUCTION',
      price: '0.25 ETH',
      date: '12 Dec 12:00'
    }
  ]
  return (
    <Box
      sx={{
        width: '100%',
        background: '#20201E',
        borderRadius: '20px',
        padding: '0 0 24px'
      }}
    >
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
            <PoolTextItem title={'Current floor price'}>
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
                    {poolInfo.token0.name.toUpperCase()}
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
                  &nbsp; {poolInfo.lowestPrice?.toSignificant()}
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
                  {poolInfo?.currencyLowestBidPrice?.toExact() && poolInfo?.currencySwappedAmount0?.toExact()
                    ? JSBI.multiply(
                        JSBI.BigInt(poolInfo?.currencyLowestBidPrice?.toExact()),
                        JSBI.BigInt(poolInfo?.currencySwappedAmount0?.toExact())
                      ).toString()
                    : '0'}
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
              {poolInfo.highestPrice?.toSignificant() + ' ' + poolInfo.token1.symbol.toUpperCase()}
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
            Balance: {userToken1Balance?.toSignificant()} {poolInfo.token1.symbol}
          </RightText>
        </PoolInfoItem>
      </Box>
      <Bid poolInfo={poolInfo} amount={amount} setAmount={setAmount} />
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
      <Box
        sx={{
          padding: '0 24px '
        }}
      >
        <BidBlock poolInfo={poolInfo} />
        {poolInfo.status === PoolStatus.Live && (
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
        )}
        {poolInfo.participant.claimed && (
          <TipsBox
            iconUrl={SuccessIcon}
            style={{
              marginTop: '16px'
            }}
          >
            You have successfully claimed your tokens. See you next time!
          </TipsBox>
        )}
      </Box>
      {poolInfo.status === PoolStatus.Closed && bidHistory.length > 0 && <UserBidHistory list={bidHistory} />}
    </Box>
  )
}
export default RightBox
