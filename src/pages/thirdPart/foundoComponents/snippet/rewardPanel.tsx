import { Box, Stack, Typography, styled } from '@mui/material'
import { MutantEnglishAuctionNFTPoolProp } from 'api/pool/type'
import TokenImage from 'bounceComponents/common/TokenImage'
import Tooltip from 'bounceComponents/common/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { useNextAuctionRewards } from 'hooks/useMutantEnglishAuctionPool'
import useBreakpoint from 'hooks/useBreakpoint'

const Container = styled(Box)({
  backgroundColor: '#20201e',
  marginTop: 32
})

const RowLabel = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '40px 32px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.20)',
  [theme.breakpoints.down('sm')]: {
    padding: '24px 32px',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    width: '100%'
  },
  '& .Left': {
    width: '100%',
    minWidth: 220,
    color: '#959595',
    fontSize: 20,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16
    }
  },
  '& .Right': {
    color: '#fff',
    fontSize: 36
  }
}))

export default function RewardPanel({ poolInfo }: { poolInfo: MutantEnglishAuctionNFTPoolProp }) {
  const nextAuctionRewards = useNextAuctionRewards(poolInfo)
  const isSm = useBreakpoint('sm')
  return (
    <Container>
      <RowLabel>
        <Typography className="Left">Next Bid Price Target</Typography>
        <Stack
          direction={'row'}
          justifyContent={'end'}
          alignItems={'center'}
          spacing={8}
          width={'100%'}
          mt={isSm ? 18 : 0}
        >
          <TokenImage src={poolInfo.token1.smallUrl} alt={poolInfo.token1.symbol} size={28} />
          <Typography color={'#D7D6D9'} sx={{ fontSize: { md: 36, xs: 22 }, wordBreak: 'break-all' }}>
            {poolInfo.currentBidderAmount?.toSignificant()} {poolInfo.token1.symbol}
          </Typography>
        </Stack>
      </RowLabel>
      <Box padding={isSm ? '24px 32px' : '48px 32px'}>
        <Typography color={'#fff'} fontSize={isSm ? 20 : 28} fontFamily={'Public Sans'} fontWeight={600}>
          Reward Amount
        </Typography>
        <Stack direction={'row'} justifyContent={'space-between'} mt={isSm ? 24 : 40}>
          <Stack direction={'row'} spacing={8}>
            <Typography color={'#959595'} fontSize={isSm ? 14 : 16}>
              Next Round Prize
            </Typography>
            <Tooltip title="If there is another participant bidding after you, you will receive the following rewards.">
              <HelpOutlineIcon sx={{ color: 'var(--ps-gray-700)' }} />
            </Tooltip>
          </Stack>
          <Stack direction={'row'} spacing={8}>
            <TokenImage src={poolInfo.token1.smallUrl} alt={poolInfo.token1.symbol} size={20} />
            <Typography color={'#D7D6D9'}>
              {nextAuctionRewards?.prevEstimate || '--'} {poolInfo.token1.symbol}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-between'} mt={24}>
          <Stack direction={'row'} spacing={8}>
            <Typography color={'#959595'} fontSize={isSm ? 14 : 16}>
              Next Final Bidder Prize
            </Typography>
            <Tooltip title="If you become the next winning bidder, you will receive all the rewards from the prize pool.">
              <HelpOutlineIcon sx={{ color: 'var(--ps-gray-700)' }} />
            </Tooltip>
          </Stack>
          <Stack direction={'row'} spacing={8}>
            <TokenImage src={poolInfo.token1.smallUrl} alt={poolInfo.token1.symbol} size={20} />
            <Typography color={'#D7D6D9'}>
              {nextAuctionRewards?.winnerTotal || '--'} {poolInfo.token1.symbol}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Container>
  )
}
