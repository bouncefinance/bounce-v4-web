import { Box, Typography, styled } from '@mui/material'
import Artist from 'components/Fundo/assets/img/artist.png'
import { useIsSMDown } from 'themes/useTheme'

const ArtistiImg = styled(Box)(({ theme }) => ({
  position: 'relative',
  width: 404,
  height: 404,
  margin: '0 auto 40px',
  '.circle': {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate3D(-50%, -50%, 0)',
    borderRadius: '50%',
    transition: 'opacity 1s'
  },
  '.artistiImg': {
    width: 215,
    height: 215,
    objectFit: 'contain',
    overflow: 'hidden',
    borderRadius: '50%',
    border: '2px solid rgba(255, 255, 255, 0.2)',
    animation: `fade1 1s linear 0s infinite`
  },
  '.circle1': {
    width: 404,
    height: 404,
    border: '2px solid rgba(255, 255, 255, 0.2)',
    animation: `fade2 1s linear 0s infinite`
  },
  '.circle2': {
    width: 325,
    height: 325,
    border: '2px solid rgba(255, 255, 255, 0.2)',
    animation: `fade3 1s linear 0s infinite`
  },
  '.circle3': {
    width: 263,
    height: 263,
    border: '2px solid rgba(255, 255, 255, 0.2)',
    animation: `fade4 1s linear 0s infinite`
  },
  [theme.breakpoints.down('sm')]: {
    width: 217,
    height: 217,
    margin: '0 auto 12px',
    '.artistiImg': {
      width: 112,
      height: 112
    },
    '.circle1': {
      width: 217,
      height: 217
    },
    '.circle2': {
      width: 175,
      height: 175
    },
    '.circle3': {
      width: 140,
      height: 140
    }
  },
  '@keyframes fade1': {
    '0%': {
      border: '2px solid rgba(255, 255, 255, 0.4)'
    },
    '25%': {
      border: '2px solid rgba(255, 255, 255, 0.3)'
    },
    '50%': {
      border: '2px solid rgba(255, 255, 255, 0.2)'
    },
    '75%': {
      border: '2px solid rgba(255, 255, 255, 0.15)'
    },
    '100%': {
      border: '2px solid rgba(255, 255, 255, 0.1)'
    }
  },
  '@keyframes fade2': {
    '0%': {
      opacity: 0.75
    },
    '25%': {
      opacity: 0.5
    },
    '50%': {
      opacity: 0.25
    },
    '75%': {
      opacity: 0.1
    },
    '100%': {
      opacity: 1
    }
  },
  '@keyframes fade3': {
    '0%': {
      opacity: 0.5
    },
    '25%': {
      opacity: 0.25
    },
    '50%': {
      opacity: 0.1
    },
    '75%': {
      opacity: 1
    },
    '100%': {
      opacity: 0.75
    }
  },
  '@keyframes fade4': {
    '0%': {
      opacity: 0.25
    },
    '25%': {
      opacity: 0.1
    },
    '50%': {
      opacity: 1
    },
    '75%': {
      opacity: 0.75
    },
    '100%': {
      opacity: 0.5
    }
  }
}))
export default function ProductCard() {
  const isSm = useIsSMDown()
  return (
    <Box
      sx={{
        position: 'relative',
        width: isSm ? '258px' : '458px',
        height: isSm ? '360px' : '640px',
        background: 'rgba(73, 73, 73, 0.11)',
        border: '2px solid rgba(255, 255, 255, 0.2)',
        backdropFilter: 'blur(11px)',
        borderRadius: '16px',
        padding: '26px 19px 0'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'space-between',
          alignItems: 'ceneter',
          marginBottom: isSm ? '15px' : '37px'
        }}
      >
        <Typography
          sx={{
            fontFamily: `'Public Sans'`,
            fontWeight: 500,
            fontSize: '16px',
            color: 'var(--ps-text-5)'
          }}
        >
          Details
        </Typography>
        <Typography
          sx={{
            fontFamily: `'Public Sans'`,
            fontWeight: 500,
            fontSize: '16px',
            color: 'var(--ps-text-5)'
          }}
        >
          Ref : LG578319461
        </Typography>
      </Box>
      <ArtistiImg>
        <Box className={'circle circle1'}></Box>
        <Box className={'circle circle2'}></Box>
        <Box className={'circle circle3'}></Box>
        <img className={'circle artistiImg'} src={Artist} alt="" />
      </ArtistiImg>
      <Typography
        sx={{
          fontFamily: `'Public Sans'`,
          fontWeight: 600,
          fontSize: isSm ? '16px' : '20px',
          marginBottom: isSm ? '0px' : '16px',
          lineHeight: '28px',
          color: '#fff'
        }}
      >
        Artist
      </Typography>
      <Typography
        sx={{
          fontFamily: `'Public Sans'`,
          fontWeight: 700,
          fontSize: isSm ? '24px' : '44px',
          marginBottom: '16px',
          lineHeight: '32px',
          color: '#fff'
        }}
      >
        NAHIYA SU
      </Typography>
    </Box>
  )
}
