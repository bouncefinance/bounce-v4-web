import { Box, Typography, Button } from '@mui/material'
import { ReactComponent as LongArrowSvg } from 'assets/imgs/realworldShop/longArrow.svg'
import { useIsMDDown } from 'themes/useTheme'
import { routes } from 'constants/routes'
import AnimatedComponent from './animation'
import YouTube, { YouTubeProps } from 'react-youtube'

const ApplyShop = () => {
  const isMd = useIsMDDown()
  const onPlayerReady: YouTubeProps['onReady'] = event => {
    // access to player in all event handlers via event.target
    event.target.pauseVideo()
  }

  const opts: YouTubeProps['opts'] = {
    height: isMd ? 'auto' : '390',
    width: isMd ? '100%' : '640',
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: false
    }
  }
  return (
    <Box
      sx={{
        width: '100%',
        padding: '120px 0',
        background: '#F6F6F3',
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <AnimatedComponent>
        <Typography
          sx={{
            width: '100%',
            maxWidth: isMd ? 'calc(100% - 32px)' : 843,
            margin: '0 auto',
            fontFamily: `'Instrument Serif'`,
            fontVariantNumeric: `'lining-nums proportional-nums'`,
            fontSize: isMd ? 32 : 64,
            lineHeight: isMd ? '41px' : '83px',
            fontWeight: 400,
            textTransform: 'uppercase',
            textAlign: 'center',
            marginBottom: '40px'
          }}
        >
          BOUNCE REAL-WORLD COLLECTIBLES MARKETPLACE SUPPORTS VARIOUS TRADING MODES
        </Typography>
      </AnimatedComponent>
      <AnimatedComponent>
        <Typography
          sx={{
            width: '100%',
            maxWidth: 360,
            margin: '0 auto',
            fontFamily: `'Inter'`,
            fontSize: 14,
            fontWeight: 400,
            textAlign: 'center',
            marginBottom: isMd ? '40px' : '80px'
          }}
        >
          In your store on Bounce, the NFTs representing your tangible products will be displayed. Tangible products are
          shipped to buyers who can access the NFTs upon receiving the products.
        </Typography>
      </AnimatedComponent>
      <AnimatedComponent>
        <Button
          variant="contained"
          href={routes.realAuction.applySeller}
          sx={{
            position: 'relative',
            height: isMd ? '37px' : '42px',
            lineHeight: isMd ? '37px' : '42px',
            borderRadius: isMd ? '37px' : '42px',
            border: '1px solid #121212',
            marginBottom: '40px',
            '&:hover': {
              '.title': {
                color: '#fff'
              },
              svg: {
                width: '40px',
                height: '14px',
                path: {
                  stroke: '#fff'
                }
              }
            }
          }}
        >
          <Typography
            className="title"
            sx={{
              marginRight: '10px',
              color: '#121212',
              fontSize: isMd ? '14px' : '16px',
              fontFamily: `'Inter'`,
              fontWeight: 500
            }}
          >
            Apply to be a seller
          </Typography>
          <LongArrowSvg />
        </Button>
      </AnimatedComponent>
      <YouTube videoId="0XjjbcT090w" opts={opts} onReady={onPlayerReady} />
    </Box>
  )
}
export default ApplyShop
