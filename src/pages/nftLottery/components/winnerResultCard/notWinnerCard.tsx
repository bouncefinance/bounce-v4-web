import { styled, Box } from '@mui/material'
import Info from '../poolCard/card/components/info'
import { ReactComponent as Cross1 } from 'assets/imgs/nftLottery/cross1.svg'
import { ReactComponent as Cross2 } from 'assets/imgs/nftLottery/cross2.svg'
const Container = styled(Box)`
  position: relative;
  /* left: -70px; */
`
const LeftCard = styled(Box)`
  position: relative;
  /* transform: rotate(-15deg); */
`
const RightCard = styled(Box)`
  position: absolute;
  top: 38px;
  right: 160px;
`
const CrossBox = () => {
  return (
    <Box sx={{ position: 'relative' }}>
      <Box sx={{ position: 'absolute', left: -14 }}>
        <Cross1 />
      </Box>
      <Box sx={{ position: 'absolute', top: -17 }}>
        <Cross2 />
      </Box>
    </Box>
  )
}
const NotWinnerCard = () => {
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
export default NotWinnerCard
