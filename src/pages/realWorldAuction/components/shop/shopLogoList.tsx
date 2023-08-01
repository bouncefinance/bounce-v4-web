import { Box, Typography, styled } from '@mui/material'
import { useIsMDDown } from 'themes/useTheme'
import { ReactComponent as Icon1Svg } from 'assets/imgs/realworldShop/icon1.svg'
import { ReactComponent as Icon1mobileSvg } from 'assets/imgs/realworldShop/icon1mobile.svg'
import productImg from 'assets/imgs/thirdPart/foundoDetail/productIcon.png'
import { ReactComponent as FoundoIcon1Svg } from 'assets/imgs/realworldShop/foundoIcon1.svg'
import { ReactComponent as FoundoIcon1MobileSvg } from 'assets/imgs/realworldShop/foundoIcon1mobile.svg'

const LogoItem = styled(Box)(({ theme }) => ({
  position: 'relative',
  minWidth: '200px',
  height: '200px',
  display: 'flex',
  flexFlow: 'row nowrap',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#fff',
  borderRadius: '200px',
  border: '1px solid #20201E',
  overflow: 'hidden',
  cursor: 'pointer',
  '.pordutct': {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    opacity: 0,
    objectFit: 'cover',
    transition: 'all 0.6s'
  },
  '.title': {
    color: '#20201E',
    fontFamily: `'Instrument Serif'`,
    fontSize: '40px'
  },
  '&:hover': {
    background: '#121212',
    '.pordutct': {
      opacity: 0
    },
    '.title': {
      color: '#fff'
    }
  },
  [theme.breakpoints.down('md')]: {
    height: '100px',
    '.title': {
      color: '#20201E',
      fontFamily: `'Instrument Serif'`,
      fontSize: '28px'
    }
  }
}))
const ShopLogoList = () => {
  const isMd = useIsMDDown()
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: isMd ? '132px' : '344px'
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '1296px',
          height: isMd ? '132px' : '344px',
          margin: '0 auto',
          overflowX: 'auto',
          padding: isMd ? '0 0 0 16px' : '0',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'flex-start',
          alignItems: 'center',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }}
      >
        <LogoItem
          sx={{
            minWidth: isMd ? '195px' : '478px'
          }}
        >
          {isMd ? <Icon1mobileSvg /> : <Icon1Svg />}
          <img className="pordutct" src={productImg} alt="" srcSet="" />
        </LogoItem>
        <LogoItem
          sx={{
            minWidth: isMd ? '100px' : '200px'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {isMd ? <FoundoIcon1MobileSvg /> : <FoundoIcon1Svg />}
            <img
              style={{
                width: isMd ? '34px' : '56px',
                mixBlendMode: 'difference',
                marginTop: isMd ? 5 : 8
              }}
              src="data:image/png;base64,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"
              alt=""
              srcSet=""
            />
          </Box>
        </LogoItem>
        <LogoItem
          sx={{
            minWidth: isMd ? '259px' : '617px'
          }}
        >
          <Typography className="title">Coming soon...</Typography>
        </LogoItem>
      </Box>
    </Box>
  )
}
export default ShopLogoList
