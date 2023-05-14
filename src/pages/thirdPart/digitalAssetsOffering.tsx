import React, { useCallback, useState } from 'react'
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
import { useRequest } from 'ahooks'
import { joinWaiting, checkWaiting } from 'api/thirdPart'
import TipsDialogIcon from 'assets/imgs/thirdPart/digitalAssetsOffering/tipsDialogIcon.png'
import TwitterSvg from 'assets/imgs/thirdPart/digitalAssetsOffering/TwitterIcon.svg'
import DiscordSvg from 'assets/imgs/thirdPart/digitalAssetsOffering/DiscordIcon.svg'
import TelegramSvg from 'assets/imgs/thirdPart/digitalAssetsOffering/TelegramIcon.svg'
import ReadySvg from 'assets/imgs/thirdPart/digitalAssetsOffering/ready.svg'

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
const TabsBtn = styled(Button)(() => ({
  position: 'relative',
  background: '#fff',
  border: '1px solid #fff',
  color: '#000',
  padding: '0 30px',
  height: 32,
  lineHeight: '32px',
  borderRadius: 30,
  fontFamily: `'Montserrat'`,
  '&:hover': {
    background: '#fff',
    border: '1px solid #fff',
    color: '#000'
  },
  '&:active': {
    background: '#fff',
    border: '1px solid #fff',
    color: '#000'
  },
  '&:disabled': {
    border: '1px solid #000',
    background: '#000',
    color: '#fff'
  }
}))
export enum DialogStep {
  'Close' = 0,
  'Connect' = 1,
  'Confirm' = 2,
  'Success' = 3
}
const DigitalAssetsOffering: React.FC = ({}) => {
  const { account } = useActiveWeb3React()
  const { userInfo, token } = useUserInfo()
  const navigate = useNavigate()
  const [dialogStep, setDialogStep] = useState<number>(DialogStep.Close)
  const showLoginModal = useShowLoginModal()
  const { data: checkJoinData } = useRequest(
    async () => {
      const resp = await checkWaiting()
      return {
        ranking: resp?.data?.ranking || 0,
        timestamp: resp?.data?.timestamp || 0,
        isJoin: !!resp?.data?.isJoin
      }
    },
    {
      refreshDeps: [dialogStep, token]
    }
  )
  const openLink = (link: string) => {
    link && window.open(link, '_blank')
  }
  const endDate = moment('2023-06-06', 'YYYY-MM-DD').valueOf()
  const [countdown, { days, hours, minutes, seconds }] = useCountDown({
    targetDate: endDate
  })
  const handleJoin = useCallback(async () => {
    if (checkJoinData?.isJoin) {
      setDialogStep(DialogStep.Success)
      return
    }
    if (userInfo?.email) {
      const { code, msg } = await joinWaiting()
      if (code === 200 && msg === 'ok') {
        setDialogStep(DialogStep.Success)
      }
    } else {
      navigate(routes.account.myAccount + `?redirectUrl=${routes.thirdPart.digitalAssetsOffering}`)
    }
  }, [checkJoinData?.isJoin, navigate, userInfo?.email])
  const handleConfirm = useCallback(() => {
    if (checkJoinData?.isJoin) {
      setDialogStep(DialogStep.Success)
      return
    }
    if (userInfo?.email) {
      setDialogStep(DialogStep.Confirm)
    } else {
      navigate(routes.loginBase + `?redirect=${routes.thirdPart.digitalAssetsOffering}`)
    }
  }, [checkJoinData?.isJoin, navigate, userInfo?.email])
  const SuccessDialog = () => {
    const list = [
      {
        title: 'Twitter',
        logo: TwitterSvg,
        link: 'https://galxe.com/poseiswap/campaign/GCrUTUfLsC'
      },
      {
        title: 'Discord',
        logo: DiscordSvg,
        link: 'https://galxe.com/poseiswap/campaign/GCrUTUfLsC'
      },
      {
        title: 'Telegram',
        logo: TelegramSvg,
        link: 'https://galxe.com/poseiswap/campaign/GCrUTUfLsC'
      }
    ]
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            background: '#000000',
            opacity: 0.7
          }}
          onClick={() => {
            setDialogStep(DialogStep.Close)
          }}
        ></Box>
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate3D(-50%, -50%, 0)',
            width: 480,
            background: '#fff',
            borderRadius: 32,
            padding: '0 0 32px'
          }}
        >
          <img
            src={TipsDialogIcon}
            style={{
              width: '100%',
              marginBottom: 20
            }}
            alt=""
            srcSet=""
          />
          <Typography
            sx={{
              fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
              fontWeight: 500,
              fontSize: 24,
              marginBottom: 10,
              textAlign: 'center'
            }}
          >
            Registered Successfully
          </Typography>
          <Typography
            sx={{
              fontFamily: `'Inter'`,
              fontWeight: 400,
              fontSize: 16,
              marginBottom: 30,
              textAlign: 'center',
              padding: '0 30px'
            }}
          >
            You are No.
            <span
              style={{
                color: '#2C4ACC',
                fontWeight: 700
              }}
            >
              {checkJoinData?.ranking > 0 ? checkJoinData?.ranking : 'TBD'}
            </span>{' '}
            of the waiting list
          </Typography>
          <Box
            sx={{
              padding: '0 40px'
            }}
            mb={10}
          >
            <Typography
              sx={{
                fontFamily: `'Inter'`,
                fontWeight: 600,
                fontSize: 16,
                color: '#000',
                verticalAlign: 'middle',
                marginBottom: '10px'
              }}
            >
              Wallet Address
            </Typography>
            <Typography
              sx={{
                fontFamily: `'Inter'`,
                fontWeight: 600,
                fontSize: 14,
                color: '#2C4ACC'
              }}
            >
              {account}
            </Typography>
          </Box>
          <Box
            sx={{
              padding: '0 40px'
            }}
            mb={10}
          >
            <Typography
              sx={{
                fontFamily: `'Inter'`,
                fontWeight: 600,
                fontSize: 16,
                color: '#000',
                verticalAlign: 'middle',
                marginBottom: '10px'
              }}
            >
              Email
            </Typography>
            <Typography
              sx={{
                fontFamily: `'Inter'`,
                fontWeight: 600,
                fontSize: 14,
                color: '#2C4ACC'
              }}
            >
              {userInfo?.email || '--'}
            </Typography>
          </Box>
          <Typography
            sx={{
              fontFamily: `'Inter'`,
              fontWeight: 600,
              fontSize: 16,
              marginBottom: 30,
              textAlign: 'center',
              padding: '0 30px'
            }}
          >
            Congrats! Claim now all 3 Galxe NFTs below to be whitelisted for a unique lottery pool (optional):
          </Typography>
          {list.map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  padding: '0 40px'
                }}
                mb={20}
              >
                <Typography
                  sx={{
                    fontFamily: `'Inter'`,
                    fontWeight: 600,
                    fontSize: 16,
                    color: '#000',
                    verticalAlign: 'middle',
                    marginBottom: '10px'
                  }}
                >
                  <img
                    src={item.logo}
                    style={{
                      width: 24,
                      marginRight: 16,
                      verticalAlign: 'middle'
                    }}
                    alt=""
                    srcSet=""
                  />
                  {item.title}
                </Typography>
                <Typography
                  component={'a'}
                  sx={{
                    fontFamily: `'Inter'`,
                    fontWeight: 600,
                    fontSize: 14,
                    color: '#2C4ACC'
                  }}
                  href={item.link}
                  target={'_blank'}
                >
                  {item.link}
                </Typography>
              </Box>
            )
          })}
          <Box
            sx={{
              width: 400,
              height: 64,
              lineHeight: '64px',
              background: 'rgba(44, 74, 204, 0.1)',
              textAlign: 'center',
              borderRadius: 10,
              margin: '0 auto',
              fontFamily: `'Inter'`,
              fontWeight: 700,
              color: '#000000'
            }}
          >
            Registration starts in:{' '}
            <span
              style={{
                color: '#2C4ACC'
              }}
            >
              {checkJoinData?.timestamp ? moment(Number(checkJoinData?.timestamp * 1000)).format('YYYY-MM-DD') : 'TBD'}
            </span>
          </Box>
        </Box>
      </Box>
    )
  }
  const ConfirmDialog = () => {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            background: '#000000',
            opacity: 0.7
          }}
          onClick={() => {
            setDialogStep(DialogStep.Close)
          }}
        ></Box>
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate3D(-50%, -50%, 0)',
            width: 580,
            background: '#fff',
            borderRadius: 32,
            overflow: 'hidden',
            padding: '30px 40px 32px'
          }}
        >
          <Typography
            sx={{
              fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
              fontWeight: 500,
              fontSize: 24,
              marginBottom: 20,
              textAlign: 'left'
            }}
          >
            Join waiting list now!
          </Typography>
          <Typography
            sx={{
              fontFamily: `'Inter'`,
              fontWeight: 400,
              fontSize: 14,
              marginBottom: 30,
              textAlign: 'left'
            }}
          >
            Sign up now and unlock exclusive benefits and opportunities.Secure your spot in the IDO waiting list and be
            part of the next big thing!
          </Typography>
          <Box mb={10}>
            <Typography
              sx={{
                fontFamily: `'Inter'`,
                fontWeight: 600,
                fontSize: 16,
                color: '#000',
                verticalAlign: 'middle',
                marginBottom: 20
              }}
            >
              1.Connected wallet
            </Typography>
            <Box
              sx={{
                height: 64,
                padding: '0 33px',
                background: '#E7E7E8',
                borderRadius: 30,
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box'
              }}
              mb={20}
            >
              <Typography
                sx={{
                  fontFamily: `'Inter'`,
                  fontWeight: 600,
                  fontSize: 14,
                  color: '#000000'
                }}
              >
                {account}
              </Typography>
              <img
                src={ReadySvg}
                style={{
                  width: 24,
                  marginLeft: 10
                }}
                alt=""
              />
            </Box>
          </Box>
          <Box mb={10}>
            <Typography
              sx={{
                fontFamily: `'Inter'`,
                fontWeight: 600,
                fontSize: 16,
                color: '#000',
                verticalAlign: 'middle',
                marginBottom: 20
              }}
            >
              2.Connect email address to not miss out on the latest IDO information
            </Typography>
            <Box
              sx={{
                height: 64,
                padding: '0 33px',
                background: '#E7E7E8',
                borderRadius: 30,
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'center',
                alignItems: 'center',
                boxSizing: 'border-box'
              }}
              mb={20}
            >
              <Typography
                sx={{
                  fontFamily: `'Inter'`,
                  fontWeight: 600,
                  fontSize: 14,
                  color: '#000000'
                }}
              >
                {userInfo?.email}
              </Typography>
              <img
                src={ReadySvg}
                style={{
                  width: 24,
                  marginLeft: 10
                }}
                alt=""
              />
            </Box>
          </Box>
          <Box
            sx={{
              width: 400,
              height: 56,
              lineHeight: '56px',
              background: '#2C4ACC',
              textAlign: 'center',
              borderRadius: 30,
              margin: '0 auto',
              fontFamily: `'Inter'`,
              fontWeight: 700,
              color: '#fff',
              cursor: 'pointer'
            }}
            onClick={handleJoin}
          >
            Confirm Registration
          </Box>
        </Box>
      </Box>
    )
  }
  const ConnectWalletDialog = () => {
    return (
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 9
        }}
      >
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: '100%',
            background: '#000000',
            opacity: 0.7
          }}
          onClick={() => {
            setDialogStep(DialogStep.Close)
          }}
        ></Box>
        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate3D(-50%, -50%, 0)',
            width: 480,
            background: '#fff',
            borderRadius: 32,
            overflow: 'hidden',
            padding: '30px 40px 32px'
          }}
        >
          <Typography
            sx={{
              fontFamily: `'Sharp Grotesk DB Cyr Medium 22'`,
              fontWeight: 500,
              fontSize: 24,
              marginBottom: 20,
              textAlign: 'center'
            }}
          >
            Join waiting list now!
          </Typography>
          <Typography
            sx={{
              fontFamily: `'Inter'`,
              fontWeight: 400,
              fontSize: 14,
              marginBottom: 30,
              textAlign: 'center'
            }}
          >
            Sign up now and unlock exclusive benefits and opportunities.Secure your spot in the IDO waiting list and be
            part of the next big thing!
          </Typography>
          <Box
            sx={{
              width: 400,
              height: 56,
              lineHeight: '56px',
              background: '#2C4ACC',
              textAlign: 'center',
              borderRadius: 30,
              margin: '0 auto',
              fontFamily: `'Inter'`,
              fontWeight: 700,
              color: '#fff',
              cursor: 'pointer'
            }}
            onClick={() => {
              setDialogStep(DialogStep.Close)
              showLoginModal()
            }}
          >
            Connect your wallet
          </Box>
        </Box>
      </Box>
    )
  }
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
          minHeight: 900,
          background: `url(${BgImg}) no-repeat top center / cover`,
          backgroundAttachment: 'fixed',
          padding: '115px 0 215px',
          boxSizing: 'border-box'
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
          {account && token ? (
            <>
              <JoinBtn onClick={handleConfirm}>{checkJoinData?.isJoin ? 'You joined' : 'Join waiting list'}</JoinBtn>
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
            <JoinBtn onClick={() => setDialogStep(DialogStep.Connect)}>Join waiting list</JoinBtn>
          )}
        </Box>
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          height: 48,
          display: 'flex',
          flexFlow: 'row nowrap',
          justifyContent: 'center',
          alignItems: 'center'
        }}
        gap={20}
      >
        <TabsBtn>Listed</TabsBtn>
        <TabsBtn disabled={true}>Ended</TabsBtn>
      </Box>
      {dialogStep === DialogStep.Connect && <ConnectWalletDialog />}
      {dialogStep === DialogStep.Confirm && <ConfirmDialog />}
      {dialogStep === DialogStep.Success && <SuccessDialog />}
    </Box>
  )
}

export default DigitalAssetsOffering
