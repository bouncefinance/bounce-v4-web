import { Button } from '@mui/material'
import { UserBidAction } from '../ActionBlock'
import PlaceBidButton from '../PlaceBidButton'
import UpcomingPoolCountdownButton from './UpcomingPoolCountdownButton'
import WrongNetworkAlert from './WrongNetworkAlert'
import BidButtonGroup from './BidButtonGroup'
import GetFundBackAlert from './GetFundBackAlert'
import GoToCheckButton from './GoToCheckButton'
import { FixedSwapPoolProp, PoolStatus } from 'api/pool/type'
import useIsLimitExceeded from 'bounceHooks/auction/useIsLimitExceeded'
import SwitchNetworkButton from 'bounceComponents/fixed-swap/SwitchNetworkButton'
import { fixToDecimals } from 'utils/number'
import { useMemo } from 'react'
import { useActiveWeb3React } from 'hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { CurrencyAmount } from 'constants/token'
import { useShowLoginModal } from 'state/users/hooks'

interface BidButtonBlockProps {
  action: UserBidAction
  handleGoToCheck: () => void
  handlePlaceBid: () => void
  isBidding?: boolean
  handleCancelButtonClick: () => void
  bidAmount: string
  poolInfo: FixedSwapPoolProp
}

const BidButtonBlock = ({
  action,
  bidAmount,
  handleGoToCheck,
  handlePlaceBid,
  isBidding,
  poolInfo,
  handleCancelButtonClick
}: BidButtonBlockProps) => {
  const { account, chainId } = useActiveWeb3React()
  const showLoginModal = useShowLoginModal()
  const isCurrentChainEqualChainOfPool = useMemo(() => poolInfo.ethChainId === chainId, [poolInfo.ethChainId, chainId])

  const slicedBidAmount = useMemo(
    () => (bidAmount ? fixToDecimals(bidAmount, poolInfo.token1.decimals).toString() : ''),
    [bidAmount, poolInfo.token1.decimals]
  )

  const userBalance = useCurrencyBalance(account || undefined, poolInfo.currencyAmountTotal1.currency)
  const currencySlicedBidAmount = useMemo(
    () => CurrencyAmount.fromAmount(poolInfo.currencyAmountTotal1.currency, slicedBidAmount),
    [poolInfo.currencyAmountTotal1.currency, slicedBidAmount]
  )

  const isBalanceInsufficient = useMemo(() => {
    if (!userBalance || !currencySlicedBidAmount) return true
    return userBalance.lessThan(currencySlicedBidAmount)
  }, [currencySlicedBidAmount, userBalance])

  const isLimitExceeded = useIsLimitExceeded(slicedBidAmount, poolInfo)

  if (poolInfo.status === PoolStatus.Upcoming) {
    return <UpcomingPoolCountdownButton openAt={poolInfo.openAt} />
  }

  if (!account) {
    return (
      <Button variant="contained" fullWidth onClick={showLoginModal}>
        Connect Wallet
      </Button>
    )
  }
  // not test
  if (!isCurrentChainEqualChainOfPool && poolInfo.status !== PoolStatus.Cancelled) {
    return (
      <>
        <SwitchNetworkButton targetChain={poolInfo.ethChainId || 1} />
        <WrongNetworkAlert />
      </>
    )
  }

  if (isLimitExceeded) {
    return (
      <>
        <BidButtonGroup
          withCancelButton={action === 'MORE_BID'}
          stackSx={{ mt: 24 }}
          onCancel={handleCancelButtonClick}
        >
          <Button variant="contained" fullWidth disabled>
            Limit Exceeded
          </Button>
        </BidButtonGroup>
        <GetFundBackAlert />
      </>
    )
  }

  if (!currencySlicedBidAmount) {
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
            {!currencySlicedBidAmount ? 'Input Amount' : !userBalance ? 'Loading' : 'Insufficient balance'}
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
