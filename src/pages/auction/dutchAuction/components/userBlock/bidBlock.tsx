import { Box, styled, Typography } from '@mui/material'
import { useMemo, useCallback } from 'react'
import { useCreatorClaim } from 'bounceHooks/auction/useCreatorClaimDutchAuction'
import ConnectWalletButton from 'bounceComponents/fixed-swap/ActionBox/CreatorActionBox/ConnectWalletButton'
import SwitchNetworkButton from 'bounceComponents/fixed-swap/SwitchNetworkButton'
import { show } from '@ebay/nice-modal-react'
import DialogTips from 'bounceComponents/common/DialogTips'
import { useActiveWeb3React } from 'hooks'
import { hideDialogConfirmation, showRequestConfirmDialog, showWaitingTxDialog } from 'utils/auction'
import { LoadingButton } from '@mui/lab'
import { DutchAuctionPoolProp } from 'api/pool/type'
import { useCountDown } from 'ahooks'
import { PoolStatus } from 'api/pool/type'

const ComBtn = styled(LoadingButton)(() => ({
  '&.MuiButtonBase-root': {
    background: 'transparent',
    border: '1px solid #FFFFFF',
    color: '#FFFFFF'
  },
  '&.MuiButtonBase-root:hover': {
    background: '#E1F25C',
    border: '1px solid #E1F25C',
    color: '#121212'
  }
}))
const BidBlock = ({ poolInfo }: { poolInfo: DutchAuctionPoolProp }) => {
  const { account, chainId } = useActiveWeb3React()
  const isCurrentChainEqualChainOfPool = useMemo(() => chainId === poolInfo.ethChainId, [chainId, poolInfo.ethChainId])
  const { status, openAt, closeAt, claimAt } = poolInfo
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate:
      status === PoolStatus.Upcoming
        ? openAt * 1000
        : status === PoolStatus.Live
        ? closeAt * 1000
        : status === PoolStatus.Closed
        ? claimAt * 1000
        : undefined
  })
  const { run: claim, submitted } = useCreatorClaim(poolInfo.poolId, poolInfo.name, poolInfo.contract)
  const successDialogContent = useMemo(() => {
    const hasToken0ToClaim = poolInfo?.currencyAmountTotal0?.greaterThan('0')
    const token0ToClaimText = `${poolInfo?.currencyAmountTotal0?.toSignificant()} ${poolInfo?.token0.symbol}`
    const token1ToClaimText =
      hasToken0ToClaim && poolInfo?.currencyAmountTotal1?.toSignificant() && poolInfo.token1.symbol
        ? ` and ${poolInfo?.currencyAmountTotal1?.toSignificant()} ${poolInfo.token1.symbol}`
        : ''
    return `You have successfully claimed ${token0ToClaimText}${token1ToClaimText}`
  }, [poolInfo?.currencyAmountTotal0, poolInfo?.currencyAmountTotal1, poolInfo?.token0.symbol, poolInfo.token1.symbol])
  const toClaim = useCallback(
    async (isCancel: boolean) => {
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
              content: isCancel
                ? '`You have successfully cancelled the pool and claimed your tokens`'
                : successDialogContent
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
          content: err?.error?.message || err?.data?.message || err?.message || 'Something went wrong',
          onAgain: () => toClaim(isCancel)
        })
      }
    },
    [claim, successDialogContent]
  )
  if (!account) {
    return <ConnectWalletButton />
  }
  if (!isCurrentChainEqualChainOfPool) {
    return <SwitchNetworkButton targetChain={poolInfo.ethChainId} />
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
          padding: '0 24px',
          borderRadius: '8px'
        }}
      >
        <Typography
          sx={{
            fontFamily: `'Inter'`,
            color: '#fff',
            fontSize: '16px'
          }}
        >
          Claim Token
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
  if (poolInfo.status === PoolStatus.Closed && !poolInfo.creatorClaimed) {
    return (
      <ComBtn
        fullWidth
        loadingPosition="start"
        loading={submitted.complete || submitted.submitted}
        onClick={() => toClaim(false)}
      >
        <span>{'Claim token and extra payment'}</span>
      </ComBtn>
    )
  }
  return null
}
export default BidBlock
