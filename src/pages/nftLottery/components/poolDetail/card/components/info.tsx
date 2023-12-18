import { Box, Stack, Typography, styled } from '@mui/material'
import WordListImg from 'assets/imgs/nftLottery/card/wrod-list.png'
import { ReactComponent as LineSvg } from 'assets/imgs/nftLottery/card/line.svg'
const Container = styled(Box)`
  width: 358px;
  height: 412px;
  background: #0f0f0f;
  padding: 14px 36px 16px 16px;
  position: relative;
`
const WhiteCard = styled(Box)`
  display: flex;
  flex-direction: column;
  gap: 9px;
  width: 155px;
  padding: 12px 7px;
  border-radius: 2px;
  background: #fff;
`
const Title1 = styled(Typography)`
  color: #4c483a;

  font-family: Helvetica;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 19.6px */
`
const PriceTitle = styled(Typography)`
  color: #f00;

  font-variant-numeric: lining-nums proportional-nums;

  /* AI/D/H3 */
  font-family: Cormorant SC;
  font-size: 44px;
  font-style: normal;
  font-weight: 700;
  line-height: 90%; /* 39.6px */
  text-transform: uppercase;
`
const NumberTitle = styled(Typography)`
  color: #4c483a;

  font-variant-numeric: lining-nums proportional-nums;

  /* AI/D/H3 */
  font-family: Cormorant SC;
  font-size: 44px;
  font-style: normal;
  font-weight: 700;
  line-height: 90%; /* 39.6px */
  text-transform: uppercase;
`
const LineBox = styled(Box)`
  position: absolute;
  top: 0;
  right: 2px;
`
const Info = () => {
  return (
    <Container>
      <Stack flexDirection={'row'} width={'100%'} gap={16}>
        <Box>
          <img src={WordListImg} />
        </Box>

        <Stack flexDirection={'column'} gap={6} justifyContent={'center'}>
          <WhiteCard style={{ gap: 0, paddingTop: 5, paddingLeft: 4 }}>
            <Title1>Random</Title1>
            <Title1>Selection</Title1>
          </WhiteCard>

          <WhiteCard>
            <Title1>Ticket price</Title1>
            <Stack flexDirection={'row'} gap={10} alignItems={'end'}>
              <PriceTitle>10</PriceTitle>
              <Title1 sx={{ color: '#F00' }}>AUCTION</Title1>
            </Stack>
          </WhiteCard>

          <WhiteCard>
            <Title1>Number of winners</Title1>
            <NumberTitle>450</NumberTitle>
          </WhiteCard>

          <WhiteCard>
            <Title1>NFT per Ticket</Title1>
            <NumberTitle>1</NumberTitle>
          </WhiteCard>
        </Stack>
      </Stack>
      <LineBox>
        <LineSvg />
      </LineBox>
    </Container>
  )
}
export default Info
