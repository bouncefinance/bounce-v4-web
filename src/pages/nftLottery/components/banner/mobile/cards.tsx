import { Box, Stack, Typography, styled } from '@mui/material'
import CardImg from 'assets/imgs/nftLottery/banner/card.png'
import QrcodeImg from 'assets/imgs/nftLottery/banner/qrcode.png'
import FontBg from 'assets/imgs/nftLottery/banner/font.svg'
import { ReactComponent as XSvg } from 'assets/imgs/nftLottery/banner/x.svg'
import Image from 'components/Image'
import { WithAnimation } from 'components/WithAnimation'

const CardItem = styled(Box)(() => ({
  position: 'relative',
  borderRadius: '10px',
  background: '#0F0F0F',
  width: 146,
  height: 224,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '8px 5px',
  cursor: 'pointer',
  overflow: 'hidden'
}))
const Cards = () => {
  const MainCard = ({ sx }: { sx: React.CSSProperties }) => {
    return (
      <CardItem
        sx={{
          position: 'relative',
          ...sx
        }}
      >
        <Stack
          justifyContent={'center'}
          alignItems={'center'}
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            border: `0.8px solid  rgba(195, 161, 109, 0.50)`
          }}
          gap={'10px'}
        >
          <Typography
            sx={{
              color: '#C3A16D',
              textAlign: 'center',
              fontVariantNumeric: `lining-nums proportional-nums`,
              fontSize: 10,
              fontWeight: 700,
              lineHeight: '17.28px',
              textTransform: 'uppercase'
            }}
            variant="lotteryh1"
          >
            UNREVEALED
          </Typography>
          <Typography
            sx={{
              color: '#C3A16D',
              textAlign: 'center',
              fontVariantNumeric: `lining-nums proportional-nums`,
              fontSize: 10,
              fontWeight: 700,
              lineHeight: '17.28px',
              textTransform: 'uppercase'
            }}
            variant="lotteryh1"
          >
            NFT
          </Typography>
          <Stack
            sx={{
              position: 'absolute',
              bottom: 20,
              width: '100%'
            }}
            gap={'5px'}
            direction={'row'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography
              variant="lotteryh1"
              sx={{
                color: 'rgba(255, 255, 255, 0.70)',
                fontSize: 12,
                zoom: 0.58
              }}
            >
              AI
            </Typography>
            <XSvg />
            <Typography
              variant="lotteryh1"
              sx={{
                color: 'rgba(255, 255, 255, 0.70)',
                fontSize: 12,
                zoom: 0.58
              }}
            >
              BICOIN
            </Typography>
          </Stack>
        </Stack>
      </CardItem>
    )
  }
  const SubCard = ({ sx }: { sx: React.CSSProperties }) => {
    return (
      <CardItem
        sx={{
          ...sx
        }}
      >
        <Image
          src={CardImg}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '10px',
            objectFit: 'cover'
          }}
        />
      </CardItem>
    )
  }
  const styleConfig = {
    card1: {
      transition: 'all 0.6s',
      transform: 'translate3D(-50%, 0, 0)'
    },
    card2: {
      transition: 'all 0s',
      transformOrigin: 'center bottom',
      transform: `translate3D(calc(-50% + 30px), calc(8px), 0) rotateZ(12deg)`
    },
    card3: {
      transition: 'all 0s',
      transformOrigin: 'center bottom',
      transform: `translate3D(calc(-50% + 45px), calc(12px), 0) rotateZ(20deg)`
    },
    card4: {
      transition: 'all 0s',
      transformOrigin: 'center bottom',
      transform: `translate3D(calc(50% - 30px), calc(8px), 0) rotateZ(-12deg)`
    },
    card5: {
      transition: 'all 0s',
      transformOrigin: 'center bottom',
      transform: `translate3D(calc(50% - 45px), calc(12px), 0) rotateZ(-20deg)`
    }
  }
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: 580,
        overflow: 'hidden',
        background: `url(${FontBg}) no-repeat top center / auto 100%`,
        paddingBottom: 48
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 30,
          left: '50%',
          width: 145,
          height: 145,
          borderRadius: '50%',
          border: '1px solid #000',
          transform: `translate3D(-50%, 0, 0)`
        }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          top: 20,
          left: '50%',
          width: 50,
          height: 23,
          borderRadius: '4px',
          transform: 'translate3D(-50%, 0, 0)',
          background: '#fff',
          lineHeight: '23px',
          textAlign: 'center',
          fontSize: 10,
          fontFamily: `'Inter'`,
          cursor: 'pointer'
        }}
      >
        multibit
      </Box>
      <Typography
        variant="lotteryh1"
        sx={{
          position: 'absolute',
          top: 60,
          left: 20,
          lineHeight: '44px',
          textAlign: 'center',
          fontSize: 32,
          fontWeight: 700,
          cursor: 'pointer',
          color: '#8B6D3F'
        }}
      >
        BRC
      </Typography>
      <Typography
        variant="lotteryh1"
        sx={{
          position: 'absolute',
          top: 60,
          right: 20,
          lineHeight: '44px',
          textAlign: 'center',
          fontSize: 32,
          fontWeight: 700,
          cursor: 'pointer',
          color: '#8B6D3F'
        }}
      >
        ERC
      </Typography>
      <Typography
        variant="lotteryh1"
        sx={{
          position: 'absolute',
          width: '100%',
          bottom: 48,
          left: 0,
          lineHeight: '44px',
          textAlign: 'center',
          fontSize: 18,
          fontWeight: 700,
          cursor: 'pointer',
          color: '#8B6D3F'
        }}
      >
        COMING SOON
      </Typography>
      <Image
        style={{
          position: 'absolute',
          bottom: 84,
          left: '50%',
          width: 205,
          transform: 'translate3D(-50%, 0, 0)'
        }}
        src={QrcodeImg}
      />
      <WithAnimation rootMargin="-30% 0% -30% 0%">
        <>
          <MainCard
            sx={{
              position: 'absolute',
              top: 81,
              left: '50%',
              zIndex: '3',
              ...styleConfig.card1
            }}
          />
          <SubCard
            sx={{
              position: 'absolute',
              top: 85,
              left: '51%',
              zIndex: '2',
              ...styleConfig.card2
            }}
          />
          <SubCard
            sx={{
              position: 'absolute',
              top: 90,
              left: '52%',
              zIndex: '1',
              ...styleConfig.card3
            }}
          />
          <SubCard
            sx={{
              position: 'absolute',
              top: 85,
              right: '51%',
              zIndex: '2',
              ...styleConfig.card4
            }}
          />
          <SubCard
            sx={{
              position: 'absolute',
              top: 90,
              right: '52%',
              zIndex: '1',
              ...styleConfig.card5
            }}
          />
        </>
      </WithAnimation>
    </Box>
  )
}
export default Cards
