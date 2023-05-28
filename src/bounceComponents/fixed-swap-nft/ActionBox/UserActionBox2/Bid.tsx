import { Box, Typography } from '@mui/material'
import BidAmountInput from './BidAmountInput'
import BidButtonBlock from './BidButtonBlock'
import { UserBidAction } from './ActionBlock'
import { checkIfAllocationLimitExist } from 'utils/auction'
import { FixedSwapPoolParams } from 'bounceComponents/fixed-swap-nft/MainBlock/UserMainBlock'
import { useActiveWeb3React } from 'hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import PoolInfoItem from 'bounceComponents/fixed-swap/PoolInfoItem'

interface BidProps {
  action: UserBidAction
  bidAmount: string
  setBidAmount: (value: string) => void
  handleGoToCheck: () => void
  handleCancelButtonClick: () => void
  handlePlaceBid: () => void
  isBidding?: boolean
}

const Bid = ({
  action,
  bidAmount,
  setBidAmount,
  handleGoToCheck,
  handleCancelButtonClick,
  handlePlaceBid,
  poolInfo,
  isBidding
}: BidProps & FixedSwapPoolParams) => {
  const isAllocationLimitExist = checkIfAllocationLimitExist(poolInfo.maxAmount1PerWallet)
  const { account } = useActiveWeb3React()
  const userToken1Balance = useCurrencyBalance(account || undefined, poolInfo.currencyAmountTotal1.currency)

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5">Your Bid Amount</Typography>
        <Typography>
          Balance: {userToken1Balance?.toSignificant()} {poolInfo.token1.symbol}
        </Typography>
      </Box>

      <BidAmountInput poolInfo={poolInfo} bidAmount={bidAmount} setBidAmount={setBidAmount} />

      {isAllocationLimitExist && (
        <PoolInfoItem
          title="Bid amount limit"
          sx={{
            mt: 8,
            color:
              bidAmount && poolInfo.maxAmount1PerWallet && Number(bidAmount) > Number(poolInfo.maxAmount1PerWallet)
                ? '#F53030'
                : 'black'
          }}
        >
          {bidAmount || 0} NFT / {poolInfo.maxAmount1PerWallet || '-'}&nbsp; NFT
        </PoolInfoItem>
      )}

      <BidButtonBlock
        action={action}
        bidAmount={bidAmount}
        handlePlaceBid={handlePlaceBid}
        isBidding={isBidding}
        handleGoToCheck={handleGoToCheck}
        handleCancelButtonClick={handleCancelButtonClick}
        poolInfo={poolInfo}
      />
    </>
  )
}

export default Bid
