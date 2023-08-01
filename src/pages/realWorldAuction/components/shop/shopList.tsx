import { Box, Grid, Typography } from '@mui/material'
import P1 from 'assets/imgs/realworldShop/p1.png'
import P2 from 'assets/imgs/realworldShop/p2.png'
import EthIcon2 from 'assets/imgs/realworldShop/ethIcon.png'
import { useIsMDDown } from 'themes/useTheme'
import { useEffect } from 'react'
import { ReactComponent as LogoSvg } from 'assets/imgs/realworldShop/logo1.svg'
import { ReactComponent as Logo2Svg } from 'assets/imgs/realworldShop/logo2.svg'
import Logo3 from 'assets/imgs/realworldShop/logo3.png'

const ShopList = () => {
  const isMd = useIsMDDown()
  useEffect(() => {
    document.getElementById('body')?.setAttribute('style', 'overflow-x:visible;')
    document.getElementById('app')?.setAttribute('style', 'overflow-x:visible;')
    return () => {
      document.getElementById('body')?.removeAttribute('style')
      document.getElementById('app')?.removeAttribute('style')
    }
  }, [])
  return (
    <Box>
      <Grid container rowGap={0} columnGap={0}>
        <Grid item xs={6}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              padding: '100px 72px 60px',
              boxSizing: 'border-box',
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}
          >
            <Box
              sx={{
                flex: 1
              }}
            >
              <Typography
                sx={{
                  position: 'sticky',
                  top: 76,
                  color: '#B5E529',
                  fontFamily: `'Instrument Serif'`,
                  fontSize: '90px',
                  lineHeight: '90px',
                  fontWeight: 400
                }}
                mb={30}
              >
                BOUNCE
              </Typography>
              <Box
                sx={{
                  position: 'sticky',
                  top: 166,
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}
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
                height: '24px',
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <Typography
                sx={{
                  color: '#626262',
                  fontFamily: `'Inter'`,
                  fontSize: 13
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
        <Grid item xs={6}>
          <img
            style={{
              width: '100%',
              display: 'block',
              objectFit: 'cover'
            }}
            src={P1}
            alt=""
          />
        </Grid>
      </Grid>
      <Grid container rowGap={0} columnGap={0}>
        <Grid item xs={6}>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              padding: '100px 72px 60px',
              boxSizing: 'border-box',
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'space-between',
              alignItems: 'flex-start'
            }}
          >
            <Box
              sx={{
                flex: 1
              }}
            >
              <Typography
                sx={{
                  position: 'sticky',
                  top: 76,
                  color: '#20201E',
                  fontFamily: `'Instrument Serif'`,
                  fontSize: '90px',
                  lineHeight: '90px',
                  fontWeight: 400
                }}
                mb={30}
              >
                FOUNDO
              </Typography>
              <Box
                sx={{
                  position: 'sticky',
                  top: 166,
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}
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
        <Grid item xs={6}>
          <img
            style={{
              width: '100%',
              display: 'block',
              objectFit: 'cover'
            }}
            src={P2}
            alt=""
          />
        </Grid>
      </Grid>
    </Box>
  )
}
export default ShopList
