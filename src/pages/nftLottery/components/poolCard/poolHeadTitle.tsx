import { Box, Stack, styled, Typography } from '@mui/material'
import { ReactComponent as GreenCircleSvg } from 'assets/imgs/nftLottery/poolHead/green-circle.svg'
const Container = styled(Box)`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
`
const PoolTitleStyle = styled(Typography)`
  text-align: center;
  font-variant-numeric: lining-nums proportional-nums;

  /* AI/D/H2 */
  font-family: Cormorant SC;
  font-size: 100px;
  font-style: normal;
  font-weight: 500;
  line-height: 90%; /* 90px */
  text-transform: uppercase;
  &.live {
    color: #3d3a32;
  }
  &.wait {
    color: #696969;
  }
  &.close {
    color: #f00;
  }
  ${({ theme }) => theme.breakpoints.down('md')} {
    font-size: 50px;
  }
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 28px;
  }
`

const poolTitles = [
  'Join The Pool',
  'Waiting for the lottery draw...',
  'You are a Winner',
  'Sorry! You are not selected as a winner'
]

const UpcomingTitle = () => <PoolTitleStyle className="live">{poolTitles[0]}</PoolTitleStyle>

const LiveTitle = () => (
  <div style={{ height: 90 }}>
    <PoolTitleStyle className="live">{poolTitles[0]}</PoolTitleStyle>
    <Stack flexDirection={'row'} alignItems={'center'} justifyContent={'center'} gap={10} mt={20}>
      <GreenCircleSvg />
      <PoolTitleStyle sx={{ fontWeight: 700, fontSize: { sm: 16, xs: 18 }, color: '#76BA1E' }}>LIVE NOW</PoolTitleStyle>
    </Stack>
  </div>
)

const WaitTitle = () => (
  <PoolTitleStyle className="wait" mb={-64}>
    Waiting for the <br /> lottery draw...
  </PoolTitleStyle>
)

const WinnerTitle = () => <PoolTitleStyle className="close">{poolTitles[2]}</PoolTitleStyle>

const NotWinnerTitle = () => <PoolTitleStyle className="close">{poolTitles[3]}</PoolTitleStyle>
export const PoolHeadTitle = () => {
  console.log('LiveTitle', LiveTitle, WaitTitle, WinnerTitle, NotWinnerTitle, UpcomingTitle)

  return (
    <Container>
      <LiveTitle />
    </Container>
  )
}
