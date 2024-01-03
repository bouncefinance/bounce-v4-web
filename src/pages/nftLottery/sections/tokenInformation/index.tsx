import { Box, Stack, Typography, styled } from '@mui/material'
// import { ReactComponent as TickGreen } from 'assets/svg/tick-green.svg'
import ImgCard from '../../components/tokenInformation/imgCard'
import useBreakpoint from 'hooks/useBreakpoint'
import BgImg from 'assets/imgs/nftLottery/banner/globalBg.png'
import { WithAnimation } from 'components/WithAnimation'
import ChartInfo from './chartInfo'
import { RandomSelectionNFTProps } from 'api/pool/type'
const SectionBody = styled(Box)`
  width: 100%;
  background: url(${BgImg}) repeat;
  padding-bottom: 120px;
  @media (max-width: 1440px) {
    padding: 0 20px;
  }
  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: 0 16px;
    padding-bottom: 48px;
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

  ${({ theme }) => theme.breakpoints.down('lg')} {
    padding: 20px;
    justify-content: space-around;
  }
  ${({ theme }) => theme.breakpoints.down('md')} {
    gap: 30px;
    align-items: center;
  }
  ${({ theme }) => theme.breakpoints.down('sm')} {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 24px 16px 40px;
    gap: 40px;
  }
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
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 18px;
  }
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
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 14px;
  }
`
const LabelBottomTitle = styled(Typography)`
  color: #4c483a;

  /* AI/D/body 02 */
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%; /* 25.2px */
  ${({ theme }) => theme.breakpoints.down('sm')} {
    font-size: 15px;
  }
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
  /* height: 525px; */
  background: #bbb4a8;
  ${({ theme }) => theme.breakpoints.down('lg')} {
    display: none;
  }
`
const LeftContentStyle = styled(Box)`
  width: max-content;
  max-width: 468px;
  margin-top: 47px;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    width: 100%;
    margin-top: 0px;
  }
`
const InfoLabel = ({ title, content, icon }: { title: string; content: string; icon?: JSX.Element }) => {
  const isSm = useBreakpoint('sm')
  return (
    <Stack
      flexDirection={isSm ? 'column' : 'row'}
      justifyContent={'space-between'}
      sx={{ paddingBottom: isSm ? 12 : 16, borderBottom: '1px solid #A4A79F' }}
    >
      <LabelTitle1>{title}</LabelTitle1>
      <Stack flexDirection={'row'} gap={4} alignItems={'center'}>
        {icon}
        <LabelTitle2>{content}</LabelTitle2>
      </Stack>
    </Stack>
  )
}

const LeftContent = ({ poolInfo }: { poolInfo: RandomSelectionNFTProps }) => {
  const isSm = useBreakpoint('sm')
  return (
    <LeftContentStyle>
      <Stack gap={isSm ? 0 : 40}>
        <InfoTitle>Token Information</InfoTitle>
        <Stack gap={16} mt={isSm ? 16 : 0}>
          {/* <InfoLabel title="Contract address" content="TBD" icon={<TickGreen />} /> */}
          <InfoLabel title="Contract address" content="TBD" />
          <InfoLabel title="Token Type" content="ERC721" />
        </Stack>
        <InfoTitle mt={isSm ? 24 : 'auto'}>Auction Information</InfoTitle>
        <Stack gap={16} mt={isSm ? 16 : 0}>
          <InfoLabel title="Auction type" content="Random Selection" />
          <InfoLabel title="Participant" content="Public" />
        </Stack>
      </Stack>
      <Box mt={isSm ? 24 : 46}>
        <ChartInfo poolInfo={poolInfo} />
      </Box>
    </LeftContentStyle>
  )
}
const RightContent = () => {
  const isSm = useBreakpoint('sm')
  return (
    <Stack
      mt={isSm ? 0 : 26}
      alignItems={'center'}
      gap={isSm ? 24 : 29}
      sx={{ width: isSm ? '100%' : 'max-content', maxWidth: 320 }}
    >
      <ImgCard />
      <RevealBtn>
        {/* <span>Reveal on Jan 13</span> */}
        <span>Reveal on TBD</span>
      </RevealBtn>
      <LabelBottomTitle>Before the NFT is revealed, you can trade it on the market</LabelBottomTitle>
    </Stack>
  )
}

const TokenInformation = ({ poolInfo }: { poolInfo: RandomSelectionNFTProps }) => {
  return (
    <SectionBody>
      <WithAnimation>
        <Container>
          <LeftContent poolInfo={poolInfo} />
          <MiddleLine />
          <RightContent />
        </Container>
      </WithAnimation>
    </SectionBody>
  )
}
export default TokenInformation
