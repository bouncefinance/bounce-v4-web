import { Box } from '@mui/material'
import BackButton from '../../../../bounceComponents/common/BackButton'
import { ContainerBox } from './tokenLocker'
import { BottomLineBox, FullSpaceBetweenBox, GrayBg, WhiteBg } from '../tokenMinter/TokenInfo'
import { Body01, H4 } from '../../../../components/Text'
import Grid2 from '@mui/material/Unstable_Grid2'
import { LineBtn, SolidBtn } from '../disperse/disperse'

export default function LockerInfo() {
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
          <GrayBg>
            <H4>Token Information</H4>
            <WhiteBg>
              <BottomLineBox>
                <Body01 sx={{ color: '#959595' }}>Chain</Body01>
                <Body01>Ethereum</Body01>
              </BottomLineBox>
              <BottomLineBox>
                <Body01 sx={{ color: '#959595' }}>Contract address</Body01>
                <Body01>0xdac17f958d2ee523a2206206994597c13d831ec7</Body01>
              </BottomLineBox>
              <BottomLineBox>
                <Body01 sx={{ color: '#959595' }}>Token name</Body01>
                <Body01>Bounce</Body01>
              </BottomLineBox>
              <BottomLineBox>
                <Body01 sx={{ color: '#959595' }}>Token symbol</Body01>
                <Body01>Auction</Body01>
              </BottomLineBox>
              <FullSpaceBetweenBox>
                <Body01 sx={{ color: '#959595' }}>Token decimal</Body01>
                <Body01>18</Body01>
              </FullSpaceBetweenBox>
            </WhiteBg>
          </GrayBg>
          <GrayBg mt={20}>
            <H4>Lock Information</H4>
            <WhiteBg>
              <BottomLineBox>
                <Body01 sx={{ color: '#959595' }}>Title</Body01>
                <Body01>Bounce lock 1</Body01>
              </BottomLineBox>
              <BottomLineBox>
                <Body01 sx={{ color: '#959595' }}>Amount</Body01>
                <Body01>100,000,000</Body01>
              </BottomLineBox>
              <BottomLineBox>
                <Body01 sx={{ color: '#959595' }}>Owner</Body01>
                <Body01>0x813ce1ad36A28aAfF1Fe0750DB4eb65a7d722A61</Body01>
              </BottomLineBox>
              <BottomLineBox>
                <Body01 sx={{ color: '#959595' }}>Lock model</Body01>
                <Body01>linear</Body01>
              </BottomLineBox>
              <BottomLineBox>
                <Body01 sx={{ color: '#959595' }}>Time</Body01>
                <Body01>2023-8-15 17:42:10 to 2023-8-20 18:22:59</Body01>
              </BottomLineBox>
              <BottomLineBox>
                <Body01 sx={{ color: '#959595' }}>Token Available to withdraw</Body01>
                <Box display="flex" alignItems={'center'}>
                  <Body01>20</Body01>
                  <img style={{ width: 24, height: 24 }} />
                  <Body01>Auction</Body01>
                </Box>
              </BottomLineBox>
              <FullSpaceBetweenBox>
                <Body01 sx={{ color: '#959595' }}>Remaining Locked token</Body01>
                <Box display="flex" alignItems={'center'}>
                  <Body01>20</Body01>
                  <img style={{ width: 24, height: 24 }} />
                  <Body01>Auction</Body01>
                </Box>
              </FullSpaceBetweenBox>
            </WhiteBg>
          </GrayBg>
          <Grid2 container spacing={10} mt={48}>
            <Grid2 md={6}>
              <LineBtn sx={{ width: '100%' }}>Edit</LineBtn>
            </Grid2>
            <Grid2 md={6}>
              <SolidBtn sx={{ width: '100%' }}>Withdraw</SolidBtn>
            </Grid2>
          </Grid2>
        </Box>
      </ContainerBox>
    </Box>
  )
}
