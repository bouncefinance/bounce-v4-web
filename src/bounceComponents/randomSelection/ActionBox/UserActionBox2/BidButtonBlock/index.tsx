import { Button } from '@mui/material'
import { UserBidAction } from '../ActionBlock'
import PlaceBidButton from '../PlaceBidButton'
import UpcomingPoolCountdownButton from './UpcomingPoolCountdownButton'
import BidButtonGroup from './BidButtonGroup'
import GoToCheckButton from './GoToCheckButton'
import { FixedSwapPoolProp, PoolStatus } from 'api/pool/type'
import useIsLimitExceeded from 'bounceHooks/auction/useIsRandomSelectionLimitExceeded'
import SwitchNetworkButton from 'bounceComponents/fixed-swap/SwitchNetworkButton'
import { useMemo } from 'react'
import { useActiveWeb3React } from 'hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { CurrencyAmount } from 'constants/token'
import ConnectWalletButton from 'bounceComponents/fixed-swap/ActionBox/CreatorActionBox/ConnectWalletButton'
import WrongNetworkAlert from 'bounceComponents/fixed-swap/ActionBox/UserActionBox2/BidButtonBlock/WrongNetworkAlert'

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
  const isCurrentChainEqualChainOfPool = useMemo(() => poolInfo.ethChainId === chainId, [poolInfo.ethChainId, chainId])
  const userBalance = useCurrencyBalance(account || undefined, poolInfo.currencyMaxAmount1PerWallet.currency)
  const currencySlicedBidAmount = useMemo(
    () => CurrencyAmount.fromRawAmount(poolInfo.currencyAmountTotal1.currency, bidAmount),
    [bidAmount, poolInfo.currencyAmountTotal1.currency]
  )
  const isBalanceInsufficient = useMemo(() => {
    if (!userBalance || !currencySlicedBidAmount) return true
    return userBalance.lessThan(currencySlicedBidAmount)
  }, [currencySlicedBidAmount, userBalance])

  // limit when curPlayer === maxPlayere
  const isLimitExceeded = useIsLimitExceeded(poolInfo)

  if (poolInfo.status === PoolStatus.Upcoming) {
    return <UpcomingPoolCountdownButton openAt={poolInfo.openAt} />
  }

  if (!account) {
    return <ConnectWalletButton />
  }

  if (!isCurrentChainEqualChainOfPool) {
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
      </>
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
            {!userBalance ? 'Loading' : 'Insufficient balance'}
          </Button>
        </BidButtonGroup>
      </>
    )
  }

  if (action === 'GO_TO_CHECK') {
    return (
      <>
        <GoToCheckButton poolInfo={poolInfo} bidAmount={bidAmount} onClick={handleGoToCheck} />
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
            action={action}
            poolInfo={poolInfo}
            bidAmount={bidAmount}
            onClick={() => {
              handlePlaceBid()
            }}
            loading={isBidding}
          />
        </BidButtonGroup>
      </>
    )
  }
  return null
}

export default BidButtonBlock
