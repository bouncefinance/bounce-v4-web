import { Box, styled, Typography } from '@mui/material'
import BackButton from '../../../../bounceComponents/common/BackButton'
import { ContainerBox } from '../tokenLocker'
import { Body01, H4 } from '../../../../components/Text'
import { BoxSpaceBetween, SolidBtn } from '../disperse/disperse'
import Grid2 from '@mui/material/Unstable_Grid2'

export default function TokenInfo() {
  return (
    <Box>
      <ContainerBox>
        <BackButton />
        <Box
          sx={{
            borderRadius: '25px',
            background: '#fff',
            padding: '56px'
          }}
        >
          <LineBg>
            <GrayBg>
              <H4>Token Information</H4>
              <WhiteBg>
                <BottomLineBox>
                  <Body01 sx={{ color: '#959595' }}>Contract address</Body01>
                  <Body01>0xdac17f958d2ee523a2206206994597c13d831ec7</Body01>
                </BottomLineBox>
                <BottomLineBox>
                  <Body01 sx={{ color: '#959595' }}>Balance</Body01>
                  <Body01>100,000,000</Body01>
                </BottomLineBox>
                <BottomLineBox>
                  <Body01 sx={{ color: '#959595' }}>Chain</Body01>
                  <Body01>Ethereum</Body01>
                </BottomLineBox>
                <FullSpaceBetweenBox>
                  <Body01 sx={{ color: '#959595' }}>Token image</Body01>
                  <img style={{ width: 24, height: 24 }} />
                </FullSpaceBetweenBox>
              </WhiteBg>
              <SolidBtn style={{ width: '100%' }}>Transfer</SolidBtn>
            </GrayBg>
            <Grid2 container sx={{ width: '100%' }} columnSpacing={20}>
              <Grid2 md={6}>
                <GrayBg>
                  <BoxSpaceBetween width={'100%'}>
                    <H4>Token Locked</H4>
                    <SolidBtnSmall>+ Lock</SolidBtnSmall>
                  </BoxSpaceBetween>
                  <WhiteBg>
                    <BottomLineBox>
                      <Body01 sx={{ color: '#959595' }}>Locked of Total</Body01>
                      <Body01>50%</Body01>
                    </BottomLineBox>
                    <BottomLineBox>
                      <Body01 sx={{ color: '#959595' }}>Model</Body01>
                      <Body01>Normal</Body01>
                    </BottomLineBox>
                    <LinkBtn>Check detail</LinkBtn>
                  </WhiteBg>
                </GrayBg>
              </Grid2>
              <Grid2 md={6}>
                <GrayBg>
                  <BoxSpaceBetween width={'100%'}>
                    <H4>Token Disperse</H4>
                    <SolidBtnSmall>+ Disperse</SolidBtnSmall>
                  </BoxSpaceBetween>
                  <WhiteBg>
                    <BottomLineBox>
                      <Body01 sx={{ color: '#959595' }}>Disperse Amount</Body01>
                      <Body01>500,000</Body01>
                    </BottomLineBox>
                    <BottomLineBox>
                      <Body01 sx={{ color: '#959595' }}>Total Address</Body01>
                      <Body01>50</Body01>
                    </BottomLineBox>
                    <LinkBtn>Check detail</LinkBtn>
                  </WhiteBg>
                </GrayBg>
              </Grid2>
            </Grid2>
          </LineBg>
        </Box>
      </ContainerBox>
    </Box>
  )
}

const LineBg = styled(Box)`
  display: flex;
  padding: 30px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  border-radius: 20px;
  border: 1px solid var(--grey-05, #e8e9e4);
`
export const GrayBg = styled(Box)`
  display: flex;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 20px;
  align-self: stretch;
  border-radius: 16px;
  background: var(--grey-06, #f6f6f3);
`
export const WhiteBg = styled(Box)`
  display: flex;
  padding: 12px 24px;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  border-radius: 12px;
  background: var(--white-100, #fff);
`
export const FullSpaceBetweenBox = styled(BoxSpaceBetween)`
  width: 100%;
  padding: 20px 0;
`
export const BottomLineBox = styled(BoxSpaceBetween)`
  width: 100%;
  padding: 20px 0;
  border-bottom: 1px solid var(--grey-05, #e8e9e4);
`
const SolidBtnSmall = styled(`button`)`
  color: white;
  display: flex;
  padding: 4px 8px;
  align-items: center;
  gap: 6px;
  border-radius: 6px;
  border: transparent;
  background: var(--black-100, #121212);
`
const LinkBtn = styled(Typography)`
  text-decoration-line: underline;
  width: 100%;
  padding: 20px;
  text-align: center;
  color: #2b51da;
`
