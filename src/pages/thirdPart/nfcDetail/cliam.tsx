import { Box, Typography } from '@mui/material'
import { useIsMDDown } from 'themes/useTheme'
import A1 from 'assets/imgs/thirdPart/nfcDetail/a1.png'
import { useEffect, useState } from 'react'
import classnames from 'classnames'
enum AnimateStep {
  'default' = 0,
  'lineDown' = 1,
  'imgUp' = 2,
  'black' = 3,
  'blockClose' = 4,
  'done' = 5
}
const AnimationBlock = ({ animateStep }: { animateStep: AnimateStep }) => {
  const isMd = useIsMDDown()
  return (
    <Box
      className={classnames(
        { animation1: animateStep >= AnimateStep.lineDown },
        { animation2: animateStep >= AnimateStep.imgUp },
        { animation3: animateStep >= AnimateStep.black },
        { animation4: animateStep >= AnimateStep.blockClose }
      )}
      sx={{
        position: 'fixed',
        top: 0,
        left: '50%',
        transform: 'translate3D(-50%, 0, 0)',
        width: isMd ? '100%' : '360px',
        height: '100vh',
        zIndex: 999999999,
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#121212',
        '.lineBox': {
          flex: 1,
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          '.line': {
            width: '1px',
            height: 0,
            background: 'rgba(255, 255, 255, 0.80)'
          }
        },
        '.imgBox': {
          width: '100%',
          height: 0,
          overflow: 'hidden',
          '.imgEl': {
            display: 'block',
            width: '100%',
            height: '100vh',
            objectFit: 'cover',
            transform: 'scale(4)'
          },
          '.borderEl': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            border: '0px solid #121212',
            boxSizing: 'border-box',
            background: 'transparent'
          }
        },
        '&.animation1': {
          '.line': {
            transition: 'height 1.6s',
            height: '100vh'
          }
        },
        '&.animation2': {
          '.line': {
            transition: 'height 1.6s',
            height: '0'
          },
          '.imgBox': {
            transition: 'all 1.6s',
            height: '100vh',
            '.imgEl': {
              transition: 'all 1.6s',
              transform: 'scale(1) translate3D(0, 0, 0)'
            }
          },
          '.borderEl': {
            transition: 'all 1.6s',
            border: '0 solid #121212'
          }
        },
        '&.animation3': {
          '.borderEl': {
            transition: 'all 1.6s',
            borderLeft: `${window.innerWidth / 2 - 60}px solid #121212`,
            borderRight: `${window.innerWidth / 2 - 60}px solid #121212`,
            borderTop: `${window.innerHeight / 2 - 60}px solid #121212`,
            borderBottom: `${window.innerHeight / 2 - 60}px solid #121212`
          },
          '.imgEl': {
            transition: 'all 1.6s',
            transform: 'scale(1) translate3D(0, 50px, 0) !important'
          }
        },
        '&.animation4': {
          '.borderEl': {
            transition: 'all 1s',
            borderLeft: `${window.innerWidth / 2}px solid #121212`,
            borderRight: `${window.innerWidth / 2}px solid #121212`,
            borderTop: `${window.innerHeight / 2}px solid #121212`,
            borderBottom: `${window.innerHeight / 2}px solid #121212`
          },
          '.imgEl': {
            transform: 'scale(1) translate3D(0, 50px, 0) !important'
          }
        }
      }}
    >
      <Box className={'lineBox'}>
        <Box className={'line'}></Box>
      </Box>
      <Box className={'imgBox'}>
        <img className={'imgEl'} src={A1} alt="" srcSet="" />
        <Box className={'borderEl'}></Box>
      </Box>
    </Box>
  )
}
const ClaimDetail = () => {
  return (
    <>
      <Box
        sx={{
          width: '100%',
          minHeight: '100vh',
          padding: '88px 0 63px',
          display: 'flex',
          flexFlow: 'column nowrap',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Typography
          sx={{
            width: '100%',
            color: '#FFF',
            fontFamily: `'Public Sans'`,
            fontSize: '16px',
            fontWeight: 600,
            lineHeight: '22px',
            textAlign: 'center',
            marginBottom: '12px'
          }}
        >
          CLAIM
        </Typography>
        <Typography
          sx={{
            color: '#FFF',
            leadingTrim: 'both',
            textEdge: 'cap',
            fontVariantNumeric: 'lining-nums proportional-nums',
            fontFamily: `'Public Sans'`,
            fontSize: '160px',
            fontWeight: 500,
            lineHeight: '116px',
            textTransform: 'uppercase',
            textAlign: 'center'
          }}
        >
          NFT
        </Typography>
      </Box>
    </>
  )
}
const NfcDetail = () => {
  const isMd = useIsMDDown()
  const [animateStep, setAnimateStep] = useState<AnimateStep>(AnimateStep.default)
  useEffect(() => {
    setAnimateStep(AnimateStep.lineDown)
    setTimeout(() => {
      setAnimateStep(AnimateStep.imgUp)
    }, 1600)
    setTimeout(() => {
      setAnimateStep(AnimateStep.black)
    }, 3200)
    setTimeout(() => {
      setAnimateStep(AnimateStep.blockClose)
    }, 5000)
    setTimeout(() => {
      setAnimateStep(AnimateStep.done)
    }, 6000)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Box
      sx={{
        width: '100%',
        minHeight: '100vh',
        maxWidth: isMd ? '100vw' : '360px',
        margin: '0 auto',
        background: '#000',
        padding: '0 16px 0',
        boxSizing: 'border-box'
      }}
    >
      {animateStep !== AnimateStep.done && <AnimationBlock animateStep={animateStep} />}
      {animateStep === AnimateStep.done && <ClaimDetail />}
    </Box>
  )
}
export default NfcDetail
