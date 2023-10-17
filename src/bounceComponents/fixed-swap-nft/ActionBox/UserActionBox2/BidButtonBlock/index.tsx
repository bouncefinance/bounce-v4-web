import { Button } from '@mui/material'
import { BigNumber } from 'bignumber.js'
import { UserBidAction } from '../ActionBlock'
import PlaceBidButton from '../PlaceBidButton'
import GoToCheckButton from './GoToCheckButton'
import { PoolStatus } from 'api/pool/type'
import useIsLimitExceeded1155 from 'bounceHooks/auction/useIsLimit1155Exceeded'
import SwitchNetworkButton from 'bounceComponents/fixed-swap/SwitchNetworkButton'
import { FixedSwapPoolParams } from 'bounceComponents/fixed-swap-nft/MainBlock/UserMainBlock'
import { useMemo } from 'react'
import { useActiveWeb3React } from 'hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { CurrencyAmount } from 'constants/token'
import UpcomingPoolCountdownButton from 'bounceComponents/fixed-swap/ActionBox/UserActionBox2/BidButtonBlock/UpcomingPoolCountdownButton'
import WrongNetworkAlert from 'bounceComponents/fixed-swap/ActionBox/UserActionBox2/BidButtonBlock/WrongNetworkAlert'
import BidButtonGroup from 'bounceComponents/fixed-swap/ActionBox/UserActionBox2/BidButtonBlock/BidButtonGroup'
import GetFundBackAlert from 'bounceComponents/fixed-swap/ActionBox/UserActionBox2/BidButtonBlock/GetFundBackAlert'
import ConnectWalletButton from 'bounceComponents/fixed-swap/ActionBox/CreatorActionBox/ConnectWalletButton'

interface BidButtonBlockProps {
  action: UserBidAction
  handleGoToCheck: () => void
  handlePlaceBid: () => void
  isBidding?: boolean
  handleCancelButtonClick: () => void
  bidAmount: string
}

const BidButtonBlock = ({
  action,
  bidAmount,
  handleGoToCheck,
  handlePlaceBid,
  isBidding,
  poolInfo,
  handleCancelButtonClick
}: BidButtonBlockProps & FixedSwapPoolParams) => {
  const { account, chainId } = useActiveWeb3React()
  const isCurrentChainEqualChainOfPool = useMemo(() => chainId === poolInfo.ethChainId, [chainId, poolInfo.ethChainId])

  const slicedBid1Amount = bidAmount ? new BigNumber(bidAmount).times(poolInfo.ratio).toString() : ''
  const userToken1Balance = useCurrencyBalance(account || undefined, poolInfo.currencyAmountTotal1.currency)

  const currencySlicedBidAmount = useMemo(
    () => CurrencyAmount.fromAmount(poolInfo.currencyAmountTotal1.currency, slicedBid1Amount),
    [poolInfo.currencyAmountTotal1.currency, slicedBid1Amount]
  )

  const isBalanceInsufficient = useMemo(() => {
    if (!userToken1Balance || !currencySlicedBidAmount) return true
    return userToken1Balance.lessThan(currencySlicedBidAmount)
  }, [currencySlicedBidAmount, userToken1Balance])

  const isLimitExceeded = useIsLimitExceeded1155(bidAmount, poolInfo)

  if (!account) {
    return <ConnectWalletButton />
  }

  if (!isCurrentChainEqualChainOfPool) {
    return (
      <>
        <SwitchNetworkButton targetChain={poolInfo.ethChainId} />
        <WrongNetworkAlert />
      </>
    )
  }

  if (poolInfo.status === PoolStatus.Upcoming) {
    return <UpcomingPoolCountdownButton openAt={poolInfo.openAt} />
  }

  if (isLimitExceeded) {
    return (
      <>
        <BidButtonGroup
          withCancelButton={action === 'MORE_BID'}
          stackSx={{ mt: 24 }}
          onCancel={handleCancelButtonClick}
        >
          <Button variant="contained" fullWidth sx={{ mt: 24 }} disabled>
            Limit Exceeded
          </Button>
        </BidButtonGroup>
        <GetFundBackAlert />
      </>
    )
  }

  if (!Number(slicedBid1Amount)) {
    return (
      <Button sx={{ mt: 24 }} variant="contained" fullWidth disabled>
        Place a Bid
      </Button>
    )
  }

  if (isBalanceInsufficient) {
    return (
      <>
        <BidButtonGroup
          withCancelButton={action === 'MORE_BID'}
          stackSx={{ mt: 24 }}
          onCancel={handleCancelButtonClick}
        >
          <Button variant="contained" fullWidth disabled>
            Insufficient balance
          </Button>
        </BidButtonGroup>
        <GetFundBackAlert />
      </>
    )
  }

  if (action === 'GO_TO_CHECK') {
    return (
      <>
        <GoToCheckButton poolInfo={poolInfo} bidAmount={bidAmount} onClick={handleGoToCheck} />
        <GetFundBackAlert />
      </>
    )
  }

  if (action === 'FIRST_BID') {
    return (
      <>
        <PlaceBidButton
          sx={{ mt: 24 }}
          bidAmount={bidAmount}
          onClick={() => {
            handlePlaceBid()
          }}
          loading={isBidding}
          poolInfo={poolInfo}
        />
        <GetFundBackAlert />
      </>
    )
  }

  if (action === 'MORE_BID') {
    return (
      <>
        <BidButtonGroup
          withCancelButton={action === 'MORE_BID'}
          stackSx={{ mt: 24 }}
          onCancel={handleCancelButtonClick}
        >
          <PlaceBidButton
            poolInfo={poolInfo}
            bidAmount={bidAmount}
            onClick={() => {
              handlePlaceBid()
            }}
            loading={isBidding}
          />
        </BidButtonGroup>
        <GetFundBackAlert />
      </>
    )
  }

  return null
}

export default BidButtonBlock
