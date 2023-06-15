import { Button, Stack } from '@mui/material'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useCountDown } from 'ahooks'
import { EnglishAuctionNFTPoolProp, PoolStatus } from 'api/pool/type'
import { useEnglishAuctionPoolInfo } from 'pages/auction/englishAuctionNFT/ValuesProvider'
import { LoadingButton } from '@mui/lab'
import { useActiveWeb3React } from 'hooks'
import { useCallback, useMemo } from 'react'
import { hideDialogConfirmation, showRequestConfirmDialog, showWaitingTxDialog } from 'utils/auction'
import { show } from '@ebay/nice-modal-react'
import DialogTips from 'bounceComponents/common/DialogTips'
import Image from 'components/Image'
import bidWinner from 'assets/images/bid-winner.png'
import { useBidderClaimEnglishAuctionNFT } from 'bounceHooks/auction/useCreatorClaimNFT'
import LivePanel from './LivePanel'
import PoolInfoItem from 'bounceComponents/fixed-swap/PoolInfoItem'
import { getCurrentTimeStamp } from 'utils'

export default function UserBidPanel() {
  const { data: poolInfo } = useEnglishAuctionPoolInfo()

  if (!poolInfo) return null

  return poolInfo.status === PoolStatus.Upcoming ? (
    <UpComingPanel startTime={poolInfo.openAt} />
  ) : poolInfo.status === PoolStatus.Cancelled ? (
    <></>
  ) : poolInfo.status === PoolStatus.Closed || poolInfo.status === PoolStatus.Finish ? (
    <ClosedPanel poolInfo={poolInfo} />
  ) : (
    <LivePanel poolInfo={poolInfo} />
  )
}

function UpComingPanel({ startTime }: { startTime: number }) {
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate: startTime * 1000
  })
  return countdown ? (
    <Button
      variant="outlined"
      fullWidth
      sx={{
        alignSelf: 'self-end',
        fontSize: 16
      }}
      disabled
    >
      {days}d : {hours}h : {minutes}m : {seconds}s
    </Button>
  ) : null
}

function ClosedPanel({ poolInfo }: { poolInfo: EnglishAuctionNFTPoolProp }) {
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

  const { run: bidderClaim, submitted: claimSubmitted } = useBidderClaimEnglishAuctionNFT(
    poolInfo.poolId,
    poolInfo.name,
    poolInfo.contract
  )

  const toBidderClaim = useCallback(async () => {
    showRequestConfirmDialog()
    try {
      const { transactionReceipt } = await bidderClaim()
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
    <Box>
      <Stack spacing={30}>
        <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
          <Image src={bidWinner} width={50}></Image>
          <Typography pt={10} pl={10} fontSize={16} fontWeight={500} color={'#135BFF'}>
            You are the highest bidder
          </Typography>
        </Box>
        <Typography textAlign={'center'} fontSize={12}>
          Your Bid Price
        </Typography>
        <Typography textAlign={'center'} fontSize={28} fontWeight={500}>
          {poolInfo.currentBidderAmount1?.toSignificant()} {poolInfo.currentBidderAmount1?.currency.symbol}
        </Typography>
        <LoadingButton
          variant="contained"
          loadingPosition="start"
          loading={claimSubmitted.submitted}
          disabled={poolInfo.participant.claimed || poolInfo.claimAt > getCurrentTimeStamp()}
          onClick={toBidderClaim}
        >
          {poolInfo.participant.claimed ? 'Claimed' : 'Claim Token'}
        </LoadingButton>
        <PoolInfoItem title="Claim start time">
          <Typography>{new Date(poolInfo.claimAt * 1000).toLocaleString()}</Typography>
        </PoolInfoItem>
      </Stack>
    </Box>
  ) : isOutBid ? (
    <Box>
      <Alert color="warning" icon={<></>} sx={{ borderRadius: 10 }}>
        <Typography variant="body1" color={'#171717'}>
          Someone made a higher offer and your money is returned to your wallet with gas compensation.
        </Typography>
      </Alert>
      <Stack spacing={30} mt={30} fontWeight={500}>
        <Typography textAlign={'center'} color={'#171717'}>
          Your Bid Amount
        </Typography>
        <Typography textAlign={'center'} color={'#171717'} variant="h3" fontSize={28}>
          {poolInfo.participant.accountBidAmount?.toSignificant()}{' '}
          {poolInfo.participant.accountBidAmount?.currency.symbol}
        </Typography>
      </Stack>
    </Box>
  ) : null
}
