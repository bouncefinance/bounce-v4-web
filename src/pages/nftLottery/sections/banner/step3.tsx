import { Box, Stack, Typography, styled } from '@mui/material'
import { AnimateStep } from './index'
import { useIsSMDown } from 'themes/useTheme'
import { useMemo } from 'react'
import CardImg from 'assets/imgs/nftLottery/banner/card.png'
import QrcodeImg from 'assets/imgs/nftLottery/banner/qrcode.png'
import { ReactComponent as XSvg } from 'assets/imgs/nftLottery/banner/x.svg'
import Image from 'components/Image'

const CardItem = styled(Box)(() => ({
  position: 'relative',
  borderRadius: '19.2px',
  background: '#0F0F0F',
  width: 266,
  height: 409,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '14px 9px',
  cursor: 'pointer',
  overflow: 'hidden'
}))
const BannerStep3 = ({ ratio, step }: { ratio: string; step: AnimateStep }) => {
  const isSm = useIsSMDown()
  const MainCard = ({ sx }: { sx: React.CSSProperties }) => {
    return (
      <CardItem
        sx={{
          ...sx
        }}
      >
        <Stack
          justifyContent={'center'}
          alignItems={'center'}
          sx={{
            width: '100%',
            height: '100%',
            borderRadius: '19.2px',
            border: `0.8px solid  rgba(195, 161, 109, 0.50)`
          }}
          gap={'10px'}
        >
          <Typography
            sx={{
              color: '#C3A16D',
              textAlign: 'center',
              fontVariantNumeric: `lining-nums proportional-nums`,
              fontSize: isSm ? 16 : '19.2px',
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
              fontSize: isSm ? 16 : '19.2px',
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
              bottom: 30,
              width: '100%'
            }}
            direction={'row'}
            gap={'5px'}
            justifyContent={'center'}
            alignItems={'center'}
          >
            <Typography
              variant="lotteryh1"
              sx={{
                color: 'rgba(255, 255, 255, 0.70)',
                fontSize: 14
              }}
            >
              AI
            </Typography>
            <XSvg />
            <Typography
              variant="lotteryh1"
              sx={{
                color: 'rgba(255, 255, 255, 0.70)',
                fontSize: 14
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
            borderRadius: '19.2px',
            objectFit: 'cover'
          }}
        />
      </CardItem>
    )
  }
  const styleConfig = useMemo(() => {
    const styleObj = {
      card1: {
        transition: 'all 0s',
        transform: 'translate3D(-50%, 0, 0)'
      },
      card2: {
        transition: 'all 0s',
        transform: 'translate3D(-50%, 0, 0)'
      },
      card3: {
        transition: 'all 0s',
        transform: 'translate3D(-50%, 0, 0)'
      },
      card4: {
        transition: 'all 0s',
        transform: 'translate3D(50%, 0, 0)'
      },
      card5: {
        transition: 'all 0s',
        transform: 'translate3D(50%, 0, 0)'
      },
      common: {
        transition: 'all 0s',
        transform: 'translate3D(0, 100vh, 0)'
      },
      t1: {
        transition: 'all 0s',
        transform: 'translate3D(-100vw, -50%, 0)'
      },
      t2: {
        transition: 'all 0s',
        transform: 'translate3D(100vw, -50%, 0)'
      },
      t3: {
        transition: 'all 0s',
        transform: 'translate3D(-50%, 100vh, 0)'
      }
    }
    switch (step) {
      case AnimateStep.default:
        return styleObj
      case AnimateStep.enter:
        return {
          normal: {
            transition: 'all 0.6s',
            transform: `translate3D(-50%, -50%, 0)`
          },
          card1: {
            transition: 'all 0.6s',
            transform: `translate3D(-50%, -50%, 0)`
          },
          card2: {
            transition: 'all 0.6s',
            transform: `translate3D(-50%, -50%, 0)`
          },
          card3: {
            transition: 'all 0.6s',
            transform: `translate3D(-50%, -50%, 0)`
          },
          card4: {
            transition: 'all 0.6s',
            transform: `translate3D(50%, -50%, 0)`
          },
          card5: {
            transition: 'all 0.6s',
            transform: `translate3D(50%, -50%, 0)`
          },
          common: {
            transition: 'all 0.6s',
            transform: 'translate3D(0, 0, 0)'
          },
          t1: {
            transition: 'all 0.6s',
            transform: 'translate3D(-433px, -50%, 0)'
          },
          t2: {
            transition: 'all 0.6s',
            transform: 'translate3D(433px, -50%, 0)'
          },
          t3: {
            transition: 'all 0.6s',
            transform: 'translate3D(-50%, calc(-50% + 380px), 0)'
          }
        }
      case AnimateStep.moving:
        return {
          card1: {
            transition: 'all 0.6s',
            transform: `translate3D(-50%, -50%, 0)`
          },
          card2: {
            transition: 'all 0.6s',
            transformOrigin: 'center bottom',
            transform: `translate3D(calc(-50% + ${50 * Number(ratio)}px), calc(-50% + ${
              15 * Number(ratio)
            }px), 0) rotateZ(calc(${20 * Number(ratio)}deg))`
          },
          card3: {
            transition: 'all 0.6s',
            transformOrigin: 'center bottom',
            transform: `translate3D(calc(-50% + ${75 * Number(ratio)}px), calc(-50% + ${
              35 * Number(ratio)
            }px), 0) rotateZ(calc(${25 * Number(ratio)}deg))`
          },
          card4: {
            transition: 'all 0.6s',
            transformOrigin: 'center bottom',
            transform: `translate3D(calc(50% - ${50 * Number(ratio)}px), calc(-50% + ${
              15 * Number(ratio)
            }px), 0) rotateZ(calc(-${20 * Number(ratio)}deg))`
          },
          card5: {
            transition: 'all 0.6s',
            transformOrigin: 'center bottom',
            transform: `translate3D(calc(50% - ${75 * Number(ratio)}px), calc(-50% + ${
              35 * Number(ratio)
            }px), 0) rotateZ(calc(-${25 * Number(ratio)}deg))`
          },
          common: {
            transition: 'all 0.6s',
            transform: `translate3D(0, 0, 0)`
          },
          t1: {
            transition: 'all 0.6s',
            transform: 'translate3D(-433px, -50%, 0)'
          },
          t2: {
            transition: 'all 0.6s',
            transform: 'translate3D(433px, -50%, 0)'
          },
          t3: {
            transition: 'all 0.6s',
            transform: 'translate3D(-50%, calc(-50% + 380px), 0)'
          }
        }
      case AnimateStep.leave:
        return {
          card1: {
            transition: 'all 0.6s',
            transform: `translate3D(-50%, calc(-50%), 0)`
          },
          card2: {
            transition: 'all 0.6s',
            transformOrigin: 'center bottom',
            transform: `translate3D(calc(-50% + 50px), calc(-50% + 15px), 0) rotateZ(20deg)`
          },
          card3: {
            transition: 'all 0.6s',
            transformOrigin: 'center bottom',
            transform: `translate3D(calc(-50% + 75px), calc(-50% + 25px), 0) rotateZ(25deg)`
          },
          card4: {
            transition: 'all 0.6s',
            transformOrigin: 'center bottom',
            transform: `translate3D(calc(50% - 50px), calc(-50% + 15px), 0) rotateZ(-20deg)`
          },
          card5: {
            transition: 'all 0.6s',
            transformOrigin: 'center bottom',
            transform: `translate3D(calc(50% - 75px), calc(-50% + 35px), 0) rotateZ(-25deg)`
          },
          common: {
            transition: 'all 0.3s',
            transform: `translate3D(0, calc(-${100 * Number(ratio)}vh), 0)`
          },
          t1: {
            transition: 'all 0.6s',
            transform: 'translate3D(-433px, -50%, 0)'
          },
          t2: {
            transition: 'all 0.6s',
            transform: 'translate3D(433px, -50%, 0)'
          },
          t3: {
            transition: 'all 0.6s',
            transform: 'translate3D(-50%, calc(-50% + 380px), 0)'
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
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: 383,
            height: 383,
            borderRadius: '50%',
            border: '1px solid #000',
            transform: `translate3D(-50%, calc(-50% - 100px), 0)`
          }}
        ></Box>
        <Box
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: 91,
            height: 44,
            borderRadius: '7px',
            transform: 'translate3D(-50%, calc(-50% - 287px), 0)',
            background: '#fff',
            lineHeight: '44px',
            textAlign: 'center',
            fontSize: 20,
            fontFamily: `'Inter'`,
            cursor: 'pointer'
          }}
        >
          multibit
        </Box>
        <Typography
          variant="lotteryh1"
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate3D(calc(-50% - 200px), calc(-50% - 287px), 0)',
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
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate3D(calc(-50% + 200px), calc(-50% - 287px), 0)',
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
            position: 'fixed',
            top: '50%',
            right: '50%',
            lineHeight: '44px',
            textAlign: 'center',
            fontSize: 32,
            fontWeight: 700,
            cursor: 'pointer',
            color: '#8B6D3F',
            ...styleConfig.t1
          }}
        >
          COMING SOON
        </Typography>
        <Typography
          variant="lotteryh1"
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            lineHeight: '44px',
            textAlign: 'center',
            fontSize: 32,
            fontWeight: 700,
            cursor: 'pointer',
            color: '#8B6D3F',
            ...styleConfig.t2
          }}
        >
          COMING SOON
        </Typography>
        <Typography
          variant="lotteryh1"
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            lineHeight: '44px',
            textAlign: 'center',
            fontSize: 32,
            fontWeight: 700,
            cursor: 'pointer',
            color: '#8B6D3F',
            ...styleConfig.t3
          }}
        >
          COMING SOON
        </Typography>
        <Image
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            width: 205,
            transform: 'translate3D(-50%, calc(-50% + 320px), 0)'
          }}
          src={QrcodeImg}
        />
        <MainCard
          sx={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            zIndex: '3',
            ...styleConfig.card1
          }}
        />
        <SubCard
          sx={{
            position: 'fixed',
            top: '51%',
            left: '51%',
            zIndex: '2',
            ...styleConfig.card2
          }}
        />
        <SubCard
          sx={{
            position: 'fixed',
            top: '52%',
            left: '52%',
            zIndex: '1',
            ...styleConfig.card3
          }}
        />
        <SubCard
          sx={{
            position: 'fixed',
            top: '51%',
            right: '51%',
            zIndex: '2',
            ...styleConfig.card4
          }}
        />
        <SubCard
          sx={{
            position: 'fixed',
            top: '52%',
            right: '52%',
            zIndex: '1',
            ...styleConfig.card5
          }}
        />
      </Box>
    </Box>
  )
}
export default BannerStep3
