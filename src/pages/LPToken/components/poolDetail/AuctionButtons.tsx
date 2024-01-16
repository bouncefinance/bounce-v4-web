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
import { useRandomLPBetCallback } from 'bounceHooks/auction/useRandomLPAuctionCallback'
import { LoadingButton } from '@mui/lab'

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
  const { runWithModal, submitted } = useRandomLPBetCallback(poolInfo)
  const token1Currency = new Currency(
    poolInfo.ethChainId,
    poolInfo.token1.address,
    poolInfo.token1.decimals,
    poolInfo.token1.symbol,
    poolInfo.token1.name
  )
  const token1Amount = CurrencyAmount.fromRawAmount(token1Currency, poolInfo.maxAmount1PerWallet)
  const [approvalState, approveCallback] = useApproveCallback(token1Amount, poolInfo.contract)
  const approveCallbackFn = useTransactionModalWrapper(approveCallback as any)
  const { chainId, account } = useActiveWeb3React()
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
  if (action === 'FIRST') {
    return <BaseButton onClick={onCheck}>To Bid</BaseButton>
  }
  if (approvalState !== ApprovalState.APPROVED) {
    if (approvalState === ApprovalState.PENDING) {
      return <BaseButton disabled>Pending...</BaseButton>
    }
    return <BaseButton onClick={approveCallbackFn}>Approval</BaseButton>
  }

  if (action === 'BID') {
    if (allStatus.poolStatus === RandomPoolStatus.Live && !allStatus.isUserJoined) {
      return (
        <LoadingButton onClick={() => runWithModal(token1Amount)} loading={submitted.submitted}>
          Place a Bid
        </LoadingButton>
      )
    }
    return <BaseButton> Place a Bid</BaseButton>
  }
  return (
    <Box>
      <BaseButton disabled>1</BaseButton>
    </Box>
  )
}
export default AuctionButtons
