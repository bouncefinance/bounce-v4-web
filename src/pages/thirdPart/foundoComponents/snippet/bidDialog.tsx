import { Alert, Box, Button, Stack, Typography, styled } from '@mui/material'
import { useCallback, useMemo, useState } from 'react'
import ProductIcon from 'assets/imgs/thirdPart/foundoDetail/productIcon.png'
import CloseIcon from 'assets/imgs/thirdPart/foundoDetail/x.svg'
import LogoIcon from 'assets/imgs/thirdPart/foundoDetail/logo.png'
import ArrowbottomIcon from 'assets/imgs/thirdPart/foundoDetail/Arrowbottom.png'
import { RowLabel } from './creatorBidAuction'
import { useEnglishAuctionPoolInfo } from 'pages/auction/englishAuctionNFT/ValuesProvider'
import { useCurrencyBalance, useETHBalance } from 'state/wallet/hooks'
import { useActiveWeb3React } from 'hooks'
import ProgressSlider from 'bounceComponents/common/ProgressSlider'
import JSBI from 'jsbi'
import { useWalletModalToggle } from 'state/application/hooks'
import { EnglishAuctionNFTPoolProp } from 'api/pool/type'
import useIsUserInWhitelist from 'bounceHooks/auction/useIsUserInWhitelist'
import { CurrencyAmount } from 'constants/token'
import { useEnglishAuctionPlaceBidCallback } from 'bounceHooks/auction/useEnglishAuctionCallback'
import {
  hideDialogConfirmation,
  showRequestApprovalDialog,
  showRequestConfirmDialog,
  showWaitingTxDialog
} from 'utils/auction'
import { show } from '@ebay/nice-modal-react'
import DialogDarkTips from 'bounceComponents/common/DialogTips/DialogDarkTips'
import { Dots } from 'themes'
import ReportIcon from '@mui/icons-material/Report'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { ENGLISH_AUCTION_NFT_CONTRACT_ADDRESSES } from '../../../../constants'
import { LoadingButton } from '@mui/lab'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { useIsSMDown } from 'themes/useTheme'
import PoolInfoItem from 'bounceComponents/fixed-swap/PoolInfoItem'

const InputBox = styled(Box)(({ theme }) => ({
  height: '48px',
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'space-between',
  padding: '0 24px',
  background: 'var(--ps-text-4)',
  borderRadius: '4px',
  '.inputEl': {
    background: 'none',
    outline: 'none',
    border: 'none',
    fontSize: 16,
    color: 'var(--ps-text-5)'
  },
  '.inputEl:focus': {
    border: 'none'
  },
  [theme.breakpoints.down('md')]: {
    maxWidth: '100%',
    padding: '0 16px',
    '.inputEl': {
      maxWidth: '30%',
      flex: 1
    }
  }
}))

export const PlaceBidBtn = styled(LoadingButton)({
  display: 'flex',
  width: '100%',
  flexFlow: 'row nowrap',
  justifyContent: 'center',
  margin: '48px auto',
  alignItems: 'center',
  border: '1px solid #959595',
  backgroundColor: 'transparent',
  borderRadius: '100px',
  height: '56px',
  fontFamily: `'Public Sans'`,
  fontStyle: 'italic',
  fontWeight: 100,
  fontSize: 20,
  color: '#fff',
  '&:hover': {
    borderColor: '#fff',
    backgroundColor: '#fff',
    color: '#000',
    '& svg': {
      '& path, & rect ': {
        fill: 'black'
      }
    },
    '& p , & span': {
      color: '#000'
    }
  },
  '& img, & svg': {
    marginRight: 10
  },
  '&:disabled': {
    backgroundColor: 'transparent',
    opacity: 0.6
  }
})

export function ProcessLine(props: { ratio: number }) {
  const { ratio } = props
  function RatioItem(props: { ratioStr: number; result?: number }) {
    const { ratioStr, result } = props
    return (
      <Box
        sx={{
          position: 'absolute',
          left: `${ratioStr}%`,
          top: '50%',
          marginTop: '-3px',
          display: 'flex',
          flexFlow: 'column nowrap'
        }}
        gap={'12px'}
      >
        <Box
          sx={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            background: ratioStr <= ratio ? '#fff' : 'var(--ps-text-1)'
          }}
        ></Box>
        {!result && (
          <Typography
            sx={{
              transform:
                ratioStr === 0
                  ? 'translate3D(0%, 0, 0)'
                  : ratioStr >= 100
                  ? 'translate3D(-76%, 0, 0)'
                  : 'translate3D(-30%, 0, 0)',
              color: 'rgba(255, 255, 255, 0.8)',
              fontSize: '14px',
              fontFamily: `'Public Sans'`,
              fontWeight: 600
            }}
          >
            {ratioStr}%
          </Typography>
        )}
        {result && (
          <Box
            sx={{
              position: 'absolute',
              bottom: '37px',
              left: `${result}%`,
              transform: `translate3D(-50%, 0 ,0)`,
              width: '37px',
              height: '18px',
              background: '#fff'
            }}
          >
            {result}%
            <img
              src={ArrowbottomIcon}
              style={{
                position: 'absolute',
                top: '13px',
                left: '50%',
                transform: `translate3D(-50%, 0 ,0)`
              }}
              alt=""
            />
          </Box>
        )}
      </Box>
    )
  }
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '125px'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: '50%',
          width: '100%',
          height: 0,
          borderBottom: `2px solid rgba(255, 255, 255, 0.2)`
        }}
      >
        <RatioItem ratioStr={0} />
        <RatioItem ratioStr={25} />
        <RatioItem ratioStr={50} />
        <RatioItem ratioStr={75} />
        <RatioItem ratioStr={100} />
        <RatioItem ratioStr={ratio} result={ratio} />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          left: 0,
          top: '50%',
          width: `${ratio}%`,
          height: 0,
          borderBottom: `2px solid #fff`,
          transition: 'all .6s'
        }}
      ></Box>
    </Box>
  )
}

const BidDialog = ({ handleClose }: { handleClose: () => void }) => {
  const isSm = useIsSMDown()
  const [bidNum, setBidNum] = useState('')
  const { data: poolInfo } = useEnglishAuctionPoolInfo()
  const { account } = useActiveWeb3React()
  const token1Balance = useCurrencyBalance(account || undefined, poolInfo?.currentBidderMinAmount?.currency)
  const [curSliderPer, setCurSliderPer] = useState(0)
  const minBidVal = useMemo(() => poolInfo?.currentBidderMinAmount, [poolInfo?.currentBidderMinAmount])
  const bidHandler = useCallback((v: string) => {
    setBidNum(v)
    setCurSliderPer(0)
  }, [])

  const curSliderHandler = useCallback(
    (val: number) => {
      setCurSliderPer(val)
      if (!minBidVal) return
      setBidNum(
        minBidVal
          .multiply(JSBI.BigInt(100 + val))
          .divide('100')
          .toSignificant(6, { groupSeparator: '' })
      )
    },
    [minBidVal]
  )

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 1200
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          background: 'rgba(0,0,0,0.8)'
        }}
        onClick={() => {
          handleClose && handleClose()
        }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          top: isSm ? '40px' : '50%',
          bottom: '40px',
          left: '50%',
          transform: isSm ? 'translate3D(-50%, 0, 0)' : 'translate3D(-50%, -50%, 0)',
          width: isSm ? 'calc(100% - 46px)' : '840px',
          minHeight: '540px',
          maxHeight: `calc(100vh - 80px)`,
          background: 'rgba(73, 73, 73, 0.1)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(25px)',
          overflowY: 'auto',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'flex-start'
        }}
      >
        <Box
          sx={{
            position: 'relative',
            height: '55px',
            padding: isSm ? '24px 24px 0' : '32px 48px 0'
          }}
        >
          <Typography
            sx={{
              fontFamily: `'Public Sans'`,
              fontWeight: 600,
              fontSize: 20,
              color: '#fff',
              marginBottom: '31px'
            }}
          >
            Place a bid
          </Typography>
          <img
            src={CloseIcon}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              cursor: 'pointer'
            }}
            onClick={() => {
              handleClose && handleClose()
            }}
            alt=""
            srcSet=""
          />
        </Box>
        <Box
          sx={{
            flex: 1,
            overflowY: 'auto',
            padding: isSm ? '24px' : '32px 48px 31px',
            display: 'flex',
            flexFlow: isSm ? 'column nowrap' : 'row nowrap',
            justifyContent: isSm ? 'flex-start' : 'space-between',
            alignItems: isSm ? 'center' : 'flex-start'
          }}
          gap={isSm ? '24px' : '40px'}
        >
          <Box
            sx={{
              width: isSm ? '100%' : '290px',
              borderRight: isSm ? 'none' : `1px solid rgba(255, 255, 255, 0.2)`
            }}
          >
            <img
              src={ProductIcon}
              style={{
                width: isSm ? '100%' : '251px'
              }}
              alt=""
            />
            <Typography
              sx={{
                fontFamily: `'Public Sans'`,
                fontWeight: 600,
                fontSize: isSm ? 13 : 14,
                color: '#fff',
                margin: isSm ? '16px 0 0' : ''
              }}
            >
              {poolInfo?.name || '--'}
            </Typography>
          </Box>
          <Box
            sx={{
              flex: 1,
              width: isSm ? '100%' : 'unset'
            }}
          >
            <Box
              sx={{
                border: `1px solid rgba(255, 255, 255, 0.2)`,
                borderRadius: 8,
                padding: '24px'
              }}
              mb={'24px'}
            >
              <RowLabel
                sx={{
                  marginBottom: '16px'
                }}
              >
                <Typography
                  sx={{
                    color: '#fff',
                    fontFamily: `'Inter'`,
                    fontSize: 14
                  }}
                >
                  Min
                </Typography>
                <Typography
                  sx={{
                    color: '#fff',
                    fontFamily: `'Inter'`,
                    fontSize: 14
                  }}
                >
                  {poolInfo?.currentBidderMinAmount?.toSignificant()} {poolInfo?.token1.symbol}
                </Typography>
              </RowLabel>
              <RowLabel>
                <Typography
                  sx={{
                    color: '#fff',
                    fontFamily: `'Inter'`,
                    fontSize: 14
                  }}
                >
                  Balance
                </Typography>
                <Typography
                  sx={{
                    color: '#fff',
                    fontFamily: `'Inter'`,
                    fontSize: 14
                  }}
                >
                  {token1Balance?.toSignificant() || '--'} {poolInfo?.token1.symbol}
                </Typography>
              </RowLabel>
            </Box>
            <Typography
              sx={{
                color: '#fff',
                fontFamily: `'Public Sans'`,
                fontSize: 12
              }}
              mb={'12px'}
            >
              The bid amount must be greater than the Current Highest Bid({' '}
              {poolInfo?.currentBidderMinAmount?.toSignificant()} {poolInfo?.currentBidderMinAmount?.currency.symbol})
            </Typography>
            <InputBox>
              <input
                className={'inputEl'}
                value={bidNum}
                placeholder="Price"
                onChange={e => {
                  let value = e.target.value
                  if (value && value.indexOf('.') < 0 && value !== '') {
                    value = parseFloat(value) + ''
                  }
                  const result = value
                    .replace(/[^\d.]/g, '')
                    .replace(/\.{2,}/g, '.')
                    .replace('.', '$#$')
                    .replace(/\./g, '')
                    .replace('$#$', '.')
                  bidHandler(result)
                }}
                onBlurCapture={e => {
                  let value = e.target.value
                  if (value && value.indexOf('.') > 0) {
                    const str = value.slice(value.indexOf('.'), value.length)
                    if (Number(str) / 1 <= 0) {
                      value = value.replace(str, '')
                    }
                  }
                  bidHandler(value)
                }}
              />
              <RowLabel
                style={{
                  justifyContent: 'flex-end'
                }}
              >
                <Button
                  onClick={() =>
                    bidHandler(poolInfo?.currentBidderMinAmount?.toSignificant(64, { groupSeparator: '' }) || '')
                  }
                  variant="outlined"
                  sx={{ height: 30, mr: 6 }}
                >
                  Min
                </Button>
                <img
                  style={{
                    display: 'inline-block',
                    width: '20px',
                    height: '20px',
                    marginRight: '8px'
                  }}
                  src={poolInfo?.token1.smallUrl || LogoIcon}
                  alt=""
                  srcSet=""
                />
                <Typography
                  className="value"
                  style={{
                    height: '20px',
                    lineHeight: '20px'
                  }}
                >
                  {poolInfo?.token1.symbol || ''}
                </Typography>
              </RowLabel>
            </InputBox>
            {/* <ProcessLine ratio={60} /> */}
            <Box mt={40}>
              <ProgressSlider isDark curSliderPer={curSliderPer} curSliderHandler={curSliderHandler} />
            </Box>
            {poolInfo && <BidButton bidVal={bidNum} handleClose={handleClose} poolInfo={poolInfo} />}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
export default BidDialog

function BidButton({
  poolInfo,
  bidVal,
  handleClose
}: {
  poolInfo: EnglishAuctionNFTPoolProp
  bidVal: string
  handleClose: () => void
}) {
  const { account, chainId } = useActiveWeb3React()
  const switchNetwork = useSwitchNetwork()
  const isCurrentChainEqualChainOfPool = useMemo(
    () => chainId === poolInfo?.ethChainId,
    [chainId, poolInfo?.ethChainId]
  )
  const token1Balance = useCurrencyBalance(account || undefined, poolInfo.currentBidderMinAmount?.currency)
  const ethBalance = useETHBalance(account || undefined, poolInfo.ethChainId)
  const toggleWallet = useWalletModalToggle()
  const { data: isUserInWhitelist, loading: whitelistLoading } = useIsUserInWhitelist(poolInfo, poolInfo.category)
  const minBidVal = useMemo(() => poolInfo.currentBidderMinAmount, [poolInfo.currentBidderMinAmount])

  const bidAmount = useMemo(
    () =>
      poolInfo.currencyAmountMin1 ? CurrencyAmount.fromAmount(poolInfo.currencyAmountMin1.currency, bidVal) : undefined,
    [bidVal, poolInfo.currencyAmountMin1]
  )
  const { bidCallback, submitted: placeBidSubmitted, bidPrevGasFee } = useEnglishAuctionPlaceBidCallback(poolInfo)

  const toBid = useCallback(async () => {
    if (!bidAmount) return
    showRequestConfirmDialog({ dark: true })
    try {
      const { transactionReceipt } = await bidCallback(bidAmount)
      const ret = new Promise((resolve, rpt) => {
        showWaitingTxDialog(
          () => {
            hideDialogConfirmation()
            handleClose()
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
          handleClose()
          show(DialogDarkTips, {
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
      show(DialogDarkTips, {
        iconType: 'error',
        againBtn: 'Try Again',
        cancelBtn: 'Cancel',
        title: 'Oops..',
        content: err?.reason || err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
        onAgain: toBid
      })
    }
  }, [bidAmount, bidCallback, handleClose, poolInfo.token1.symbol])

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

  const bidButton = useMemo(() => {
    if (!account) {
      return (
        <PlaceBidBtn variant="contained" onClick={toggleWallet}>
          Connect Wallet
        </PlaceBidBtn>
      )
    }
    if (!isCurrentChainEqualChainOfPool) {
      return <PlaceBidBtn onClick={() => switchNetwork(poolInfo.ethChainId)}>Switch Network</PlaceBidBtn>
    }
    return (
      <Box>
        {bidAmount && approveContent && !isInsufficientBalance?.disabled ? (
          approveContent
        ) : (
          <Stack>
            <PlaceBidBtn
              disabled={
                !bidAmount || !minBidVal || bidAmount.lessThan(minBidVal) || isInsufficientBalance?.disabled === true
              }
              loading={placeBidSubmitted.submitted}
              onClick={toBid}
              loadingPosition="start"
              variant="contained"
              fullWidth
            >
              Place a Bid
            </PlaceBidBtn>
            <PoolInfoItem
              title="You will pay"
              tip={`Including the GAS(${bidPrevGasFee?.toSignificant() || '-'} ${
                bidPrevGasFee?.currency.symbol
              }) cost of the previous participant`}
            >
              <Typography color={'#fff'} mt={10}>
                {bidPrevGasFee && bidAmount && bidPrevGasFee.currency.equals(bidAmount.currency)
                  ? `${bidPrevGasFee.add(bidAmount).toSignificant()} ${poolInfo.token1.symbol}`
                  : `(${bidPrevGasFee?.toSignificant() || '-'} ${bidPrevGasFee?.currency.symbol}) + (
            ${bidAmount?.toSignificant() || '-'} ${poolInfo.token1.symbol})`}
              </Typography>
            </PoolInfoItem>
          </Stack>
        )}

        {isInsufficientBalance?.children}
      </Box>
    )
  }, [
    account,
    approveContent,
    bidAmount,
    bidPrevGasFee,
    isCurrentChainEqualChainOfPool,
    isInsufficientBalance?.children,
    isInsufficientBalance?.disabled,
    minBidVal,
    placeBidSubmitted.submitted,
    poolInfo.ethChainId,
    poolInfo.token1.symbol,
    switchNetwork,
    toBid,
    toggleWallet
  ])

  if (!isUserInWhitelist && !whitelistLoading) {
    return (
      <Alert severity="error" icon={<></>} sx={{ borderRadius: 10 }}>
        <Typography variant="body1" color={'#171717'}>
          You are not whitelisted for this auction.
        </Typography>
      </Alert>
    )
  }

  return bidButton
}

function NoticeLabel({ color, children }: { children: JSX.Element; color?: string }) {
  return (
    <Typography mt={5} display={'flex'} alignItems={'center'} variant="body2" sx={{ color: color || '#FD3333' }}>
      {children}
    </Typography>
  )
}
