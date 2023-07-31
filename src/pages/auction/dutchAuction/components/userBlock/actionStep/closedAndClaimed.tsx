import { Box } from '@mui/material'
import { DutchAuctionPoolProp } from 'api/pool/type'
import UserBidHistory from '../bidHistory'
import { TipsBox } from '../right'
import SuccessIcon from 'assets/imgs/dutchAuction/success.png'
import PoolSaleInfo from '../poolSaleInfo'
import UserFinalAuctionResult from '../userFinalAuctionResult'
import { useActiveWeb3React } from 'hooks'
import { useMemo } from 'react'
import ConnectWalletButton from 'bounceComponents/fixed-swap/ActionBox/CreatorActionBox/ConnectWalletButton'
import SwitchNetworkButton from 'bounceComponents/fixed-swap/SwitchNetworkButton'
const NormalContent = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
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
      {/* Final Auction Results */}
      <UserFinalAuctionResult poolInfo={poolInfo} />
      <Box
        sx={{
          padding: '0 24px'
        }}
      >
        <TipsBox
          iconUrl={SuccessIcon}
          style={{
            marginTop: '16px'
          }}
        >
          You have successfully claimed your tokens. See you next time!
        </TipsBox>
      </Box>
      {/* bid history */}
      <UserBidHistory poolInfo={poolInfo} />
    </>
  )
}
const ClosedAndClaimed = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
  return (
    <>
      <PoolSaleInfo poolInfo={poolInfo} />
      <NormalContent poolInfo={poolInfo} />
    </>
  )
}
export default ClosedAndClaimed
