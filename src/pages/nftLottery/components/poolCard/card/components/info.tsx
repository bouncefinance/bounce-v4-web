import { Box, Stack, Typography, styled } from '@mui/material'
import WordListImg from 'assets/imgs/nftLottery/card/word-list.png'
import WordList2Img from 'assets/imgs/nftLottery/card/word-list-2.png'
import WordList3Img from 'assets/imgs/nftLottery/card/word-list-3.svg'
import { ReactComponent as LineSvg } from 'assets/imgs/nftLottery/card/line.svg'
import Line2Svg from 'assets/imgs/nftLottery/card/line2.svg'
import { RandomSelectionNFTProps } from 'api/pool/type'
import { CurrencyAmount } from 'constants/token'
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

  padding: 12px 7px;
  border-radius: 2px;
  background: #fff;
  &.small {
    gap: 2px;
    padding-left: 4.52px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  ${({ theme }) => theme.breakpoints.up('sm')} {
    width: 155px;
  }
`
const Title1 = styled(Typography)`
  color: #4c483a;

  font-family: Helvetica;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 140%; /* 19.6px */
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 12px;
  }
  &.small {
    font-size: 5.88px;
  }
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
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 30px;
  }
  &.small {
    font-size: 18.48px;
  }
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
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 30px;
  }
  &.small {
    font-size: 18.48px;
  }
`
const LineBox = styled(Box)`
  position: absolute;
`
const Info = ({ poolInfo }: { poolInfo: RandomSelectionNFTProps }) => {
  const token1 = CurrencyAmount.fromRawAmount(poolInfo.userTokenAmount, poolInfo.maxAmount1PerWallet)
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
              <PriceTitle>{token1?.toSignificant()}</PriceTitle>
              <Title1 sx={{ color: '#F00' }}>{poolInfo.userTokenAmount.symbol}</Title1>
            </Stack>
          </WhiteCard>

          <WhiteCard>
            <Title1>Number of winners</Title1>
            <NumberTitle>{poolInfo.totalShare}</NumberTitle>
          </WhiteCard>

          <WhiteCard>
            <Title1>NFT per Ticket</Title1>
            <NumberTitle>1</NumberTitle>
          </WhiteCard>
        </Stack>
      </Stack>
      <LineBox sx={{ top: 0, right: 2 }}>
        <LineSvg />
      </LineBox>
    </Container>
  )
}
export const MobileInfo = ({ poolInfo }: { poolInfo: RandomSelectionNFTProps }) => {
  return (
    <Box
      sx={{
        width: '100%',
        background: '#0F0F0F',
        position: 'relative',
        '&.rotate1': {
          transform: ' rotate(-13deg)',
          zIndex: 1
        },
        '&.rotate2': {
          zIndex: 1,
          transform: 'translateX(16px) rotate(-3deg)'
        }
      }}
      // className="rotate1 rotate2"
    >
      <Box p="10px">
        <Box>
          <img src={WordList2Img} style={{ display: 'block', margin: '0 auto' }} />
        </Box>
        <Box mt={15} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <WhiteCard style={{ gap: 0, paddingTop: 5, paddingLeft: 4 }}>
            <Title1>Random</Title1>
            <Title1>Selection</Title1>
          </WhiteCard>

          <WhiteCard>
            <Title1>Number of winners</Title1>
            <NumberTitle>{poolInfo.totalShare}</NumberTitle>
          </WhiteCard>

          <WhiteCard>
            <Title1>Ticket price</Title1>
            <Stack flexDirection={'row'} gap={10} alignItems={'end'}>
              <PriceTitle>10</PriceTitle>
              <Title1 sx={{ color: '#F00' }}>AUCTION</Title1>
            </Stack>
          </WhiteCard>

          <WhiteCard>
            <Title1>NFT per Ticket</Title1>
            <NumberTitle>1</NumberTitle>
          </WhiteCard>
        </Box>
      </Box>
      <LineBox style={{ bottom: -3, width: '100%' }}>
        <img style={{ width: '100%' }} src={Line2Svg} />
      </LineBox>
    </Box>
  )
}
export const MobileRotateInfo = ({ poolInfo }: { poolInfo: RandomSelectionNFTProps }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        width: 150,
        height: 173,
        background: '#000',
        boxShadow: '4.2px -6.72px 10.08px 0px rgba(64, 63, 60, 0.10)',
        // transform: 'rotate(-16.428deg)',
        position: 'relative'
      }}
    >
      <img src={WordList3Img} style={{ transform: 'rotate(16.428deg)', position: 'absolute', left: -16 }} />
      <Stack sx={{ position: 'absolute', right: 16, top: 0, height: '100%' }} justifyContent={'center'} gap={3}>
        <WhiteCard style={{ gap: 0, paddingLeft: 3.73, paddingTop: 2, paddingBottom: 5 }}>
          <Title1 className="small">Random</Title1>
          <Title1 className="small">Selection</Title1>
        </WhiteCard>

        <WhiteCard className="small">
          <Title1 className="small">Ticket price</Title1>
          <Stack flexDirection={'row'} gap={10} alignItems={'end'}>
            <PriceTitle className="small">10</PriceTitle>
            <Title1 className="small" sx={{ color: '#F00' }}>
              AUCTION
            </Title1>
          </Stack>
        </WhiteCard>

        <WhiteCard className="small">
          <Title1 className="small">Number of winners</Title1>
          <NumberTitle className="small">{poolInfo.totalShare}</NumberTitle>
        </WhiteCard>

        <WhiteCard className="small">
          <Title1 className="small">NFT per Ticket</Title1>
          <NumberTitle className="small">1</NumberTitle>
        </WhiteCard>
      </Stack>
      <LineBox sx={{ top: 0, right: 2, height: '100%', overflow: 'hidden' }}>
        <LineSvg />
      </LineBox>
    </Box>
  )
}
export default Info
