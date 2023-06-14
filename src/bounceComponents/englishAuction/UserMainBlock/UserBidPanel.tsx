import { Button, FormLabel, Stack, styled } from '@mui/material'
import Alert from '@mui/material/Alert'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import { useCountDown } from 'ahooks'
import { EnglishAuctionNFTPoolProp, PoolStatus } from 'api/pool/type'
import { useEnglishAuctionPoolInfo } from 'pages/auction/englishAuctionNFT/ValuesProvider'
import NumberInput from 'bounceComponents/common/NumberInput'
import TokenImage from 'bounceComponents/common/TokenImage'
import { LoadingButton } from '@mui/lab'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks'
import { useCallback, useEffect, useMemo, useState } from 'react'
import JSBI from 'jsbi'
import ProgressSlider from 'bounceComponents/common/ProgressSlider'
import { useEnglishAuctionPlaceBidCallback } from 'bounceHooks/auction/useEnglishAuctionCallback'
import { hideDialogConfirmation, showRequestConfirmDialog, showWaitingTxDialog } from 'utils/auction'
import { CurrencyAmount } from 'constants/token'
import { show } from '@ebay/nice-modal-react'
import DialogTips from 'bounceComponents/common/DialogTips'
import PoolInfoItem from 'bounceComponents/fixed-swap/PoolInfoItem'
import { useWalletModalToggle } from 'state/application/hooks'
import Image from 'components/Image'
import bidWinner from 'assets/images/bid-winner.png'
import { useBidderClaimEnglishAuctionNFT } from 'bounceHooks/auction/useCreatorClaimNFT'
// import ReportIcon from '@mui/icons-material/Report'

const InputPanel = styled(Box)({
  border: '1px solid #D7D6D9',
  borderRadius: '20px',
  padding: '14px 10px 4px'
})

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
    targetDate: startTime
  })
  return (
    <Button
      variant="outlined"
      fullWidth
      sx={{
        alignSelf: 'self-end',
        fontSize: 16
      }}
      disabled={!!countdown}
    >
      {days}d : {hours}h : {minutes}m : {seconds}s
    </Button>
  )
}

function LivePanel({ poolInfo }: { poolInfo: EnglishAuctionNFTPoolProp }) {
  const { account } = useActiveWeb3React()
  const token1Balance = useCurrencyBalance(account || undefined, poolInfo.currencyAmountMin1?.currency)
  const toggleWallet = useWalletModalToggle()

  const [bidVal, setBidVal] = useState('')
  const minBidVal = useMemo(() => poolInfo.currentBidderMinAmount, [poolInfo.currentBidderMinAmount])
  const [curSliderPer, setCurSliderPer] = useState(0)

  const bidHandler = useCallback((v: string) => {
    setBidVal(v)
    setCurSliderPer(0)
  }, [])

  const curSliderHandler = useCallback(
    (val: number) => {
      setCurSliderPer(val)
      if (!minBidVal) return
      setBidVal(
        minBidVal
          .multiply(JSBI.BigInt(100 + val))
          .divide('100')
          .toSignificant(6, { groupSeparator: '' })
      )
    },
    [minBidVal]
  )

  const [bidStatus, setBidStatus] = useState<'BID' | 'OUT' | 'WINNER'>('BID')

  const isOutBid = useMemo(() => {
    return (
      account &&
      poolInfo.participant.address?.toLowerCase() === account.toLowerCase() &&
      poolInfo.currentBidder?.toLowerCase() !== account?.toLowerCase()
    )
  }, [account, poolInfo.currentBidder, poolInfo.participant.address])

  const isWinner = useMemo(
    () => poolInfo.currentBidder?.toLowerCase() === account?.toLowerCase(),
    [account, poolInfo.currentBidder]
  )

  useEffect(() => {
    setBidStatus(isWinner ? 'WINNER' : isOutBid ? 'OUT' : 'BID')
  }, [isOutBid, isWinner])

  const bidAmount = useMemo(
    () =>
      poolInfo.currencyAmountMin1 ? CurrencyAmount.fromAmount(poolInfo.currencyAmountMin1.currency, bidVal) : undefined,
    [bidVal, poolInfo.currencyAmountMin1]
  )
  const { bidCallback, submitted: placeBidSubmitted, bidPrevGasFee } = useEnglishAuctionPlaceBidCallback(poolInfo)

  const toBid = useCallback(async () => {
    if (!bidAmount) return
    showRequestConfirmDialog()
    try {
      const { transactionReceipt } = await bidCallback(bidAmount)
      setBidVal('')
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
            content: `You have successfully bid amount ${bidAmount.toSignificant()} ${poolInfo.token1.symbol}`
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
        content: err?.error?.message || err?.data?.message || err?.message || err || 'Something went wrong',
        onAgain: toBid
      })
    }
  }, [bidAmount, bidCallback, poolInfo.token1.symbol])

  return (
    <Box>
      <Alert color="warning" icon={<></>} sx={{ borderRadius: 10 }}>
        <Typography variant="body1" color={'#171717'}>
          {bidStatus === 'OUT'
            ? `Someone made a higher offer and your money is returned to your wallet with gas compensation.`
            : `New bid amount must be greater than the highest Bid (${poolInfo.currentBidderMinAmount?.toSignificant()}
            ${poolInfo.token1.symbol})`}
        </Typography>
      </Alert>

      {bidStatus === 'WINNER' && (
        <Stack spacing={30} mt={30} fontWeight={500}>
          <Typography textAlign={'center'} color={'#171717'}>
            Your Bid Amount
          </Typography>
          <Typography textAlign={'center'} color={'#171717'} variant="h3" fontSize={28}>
            {poolInfo.currentBidderAmount1?.toSignificant()} ETH
          </Typography>

          <Button disabled>You are the highest bid</Button>
        </Stack>
      )}

      {bidStatus === 'OUT' && (
        <Stack spacing={30} mt={30} fontWeight={500}>
          <Typography textAlign={'center'} color={'#171717'}>
            Your Bid Amount
          </Typography>
          <Typography textAlign={'center'} color={'#171717'} variant="h3" fontSize={28}>
            {poolInfo.participant.accountBidAmount?.toSignificant()} ETH
          </Typography>

          <Button variant="contained" onClick={() => setBidStatus('BID')}>
            Place Another Bid
          </Button>
        </Stack>
      )}

      {bidStatus === 'BID' && (
        <Stack spacing={10} mt={30}>
          <Typography variant="h6">Place Your Bid</Typography>
          <InputPanel>
            <Box display={'flex'} padding={'0 10px'} justifyContent={'space-between'}>
              <FormLabel>Min {minBidVal?.toSignificant()}</FormLabel>
              <FormLabel>Balance: {token1Balance?.toSignificant()}</FormLabel>
            </Box>
            <NumberInput
              fullWidth
              placeholder="0"
              value={bidVal}
              onUserInput={v => bidHandler(v)}
              sx={{
                fontSize: 24,
                border: 'none',
                '& fieldset': {
                  border: 'none'
                }
              }}
              endAdornment={
                <Stack direction={'row'} alignItems={'center'} spacing={6}>
                  <Button
                    variant="outlined"
                    sx={{ height: 30 }}
                    onClick={() => setBidVal(token1Balance?.toSignificant(6, { groupSeparator: '' }) || '')}
                  >
                    Max
                  </Button>
                  <TokenImage size={30} src={poolInfo.token1.symbol}></TokenImage>
                  <Typography fontSize={16} fontWeight={500}>
                    {poolInfo.token1.symbol}
                  </Typography>
                </Stack>
              }
            />
          </InputPanel>
          <ProgressSlider curSliderPer={curSliderPer} curSliderHandler={v => curSliderHandler(Number(v))} />

          {account ? (
            <Box>
              <LoadingButton
                disabled={
                  !bidAmount ||
                  !minBidVal ||
                  bidAmount.lessThan(minBidVal) ||
                  !token1Balance ||
                  token1Balance.lessThan(bidAmount)
                }
                loading={placeBidSubmitted.submitted}
                onClick={toBid}
                loadingPosition="start"
                variant="contained"
                fullWidth
              >
                Place a Bid
              </LoadingButton>

              {/* <Typography mt={5} display={'flex'} alignItems={'center'} variant="body2" sx={{ color: '#FD3333' }}>
                <ReportIcon />
                Insufficient balance
              </Typography> */}
            </Box>
          ) : (
            <Button variant="contained" onClick={toggleWallet}>
              Connect Wallet
            </Button>
          )}

          <PoolInfoItem
            title="You will pay"
            tip={`Including the GAS(${bidPrevGasFee?.toSignificant() || '-'} ${
              bidPrevGasFee?.currency.symbol
            }) cost of the previous participant`}
          >
            {bidPrevGasFee && bidAmount && bidPrevGasFee.currency.equals(bidAmount.currency)
              ? `${bidPrevGasFee.add(bidAmount).toSignificant()} ${poolInfo.token1.symbol}`
              : `(${bidPrevGasFee?.toSignificant() || '-'} ${bidPrevGasFee?.currency.symbol}) + (
            ${(bidAmount && bidPrevGasFee?.add(bidAmount).toSignificant()) || '-'} ${poolInfo.token1.symbol})`}
          </PoolInfoItem>
        </Stack>
      )}
    </Box>
  )
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
          {poolInfo.currentBidderAmount1?.toSignificant()} ETH
        </Typography>
        <LoadingButton
          variant="contained"
          loadingPosition="start"
          loading={claimSubmitted.submitted}
          disabled={poolInfo.participant.claimed}
          onClick={toBidderClaim}
        >
          {poolInfo.participant.claimed ? 'Claimed' : 'Claim Token'}
        </LoadingButton>
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
          {poolInfo.participant.accountBidAmount?.toSignificant()} ETH
        </Typography>
      </Stack>
    </Box>
  ) : null
}
