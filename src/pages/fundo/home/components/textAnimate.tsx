import { Typography } from '@mui/material'
import CenterSection from 'components/Fundo/CenterSection'
import { useMemo } from 'react'
import { AnimateStep } from './pcAnimation/threeCard'
export default function TextAnimate({ animationRatio, step }: { animationRatio?: string; step: AnimateStep }) {
  const transformStr = useMemo(() => {
    let result = 'translate3D(0, 0, 0)'
    switch (step) {
      case AnimateStep.enter:
        result = `translate3D(-${Number(animationRatio) * 50}%, 0, 0)`
        break
      case AnimateStep.leave:
        result = `translate3D(-${50 + Number(animationRatio) * 50}%, -${Number(animationRatio) * 100}vh, 0)`
        break
    }
    return result
  }, [step, animationRatio])
  return (
    <CenterSection
      style={{
        position: 'fixed',
        top: '50%',
        left: '0',
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        transform: 'translate3d(50%, -50%, 0)'
      }}
    >
      <>
        <Typography
          component={'span'}
          sx={{
            transform: transformStr,
            fontFamily: `'Inter'`,
            fontWeight: 600,
            fontSize: '300px',
            height: '217px',
            lineHeight: '217px',
            leadingTrim: 'both',
            textEdge: 'cap',
            textTransform: 'uppercase',
            fontFeatureSettings: `'pnum' on, 'lnum' on`,
            color: 'rgba(255, 255, 255, 0.2)',
            whiteSpace: 'nowrap'
          }}
        >
          ANGEL HAND
        </Typography>
      </>
    </CenterSection>
  )
}
