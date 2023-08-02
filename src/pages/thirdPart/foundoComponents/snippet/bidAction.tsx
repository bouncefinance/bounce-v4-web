import { Box, Stack, Typography, styled } from '@mui/material'
import { useState, useMemo, useCallback } from 'react'
import BidIcon from 'assets/imgs/thirdPart/foundoDetail/bidIcon.svg'
import WinTips from 'assets/imgs/thirdPart/foundoDetail/winTips.png'
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
import { useMutantEnglishAuctionPool, useMutantEnglishBidCallback } from 'hooks/useMutantEnglishAuctionPool'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { MUTANT_ENGLISH_AUCTION_NFT_CONTRACT_ADDRESSES } from '../../../../constants'
import DialogDarkTips from 'bounceComponents/common/DialogTips/DialogDarkTips'
import ReportIcon from '@mui/icons-material/Report'
import { Dots } from 'themes'
import PoolInfoItem from 'bounceComponents/fixed-swap/PoolInfoItem'
import { useCurrencyBalance, useETHBalance } from 'state/wallet/hooks'
import BigNumber from 'bignumber.js'

export enum BidType {
  'dataView' = 0,
  'chartView' = 1
}
interface DataViewParam {
  priceFloor: number | string
  increase: string
}
export const RowLabel = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'space-between',
  alignItems: 'center',
  '.label': {
    color: 'var(--ps-text-2)',
    fontFamily: `'Public Sans'`,
    fontWeight: 500,
    fontSize: 16
  },
  '.value': {
    color: 'var(--ps-text-5)',
    fontFamily: `'Public Sans'`,
    fontWeight: 500,
    fontSize: 16
  },
  [theme.breakpoints.down('md')]: {
    '.label': {
      fontSize: 14
    },
    '.value': {
      fontSize: 14
    }
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

function DataView(props: DataViewParam) {
  const { priceFloor, increase } = props
  return (
    <Stack
      spacing={16}
      sx={{
        padding: '48px 0 24px'
      }}
    >
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
const UpcomingStatus = (props: { OpenAt: string | number; text?: string }) => {
  const { OpenAt, text } = props
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate: Number(OpenAt) * 1000
  })
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex'
      }}
      gap={'8px'}
    >
      {countdown > 0 ? (
        <>
          <LiveStr>{text || 'Open At'} </LiveStr>
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

const BidAction = () => {
  const isSm = useIsSMDown()
  const { data: poolInfo } = useMutantEnglishAuctionPool(20340)
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
        padding: '120px 0 120px 63px'
      }}
    >
      {/* Pool Status */}
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
        {poolStatus === PoolStatus.Live && <UpcomingStatus text="Live" OpenAt={poolInfo?.closeAt || 0} />}
        {(poolStatus === PoolStatus.Cancelled || poolStatus === PoolStatus.Finish) && (
          <Typography color={'#fff'}>Finish</Typography>
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
        <RowLabel
          style={{
            padding: '24px 0 32px',
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
      )}
      {/* closed and win tips */}
      {poolStatus === PoolStatus.Closed && poolInfo && <ClosedSection poolInfo={poolInfo} />}
      {poolStatus === PoolStatus.Live && poolInfo && <LiveSection poolInfo={poolInfo}></LiveSection>}
    </Box>
  )
}
export default BidAction

function LiveSection({ poolInfo }: { poolInfo: MutantEnglishAuctionNFTPoolProp }) {
  const { account, chainId } = useActiveWeb3React()
  const toggleWallet = useWalletModalToggle()
  const switchNetwork = useSwitchNetwork()
  console.log('poolInfo', poolInfo)
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
        content: err?.error?.message || err?.data?.message || err?.message || err || 'Something went wrong',
        onAgain: toBid
      })
    }
  }, [bidCallback, poolInfo.currentBidderAmount, poolInfo.token1.symbol])

  const toApprove = useCallback(async () => {
    showRequestApprovalDialog({ dark: true })
    try {
      const { transactionReceipt } = await approveCallback()
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
          toBid()
        })
        .catch()
    } catch (error) {
      const err: any = error
      console.error(err)
      hideDialogConfirmation()
      show(DialogDarkTips, {
        iconType: 'error',
        againBtn: 'Try Again',
        cancelBtn: 'Cancel',
        title: 'Oops..',
        content: err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
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
          leftImg=""
          leftText="You are the highest bidder!"
          rightImg={poolInfo.token1.smallUrl}
          rightText={`${poolInfo.currentBidderAmount1?.toSignificant()} ${poolInfo.token1.symbol}`}
        />
      ) : isOutBid ? (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            padding: '12px 16px',
            background: 'rgba(255, 255, 255, 0.2)',
            mb: 32
          }}
        >
          <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.9885 0.797839C11.4387 -0.000319883 12.5613 -0.000321895 13.0115 0.797837L23.841 19.9984C24.2921 20.7982 23.7298 21.7992 22.8295 21.7992H1.17054C0.270181 21.7992 -0.292074 20.7982 0.159036 19.9984L10.9885 0.797839Z"
              fill="white"
            />
            <path d="M10.6758 16.2705V18.9262H13.3134V16.2705H10.6758Z" fill="black" />
            <path d="M13.3158 6.60938V14.7698H10.6758V6.60938H13.3158Z" fill="black" />
          </svg>
          <Typography
            ml={12}
            sx={{
              fontFamily: 'Inter',
              fontSize: 13,
              color: '#D7D6D9'
            }}
          >
            Someone made a higher offer and your money is returned to your wallet with gas compensation.(Your Bid
            Amount: {poolInfo.participant.accountBidAmount?.toSignificant() || '-'} {poolInfo.token1.symbol})
          </Typography>
        </Box>
      ) : null}
      <Box>
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
        )}
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
        content: err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
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
        leftImg={WinTips}
        leftText="Congratulations! You win the auction"
        rightImg={poolInfo.token1.smallUrl}
        rightText={`${poolInfo.currentBidderAmount1?.toSignificant()} ${poolInfo.token1.symbol}`}
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
    <Box>
      <Typography sx={{ fontSize: 16, fontFamily: 'Inter', color: '#fff' }}>
        {`You didn't succeed in the auction and your money is returned to your wallet with gas compensation.(Your Bid Amount: ${
          poolInfo.participant.accountBidAmount?.toSignificant() || '-'
        } ${poolInfo.token1.symbol})`}
      </Typography>
    </Box>
  ) : null
}

function BidResultAlert({
  leftImg,
  rightImg,
  leftText,
  rightText
}: {
  leftImg: string | undefined
  rightImg: string | undefined
  leftText: string
  rightText: string
}) {
  const isSm = useIsSMDown()

  return (
    <Box
      sx={{
        width: '100%',
        height: '60px',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        background: '#E1F25C',
        padding: '0 16px'
      }}
      mb={'32px'}
    >
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <img
          src={leftImg || WinTips}
          style={{
            width: '24px',
            height: '24px',
            marginRight: isSm ? '16px' : '0'
          }}
          alt=""
        />
        <Typography
          sx={{
            width: isSm ? '149px' : 'auto',
            fontFamily: `'Inter'`,
            color: 'var(--ps-text-3)',
            fontSize: '13px'
          }}
        >
          {leftText}
        </Typography>
      </Box>
      <RowLabel
        style={{
          justifyContent: 'flex-end'
        }}
      >
        <img
          style={{
            display: 'inline-block',
            width: '20px',
            height: '20px',
            marginRight: '8px'
          }}
          src={rightImg}
          alt=""
          srcSet=""
        />
        <Typography
          className="value"
          style={{
            color: 'var(--ps-text-3)',
            height: '20px',
            lineHeight: '20px',
            fontSize: isSm ? '14px' : '16px'
          }}
        >
          {rightText}
        </Typography>
      </RowLabel>
    </Box>
  )
}

function NoticeLabel({ color, children }: { children: JSX.Element; color?: string }) {
  return (
    <Typography mt={5} display={'flex'} alignItems={'center'} variant="body2" sx={{ color: color || '#FD3333' }}>
      {children}
    </Typography>
  )
}
