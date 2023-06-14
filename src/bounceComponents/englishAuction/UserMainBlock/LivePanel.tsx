import NumberInput from 'bounceComponents/common/NumberInput'
import TokenImage from 'bounceComponents/common/TokenImage'
import { LoadingButton } from '@mui/lab'
import { useCurrencyBalance, useETHBalance } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks'
import { useCallback, useEffect, useMemo, useState } from 'react'
import JSBI from 'jsbi'
import ProgressSlider from 'bounceComponents/common/ProgressSlider'
import { useEnglishAuctionPlaceBidCallback } from 'bounceHooks/auction/useEnglishAuctionCallback'
import {
  hideDialogConfirmation,
  showRequestApprovalDialog,
  showRequestConfirmDialog,
  showWaitingTxDialog
} from 'utils/auction'
import { CurrencyAmount } from 'constants/token'
import { show } from '@ebay/nice-modal-react'
import DialogTips from 'bounceComponents/common/DialogTips'
import PoolInfoItem from 'bounceComponents/fixed-swap/PoolInfoItem'
import { useWalletModalToggle } from 'state/application/hooks'
import ReportIcon from '@mui/icons-material/Report'
import { Dots } from 'themes'
import { EnglishAuctionNFTPoolProp } from 'api/pool/type'
import { Box, Button, FormLabel, Stack, Typography, styled } from '@mui/material'
import Alert from '@mui/material/Alert'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { ENGLISH_AUCTION_NFT_CONTRACT_ADDRESSES } from '../../../constants'
import SwitchNetworkButton from 'bounceComponents/fixed-swap/SwitchNetworkButton'

const InputPanel = styled(Box)({
  border: '1px solid #D7D6D9',
  borderRadius: '20px',
  padding: '14px 10px 4px'
})

export default function LivePanel({ poolInfo }: { poolInfo: EnglishAuctionNFTPoolProp }) {
  const { account, chainId } = useActiveWeb3React()
  const isCurrentChainEqualChainOfPool = useMemo(() => chainId === poolInfo.ethChainId, [chainId, poolInfo.ethChainId])
  const token1Balance = useCurrencyBalance(account || undefined, poolInfo.currencyAmountMin1?.currency)
  const ethBalance = useETHBalance(account || undefined, poolInfo.ethChainId)
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

  const isInsufficientBalance = useMemo(() => {
    if (!Number(bidVal)) return undefined
    if (!bidAmount || !ethBalance || !token1Balance || !bidPrevGasFee) {
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
      const ca = bidAmount.add(bidPrevGasFee)
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
      const token1Insufficient = bidAmount.greaterThan(token1Balance)
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
                    Insufficient {bidAmount?.currency.symbol} balance
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
  }, [bidAmount, bidPrevGasFee, bidVal, ethBalance, poolInfo.currencyAmountMin1?.currency.isNative, token1Balance])

  const [approvalState, approveCallback] = useApproveCallback(
    bidAmount,
    chainId === poolInfo.ethChainId ? ENGLISH_AUCTION_NFT_CONTRACT_ADDRESSES[poolInfo.ethChainId] : undefined,
    true
  )

  const toApprove = useCallback(async () => {
    showRequestApprovalDialog()
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
      show(DialogTips, {
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
          <LoadingButton loadingPosition="start" variant="contained" fullWidth loading>
            Approving {poolInfo.token1?.symbol}
          </LoadingButton>
        )
      }
      if (approvalState === ApprovalState.UNKNOWN) {
        return (
          <LoadingButton loadingPosition="start" variant="contained" fullWidth loading>
            Loading <Dots />
          </LoadingButton>
        )
      }
      if (approvalState === ApprovalState.NOT_APPROVED) {
        return (
          <LoadingButton variant="contained" onClick={toApprove} fullWidth>
            Approve use of {poolInfo.token1?.symbol}
          </LoadingButton>
        )
      }
    }
    return undefined
  }, [approvalState, poolInfo.token1?.symbol, toApprove])

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

          {account && isCurrentChainEqualChainOfPool ? (
            <Box>
              {bidAmount && approveContent && !isInsufficientBalance?.disabled ? (
                approveContent
              ) : (
                <LoadingButton
                  disabled={
                    !bidAmount ||
                    !minBidVal ||
                    bidAmount.lessThan(minBidVal) ||
                    isInsufficientBalance?.disabled === true
                  }
                  loading={placeBidSubmitted.submitted}
                  onClick={toBid}
                  loadingPosition="start"
                  variant="contained"
                  fullWidth
                >
                  Place a Bid
                </LoadingButton>
              )}

              {isInsufficientBalance?.children}
            </Box>
          ) : !account ? (
            <Button variant="contained" onClick={toggleWallet}>
              Connect Wallet
            </Button>
          ) : (
            <SwitchNetworkButton targetChain={poolInfo.ethChainId} />
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
            ${bidAmount?.toSignificant() || '-'} ${poolInfo.token1.symbol})`}
          </PoolInfoItem>
        </Stack>
      )}
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
