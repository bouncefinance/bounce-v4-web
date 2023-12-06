import { Box, Container, Typography, styled } from '@mui/material'
import Image from 'components/Image'
import { Row } from 'components/Layout'
import useBreakpoint from 'hooks/useBreakpoint'
import BotDoImg from 'assets/imgs/auction/bot-do.png'
const Title = styled(Typography)`
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-variant-numeric: lining-nums proportional-nums;
  font-family: Inter;
  font-size: 28px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%; /* 36.4px */
  letter-spacing: -0.56px;
  text-transform: capitalize;
`
const GrayTitle = styled(Typography)`
  color: #626262;
  leading-trim: both;
  text-edge: cap;

  /* D/body02 */
  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */
`
const Card = styled(Box)`
  display: block;
  height: 160px;
  padding: 20px 20px 40px 20px;
  border-radius: 20px;
  background: #fff;
`
const Circle = styled(Box)`
  display: flex;
  width: 30px;
  height: 30px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 30px;
  border: 1px solid #000;
`
const CircleTitle = styled(Typography)`
  color: #000;
  leading-trim: both;
  text-edge: cap;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 18px */
  letter-spacing: -0.24px;
  text-transform: capitalize;
`
const ContentTitle = styled(Typography)`
  margin-top: 32px;
  color: #000;
  leading-trim: both;
  text-edge: cap;

  font-family: Inter;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%; /* 21px */

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  max-height: 60px;
  & .link {
    color: #1b52e1;
  }
`
const AuctionBotDoCard = () => {
  const isSm = useBreakpoint('sm')

  return (
    <Box sx={{ padding: isSm ? '60px 16px 80px 16px' : '100px 72px 120px', background: '#fff' }}>
      <Container
        sx={{
          maxWidth: '1296px !important'
        }}
      >
        <Row sx={{ width: '100%', borderRadius: 24, background: '#F6F6F3' }}>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <Image style={{ width: '100%' }} src={BotDoImg} />
          </Box>

          <Box sx={{ padding: 32, flex: 1.2 }}>
            <Title>What can this bot do?</Title>
            <GrayTitle>
              Bounce TGBot can help you quickly send transaction tokens through telegram. It can be done in just three
              easy steps.
            </GrayTitle>
            <Box mt={20} sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <Card>
                <Circle>
                  <CircleTitle>1</CircleTitle>
                </Circle>
                <ContentTitle>
                  Go to{' '}
                  <a href="https://telegram.me/BotFather" target="_blank" rel="noreferrer" className="link">
                    @BotFather
                  </a>
                  .{' '}
                  {`Press his name to do that and then press 'Send
                  Messege' if it's needed.`}
                </ContentTitle>
              </Card>
              <Card>
                <Circle>
                  <CircleTitle>2</CircleTitle>
                </Circle>
                <ContentTitle>
                  {`Create a new bot with him. To do this use the 'newbot' command inside @BotFather.`}
                </ContentTitle>
              </Card>
              <Card>
                <Circle>
                  <CircleTitle>3</CircleTitle>
                </Circle>
                <ContentTitle>{`Copy the API token that @BotFather will give you.`}</ContentTitle>
              </Card>
              <Card>
                <Circle>
                  <CircleTitle>4</CircleTitle>
                </Circle>
                <ContentTitle>{`Come back to here and send the copied API token here.`}</ContentTitle>
              </Card>
            </Box>
          </Box>
        </Row>
      </Container>
    </Box>
  )
}
export default AuctionBotDoCard
