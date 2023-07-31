import { Box } from '@mui/material'
import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'
import UserBidHistory from '../bidHistory'
import SuccessIcon from 'assets/imgs/dutchAuction/success.png'
import { TipsBox } from 'pages/auction/dutchAuction/components/userBlock/right'
import { PoolSaleInfo } from '../poolSaleInfo'

const ClosedAndClaimed = ({ poolInfo }: { poolInfo: Erc20EnglishAuctionPoolProp }) => {
  return (
    <>
      <PoolSaleInfo poolInfo={poolInfo} />
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
      <UserBidHistory poolInfo={poolInfo} />
    </>
  )
}
export default ClosedAndClaimed
