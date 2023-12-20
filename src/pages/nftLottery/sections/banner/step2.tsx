import { Box, Stack, Typography } from '@mui/material'
import { useIsSMDown } from 'themes/useTheme'
import { useMemo } from 'react'
import P1Img from 'assets/imgs/nftLottery/p7.png'
import P2Img from 'assets/imgs/nftLottery/p6.png'
import Image from 'components/Image'
import { AnimateStep } from './index'

const BannerStep2 = ({ ratio, step }: { ratio: string; step: AnimateStep }) => {
  const isSm = useIsSMDown()
  const styleConfig = useMemo(() => {
    const styleObj = {
      p1: {
        transition: 'all 0s',
        transform: 'translate3D(0, 0, 0)'
      },
      p2: {
        transition: 'all 0s',
        transform: 'translate3D(0, 0, 0)'
      },
      p3: {
        transition: 'all 0s',
        transform: 'translate3D(-50%, 0, 0)'
      },
      img1: {
        transition: 'all 0s',
        transform: 'translate3D(-100vw, -50%, 0)'
      },
      img2: {
        transition: 'all 0s',
        transform: 'translate3D(100vw, -50%, 0)'
      },
      common: {
        transition: 'all 0.6s',
        transform: 'translate3D(0, 100vh, 0)'
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
            transform: 'translate3D(-50%, -20px, 0)'
          },
          img1: {
            transition: 'all 0.6s',
            transform: 'translate3D(-631px, -50%, 0)'
          },
          img2: {
            transition: 'all 0.6s',
            transform: 'translate3D(558px, -50%, 0)'
          },
          common: {
            transition: 'all 0.6s',
            transform: 'translate3D(0, 0, 0)'
          }
        }
      case AnimateStep.leave:
        return {
          p1: {
            transition: 'all 1.2s',
            transform: `translate3D(0, calc(-250px), 0)`
          },
          p2: {
            transition: 'all 1.2s',
            transform: `translate3D(0, calc(-250px), 0)`
          },
          p3: {
            transition: 'all 1.2s',
            transform: `translate3D(-50%, calc(-20px), 0)`
          },
          img1: {
            transition: 'all 1.2s',
            transform: `translate3D(calc(-631px - ${100 * Number(ratio)}vh), -50%, 0)`
          },
          img2: {
            transition: 'all 1.2s',
            transform: `translate3D(calc(558px + ${100 * Number(ratio)}vh), -50%, 0)`
          },
          common: {
            transition: 'all 0.6s',
            transform: 'translate3D(0, -100vh, 0)'
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
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          ...styleConfig.common
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
        <Stack
          justifyContent={'center'}
          alignItems={'center'}
          direction={'row'}
          sx={{
            width: '100%',
            position: 'fixed',
            top: '50%',
            left: '0',
            zIndex: '1',
            ...styleConfig.p2
          }}
        >
          <Typography
            variant="lotteryh1"
            sx={{
              display: 'inline-block',
              color: '#C3A16D',
              fontSize: isSm ? 100 : 200,
              fontWeight: 500,
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
            position: 'fixed',
            top: '50%',
            left: '50%',
            wordBreak: 'break-all',
            color: '#4C483A',
            fontSize: isSm ? 14 : 20,
            fontWeight: 400,
            textAlign: 'center',
            fontFamily: `'Inter'`,
            zIndex: '1',
            ...styleConfig.p3
          }}
        >
          Token auctions can be conducted on various blockchain platforms, such as Ethereum, which provides a secure and
          transparent environment for the auction process. The use of blockchain technology also allows for the
          automatic execution of the auction rules and the issuance of tokens to the winning bidders.
        </Typography>
      </Box>
      <Image
        style={{
          position: 'fixed',
          top: '50%',
          width: 173,
          height: 142,
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
          width: 177,
          height: 117,
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
