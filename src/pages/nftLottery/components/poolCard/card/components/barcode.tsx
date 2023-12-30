import { Box, styled } from '@mui/material'
import BarcodeImg from 'assets/imgs/nftLottery/card/barcode.png'
import Barcode2Img from 'assets/imgs/nftLottery/card/barcode2.png'
import { ReactComponent as LineSvg } from 'assets/imgs/nftLottery/card/line.svg'
import Line2Svg from 'assets/imgs/nftLottery/card/line2.svg'
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
export const MobileBarcode = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        position: 'relative',
        width: '100%',
        background: '#0f0f0f',
        padding: '29px 35px 15px 33px'
      }}
    >
      <LineBox sx={{ width: '100%', left: 0, top: -14 }}>
        <img style={{ width: '100%' }} src={Line2Svg} />
      </LineBox>
      <ImgBox style={{ position: 'initial' }}>
        <img src={Barcode2Img} />
      </ImgBox>
    </Box>
  )
}
export default Barcode
