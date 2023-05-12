import React, { useCallback } from 'react'
import { Box, Typography, styled, Button } from '@mui/material'
import BgImg from 'assets/imgs/thirdPart/digitalAssetsOffering/bg.png'
import SlogenImg from 'assets/imgs/thirdPart/digitalAssetsOffering/slogen.png'
import ProductIcon from 'assets/imgs/thirdPart/digitalAssetsOffering/productIcon.svg'
import ShadowIcon from 'assets/imgs/thirdPart/digitalAssetsOffering/shadow.png'
import TwitterIcon from 'assets/imgs/thirdPart/digitalAssetsOffering/Twitter.svg'
import TelegramIcon from 'assets/imgs/thirdPart/digitalAssetsOffering/Telegram.svg'
import MediumIcon from 'assets/imgs/thirdPart/digitalAssetsOffering/Medium.svg'
import WebsiteIcon from 'assets/imgs/thirdPart/digitalAssetsOffering/Website.svg'
import DiscordIcon from 'assets/imgs/thirdPart/digitalAssetsOffering/Discord.svg'
import { useCountDown } from 'ahooks'
import Investors1 from 'assets/imgs/thirdPart/digitalAssetsOffering/Investors1.svg'
import Investors2 from 'assets/imgs/thirdPart/digitalAssetsOffering/Investors2.svg'
import Investors3 from 'assets/imgs/thirdPart/digitalAssetsOffering/Investors3.svg'
import Investors4 from 'assets/imgs/thirdPart/digitalAssetsOffering/Investors4.svg'
import Partners1 from 'assets/imgs/thirdPart/digitalAssetsOffering/Partners1.svg'
import Partners2 from 'assets/imgs/thirdPart/digitalAssetsOffering/Partners2.svg'
import Partners3 from 'assets/imgs/thirdPart/digitalAssetsOffering/Partners3.svg'
import Partners4 from 'assets/imgs/thirdPart/digitalAssetsOffering/Partners4.svg'
import Partners5 from 'assets/imgs/thirdPart/digitalAssetsOffering/Partners5.svg'
import { useActiveWeb3React } from 'hooks'
import moment from 'moment'
import { useShowLoginModal } from 'state/users/hooks'
import { useUserInfo } from 'state/users/hooks'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'

const LabelItem = styled(Typography)(() => ({
  fontFamily: `'Inter'`,
  fontWeight: 400,
  fontSize: 16,
  textAlign: 'left',
  color: '#FAFAFA',
  opacity: 0.5,
  whiteSpace: 'nowrap'
}))
const ValueItem = styled(Typography)(() => ({
  fontFamily: `'Inter'`,
  fontWeight: 400,
  fontSize: 16,
  textAlign: 'left',
  color: '#FAFAFA'
}))
const StatuBtn = styled(Typography)(() => ({
  fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
  fontWeight: 500,
  fontSize: 16,
  height: '40px',
  lineHeight: '40px',
  textAlign: 'center',
  color: '#15D4B1',
  padding: '0 20px',
  background: '#000',
  borderRadius: '32px',
  cursor: 'pointer'
}))
const JoinBtn = styled(Button)(() => ({
  position: 'relative',
  background: '#2C4ACC',
  border: '1px solid #2C4ACC',
  color: '#fff',
  padding: '0 60px',
  height: 56,
  borderRadius: 30,
  '&:hover': {
    background: '#2C4ACC',
    border: '1px solid #2C4ACC'
  }
}))
const DigitalAssetsOffering: React.FC = ({}) => {
  const { account } = useActiveWeb3React()
  const { userInfo } = useUserInfo()
  const navigate = useNavigate()
  const showLoginModal = useShowLoginModal()
  const openLink = (link: string) => {
    link && window.open(link, '_blank')
  }
  const endDate = moment('2023-06-06', 'YYYY-MM-DD').valueOf()
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate: endDate
  })
  const handleJoin = useCallback(() => {
    if (userInfo?.email) {
      console.log('go next', userInfo?.email)
    } else {
      console.log('please binding your email')
      navigate(routes.account.myAccount + `?redirectUrl=${routes.thirdPart.digitalAssetsOffering}`)
    }
  }, [navigate, userInfo?.email])
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflowX: 'hidden',
        overflowY: 'auto',
        background: '#000'
      }}
    >
      {/* content-block */}
      <Box
        sx={{
          width: '100%',
          height: '100%',
          minHeight: 900,
          background: `url(${BgImg}) no-repeat top center / cover`,
          backgroundAttachment: 'fixed'
        }}
      >
        <Box
          sx={{
            width: '100%',
            height: '100%',
            minHeight: 900,
            // background: 'linear-gradient(180deg, #000514 0%, #000000 100%)',
            padding: '115px 0 115px'
          }}
        >
          {/* title */}
          <Typography
            sx={{
              fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
              fontWeight: 500,
              fontSize: 40,
              textAlign: 'center',
              marginBottom: 20,
              color: '#fff'
            }}
          >
            IDO：Initial Digital Assets Offering
          </Typography>
          {/* subTitle */}
          <Typography
            sx={{
              fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
              fontWeight: 500,
              fontSize: 16,
              textAlign: 'center',
              color: '#fff',
              marginBottom: 80
            }}
          >
            Be part of the new token launch on Bounce
          </Typography>
          {/* auction card */}
          <Box
            sx={{
              width: 1340,
              minHeight: 400,
              background: `rgba(0, 0, 0, 0.08)`,
              backdropFilter: `blur(10px)`,
              borderRadius: `0px 32px 32px 32px`,
              display: 'flex',
              flexFlow: 'row nowrap',
              margin: '0 auto'
            }}
            gap={67}
            mb={40}
          >
            {/* left info block */}
            <Box
              sx={{
                position: 'relative',
                width: 480,
                height: 380,
                borderRadius: 32,
                overflow: 'hidden',
                background: `url(${ShadowIcon}) no-repeat bottom center`
              }}
            >
              <img
                src={SlogenImg}
                style={{
                  width: '100%'
                }}
                alt=""
                srcSet=""
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 29,
                  left: 34,
                  width: 100,
                  height: 100,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  background: '#fff',
                  borderRadius: '50%'
                }}
              >
                <img
                  src={ProductIcon}
                  style={{
                    display: 'block',
                    width: 78
                  }}
                  alt=""
                  srcSet=""
                />
              </Box>
              <Box
                sx={{
                  padding: '20px 40px'
                }}
              >
                <Typography
                  sx={{
                    fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
                    fontWeight: 500,
                    fontSize: 24,
                    textAlign: 'left',
                    marginBottom: 20,
                    color: '#FAFAFA'
                  }}
                >
                  PoseiSwap
                </Typography>
                <Typography
                  sx={{
                    fontFamily: `'Inter'`,
                    fontWeight: 500,
                    fontSize: 14,
                    textAlign: 'left',
                    marginBottom: 31,
                    color: '#FAFAFA'
                  }}
                >
                  PoseiSwap is the very first DEX on the Nautilus Chain,built to provide the best trading experience for
                  users,liquidity providers and project developers.
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    flexFlow: 'row nowrap',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    img: {
                      cursor: 'pointer'
                    }
                  }}
                  gap={31}
                >
                  <img src={TwitterIcon} alt="" srcSet="" onClick={() => openLink('https://twitter.com/poseiswap')} />
                  <img src={TelegramIcon} alt="" srcSet="" onClick={() => openLink('https://t.me/PoseiSwapChat')} />
                  <img src={MediumIcon} alt="" srcSet="" onClick={() => openLink('https://poseiswap.medium.com/')} />
                  <img src={WebsiteIcon} alt="" srcSet="" onClick={() => openLink('https://www.poseiswap.xyz/')} />
                  <img
                    src={DiscordIcon}
                    alt=""
                    srcSet=""
                    onClick={() => openLink('https://discord.com/invite/rWdHnb45UG')}
                  />
                </Box>
              </Box>
            </Box>
            {/* right info block */}
            <Box
              sx={{
                flex: 1,
                position: 'relative',
                padding: '40px 0'
              }}
            >
              <LabelItem
                sx={{
                  marginBottom: 10
                }}
              >
                Pre-Sale starting in:
              </LabelItem>
              {countdown > 0 ? (
                <Typography
                  variant="body1"
                  color="#FAFAFA"
                  component="span"
                  sx={{
                    fontFamily: `'Inter'`,
                    fontWeight: 500,
                    fontSize: 36,
                    '.small': {
                      fontSize: 16,
                      margin: '0 10px'
                    }
                  }}
                >
                  &nbsp;{days}
                  <span className="small">D</span>
                  {hours}
                  <span className="small">H</span>
                  {minutes}
                  <span className="small">M</span>
                  {seconds}
                  <span className="small">S</span>
                </Typography>
              ) : (
                <Typography
                  sx={{
                    fontFamily: `'Inter'`,
                    fontWeight: 500,
                    fontSize: 36
                  }}
                >
                  --
                </Typography>
              )}
              <Box
                sx={{
                  display: 'flex',
                  flexFlow: 'row nowrap'
                }}
                mt={30}
                gap={80}
              >
                <Box sx={{}}>
                  <LabelItem
                    sx={{
                      marginBottom: 10
                    }}
                  >
                    IDO Status:
                  </LabelItem>
                  <ValueItem>Registration</ValueItem>
                </Box>
                <Box sx={{}}>
                  <LabelItem
                    sx={{
                      marginBottom: 10
                    }}
                  >
                    Token:
                  </LabelItem>
                  <ValueItem>$POSE</ValueItem>
                </Box>
                <Box sx={{}}>
                  <LabelItem
                    sx={{
                      marginBottom: 10
                    }}
                  >
                    Estimated IDO Date:
                  </LabelItem>
                  <ValueItem>2023.xx.xx</ValueItem>
                </Box>
                <Box sx={{}}>
                  <LabelItem
                    sx={{
                      marginBottom: 10
                    }}
                  >
                    Waiting List:
                  </LabelItem>
                  <ValueItem>15435</ValueItem>
                </Box>
              </Box>
              {/* Investors */}
              <LabelItem
                sx={{
                  margin: '30px 0 20px'
                }}
              >
                Investors
              </LabelItem>
              <Box
                sx={{
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  alignItems: 'center'
                }}
                mt={30}
                gap={30}
              >
                <img
                  src={Investors1}
                  style={{
                    height: 20
                  }}
                  alt=""
                  srcSet=""
                />
                <img
                  src={Investors2}
                  style={{
                    height: 16
                  }}
                  alt=""
                  srcSet=""
                />
                <img
                  src={Investors3}
                  style={{
                    height: 20
                  }}
                  alt=""
                  srcSet=""
                />
                <img
                  src={Investors4}
                  style={{
                    height: 20
                  }}
                  alt=""
                  srcSet=""
                />
              </Box>
              {/* Partners */}
              <LabelItem
                sx={{
                  margin: '30px 0 20px'
                }}
              >
                Partners
              </LabelItem>
              <Box
                sx={{
                  display: 'flex',
                  flexFlow: 'row nowrap',
                  alignItems: 'center'
                }}
                mt={80}
                gap={30}
              >
                <img
                  src={Partners1}
                  style={{
                    height: 20
                  }}
                  alt=""
                  srcSet=""
                />
                <img
                  src={Partners2}
                  style={{
                    height: 16
                  }}
                  alt=""
                  srcSet=""
                />
                <img
                  src={Partners3}
                  style={{
                    height: 18
                  }}
                  alt=""
                  srcSet=""
                />
                <img
                  src={Partners4}
                  style={{
                    height: 20
                  }}
                  alt=""
                  srcSet=""
                />
                <img
                  src={Partners5}
                  style={{
                    height: 22
                  }}
                  alt=""
                  srcSet=""
                />
              </Box>
              <StatuBtn
                sx={{
                  position: 'absolute',
                  right: 20,
                  top: 20
                }}
              >
                Upcoming IDO
              </StatuBtn>
            </Box>
          </Box>
          {/* join btn */}
          <Box
            sx={{
              display: 'flex',
              flexFlow: 'column nowrap',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 40
            }}
          >
            {account ? (
              <>
                <JoinBtn onClick={() => handleJoin()}>Join waiting list</JoinBtn>
                {!userInfo?.email && (
                  <Typography
                    sx={{
                      fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
                      fontWeight: 500,
                      fontSize: 14,
                      textAlign: 'center',
                      color: '#e3e3e3',
                      margin: '10px auto 0'
                    }}
                  >
                    you need to binding your email
                  </Typography>
                )}
              </>
            ) : (
              <JoinBtn onClick={showLoginModal}>Connect Wallet</JoinBtn>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

export default DigitalAssetsOffering
