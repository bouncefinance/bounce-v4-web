import React from 'react'
import { Box, useTheme } from '@mui/material'
import OneMobile from '../components/oneMobile'
import Four from '../components/four'
import VideoSection from '../components/video'
import MobileBgImg from 'components/Fundo/assets/img/mobile/bannerBg.png'
import Footer from '../components/footer'
import { useEffect, useState } from 'react'
import Necklace from '../components/pcAnimation/necklace'
import { BigNumber } from 'bignumber.js'
import ThreeCard from '../components/mobileAnimation/threeCard'
import TextAniamte from '../components/textAnimate'
import LeftBar from 'components/Fundo/LeftBar'
import { AnimateStep } from '../components/pcAnimation/threeCard'
const MobileHome: React.FC = () => {
  const _AnimateHeight1 = 1000
  const theme = useTheme()
  const [stopScroll, setStopscroll] = useState(true)
  // 1. necklack
  const [animate1Ratio, setAnimate1Ratio] = useState<string>('0')
  const [animate1Show, setAnimate1Show] = useState<boolean>(true)
  // necklace only run animation once when page loaded
  const [onceAnimation, setOnceAnimation] = useState<boolean>(false)
  // 2.product info
  const [animate2Ratio, setanimate2Ratio] = useState<string>('0')
  const [animate2Step, setanimate2Step] = useState<AnimateStep>(0)
  // 2.1 text
  const [animate2_1Ratio, setanimate2_1Ratio] = useState<string>('0')
  const [animate2_1Step, setanimate2_1Step] = useState<AnimateStep>(0)
  const [winH, setWinHeight] = useState<number>(window.innerHeight)
  const resizeWinH = () => {
    setWinHeight(window.innerHeight)
  }
  useEffect(() => {
    setTimeout(() => {
      setStopscroll(false)
      setOnceAnimation(true)
    }, 3000)
    window.addEventListener('resize', resizeWinH)
    return () => {
      window.removeEventListener('resize', resizeWinH)
    }
  }, [])
  useEffect(() => {
    const getScrollCount = (event: { target: any }) => {
      console.log('event.target.scrollTop>>>', event.target.scrollTop)
      // 1. necklack down and scale
      const animate1Range = [0, _AnimateHeight1 + winH]
      // 2 three card enter
      const animate2Range = [_AnimateHeight1, _AnimateHeight1 + winH]
      // 2.1 text enter left
      const animate2_1range = [_AnimateHeight1 + winH / 2, _AnimateHeight1 + winH]
      // 2.2 text leave up
      const animate2_2range = [_AnimateHeight1 + winH, _AnimateHeight1 + winH + 800]
      // 3 three card leave
      const animate3Range = [_AnimateHeight1 + winH + 800, _AnimateHeight1 + winH + 1800]
      // 1. necklack down and scale
      if (animate1Range[0] <= event.target.scrollTop && event.target.scrollTop <= animate1Range[1]) {
        setAnimate1Ratio(BigNumber(event.target.scrollTop).div(animate1Range[1]).toFixed(2))
        setAnimate1Show(true)
      } else {
        setAnimate1Show(false)
      }
      if (animate2Range[0] <= event.target.scrollTop && event.target.scrollTop <= animate2Range[1]) {
        setanimate2Ratio(
          BigNumber(event.target.scrollTop - animate2Range[0])
            .div(animate2Range[1] - animate2Range[0])
            .toFixed(2)
        )
        setanimate2Step(AnimateStep.enter)
      } else if (event.target.scrollTop > animate3Range[0]) {
        setanimate2Ratio('1')
        setanimate2Step(AnimateStep.notShow)
      } else if (event.target.scrollTop > animate2Range[1]) {
        setanimate2Ratio('1')
        setanimate2Step(AnimateStep.enter)
      }
      event.target.scrollTop <= animate2Range[0] && setanimate2Step(AnimateStep.notShow)
      if (animate3Range[0] <= event.target.scrollTop && event.target.scrollTop <= animate3Range[1]) {
        setanimate2Ratio(
          BigNumber(event.target.scrollTop - animate3Range[0])
            .div(animate3Range[1] - animate3Range[0])
            .toFixed(2)
        )
        setanimate2Step(AnimateStep.leave)
      }
      event.target.scrollTop > animate3Range[1] && setanimate2Step(AnimateStep.notShow)
      if (animate2_1range[0] <= event.target.scrollTop && event.target.scrollTop <= animate2_1range[1]) {
        setanimate2_1Ratio(
          BigNumber(event.target.scrollTop - animate2_1range[0])
            .div(animate2_1range[1] - animate2_1range[0])
            .toFixed(2)
        )
        setanimate2_1Step(AnimateStep.enter)
      }
      animate2_1range[0] >= event.target.scrollTop && setanimate2_1Step(AnimateStep.notShow)
      if (animate2_2range[0] <= event.target.scrollTop && event.target.scrollTop <= animate2_2range[1]) {
        setanimate2_1Ratio(
          BigNumber(event.target.scrollTop - animate2_2range[0])
            .div(animate2_2range[1] - animate2_2range[0])
            .toFixed(2)
        )
        setanimate2_1Step(AnimateStep.leave)
      }
      event.target.scrollTop >= animate2_2range[1] && setanimate2_1Step(AnimateStep.notShow)
    }
    const scrollBox = document.getElementById('scrollBox')
    if (scrollBox) {
      scrollBox.addEventListener('scroll', getScrollCount)
    }
    return () => {
      if (scrollBox) {
        scrollBox.removeEventListener('scroll', getScrollCount)
      }
    }
  }, [winH])
  return (
    <Box
      id={'scrollBox'}
      sx={{
        position: 'fixed',
        top: `${theme.height.header}`,
        left: 0,
        width: '100%',
        height: '100%',
        minHeight: `calc(100vh - ${theme.height.header})`,
        maxHeight: `calc(100vh - ${theme.height.header})`,
        overflowX: 'hidden',
        overflowY: stopScroll ? 'hidden' : 'auto',
        backgroundColor: '#000',
        backgroundImage: `url(${MobileBgImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 100%',
        backgroundPosition: 'top center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* scroll empty box */}
      <Box
        id={'animation1'}
        style={{
          width: '2px',
          height: `${_AnimateHeight1}px`,
          position: 'absolute',
          left: 0,
          top: '99.9vh',
          zIndex: 1
        }}
      ></Box>
      {animate2Step !== AnimateStep.notShow && <ThreeCard step={animate2Step} animationRatio={animate2Ratio} />}
      {animate2_1Step !== AnimateStep.notShow && <TextAniamte step={animate2_1Step} animationRatio={animate2_1Ratio} />}
      {animate1Show && <Necklace onceAnimation={onceAnimation} animationRatio={animate1Ratio} />}
      <OneMobile />
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: `${_AnimateHeight1 + 1800}px`
        }}
      ></Box>
      <VideoSection />
      <Four />
      <Footer />
      <LeftBar />
    </Box>
  )
}

export default MobileHome
