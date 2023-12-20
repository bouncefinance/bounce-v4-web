import { Box, Stack, Typography, styled } from '@mui/material'
import ManImg from 'assets/imgs/nftLottery/card/man.png'
import Man2Img from 'assets/imgs/nftLottery/card/man2.png'
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
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 16px;
  }
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
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 40px;
  }
`
const TextBox = styled(Box)`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  padding: 120px 0px 169px 0px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: 0;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
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
export const MobileManBox = () => {
  return (
    <Box sx={{ position: 'relative' }}>
      <img src={Man2Img} style={{ width: '100%', verticalAlign: 'middle' }} />
      <TextBox>
        <Joined />
      </TextBox>
    </Box>
  )
}
export default ManBox
