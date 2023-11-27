import { Box, Stack, Typography, keyframes, styled } from '@mui/material'
import BounceOkxIcon from 'assets/images/bounceOkxIcon.png'
import MNftLogo from 'assets/images/nftLogo.png'
import TokenImage from 'bounceComponents/common/TokenImage'
import PoolInfoItem from 'bounceComponents/fixed-swap/PoolInfoItem'
import DefaultNftIcon from 'bounceComponents/create-auction-pool/TokenERC1155InforationForm/components/NFTCard/emptyCollectionIcon.png'
import { useCallback } from 'react'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import CounterDownBox from './components/CounterDownBox'
import useNftPoolInfo from 'bounceHooks/auction/useNftPoolInfo'
import BidButtonBlock from 'bounceComponents/fixed-swap-nft/ActionBox/UserActionBox2/BidButtonBlock'
import usePlaceBid1155 from 'bounceHooks/auction/usePlaceBid1155'
import { hideDialogConfirmation, showRequestConfirmDialog, showWaitingTxDialog } from 'utils/auction'
import { show } from '@ebay/nice-modal-react'
import DialogTips from 'bounceComponents/common/DialogTips'
import { FixedSwapNFTPoolProp, PoolStatus } from 'api/pool/type'
import BigNumber from 'bignumber.js'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks'
import { shortenAddress } from 'utils'
import CopyToClipboard from 'bounceComponents/common/CopyToClipboard'
import SuccessfullyClaimedAlert from 'bounceComponents/fixed-swap/Alerts/SuccessfullyClaimedAlert'
import ClaimButton from 'bounceComponents/fixed-swap/ActionBox/UserActionBox2/ClaimButton'
import useUserClaim1155 from 'bounceHooks/auction/useUserClaim1155'

const PoolCard = styled(Box)({
  borderRadius: '12px',
  backgroundColor: '#20201E',
  padding: '24px 20px',
  marginTop: 32,
  marginBottom: 24,
  '& .poolTitle': {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: 16,
    color: '#fff',
    lineHeight: '140%',
    paddingBottom: 12,
    textAlign: 'left',
    width: '100%',
    borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
  }
})

const myAnimation = keyframes`
  0% {
    transform: translateX(0px,0px); }
  10% {
    transform: translate(-100px, 100px);
  }
  20% {
    transform: translate(150px, -100px);
  }
  30% {
    transform: translate(-100px,100px);
  }
  40% {
    transform: translate(100px, -150px);
  }
  50% {
    transform: translate(-100px, 200px);
  }
  60% {
    transform: translate(-200px, -100px);
  }
  70% {
    transform: translateY(50px, 100px);
  }
  80% {
    transform: translate(100px, -150px);
  }
  90% {
    transform: translate(0px, 200px);
  }
  100% {
    transform: translate(-100px, 100px);
  }
`

export default function OkxActivity() {
  const { data: poolInfo } = useNftPoolInfo()

  if (!poolInfo) {
    return (
      <Box
        sx={{
          width: '100%',
          height: '70vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <BounceAnime />
      </Box>
    )
  }
  return <Activity poolInfo={poolInfo} />
}

const bidAmount = '1'
export function Activity({ poolInfo }: { poolInfo: FixedSwapNFTPoolProp }) {
  const { account } = useActiveWeb3React()
  const slicedBid1Amount = bidAmount ? new BigNumber(bidAmount).times(poolInfo.ratio).toString() : ''
  const userToken1Balance = useCurrencyBalance(account || undefined, poolInfo.currencyAmountTotal1.currency)

  const { run: bid, submitted: isBidding } = usePlaceBid1155(poolInfo)
  const toBid = useCallback(async () => {
    showRequestConfirmDialog()
    try {
      const { transactionReceipt } = await bid(bidAmount)
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
          // TOTD ?
          show(DialogTips, {
            iconType: 'success',
            againBtn: 'Close',
            title: 'Congratulations!',
            content: `You have successfully bid 1 ${poolInfo?.token0.symbol}`
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
        onAgain: toBid
      })
    }
  }, [bid, poolInfo?.token0.symbol])

  const { run: claim, submitted: claimBidSubmitted } = useUserClaim1155(poolInfo)
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
            content: `You have successfully claimed ${poolInfo.participant.swappedAmount0} ${poolInfo.token0.symbol}`
          })
        })
        .catch()
    } catch (error) {
      const err: any = error
      console.error(err)
      hideDialogConfirmation()
      show(DialogTips, {
        iconType: 'error',
        againBtn: 'Try Again',
        cancelBtn: 'Cancel',
        title: 'Oops..',
        content: err?.reason || err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
        onAgain: toClaim
      })
    }
  }, [claim, poolInfo.participant.swappedAmount0, poolInfo.token0.symbol])

  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100%',
        position: 'relative',
        padding: 0,
        textAlign: 'center',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        '& .noise-wrapper': {
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          opacity: 1,
          overflow: 'hidden',
          zIndex: -1,
          '&:after': {
            content: '""',
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
            // background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%,rgba(0,0,0,0.75) 100%)'
            background: '#121212'
          },
          '& .noise': {
            position: 'absolute',
            zIndex: 1,
            top: '-500px',
            right: '-500px',
            bottom: '-500px',
            left: '-500px',
            background: 'transparent url(https://www.dropbox.com/s/h7ab1c82ctzy83n/noise.png?raw=1) 0 0',
            backgroundSize: '230px 230px',
            opacity: 0.35,
            animation: `${myAnimation} 1s steps(8,end) infinite both`
          }
        },
        '& .content': {
          width: '100%',
          padding: '32px 16px'
        }
      }}
    >
      <Box className="noise-wrapper">
        <Box className="noise"></Box>
      </Box>
      <Box className="content">
        <img width={193} src={BounceOkxIcon} alt="bounce" />
        <Typography
          mt={40}
          color={'#fff'}
          fontSize={20}
          fontWeight={600}
          lineHeight={'26px'}
          fontFamily={'Public Sans'}
        >
          Bounce Fixed Swap Auction
        </Typography>
        <Typography
          mt={7}
          color={'#959595'}
          fontSize={16}
          fontWeight={600}
          lineHeight={'19.5px'}
          fontFamily={'Public Sans'}
        >
          on zkSync Era.
        </Typography>
        <img width={182.5} style={{ marginTop: 40 }} src={MNftLogo} alt="bounce" />
        <CounterDownBox
          style={{ marginTop: 16 }}
          status={poolInfo.status}
          openTime={poolInfo.openAt}
          closeTime={poolInfo.closeAt}
          claimAt={poolInfo.claimAt}
        />
        <PoolCard>
          <Box className="poolTitle">Join The Pool</Box>
          <PoolInfoItem title="Unit Price" sx={{ marginTop: 12 }}>
            <Stack direction="row" spacing={8}>
              <Typography color={'#E1F25C'}>1</Typography>
              <TokenImage
                alt={poolInfo.token0.symbol}
                src={poolInfo.token0.largeUrl || poolInfo.token0.smallUrl || poolInfo.token0.thumbUrl || DefaultNftIcon}
                size={20}
              />
              <Typography color={'#E1F25C'}>
                {poolInfo.token0.symbol} = {poolInfo.ratio}
              </Typography>
              <TokenImage alt={poolInfo.token1.symbol} src={poolInfo.token1.largeUrl} size={20} />
              <Typography color={'#959595'}>{poolInfo.token1.symbol}</Typography>
            </Stack>
          </PoolInfoItem>

          <PoolInfoItem sx={{ marginTop: 12 }} title="Sold Limit">
            <Typography color={'#E1F25C'}>
              {poolInfo.swappedAmount0} / {poolInfo.amountTotal0}
            </Typography>
          </PoolInfoItem>

          <PoolInfoItem title="Contract address" sx={{ marginTop: 12 }} tip="ERC1155 #0">
            <Stack direction="row" spacing={4} sx={{ alignItems: 'center' }}>
              <Typography color={'#959595'}>{shortenAddress(poolInfo.token0.address)}</Typography>

              <CopyToClipboard text={poolInfo.token0.address} />
            </Stack>
          </PoolInfoItem>

          <PoolInfoItem sx={{ marginTop: 12 }} title="Token you will pay">
            <Stack direction="row" spacing={6}>
              <Typography color={'#E1F25C'}>{slicedBid1Amount}</Typography>
              <Typography color={'#959595'}>{poolInfo.token1.symbol}</Typography>
            </Stack>
          </PoolInfoItem>
          <PoolInfoItem sx={{ marginTop: 12 }} title="Bid amount limit">
            <Stack direction="row" spacing={6}>
              <Typography color={'#959595'}>
                {poolInfo.participant.swappedAmount0 || 0} NFT / {poolInfo.maxAmount1PerWallet || '-'}&nbsp; NFT
              </Typography>
            </Stack>
          </PoolInfoItem>
          <PoolInfoItem sx={{ marginTop: 12 }} title="Claim At">
            <Stack direction="row" spacing={6}>
              <Typography color={'#959595'}>{new Date(poolInfo.claimAt * 1000).toLocaleString()}</Typography>
            </Stack>
          </PoolInfoItem>
        </PoolCard>

        {poolInfo.status === PoolStatus.Live && (
          <>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography variant="h5"></Typography>
              <Typography color={'#959595'}>
                Balance: {userToken1Balance?.toSignificant() || '-'} {poolInfo.token1.symbol}
              </Typography>
            </Box>
            <BidButtonBlock
              action={'FIRST_BID'}
              bidAmount={bidAmount}
              handlePlaceBid={toBid}
              isBidding={isBidding.submitted}
              handleGoToCheck={() => {}}
              handleCancelButtonClick={() => {}}
              poolInfo={poolInfo}
            />
          </>
        )}
        {(poolInfo.status === PoolStatus.Closed || poolInfo.status === PoolStatus.Finish) &&
          Number(poolInfo.participant.swappedAmount0) > 0 && (
            <>
              {poolInfo.participant.claimed ? (
                <SuccessfullyClaimedAlert />
              ) : (
                <ClaimButton onClick={toClaim} loading={claimBidSubmitted.submitted} />
              )}
            </>
          )}
      </Box>
    </Box>
  )
}
