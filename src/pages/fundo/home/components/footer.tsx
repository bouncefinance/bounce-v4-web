import { Box, Typography, styled } from '@mui/material'
import BtcIcon from 'components/Fundo/assets/img/btc.png'
import { useCountDown } from 'ahooks'
import { useState, useMemo } from 'react'
import moment from 'moment'
import DiamondIcon from 'components/Fundo/assets/img/D1.png'
import DiamondBackIcon from 'components/Fundo/assets/img/D2.png'
import CenterSection from 'components/Fundo/CenterSection'
import { useIsSMDown } from 'themes/useTheme'
import EmailDialog from 'pages/fundo/detail/emailDialog'
const StarBtn = styled(Box)(({ theme }) => ({
  color: 'rgba(255, 255, 255, 0.8)',
  border: '1px solid rgba(255, 255, 255, 0.8)',
  height: '60px',
  lineHeight: '60px',
  textAlign: 'center',
  padding: '0 30px',
  cursor: 'pointer',
  borderRadius: '30px',
  margin: '0 8px',
  transition: 'all 1s',
  fontSize: '32px',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid #000',
    color: '#000',
    transform: 'scale(1.03)'
  },
  [theme.breakpoints.down('sm')]: {
    height: '30px',
    lineHeight: '30px',
    borderRadius: '15px',
    padding: '0 10px',
    fontSize: '20px'
  }
}))
const GoAuctionBtn = styled(StarBtn)(() => ({
  fontSize: '94px',
  fontStyle: 'italic',
  width: '80%',
  maxWidth: '1200px',
  height: '130px',
  lineHeight: '130px',
  textAlign: 'center',
  cursor: 'pointer',
  borderRadius: '65px',
  margin: '0 auto 120px',
  transition: 'all 1s',
  '&:hover': {
    background: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid #000',
    color: '#000',
    transform: 'scale(1)'
  }
}))
const FlickerText = styled(Typography)(({ theme }) => ({
  position: 'relative',
  paddingRight: '50px',
  '&:after': {
    content: `''`,
    display: 'block',
    width: '50px',
    height: '0',
    position: 'absolute',
    bottom: '-8px',
    borderBottom: '8px solid transparent',
    right: 0,
    animation: `typing 3s steps(16) infinite, cursor 1s infinite`
  },
  '@keyframes typing': {
    '0%': {
      height: '8px'
    },
    '100%': {
      height: 0
    }
  },
  '@keyframes cursor': {
    '50%': {
      borderBottom: '8px solid #D7D6D9'
    }
  },
  [theme.breakpoints.down('sm')]: {
    paddingRight: '15px',
    '&:after': {
      width: '10px',
      bottom: '-4px',
      borderBottom: '4px solid transparent',
      animation: `typing 3s steps(16) infinite, cursor 1s infinite`
    },
    '@keyframes typing': {
      '0%': {
        height: '4px'
      },
      '100%': {
        height: 0
      }
    },
    '@keyframes cursor': {
      '50%': {
        borderBottom: '4px solid #D7D6D9'
      }
    }
  }
}))
function SlideSection() {
  const isSm = useIsSMDown()
  const [isHover, setIsHover] = useState(false)
  const imgList = useMemo(() => {
    return isHover ? Array(40).fill(DiamondBackIcon) : Array(40).fill(DiamondIcon)
  }, [isHover])
  return (
    <Box
      sx={{
        width: '100vw',
        marginTop: isSm ? '64px' : '120px',
        marginBottom: isSm ? '80px' : '118px'
      }}
      onMouseEnter={() => {
        setIsHover(true)
      }}
      onMouseLeave={() => {
        setIsHover(false)
      }}
    >
      <Box
        sx={{
          position: 'relative',
          left: ' 0',
          width: '100%',
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'flex-start',
          alignItems: 'center',
          animation: `toLeft 18s infinite linear`,
          AnimationPlayState: 'running',
          '&:hover': {
            animationPlayState: 'paused'
          },
          '@keyframes toLeft': {
            from: {
              left: '0'
            },
            to: {
              left: 'calc(-100%)'
            }
          }
        }}
        gap={isSm ? '30px' : '64px'}
      >
        {imgList.map((item, index) => {
          return (
            <img
              src={item}
              style={{
                display: 'block',
                width: isSm ? '41px' : '140px',
                height: isSm ? '41px' : '140px',
                objectFit: 'cover',
                cursor: 'pointer'
              }}
              key={'img' + index}
              alt={item}
            />
          )
        })}
      </Box>
    </Box>
  )
}
export default function Footer() {
  const isSm = useIsSMDown()
  const [isWaiting, setIsWaiting] = useState<boolean>(true)
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate: moment('2023-07-1', 'YYYY-MM-DD').valueOf(),
    onEnd: () => {
      setIsWaiting(false)
    }
  })
  const [emailDialog, setEmailDialog] = useState(false)
  const closeDialog = () => {
    setEmailDialog(false)
  }
  const timeTypes = ['DAY', ':', 'HRS', ':', 'MIN', ':', 'SEC']
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%'
      }}
    >
      {isWaiting && (
        <Box
          style={{
            width: '100%',
            display: 'flex',
            flexFlow: 'column nowrap',
            justifyContent: 'center',
            alignItems: 'center',
            paddingBottom: isSm ? '64px' : '240px',
            borderBottom: '1px solid #626262',
            marginBottom: isSm ? '64px' : '120px'
          }}
        >
          <>
            <Typography
              sx={{
                maxWidth: isSm ? '100%' : '950px',
                margin: '0 auto',
                fontWeight: 600,
                fontSize: isSm ? '24px' : '80px',
                lineHeight: isSm ? '17px' : '58px',
                textAlign: 'center',
                marginBottom: isSm ? '16px' : '30px',
                color: 'var(--ps-text-5)'
              }}
            >
              ENGLISH AUCTION
            </Typography>
            {isSm && (
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: '24px',
                  lineHeight: '17px',
                  textAlign: 'center',
                  marginBottom: '16px',
                  color: 'var(--ps-text-5)'
                }}
              >
                COMING
              </Typography>
            )}
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                maxWidth: '950px',
                margin: '0 auto 61px',
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: isSm ? '24px' : '80px',
                  lineHeight: isSm ? '17px' : '58px',
                  textAlign: 'center',
                  color: 'var(--ps-text-5)'
                }}
              >
                {isSm ? 'S' : 'COMING S'}
              </Typography>
              <StarBtn
                onClick={() => {
                  //   setIsWaiting(false);
                  setEmailDialog(true)
                }}
              >
                STAY TUNED !
              </StarBtn>
              <FlickerText
                sx={{
                  maxWidth: isSm ? '100%' : '950px',
                  fontWeight: 600,
                  fontSize: isSm ? '24px' : '80px',
                  lineHeight: isSm ? '17px' : '58px',
                  textAlign: 'center',
                  color: 'var(--ps-text-5)'
                }}
              >
                ON
              </FlickerText>
            </Box>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  lineHeight: '24px',
                  fontSize: isSm ? '16px' : '20px',
                  color: '#fff'
                }}
              >
                Price Floor
              </Typography>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: isSm ? '16px' : '20px',
                  color: '#fff',
                  lineHeight: '24px',
                  margin: isSm ? '0 16px' : '0 40px'
                }}
              >
                |
              </Typography>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: isSm ? '16px' : '20px',
                  color: '#fff',
                  lineHeight: '24px'
                }}
              >
                25000
                <img
                  src={BtcIcon}
                  style={{
                    width: '24px',
                    height: '24px',
                    margin: '0 8px',
                    verticalAlign: 'middle'
                  }}
                  alt=""
                />
                ETH
              </Typography>
            </Box>
          </>
        </Box>
      )}
      {!isWaiting && <GoAuctionBtn>GO AUCTION!</GoAuctionBtn>}
      {countdown > 0 && (
        <Box
          sx={{
            display: 'flex',
            flexFlowL: 'row nowrap',
            justifyContent: 'center',
            alignItems: 'flex-start'
          }}
        >
          {timeTypes.map((item, index) => {
            if (item === ':') {
              return index !== timeTypes.length - 1 ? (
                <Typography
                  key={`text${index}`}
                  sx={{
                    fontFamily: `'Semibold'`,
                    fontWeight: 600,
                    fontSize: isSm ? '24px' : '80px',
                    leadingTrim: 'both',
                    textEdge: 'cap',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    fontFeatureSettings: `'pnum' on, 'lnum' on`,
                    color: '#D7D6D9',
                    margin: isSm ? '0 10px' : '0 20px'
                  }}
                >
                  :
                </Typography>
              ) : (
                ''
              )
            } else {
              return (
                <Box
                  key={`text${index}`}
                  sx={{
                    display: 'flex',
                    flexFlow: 'column nowrap',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <Typography
                    sx={{
                      fontFamily: `'Semibold'`,
                      fontWeight: 600,
                      fontSize: isSm ? '24px' : '80px',
                      leadingTrim: 'both',
                      textEdge: 'cap',
                      textAlign: 'center',
                      textTransform: 'uppercase',
                      fontFeatureSettings: `'pnum' on, 'lnum' on`,
                      color: '#D7D6D9'
                    }}
                  >
                    {index === 0 ? days : index === 2 ? hours : index === 4 ? minutes : seconds}
                  </Typography>
                  <Typography
                    sx={{
                      fontFamily: `'Semibold'`,
                      fontWeight: 600,
                      fontSize: isSm ? '16px' : '20px',
                      color: '#959595'
                    }}
                  >
                    {item}
                  </Typography>
                </Box>
              )
            }
          })}
        </Box>
      )}
      <SlideSection />
      <CenterSection
        style={{
          paddingBottom: isSm ? '24px' : '40px',
          flexFlow: isSm ? 'column nowrap' : 'row nowrap'
        }}
      >
        <>
          {!isSm && (
            <>
              <Typography
                component={'a'}
                sx={{
                  fontFamily: `'Inter'`,
                  fontWeight: 400,
                  fontSize: '13px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none'
                }}
                href={'/'}
                target={'_blank'}
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
                  sx={{
                    fontFamily: `'Inter'`,
                    fontWeight: 400,
                    fontSize: '13px',
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none'
                  }}
                  href={'/'}
                  target={'_blank'}
                >
                  Terms Of Service
                </Typography>
                <Typography
                  component={'a'}
                  sx={{
                    fontFamily: `'Inter'`,
                    fontWeight: 400,
                    fontSize: '13px',
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none'
                  }}
                  href={'/'}
                  target={'_blank'}
                >
                  Privacy Policy
                </Typography>
              </Box>
            </>
          )}
          {isSm && (
            <>
              <Box
                sx={{
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginBottom: '24px'
                }}
                gap={'32px'}
              >
                <Typography
                  component={'a'}
                  sx={{
                    fontFamily: `'Inter'`,
                    fontWeight: 400,
                    fontSize: '13px',
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none'
                  }}
                  href={'https://www.bounce.finance/termsOfService'}
                  target={'_blank'}
                >
                  Terms Of Service
                </Typography>
                <Typography
                  component={'a'}
                  sx={{
                    fontFamily: `'Inter'`,
                    fontWeight: 400,
                    fontSize: '13px',
                    color: 'rgba(255, 255, 255, 0.8)',
                    textDecoration: 'none'
                  }}
                  href={'/'}
                  target={'_blank'}
                >
                  Privacy Policy
                </Typography>
              </Box>
              <Typography
                component={'a'}
                sx={{
                  fontFamily: `'Inter'`,
                  fontWeight: 400,
                  fontSize: '13px',
                  color: 'rgba(255, 255, 255, 0.8)',
                  textDecoration: 'none',
                  textAlign: 'center'
                }}
                href={'https://www.bounce.finance/privacyPolicy'}
                target={'_blank'}
              >
                ©2023 Bounce dao Ltd. All rights reserved.
              </Typography>
            </>
          )}
        </>
      </CenterSection>
      {emailDialog && <EmailDialog handleClose={closeDialog} />}
    </Box>
  )
}
