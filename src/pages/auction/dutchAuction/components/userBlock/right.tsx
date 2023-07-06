import { Box, Typography } from '@mui/material'
import { PoolStatus } from 'api/pool/type'
import { useCountDown } from 'ahooks'
import { useState, useEffect, useMemo } from 'react'
import { DutchAuctionPoolProp } from 'api/pool/type'
import { useIsUserJoinedDutchPool } from 'bounceHooks/auction/useIsUserJoinedPool'
import Upcoming from './actionStep/upcoming'
import Live from './actionStep/live'
import BidConfirm from './actionStep/confirm'
import ClosedAndNotJoined from './actionStep/closedAndNotJoined'
import ClosedAndNotClaim from './actionStep/closedAndNotClaim'
import ClosedAndClaimed from './actionStep/closedAndClaimed'
export const StatusBox = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
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
export const TipsBox = ({
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
export enum ActionStep {
  'UpComing' = 1,
  'BeforeBid' = 2,
  'BidConfirm' = 3,
  'ClosedAndNotJoined' = 4,
  'ClosedAndNotClaim' = 5,
  'ClosedAndClaimed' = 6
}
const RightBox = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
  const isUserJoined = useIsUserJoinedDutchPool(poolInfo)
  const [amount, setAmount] = useState('0')
  const [actionStep, setActionStep] = useState<ActionStep>(ActionStep.UpComing)
  const isUserClaimed = useMemo(() => {
    return Number(poolInfo.participant.currencyCurClaimableAmount?.toExact()) <= 0
  }, [poolInfo.participant.currencyCurClaimableAmount])
  useEffect(() => {
    if (poolInfo.status === PoolStatus.Upcoming) {
      setActionStep(ActionStep.UpComing)
    } else if (poolInfo.status === PoolStatus.Live) {
      if (actionStep !== ActionStep.BidConfirm) {
        setActionStep(ActionStep.BeforeBid)
      }
    } else if (poolInfo.status === PoolStatus.Closed && !isUserJoined) {
      setActionStep(ActionStep.ClosedAndNotJoined)
    } else if (poolInfo.status === PoolStatus.Closed && isUserJoined && !isUserClaimed) {
      setActionStep(ActionStep.ClosedAndNotClaim)
    } else if (poolInfo.status === PoolStatus.Closed && isUserJoined && isUserClaimed) {
      setActionStep(ActionStep.ClosedAndClaimed)
    }
    return () => {}
  }, [poolInfo.status, isUserJoined, poolInfo.participant.claimed])
  const handleSetAmount = (amount: string) => {
    setAmount(amount)
  }
  const handleSetActionStep = (actionStep: ActionStep) => {
    setActionStep(actionStep)
  }
  const handleConfirm = () => {
    if (poolInfo.status === PoolStatus.Live) {
      setActionStep(ActionStep.BeforeBid)
      setAmount('0')
    }
  }
  return (
    <Box
      sx={{
        width: '100%',
        background: '#20201E',
        borderRadius: '20px',
        padding: '0 0 24px'
      }}
    >
      {actionStep === ActionStep.UpComing && (
        <Upcoming poolInfo={poolInfo} amount={amount} setAmount={handleSetAmount} />
      )}
      {actionStep === ActionStep.BeforeBid && (
        <Live poolInfo={poolInfo} amount={amount} setAmount={handleSetAmount} setActionStep={handleSetActionStep} />
      )}
      {actionStep === ActionStep.BidConfirm && (
        <BidConfirm poolInfo={poolInfo} onConfirm={handleConfirm} amount={amount} />
      )}
      {actionStep === ActionStep.ClosedAndNotJoined && <ClosedAndNotJoined poolInfo={poolInfo} />}
      {actionStep === ActionStep.ClosedAndNotClaim && (
        <ClosedAndNotClaim poolInfo={poolInfo} handleSetActionStep={handleSetActionStep} />
      )}
      {actionStep === ActionStep.ClosedAndClaimed && <ClosedAndClaimed poolInfo={poolInfo} />}
      {/* Current bid price & Bid Amount */}
      {/* {(poolInfo.status === PoolStatus.Upcoming || poolInfo.status === PoolStatus.Live) && (
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
              Balance: {userToken1Balance?.toSignificant() || '--'} {poolInfo.token1.symbol}
            </RightText>
          </PoolInfoItem>
        </Box>
      )} */}
      {/* bid input */}
      {/* {(poolInfo.status === PoolStatus.Upcoming || poolInfo.status === PoolStatus.Live) && (
        <BidInput poolInfo={poolInfo} amount={amount} setAmount={setAmount} />
      )} */}
      {/* Token you will pay */}
      {/* {(poolInfo.status === PoolStatus.Upcoming || poolInfo.status === PoolStatus.Live) && (
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
      )} */}
      {/* bid and text tips */}
      <Box
        sx={{
          padding: '0 24px '
        }}
      >
        {/* bid and section */}
        {/* {(poolInfo.status === PoolStatus.Live || poolInfo.status === PoolStatus.Upcoming) && (
          <BidBlock poolInfo={poolInfo} amount={amount} currentPriceAndAmount1={currentPriceAndAmount1} />
        )} */}
        {/* live tips */}
        {/* {poolInfo.status === PoolStatus.Live && (
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
        )} */}
        {/* Final Auction Results */}
        {/* {poolInfo.status === PoolStatus.Closed && (
          <Box
            sx={{
              width: '100%',
              margin: '30px auto 12px',
              padding: '16px',
              border: '1px solid #E1F25C',
              borderRadius: '8px'
            }}
          >
            <Typography
              sx={{
                fontFamily: `'Public Sans'`,
                color: '#fff',
                fontSize: '14px',
                fontWeight: 600
              }}
              mb={'12px'}
            >
              Final Auction Results
            </Typography>
            <PoolInfoItem title={'Final auction price'}>
              <RightText
                style={{
                  color: '#E1F25C'
                }}
              >
                {poolInfo.currencyLowestBidPrice?.toExact() || '--'} {poolInfo.token1.symbol}
              </RightText>
            </PoolInfoItem>
            <PoolInfoItem title={'Successful funds raised'}>
              <RightText
                style={{
                  color: '#E1F25C'
                }}
              >
                {poolInfo.currencySwappedTotal1?.toExact() || '--'} {poolInfo.token1.symbol}
              </RightText>
            </PoolInfoItem>
            {isUserJoined && (
              <PoolInfoItem title={'Excessive paid amount'}>
                <RightText
                  style={{
                    color: '#E1F25C'
                  }}
                >
                  {(poolInfo.participant?.currencyUnfilledAmount1?.toExact() || 0) +
                    ' ' +
                    poolInfo.token1.symbol.toUpperCase()}
                </RightText>
              </PoolInfoItem>
            )}
          </Box>
        )} */}
        {/* success tips */}
        {/* {poolInfo.status === PoolStatus.Closed && poolInfo.participant.claimed && (
          <TipsBox
            iconUrl={SuccessIcon}
            style={{
              marginTop: '16px'
            }}
          >
            You have successfully claimed your tokens. See you next time!
          </TipsBox>
        )} */}
      </Box>
      {/* bid history */}
      {/* {(poolInfo.status === PoolStatus.Closed || poolInfo.status === PoolStatus.Live) && isUserJoined && (
        <UserBidHistory poolInfo={poolInfo} />
      )} */}
    </Box>
  )
}
export default RightBox
