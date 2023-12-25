import { Box, Typography } from '@mui/material'
import { useIsSMDown } from 'themes/useTheme'
import { useEffect, useMemo, useState } from 'react'
import P1Img from 'assets/imgs/nftLottery/p1.png'
import P2Img from 'assets/imgs/nftLottery/p2.png'
import P3Img from 'assets/imgs/nftLottery/p3.png'
import P4Img from 'assets/imgs/nftLottery/p4.png'
import P5Img from 'assets/imgs/nftLottery/p5.png'
import NftcardImg from 'assets/imgs/nftLottery/banner/nftcard.png'
import NftshadowImg from 'assets/imgs/nftLottery/banner/nftshadow.png'
import Bg1Svg from 'assets/imgs/nftLottery/bg1.svg'
import Bg2Svg from 'assets/imgs/nftLottery/bg2.svg'
import Image from 'components/Image'
import MosaicImg from './mosaicImg'
import { WithAnimation } from 'components/WithAnimation'
import { useWithAnimationStyles } from './pc'

const BannerStep1 = () => {
  const isSm = useIsSMDown()
  const [winW, setWinW] = useState(0)
  const [winH, setWinH] = useState(0)
  const [xOffset, setXOffset] = useState<number>(0)
  const [yOffset, setYOffset] = useState<number>(0)
  const styleTrans = useWithAnimationStyles()
  const styleConfig = useMemo(() => {
    return {
      p1: {
        transition: 'all 0.6s',
        transform: 'translate3D(0, -250px, 0)'
      },
      p2: {
        transition: 'all 0.6s',
        transform: 'translate3D(0, -250px, 0)'
      },
      p3: {
        transition: 'all 0.6s',
        transform: 'translate3D(0, -90px, 0)'
      },
      p4: {
        transition: 'all 0.6s',
        transform: 'translate3D(0, 130px, 0)'
      },
      img1: {
        transition: 'all 0.3s',
        zIndex: '2',
        transform: `translate3D(calc(-275px + ${xOffset}px), calc(112px + ${yOffset}px), 0)`
      },
      img2: {
        transition: 'all 0.3s',
        zIndex: '2',
        transform: `translate3D(calc(-106px + ${xOffset}px), calc(-670px + ${yOffset}px), 0)`
      },
      img3: {
        transition: 'all 0.3s',
        zIndex: '2',
        transform: `translate3D(calc(-544px + ${xOffset}px), calc(-50% - 88px + ${yOffset}px), 0)`
      },
      img4: {
        transition: 'all 0.3s',
        zIndex: '2',
        transform: `translate3D(calc(544px + ${xOffset}px), calc(-50% - 88px + ${yOffset}px), 0)`
      },
      img5: {
        transition: 'all 0.3s',
        zIndex: '2',
        transform: `translate3D(calc(302px + ${xOffset}px), calc(62px + ${yOffset}px), 0)`
      },
      img6: {
        transition: 'all 0s',
        zIndex: '2',
        transform: `translate3D(calc(76px + ${xOffset / 4}px), calc(-50% - 88px + ${yOffset / 4}px), 0)`
      },
      img7: {
        transition: 'all 0s',
        transform: `translate3D(calc(93px + ${xOffset / 4}px), calc(-50% + 9px + ${yOffset / 4}px), 0)`,
        zIndex: 2
      },
      bg1: {
        transition: 'all 0.6s',
        transform: 'translate3D(-445px, 0, 0)'
      },
      bg2: {
        transition: 'all 0.6s',
        transform: 'translate3D(-235px, 0, 0)'
      },
      common: {
        transition: 'all 0.6s',
        transform: 'translate3D(0, 0, 0)'
      }
    }
  }, [xOffset, yOffset])
  useEffect(() => {
    const handleResize = () => {
      setWinW(window.innerWidth)
      setWinH(window.innerHeight)
    }
    handleResize()
    const handleMouseMoving = (e: MouseEvent) => {
      const { clientX, clientY } = e || window.event
      const offsetNum = 100 // change transform offset when mouse move,max value is 30px
      const halfWinW = winW / 2
      const halfWinH = winH / 2
      if (clientX > halfWinW) {
        setXOffset(((clientX - halfWinW) / halfWinW) * offsetNum)
      } else if (clientX < halfWinW) {
        setXOffset(-((halfWinW - clientX) / halfWinW) * offsetNum)
      } else {
        setXOffset(0)
      }
      if (clientY > halfWinH) {
        setYOffset(((clientY - halfWinH) / halfWinH) * offsetNum)
      } else if (clientY < halfWinH) {
        setYOffset(-((halfWinH - clientY) / halfWinH) * offsetNum)
      } else {
        setYOffset(0)
      }
    }
    const step1El = document.getElementById('bannerStep1')
    if (step1El) {
      step1El.addEventListener('mousemove', handleMouseMoving)
    }
    window.addEventListener('resize', handleResize)
    return () => {
      if (step1El) {
        step1El.removeEventListener('mousemove', handleMouseMoving)
      }
      window.removeEventListener('resize', handleResize)
    }
  }, [winH, winW])
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100vw',
        height: '1021px'
      }}
      id={'bannerStep1'}
    >
      <Image
        style={{
          position: 'absolute',
          top: '0',
          left: '50%',
          ...styleConfig.bg1
        }}
        src={Bg1Svg}
        alt=""
      />
      <Image
        style={{
          position: 'absolute',
          top: '0',
          right: '50%',
          ...styleConfig.bg2
        }}
        src={Bg2Svg}
        alt=""
      />
      <WithAnimation defaultAnimation={false} className={styleTrans.awaitInView} addClassInView={styleTrans.inView}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            maxHeight: '1021px',
            ...styleConfig.common
          }}
        >
          <Typography
            sx={{
              width: '100%',
              position: 'absolute',
              top: '50%',
              left: '0',
              color: '#8B6D3F',
              fontSize: isSm ? 16 : 32,
              fontWeight: 700,
              textAlign: 'center',
              zIndex: '1',
              ...styleConfig.p1
            }}
            variant="lotteryh1"
          >
            NFT AUCTION
          </Typography>
          <Typography
            sx={{
              width: '100%',
              position: 'absolute',
              top: '50%',
              left: '0',
              color: '#C3A16D',
              fontSize: isSm ? 100 : 200,
              fontWeight: 500,
              textAlign: 'center',
              zIndex: '1',
              ...styleConfig.p2
            }}
            variant="lotteryh1"
          >
            AI MEETS
          </Typography>
          <Typography
            sx={{
              width: '100%',
              position: 'absolute',
              top: '50%',
              left: '0',
              color: '#C3A16D',
              fontSize: isSm ? 100 : 200,
              fontWeight: 500,
              textAlign: 'center',
              zIndex: '1',
              ...styleConfig.p3
            }}
            variant="lotteryh1"
          >
            BITCOIN
          </Typography>
          <Typography
            sx={{
              width: '100%',
              position: 'absolute',
              top: '50%',
              left: '0',
              color: '#C3A16D',
              fontSize: isSm ? 16 : 18,
              fontWeight: 700,
              textAlign: 'center',
              zIndex: '1',
              ...styleConfig.p4
            }}
            variant="lotteryh1"
          >
            ETHEREUM
          </Typography>
        </Box>
        <MosaicImg
          src={P1Img}
          style={{
            position: 'absolute',
            top: '50%',
            width: 184,
            height: 237,
            right: '50%',
            ...styleConfig.img1
          }}
        />
        <MosaicImg
          src={P2Img}
          style={{
            position: 'absolute',
            top: '50%',
            width: 424,
            height: 251,
            left: '50%',
            ...styleConfig.img2
          }}
        />
        <MosaicImg
          src={P3Img}
          style={{
            position: 'absolute',
            top: '50%',
            width: 190,
            height: 287,
            right: '50%',
            ...styleConfig.img3
          }}
        />
        <MosaicImg
          src={P4Img}
          style={{
            position: 'absolute',
            top: '50%',
            width: 188,
            height: 165,
            left: '50%',
            ...styleConfig.img4
          }}
        />
        <MosaicImg
          src={P5Img}
          style={{
            position: 'absolute',
            top: '50%',
            width: 306,
            height: 203,
            left: '50%',
            ...styleConfig.img5
          }}
        />
        <MosaicImg
          src={NftcardImg}
          style={{
            position: 'absolute',
            top: '50%',
            width: 94,
            height: 166,
            left: '50%',
            ...styleConfig.img6
          }}
        />
        <Image
          src={NftshadowImg}
          style={{
            position: 'absolute',
            top: '50%',
            width: 64,
            height: 10,
            left: '50%',
            ...styleConfig.img7
          }}
        />
      </WithAnimation>
    </Box>
  )
}
export default BannerStep1
