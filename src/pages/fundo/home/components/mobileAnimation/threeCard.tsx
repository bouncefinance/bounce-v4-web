import ProductCard from 'components/Fundo/ProductCard'
import FundoInfo from 'components/Fundo/FundoInfo'
import ArtistCard from 'components/Fundo/ArtistCard'
import ArtistInfo from 'components/Fundo/ArtistInfo'
import { Box } from '@mui/material'
import { useMemo } from 'react'

export enum AnimateStep {
  'notShow' = 0,
  'enter' = 1,
  'leave' = 2,
  'rotate' = 3 // only partner component use this status
}
export default function ThreeCard({ animationRatio, step }: { animationRatio?: string; step: AnimateStep }) {
  const transformStr = useMemo(() => {
    let result = 'translate3D(0, 0, 0)'
    switch (step) {
      case AnimateStep.enter:
        result = `translate3D(0, -${Number(animationRatio) * 50}vh, 0)`
        break
      case AnimateStep.leave:
        result = `translate3D(0, -${Number(animationRatio) * 370 + 50}vh, 0)`
        break
    }
    return result
  }, [step, animationRatio])
  const hideProductImg = useMemo(() => {
    return step === AnimateStep.enter && Number(animationRatio) < 1
  }, [animationRatio, step])
  return (
    <Box
      style={{
        position: 'fixed',
        width: '100vw',
        top: '100%',
        left: '0',
        marginTop: '-180px',
        transform: transformStr,
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center'
      }}
      gap={'96px'}
    >
      <ProductCard hideProductImg={hideProductImg} />
      <FundoInfo />
      <ArtistCard />
      <ArtistInfo />
    </Box>
  )
}
