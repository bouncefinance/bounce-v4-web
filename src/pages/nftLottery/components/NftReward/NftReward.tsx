import { Box, Stack, Typography, styled } from '@mui/material'
import ImgCard from '../tokenInformation/imgCard'
import { BaseBtnStyle } from '../poolCard/bidBtnBox'
import useBreakpoint from 'hooks/useBreakpoint'
const Container = styled(Box)`
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    margin-top: 48px;
    padding: 0 16px;
  }
`
const Body = styled(Box)`
  width: 100%;
  max-width: 1296px;
  margin: 0 auto;
  padding: 66px 0px 40px 72px;
  border-radius: 32px;
  background: #e1dfd4;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    padding: 24px 16px;
  }
`
const Title1 = styled(Typography)`
  color: var(--AI-dark-02, #4c483a);
  font-variant-numeric: lining-nums proportional-nums;

  /* AI/D/H4 */
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
const Title2 = styled(Typography)`
  color: var(--AI-dark-01, var(--AI-black-02, #3d3a32));
  text-align: left;

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
const NftContainer = styled(Box)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 24px;

  width: max-content;
  max-width: 1224px;
  height: 501px;
  overflow: scroll;
  margin: 0 auto;
  padding: 34px 0 58px;
  &::-webkit-scrollbar {
    display: none;
  }
  /* @media (min-width: 1224px) {
    justify-content: flex-start;
  } */
  ${({ theme }) => theme.breakpoints.down('sm')} {
    height: fit-content;
    margin-top: 40px;
    padding: 0;
  }
`
const NftReward = () => {
  const isSm = useBreakpoint('sm')
  return (
    <Container>
      <Body>
        <Stack flexDirection={isSm ? 'column' : 'row'} gap={16}>
          <Title1>YOUR NFT</Title1>
          <Title2>( Before the NFT is revealed, you can trade it on the market )</Title2>
        </Stack>
        <NftContainer>
          <ImgCard />
          <ImgCard />
          <ImgCard />
          <ImgCard />
          {/* <ImgCard />
          <ImgCard />
          <ImgCard /> */}
          {/* <Title2>You don’t have any NFT</Title2> */}
        </NftContainer>
        <Stack justifyContent={'center'} alignItems={'center'} mt={isSm ? 24 : 0}>
          <BaseBtnStyle disabled> Extract NFT</BaseBtnStyle>
        </Stack>
      </Body>
    </Container>
  )
}
export default NftReward
