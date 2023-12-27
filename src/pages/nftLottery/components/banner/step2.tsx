import { Box, Stack, Typography } from '@mui/material'
import { useIsSMDown } from 'themes/useTheme'
import P1Img from 'assets/imgs/nftLottery/p7.png'
import P2Img from 'assets/imgs/nftLottery/p6.png'
import MosaicImg from './mosaicImg'
import { WithAnimation } from 'components/WithAnimation'
import { useWithAnimationStyles } from './pc'
import fontSvg from 'assets/imgs/nftLottery/banner/font.svg'
import Cards from './step3'
const BannerStep2 = () => {
  const isSm = useIsSMDown()
  const styleTrans = useWithAnimationStyles()
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        background: `url(${fontSvg}) no-repeat center 340px`
      }}
    >
      <WithAnimation defaultAnimation={false} className={styleTrans.awaitInView} addClassInView={styleTrans.inView}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            display: 'flex',
            flexFlow: 'column',
            justifyContent: 'flex-start',
            alignItems: 'center'
          }}
        >
          <Typography
            sx={{
              width: '100%',
              position: 'relative',
              color: '#8B6D3F',
              fontSize: isSm ? 16 : 32,
              fontWeight: 700,
              textAlign: 'center'
            }}
            variant="lotteryh1"
          >
            START FROM
          </Typography>
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            direction={'row'}
            sx={{
              width: '100%'
            }}
            mb={40}
          >
            <Typography
              variant="lotteryh1"
              sx={{
                display: 'inline-block',
                color: '#C3A16D',
                fontSize: isSm ? 100 : 200,
                fontWeight: 500,
                lineHeight: '160px',
                textAlign: 'center'
              }}
            >
              DEC
            </Typography>
            <Typography
              variant="lotteryh1"
              sx={{
                display: 'inline-block',
                color: '#C3A16D',
                fontSize: isSm ? 100 : 200,
                fontWeight: 500,
                lineHeight: '160px',
                textAlign: 'center'
              }}
            >
              1
            </Typography>
            <Typography
              variant="lotteryh1"
              sx={{
                display: 'inline-block',
                color: '#C3A16D',
                fontSize: isSm ? 100 : 200,
                fontWeight: 500,
                textAlign: 'center',
                lineHeight: '160px',
                transform: 'translateY(-30px)'
              }}
            >
              9
            </Typography>
          </Stack>
          <Typography
            sx={{
              width: '100%',
              maxWidth: 800,
              margin: '0 auto',
              wordBreak: 'break-word',
              color: '#4C483A',
              fontSize: isSm ? 14 : 20,
              fontWeight: 400,
              textAlign: 'center',
              fontFamily: `'Inter'`,
              zIndex: '1'
            }}
          >
            Token auctions can be conducted on various blockchain platforms, such as Ethereum, which provides a secure
            and transparent environment for the auction process. The use of blockchain technology also allows for the
            automatic execution of the auction rules and the issuance of tokens to the winning bidders.
          </Typography>
          <MosaicImg
            style={{
              position: 'absolute',
              top: '170px',
              width: 173,
              height: 142,
              right: '50%',
              zIndex: '2',
              transform: 'translate3D(-631px, -50%, 0)'
            }}
            src={P1Img}
          />
          <MosaicImg
            style={{
              position: 'absolute',
              top: '170px',
              left: '50%',
              transform: 'translate3D(558px, -50%, 0)',
              zIndex: '2',
              width: 177,
              height: 117
            }}
            src={P2Img}
          />
        </Box>
      </WithAnimation>
      <Cards />
    </Box>
  )
}
export default BannerStep2
