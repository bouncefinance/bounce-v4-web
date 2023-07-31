import { Box, Typography } from '@mui/material'
import { Erc20EnglishAuctionPoolProp, PoolStatus } from 'api/pool/type'
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
import { useActiveWeb3React } from 'hooks'
import ConnectWalletButton from 'bounceComponents/fixed-swap/ActionBox/CreatorActionBox/ConnectWalletButton'
import SwitchNetworkButton from 'bounceComponents/fixed-swap/SwitchNetworkButton'
import PoolSaleInfo from './poolSaleInfo'

export const StatusBox = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp | Erc20EnglishAuctionPoolProp }) => {
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
          {countdown > 0 ? `Live ${days}d : ${hours}h : ${minutes}m : ${seconds}s` : 'Closed'}
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
  const { claimAt } = poolInfo
  const [countdown] = useCountDown({
    targetDate: claimAt * 1000
  })
  const { account, chainId } = useActiveWeb3React()
  const isCurrentChainEqualChainOfPool = useMemo(() => chainId === poolInfo.ethChainId, [chainId, poolInfo.ethChainId])
  const isUserJoined = useIsUserJoinedDutchPool(poolInfo)
  const [amount, setAmount] = useState('0')
  const [actionStep, setActionStep] = useState<ActionStep>(ActionStep.UpComing)
  const isUserClaimed = useMemo(() => {
    return countdown === 0 && Number(poolInfo.participant.currencyCurClaimableAmount?.toExact()) <= 0
  }, [poolInfo.participant.currencyCurClaimableAmount, countdown])
  useEffect(() => {
    if (poolInfo.status === PoolStatus.Upcoming) {
      setActionStep(ActionStep.UpComing)
    } else if (poolInfo.status === PoolStatus.Live) {
      if (actionStep !== ActionStep.BidConfirm) {
        setActionStep(ActionStep.BeforeBid)
      }
    } else if ((poolInfo.status === PoolStatus.Closed && !isUserJoined) || poolInfo.status === PoolStatus.Cancelled) {
      setActionStep(ActionStep.ClosedAndNotJoined)
    } else if (poolInfo.status === PoolStatus.Closed && isUserJoined && !isUserClaimed) {
      setActionStep(ActionStep.ClosedAndNotClaim)
    } else if (poolInfo.status === PoolStatus.Closed && isUserJoined && isUserClaimed) {
      setActionStep(ActionStep.ClosedAndClaimed)
    }
    return () => {}
  }, [poolInfo.status, isUserJoined, poolInfo.participant.claimed, isUserClaimed, actionStep])
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
  if (!account) {
    return (
      <Box
        sx={{
          width: '100%',
          background: '#20201E',
          borderRadius: '20px',
          padding: '0 0 24px',
          minHeight: '453px',
          display: 'flex',
          flexFlow: 'column nowrap'
        }}
      >
        <PoolSaleInfo poolInfo={poolInfo} />
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center'
          }}
        >
          <ConnectWalletButton />
        </Box>
      </Box>
    )
  }
  if (!isCurrentChainEqualChainOfPool) {
    return (
      <Box
        sx={{
          width: '100%',
          background: '#20201E',
          borderRadius: '20px',
          padding: '0 0 24px',
          minHeight: '453px',
          display: 'flex',
          flexFlow: 'column nowrap'
        }}
      >
        <PoolSaleInfo poolInfo={poolInfo} />
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center'
          }}
        >
          <SwitchNetworkButton targetChain={poolInfo.ethChainId} />
        </Box>
      </Box>
    )
  }
  return (
    <Box
      sx={{
        width: '100%',
        background: '#20201E',
        borderRadius: '20px',
        padding: '0 0 24px',
        minHeight: '453px'
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
    </Box>
  )
}
export default RightBox
