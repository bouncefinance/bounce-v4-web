import { Box, Stack, Typography, styled } from '@mui/material'
import { RandomSelectionLPProps } from 'api/pool/type'
const Icon1 = getIcon('AUCTION')
import Icon2 from 'assets/images/eth_logo.png'
import { getIcon } from 'pages/nftLottery/sections/tokenInformation/config'
import { useMemo } from 'react'
import { formatGroupNumber } from 'utils/number'
const GrayCard = styled(Box)`
  display: flex;
  padding: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border-radius: 12px;
  background: var(--gray-06, #f6f6f3);
`
const P1 = styled(Typography)`
  color: #20201e;

  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.32px;
`
const WinnerPage = ({ poolInfo }: { poolInfo: RandomSelectionLPProps }) => {
  const claimableReward = useMemo(() => {
    if (
      poolInfo.userTotalFeesReward?.claimableToken0 &&
      poolInfo.userTotalFeesReward?.claimableToken1 &&
      poolInfo.token0Price &&
      poolInfo.token1Price
    ) {
      return poolInfo.token0Price
        .multipliedBy(poolInfo.userTotalFeesReward.claimableToken0.toExact())
        .plus(poolInfo.token1Price.multipliedBy(poolInfo.userTotalFeesReward.claimableToken1.toExact()))
    }
    return undefined
  }, [
    poolInfo.token0Price,
    poolInfo.token1Price,
    poolInfo.userTotalFeesReward?.claimableToken0,
    poolInfo.userTotalFeesReward?.claimableToken1
  ])
  const TotalReward = useMemo(() => {
    if (
      claimableReward &&
      poolInfo.token0Price &&
      poolInfo.token1Price &&
      poolInfo.userTotalFeesReward?.claimedToken0 &&
      poolInfo.userTotalFeesReward?.claimedToken1
    ) {
      return claimableReward.plus(
        poolInfo.token0Price
          .multipliedBy(poolInfo.userTotalFeesReward.claimedToken0.toExact())
          .plus(poolInfo.token1Price.multipliedBy(poolInfo.userTotalFeesReward.claimedToken1.toExact()))
      )
    }
    return undefined
  }, [
    claimableReward,
    poolInfo.token0Price,
    poolInfo.token1Price,
    poolInfo.userTotalFeesReward?.claimedToken0,
    poolInfo.userTotalFeesReward?.claimedToken1
  ])
  console.log('🚀 ~ WinnerPage ~ poolInfo1111:', poolInfo, TotalReward)

  return (
    <Box mb={24}>
      <Box my={24} sx={{ p: 24, background: '#E1F25C', borderRadius: 12 }} flexDirection={'row'} textAlign={'center'}>
        <Typography
          sx={{
            color: '#000',
            fontFamily: 'Inter',
            fontSize: 20,
            fontStyle: 'normal',
            fontWeight: 600,
            lineHeight: '140%' /* 28px */,
            letterSpacing: '-0.4px'
          }}
        >
          You are a Winner 🎉
        </Typography>
      </Box>
      <GrayCard>
        <P1>Your Pool Revenue Share</P1>
        <P1>{(100 / Number(poolInfo.totalShare)).toFixed(2)} %</P1>
      </GrayCard>
      <Stack flexDirection={'row'} gap={16} mt={16}>
        <GrayCard sx={{ flex: 1 }}>
          <P1>Your Pending Claimable Revenue</P1>
          <P1 sx={{ fontSize: 36, fontWeight: 600, color: '#2B51DA' }}>
            $ {claimableReward ? formatGroupNumber(claimableReward.toNumber()) : '--'}
          </P1>
        </GrayCard>
        <GrayCard sx={{ flex: 1 }}>
          <P1>Your Total Rewards</P1>
          <P1 sx={{ fontSize: 36, fontWeight: 600, color: '#121212' }}>
            $ {TotalReward ? formatGroupNumber(TotalReward.toNumber()) : '--'}
          </P1>
        </GrayCard>
      </Stack>
      <GrayCard sx={{ mt: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack flexDirection={'row'} gap={16} alignItems={'center'}>
          <img src={Icon1 || ''} style={{ width: 32, height: 32 }} />
          <P1 sx={{ fontWeight: 600, fontSize: 20 }}>SAVM</P1>
        </Stack>
        <Stack flexDirection={'row'} gap={16} alignItems={'center'}>
          <P1>{poolInfo.userTotalFeesReward?.claimableToken0?.toSignificant(6) || '--'}</P1>
          {/* <P1>$2,800</P1> */}
        </Stack>
      </GrayCard>
      <GrayCard sx={{ mt: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack flexDirection={'row'} gap={16} alignItems={'center'}>
          <img src={Icon2 || ''} style={{ width: 32, height: 32 }} />
          <P1 sx={{ fontWeight: 600, fontSize: 20 }}>ETH</P1>
        </Stack>
        <Stack flexDirection={'row'} gap={16} alignItems={'center'}>
          <P1>{poolInfo.userTotalFeesReward?.claimableToken1?.toSignificant(6) || '--'}</P1>
          {/* <P1>$2,800</P1> */}
        </Stack>
      </GrayCard>
    </Box>
  )
}
export default WinnerPage
