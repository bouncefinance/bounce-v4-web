import ProductCard from 'components/Fundo/ProductCard'
import { Box } from '@mui/material'
import { useMemo } from 'react'
import { useIsSMDown } from 'themes/useTheme'
import { AnimateStep } from './threeCard'
export default function ProductInfo({ animationRatio, step }: { animationRatio?: string; step: AnimateStep }) {
  const isSm = useIsSMDown()
  const transformStr = useMemo(() => {
    let result = 'translate3D(0, 0, 0)'
    switch (step) {
      case AnimateStep.enter:
        result = `translate3D(0, ${(1 - Number(animationRatio)) * 100}vh, 0)`
        break
      case AnimateStep.leave:
        if (Number(animationRatio) < 0.2) {
          result = `translate3D(-${Number(animationRatio) * 2.5 * 70}%, 0, 0)`
        } else if (Number(animationRatio) >= 0.2 && Number(animationRatio) <= 0.5) {
          result = `translate3D(-${0.5 * 70}%, 0, 0)`
        } else if (Number(animationRatio) > 0.5) {
          result = `translate3D(-${Number(animationRatio) * 70}%, 0, 0)`
        }
        break
    }
    return result
  }, [step, animationRatio])
  const hideProductImg = useMemo(() => {
    return step === 1 && Number(animationRatio) < 1
  }, [step, animationRatio])
  return (
    <Box
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        marginTop: isSm ? '-180px' : '-320px',
        marginLeft: isSm ? '-129px' : '-229px',
        transform: transformStr,
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}
      gap={'120px'}
    >
      <ProductCard hideProductImg={hideProductImg} />
      <Box
        sx={{
          position: 'relative',
          width: isSm ? '280px' : '550px'
        }}
      ></Box>
      <Box
        sx={{
          position: 'relative',
          width: isSm ? '258px' : '458px'
        }}
      ></Box>
      <Box
        sx={{
          position: 'relative',
          width: isSm ? '280px' : '550px'
        }}
      ></Box>
    </Box>
  )
}
