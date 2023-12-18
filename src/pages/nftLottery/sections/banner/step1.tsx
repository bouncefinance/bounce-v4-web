import { Box, Typography } from '@mui/material'
import { AnimateStep } from '../../index'
import { useIsSMDown } from 'themes/useTheme'
import { useEffect, useMemo, useState } from 'react'
import P1Img from 'assets/imgs/nftLottery/p1.png'
import P2Img from 'assets/imgs/nftLottery/p2.png'
import P3Img from 'assets/imgs/nftLottery/p3.png'
import P4Img from 'assets/imgs/nftLottery/p4.png'
import P5Img from 'assets/imgs/nftLottery/p5.png'
import Bg1Svg from 'assets/imgs/nftLottery/bg1.svg'
import Bg2Svg from 'assets/imgs/nftLottery/bg2.svg'
import Image from 'components/Image'
const BannerStep1 = ({ ratio, step }: { ratio: string; step: AnimateStep }) => {
  const isSm = useIsSMDown()
  const [winW, setWinW] = useState(0)
  const [winH, setWinH] = useState(0)
  const [xOffset, setXOffset] = useState<number>(0)
  const [yOffset, setYOffset] = useState<number>(0)
  const styleConfig = useMemo(() => {
    const styleObj = {
      p1: {
        transition: 'all 0s',
        transform: 'translate3D(0, 100vh, 0)'
      },
      p2: {
        transition: 'all 0s',
        transform: 'translate3D(0, 100vh, 0)'
      },
      p3: {
        transition: 'all 0s',
        transform: 'translate3D(0, 100vh, 0)'
      },
      p4: {
        transition: 'all 0s',
        transform: 'translate3D(0, 100vh, 0)'
      },
      img1: {
        transition: 'all 0s',
        transform: 'translate3D(-275px, 100vh, 0)'
      },
      img2: {
        transition: 'all 0s',
        transform: 'translate3D(-106px, -100vh, 0)'
      },
      img3: {
        transition: 'all 0s',
        transform: 'translate3D(-100vw, -50%, 0)'
      },
      img4: {
        transition: 'all 0s',
        transform: 'translate3D(100vw, -50%, 0)'
      },
      img5: {
        transition: 'all 0s',
        transform: 'translate3D(302px, 100vh, 0)'
      },
      bg1: {
        transition: 'all 0s',
        transform: 'translate3D(-445px, 100vh, 0)'
      },
      bg2: {
        transition: 'all 0s',
        transform: 'translate3D(-235px, 100vh, 0)'
      }
    }
    switch (step) {
      case AnimateStep.default:
        return styleObj
      case AnimateStep.enter:
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
            transform: `translate3D(calc(-275px + ${xOffset}px), calc(200px + ${yOffset}px), 0)`
          },
          img2: {
            transition: 'all 0.3s',
            transform: `translate3D(calc(-106px + ${xOffset}px), calc(-582px + ${yOffset}px), 0)`
          },
          img3: {
            transition: 'all 0.3s',
            transform: `translate3D(calc(-544px + ${xOffset}px), calc(-50% + ${yOffset}px), 0)`
          },
          img4: {
            transition: 'all 0.3s',
            transform: `translate3D(calc(544px + ${xOffset}px), calc(-50% + ${yOffset}px), 0)`
          },
          img5: {
            transition: 'all 0.3s',
            transform: `translate3D(calc(302px + ${xOffset}px), calc(150px + ${yOffset}px), 0)`
          },
          bg1: {
            transition: 'all 0.6s',
            transform: 'translate3D(-445px, 0, 0)'
          },
          bg2: {
            transition: 'all 0.6s',
            transform: 'translate3D(-235px, 0, 0)'
          }
        }
      case AnimateStep.leave:
        return {
          p1: {
            transition: 'all 0.6s',
            transform: `translate3D(0, calc(-250px - ${2000 * Number(ratio)}px), 0)`
          },
          p2: {
            transition: 'all 0.6s',
            transform: `translate3D(0, calc(-250px - ${2000 * Number(ratio)}px), 0)`
          },
          p3: {
            transition: 'all 0.6s',
            transform: `translate3D(0, calc(-90px - ${2000 * Number(ratio)}px), 0)`
          },
          p4: {
            transition: 'all 0.6s',
            transform: `translate3D(0, calc(130px - ${2000 * Number(ratio)}px), 0)`
          },
          img1: {
            transition: 'all 0.6s',
            transform: `translate3D(calc(-275px + ${xOffset}px), calc(200px - ${2000 * Number(ratio)}px), 0)`
          },
          img2: {
            transition: 'all 0.6s',
            transform: `translate3D(calc(-106px + ${xOffset}px), calc(-582px - ${2000 * Number(ratio)}px), 0)`
          },
          img3: {
            transition: 'all 0.6s',
            transform: `translate3D(calc(-544px + ${xOffset}px - ${100 * Number(ratio)}vw), -50%, 0)`
          },
          img4: {
            transition: 'all 0.6s',
            transform: `translate3D(calc(544px + ${xOffset}px + ${100 * Number(ratio)}vw), -50%, 0)`
          },
          img5: {
            transition: 'all 0.6s',
            transform: `translate3D(calc(302px + ${xOffset}px), calc(150px - ${2000 * Number(ratio)}px), 0)`
          },
          bg1: {
            transition: 'all 0.6s',
            transform: `translate3D(-445px, -${2000 * Number(ratio)}px, 0)`
          },
          bg2: {
            transition: 'all 0.6s',
            transform: `translate3D(-235px, -${2000 * Number(ratio)}px, 0)`
          }
        }
      default:
        return styleObj
    }
  }, [step, xOffset, yOffset, ratio])
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
        width: '100%',
        height: '100vh'
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
      <Typography
        sx={{
          width: '100%',
          position: 'fixed',
          top: '50%',
          left: '0',
          color: '#C3A16D',
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
          position: 'fixed',
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
          position: 'fixed',
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
          position: 'fixed',
          top: '50%',
          left: '0',
          color: '#C3A16D',
          fontSize: isSm ? 16 : 18,
          fontWeight: 700,
          textAlign: 'center',
          zIndex: '1',
          ...styleConfig.p4
        }}
      >
        ETHEREUM
      </Typography>
      <Image
        style={{
          position: 'fixed',
          top: '50%',
          width: 184,
          height: 237,
          right: '50%',
          ...styleConfig.img1
        }}
        src={P1Img}
        alt=""
      />
      <Image
        style={{
          position: 'fixed',
          top: '50%',
          width: 424,
          height: 251,
          left: '50%',
          ...styleConfig.img2
        }}
        src={P2Img}
        alt=""
      />
      <Image
        style={{
          position: 'fixed',
          top: '50%',
          width: 190,
          height: 287,
          right: '50%',
          ...styleConfig.img3
        }}
        src={P3Img}
        alt=""
      />
      <Image
        style={{
          position: 'fixed',
          top: '50%',
          width: 188,
          height: 165,
          left: '50%',
          ...styleConfig.img4
        }}
        src={P4Img}
        alt=""
      />
      <Image
        style={{
          position: 'fixed',
          top: '50%',
          width: 306,
          height: 203,
          left: '50%',
          ...styleConfig.img5
        }}
        src={P5Img}
        alt=""
      />
    </Box>
  )
}
export default BannerStep1
