import { styled, Box } from '@mui/material'
import Info, { MobileRotateInfo } from '../poolCard/card/components/info'
import { ReactComponent as Cross1 } from 'assets/imgs/nftLottery/cross1.svg'
import { ReactComponent as Cross2 } from 'assets/imgs/nftLottery/cross2.svg'
import useBreakpoint from 'hooks/useBreakpoint'
const Container = styled(Box)`
  position: relative;
  /* left: -70px; */
`
const LeftCard = styled(Box)`
  position: relative;
  /* transform: rotate(-15deg); */
  transform: rotate(-16.428deg);
`
const RightCard = styled(Box)`
  position: absolute;
  top: 38px;
  right: 160px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    top: 30px;
    right: 64px;
  }
`
const CrossBox = () => {
  const isSm = useBreakpoint('sm')
  return (
    <Box sx={{ position: 'relative', zoom: isSm ? 0.33 : 1 }}>
      <Box sx={{ position: 'absolute', left: -14 }}>
        <Cross1 />
      </Box>
      <Box sx={{ position: 'absolute', top: -17 }}>
        <Cross2 />
      </Box>
    </Box>
  )
}
const PCCard = () => {
  return (
    <Container>
      <LeftCard>
        <Info />
      </LeftCard>
      <RightCard>
        <CrossBox />
      </RightCard>
    </Container>
  )
}
const MobileCard = () => {
  return (
    <Container>
      <LeftCard>
        <MobileRotateInfo />
      </LeftCard>
      <RightCard>
        <CrossBox />
      </RightCard>
    </Container>
  )
}
const NotWinnerCard = () => {
  const isSm = useBreakpoint('sm')
  if (isSm) {
    return <MobileCard />
  }
  return <PCCard />
}
export default NotWinnerCard
