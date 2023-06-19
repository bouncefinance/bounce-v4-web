import { Box, Stack, Typography, styled } from '@mui/material'
import { useState, useMemo, useCallback } from 'react'
import BidIcon from 'assets/imgs/thirdPart/foundoDetail/bidIcon.svg'
import WinTips from 'assets/imgs/thirdPart/foundoDetail/winTips.png'
import DidDialog, { PlaceBidBtn } from './bidDialog'
import { useCountDown } from 'ahooks'
import { EnglishAuctionNFTPoolProp, PoolStatus } from 'api/pool/type'
import { useIsSMDown } from 'themes/useTheme'
import { useEnglishAuctionPoolInfo } from 'pages/auction/englishAuctionNFT/ValuesProvider'
import TokenImage from 'bounceComponents/common/TokenImage'
import PriceChartView from 'bounceComponents/englishAuction/PriceChartView'
import { useActiveWeb3React } from 'hooks'
import { useBidderClaimEnglishAuctionNFT } from 'bounceHooks/auction/useCreatorClaimNFT'
import { hideDialogConfirmation, showRequestConfirmDialog, showWaitingTxDialog } from 'utils/auction'
import DialogTips from 'bounceComponents/common/DialogTips'
import { show } from '@ebay/nice-modal-react'

export enum BidType {
  'dataView' = 0,
  'chartView' = 1
}
interface DataViewParam {
  priceFloor: number | string
  increase: number | string
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
        <Typography className="value">English Auction</Typography>
      </RowLabel>
      <RowLabel>
        <Typography className="label">Price Floor</Typography>
        <Typography className="value">{priceFloor}</Typography>
      </RowLabel>
      <RowLabel>
        <Typography className="label">Every time Minimum Price Increase</Typography>
        <Typography className="value">{increase}</Typography>
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
  const [viewType, setViewType] = useState<BidType>(BidType.dataView)
  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const { data: poolInfo } = useEnglishAuctionPoolInfo()
  const OpenAt = useMemo(() => poolInfo?.openAt || 0, [poolInfo?.openAt])
  const poolStatus = useMemo(() => poolInfo?.status, [poolInfo?.status])
  return (
    <Box
      sx={{
        width: isSm ? '100%' : '640px'
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
        <Typography
          sx={{
            fontFamily: `'Public Sans'`,
            fontWeight: 600,
            fontSize: isSm ? 13 : 14,
            color: '#fff',
            textDecoration: 'underline',
            cursor: 'pointer'
          }}
          onClick={() => {
            const result = viewType === BidType.chartView ? BidType.dataView : BidType.chartView
            setViewType(result)
          }}
        >
          {viewType === BidType.chartView ? 'Chart View' : 'Data View'}
        </Typography>
      </Box>
      {viewType === BidType.dataView && (
        <DataView
          priceFloor={`${poolInfo?.currencyAmountMin1?.toSignificant()} ${
            poolInfo?.currencyAmountMin1?.currency.symbol
          }`}
          increase={`${poolInfo?.currencyAmountMinIncr1?.toSignificant()} ${
            poolInfo?.currencyAmountMin1?.currency.symbol
          }`}
        />
      )}
      {viewType === BidType.chartView && poolInfo && <PriceChartView isDark showText={false} poolInfo={poolInfo} />}
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
            {poolInfo?.currentBidderAmount1?.toSignificant() || '--'} {poolInfo?.currentBidderAmount1?.currency.symbol}
          </Typography>
        </RowLabel>
      </RowLabel>
      {/* closed and win tips */}
      {poolStatus === PoolStatus.Closed && poolInfo && <ClosedSection poolInfo={poolInfo} />}

      {poolStatus === PoolStatus.Live && poolInfo && (
        <LiveSection click={() => setOpenDialog(!openDialog)} poolInfo={poolInfo}></LiveSection>
      )}

      {openDialog && <DidDialog handleClose={() => setOpenDialog(false)} />}
    </Box>
  )
}
export default BidAction

function LiveSection({ click, poolInfo }: { click: () => void; poolInfo: EnglishAuctionNFTPoolProp }) {
  const { account } = useActiveWeb3React()
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
      <PlaceBidBtn onClick={click}>
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
    </>
  )
}

function ClosedSection({ poolInfo }: { poolInfo: EnglishAuctionNFTPoolProp }) {
  const { account } = useActiveWeb3React()
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

  const { run: bidderClaim, submitted } = useBidderClaimEnglishAuctionNFT(
    poolInfo.poolId,
    poolInfo.name,
    poolInfo.contract
  )

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

  return isWinner ? (
    <Stack>
      <BidResultAlert
        leftImg={WinTips}
        leftText="Congratulations! You win the auction"
        rightImg={poolInfo.token1.smallUrl}
        rightText={`${poolInfo.currentBidderAmount1?.toSignificant()} ${poolInfo.token1.symbol}`}
      />
      <PlaceBidBtn onClick={toBidderClaim} loadingPosition="start" loading={submitted.submitted}>
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
        Check Logistics Information
      </PlaceBidBtn>
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
