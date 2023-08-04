import { Box, Stack, Typography, styled } from '@mui/material'
import { MutantEnglishAuctionNFTPoolProp } from 'api/pool/type'
import TokenImage from 'bounceComponents/common/TokenImage'
import Tooltip from 'bounceComponents/common/Tooltip'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import { useMemo } from 'react'
import BigNumber from 'bignumber.js'

const Container = styled(Box)({
  backgroundColor: '#20201e',
  marginTop: 32
})

const RowLabel = styled(Box)({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '40px 32px',
  borderBottom: '1px solid rgba(255, 255, 255, 0.20)',
  '& .Left': {
    color: '#959595',
    fontSize: 20
  },
  '& .Right': {
    color: '#fff',
    fontSize: 36
  }
})

export default function RewardPanel({ poolInfo }: { poolInfo: MutantEnglishAuctionNFTPoolProp }) {
  const AUCTION_FEE = 0.006
  const nextRoundAmount = useMemo(() => {
    if (!poolInfo.currentBidderAmount || !poolInfo.currentBidderAmount1 || !poolInfo.distributeRatios.prevBidderRatio)
      return
    const amount = poolInfo.currentBidderAmount?.subtract(poolInfo.currentBidderAmount1)
    return BigNumber(amount.toSignificant())
      .times(BigNumber(AUCTION_FEE))
      .times(BigNumber(poolInfo.distributeRatios.prevBidderRatio?.toSignificant()))
      .toFixed()
  }, [poolInfo.currentBidderAmount, poolInfo.currentBidderAmount1, poolInfo.distributeRatios.prevBidderRatio])
  return (
    <Container>
      <RowLabel>
        <Typography className="Left">Next Bid Price Target</Typography>
        <Stack direction={'row'} alignItems={'center'} spacing={8}>
          <TokenImage src={poolInfo.token1.smallUrl} alt={poolInfo.token1.symbol} size={28} />
          <Typography color={'#D7D6D9'} fontSize={36}>
            {poolInfo.currentBidderAmount?.toSignificant()} {poolInfo.token1.symbol}
          </Typography>
        </Stack>
      </RowLabel>
      <Box padding={'48px 32px'}>
        <Typography color={'#fff'} fontSize={28} fontFamily={'Public Sans'} fontWeight={600}>
          Reward Amount
        </Typography>
        <Stack direction={'row'} justifyContent={'space-between'} mt={40}>
          <Stack direction={'row'} spacing={8}>
            <Typography color={'#959595'} fontSize={16}>
              Next Round Prize
            </Typography>
            <Tooltip title="Please do not select deflationary or inflationary token.">
              <HelpOutlineIcon sx={{ color: 'var(--ps-gray-700)' }} />
            </Tooltip>
          </Stack>
          <Stack direction={'row'} spacing={8}>
            <TokenImage src={poolInfo.token1.smallUrl} alt={poolInfo.token1.symbol} size={20} />
            <Typography color={'#D7D6D9'}>
              {nextRoundAmount} {poolInfo.token1.symbol}
            </Typography>
          </Stack>
        </Stack>
        <Stack direction={'row'} justifyContent={'space-between'} mt={24}>
          <Stack direction={'row'} spacing={8}>
            <Typography color={'#959595'} fontSize={16}>
              Final Bidder Prize
            </Typography>
            <Tooltip title="Please do not select deflationary or inflationary token.">
              <HelpOutlineIcon sx={{ color: 'var(--ps-gray-700)' }} />
            </Tooltip>
          </Stack>
          <Stack direction={'row'} spacing={8}>
            <TokenImage src={poolInfo.token1.smallUrl} alt={poolInfo.token1.symbol} size={20} />
            <Typography color={'#D7D6D9'}>
              {poolInfo.extraAmount1?.toSignificant() || '--'} {poolInfo.token1.symbol}
            </Typography>
          </Stack>
        </Stack>
      </Box>
    </Container>
  )
}