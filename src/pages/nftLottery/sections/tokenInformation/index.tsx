import { Box, Stack, Typography, styled } from '@mui/material'
import { ReactComponent as TickGreen } from 'assets/svg/tick-green.svg'
import TokenInfoImg from 'assets/imgs/nftLottery/token-info.png'
const SectionBody = styled(Box)`
  width: 100%;
  @media (max-width: 1440px) {
    padding: 0 20px;
  }
`

const Container = styled(Box)`
  display: flex;
  justify-content: space-between;

  width: 100%;
  max-width: 1296px;

  margin: 0 auto;
  border-radius: 32px;
  background: #e1dfd4;
  padding: 33px 90px;
`
const InfoTitle = styled(Typography)`
  color: #4c483a;
  font-variant-numeric: lining-nums proportional-nums;
  font-family: Cormorant SC;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 90%; /* 28.8px */
  text-transform: uppercase;
`

const LabelTitle1 = styled(Typography)`
  color: #8f9288;

  /* D/H5 */
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.32px;
`
const LabelTitle2 = styled(Typography)`
  color: #171717;
  font-family: Inter;
  font-size: 16px;
  font-style: normal;
  font-weight: 500;
  line-height: 150%;
  letter-spacing: -0.32px;
`
const LabelBottomTitle = styled(Typography)`
  color: #4c483a;

  /* AI/D/body 02 */
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 25.2px */
`
const RevealBtn = styled(Box)`
  display: flex;
  padding: 10px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  align-self: stretch;
  border-radius: 100px;
  border: 1px solid #474543;
  background: #fff;

  & > span {
    color: #171717;
    text-align: center;
    /* Design/D/Body 2 */
    font-family: Sharp Grotesk DB Cyr Book 20;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 140%; /* 19.6px */
  }
`
const MiddleLine = styled(Box)`
  width: 1px;
  height: 525px;
  background: #bbb4a8;
`

const InfoLabel = ({ title, content, icon }: { title: string; content: string; icon?: JSX.Element }) => {
  return (
    <Stack
      flexDirection={'row'}
      justifyContent={'space-between'}
      sx={{ paddingBottom: 16, borderBottom: '1px solid #A4A79F' }}
    >
      <LabelTitle1>{title}</LabelTitle1>
      <Stack flexDirection={'row'} gap={4} alignItems={'center'}>
        {icon}
        <LabelTitle2>{content}</LabelTitle2>
      </Stack>
    </Stack>
  )
}
const LeftContent = () => {
  return (
    <Box mt={47} sx={{ width: 'max-content', maxWidth: 468 }}>
      <Stack gap={40}>
        <InfoTitle>Token Information</InfoTitle>
        <Stack gap={16}>
          <InfoLabel title="Contract address" content="0xCc39...780E6f" icon={<TickGreen />} />
          <InfoLabel title="Token Type" content="ERC721" />
        </Stack>
        <InfoTitle>Auction Information</InfoTitle>
        <Stack gap={16}>
          <InfoLabel title="Auction type" content="Random Selection" />
          <InfoLabel title="Participant" content="Public" />
        </Stack>
        <LabelBottomTitle>Before the NFT is revealed, you can trade it on the market</LabelBottomTitle>
      </Stack>
    </Box>
  )
}
const RightContent = () => {
  return (
    <Stack mt={26} gap={29} sx={{ width: 'max-content', maxWidth: 320 }}>
      <Box sx={{ borderRadius: '17.299px', background: '#0F0F0F', padding: '17.3px' }}>
        <img src={TokenInfoImg} />
        <Box mt={20}>
          <Typography
            sx={{
              color: '#FFF',
              fontFamily: 'Helvetica',
              fontSize: 24,
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '140%'
            }}
          >
            AI Meets Bitcoin
          </Typography>
          <Typography
            mt={8}
            sx={{
              color: 'rgba(255, 255, 255, 0.70)',
              fontFamily: 'Helvetica',
              fontSize: 16,
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '140%'
            }}
          >
            Unrevealed
          </Typography>
        </Box>
      </Box>
      <RevealBtn>
        <span>Reveal on Jan 13</span>
      </RevealBtn>
    </Stack>
  )
}
const TokenInformation = () => {
  return (
    <SectionBody>
      <Container>
        <LeftContent />
        <MiddleLine />
        <RightContent />
      </Container>
    </SectionBody>
  )
}
export default TokenInformation
