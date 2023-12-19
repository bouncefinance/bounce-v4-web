import { Box, Stack, Typography, styled } from '@mui/material'
import ManImg from 'assets/imgs/nftLottery/card/man.png'
const Container = styled(Box)`
  width: 523px;
  height: 412px;
  position: relative;
`
const Title1 = styled(Typography)`
  color: #fff;
  text-align: center;
  font-variant-numeric: lining-nums proportional-nums;

  /* AI/D/H5 */
  font-family: Cormorant SC;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 90%; /* 16.2px */
  text-transform: uppercase;
`
const Title2 = styled(Typography)`
  color: #f00;
  text-align: center;
  font-variant-numeric: lining-nums proportional-nums;

  /* AI/D/H2 */
  font-family: Cormorant SC;
  font-size: 100px;
  font-style: normal;
  font-weight: 500;
  line-height: 90%; /* 90px */
  text-transform: uppercase;
`
const TextBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  padding: 120px 0px 169px 0px;
`
const Joined = () => {
  return (
    <Stack gap={17} flexDirection={'column'}>
      <Title1>YOU ARE</Title1>
      <Title2>JOINED</Title2>
    </Stack>
  )
}
const SoldOut = () => {
  return (
    <Stack gap={17} flexDirection={'column'}>
      <Title1>LOTTERIES ARE</Title1>
      <Title2>SOLD OUT</Title2>
    </Stack>
  )
}

const ManBox = () => {
  console.log('SoldOut', SoldOut, Joined)

  return (
    <Container>
      <img src={ManImg} />
      <TextBox>
        <Joined />
      </TextBox>
    </Container>
  )
}
export default ManBox
