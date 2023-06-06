import NecklaceJson from 'components/Fundo/assets/lottie/animatinDm4.json'
import { create } from '@lottiefiles/lottie-interactivity'
import { useEffect, useRef, useState } from 'react'
import { useIsSMDown } from 'themes/useTheme'

require('@lottiefiles/lottie-player')
const Necklace = ({
  style,
  onceAnimation,
  animationRatio
}: {
  style?: React.CSSProperties
  onceAnimation?: boolean
  animationRatio?: string
}) => {
  const isSm = useIsSMDown()
  const lottieEl = useRef<any>(null)
  const [topNum, setTopNUm] = useState(0)
  let countTime = 40
  useEffect(() => {
    const countdown = setInterval(() => {
      if (!onceAnimation) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        countTime = countTime - 1
        if (countTime >= 0) {
          setTopNUm(countTime)
        } else {
          clearInterval(countdown)
        }
      } else {
        clearInterval(countdown)
      }
    }, 75)
    const lottieIdEl = document.getElementById('lottie-player')
    if (lottieIdEl && lottieIdEl !== undefined) {
      // 4. configure the interactivity library
      try {
        create({
          mode: 'scroll',
          player: lottieIdEl || '#lottie-player',
          container: '#animation1',
          actions: [
            {
              visibility: [0, 1],
              type: 'seek',
              frames: [0, 128]
            }
          ]
        })
      } catch (error) {
        console.error('create lottie error')
      }
    }
  }, [])
  return (
    <lottie-player
      ref={lottieEl}
      id={'lottie-player'}
      autoplay={false}
      src={JSON.stringify(NecklaceJson)}
      loop={false}
      style={{
        position: 'fixed',
        top: `${animationRatio ? Number(animationRatio) * 50 : 0}%`,
        width: isSm ? '100%' : '600px',
        height: isSm ? 'auto' : '750px',
        left: '50%',
        transform: `translate3D(-50%, -${
          topNum > 0 ? topNum : animationRatio ? Number(animationRatio) * 50 : 0
        }%, 0) scale(${1 - Number(animationRatio) * 0.55})`,
        ...style
      }}
    ></lottie-player>
  )
}

export default Necklace
