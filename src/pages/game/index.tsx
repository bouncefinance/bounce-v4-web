import { Box, Container, styled, Typography } from '@mui/material'
import { CenterRow, Row } from '../../components/Layout'
import { ReactComponent as LeftArrow } from 'assets/svg/chevron-left.svg'
import { ReactComponent as ThumbsUp } from 'assets/svg/thumbsUp.svg'
import { ReactComponent as ThumbsDown } from 'assets/svg/thumbsDown.svg'
import TokenImage from '../../bounceComponents/common/TokenImage'
import { ChainId, ChainListMap } from '../../constants/chain'

export function Game() {
  return (
    <Container maxWidth="lg">
      <Title />
      <Step />
    </Container>
  )
}

const ThumbBg = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 6px 16px;
  gap: 6px;
  width: auto;
  height: 32px;
  background: #ffffff;
  border-radius: 50px;
`
const StepBg = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 18px 140px 18px 30px;
  gap: 67px;
  width: 556px;
  height: 56px;
  background: #171717;
  border-radius: 10px;
`
const StepText = styled(Typography)`
  font-family: 'Sharp Grotesk DB Cyr Medium 22';
  font-style: normal;
  font-weight: 500;
  font-size: 78px;
  display: flex;
  align-items: center;
  color: #ffffff;
  opacity: 0.4;
`
const StepText2 = styled(StepText)`
  color: #898989;
  opacity: 0.1;
`
const StepBgLine = styled(StepBg)`
  background: #ffffff;
  border: 1px solid #171717;
`

function Title() {
  return (
    <Row mt={67} width={'100%'} justifyContent={'space-between'}>
      <CenterRow>
        <Box
          sx={{
            width: 46,
            height: 46,
            borderRadius: 23,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'white'
          }}
        >
          <LeftArrow />
        </Box>
        <Typography ml={20} variant={'h3'}>
          Ghistie Fixed Price Auction Pool
        </Typography>
        <ThumbBg ml={35}>
          <ThumbsUp />
          <Typography variant={'body1'}>16</Typography>
        </ThumbBg>
        <ThumbBg ml={6}>
          <ThumbsDown />
          <Typography variant={'body1'}>16</Typography>
        </ThumbBg>
      </CenterRow>
      <CenterRow>
        <Typography variant={'h3'}>#000123</Typography>
        <ThumbBg ml={12}>
          <TokenImage src={ChainListMap?.[0 as ChainId]?.logo} size={12} />
          <Typography variant={'h4'}>Ethereum</Typography>
        </ThumbBg>
      </CenterRow>
    </Row>
  )
}

function Step() {
  return (
    <Row alignItems={'center'} mt={47}>
      <StepBg>
        <StepText>1</StepText>
        <Typography sx={{ color: 'white' }} variant={'h4'}>
          Stage One: Game Competition
        </Typography>
      </StepBg>
      <Box
        sx={{
          border: '2px dashed #171717',
          width: 89
        }}
      />
      <StepBgLine>
        <StepText2>2</StepText2>
        <Typography variant={'h4'}>Stage Two: Token Auction</Typography>
      </StepBgLine>
    </Row>
  )
}
