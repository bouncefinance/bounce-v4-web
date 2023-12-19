import { Box, styled } from '@mui/material'
import BarcodeImg from 'assets/imgs/nftLottery/card/barcode.png'
import { ReactComponent as LineSvg } from 'assets/imgs/nftLottery/card/line.svg'
const Container = styled(Box)`
  position: relative;
  display: flex;
  align-items: center;
  width: 195px;
  height: 412px;
  background: #0f0f0f;
`
const ImgBox = styled(Box)`
  position: absolute;
  right: 25px;
`
const LineBox = styled(Box)`
  position: absolute;
  left: 0px;
`
const Barcode = () => {
  return (
    <Container>
      <LineBox>
        <LineSvg />
      </LineBox>
      <ImgBox>
        <img src={BarcodeImg} />
      </ImgBox>
    </Container>
  )
}
export default Barcode
