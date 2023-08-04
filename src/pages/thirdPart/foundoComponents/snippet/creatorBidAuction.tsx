import { Box, Stack, Typography, styled } from '@mui/material'
import { useState, useMemo, useCallback } from 'react'
import BidIcon from 'assets/imgs/thirdPart/foundoDetail/bidIcon.svg'
import { PlaceBidBtn } from './bidDialog'
import ShippingDialog from './shippingInfoDialog'
import { useCountDown } from 'ahooks'
import { MutantEnglishAuctionNFTPoolProp, PoolStatus } from 'api/pool/type'
import { useIsSMDown } from 'themes/useTheme'
import TokenImage from 'bounceComponents/common/TokenImage'
import { useActiveWeb3React } from 'hooks'
import { useCreatorClaimEnglishAuctionNFT } from 'bounceHooks/auction/useCreatorClaimNFT'
import { hideDialogConfirmation, showRequestConfirmDialog, showWaitingTxDialog } from 'utils/auction'
import DialogTips from 'bounceComponents/common/DialogTips'
import { show } from '@ebay/nice-modal-react'
import { getCurrentTimeStamp } from 'utils'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { useWalletModalToggle } from 'state/application/hooks'
import { DataView } from './userBidAuction'
import RewardPanel from './rewardPanel'

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

const CreatorBidAction = ({ poolInfo }: { poolInfo: MutantEnglishAuctionNFTPoolProp }) => {
  const isSm = useIsSMDown()
  const OpenAt = useMemo(() => poolInfo?.openAt || 0, [poolInfo?.openAt])
  const poolStatus = useMemo(() => poolInfo?.status, [poolInfo?.status])

  const { run: creatorClaim } = useCreatorClaimEnglishAuctionNFT(poolInfo.poolId, poolInfo.name, poolInfo.contract)

  const toCreatorClaim = useCallback(async () => {
    showRequestConfirmDialog({ dark: true })
    try {
      const { transactionReceipt } = await creatorClaim()
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
        onAgain: toCreatorClaim
      })
    }
  }, [creatorClaim, poolInfo.name, poolInfo.token0.symbol])

  return (
    <Box
      sx={{
        width: isSm ? '100%' : '640px',
        borderLeft: '1px solid rgba(255, 255, 255, 0.20)',
        margin: 'auto',
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
          <Typography color={'#fff'}>Finish</Typography>
        )}
      </Box>
      <DataView
        priceFloor={`${poolInfo?.currencyAmountMin1?.toSignificant()} ${poolInfo?.currencyAmountMin1?.currency.symbol}`}
        increase={`${poolInfo?.amountMinIncrRatio1?.toSignificant()}`}
      />
      {poolStatus === PoolStatus.Live && <UpcomingStatus text="Time Left" OpenAt={poolInfo?.closeAt || 0} />}
      {poolStatus === PoolStatus.Live && (
        <Typography fontSize={14} fontWeight={600} fontFamily={'Public Sans'} color={'#959595'}>
          The auction is successful if there is no player with a higher bid after the countdown ends
        </Typography>
      )}
      {poolStatus === PoolStatus.Upcoming && (
        <PlaceBidBtn onClick={toCreatorClaim} loadingPosition="start" variant="contained" fullWidth>
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
          <CounterText>Cancel & Claim</CounterText>
        </PlaceBidBtn>
      )}
      {poolStatus === PoolStatus.Live && (
        <>
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
          <Typography fontSize={12} fontFamily={'Inter'}>
            (The previous bidder receive after the next bidder place a bid.)
          </Typography>
        </>
      )}
      {/* reward content */}
      {poolStatus === PoolStatus.Live && poolInfo && <RewardPanel poolInfo={poolInfo} />}
      {/* closed and win tips */}
      {poolStatus === PoolStatus.Closed && poolInfo && <ClosedSection poolInfo={poolInfo} />}
      {poolStatus === PoolStatus.Live && poolInfo && <LiveSection poolInfo={poolInfo}></LiveSection>}
    </Box>
  )
}
export default CreatorBidAction

function LiveSection({ poolInfo }: { poolInfo: MutantEnglishAuctionNFTPoolProp }) {
  const { account, chainId } = useActiveWeb3React()
  const toggleWallet = useWalletModalToggle()
  const switchNetwork = useSwitchNetwork()

  if (!account) {
    return <PlaceBidBtn onClick={toggleWallet}>Connect Wallet</PlaceBidBtn>
  }
  if (chainId !== poolInfo.ethChainId) {
    return <PlaceBidBtn onClick={() => switchNetwork(poolInfo.ethChainId)}>Switch Network</PlaceBidBtn>
  }

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 16px',
          background: 'rgba(255, 255, 255, 0.2)',
          mb: 32
        }}
      >
        <Typography
          ml={12}
          sx={{
            fontFamily: 'Inter',
            fontSize: 13,
            color: '#D7D6D9'
          }}
        >
          This auction has not closed yet, please wait for the time to end.
        </Typography>
      </Box>
    </>
  )
}

function ClosedSection({ poolInfo }: { poolInfo: MutantEnglishAuctionNFTPoolProp }) {
  const { account, chainId } = useActiveWeb3React()
  const toggleWallet = useWalletModalToggle()
  const switchNetwork = useSwitchNetwork()
  const [openShippingDialog, setOpenShippingDialog] = useState<boolean>(false)

  const isSuccess = useMemo(
    () => account && poolInfo.currentBidder?.toString() === account?.toString(),
    [account, poolInfo.currentBidder]
  )

  const {
    run: creatorClaim,
    submitted,
    creatorClaimed
  } = useCreatorClaimEnglishAuctionNFT(poolInfo.poolId, poolInfo.name, poolInfo.contract)

  const toCreatorClaim = useCallback(async () => {
    showRequestConfirmDialog({ dark: true })
    try {
      const { transactionReceipt } = await creatorClaim()
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
        onAgain: toCreatorClaim
      })
    }
  }, [creatorClaim, poolInfo.name, poolInfo.token0.symbol])

  if (!account) {
    return <PlaceBidBtn onClick={toggleWallet}>Connect Wallet</PlaceBidBtn>
  }
  if (chainId !== poolInfo.ethChainId) {
    return <PlaceBidBtn onClick={() => switchNetwork(poolInfo.ethChainId)}>Switch Network</PlaceBidBtn>
  }

  return isSuccess ? (
    <Stack>
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
        {poolInfo.participant.claimed || creatorClaimed ? 'Claimed & Edit info' : 'Claim NFT & Send address'}
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
        {poolInfo.participant.claimed || creatorClaimed
          ? 'We will contact you in the near future'
          : `Claim start time: ${new Date(poolInfo.claimAt * 1000).toLocaleString()}`}
      </Typography>

      {openShippingDialog && (
        <ShippingDialog
          submitCallback={creatorClaimed ? undefined : toCreatorClaim}
          handleClose={() => setOpenShippingDialog(false)}
        />
      )}
    </Stack>
  ) : (
    <Box>
      <Typography sx={{ fontSize: 16, fontFamily: 'Inter', color: '#fff' }}>
        {`You didn't succeed in the auction and your money is returned to your wallet with gas compensation.(Your Bid Amount: ${
          poolInfo.participant.accountBidAmount?.toSignificant() || '-'
        } ${poolInfo.token1.symbol})`}
      </Typography>
    </Box>
  )
}
