import { Box, Stack, styled } from '@mui/material'
import { PoolHeadTitle } from '../poolCard/poolHeadTitle'
import WinnerCard from './winnerCard'
import NotWinnerCard from './notWinnerCard'
import Bg1Svg from 'assets/imgs/nftLottery/winner-bg1.svg'
import Bg2Svg from 'assets/imgs/nftLottery/winner-bg2.png'
import { ReactComponent as ShowSvg } from 'assets/imgs/nftLottery/shadow.svg'
import { BaseBtnStyle } from '../poolCard/bidBtnBox'
const Container = styled(Box)`
  position: relative;
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
  height: 1168px;
  background: url(${Bg1Svg});
  background-repeat: no-repeat;
  background-position: center;
`
const WinnerBox = styled(Box)(
  ({ isWinner }: { isWinner: boolean }) => `  
    width:100%;
    max-width: 1044px;
    height: 865px;
    margin: 0 auto;
    ${
      isWinner
        ? `
            background: url(${Bg2Svg}) lightgray -20px 0px / 103.544% 100% no-repeat;
            mix-blend-mode: darken;
          `
        : ''
    }
    display: flex;
    justify-content: end;
    align-items: center;
    flex-direction: column;
    `
)
const ClaimTokenBtn = () => <BaseBtnStyle>Claim Token Back</BaseBtnStyle>
const WinnerResultCard = () => {
  const isWinner = true
  return (
    <Container>
      <Box sx={{ position: 'relative', top: 115 }}>
        <PoolHeadTitle />
      </Box>
      <Box sx={{ position: 'relative', top: 40 }}>
        <WinnerBox isWinner={isWinner}>
          {/* animation container */}
          <div>
            {isWinner && <WinnerCard />}
            {!isWinner && <NotWinnerCard />}
          </div>

          <Stack mt={isWinner ? 55 : 0} mb={isWinner ? 16 : 0} gap={isWinner ? 18 : 55}>
            <div>
              <ShowSvg />
            </div>
            <ClaimTokenBtn />
          </Stack>
        </WinnerBox>
      </Box>
    </Container>
  )
}

export default WinnerResultCard
