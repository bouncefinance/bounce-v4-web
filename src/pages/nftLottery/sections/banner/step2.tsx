import { Box, Typography } from '@mui/material'
import { AnimateStep } from '../../index'
import { useIsSMDown } from 'themes/useTheme'
import { useMemo } from 'react'
import P1Img from 'assets/imgs/nftLottery/p1.png'
import P2Img from 'assets/imgs/nftLottery/p2.png'
import Image from 'components/Image'

const BannerStep2 = ({ ratio, step }: { ratio: string; step: AnimateStep }) => {
  const isSm = useIsSMDown()
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
        transform: 'translate3D(-100vw, -50%, 0)'
      },
      img2: {
        transition: 'all 0s',
        transform: 'translate3D(100vw, -50%, 0)'
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
            transition: 'all 0.6s',
            transform: 'translate3D(-275px, -50%, 0)'
          },
          img2: {
            transition: 'all 0.6s',
            transform: 'translate3D(275px, -50%, 0)'
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
            transform: `translate3D(calc(-275px - ${2000 * Number(ratio)}px), -50%, 0)`
          },
          img2: {
            transition: 'all 0.6s',
            transform: `translate3D(calc(275px - ${2000 * Number(ratio)}px), -50%, 0)`
          }
        }
      default:
        return styleObj
    }
  }, [step, ratio])
  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh'
      }}
    >
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
        START FROM
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
        DEC 19
      </Typography>
      <Typography
        sx={{
          width: '100%',
          maxwidth: 800,
          position: 'fixed',
          top: '50%',
          left: '50%',
          color: '#4C483A',
          fontSize: isSm ? 14 : 20,
          fontWeight: 400,
          textAlign: 'center',
          zIndex: '1',
          ...styleConfig.p3
        }}
        variant="lotteryh1"
      >
        Token auctions can be conducted on various blockchain platforms, such as Ethereum, which provides a secure and
        transparent environment for the auction process. The use of blockchain technology also allows for the automatic
        execution of the auction rules and the issuance of tokens to the winning bidders.
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
          top: '0',
          width: 424,
          height: 251,
          left: '50%',
          ...styleConfig.img2
        }}
        src={P2Img}
        alt=""
      />
    </Box>
  )
}
export default BannerStep2
