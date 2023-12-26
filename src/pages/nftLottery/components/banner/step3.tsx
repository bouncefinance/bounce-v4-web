import { Box, Stack, Typography, styled } from '@mui/material'
import { useIsSMDown } from 'themes/useTheme'
import { useEffect, useMemo, useState } from 'react'
import CardImg from 'assets/imgs/nftLottery/banner/card.png'
import CardRealImg from 'assets/imgs/nftLottery/banner/card-real.png'
import QrcodeImg from 'assets/imgs/nftLottery/banner/qrcode.png'
import { ReactComponent as XSvg } from 'assets/imgs/nftLottery/banner/x.svg'
import Image from 'components/Image'
import { useInView } from 'react-intersection-observer'
import classNames from 'classnames'

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
const CardBlock = styled(Box)(() => ({
  position: 'relative',
  width: '100%',
  height: '945px',
  '.cardItemRight': {
    transform: `translate3D(-50%, -50%, 0)`,
    transformOrigin: 'center bottom',
    animationTimingFunction: 'ease-in-out'
  },
  '.cardItemLeft': {
    transform: `translate3D(50%, -50%, 0)`,
    transformOrigin: 'center bottom',
    animationTimingFunction: 'ease-in-out'
  },
  '.cardItem2': {
    animation: `cardItem2animation 1s linear 0s forwards`
  },

  '.cardItem3': {
    animation: `cardItem3animation 1s linear 0s forwards`
  },
  '.cardItem4': {
    animation: `cardItem4animation 1s linear 0s forwards`
  },
  '.cardItem5': {
    animation: `cardItem5animation 1s linear 0s forwards`
  },
  '@keyframes cardItem2animation': {
    '0%': {
      transform: `translate3D(calc(-50% ), calc(-50%), 0) rotateZ(0deg)`
    },
    '100%': {
      transform: `translate3D(calc(-50% + 50px), calc(-50% + 15px), 0) rotateZ(20deg)`
    }
  },
  '@keyframes cardItem3animation': {
    '0%': {
      transform: `translate3D(calc(-50% ), calc(-50%), 0) rotateZ(0deg)`
    },
    '100%': {
      transform: `translate3D(calc(-50% + 75px), calc(-50% + 25px), 0) rotateZ(25deg)`
    }
  },
  '@keyframes cardItem4animation': {
    '0%': {
      transform: `translate3D(50%, -50%, 0) rotateZ(0deg)`
    },
    '100%': {
      transform: `translate3D(calc(50% - 50px), calc(-50% + 15px), 0) rotateZ(-20deg)`
    }
  },
  '@keyframes cardItem5animation': {
    '0%': {
      transform: `translate3D(50%, -50%, 0) rotateZ(0deg)`
    },
    '100%': {
      transform: `translate3D(calc(50% - 75px), calc(-50% + 35px), 0) rotateZ(-25deg)`
    }
  }
}))
const BannerStep3 = () => {
  const isSm = useIsSMDown()
  const [onceAnimate, setOnceAnimate] = useState(false)
  const { ref, inView } = useInView({
    rootMargin: '-40% 0% -15% 0%',
    triggerOnce: true,
    delay: 250
  })
  useEffect(() => {
    if (inView && !onceAnimate) {
      console.log('!! 进入')
      setOnceAnimate(true)
    }
    return () => {}
  }, [inView, onceAnimate])
  const MainCard = ({ sx, className }: { sx: React.CSSProperties; className?: string }) => {
    return (
      <CardItem
        sx={{
          transition: 'all 3s',
          ...sx
        }}
        className={className}
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
            UNREVEALED{onceAnimate ? '111' : '222'}
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
  const SubCard = ({ sx, className, src }: { sx: React.CSSProperties; className?: string; src: string }) => {
    return (
      <CardItem
        sx={{
          ...sx
        }}
        className={className}
      >
        <Image
          src={src}
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
    if (inView) {
      return {
        common: {
          opacity: '1',
          transition: 'all 0.3s',
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
    } else {
      return {
        common: {
          transition: 'all 0s',
          opacity: '0',
          transform: 'translate3D(0, 50px, 0)'
        },
        t1: {
          transition: 'all 0s',
          transform: 'translate3D(-433px, calc(-50% + 50px), 0)'
        },
        t2: {
          transition: 'all 0s',
          transform: 'translate3D(433px, calc(-50% + 50px), 0)'
        },
        t3: {
          transition: 'all 0s',
          transform: 'translate3D(-50%, calc(-50% + 430px), 0)'
        }
      }
    }
  }, [inView])
  return (
    <CardBlock
      sx={{
        position: 'relative',
        width: '100%',
        height: '945px'
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: '100%',
          ...styleConfig.common
        }}
      >
        <Box
          sx={{
            position: 'absolute',
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
            position: 'absolute',
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
            position: 'absolute',
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
            position: 'absolute',
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
          ref={ref}
          variant="lotteryh1"
          sx={{
            position: 'absolute',
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
            position: 'absolute',
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
            position: 'absolute',
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
            position: 'absolute',
            top: '50%',
            left: '50%',
            width: 205,
            transform: 'translate3D(-50%, calc(-50% + 320px), 0)'
          }}
          src={QrcodeImg}
        />
      </Box>
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%'
        }}
      >
        <MainCard
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            zIndex: '3',
            transition: 'all 3s'
          }}
          className={'cardItemRight'}
        />
        <SubCard
          src={CardRealImg}
          key={'subcard' + 0}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            zIndex: '2'
          }}
          className={classNames({ cardItemRight: true, cardItem2: onceAnimate })}
        />
        <SubCard
          src={CardRealImg}
          key={'subcard' + 1}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            zIndex: '1'
          }}
          className={classNames({ cardItemRight: true, cardItem3: onceAnimate })}
        />
        <SubCard
          src={CardImg}
          key={'subcard' + 2}
          sx={{
            position: 'absolute',
            top: '50%',
            right: '50%',
            zIndex: '2'
          }}
          className={classNames({ cardItemLeft: true, cardItem4: onceAnimate })}
        />
        <SubCard
          src={CardImg}
          key={'subcard' + 3}
          sx={{
            position: 'absolute',
            top: '50%',
            right: '50%',
            zIndex: '1'
          }}
          className={classNames({ cardItemLeft: true, cardItem5: onceAnimate })}
        />
      </Box>
    </CardBlock>
  )
}
export default BannerStep3
