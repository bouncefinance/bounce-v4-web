import { Box, Grid, Typography } from '@mui/material'
import P1 from 'assets/imgs/realworldShop/p1.png'
import P12 from 'assets/imgs/realworldShop/p1_2.png'
import P2 from 'assets/imgs/realworldShop/p2.png'
import EthIcon2 from 'assets/imgs/realworldShop/ethIcon.png'
import { useIsMDDown } from 'themes/useTheme'
import { useEffect } from 'react'
import { ReactComponent as LogoSvg } from 'assets/imgs/realworldShop/logo1.svg'
import { ReactComponent as Logo2Svg } from 'assets/imgs/realworldShop/logo2.svg'
import Logo3 from 'assets/imgs/realworldShop/logo3.png'
import TypeWriterEffect from 'react-typewriter-effect'
import ShakeImgs from './shakeImgs'
import { routes } from 'constants/routes'
import { useNavigate } from 'react-router-dom'
const ShopList = () => {
  const isMd = useIsMDDown()
  const navigate = useNavigate()
  useEffect(() => {
    document.getElementById('body')?.setAttribute('style', 'overflow-x:visible;')
    document.getElementById('app')?.setAttribute('style', 'overflow-x:visible;')
    return () => {
      document.getElementById('body')?.removeAttribute('style')
      document.getElementById('app')?.removeAttribute('style')
    }
  }, [])
  const linkTo = (route: string) => {
    navigate(route)
  }
  return (
    <>
      <Box
        sx={{
          position: 'relative'
        }}
      >
        <Grid container rowGap={0} columnGap={0}>
          <Grid item xs={12} md={6} lg={6}>
            <Box
              sx={{
                width: '100%',
                height: isMd ? 'auto' : '100%',
                padding: isMd ? '30px 16px' : '100px 72px 60px',
                boxSizing: 'border-box',
                display: 'flex',
                flexFlow: 'column nowrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  width: '100%',
                  minHeight: isMd ? '109px' : ''
                }}
              >
                <Typography
                  sx={{
                    position: isMd ? 'relative' : 'sticky',
                    top: isMd ? 0 : 76,
                    color: '#B5E529',
                    fontFamily: `'Instrument Serif'`,
                    fontSize: isMd ? 40 : 90,
                    lineHeight: isMd ? '40px' : '90px',
                    fontWeight: 400,
                    cursor: 'pointer'
                  }}
                  onClick={() => linkTo(routes.realAuction.bounceShop)}
                  mb={isMd ? 10 : 30}
                >
                  BOUNCE
                </Typography>
                <Box
                  sx={{
                    position: isMd ? 'relative' : 'sticky',
                    top: isMd ? 0 : 166,
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => linkTo(routes.realAuction.bounceShop)}
                  gap={isMd ? '4px' : '12px'}
                >
                  <Box
                    sx={{
                      display: 'inline-block',
                      color: '#626262',
                      textAlign: 'center',
                      padding: '0 12px',
                      fontFamily: `'Inter'`,
                      fontSize: 12,
                      borderRadius: '25px',
                      background: '#D7D6D9',
                      backdropFilter: 'blur(2px)'
                    }}
                  >
                    Upcoming
                  </Box>
                  <img
                    style={{
                      width: isMd ? 21 : 25
                    }}
                    src={EthIcon2}
                    alt=""
                    srcSet=""
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  height: isMd ? 'auto' : '24px',
                  display: 'flex',
                  flexFlow: isMd ? 'column nowrap' : 'row nowrap',
                  justifyContent: isMd ? 'flex-end' : 'space-between',
                  alignItems: isMd ? 'flex-end' : 'center'
                }}
                gap={isMd ? 12 : 0}
              >
                <Typography
                  sx={{
                    color: '#626262',
                    fontFamily: `'Inter'`,
                    fontSize: isMd ? 12 : 13
                  }}
                >
                  Real World Collectibles | English auction
                </Typography>
                {isMd ? (
                  <Logo2Svg />
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      flexFlow: 'row nowrap',
                      justifyContent: 'flex-end',
                      alignItems: 'center'
                    }}
                  >
                    <LogoSvg
                      style={{
                        marginRight: isMd ? '4px' : '12px'
                      }}
                    />
                    <Typography
                      sx={{
                        color: '#20201E',
                        fontFamily: `'Helvetica Neue'`,
                        fontSize: 18,
                        fontWeight: 500
                      }}
                    >
                      Bounce
                    </Typography>
                  </Box>
                )}
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <ShakeImgs
              list={[P1, P12]}
              style={{
                width: '100%',
                objectFit: 'cover'
              }}
              handleClick={() => linkTo(routes.realAuction.bounceShop)}
            />
          </Grid>
        </Grid>
        <TypeWriterEffect
          startDelay={100}
          text="Diamond Hand Necklace"
          hideCursorAfterText={true}
          typeSpeed={100}
          cursorColor={'transparent'}
          textStyle={{
            fontFamily: `'Public Sans'`,
            position: 'absolute',
            fontSize: isMd ? 22 : 36,
            color: isMd ? '#fff' : '#121212',
            bottom: isMd ? '20px' : '50%',
            left: '50%',
            transform: 'translate3d(-50%, 50%, 0)'
          }}
        />
      </Box>
      <Box
        sx={{
          position: 'relative'
        }}
      >
        <Grid container rowGap={0} columnGap={0}>
          <Grid item xs={12} md={6} lg={6}>
            <Box
              sx={{
                width: '100%',
                height: isMd ? 'auto' : '100%',
                padding: isMd ? '30px 16px' : '100px 72px 60px',
                boxSizing: 'border-box',
                display: 'flex',
                flexFlow: 'column nowrap',
                justifyContent: 'space-between',
                alignItems: 'flex-start'
              }}
            >
              <Box
                sx={{
                  flex: 1,
                  width: '100%',
                  minHeight: isMd ? '109px' : ''
                }}
              >
                <Typography
                  sx={{
                    position: isMd ? 'relative' : 'sticky',
                    top: isMd ? 0 : 76,
                    color: '#20201E',
                    fontFamily: `'Instrument Serif'`,
                    fontSize: isMd ? 40 : 90,
                    lineHeight: isMd ? '40px' : '90px',
                    fontWeight: 400,
                    cursor: 'pointer'
                  }}
                  onClick={() => linkTo(routes.realAuction.foundoShop)}
                  mb={isMd ? 10 : 30}
                >
                  FOUNDO
                </Typography>
                <Box
                  sx={{
                    position: isMd ? 'relative' : 'sticky',
                    top: isMd ? 0 : 166,
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                  onClick={() => linkTo(routes.realAuction.foundoShop)}
                  gap={isMd ? '4px' : '12px'}
                >
                  <Box
                    sx={{
                      display: 'inline-block',
                      color: '#626262',
                      textAlign: 'center',
                      padding: '0 12px',
                      fontFamily: `'Inter'`,
                      fontSize: 12,
                      borderRadius: '25px',
                      background: '#D7D6D9',
                      backdropFilter: 'blur(2px)'
                    }}
                  >
                    Upcoming
                  </Box>
                  <img
                    style={{
                      width: isMd ? 21 : 25
                    }}
                    src={EthIcon2}
                    alt=""
                    srcSet=""
                  />
                </Box>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  flexFlow: 'column nowrap',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-end'
                }}
              >
                <Typography
                  sx={{
                    color: '#626262',
                    fontFamily: `'Inter'`,
                    fontSize: 13
                  }}
                >
                  Since then, Space Yacht has used the Twerk Skeleton design on both apparel and live visuals at their
                  events. Once Space Yacht started producing NFTs, the legend of the Twerk Skeleton took on a whole new
                  life of its own.
                </Typography>
                <img
                  src={Logo3}
                  style={{
                    width: isMd ? '85px' : '113px',
                    marginTop: isMd ? '12px' : '20px'
                  }}
                  alt=""
                  srcSet=""
                />
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={6}>
            <ShakeImgs
              list={[P2]}
              style={{
                width: '100%',
                objectFit: 'cover'
              }}
              handleClick={() => linkTo(routes.realAuction.foundoShop)}
            />
          </Grid>
        </Grid>
        <TypeWriterEffect
          startDelay={100}
          cursorColor={'transparent'}
          text="Foundo Necklace"
          hideCursorAfterText={true}
          typeSpeed={100}
          textStyle={{
            fontFamily: `'Public Sans'`,
            position: 'absolute',
            fontSize: isMd ? 22 : 36,
            color: isMd ? '#fff' : '#121212',
            bottom: isMd ? '20px' : '50%',
            left: '50%',
            transform: 'translate3d(-50%, 50%, 0)'
          }}
        />
      </Box>
    </>
  )
}
export default ShopList
