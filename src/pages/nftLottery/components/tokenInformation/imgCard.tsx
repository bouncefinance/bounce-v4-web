import { Box, Typography } from '@mui/material'

import TokenInfoImg from 'assets/imgs/nftLottery/token-info.png'
import useBreakpoint from 'hooks/useBreakpoint'
export const WinnerMobileCard = () => {
  return (
    <Box
      sx={{
        width: 'max-content',
        borderRadius: '7.992px',
        background: '#0F0F0F',
        padding: 7.991
      }}
    >
      <img src={TokenInfoImg} style={{ width: 131.857, height: 131.857 }} />
      <Box mt={5.368}>
        <Typography
          sx={{
            color: '#FFF',
            fontFamily: 'Helvetica',
            fontSize: 11.088,
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '140%'
          }}
        >
          AI Meets Bitcoin
        </Typography>
        <Typography
          mt={3.7}
          sx={{
            color: 'rgba(255, 255, 255, 0.70)',
            fontFamily: 'Helvetica',
            fontSize: 7.392,
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '140%'
          }}
        >
          Unrevealed
        </Typography>
      </Box>
    </Box>
  )
}

const ImgCard = () => {
  const isSm = useBreakpoint('sm')
  return (
    <Box
      sx={{
        width: 'max-content',
        borderRadius: isSm ? 12 : '17.299px',
        background: '#0F0F0F',
        padding: isSm ? 12 : '17.3px'
      }}
    >
      <img src={TokenInfoImg} style={{ width: isSm ? 200 : '100%' }} />
      <Box mt={isSm ? 14 : 20}>
        <Typography
          sx={{
            color: '#FFF',
            fontFamily: 'Helvetica',
            fontSize: isSm ? 16.8 : 24,
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '140%'
          }}
        >
          AI Meets Bitcoin
        </Typography>
        <Typography
          mt={isSm ? 5 : 8}
          sx={{
            color: 'rgba(255, 255, 255, 0.70)',
            fontFamily: 'Helvetica',
            fontSize: isSm ? 11.2 : 16,
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '140%'
          }}
        >
          Unrevealed
        </Typography>
      </Box>
    </Box>
  )
}
export default ImgCard
