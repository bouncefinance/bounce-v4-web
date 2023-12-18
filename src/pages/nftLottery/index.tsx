import { Box, Typography, useTheme } from '@mui/material'
import SectionA from './sections/sectionA'
import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import BannerStep1 from './sections/banner/step1'
import { useScrollHeight } from 'hooks/useScroll'
import BannerStep from './components/banner/bannerStep'
export enum AnimateStep {
  'default' = 0,
  'enter' = 1,
  'moving' = 2,
  'leave' = 3
}
const NftLottery = () => {
  const theme = useTheme()
  const windowScrollTop = useScrollHeight()
  const [winH, setWinHeight] = useState<number>(window.innerHeight)
  const [stopScroll, setStopscroll] = useState(true)
  const [animate0Ratio, setAnimate0Ratio] = useState<string>('0')
  const [animate1Ratio, setAnimate1Ratio] = useState<string>('0')
  const [animate0Step, setAnimate0Step] = useState(AnimateStep.default) // banner step 1
  const [animate1Step, setAnimate1Step] = useState(AnimateStep.default) // banner step
  const resizeWinH = () => {
    setWinHeight(window.innerHeight)
  }
  useEffect(() => {
    stopScroll && document.body.setAttribute('style', 'overflowY:hidden;')
    !stopScroll && document.body.setAttribute('style', 'overflowY:auto;')
    return () => {
      !stopScroll && document.body.setAttribute('style', 'overflowY:auto;')
    }
  }, [stopScroll])
  useEffect(() => {
    setTimeout(() => {
      setStopscroll(false)
    }, 3000)
    setAnimate0Step(AnimateStep.enter)
    setAnimate1Step(AnimateStep.enter)
    document.body.addEventListener('resize', resizeWinH)
    return () => {
      document.body.removeEventListener('resize', resizeWinH)
    }
  }, [])
  useEffect(() => {
    const getScrollCount = () => {
      const windowScrollTop = document.documentElement.scrollTop
      console.log('windowScrollTop>>>', windowScrollTop)
      if (windowScrollTop) {
        // banner
        const animate0Range = [0, winH / 2]
        if (80 >= windowScrollTop) {
          console.log('reload')
          setAnimate0Step(AnimateStep.enter)
          setAnimate1Step(AnimateStep.enter)
        } else if (80 < windowScrollTop && windowScrollTop <= animate0Range[1]) {
          setAnimate0Ratio(BigNumber((windowScrollTop - 80) / animate0Range[1]).toFixed(2))
          if (BigNumber((windowScrollTop - 80) / (animate0Range[1] - 80)).isGreaterThan('0.5')) {
            setAnimate1Step(AnimateStep.moving)
          } else {
            setAnimate1Step(AnimateStep.enter)
          }
          console.log('leave')
          setAnimate0Step(AnimateStep.leave) // TODO leave when step 2 is leaving
          setAnimate1Ratio('100')
        }
      }
    }
    window.addEventListener('scroll', getScrollCount)
    return () => {
      window.removeEventListener('scroll', getScrollCount)
    }
  }, [theme.height.header, winH, windowScrollTop])
  return (
    <>
      <Box
        sx={{
          width: '100%',
          minHeight: '200vh',
          background: '#eeece6'
        }}
      >
        <BannerStep1 ratio={animate0Ratio} step={animate0Step} />
        <BannerStep ratio={animate1Ratio} step={animate1Step} />
      </Box>
      <Typography variant="lotteryh1">aAAAA</Typography>
      <SectionA />
    </>
  )
}

export default NftLottery
