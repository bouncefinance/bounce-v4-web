import { Box, Stack } from '@mui/material'
import { AnimateStep } from 'pages/nftLottery/sections/banner'
import { useMemo } from 'react'
const BannerStepLine = ({ ratio, step }: { ratio: string; step: AnimateStep }) => {
  const styleConfig = useMemo(() => {
    const styleObj = {
      line: {
        transition: 'all 0s',
        transform: 'translate3D(-50%, 100vh, 0)'
      },
      yellowLine: {
        top: 0
      }
    }
    switch (step) {
      case AnimateStep.default:
        return styleObj
      case AnimateStep.enter:
        return {
          line: {
            transition: 'all 0.6s',
            transform: `translate3D(-50%, ${250}px, 0)`
          },
          yellowLine: {
            top: 0
          }
        }
      case AnimateStep.moving:
        return {
          line: {
            transition: 'all 0.6s',
            transform: `translate3D(-50%, ${250}px, 0)`
          },
          yellowLine: {
            top: '50%'
          }
        }
      case AnimateStep.leave:
        return {
          line: {
            transition: 'all 0.6s',
            transform: `translate3D(-50%, calc(${250}px - ${2000 * Number(ratio)}px), 0)`
          },
          yellowLine: {
            top: '50%'
          }
        }
      default:
        return styleObj
    }
  }, [ratio, step])
  return (
    <Stack
      sx={{
        width: '3px',
        height: '184px',
        position: 'fixed',
        top: '50%',
        left: '50%',
        ...styleConfig.line
      }}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <Box
        sx={{
          width: '1px',
          height: '100%',
          background: '#A7A299'
        }}
      ></Box>
      <Box
        sx={{
          position: 'absolute',
          left: '0',
          width: '3px',
          height: '50%',
          background: '#C3A16D',
          transition: 'all 0.6s',
          ...styleConfig.yellowLine
        }}
      ></Box>
    </Stack>
  )
}
export default BannerStepLine
