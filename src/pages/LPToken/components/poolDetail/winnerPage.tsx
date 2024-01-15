import { Box, Stack, Typography, styled } from '@mui/material'
import { getIcon } from 'pages/nftLottery/sections/tokenInformation/config'
const Icon2 = getIcon('MUBI')
const GrayCard = styled(Box)`
  display: flex;
  padding: 24px 32px;
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
const WinnerPage = () => {
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
        <P1>20%</P1>
      </GrayCard>
      <Stack flexDirection={'row'} gap={16} mt={16}>
        <GrayCard sx={{ flex: 1 }}>
          <P1>Your Pending Claimable Revenue</P1>
          <P1 sx={{ fontSize: 36, fontWeight: 600, color: '#2B51DA' }}>$-</P1>
        </GrayCard>
        <GrayCard sx={{ flex: 1 }}>
          <P1>Your Total Rewards</P1>
          <P1 sx={{ fontSize: 36, fontWeight: 600, color: '#121212' }}>$-</P1>
        </GrayCard>
      </Stack>
      <GrayCard sx={{ mt: 16, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Stack flexDirection={'row'} gap={16} alignItems={'center'}>
          <img src={Icon2 || ''} style={{ width: 32, height: 32 }} />
          <P1 sx={{ fontWeight: 600, fontSize: 20 }}>ETH</P1>
        </Stack>
        <Stack flexDirection={'row'} gap={16} alignItems={'center'}>
          <P1>2.00</P1>
          <P1>50%</P1>
        </Stack>
      </GrayCard>
    </Box>
  )
}
export default WinnerPage
