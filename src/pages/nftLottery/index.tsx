import { Box, useTheme } from '@mui/material'
import ArtistsList from './sections/artistsList'
import ArtistsInformation from './sections/artistsInformation'
import { useEffect, useState } from 'react'
import BigNumber from 'bignumber.js'
import BannerStep1 from './sections/banner/step1'
import BannerStep2 from './sections/banner/step2'
import { useScrollHeight } from 'hooks/useScroll'
import BannerStep from './components/banner/bannerStep'
export enum AnimateStep {
  'default' = 0,
  'enter' = 1,
  'moving' = 2,
  'leave' = 3
}
import TokenInformation from './sections/tokenInformation'
import PoolDetail from './sections/poolDetail'
const NftLottery = () => {
  const theme = useTheme()
  const windowScrollTop = useScrollHeight()
  const [winH, setWinHeight] = useState<number>(window.innerHeight)
  const [stopScroll, setStopscroll] = useState(true)
  const [animate0Ratio, setAnimate0Ratio] = useState<string>('0')
  const [animate1Ratio, setAnimate1Ratio] = useState<string>('0')
  const [animate2Ratio, setAnimate2Ratio] = useState<string>('0')
  const [animate0Step, setAnimate0Step] = useState(AnimateStep.default) // banner step 1
  const [animate1Step, setAnimate1Step] = useState(AnimateStep.default) // banner step
  const [animate2Step, setAnimate2Step] = useState(AnimateStep.default) // banner step 2
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
    setAnimate2Step(AnimateStep.default)
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
        const animate1Range = [winH / 2, winH]
        if (80 >= windowScrollTop) {
          setAnimate0Step(AnimateStep.enter)
          setAnimate1Step(AnimateStep.enter)
        } else if (80 < windowScrollTop && windowScrollTop <= animate0Range[1]) {
          setAnimate0Ratio(BigNumber((windowScrollTop - 80) / animate0Range[1]).toFixed(2))
          if (BigNumber((windowScrollTop - 80) / (animate0Range[1] - 80)).isGreaterThan('0.5')) {
            setAnimate1Step(AnimateStep.moving)
          } else {
            setAnimate1Step(AnimateStep.enter)
          }
          setAnimate0Step(AnimateStep.leave) // TODO leave when step 2 is leaving
          setAnimate1Ratio('100')
        } else if (animate1Range[0] < windowScrollTop && windowScrollTop <= animate1Range[1]) {
          setAnimate2Step(AnimateStep.enter)
          setAnimate2Ratio(
            BigNumber((windowScrollTop - animate1Range[0]) / (animate1Range[1] - animate1Range[0])).toFixed(2)
          )
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
        <BannerStep2 ratio={animate2Ratio} step={animate2Step} />
        <BannerStep ratio={animate1Ratio} step={animate1Step} />
      </Box>
      <TokenInformation />
      <PoolDetail />
      <ArtistsList />
      <ArtistsInformation />
    </>
  )
}

export default NftLottery
