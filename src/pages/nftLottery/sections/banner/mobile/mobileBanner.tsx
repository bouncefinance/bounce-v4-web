import { Box } from '@mui/material'
import P1Img from 'assets/imgs/nftLottery/p1.png'
import P2Img from 'assets/imgs/nftLottery/p2.png'
import P3Img from 'assets/imgs/nftLottery/p3.png'
import P4Img from 'assets/imgs/nftLottery/p4.png'
import P5Img from 'assets/imgs/nftLottery/p5.png'
import Image from 'components/Image'
const BannerStep1 = () => {
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh'
      }}
    >
      <Image src={P1Img} alt="" />
      <Image src={P2Img} alt="" />
      <Image src={P3Img} alt="" />
      <Image src={P4Img} alt="" />
      <Image src={P5Img} alt="" />
    </Box>
  )
}
export default BannerStep1
