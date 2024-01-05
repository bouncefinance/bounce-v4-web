import { Box, Typography } from '@mui/material'

import TokenInfoImg from 'assets/imgs/nftLottery/token-info.png'
import useBreakpoint from 'hooks/useBreakpoint'
import { Token721 } from 'state/users/hooks'
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
export const WinnerImgCard = () => {
  return (
    <Box
      sx={{
        width: 'max-content',
        borderRadius: '19.028px',
        background: '#0F0F0F',
        padding: '19.027px'
      }}
    >
      <img src={TokenInfoImg} style={{ width: '313.946px', height: '313.946px' }} />
      <Box mt={22.305}>
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
          mt={8.8}
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

export const NftSmallImgCard = ({ erc721Token }: { erc721Token?: Token721 | undefined }) => {
  return (
    <Box
      sx={{
        width: '100%',
        minWidth: 140,
        borderRadius: 8,
        background: '#0F0F0F',
        padding: 7.568
      }}
    >
      <img src={erc721Token?.uri || TokenInfoImg} style={{ width: '100%', height: '100%', border: 8 }} />
      <Box mt={8.871}>
        <Typography
          sx={{
            color: '#FFF',
            fontFamily: 'Helvetica',
            fontSize: 12,
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '140%'
          }}
        >
          {erc721Token?.name || 'AI Meets Bitcoin'}
        </Typography>
        <Typography
          noWrap
          mt={3.5}
          sx={{
            color: 'rgba(255, 255, 255, 0.70)',
            fontFamily: 'Helvetica',
            fontSize: 12,
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '140%',
            maxWidth: 150
          }}
        >
          # {erc721Token?.tokenId}
        </Typography>
      </Box>
    </Box>
  )
}

const ImgCard = ({ erc721Token }: { erc721Token?: Token721 | undefined }) => {
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
      <img src={erc721Token?.uri || TokenInfoImg} style={{ width: isSm ? 200 : '285px' }} />
      <Box mt={isSm ? 14 : 20}>
        <Typography
          sx={{
            color: '#FFF',
            fontFamily: 'Helvetica',
            fontSize: isSm ? 16.8 : 24,
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '140%',
            maxWidth: 280,
            wordWrap: 'break-word'
          }}
        >
          {erc721Token?.name || 'AI Meets Bitcoin'}
        </Typography>
        <Typography
          noWrap
          mt={isSm ? 5 : 8}
          sx={{
            color: 'rgba(255, 255, 255, 0.70)',
            fontFamily: 'Helvetica',
            fontSize: isSm ? 11.2 : 16,
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '140%',
            maxWidth: 150
          }}
        >
          # {erc721Token?.tokenId}
        </Typography>
      </Box>
    </Box>
  )
}
export default ImgCard
