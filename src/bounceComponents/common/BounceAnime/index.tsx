import { Box } from '@mui/material'
import React from 'react'
import Lottie from 'react-lottie'
import bounce_loading from './bounce-loading.json'

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: bounce_loading,
  rendererSettings: {
    preserveAspectRatio: 'xMidYMid slice'
  }
}

export const BounceAnime: React.FC = () => {
  return (
    <Box
      sx={{
        display: 'grid',
        placeContent: 'center',
        width: 220,
        height: 220,
        margin: '0 auto'
      }}
    >
      <Lottie classwidth={200} height={200} options={defaultOptions} />
    </Box>
  )
}
