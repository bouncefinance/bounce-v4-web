import { Box, Stack, Typography } from '@mui/material'
import P1Img from 'assets/imgs/nftLottery/p1.png'
import P2Img from 'assets/imgs/nftLottery/p2.png'
import P3Img from 'assets/imgs/nftLottery/p3.png'
import P4Img from 'assets/imgs/nftLottery/p4.png'
import P5Img from 'assets/imgs/nftLottery/p5.png'
import Image from 'components/Image'
import Cards from './cards'
import LotteryCountdown from '../../lotteryCountdown'
import NftcardImg from 'assets/imgs/nftLottery/banner/nftcard.png'
import NftshadowImg from 'assets/imgs/nftLottery/banner/nftshadow.png'
import { WithAnimation } from 'components/WithAnimation'
import { useWithAnimationStyles } from '../pc'
import BgImg from 'assets/imgs/nftLottery/banner/globalBg.png'
import { RandomSelectionNFTProps } from 'api/pool/type'
import { useGetRandomSelectionNFTPoolStatus } from 'bounceHooks/auction/useRandomSelectionNFTPoolInfo'

const MobileBanner = ({ poolInfo }: { poolInfo: RandomSelectionNFTProps }) => {
  const { poolStatus } = useGetRandomSelectionNFTPoolStatus(poolInfo)

  const styleTrans = useWithAnimationStyles()
  return (
    <Box
      sx={{
        width: '100vw',
        minHeight: '100vh',
        overflowX: 'hidden',
        background: `url(${BgImg}) repeat`
      }}
    >
      <WithAnimation
        rootMargin="0%"
        defaultAnimation={false}
        className={styleTrans.awaitInView}
        addClassInView={styleTrans.inView}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100vh',
            overflow: 'hidden'
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 30,
              bottom: 0,
              border: '1px solid rgba(195, 161, 109, 0.50)',
              width: '100vh',
              height: '100vh',
              borderRadius: '100vh'
            }}
          ></Box>
          <Box
            sx={{
              position: 'absolute',
              top: 20,
              right: '50%',
              border: '1px solid rgba(195, 161, 109, 0.50)',
              width: '70vh',
              height: '70vh',
              borderRadius: '70vh',
              transform: 'translate3D(60px, 0, 0)'
            }}
          ></Box>
          <Image
            style={{
              position: 'absolute',
              width: 79,
              height: 102,
              top: '50%',
              right: '50%',
              transform: 'translate3D(-50%, calc(50% + 50px), 0)'
            }}
            src={P1Img}
            alt=""
          />
          <Image
            style={{
              position: 'absolute',
              width: 194,
              height: 115,
              top: '0',
              left: '50%',
              transform: 'translate3D(calc(-50% + 30px), -50px, 0)'
            }}
            src={P2Img}
            alt=""
          />
          <Image
            style={{
              position: 'absolute',
              width: 73,
              height: 111,
              bottom: '50%',
              left: '0',
              transform: 'translate3D(-40px, -150px, 0)'
            }}
            src={P3Img}
            alt=""
          />
          <Image
            style={{
              position: 'absolute',
              width: 121,
              height: 106,
              bottom: '50%',
              right: '0',
              transform: 'translate3D(60px, -150px, 0)'
            }}
            src={P4Img}
            alt=""
          />
          <Image
            style={{
              position: 'absolute',
              width: 98,
              height: 65,
              top: '50%',
              left: '50%',
              transform: 'translate3D(60px, 20px, 0)'
            }}
            src={P5Img}
            alt=""
          />
          <Image
            src={NftcardImg}
            style={{
              position: 'absolute',
              top: 281,
              width: 33,
              height: 57,
              left: '50%',
              zIndex: 2,
              transform: 'translate3D(calc(-50% + 32px), 0, 0)'
            }}
          />
          <Image
            src={NftshadowImg}
            style={{
              position: 'absolute',
              top: 340,
              width: 35,
              height: 20,
              left: '50%',
              transform: 'translate3D(calc(-50% + 30px), 0, 0)'
            }}
          />
          <Stack
            direction={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            sx={{
              position: 'absolute',
              top: 195,
              width: '100%',
              left: 0
            }}
          >
            <Typography
              sx={{
                width: '100%',
                fontSize: 18,
                fontWeight: 700,
                color: '#8B6D3F',
                textAlign: 'center'
              }}
              mb={12}
              variant="lotteryh1"
            >
              NFT AUCTION
            </Typography>
            <Typography
              sx={{
                width: '100%',
                fontSize: 50,
                fontWeight: 500,
                color: '#C3A16D',
                textAlign: 'center'
              }}
              variant="lotteryh1"
            >
              AI MEETS
            </Typography>
            <Typography
              sx={{
                width: '100%',
                fontSize: 50,
                fontWeight: 500,
                color: '#C3A16D',
                textAlign: 'center'
              }}
              mb={32}
              variant="lotteryh1"
            >
              BITCOIN
            </Typography>
            <Typography
              sx={{
                width: '100%',
                fontSize: 16,
                fontWeight: 700,
                color: '#8B6D3F',
                textAlign: 'center'
              }}
              mb={12}
              variant="lotteryh1"
            >
              ETHEREUM
            </Typography>
          </Stack>
        </Box>
      </WithAnimation>
      <WithAnimation rootMargin="-30% 0% -30% 0%">
        <Box
          sx={{
            width: '100%',
            marginTop: -46,
            paddingBottom: 46
          }}
        >
          <Typography
            sx={{
              width: '100%',
              fontSize: 18,
              fontWeight: 700,
              color: '#8B6D3F',
              textAlign: 'center'
            }}
            mb={8}
            variant="lotteryh1"
          >
            START FROM
          </Typography>
          <Typography
            sx={{
              width: '100%',
              fontSize: 50,
              fontWeight: 500,
              color: '#C3A16D',
              textAlign: 'center'
            }}
            mb={16}
            variant="lotteryh1"
          >
            DEC 19
          </Typography>
          <Typography
            sx={{
              width: '100%',
              fontSize: 17,
              fontWeight: 400,
              color: '#4C483A',
              textAlign: 'center',
              fontFamily: `'Inter'`,
              padding: '0 16px'
            }}
          >
            {`Token auctions can be conducted on various blockchain platforms, such as Ethereum, which provides a secure and transparent environment for the auction process. The use of blockchain technology also allows for the automatic execution of the auction rules and the issuance of tokens to the winning bidders.`}
          </Typography>
        </Box>
        <LotteryCountdown status={poolStatus} timeList={[poolInfo.openAt, poolInfo.closeAt, poolInfo.claimAt]} />
      </WithAnimation>
      <Cards />
    </Box>
  )
}
export default MobileBanner
