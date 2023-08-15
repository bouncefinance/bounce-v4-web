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
import { useActiveWeb3React } from 'hooks'
import ConnectWalletButton from 'bounceComponents/fixed-swap/ActionBox/CreatorActionBox/ConnectWalletButton'
import SwitchNetworkButton from 'bounceComponents/fixed-swap/SwitchNetworkButton'
import { PoolSaleInfo } from './poolSaleInfo'
import { useCountDown } from 'ahooks'
const RightBox = () => {
  const { data: poolInfo } = useErc20EnglishAuctionPoolInfo()
  if (poolInfo) return <RightBoxContent poolInfo={poolInfo}></RightBoxContent>
  return null
}

const RightBoxContent = ({ poolInfo }: { poolInfo: Erc20EnglishAuctionPoolProp }) => {
  const [amount, setAmount] = useState('')
  const [countdown] = useCountDown({
    targetDate: poolInfo.claimAt * 1000
  })
  const isUserJoined = useMemo(
    () => Number(poolInfo?.participant.swappedAmount0),
    [poolInfo?.participant.swappedAmount0]
  )
  const { account, chainId } = useActiveWeb3React()
  const isCurrentChainEqualChainOfPool = useMemo(() => chainId === poolInfo.ethChainId, [chainId, poolInfo.ethChainId])
  const isUserClaimed = useMemo(() => {
    return countdown === 0 && Number(poolInfo.participant.currencyCurClaimableAmount?.toExact()) <= 0
  }, [countdown, poolInfo.participant.currencyCurClaimableAmount])
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
