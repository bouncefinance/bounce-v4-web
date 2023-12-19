import { Box, Stack } from '@mui/material'
import { AnimateStep } from '../../index'
import { useMemo } from 'react'
import Image from 'components/Image'
import cSvg from 'assets/imgs/nftLottery/banner/c.svg'
import oSvg from 'assets/imgs/nftLottery/banner/o.svg'
import mSvg from 'assets/imgs/nftLottery/banner/m.svg'
import iSvg from 'assets/imgs/nftLottery/banner/i.svg'
import nSvg from 'assets/imgs/nftLottery/banner/n.svg'
import gSvg from 'assets/imgs/nftLottery/banner/g.svg'
import sSvg from 'assets/imgs/nftLottery/banner/s.svg'
const BannerStep2bg = ({ ratio, step }: { ratio: string; step: AnimateStep }) => {
  const styleConfig = useMemo(() => {
    const styleObj = {
      p1: {
        transition: 'all 0s',
        transform: 'translate3D(-100vw, 0, 0)'
      },
      p2: {
        transition: 'all 0s',
        transform: 'translate3D(100vw, 0, 0)'
      }
    }
    switch (step) {
      case AnimateStep.default:
        return styleObj
      case AnimateStep.enter:
        return {
          p1: {
            transition: 'all 0.6s',
            transform: 'translate3D(-50%, 0, 0)'
          },
          p2: {
            transition: 'all 0.6s',
            transform: 'translate3D(-50%, 0, 0)'
          }
        }
      case AnimateStep.leave:
        return {
          p1: {
            transition: 'all 0.6s',
            transform: `translate3D(calc(-50% - ${100 * Number(ratio)}vw), 0, 0)`
          },
          p2: {
            transition: 'all 0.6s',
            transform: `translate3D(calc(-50% + ${100 * Number(ratio)}vw), 0, 0)`
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
      <Stack
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          position: 'absolute',
          bottom: '50%',
          left: '50%',
          flexWrap: 'nowrap',
          ...styleConfig.p1
        }}
        gap={'27px'}
      >
        <Image src={cSvg} />
        <Image src={oSvg} />
        <Image src={mSvg} />
        <Image src={iSvg} />
        <Image src={nSvg} />
        <Image src={gSvg} />
      </Stack>
      <Stack
        direction={'row'}
        justifyContent={'center'}
        alignItems={'center'}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          flexWrap: 'nowrap',
          ...styleConfig.p2
        }}
        gap={'27px'}
      >
        <Image src={sSvg} />
        <Image src={oSvg} />
        <Image src={oSvg} />
        <Image src={nSvg} />
      </Stack>
    </Box>
  )
}
export default BannerStep2bg
