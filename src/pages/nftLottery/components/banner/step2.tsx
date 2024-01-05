import { Box, Stack, Typography } from '@mui/material'
import { useIsSMDown } from 'themes/useTheme'
import P1Img from 'assets/imgs/nftLottery/p7.png'
import P2Img from 'assets/imgs/nftLottery/p6.png'
import MosaicImg from './mosaicImg'
import { WithAnimation } from 'components/WithAnimation'
import { useWithAnimationStyles } from './pc'
// import fontSvg from 'assets/imgs/nftLottery/banner/font.svg'
// import Cards from './step3'
const BannerStep2 = () => {
  const isSm = useIsSMDown()
  const styleTrans = useWithAnimationStyles()
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%'
        // background: `url(${fontSvg}) no-repeat center 340px`
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
            The First-Ever AI-Generated Ordinals NFT Collection
          </Typography>
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            direction={'row'}
            sx={{
              width: '100%'
            }}
            mb={40}
          ></Stack>
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
            {`The "AI Meets Bitcoin:" Auction features the first-ever AI-generated Ordinals NFT collection, with 450
            exquisite artworks co-created by three top artists: Charlesai, 0009, and RedruM. This collection represents
            a pioneering fusion of artificial intelligence, art and the Bitcoin ecosystem. Each of the featured artworks
            gain a unique identity and narrative, permanently inscribed on the Bitcoin network, guaranteeing their
            endurance and legacy.`}
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
      {/* <Cards /> */}
    </Box>
  )
}
export default BannerStep2
