import { Box, styled } from '@mui/material'
import PoolProgress from 'pages/nftLottery/components/poolDetail/poolProgress'
import BidBtnBox from './bidBtnBox'

const Container = styled(Box)`
  width: 100%;
  max-width: 1076px;
  margin: 0 auto;
  margin-top: 40px;
`
const BidPanel = () => {
  return (
    <Container>
      <PoolProgress />
      <BidBtnBox />
    </Container>
  )
}
export default BidPanel
