import { Box } from '@mui/material'
import { Erc20EnglishAuctionPoolProp, PoolStatus } from 'api/pool/type'
import { useEffect, useMemo, useState } from 'react'
import { useErc20EnglishAuctionPoolInfo } from '../../ValuesProvider'
import { ActionStep } from 'pages/auction/dutchAuction/components/userBlock/right'
import Upcoming from './actionStep/upcoming'
import Live from './actionStep/live'
import Confirm from './actionStep/confirm'
import ClosedAndNotJoined from './actionStep/closedAndNotJoined'
import ClosedAndClaimed from './actionStep/closedAndClaimed'
import ClosedAndNotClaim from './actionStep/closedAndNotClaim'

const RightBox = () => {
  const { data: poolInfo } = useErc20EnglishAuctionPoolInfo()
  if (poolInfo) return <RightBoxContent poolInfo={poolInfo}></RightBoxContent>
  return null
}

const RightBoxContent = ({ poolInfo }: { poolInfo: Erc20EnglishAuctionPoolProp }) => {
  const [amount, setAmount] = useState('')
  const isUserJoined = useMemo(
    () => Number(poolInfo?.participant.swappedAmount0),
    [poolInfo?.participant.swappedAmount0]
  )
  const isUserClaimed = useMemo(() => {
    return Number(poolInfo.participant.currencyCurClaimableAmount?.toExact()) <= 0
  }, [poolInfo.participant.currencyCurClaimableAmount])
  const [actionStep, setActionStep] = useState<ActionStep>(ActionStep.UpComing)

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
  }, [actionStep, isUserClaimed, isUserJoined, poolInfo.status])
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

  if (!poolInfo) return <></>
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
        <Confirm poolInfo={poolInfo} onConfirm={handleConfirm} amount={amount} />
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
