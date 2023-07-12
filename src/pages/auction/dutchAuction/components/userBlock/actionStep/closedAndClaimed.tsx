import { Box } from '@mui/material'
import { DutchAuctionPoolProp } from 'api/pool/type'
import UserBidHistory from '../bidHistory'
import { TipsBox } from '../right'
import SuccessIcon from 'assets/imgs/dutchAuction/success.png'
import PoolSaleInfo from '../poolSaleInfo'
import UserFinalAuctionResult from '../userFinalAuctionResult'
const ClosedAndClaimed = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
  return (
    <>
      <PoolSaleInfo poolInfo={poolInfo} />
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
export default ClosedAndClaimed
