import { Box, Stack, Theme, styled, useTheme } from '@mui/material'
import { PoolHeadTitle } from '../poolCard/poolHeadTitle'
import WinnerCard from './winnerCard'
import NotWinnerCard from './notWinnerCard'
import Bg1Svg from 'assets/imgs/nftLottery/winner-bg1.svg'
import Bg1SvgMobile from 'assets/imgs/nftLottery/winner-bg1-mobile.svg'
import Bg2Svg from 'assets/imgs/nftLottery/winner-bg2.png'
import Bg2SvgMobile from 'assets/imgs/nftLottery/winner-bg2-mobile.png'
import { ReactComponent as ShowSvg } from 'assets/imgs/nftLottery/shadow.svg'
import { ReactComponent as ShowMobileSvg } from 'assets/imgs/nftLottery/shadow-mobile.svg'
import { BaseBtnStyle } from '../poolCard/bidBtnBox'
import useBreakpoint from 'hooks/useBreakpoint'
import { WithAnimation } from 'components/WithAnimation'
import { RandomSelectionNFTProps, RandomSelectionNFTResultProps } from 'api/pool/type'
const Container = styled(Box)`
  position: relative;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  height: 1168px;
  background: url(${Bg1Svg});
  background-repeat: no-repeat;
  background-position: center;
  ${({ theme }) => theme.breakpoints.down('sm')} {
    background: url(${Bg1SvgMobile});
    background-repeat: no-repeat;
    background-position: center;
    height: 570px;
  }
`
const WinnerBg = styled(Box)(
  ({ isWinner, theme }: { isWinner: boolean; theme: Theme }) => `  
    
    ${
      isWinner
        ? `
            position: relative;
            top: 146px;
            width: 1044px;
            height: 865px;
            left: 50%;
            transform: translateX(-50%);
            background: url(${Bg2Svg})  lightgray -20px 0px / 103.544% 100% no-repeat;
            mix-blend-mode: darken;
            ${theme.breakpoints.down('sm')}{
              width:360px;
              background: url(${Bg2SvgMobile}) lightgray -7.548px 0px / 103.544% 100% no-repeat;
              mix-blend-mode: darken;
              position: relative;
              top: 94px;
              height: 325px;  
     }  
          `
        : ''
    }
   
    `
)
const WinnerBox = styled(Box)(
  ({ isWinner, theme }: { isWinner: boolean; theme: Theme }) => `
  width: fit-content;
  max-width: 1044px;
  margin: 0 auto;
  position: absolute;
  left: 46%;
  top: 53%;
  transform: translate(-50%,-50%);
${
  isWinner
    ? `
    left: 50%;
    top: 50%;
    transform: translate(-50%,-54%);
    ${theme.breakpoints.down('sm')}{
      top: 91px;
      left: 50%;
      transform: translateX(-50%);} 
    `
    : ''
}

  
`
)

const ClaimTokenBtn = () => <BaseBtnStyle>Claim Token Back</BaseBtnStyle>
const WinnerResultCard = ({
  allStatus,
  poolInfo
}: {
  allStatus: RandomSelectionNFTResultProps
  poolInfo: RandomSelectionNFTProps
}) => {
  const theme = useTheme()
  const isWinner = allStatus.isUserWinner
  const isSm = useBreakpoint('sm')
  return (
    <Container>
      <Box
        sx={{ position: 'absolute', top: isSm ? 67 : 114, left: '50%', transform: 'translateX(-50%)', width: '100%' }}
      >
        <WithAnimation>
          <PoolHeadTitle allStatus={allStatus} />
        </WithAnimation>
      </Box>
      <WinnerBg isWinner={isWinner} theme={theme}>
        <WinnerBox isWinner={isWinner} theme={theme}>
          <WithAnimation>
            {isWinner && <WinnerCard poolInfo={poolInfo} />}
            {!isWinner && <NotWinnerCard poolInfo={poolInfo} />}
          </WithAnimation>
        </WinnerBox>
      </WinnerBg>
      <Stack
        px={isSm ? 20 : 0}
        gap={isWinner ? (isSm ? 35 : 18) : 55}
        // gap={isSm ? 35 : 55}
        sx={{
          width: '100%',
          position: 'absolute',
          bottom: 173,
          // left: '50%',
          // transform: 'translateX(-50%)',
          [theme.breakpoints.down('sm')]: {
            position: 'absolute',
            bottom: 0
          }
        }}
      >
        <Box
          sx={{
            svg: {
              width: '100%',
              fill: 'radial-gradient(50.43% 50% at 49.98% 51.21%, #C7C1C1 0%, #D4D0D0 9%, #E7E4E4 26%, #F4F3F3 44%, #FCFCFC 66%, #FFF 100%)',
              opacity: 0.7,
              'background-blend-mode': 'multiply',
              'mix-blend-mode': 'multiply'
            }
          }}
        >
          {isSm && <ShowMobileSvg />}
          {/* {!isSm && <img src={ShowSvg} />} */}
          {!isSm && <ShowSvg />}
        </Box>
        <ClaimTokenBtn />
      </Stack>
    </Container>
  )
}

export default WinnerResultCard
