import { Box, Typography } from '@mui/material'

import TokenInfoImg from 'assets/imgs/nftLottery/token-info.png'
const ImgCard = () => {
  return (
    <Box sx={{ width: 'max-content', borderRadius: '17.299px', background: '#0F0F0F', padding: '17.3px' }}>
      <img src={TokenInfoImg} />
      <Box mt={20}>
        <Typography
          sx={{
            color: '#FFF',
            fontFamily: 'Helvetica',
            fontSize: 24,
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '140%'
          }}
        >
          AI Meets Bitcoin
        </Typography>
        <Typography
          mt={8}
          sx={{
            color: 'rgba(255, 255, 255, 0.70)',
            fontFamily: 'Helvetica',
            fontSize: 16,
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
