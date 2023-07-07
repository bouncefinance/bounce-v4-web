import { Box, Typography, Grid, Button } from '@mui/material'
import { Erc20EnglishAuctionPoolProp, PoolStatus } from 'api/pool/type'
import PoolTextItem from '../poolTextItem'
import TokenImage from 'bounceComponents/common/TokenImage'
import PoolInfoItem from '../poolInfoItem'
import { RightText } from '../creatorBlock/auctionInfo'
import { useCallback, useMemo, useState } from 'react'
import UserBidHistory from './bidHistory'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks'
import BigNumber from 'bignumber.js'
import { useEnglishAuctionPoolInfo } from '../../ValuesProvider'
import PoolStatusBox from 'bounceComponents/fixed-swap/ActionBox/PoolStatus'
import { hideDialogConfirmation, showRequestConfirmDialog, showWaitingTxDialog } from 'utils/auction'
import { useErc20EnglishSwap, useErc20EnglishUserClaim } from 'bounceHooks/auction/useErc20EnglishAuctionCallback'
import { show } from '@ebay/nice-modal-react'
import DialogTips from 'bounceComponents/common/DialogTips'
import { LoadingButton } from '@mui/lab'
// import { getCurrentTimeStamp } from 'utils'
import InputAmount from './inputAmount'
import { CurrencyAmount } from 'constants/token'
import SwitchNetworkButton from 'bounceComponents/fixed-swap/SwitchNetworkButton'
import ConnectWalletButton from 'bounceComponents/fixed-swap/ActionBox/CreatorActionBox/ConnectWalletButton'
import { fixToDecimals } from 'utils/number'
import GetFundBackAlert from 'bounceComponents/fixed-swap/ActionBox/UserActionBox2/BidButtonBlock/GetFundBackAlert'
import { useCountDown } from 'ahooks'
import SuccessIcon from 'assets/imgs/dutchAuction/success.png'
import { TipsBox } from '../creatorBlock/right'
import { getCurrentTimeStamp } from 'utils'
import JSBI from 'jsbi'

const RightBox = () => {
  const { data: poolInfo } = useEnglishAuctionPoolInfo()
  if (poolInfo) return <RightBoxContent poolInfo={poolInfo}></RightBoxContent>
  return null
}

const RightBoxContent = ({ poolInfo }: { poolInfo: Erc20EnglishAuctionPoolProp }) => {
  const [amount, setAmount] = useState('')
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate:
      poolInfo.status === PoolStatus.Upcoming
        ? poolInfo.openAt * 1000
        : poolInfo.status === PoolStatus.Live
        ? poolInfo.closeAt * 1000
        : poolInfo.status === PoolStatus.Closed
        ? poolInfo.claimAt * 1000
        : undefined
  })
  const amount1CurrencyAmount =
    poolInfo.currencyAmountStartPrice?.currency &&
    CurrencyAmount.fromAmount(poolInfo.currencyAmountStartPrice?.currency, amount)
  const isUserJoined = useMemo(
    () => Number(poolInfo?.participant.swappedAmount0),
    [poolInfo?.participant.swappedAmount0]
  )
  const { account, chainId } = useActiveWeb3React()
  const { swapCallback: bid, swapPermitCallback, submitted } = useErc20EnglishSwap(poolInfo)
  const { run: claim, submitted: isUserClaiming } = useErc20EnglishUserClaim(poolInfo)
  const isCurrentChainEqualChainOfPool = useMemo(() => chainId === poolInfo.ethChainId, [chainId, poolInfo.ethChainId])
  const slicedBidAmount = useMemo(
    () => (amount ? fixToDecimals(amount, poolInfo.token1.decimals).toString() : ''),
    [amount, poolInfo.token1.decimals]
  )
  const minBidAmount = useMemo(() => poolInfo.currencyCurrentPrice, [poolInfo.currencyCurrentPrice])
  const currencySlicedBidAmount = useMemo(
    () => CurrencyAmount.fromAmount(poolInfo.currencyAmountTotal1.currency, slicedBidAmount),
    [poolInfo.currencyAmountTotal1.currency, slicedBidAmount]
  )
  const userToken1Balance = useCurrencyBalance(account || undefined, poolInfo?.currencyAmountTotal1?.currency)
  const isBalanceInsufficient = useMemo(() => {
    if (!userToken1Balance || !currencySlicedBidAmount) return true
    return userToken1Balance.lessThan(currencySlicedBidAmount)
  }, [currencySlicedBidAmount, userToken1Balance])

  const token1AvailableAmount = useMemo(
    () =>
      poolInfo.participant.currencySwappedAmount1 &&
      poolInfo.currencyMaxAmount1PerWallet?.subtract(poolInfo.participant.currencySwappedAmount1),
    [poolInfo.currencyMaxAmount1PerWallet, poolInfo.participant.currencySwappedAmount1]
  )
  const toBid = useCallback(async () => {
    if (!amount1CurrencyAmount) return
    showRequestConfirmDialog()
    try {
      const { transactionReceipt } =
        poolInfo.whitelistData?.isUserInWhitelist && poolInfo.whitelistData?.isPermit
          ? await bid(amount1CurrencyAmount)
          : await swapPermitCallback(amount1CurrencyAmount)
      const ret = new Promise((resolve, rpt) => {
        showWaitingTxDialog(() => {
          hideDialogConfirmation()
          rpt()
        })
        transactionReceipt.then(curReceipt => {
          resolve(curReceipt)
        })
      })
      ret
        .then(() => {
          hideDialogConfirmation()
          show(DialogTips, {
            iconType: 'success',
            againBtn: 'Close',
            title: 'Congratulations!',
            content: `You have successfully bid ${amount1CurrencyAmount.toSignificant()} ${poolInfo?.token1.symbol}`
          })
        })
        .catch()
    } catch (error) {
      const err: any = error
      hideDialogConfirmation()
      show(DialogTips, {
        iconType: 'error',
        againBtn: 'Try Again',
        cancelBtn: 'Cancel',
        title: 'Oops..',
        content: err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
        onAgain: bid
      })
    }
  }, [
    amount1CurrencyAmount,
    bid,
    poolInfo?.token1.symbol,
    poolInfo.whitelistData?.isPermit,
    poolInfo.whitelistData?.isUserInWhitelist,
    swapPermitCallback
  ])

  const toClaim = useCallback(async () => {
    showRequestConfirmDialog()
    try {
      const { transactionReceipt } = await claim()
      const ret = new Promise((resolve, rpt) => {
        showWaitingTxDialog(() => {
          hideDialogConfirmation()
          rpt()
        })
        transactionReceipt.then(curReceipt => {
          resolve(curReceipt)
        })
      })
      ret
        .then(() => {
          hideDialogConfirmation()
          show(DialogTips, {
            iconType: 'success',
            againBtn: 'Close',
            title: 'Congratulations!',
            content: `You have successfully claim ${poolInfo.participant?.currencyCurClaimableAmount?.toSignificant()} ${
              poolInfo?.token0.symbol
            }`
          })
        })
        .catch()
    } catch (error) {
      const err: any = error
      hideDialogConfirmation()
      show(DialogTips, {
        iconType: 'error',
        againBtn: 'Try Again',
        cancelBtn: 'Cancel',
        title: 'Oops..',
        content: err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
        onAgain: bid
      })
    }
  }, [bid, claim, poolInfo.participant?.currencyCurClaimableAmount, poolInfo?.token0.symbol])

  const bidHistory = [
    {
      amount: '2000 AUCTION',
      price: '0.25 ETH',
      date: '12 Dec 12:00'
    }
  ]

  function ActionsBtn() {
    if (!account) {
      return <ConnectWalletButton />
    }
    if (!isCurrentChainEqualChainOfPool) {
      return <SwitchNetworkButton targetChain={poolInfo.ethChainId} />
    }
    if (isBalanceInsufficient && poolInfo.status === PoolStatus.Live) {
      return (
        <>
          <Button variant="contained" fullWidth disabled>
            {!currencySlicedBidAmount ? 'Input Amount' : !userToken1Balance ? 'Loading' : 'Insufficient balance'}
          </Button>
          <GetFundBackAlert />
        </>
      )
    }
    if (poolInfo.status === PoolStatus.Upcoming) {
      return (
        <Box
          sx={{
            width: '100%',
            background: '#D7D6D9',
            height: '52px',
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: 20,
            padding: '0 24px',
            borderRadius: '8px',
            cursor: 'pointer'
          }}
        >
          <Typography
            sx={{
              fontFamily: `'Inter'`,
              color: '#fff',
              fontSize: '16px'
            }}
          >
            Bid Token
          </Typography>
          <Typography
            sx={{
              fontFamily: `'Inter'`,
              color: '#fff',
              fontSize: '16px'
            }}
          >
            {countdown > 0 ? `${days}d : ${hours}h : ${minutes}m : ${seconds}s` : 'Upcoming'}
          </Typography>
        </Box>
      )
    }
    if (poolInfo.status === PoolStatus.Live) {
      return (
        <LoadingButton
          fullWidth
          variant="contained"
          loadingPosition="start"
          loading={submitted.submitted}
          disabled={
            !amount ||
            isBalanceInsufficient ||
            !minBidAmount ||
            (amount1CurrencyAmount && minBidAmount?.greaterThan(amount1CurrencyAmount)) ||
            (token1AvailableAmount && amount1CurrencyAmount?.greaterThan(token1AvailableAmount))
          }
          onClick={toBid}
        >
          Place a Bid
        </LoadingButton>
      )
    }
    if (
      poolInfo.status === PoolStatus.Closed &&
      poolInfo.participant.swappedAmount0 &&
      Number(poolInfo.participant.swappedAmount0) > 0 &&
      !poolInfo.participant.claimed &&
      poolInfo.participant.currencyCurClaimableAmount?.greaterThan('0')
    ) {
      return (
        <LoadingButton
          fullWidth
          variant="contained"
          loadingPosition="start"
          loading={isUserClaiming.complete || isUserClaiming.submitted}
          disabled={poolInfo.claimAt > getCurrentTimeStamp()}
          onClick={toClaim}
        >
          Claim Token
        </LoadingButton>
      )
    }
    return null
  }

  if (!poolInfo) return <></>
  return (
    <Box
      sx={{
        width: '100%',
        background: '#20201E',
        borderRadius: '20px',
        padding: '0 0 24px'
      }}
    >
      <Box
        sx={{
          background: '#E1F25C',
          border: '1px solid rgba(18, 18, 18, 0.06)',
          borderRadius: '20px',
          padding: '24px'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexFlow: 'row nowrap',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <Typography
            sx={{
              fontFamily: `'Public Sans'`,
              fontWeight: 600,
              fontSize: 20,
              color: '#000'
            }}
          >
            {isUserJoined <= 0 ? 'Join The Pool' : 'You Joined'}
          </Typography>
          <PoolStatusBox
            showParticipantClaim={
              Number(poolInfo?.participant.swappedAmount0 || '0') > 0 && !poolInfo.participant.claimed
            }
            status={poolInfo?.status}
            openTime={poolInfo?.openAt}
            claimAt={poolInfo?.claimAt}
            closeTime={poolInfo?.closeAt}
          />
        </Box>
        <Box
          sx={{
            width: '100%',
            height: 0,
            borderBottom: `1px solid rgba(18, 18, 18, 0.2)`,
            margin: '16px 0'
          }}
        ></Box>
        <Grid container rowGap={'16px'}>
          <Grid item xs={6}>
            <PoolTextItem title={'Current price'}>
              <>
                <Box
                  sx={{
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    fontFamily: `'Public Sans'`,
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  1
                  <TokenImage
                    sx={{
                      margin: '0 4px'
                    }}
                    src={poolInfo?.token0.largeUrl}
                    alt={poolInfo?.token0.symbol}
                    size={16}
                  />
                  <span
                    style={{
                      fontFamily: `'Inter'`,
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#626262'
                    }}
                  >
                    {poolInfo?.token0.name.toUpperCase()}
                  </span>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    fontFamily: `'Public Sans'`,
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  <span
                    style={{
                      fontFamily: `'Inter'`,
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#626262'
                    }}
                  >
                    =
                  </span>
                  &nbsp; {poolInfo?.currencyCurrentPrice?.toSignificant()}
                  <TokenImage
                    sx={{
                      margin: '0 4px'
                    }}
                    src={poolInfo?.token1.largeUrl}
                    alt={poolInfo?.token1.symbol}
                    size={16}
                  />
                  <span
                    style={{
                      fontFamily: `'Inter'`,
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#626262'
                    }}
                  >
                    {(poolInfo?.token1.symbol + '').toUpperCase()}
                  </span>
                </Box>
              </>
            </PoolTextItem>
          </Grid>
          <Grid item xs={6}>
            <PoolTextItem title={'Successful sold amount'} tip={'The amount of token you successfully secured.'}>
              <>
                <Box
                  sx={{
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    fontFamily: `'Public Sans'`,
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  {poolInfo?.currencySwappedAmount0?.toSignificant()}
                  <TokenImage
                    sx={{
                      margin: '0 4px'
                    }}
                    src={poolInfo?.token0.largeUrl}
                    alt={poolInfo?.token0.symbol}
                    size={16}
                  />
                  <span
                    style={{
                      fontFamily: `'Inter'`,
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#626262'
                    }}
                  >
                    {poolInfo?.token0.symbol.toUpperCase()}
                  </span>
                </Box>
              </>
            </PoolTextItem>
          </Grid>
          <Grid item xs={6}>
            <PoolTextItem title={'Total paid amount'} tip={'Total paid amount'}>
              <>
                <Box
                  sx={{
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    fontFamily: `'Public Sans'`,
                    fontWeight: 'bold',
                    fontSize: '16px'
                  }}
                >
                  {poolInfo?.currencySwappedAmount1?.toSignificant()}
                  <TokenImage
                    sx={{
                      margin: '0 4px'
                    }}
                    src={poolInfo?.token1.largeUrl}
                    alt={poolInfo?.token1.symbol}
                    size={16}
                  />
                  <span
                    style={{
                      fontFamily: `'Inter'`,
                      fontSize: '14px',
                      fontWeight: 400,
                      color: '#626262'
                    }}
                  >
                    {(poolInfo?.token1.symbol + '').toUpperCase()}
                  </span>
                </Box>
              </>
            </PoolTextItem>
          </Grid>
        </Grid>
      </Box>

      {poolInfo.status === PoolStatus.Live && (
        <>
          <Box padding="30px 24px 0">
            <PoolInfoItem
              title={'Current bid price'}
              sx={{
                marginBottom: '9px'
              }}
            >
              <RightText
                style={{
                  color: '#E1F25C'
                }}
              >
                {poolInfo?.currencyCurrentPrice?.toSignificant() + ' ' + poolInfo?.token1.symbol.toUpperCase()}
              </RightText>
            </PoolInfoItem>
            <PoolInfoItem title={'Bid Amount'}>
              <RightText
                style={{
                  color: '#E1F25C'
                }}
              >
                Balance: {userToken1Balance?.toSignificant()} {poolInfo?.token1.symbol}
              </RightText>
            </PoolInfoItem>
          </Box>
          <Box
            sx={{
              width: '100%',
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'center'
            }}
          >
            <InputAmount amount={amount} setAmount={setAmount} />
          </Box>
          <Box padding={'10px 24px 0'}>
            <PoolInfoItem
              title={'Quantity available to bid'}
              sx={{
                marginBottom: '9px'
              }}
            >
              <RightText
                style={{
                  color: '#E1F25C'
                }}
              >
                {poolInfo.currencyMaxAmount1PerWallet && poolInfo.currencyMaxAmount1PerWallet.equalTo(JSBI.BigInt(0))
                  ? 'No Limit'
                  : token1AvailableAmount?.toSignificant() + ' ' + poolInfo?.token1.symbol.toUpperCase()}
              </RightText>
            </PoolInfoItem>
          </Box>
          <Box padding={'0 24px'}>
            <PoolInfoItem
              title={'You will pay'}
              sx={{
                marginBottom: '9px'
              }}
            >
              <RightText
                style={{
                  color: '#E1F25C'
                }}
              >
                {amount1CurrencyAmount &&
                  new BigNumber(amount1CurrencyAmount?.toExact()).toFixed() +
                    ' ' +
                    poolInfo?.token1.symbol.toUpperCase()}
              </RightText>
            </PoolInfoItem>
          </Box>
          <Box padding={'0 24px'}>
            <PoolInfoItem
              title={'You will estimated receive'}
              sx={{
                marginBottom: '9px'
              }}
            >
              <RightText
                style={{
                  color: '#E1F25C'
                }}
              >
                {amount1CurrencyAmount &&
                  poolInfo?.currencyCurrentPrice &&
                  new BigNumber(amount1CurrencyAmount?.toExact())
                    .div(poolInfo?.currencyCurrentPrice.toExact())
                    .toFixed() +
                    ' ' +
                    poolInfo?.token0.symbol.toUpperCase()}
              </RightText>
            </PoolInfoItem>
          </Box>
        </>
      )}
      <Box padding="0 24px">{ActionsBtn()}</Box>
      {poolInfo.status === PoolStatus.Closed && poolInfo.participant.claimed && (
        <TipsBox
          iconUrl={SuccessIcon}
          style={{
            marginTop: '16px'
          }}
        >
          You have successfully claimed your tokens. See you next time!
        </TipsBox>
      )}
      {bidHistory.length > 0 && <UserBidHistory list={bidHistory} />}
    </Box>
  )
}
export default RightBox
