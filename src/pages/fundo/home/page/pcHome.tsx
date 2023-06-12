import React from 'react'
import { Box, useTheme } from '@mui/material'
import One from '../components/one'
import TextAniamte from '../components/textAnimate'
import Four from '../components/four'
import VideoSection from '../components/video'
import BgImg from 'components/Fundo/assets/img/back.png'
import ThreeCard, { AnimateStep } from '../components/pcAnimation/threeCard'
import NftIssued from '../components/pcAnimation/nftIssued'
import Partner from '../components/pcAnimation/partner'
import ProductInfo from '../components/pcAnimation/productInfo'
import LeftBar from 'components/Fundo/LeftBar'
import Footer from '../components/footer'
import { useEffect, useState } from 'react'
import Necklace from '../components/pcAnimation/necklace'
import { BigNumber } from 'bignumber.js'
const PcHome: React.FC = () => {
  const theme = useTheme()
  const _AnimateHeight1 = 1000
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
  // 3 three card
  const [animate3Ratio, setanimate3Ratio] = useState<string>('0')
  const [animate3Step, setanimate3Step] = useState<AnimateStep>(0)
  const [animate4Ratio, setanimate4Ratio] = useState<string>('0')
  const [animate4Step, setanimate4Step] = useState<AnimateStep>(0)
  const [animate5Ratio, setanimate5Ratio] = useState<string>('0')
  const [animate5Step, setanimate5Step] = useState<AnimateStep>(0)
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
      // 1. necklack enter down and scale
      const animate1Range = [0, _AnimateHeight1 + 800]
      // 2.product info enter up
      const animate2range = [_AnimateHeight1, _AnimateHeight1 + 800]
      // 2.1 text enter left
      const animate2_1range = [_AnimateHeight1 + 400, _AnimateHeight1 + 1400]
      // 2.2 text leave up
      const animate2_2range = [_AnimateHeight1 + 1400, _AnimateHeight1 + 2400]
      // 3 three card enter left & product info leave left
      const animate3range = [_AnimateHeight1 + 2000, _AnimateHeight1 + 2800]
      // 4 NFT ISSUED & BY FOUNDO enter slide
      const animate4range = [_AnimateHeight1 + 2800 + winH + winH / 2, _AnimateHeight1 + 2800 + winH + winH / 2 + 800]
      // 5 NFT ISSUED & BY FOUNDO leave up
      const animate5range = [
        _AnimateHeight1 + 2800 + winH + winH / 2 + 800,
        _AnimateHeight1 + 2800 + winH + winH / 2 + 1600
      ]
      // 6 partner enter animation
      const animate6range = [_AnimateHeight1 + 2800 + winH + 1500, _AnimateHeight1 + 2800 + winH + 3200]
      // 7 partner active rotate animation
      const animate7range = [_AnimateHeight1 + 2800 + winH + 3200, _AnimateHeight1 + 2800 + winH + 4000]
      // 8 partner leave animation
      const animate8range = [_AnimateHeight1 + 2800 + winH + 4000, _AnimateHeight1 + 2800 + winH + 4800]
      // 1. necklack down and scale
      if (animate1Range[0] <= event.target.scrollTop && event.target.scrollTop <= animate1Range[1]) {
        setAnimate1Ratio(BigNumber(event.target.scrollTop / animate1Range[1]).toFixed(2))
        setAnimate1Show(true)
      } else {
        setAnimate1Show(false)
      }
      // 2. product info enter up
      if (animate2range[0] <= event.target.scrollTop && event.target.scrollTop <= animate2range[1]) {
        const raiod = BigNumber(event.target.scrollTop - animate2range[0])
          .div(animate2range[1] - animate2range[0])
          .toFixed(2)
        console.log('raiod>>>', raiod)
        setanimate2Ratio(Number(raiod) >= 1 ? '1.00' : raiod)
        setanimate2Step(AnimateStep.enter)
        setanimate2_1Ratio(
          BigNumber(event.target.scrollTop - animate2_1range[0])
            .div(animate2_1range[1] - animate2_1range[0])
            .toFixed(2)
        )
        setanimate2_1Step(AnimateStep.enter)
      } else if (event.target.scrollTop > animate3range[0]) {
        setanimate2Ratio('1')
        setanimate2Step(AnimateStep.notShow)
      } else if (event.target.scrollTop > animate2range[1]) {
        setanimate2Ratio('1')
        setanimate2Step(AnimateStep.enter)
      }
      event.target.scrollTop <= animate2range[0] && setanimate2Step(AnimateStep.notShow)
      // 2.1 text active left
      if (animate2_1range[0] <= event.target.scrollTop && event.target.scrollTop <= animate2_1range[1]) {
        setanimate2_1Ratio(
          BigNumber(event.target.scrollTop - animate2_1range[0])
            .div(animate2_1range[1] - animate2_1range[0])
            .toFixed(2)
        )
        setanimate2_1Step(AnimateStep.enter)
      }
      // 2.2 text leave up
      if (animate2_2range[0] <= event.target.scrollTop && event.target.scrollTop <= animate2_2range[1]) {
        setanimate2_1Ratio(
          BigNumber(event.target.scrollTop - animate2_2range[0])
            .div(animate2_2range[1] - animate2_2range[0])
            .toFixed(2)
        )
        setanimate2_1Step(AnimateStep.leave)
      }
      event.target.scrollTop <= animate2_1range[0] && setanimate2_1Step(AnimateStep.notShow)
      // 3. three card enter left
      if (animate3range[0] <= event.target.scrollTop && event.target.scrollTop <= animate3range[1]) {
        const animation3Result = BigNumber(event.target.scrollTop - animate3range[0])
          .div(animate3range[1] - animate3range[0])
          .toFixed(2)
        setanimate2Ratio(animation3Result)
        setanimate2Step(AnimateStep.leave)
        setanimate3Ratio(animation3Result)
        setanimate3Step(AnimateStep.enter)
      }
      event.target.scrollTop <= animate3range[0] && setanimate3Step(AnimateStep.notShow)
      event.target.scrollTop >= animate3range[1] + winH && setanimate3Step(AnimateStep.notShow)
      // 4 NFT ISSUED & BY FOUNDO enter slide, animation rang is 3200px
      if (animate4range[0] <= event.target.scrollTop && event.target.scrollTop <= animate4range[1]) {
        setanimate4Ratio(
          BigNumber(event.target.scrollTop - animate4range[0])
            .div(animate4range[1] - animate4range[0])
            .toFixed(2)
        )
        setanimate4Step(AnimateStep.enter)
      }
      // 5 NFT ISSUED & BY FOUNDO leave up
      if (animate5range[0] <= event.target.scrollTop && event.target.scrollTop <= animate5range[1]) {
        setanimate4Ratio(
          BigNumber(event.target.scrollTop - animate5range[0])
            .div(animate5range[1] - animate5range[0])
            .toFixed(2)
        )
        setanimate4Step(AnimateStep.leave)
      }
      event.target.scrollTop <= animate4range[0] && setanimate4Step(AnimateStep.notShow)
      // 6 partner enter animation
      if (animate6range[0] <= event.target.scrollTop && event.target.scrollTop <= animate6range[1]) {
        setanimate5Ratio(
          BigNumber(event.target.scrollTop - animate6range[0])
            .div(animate6range[1] - animate6range[0])
            .toFixed(2)
        )
        setanimate5Step(AnimateStep.enter)
      }
      event.target.scrollTop <= animate6range[0] && setanimate5Step(AnimateStep.notShow)
      // 7 partner active rotate animation
      if (animate7range[0] <= event.target.scrollTop && event.target.scrollTop <= animate7range[1]) {
        setanimate5Ratio(
          BigNumber(event.target.scrollTop - animate7range[0])
            .div(animate7range[1] - animate7range[0])
            .toFixed(2)
        )
        setanimate5Step(AnimateStep.rotate)
      }
      // 8 partner leave animation
      if (animate8range[0] <= event.target.scrollTop && event.target.scrollTop <= animate8range[1]) {
        setanimate5Ratio(
          BigNumber(event.target.scrollTop - animate8range[0])
            .div(animate8range[1] - animate8range[0])
            .toFixed(2)
        )
        setanimate5Step(AnimateStep.leave)
      }
      event.target.scrollTop >= animate8range[1] && setanimate5Step(AnimateStep.notShow)
      console.log('event.target.scrollTop>>>', event.target.scrollTop)
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
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: `calc(100vh - ${theme.height.header})`,
        maxHeight: `calc(100vh - ${theme.height.header})`,
        minWidth: '1000px',
        overflowX: 'hidden',
        overflowY: stopScroll ? 'hidden' : 'auto',
        backgroundColor: '#000',
        backgroundImage: `url(${BgImg})`,
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
      {animate2_1Step !== AnimateStep.notShow && <TextAniamte step={animate2_1Step} animationRatio={animate2_1Ratio} />}
      {animate2Step !== AnimateStep.notShow && <ProductInfo step={animate2Step} animationRatio={animate2Ratio} />}
      {animate3Step !== AnimateStep.notShow && <ThreeCard step={animate3Step} animationRatio={animate3Ratio} />}
      {animate1Show && <Necklace onceAnimation={onceAnimation} animationRatio={animate1Ratio} />}
      <One />
      {/* scroll empty box */}
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          height: `${_AnimateHeight1 + 2800}px`
        }}
      ></Box>
      <VideoSection />
      {animate4Step !== AnimateStep.notShow && <NftIssued animationRatio={animate4Ratio} step={animate4Step} />}
      {animate5Step !== AnimateStep.notShow && <Partner animationRatio={animate5Ratio} step={animate5Step} />}
      <Four />
      <Footer />
      <LeftBar />
    </Box>
  )
}

export default PcHome
