import { DutchAuctionPoolProp } from 'api/pool/type'
import UserBidHistory from '../bidHistory'
import ClaimBlock from '../claimBlock'
import { ActionStep } from '../right'
import PoolSaleInfo from '../poolSaleInfo'
import UserFinalAuctionResult from '../userFinalAuctionResult'
import { Box } from '@mui/material'
import { useActiveWeb3React } from 'hooks'
import { useMemo } from 'react'
import ConnectWalletButton from 'bounceComponents/fixed-swap/ActionBox/CreatorActionBox/ConnectWalletButton'
import SwitchNetworkButton from 'bounceComponents/fixed-swap/SwitchNetworkButton'
const NormalContent = ({
  poolInfo,
  handleSetActionStep
}: {
  poolInfo: DutchAuctionPoolProp
  handleSetActionStep?: (actionStep: ActionStep) => void
}) => {
  const { account, chainId } = useActiveWeb3React()
  const isCurrentChainEqualChainOfPool = useMemo(() => chainId === poolInfo.ethChainId, [chainId, poolInfo.ethChainId])
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
    <>
      <UserFinalAuctionResult poolInfo={poolInfo} />
      <ClaimBlock isErc20EnglishAuction={false} poolInfo={poolInfo} handleSetActionStep={handleSetActionStep} />
      {/* bid history */}
      <UserBidHistory poolInfo={poolInfo} />
    </>
  )
}
const ClosedAndNotClaimed = ({
  poolInfo,
  handleSetActionStep
}: {
  poolInfo: DutchAuctionPoolProp
  handleSetActionStep?: (actionStep: ActionStep) => void
}) => {
  return (
    <>
      <PoolSaleInfo poolInfo={poolInfo} />
      <NormalContent poolInfo={poolInfo} handleSetActionStep={handleSetActionStep} />
    </>
  )
}
export default ClosedAndNotClaimed
