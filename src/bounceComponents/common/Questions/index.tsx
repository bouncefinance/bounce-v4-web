import { Box, IconButton } from '@mui/material'
import Image from 'components/Image'
import React from 'react'
import QuestionSVG from 'assets/imgs/questions.svg'
import useBreakpoint from '../../../hooks/useBreakpoint'

export const Questions: React.FC = () => {
  const isMobile = useBreakpoint('lg')
  return (
    <Box sx={{ position: 'fixed', bottom: isMobile ? 30 : 50, right: 30, zIndex: 999 }}>
      <IconButton href="https://forms.gle/M4mDBUv9iQ7tfaRE9" target="_blank">
        <Image src={QuestionSVG} width={30} height={30} alt="questions" />
      </IconButton>
    </Box>
  )
}
