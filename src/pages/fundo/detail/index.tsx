import React from 'react'
import { Box, Typography, Grid, useTheme } from '@mui/material'
import CenterSection from 'components/Fundo/CenterSection'
import NecklaceJson from 'components/Fundo/assets/lottie/animatinDm4.json'
import LogoIcon from 'components/Fundo/assets/img/detail/logo.png'
import ShareIcon from 'components/Fundo/assets/img/share.png'
import { useIsSMDown } from 'themes/useTheme'
import ReactCopyToClipboard from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'
require('@lottiefiles/lottie-player')
import BgImg from 'components/Fundo/assets/img/back.png'

const TokenDetail: React.FC = () => {
  const isSm = useIsSMDown()
  const theme = useTheme()
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        minHeight: `calc(100vh - ${theme.height.header})`,
        display: 'flex',
        flexFlow: isSm ? 'column nowrap' : 'row nowrap',
        justifyContent: isSm ? 'flex-start' : 'center',
        alignItems: 'center',
        padding: isSm ? '64px 40px 0' : '',
        overflowY: 'auto',
        overflowX: 'hidden',
        backgroundColor: '#000',
        backgroundImage: `url(${BgImg})`,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'auto 100%',
        backgroundPosition: 'top center',
        backgroundAttachment: 'fixed'
      }}
    >
      {isSm && (
        <>
          <Box
            sx={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'flex-start',
              alignItems: 'flex-start'
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: '24px',
                color: 'var(--ps-text-5)'
              }}
              mb={'24px'}
            >
              TOKEN DETAILS
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '14px',
                color: 'var(--ps-text-2)'
              }}
              mb={'12px'}
            >
              CONTRACT ADRESS
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '14px',
                wordBreak: 'break-all',
                color: 'var(--ps-text-5)'
              }}
              mb={'24px'}
            >
              0xEBf19415d94be89A1d692F82af391685dC1Bff79
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '14px',
                color: 'var(--ps-text-2)'
              }}
              mb={'12px'}
            >
              NETWORK
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '24px',
                color: 'var(--ps-text-5)'
              }}
              mb={'24px'}
            >
              <img
                src={LogoIcon}
                style={{
                  position: 'relative',
                  top: '-3px',
                  display: 'inline-block',
                  width: '20px',
                  height: '20px',
                  marginRight: '12px',
                  verticalAlign: 'middle',
                  cursor: 'pointer'
                }}
                alt=""
              />
              BNB Chain
              <ReactCopyToClipboard text={window.location.href} onCopy={() => toast.success('Successfully copied')}>
                <img
                  src={ShareIcon}
                  style={{
                    position: 'relative',
                    top: '-3px',
                    display: 'inline-block',
                    width: '20px',
                    height: '20px',
                    marginLeft: '12px',
                    verticalAlign: 'middle',
                    cursor: 'pointer'
                  }}
                  alt=""
                />
              </ReactCopyToClipboard>
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                color: 'var(--ps-text-2)',
                fontSize: '14px'
              }}
              mb={'12px'}
            >
              TOKEN ID
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '14px',
                color: 'var(--ps-text-5)'
              }}
              mb={'24px'}
            >
              100
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                color: 'var(--ps-text-2)',
                fontSize: '16px'
              }}
              mb={'12px'}
            >
              TOKEN TYPE
            </Typography>
            <Typography
              sx={{
                fontWeight: 500,
                fontSize: '16px',
                color: 'var(--ps-text-5)'
              }}
            >
              ERC721
            </Typography>
          </Box>
          <Box
            sx={{
              width: '100%',
              height: '20vh',
              display: 'flex',
              flexFlow: 'row nowrap',
              justifyContent: 'flex-end'
            }}
            mb={'80px'}
          >
            <lottie-player
              autoplay={true}
              src={JSON.stringify(NecklaceJson)}
              loop={true}
              style={{
                width: '227px',
                height: 'auto',
                cursor: 'pointer',
                marginRight: '-50px'
              }}
            ></lottie-player>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'center',
              paddingBottom: '24px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'center',
                alignItems: 'center'
              }}
              gap={'32px'}
              mb={'24px'}
            >
              <Typography
                component={'a'}
                href={'/'}
                target={'_blank'}
                style={{
                  textDecoration: 'none',
                  fontSize: '13px',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}
              >
                Terms Of Service
              </Typography>
              <Typography
                component={'a'}
                href={'/'}
                target={'_blank'}
                style={{
                  textDecoration: 'none',
                  fontSize: '13px',
                  color: 'rgba(255, 255, 255, 0.8)'
                }}
              >
                Privacy Policy
              </Typography>
            </Box>
            <Typography
              component={'a'}
              href={'/'}
              target={'_blank'}
              style={{
                textDecoration: 'none',
                fontSize: '13px',
                color: 'rgba(255, 255, 255, 0.8)'
              }}
            >
              ©2023 Bounce dao Ltd. All rights reserved.
            </Typography>
          </Box>
        </>
      )}
      {!isSm && (
        <>
          <CenterSection
            style={{
              flexFlow: isSm ? 'column nowrap' : 'row nowrap',
              justifyContent: 'center',
              paddingLeft: '120px'
            }}
          >
            <>
              <Grid maxWidth={800} container rowSpacing={'24px'}>
                <Grid item xs={12}>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: '44px',
                      color: 'var(--ps-text-5)'
                    }}
                  >
                    TOKEN DETAILS
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: '16px',
                      color: 'var(--ps-text-2)'
                    }}
                  >
                    CONTRACT ADRESS
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: '16px',
                      color: 'var(--ps-text-5)'
                    }}
                  >
                    0xEBf19415d94be89A1d692F82af391685dC1Bff79
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: '16px',
                      color: 'var(--ps-text-2)'
                    }}
                  >
                    NETWORK
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: '16px',
                      lineHeight: '24px',
                      color: 'var(--ps-text-5)'
                    }}
                  >
                    <img
                      src={LogoIcon}
                      style={{
                        position: 'relative',
                        top: '-3px',
                        display: 'inline-block',
                        width: '20px',
                        height: '20px',
                        marginRight: '12px',
                        verticalAlign: 'middle',
                        cursor: 'pointer'
                      }}
                      alt=""
                    />
                    BNB Chain
                    <ReactCopyToClipboard
                      text={window.location.href}
                      onCopy={() => toast.success('Successfully copied')}
                    >
                      <img
                        src={ShareIcon}
                        style={{
                          position: 'relative',
                          top: '-3px',
                          display: 'inline-block',
                          width: '20px',
                          height: '20px',
                          marginLeft: '12px',
                          verticalAlign: 'middle',
                          cursor: 'pointer'
                        }}
                        alt=""
                      />
                    </ReactCopyToClipboard>
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: '16px',
                      color: 'var(--ps-text-2)'
                    }}
                  >
                    TOKEN ID
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: '16px',
                      color: 'var(--ps-text-5)'
                    }}
                  >
                    100
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: '16px',
                      color: 'var(--ps-text-2)'
                    }}
                  >
                    TOKEN TYPE
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Typography
                    sx={{
                      fontWeight: 500,
                      fontSize: '16px',
                      color: 'var(--ps-text-5)'
                    }}
                  >
                    ERC721
                  </Typography>
                </Grid>
              </Grid>
              <Box
                sx={{
                  flex: 1,
                  maxWidth: '500px'
                }}
              >
                <lottie-player
                  autoplay={true}
                  src={JSON.stringify(NecklaceJson)}
                  loop={true}
                  style={{
                    width: '380px',
                    height: '380px',
                    cursor: 'pointer'
                  }}
                ></lottie-player>
              </Box>
            </>
          </CenterSection>
          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%'
            }}
          >
            <CenterSection
              style={{
                height: '60px'
              }}
            >
              <>
                <Typography
                  component={'a'}
                  href={'/'}
                  target={'_blank'}
                  style={{
                    textDecoration: 'none',
                    color: 'rgba(255, 255, 255, 0.8)'
                  }}
                >
                  ©2023 Bounce dao Ltd. All rights reserved.
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                  }}
                  gap={'40px'}
                >
                  <Typography
                    component={'a'}
                    href={'/'}
                    target={'_blank'}
                    style={{
                      textDecoration: 'none',
                      color: 'rgba(255, 255, 255, 0.8)'
                    }}
                  >
                    Terms Of Service
                  </Typography>
                  <Typography
                    component={'a'}
                    href={'/'}
                    target={'_blank'}
                    style={{
                      textDecoration: 'none',
                      color: 'rgba(255, 255, 255, 0.8)'
                    }}
                  >
                    Privacy Policy
                  </Typography>
                </Box>
              </>
            </CenterSection>
          </Box>
        </>
      )}
    </Box>
  )
}

export default TokenDetail
