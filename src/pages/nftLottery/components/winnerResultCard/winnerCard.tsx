import { Box, Stack, styled } from '@mui/material'
import Info from '../poolCard/card/components/info'
import ImgCard from '../tokenInformation/imgCard'
import p1 from 'assets/imgs/nftLottery/winner-bg3.png'
import p2 from 'assets/imgs/nftLottery/winner-bg4.png'
const Container = styled(Box)`
  /* position: relative;
  top: 118px;
  left: 0px; */
`
const LeftCard = styled(Box)`
  z-index: 3;
  position: relative;
  /* transform: rotate(-16deg) translate(34px, 7px); */
`
const RightCard = styled(Box)`
  position: relative;
  z-index: 2;
  & > img {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translate(-50%, -87%);
  }
`
const BottomCard = styled(Box)`
  & > img {
    z-index: 1;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -60%);
  }
`
const WinnerCard = () => {
  return (
    <Container>
      <Stack flexDirection={'row'}>
        <LeftCard>
          <Info />
        </LeftCard>
        <RightCard>
          <img src={p1} />
          <ImgCard />
        </RightCard>
      </Stack>
      <BottomCard>
        <img src={p2} />
      </BottomCard>
    </Container>
  )
}

export default WinnerCard
