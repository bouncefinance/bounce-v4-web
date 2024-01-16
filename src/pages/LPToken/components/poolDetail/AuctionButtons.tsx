import { Box, Button, Stack, Typography, styled } from '@mui/material'
import { ActionStatus } from '.'
import { RandomPoolStatus, RandomSelectionLPProps, RandomSelectionNFTResultProps } from 'api/pool/type'
import { useCountDown } from 'ahooks'
import { useActiveWeb3React } from 'hooks'
import { useShowLoginModal } from 'state/users/hooks'
import { useSwitchNetwork } from 'hooks/useSwitchNetwork'
import { ChainId } from 'constants/chain'
import { Currency, CurrencyAmount } from 'constants/token'
import { useApproveCallback } from 'hooks/useApproveCallback'
import { ApprovalState } from 'hooks/useTokenTimelock'
import { useTransactionModalWrapper } from 'hooks/useTransactionModalWrapper'
import { useRandomLPBetCallback, useRandomLPUserClaim } from 'bounceHooks/auction/useRandomLPAuctionCallback'
import { LoadingButton } from '@mui/lab'
import { ReactComponent as CountdownSvg } from 'assets/imgs/lpToken/Countdown.svg'
import { ReactComponent as GreenSvg } from 'assets/imgs/lpToken/green.svg'
import { useCurrencyBalance } from 'state/wallet/hooks'
import { useMemo } from 'react'
import dayjs from 'dayjs'
export const BaseButton = styled(Button)`
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  background: #121212;
  &:hover {
    background: #e1f25c;
    color: #121212;
  }

  color: #fff;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`
const LoadingButtonStyle = styled(LoadingButton)`
  width: 100%;
  padding: 20px;
  border-radius: 8px;
  background: #121212;
  &:hover {
    background: #e1f25c;
    color: #121212;
  }

  color: #fff;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 24px */
`
const getSundayDate = () => {
  const today = dayjs()
  const dayOfWeek = today.day()
  const daysUntilSunday = 7 - dayOfWeek
  const nearestSunday = today.add(daysUntilSunday, 'day').startOf('day')
  const timestamp = nearestSunday.unix()
  const sundayFormat = nearestSunday.format('YYYY-MM-DD')

  return [sundayFormat, timestamp]
}
const [sundayFormat, timestamp] = getSundayDate()
const AuctionButtons = ({
  onCheck,
  action,
  poolInfo,
  allStatus
}: {
  onCheck: () => void
  action: ActionStatus
  poolInfo: RandomSelectionLPProps
  allStatus: RandomSelectionNFTResultProps
}) => {
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate: poolInfo.openAt * 1000
  })
  const [sundayCountdown, sundayTime] = useCountDown({
    targetDate: Number(timestamp) * 1000
  })
  const { runWithModal, submitted } = useRandomLPBetCallback(poolInfo)
  const { runWithModal: onClaim, submitted: noWinnerSubmitted } = useRandomLPUserClaim(
    poolInfo,
    allStatus.isUserWinner,
    poolInfo.contract
  )
  const token1Currency = new Currency(
    poolInfo.ethChainId,
    poolInfo.token1.address,
    poolInfo.token1.decimals,
    poolInfo.token1.symbol,
    poolInfo.token1.name
  )
  const token1Amount = CurrencyAmount.fromRawAmount(token1Currency, poolInfo.maxAmount1PerWallet)

  const [approvalState, approveCallback] = useApproveCallback(token1Amount, poolInfo.contract)
  const approveCallbackFn = useTransactionModalWrapper(approveCallback as any, { isApprove: true })

  const { chainId, account } = useActiveWeb3React()
  const token1Balance = useCurrencyBalance(account, token1Currency, poolInfo.ethChainId)
  const insufficientBalance = useMemo(() => {
    if (!token1Balance) {
      return false
    }
    return token1Balance.lessThan(token1Amount)
  }, [token1Amount, token1Balance])
  const showLoginModal = useShowLoginModal()
  const switchNetwork = useSwitchNetwork()
  if (!account) {
    return <BaseButton onClick={showLoginModal}>Login</BaseButton>
  }
  if (chainId !== poolInfo.ethChainId) {
    return <BaseButton onClick={() => switchNetwork(poolInfo.ethChainId || ChainId.MAINNET)}>Switch Network</BaseButton>
  }
  if (allStatus.poolStatus === RandomPoolStatus.Upcoming) {
    return (
      <BaseButton disabled>
        <Stack flexDirection={'row'} justifyContent={'space-between'} width={'100%'}>
          <Typography component={'span'}>Join</Typography>
          {countdown > 0 ? (
            <Typography component={'span'}>
              {days}d : {hours}h : {minutes}m : {seconds}s
            </Typography>
          ) : null}
        </Stack>
      </BaseButton>
    )
  }

  if (allStatus.isUserJoined && allStatus.poolStatus === RandomPoolStatus.Live) {
    return <BaseButton disabled>You are in the draw...</BaseButton>
  }
  if (
    !allStatus.isUserJoined &&
    (allStatus.poolStatus === RandomPoolStatus.Closed || allStatus.poolStatus === RandomPoolStatus.Waiting)
  ) {
    return <BaseButton disabled>Auction closed</BaseButton>
  }
  if (allStatus.isUserJoined && allStatus.poolStatus === RandomPoolStatus.Waiting && !allStatus.isWinnerSeedDone) {
    return (
      <Box
        sx={{
          display: 'flex',
          padding: '16px 24px',
          flexDirection: 'row',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: 24,
          borderRadius: 8,
          border: '1px solid var(--gray-02, #E8E9E4)',
          background: 'var(--yellow-light, #F9FCDE)'
        }}
      >
        <CountdownSvg />
        <Typography>The lottery is being drawn. Please wait patiently.</Typography>
      </Box>
    )
  }
  if (allStatus.isWinnerSeedDone && allStatus.isUserJoined) {
    if (!allStatus.isUserWinner) {
      if (allStatus.isUserClaimed) {
        return (
          <Stack
            flexDirection={'row'}
            sx={{
              padding: '16px 16px 20px 16px',
              alignItems: 'center',
              borderRadius: 20,
              background: 'var(--grey-06, #F6F6F3)'
            }}
          >
            <GreenSvg />
            <Typography pl={12}>You have successfully claimed your tokens. See you next time!</Typography>
          </Stack>
        )
      }
      return (
        <LoadingButtonStyle onClick={() => onClaim()} loading={noWinnerSubmitted.submitted}>
          Claim Token Back
        </LoadingButtonStyle>
      )
    }
    if (allStatus.isUserJoined && allStatus.isUserWinner) {
      return (
        <Box>
          {allStatus.isUserClaimed ? (
            <BaseButton disabled>
              <Stack flexDirection={'row'} justifyContent={'space-between'} width={'100%'}>
                <Typography component={'span'}>Join</Typography>
                {sundayCountdown > 0 ? (
                  <Typography component={'span'}>
                    {sundayTime.days}d : {sundayTime.hours}h : {sundayTime.minutes}m : {sundayTime.seconds}s
                  </Typography>
                ) : null}
              </Stack>
            </BaseButton>
          ) : (
            <LoadingButtonStyle onClick={() => onClaim()} loading={noWinnerSubmitted.submitted}>
              Claim Token
            </LoadingButtonStyle>
          )}
          <Stack mt={24}>
            <Typography>We distribute earnings once a week</Typography>
            <Typography>Next release time:{sundayFormat}</Typography>
          </Stack>
        </Box>
      )
    }
  }
  if (insufficientBalance) {
    return <BaseButton disabled>Insufficient balance</BaseButton>
  }
  if (action === 'FIRST') {
    return <BaseButton onClick={onCheck}>Place a Bid</BaseButton>
  }

  if (approvalState !== ApprovalState.APPROVED && action === 'BID') {
    if (approvalState === ApprovalState.PENDING) {
      return <BaseButton disabled>Pending...</BaseButton>
    }
    return <BaseButton onClick={approveCallbackFn}>Approve</BaseButton>
  }

  if (action === 'BID') {
    if (allStatus.poolStatus === RandomPoolStatus.Live && !allStatus.isUserJoined) {
      return (
        <LoadingButtonStyle
          onClick={() => {
            runWithModal(token1Amount)
          }}
          loading={submitted.submitted}
        >
          Place a Bid
        </LoadingButtonStyle>
      )
    }
    return <BaseButton>Place a Bid</BaseButton>
  }
  return (
    <Box>
      <BaseButton disabled>1</BaseButton>
    </Box>
  )
}
export default AuctionButtons
