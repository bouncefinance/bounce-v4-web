import { Box, useTheme } from '@mui/material'
import { useEffect, useState } from 'react'
import BannerStep1 from '../step1'
import BannerStep2 from '../step2'
import BannerStepLine from '../bannerStep'
import { AnimateStep } from '../../../sections/banner'
import makeStyles from '@mui/styles/makeStyles'
import BgImg from 'assets/imgs/nftLottery/banner/globalBg.png'
// import LotteryCountdown from '../../lotteryCountdown'
// import { RandomSelectionNFTProps } from 'api/pool/type'
// import { useGetRandomSelectionNFTPoolStatus } from 'bounceHooks/auction/useRandomSelectionNFTPoolInfo'
export const useWithAnimationStyles = makeStyles(() => ({
  awaitInView: {
    width: '100%',
    height: '100%',
    transformOrigin: 'bottom center',
    transitionProperty: 'transform, opacity',
    transitionDuration: '0.5s',
    opacity: 0,
    transform: 'translateY(50px)'
  },
  inView: {
    '&&': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  }
}))
const PcBanner = () => {
  const theme = useTheme()
  // const { poolStatus } = useGetRandomSelectionNFTPoolStatus(poolInfo)
  const [winH, setWinHeight] = useState<number>(window.innerHeight)
  const [stopScroll, setStopscroll] = useState(true)
  const [animate1Ratio, setAnimate1Ratio] = useState<string>('0')
  const [animate1Step, setAnimate1Step] = useState(AnimateStep.default) // banner step line
  // const now = () => new Date().getTime()
  // const [startTime, setStartTime] = useState<number>(0)
  const resizeWinH = () => {
    setWinHeight(window.innerHeight > 1000 ? 1000 : window.innerHeight)
  }

  // useEffect(() => {
  //   if (now() < poolInfo.openAt * 1000) {
  //     setStartTime(poolInfo.openAt)
  //   }
  //   if (now() > poolInfo.openAt * 1000 && now() < poolInfo.closeAt * 1000) {
  //     setStartTime(poolInfo.closeAt)
  //   }
  //   if (now() > poolInfo.claimAt * 1000) {
  //     setStartTime(poolInfo.claimAt)
  //   }
  // }, [poolInfo.claimAt, poolInfo.closeAt, poolInfo.openAt])

  useEffect(() => {
    // lock page scroll 3 seconds
    stopScroll && document.body.setAttribute('style', 'width:100%;height:100%;overflowY:hidden;')
    !stopScroll && document.body.setAttribute('style', 'width:100%;height:100%;overflowY:auto;')
    return () => {
      !stopScroll && document.body.setAttribute('style', 'width:100%;height:100%;overflowY:auto;')
    }
  }, [stopScroll])
  useEffect(() => {
    setTimeout(() => {
      setStopscroll(false)
    }, 3000)
    setAnimate1Step(AnimateStep.enter)
    if (document.documentElement.scrollTop !== 0) {
      // fix animation init error when wrong scrollTop after page reload

      setTimeout(() => {
        document.documentElement.scrollTop = 0
      }, 200)
    }
    document.body.addEventListener('resize', resizeWinH)
    return () => {
      document.body.removeEventListener('resize', resizeWinH)
    }
  }, [])
  useEffect(() => {
    const getScrollCount = () => {
      const windowScrollTop = document.documentElement.scrollTop
      if (windowScrollTop) {
        // banner
        const animate0Range = [0, winH / 2]
        const animate1Range = [winH / 2, winH]
        const animate2Range = [winH, 2 * winH]
        if (80 >= windowScrollTop) {
          setAnimate1Step(AnimateStep.enter) // step line animate enter
        } else if (80 < windowScrollTop && windowScrollTop <= animate0Range[1]) {
          setAnimate1Ratio('100')
        } else if (animate1Range[0] < windowScrollTop && windowScrollTop <= animate1Range[1]) {
          setAnimate1Step(AnimateStep.moving) // step line turn to second
        } else if (animate2Range[0] < windowScrollTop && windowScrollTop <= animate2Range[1]) {
          setAnimate1Step(AnimateStep.leave)
        } else if (windowScrollTop >= 3.5 * winH) {
          setAnimate1Step(AnimateStep.leave)
          setAnimate1Ratio('100')
        }
      }
    }
    window.addEventListener('scroll', getScrollCount)
    return () => {
      window.removeEventListener('scroll', getScrollCount)
    }
  }, [theme.height.header, winH])
  return (
    <Box
      sx={{
        width: '100%',
        background: `url(${BgImg}) repeat`,
        overflow: 'hidden'
      }}
    >
      <BannerStep1 />
      <BannerStep2 />
      <BannerStepLine ratio={animate1Ratio} step={animate1Step} />
      {/* <LotteryCountdown
        status={poolStatus}
        startTime={startTime}
        timeList={[poolInfo.openAt, poolInfo.closeAt, poolInfo.claimAt]}
      /> */}
    </Box>
  )
}
export default PcBanner
