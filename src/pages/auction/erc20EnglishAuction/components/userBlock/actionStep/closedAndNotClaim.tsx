import { Box } from '@mui/material'
import { Erc20EnglishAuctionPoolProp } from 'api/pool/type'
import UserBidHistory from '../bidHistory'
import { ActionStep } from 'pages/auction/dutchAuction/components/userBlock/right'
import ClaimBlock from 'pages/auction/dutchAuction/components/userBlock/claimBlock'
import { PoolSaleInfo } from '../poolSaleInfo'
const ClosedAndNotClaimed = ({
  poolInfo,
  handleSetActionStep
}: {
  poolInfo: Erc20EnglishAuctionPoolProp
  handleSetActionStep?: (actionStep: ActionStep) => void
}) => {
  return (
    <>
      <PoolSaleInfo poolInfo={poolInfo} />
      <Box sx={{ margin: '30px auto 12px' }}></Box>
      <ClaimBlock isErc20EnglishAuction poolInfo={poolInfo} handleSetActionStep={handleSetActionStep} />
      <UserBidHistory poolInfo={poolInfo} />
    </>
  )
}
export default ClosedAndNotClaimed
