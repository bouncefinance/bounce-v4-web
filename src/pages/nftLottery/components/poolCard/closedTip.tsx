import { styled, Box, Typography } from '@mui/material'
import { ReactComponent as ShowSvg } from 'assets/imgs/nftLottery/shadow.svg'
import { ReactComponent as RedCircle } from 'assets/imgs/nftLottery/red-circle.svg'
const Container = styled(Box)`
  width: 100%;
  max-width: 673px;
  margin: 0 auto;
  position: relative;
  margin-top: 37px;
`
const Title = styled(Typography)`
  color: var(--AI-red, #f00);
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
const SvgBox = styled(Box)``
const TextBox = styled(Box)`
  display: flex;
  align-items: center;
  gap: 10px;

  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`
const ClosedTip = () => {
  return (
    <Container>
      <TextBox>
        <RedCircle />
        <Title>Auction CLOSED</Title>
      </TextBox>
      <SvgBox>
        <ShowSvg />
      </SvgBox>
    </Container>
  )
}

export default ClosedTip
