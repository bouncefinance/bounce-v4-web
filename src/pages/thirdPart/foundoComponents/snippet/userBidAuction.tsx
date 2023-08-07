import { Box, Stack, Typography, styled } from '@mui/material'
import { useState, useMemo, useCallback } from 'react'
import BidIcon from 'assets/imgs/thirdPart/foundoDetail/bidIcon.svg'
import WinTips from 'assets/imgs/thirdPart/foundoDetail/winTips.png'
import Icon0 from 'assets/imgs/auction/icon0.png'
import Icon1 from 'assets/imgs/auction/icon1.png'
import { PlaceBidBtn } from './bidDialog'
import ShippingDialog from './shippingInfoDialog'
import { useCountDown } from 'ahooks'
import { MutantEnglishAuctionNFTPoolProp, PoolStatus } from 'api/pool/type'
import { useIsSMDown } from 'themes/useTheme'
import TokenImage from 'bounceComponents/common/TokenImage'
import { useActiveWeb3React } from 'hooks'
import { useBidderClaimEnglishAuctionNFT } from 'bounceHooks/auction/useCreatorClaimNFT'
import {
  hideDialogConfirmation,
  showRequestApprovalDialog,
  showRequestConfirmDialog,
  showWaitingTxDialog
} from 'utils/auction'
import DialogTips from 'bounceComponents/common/DialogTips'
import { show } from '@ebay/nice-modal-react'
import { getCurrentTimeStamp } from 'utils'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { useWalletModalToggle } from 'state/application/hooks'
import { useMutantEnglishBidCallback } from 'hooks/useMutantEnglishAuctionPool'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { MUTANT_ENGLISH_AUCTION_NFT_CONTRACT_ADDRESSES } from '../../../../constants'
import DialogDarkTips from 'bounceComponents/common/DialogTips/DialogDarkTips'
import ReportIcon from '@mui/icons-material/Report'
import { Dots } from 'themes'
import PoolInfoItem from 'bounceComponents/fixed-swap/PoolInfoItem'
import { useCurrencyBalance, useETHBalance } from 'state/wallet/hooks'
import BigNumber from 'bignumber.js'
import RewardPanel from './rewardPanel'
import { RowLabel } from './creatorBidAuction'

interface DataViewParam {
  priceFloor: number | string
  increase: string
}
const WhiteText = styled(Typography)(({ theme }) => ({
  width: 'auto',
  fontFamily: `'Inter'`,
  color: '#fff',
  fontSize: '16px',
  margin: '20px auto',
  [theme.breakpoints.down('sm')]: {
    width: 145
  }
}))

const CounterText = styled(Typography)(({ theme }) => ({
  fontFamily: 'Public Sans',
  fontStyle: 'italic',
  fontWeight: 100,
  color: 'var(--ps-text-5)',
  [theme.breakpoints.down('xs')]: {
    fontSize: 18
  },
  [theme.breakpoints.down('md')]: {
    fontSize: 20
  }
}))

export function DataView(props: DataViewParam) {
  const { priceFloor, increase } = props
  return (
    <Stack
      spacing={16}
      sx={{
        padding: '0 0 24px'
      }}
    >
      <Typography fontSize={28} color={'#fff'}>
        {' '}
        About This Auction
      </Typography>
      <RowLabel>
        <Typography className="label">Auction Type</Typography>
        <Typography className="value">Mutant English Auction</Typography>
      </RowLabel>
      <RowLabel>
        <Typography className="label">Starting Price(Floor Price)</Typography>
        <Typography className="value">{priceFloor || '-'}</Typography>
      </RowLabel>
      <RowLabel>
        <Typography className="label">Bid Price Increase Rate</Typography>
        <Typography className="value">{BigNumber(increase).times(100).toString() + '%' || '-'}</Typography>
      </RowLabel>
    </Stack>
  )
}

const LiveStr = styled(Typography)(({ theme }) => ({
  display: 'inline-block',
  fontFamily: `'Public Sans'`,
  fontWeight: 600,
  fontSize: 28,
  color: 'var(--ps-green-1)',
  [theme.breakpoints.down('md')]: {
    fontSize: 20
  }
}))
const UpcomingStatus = (props: { OpenAt: string | number; text?: string; style?: React.CSSProperties }) => {
  const { OpenAt, text, style } = props
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate: Number(OpenAt) * 1000
  })
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        ...style
      }}
      gap={'8px'}
    >
      {countdown > 0 ? (
        <>
          <LiveStr>{text || 'Upcoming'} </LiveStr>
          <LiveStr>{days}d</LiveStr>
          <LiveStr>:</LiveStr>
          <LiveStr>{hours}h</LiveStr>
          <LiveStr>:</LiveStr>
          <LiveStr>{minutes}m </LiveStr>
          <LiveStr>:</LiveStr>
          <LiveStr>{seconds}s </LiveStr>
        </>
      ) : (
        <></>
      )}
    </Box>
  )
}

function RewardBox({
  icon,
  text,
  TokenLogo,
  symbol,
  Amount
}: {
  icon: string
  text: string
  TokenLogo: string
  symbol: string
  Amount: string
}) {
  return (
    <Stack direction={'row'} alignItems={'center'} spacing={16}>
      <img
        src={icon}
        style={{
          width: '48px',
          height: '48px',
          marginRight: '10px'
        }}
        alt=""
        srcSet=""
      />
      <Box>
        <Typography fontSize={14} lineHeight={'150%'} color={'#D7D6D9'}>
          {text}
        </Typography>
        <Stack direction={'row'} alignItems={'center'}>
          <TokenImage
            size={20}
            style={{
              display: 'inline-block',
              marginRight: '8px'
            }}
            src={TokenLogo}
            alt=""
            srcSet=""
          />
          <Typography style={{ fontSize: 16, color: '#E1F25C' }}>
            {Amount || '--'} {symbol}
          </Typography>
        </Stack>
      </Box>
    </Stack>
  )
}

const BidAction = ({ poolInfo }: { poolInfo: MutantEnglishAuctionNFTPoolProp }) => {
  const isSm = useIsSMDown()
  const OpenAt = useMemo(() => poolInfo?.openAt || 0, [poolInfo?.openAt])
  const poolStatus = useMemo(() => poolInfo?.status, [poolInfo?.status])
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate: Number(OpenAt) * 1000
  })
  return (
    <Box
      sx={{
        width: isSm ? '100%' : '640px',
        margin: 'auto',
        borderLeft: '1px solid rgba(255, 255, 255, 0.20)',
        padding: '120px 0 120px 63px'
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
        {/* Pool Status */}
        {poolStatus === PoolStatus.Upcoming && <UpcomingStatus OpenAt={OpenAt || 0} />}
        {poolStatus === PoolStatus.Closed && (
          <Typography
            sx={{
              fontFamily: `'Public Sans'`,
              fontWeight: 600,
              fontSize: isSm ? 20 : 28,
              color: '#FD3333'
            }}
          >
            Closed
          </Typography>
        )}
        {(poolStatus === PoolStatus.Cancelled || poolStatus === PoolStatus.Finish) && (
          <Typography color={'#fff'} fontSize={isSm ? 20 : 28}>
            Cancel
          </Typography>
        )}
        {poolStatus === PoolStatus.Live && poolInfo.enableWhiteList && !poolInfo.whitelistData?.isUserInWhitelist && (
          <Typography
            sx={{
              fontFamily: `'Public Sans'`,
              fontWeight: 600,
              fontSize: isSm ? 20 : 28,
              color: '#FD3333'
            }}
          >
            You are not whitelisted
          </Typography>
        )}
      </Box>
      <DataView
        priceFloor={`${poolInfo?.currencyAmountMin1?.toSignificant()} ${poolInfo?.currencyAmountMin1?.currency.symbol}`}
        increase={`${poolInfo?.amountMinIncrRatio1?.toSignificant()}`}
      />
      {poolStatus === PoolStatus.Upcoming && (
        <PlaceBidBtn disabled={true} loadingPosition="start" variant="contained" fullWidth>
          <img
            src={BidIcon}
            style={{
              width: '16px',
              height: '16px',
              marginRight: '10px'
            }}
            alt=""
            srcSet=""
          />
          <CounterText>
            Place A Bid in
            {countdown > 0 ? (
              <>
                <span> {days}d</span>
                <span> : </span>
                <span>{hours}h</span>
                <span> : </span>
                <span>{minutes}m </span>
                <span> : </span>
                <span>{seconds}s </span>
              </>
            ) : (
              <></>
            )}
          </CounterText>
        </PlaceBidBtn>
      )}
      {poolStatus === PoolStatus.Live && (
        <>
          <RowLabel
            style={{
              padding: '24px 0 20px',
              borderTop: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <Typography className="label">Current Highest Bid</Typography>
            <RowLabel
              style={{
                justifyContent: 'flex-end'
              }}
            >
              <TokenImage
                size={20}
                style={{
                  display: 'inline-block',
                  marginRight: '8px'
                }}
                src={poolInfo?.token1.smallUrl}
                alt=""
                srcSet=""
              />
              <Typography className="value" style={{ fontSize: 28 }}>
                {poolInfo?.currentBidderAmount1?.toSignificant() || '--'}{' '}
                {poolInfo?.currentBidderAmount1?.currency.symbol}
              </Typography>
            </RowLabel>
          </RowLabel>
          {poolInfo.currentBidderAmount1?.greaterThan('0') && (
            <Typography fontSize={12} fontFamily={'Inter'} color={'#959595'}>
              (The current bidder receive{' '}
              <span style={{ color: '#fff' }}>
                {poolInfo.distributeRewards.prevBidderRewardsEstimate?.toSignificant() || '-'}{' '}
                {poolInfo.currentBidderAmount?.currency.symbol}
              </span>{' '}
              after the next bidder place a bid.)
            </Typography>
          )}
        </>
      )}
      {poolStatus === PoolStatus.Live && (
        <UpcomingStatus text="Time Left" OpenAt={poolInfo?.closeAt || 0} style={{ marginTop: 80 }} />
      )}
      {poolStatus === PoolStatus.Live && (
        <Typography fontSize={14} fontWeight={600} fontFamily={'Public Sans'} color={'#959595'}>
          The auction is successful if there is no player with a higher bid after the countdown ends
        </Typography>
      )}
      {/* reward content */}
      {poolStatus === PoolStatus.Live && poolInfo && <RewardPanel poolInfo={poolInfo} />}
      {/* closed and win tips */}
      {poolStatus === PoolStatus.Closed && poolInfo && (
        <RowLabel
          style={{
            padding: '40px 0 48px',
            borderTop: '1px solid rgba(255, 255, 255, 0.2)'
          }}
        >
          <Typography className="value" style={{ fontSize: 16 }}>
            Final Bid Price
          </Typography>
          <Typography className="value" style={{ fontSize: 28 }}>
            {poolInfo?.currentBidderAmount?.toSignificant() || '--'} {poolInfo?.currentBidderAmount?.currency.symbol}
          </Typography>
        </RowLabel>
      )}
      {poolStatus === PoolStatus.Closed && poolInfo && <ClosedSection poolInfo={poolInfo} />}
      {poolStatus === PoolStatus.Live &&
        poolInfo &&
        poolInfo.enableWhiteList &&
        !poolInfo.whitelistData?.isUserInWhitelist && <></>}
      {poolStatus === PoolStatus.Live &&
        poolInfo &&
        (!poolInfo.enableWhiteList || (poolInfo.enableWhiteList && poolInfo.whitelistData?.isUserInWhitelist)) && (
          <LiveSection poolInfo={poolInfo}></LiveSection>
        )}
    </Box>
  )
}
export default BidAction

export function LiveSection({ poolInfo }: { poolInfo: MutantEnglishAuctionNFTPoolProp }) {
  const { account, chainId } = useActiveWeb3React()
  const toggleWallet = useWalletModalToggle()
  const switchNetwork = useSwitchNetwork()
  const ethBalance = useETHBalance(account || undefined, poolInfo.ethChainId)
  const token1Balance = useCurrencyBalance(account || undefined, poolInfo?.currentBidderAmount?.currency)
  const { bidCallback, submitted: placeBidSubmitted, bidPrevGasFee } = useMutantEnglishBidCallback(poolInfo)

  const isInsufficientBalance = useMemo(() => {
    if (!poolInfo) return undefined
    if (!poolInfo.currentBidderAmount || !ethBalance || !token1Balance || !bidPrevGasFee) {
      return {
        disabled: true,
        children: (
          <NoticeLabel color="#908E96">
            <>
              Loading balance
              <Dots />
            </>
          </NoticeLabel>
        )
      }
    }
    if (poolInfo.currencyAmountMin1?.currency.isNative) {
      const ca = poolInfo.currentBidderAmount.add(bidPrevGasFee)
      if (ca.greaterThan(ethBalance)) {
        return {
          disabled: true,
          children: (
            <NoticeLabel>
              <>
                <ReportIcon />
                Insufficient {ca?.currency.symbol} balance
              </>
            </NoticeLabel>
          )
        }
      }
    } else {
      const token1Insufficient = poolInfo.currentBidderAmount.greaterThan(token1Balance)
      const gasInsufficient = bidPrevGasFee.greaterThan(ethBalance)

      if (token1Insufficient || gasInsufficient) {
        return {
          disabled: true,
          children: (
            <Stack spacing={5}>
              {token1Insufficient && (
                <NoticeLabel>
                  <>
                    <ReportIcon />
                    Insufficient {poolInfo.currentBidderAmount?.currency.symbol} balance
                  </>
                </NoticeLabel>
              )}
              {gasInsufficient && (
                <NoticeLabel>
                  <>
                    <ReportIcon />
                    Insufficient {bidPrevGasFee?.currency.symbol} balance
                  </>
                </NoticeLabel>
              )}
            </Stack>
          )
        }
      }
    }
    return undefined
  }, [bidPrevGasFee, ethBalance, poolInfo, token1Balance])

  const [approvalState, approveCallback] = useApproveCallback(
    poolInfo.currentBidderAmount,
    chainId === poolInfo.ethChainId ? MUTANT_ENGLISH_AUCTION_NFT_CONTRACT_ADDRESSES[poolInfo.ethChainId] : undefined,
    true
  )

  const toBid = useCallback(async () => {
    if (!poolInfo.currentBidderAmount) return
    showRequestConfirmDialog({ dark: true })
    try {
      const { transactionResult } = await bidCallback(poolInfo.currentBidderAmount)
      const ret = new Promise((resolve, rpt) => {
        showWaitingTxDialog(
          () => {
            hideDialogConfirmation()
            rpt()
          },
          { dark: true }
        )
        transactionResult.then(curReceipt => {
          resolve(curReceipt)
        })
      })
      ret
        .then(() => {
          hideDialogConfirmation()
          show(DialogDarkTips, {
            iconType: 'success',
            againBtn: 'Close',
            title: 'Congratulations!',
            content: `You have successfully bid amount ${poolInfo.currentBidderAmount?.toSignificant()} ${
              poolInfo.token1.symbol
            }`
          })
        })
        .catch()
    } catch (error) {
      const err: any = error
      hideDialogConfirmation()
      show(DialogDarkTips, {
        iconType: 'error',
        againBtn: 'Try Again',
        cancelBtn: 'Cancel',
        title: 'Oops..',
        content: err?.reason || err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
        onAgain: toBid
      })
    }
  }, [bidCallback, poolInfo.currentBidderAmount, poolInfo.token1.symbol])

  const toApprove = useCallback(async () => {
    showRequestApprovalDialog({ dark: true })
    try {
      const { transactionReceipt } = await approveCallback()
      const ret = new Promise((resolve, rpt) => {
        showWaitingTxDialog(
          () => {
            hideDialogConfirmation()
            rpt()
          },
          { dark: true }
        )
        transactionReceipt.then(curReceipt => {
          resolve(curReceipt)
        })
      })
      ret
        .then(() => {
          hideDialogConfirmation()
          toBid()
        })
        .catch()
    } catch (error) {
      const err: any = error
      hideDialogConfirmation()
      show(DialogDarkTips, {
        iconType: 'error',
        againBtn: 'Try Again',
        cancelBtn: 'Cancel',
        title: 'Oops..',
        content: err?.reason || err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
        onAgain: toApprove
      })
    }
  }, [approveCallback, toBid])

  const approveContent = useMemo(() => {
    if (approvalState !== ApprovalState.APPROVED) {
      if (approvalState === ApprovalState.PENDING) {
        return (
          <PlaceBidBtn loadingPosition="start" variant="contained" fullWidth loading>
            Approving {poolInfo.token1?.symbol}
          </PlaceBidBtn>
        )
      }
      if (approvalState === ApprovalState.UNKNOWN) {
        return (
          <PlaceBidBtn loadingPosition="start" variant="contained" fullWidth loading>
            Loading <Dots />
          </PlaceBidBtn>
        )
      }
      if (approvalState === ApprovalState.NOT_APPROVED) {
        return (
          <PlaceBidBtn variant="contained" onClick={toApprove} fullWidth>
            Approve use of {poolInfo.token1?.symbol}
          </PlaceBidBtn>
        )
      }
    }
    return undefined
  }, [approvalState, poolInfo.token1?.symbol, toApprove])

  const isWinner = useMemo(
    () => account && poolInfo.currentBidder?.toString() === account?.toString(),
    [account, poolInfo.currentBidder]
  )
  const isOutBid = useMemo(() => {
    return (
      account &&
      poolInfo.participant.address?.toLowerCase() === account.toLowerCase() &&
      poolInfo.currentBidder?.toLowerCase() !== account?.toLowerCase()
    )
  }, [account, poolInfo.currentBidder, poolInfo.participant.address])

  if (!account) {
    return <PlaceBidBtn onClick={toggleWallet}>Connect Wallet</PlaceBidBtn>
  }
  if (chainId !== poolInfo.ethChainId) {
    return <PlaceBidBtn onClick={() => switchNetwork(poolInfo.ethChainId)}>Switch Network</PlaceBidBtn>
  }

  return (
    <>
      {isWinner ? (
        <BidResultAlert
          isWinner={false}
          isClose={false}
          winnerImg={undefined}
          leftText="You are the highest bidder!"
          tokenImg={poolInfo.token1.smallUrl || ''}
          tokenText={`${poolInfo.distributeRewards.lastBidderRewards?.toSignificant()} ${poolInfo.token1.symbol}`}
        />
      ) : isOutBid ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            padding: '32px',
            background: '#20201E',
            borderRadius: '8px',
            mb: 32,
            mt: 48
          }}
        >
          <Stack
            width={'100%'}
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            gridTemplateColumns={'1fr 1px 1fr'}
          >
            <RewardBox
              icon={Icon0}
              text="This round of bidding rewards"
              TokenLogo={poolInfo.token1.smallUrl || ''}
              symbol={poolInfo.token1.symbol}
              Amount={poolInfo.participant.prevBidderRewardAmount?.toSignificant() || '--'}
            />
            <Stack sx={{ width: '1px', height: 43, backgroundColor: '#fff' }}></Stack>
            <RewardBox
              icon={Icon1}
              text="Return bid amount and gas fee"
              TokenLogo={bidPrevGasFee?.currency.logo || ''}
              symbol={bidPrevGasFee?.currency.symbol || ''}
              Amount={poolInfo.participant.prevBidderGasfeeAmount?.toSignificant() || '--'}
            />
          </Stack>
          <Typography
            ml={12}
            mt={48}
            sx={{
              fontFamily: 'Inter',
              fontSize: 16,
              lineHeight: '150%',
              color: '#D7D6D9'
            }}
          >
            Someone made a higher offer and your money is returned to your wallet with gas compensation.(Your Bid
            Amount: {poolInfo.participant.accountBidAmount?.toSignificant() || '-'} {poolInfo.token1.symbol})
          </Typography>
          <Box sx={{ marginBottom: '-48px' }}>
            {approveContent && !isInsufficientBalance?.disabled ? (
              approveContent
            ) : (
              <Stack>
                <PlaceBidBtn
                  disabled={isInsufficientBalance?.disabled === true}
                  loading={placeBidSubmitted.submitted}
                  onClick={toBid}
                  loadingPosition="start"
                  variant="contained"
                  fullWidth
                >
                  <img
                    src={BidIcon}
                    style={{
                      width: '16px',
                      height: '16px',
                      marginRight: '10px'
                    }}
                    alt=""
                    srcSet=""
                  />
                  <Typography
                    sx={{
                      fontFamily: `'Public Sans'`,
                      fontStyle: 'italic',
                      fontWeight: 100,
                      fontSize: { xs: 18, md: 20 },
                      color: 'var(--ps-text-5)'
                    }}
                  >
                    Place Another Bid
                  </Typography>
                </PlaceBidBtn>
                <PoolInfoItem
                  sx={{ paddingBottom: 30 }}
                  title="You will pay"
                  tip={`Including the GAS(${bidPrevGasFee?.toSignificant() || '-'} ${
                    bidPrevGasFee?.currency.symbol
                  }) cost of the previous participant`}
                >
                  <Typography color={'#fff'}>
                    {bidPrevGasFee &&
                    poolInfo.currentBidderAmount &&
                    bidPrevGasFee.currency.equals(poolInfo.currentBidderAmount.currency)
                      ? `${bidPrevGasFee.add(poolInfo.currentBidderAmount).toSignificant()} ${poolInfo.token1.symbol}`
                      : `(${bidPrevGasFee?.toSignificant() || '-'} ${bidPrevGasFee?.currency.symbol}) + (
            ${poolInfo.currentBidderAmount?.toSignificant() || '-'} ${poolInfo.token1.symbol})`}
                  </Typography>
                </PoolInfoItem>
              </Stack>
            )}
            {isInsufficientBalance?.children}
          </Box>
        </Box>
      ) : null}
      <Box>
        {!isWinner && !poolInfo.participant.accountBidAmount && approveContent && !isInsufficientBalance?.disabled ? (
          approveContent
        ) : !isWinner && !poolInfo.participant.accountBidAmount ? (
          <Stack>
            <PlaceBidBtn
              disabled={isInsufficientBalance?.disabled === true}
              loading={placeBidSubmitted.submitted}
              onClick={toBid}
              loadingPosition="start"
              variant="contained"
              fullWidth
            >
              <img
                src={BidIcon}
                style={{
                  width: '16px',
                  height: '16px',
                  marginRight: '10px'
                }}
                alt=""
                srcSet=""
              />
              <Typography
                sx={{
                  fontFamily: `'Public Sans'`,
                  fontStyle: 'italic',
                  fontWeight: 100,
                  fontSize: { xs: 18, md: 20 },
                  color: 'var(--ps-text-5)'
                }}
              >
                Place A Bid
              </Typography>
            </PlaceBidBtn>
            <PoolInfoItem
              title="You will pay"
              tip={`Including the GAS(${bidPrevGasFee?.toSignificant() || '-'} ${
                bidPrevGasFee?.currency.symbol
              }) cost of the previous participant`}
            >
              <Typography color={'#fff'} mt={10}>
                {bidPrevGasFee &&
                poolInfo.currentBidderAmount &&
                bidPrevGasFee.currency.equals(poolInfo.currentBidderAmount.currency)
                  ? `${bidPrevGasFee.add(poolInfo.currentBidderAmount).toSignificant()} ${poolInfo.token1.symbol}`
                  : `(${bidPrevGasFee?.toSignificant() || '-'} ${bidPrevGasFee?.currency.symbol}) + (
            ${poolInfo.currentBidderAmount?.toSignificant() || '-'} ${poolInfo.token1.symbol})`}
              </Typography>
            </PoolInfoItem>
          </Stack>
        ) : null}
        {isInsufficientBalance?.children}
      </Box>
    </>
  )
}

function ClosedSection({ poolInfo }: { poolInfo: MutantEnglishAuctionNFTPoolProp }) {
  const { account, chainId } = useActiveWeb3React()
  const toggleWallet = useWalletModalToggle()
  const switchNetwork = useSwitchNetwork()
  const [openShippingDialog, setOpenShippingDialog] = useState<boolean>(false)
  const { bidPrevGasFee } = useMutantEnglishBidCallback(poolInfo)

  const isWinner = useMemo(
    () => account && poolInfo.currentBidder?.toString() === account?.toString(),
    [account, poolInfo.currentBidder]
  )

  const isOutBid = useMemo(() => {
    return (
      account &&
      poolInfo.participant.address?.toLowerCase() === account.toLowerCase() &&
      poolInfo.currentBidder?.toLowerCase() !== account?.toLowerCase()
    )
  }, [account, poolInfo.currentBidder, poolInfo.participant.address])

  const {
    run: bidderClaim,
    submitted,
    isClaimed
  } = useBidderClaimEnglishAuctionNFT(poolInfo.poolId, poolInfo.name, poolInfo.contract)

  const toBidderClaim = useCallback(async () => {
    showRequestConfirmDialog({ dark: true })
    try {
      const { transactionReceipt } = await bidderClaim()
      const ret = new Promise((resolve, rpt) => {
        showWaitingTxDialog(
          () => {
            hideDialogConfirmation()
            rpt()
          },
          { dark: true }
        )
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
            content: `You have successfully claim ${poolInfo.token0.symbol || 'NFT'} for ${poolInfo.name}`
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
        content: err?.reason || err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
        onAgain: toBidderClaim
      })
    }
  }, [bidderClaim, poolInfo.name, poolInfo.token0.symbol])

  if (!account) {
    return <PlaceBidBtn onClick={toggleWallet}>Connect Wallet</PlaceBidBtn>
  }
  if (chainId !== poolInfo.ethChainId) {
    return <PlaceBidBtn onClick={() => switchNetwork(poolInfo.ethChainId)}>Switch Network</PlaceBidBtn>
  }

  return isWinner ? (
    <Stack>
      <BidResultAlert
        isWinner={true}
        isClose={true}
        winnerImg={WinTips}
        leftText="Congratulations! You win the auction and get rewarded"
        tokenImg={poolInfo.token1.smallUrl || ''}
        tokenText={`${poolInfo.distributeRewards.lastBidderRewards?.toSignificant()} ${poolInfo.token1.symbol}`}
      />
      <PlaceBidBtn
        onClick={() =>
          chainId !== poolInfo.ethChainId
            ? switchNetwork(poolInfo.ethChainId)
            : setOpenShippingDialog(!openShippingDialog)
        }
        loadingPosition="start"
        loading={submitted.submitted}
        disabled={poolInfo.claimAt > getCurrentTimeStamp()}
      >
        <img
          src={BidIcon}
          style={{
            width: '16px',
            height: '16px',
            marginRight: '10px'
          }}
          alt=""
          srcSet=""
        />
        {/* Check Logistics Information */}
        {poolInfo.participant.claimed || isClaimed ? 'Claimed & Edit info' : 'Claim NFT & Send address'}
      </PlaceBidBtn>
      <Typography
        sx={{
          mt: 5,
          textAlign: 'center',
          fontFamily: `'Inter'`,
          color: 'var(--ps-text-2)',
          fontSize: '13px'
        }}
      >
        {poolInfo.participant.claimed || isClaimed
          ? 'We will contact you in the near future'
          : `Claim start time: ${new Date(poolInfo.claimAt * 1000).toLocaleString()}`}
      </Typography>

      {openShippingDialog && (
        <ShippingDialog
          submitCallback={isClaimed ? undefined : toBidderClaim}
          handleClose={() => setOpenShippingDialog(false)}
        />
      )}
    </Stack>
  ) : isOutBid ? (
    <Box sx={{ backgroundColor: '#20201e' }} padding={32}>
      <Typography sx={{ fontSize: 16, fontFamily: 'Inter', color: '#fff' }}>
        {`You didn't succeed in the auction and your tokens are returned to your wallet with gas compensation.(Your Bid Amount: ${
          poolInfo.participant.accountBidAmount?.toSignificant() || '-'
        } ${poolInfo.token1.symbol})`}
      </Typography>
      <Stack
        width={'100%'}
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        mt={48}
        gridTemplateColumns={'1fr 1px 1fr'}
      >
        <RewardBox
          icon={Icon0}
          text="This round of bidding rewards"
          TokenLogo={poolInfo.token1.smallUrl || ''}
          symbol={poolInfo.token1.symbol}
          Amount={poolInfo.participant.prevBidderRewardAmount?.toSignificant() || '--'}
        />
        <Stack sx={{ width: '1px', height: 43, backgroundColor: '#fff' }}></Stack>
        <RewardBox
          icon={Icon1}
          text="Return bid amount and gas fee"
          TokenLogo={bidPrevGasFee?.currency.logo || ''}
          symbol={bidPrevGasFee?.currency.symbol || ''}
          Amount={poolInfo.participant.prevBidderGasfeeAmount?.toSignificant() || '--'}
        />
      </Stack>
    </Box>
  ) : null
}

function BidResultAlert({
  isWinner = false,
  isClose,
  winnerImg,
  tokenImg,
  leftText,
  tokenText
}: {
  isWinner: boolean
  isClose: boolean
  winnerImg: string | undefined
  tokenImg: string | undefined
  leftText: string
  tokenText: string
}) {
  const isSm = useIsSMDown()

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '60px',
        height: 'auto',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#20201e',
        padding: '40px 16px 32px'
      }}
      mt={48}
      mb={32}
    >
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        {!isClose && (
          <>
            <WhiteText>{leftText}</WhiteText>
            <svg xmlns="http://www.w3.org/2000/svg" width="65" height="65" viewBox="0 0 65 65" fill="none">
              <g clipPath="url(#clip0_907_94573)">
                <path
                  d="M60.2865 29.9489L60.123 32.8076L60.0501 34.2547C60.0145 34.7258 59.8865 35.1951 59.7976 35.6662L59.291 38.5071C59.019 39.4298 58.7114 40.3347 58.4038 41.2573C57.083 44.8573 55.2198 48.42 52.6332 51.3871C50.0533 54.402 47.0566 57.0335 43.7336 59.2022C40.3505 61.3729 36.859 63.0547 32.843 64.2849L32.1585 64.5L31.3994 64.2476C28.6865 63.3604 26.4252 62.2938 24.1087 60.9907C21.8474 59.7071 19.659 58.26 17.6874 56.5036L16.203 55.2022L14.8092 53.7907C13.8687 52.868 13.0545 51.8191 12.2225 50.788C10.6161 48.6763 9.24507 46.3955 8.13362 43.9862C7.0474 41.5809 6.16207 39.0653 5.63762 36.4964C5.5114 35.8458 5.31229 35.2129 5.2394 34.5604L5.00474 32.6244C4.87851 31.3213 4.66162 30.0733 4.73274 28.5729C4.84118 25.6964 5.72829 22.9284 7.06696 20.5587C8.41123 18.2373 10.1215 16.1481 12.1318 14.372L18.283 8.94444L15.3158 16.3649C14.3025 18.916 13.8136 21.9364 14.9727 23.8351C15.5327 24.7756 16.5461 25.2822 17.7941 25.3C19.0972 25.3 20.4163 24.9391 21.1221 24.0698C21.8456 23.22 21.9007 21.8813 21.4474 20.596C20.8678 19.2573 20.3256 17.4493 20.3985 15.8031C20.3985 14.1213 20.8874 12.4378 21.7372 10.9729C22.6047 9.508 23.8527 8.31333 25.2643 7.428L27.0918 6.28844L26.5852 8.404C26.0607 10.5747 26.4412 12.8538 27.8883 14.2476C29.3176 15.6413 31.579 16.1284 33.4047 15.6591C35.2323 15.1702 36.4625 13.6876 36.5336 12.0591C36.6776 10.3773 35.7923 8.47689 34.6527 6.72222L30.603 0.5L37.5132 3.39422C39.4492 4.19067 41.3656 5.09378 43.1754 6.36133C44.9656 7.62711 46.7381 9.22 47.9505 11.3178C49.2163 13.38 49.7407 15.9116 49.6874 18.1373C49.6874 18.6973 49.6518 19.2413 49.6145 19.7836C49.5416 20.3258 49.5238 20.7613 49.3976 21.4476C49.1807 22.66 48.8554 23.5631 48.5834 24.4858C48.0234 26.2582 47.6607 28.0858 48.059 29.044C48.2936 29.9489 50.3558 30.6547 51.8758 30.4556C53.5043 30.292 55.0225 29.1524 56.091 27.652C57.1576 26.132 57.7194 24.2333 58.0092 22.3524L58.2438 20.8698L58.7683 22.2262C59.7443 24.6849 60.3043 27.3089 60.2865 29.9489Z"
                  fill="#F4900C"
                />
                <path
                  d="M59.4268 29.8326C59.4251 27.2317 59.5477 25.8824 58.5255 23.5749C57.8268 30.3731 52.7868 32.7197 48.2286 31.0949C43.9584 29.5713 46.8366 23.6317 47.0482 20.7962C47.4073 15.9909 47.0304 10.4922 36.5255 5.91797C40.89 12.8566 37.0304 17.166 32.9824 17.4291C28.4917 17.7206 24.378 14.222 25.8962 8.54552C20.9806 11.5553 20.8366 16.622 22.3531 19.8984C23.9353 23.3135 22.2891 26.1526 18.4313 26.4673C14.1184 26.8211 11.7237 22.6309 13.9317 15.9553C10.1077 19.6957 7.39663 24.5544 7.80018 29.8309C9.64196 53.8895 32.218 60.814 32.218 60.814C32.218 60.814 59.4517 54.1349 59.4268 29.8326Z"
                  fill="#FFCC4D"
                />
                <path
                  d="M55.4971 35.1534C55.4971 31.7429 54.1424 28.4721 51.731 26.0603C49.3196 23.6486 46.0489 22.2934 42.6384 22.293C40.5939 22.2929 38.579 22.7812 36.7614 23.7172C34.9437 24.6532 33.376 26.0099 32.1887 27.6743C31.0015 26.0102 29.434 24.6536 27.6167 23.7176C25.7994 22.7816 23.7849 22.2932 21.7407 22.293C18.3299 22.293 15.0588 23.6479 12.647 26.0597C10.2352 28.4715 8.88022 31.7426 8.88022 35.1534C8.88022 36.1596 9.00822 37.1339 9.22689 38.0743C11.0118 49.1676 23.3478 60.8725 32.1869 64.0868C41.026 60.8725 53.362 49.1694 55.1451 38.0761C55.3764 37.119 55.4946 36.1381 55.4971 35.1534Z"
                  fill="#DD2E44"
                />
                <path
                  d="M43.7196 56.6026C43.7196 56.6026 46.2547 51.6799 46.0644 46.567C45.9969 44.7466 45.4831 42.9777 44.756 41.3084C43.0529 37.4044 39.7675 27.6088 46.7951 22.3555C46.7951 22.3555 45.4529 24.6115 46.644 28.7217C47.1151 30.3484 47.9969 31.8168 49.044 33.1484C51.4618 36.2275 56.5444 44.7057 48.1835 52.6115L43.7196 56.6026ZM30.1035 63.2301C30.1035 63.2301 27.2929 60.5368 25.7996 56.7377C25.268 55.3848 25.0778 53.9288 25.0778 52.4746C25.076 49.0772 24.3507 40.8675 17.5364 39.271C17.5364 39.271 19.2378 40.4924 19.6787 43.8772C19.8529 45.2159 19.6769 46.5724 19.3373 47.879C18.5533 50.903 17.6093 58.3839 26.2458 61.495L30.1035 63.2301Z"
                  fill="#FFCC4D"
                />
              </g>
              <defs>
                <clipPath id="clip0_907_94573">
                  <rect width="64" height="64" fill="white" transform="translate(0.5 0.5)" />
                </clipPath>
              </defs>
            </svg>
          </>
        )}
        {winnerImg && (
          <img
            style={{
              display: 'inline-block',
              width: '64px',
              height: '64px'
            }}
            src={winnerImg}
            alt=""
            srcSet=""
          />
        )}
        {!isClose && <WhiteText>If you are the final winner you will get an extra</WhiteText>}
        {isWinner && <WhiteText>{leftText}</WhiteText>}
      </Box>
      {!isClose && (
        <Typography color={'#D7D6D9'} fontSize={14} mb={25}>
          Current Final Winner Prize Pool
        </Typography>
      )}
      <RowLabel>
        <TokenImage src={tokenImg} alt={'token img'} size={20} />
        <Typography
          className="value"
          style={{
            color: '#fff',
            marginLeft: 8,
            fontWeight: 600,
            lineHeight: '130%',
            fontSize: isSm ? '24px' : '36px'
          }}
        >
          {tokenText}
        </Typography>
      </RowLabel>
    </Box>
  )
}

export function NoticeLabel({ color, children }: { children: JSX.Element; color?: string }) {
  return (
    <Typography mt={5} display={'flex'} alignItems={'center'} variant="body2" sx={{ color: color || '#FD3333' }}>
      {children}
    </Typography>
  )
}
