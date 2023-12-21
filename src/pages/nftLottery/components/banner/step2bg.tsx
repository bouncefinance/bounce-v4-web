import { Box } from '@mui/material'
import { AnimateStep } from '../../sections/banner/index'
import { useMemo } from 'react'
import Image from 'components/Image'
import fontSvg from 'assets/imgs/nftLottery/banner/font.svg'
const BannerStep2bg = ({ ratio, step }: { ratio: string; step: AnimateStep }) => {
  const styleConfig = useMemo(() => {
    const styleObj = {
      p1: {
        transition: 'all 0s',
        transform: 'translate3D(-100vw, -50%, 0)'
      }
    }
    switch (step) {
      case AnimateStep.default:
        return styleObj
      case AnimateStep.enter:
        return {
          p1: {
            transition: 'all 0.6s',
            transform: 'translate3D(-50%, -50%, 0)'
          }
        }
      case AnimateStep.leave:
        return {
          p1: {
            transition: 'all 0.6s',
            transform: `translate3D(calc(-50% - ${100 * Number(ratio)}vw), -50%, 0)`
          }
        }
      default:
        return styleObj
    }
  }, [step, ratio])
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh'
      }}
    >
      <Image
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          flexWrap: 'nowrap',
          ...styleConfig.p1
        }}
        src={fontSvg}
      />
    </Box>
  )
}
export default BannerStep2bg
