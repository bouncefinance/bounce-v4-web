import { Box, Container, Link as ExternalLink, SxProps, Typography, useTheme } from '@mui/material'
import React, { useMemo, createContext, useContext } from 'react'
import APIIcon from 'assets/imgs/common/Api.png'
import GithubIcon from 'assets/imgs/common/Github.png'
import MediumIcon from 'assets/imgs/common/Medium.png'
import TelegramIcon from 'assets/imgs/common/Telegram.png'
import TwitterIcon from 'assets/imgs/common/Twitter.png'
import WhiteFooterLogo from 'assets/svg/logo-white.svg'
import { routes } from 'constants/routes'
import ArrowSvg from 'assets/imgs/common/footerArrow.svg'
import WhiteArrowSvg from 'assets/imgs/common/whiteFooterArrow.svg'
import useBreakpoint from '../../hooks/useBreakpoint'

const FooterDarkStyle = {
  layoutBackground: '#20201E',
  linkTextColor: '#FFF',
  textColor: '#D7D6D9'
}

const FooterThemeContext = createContext(false)

export function SocialLinkList({ sx }: { sx?: SxProps }) {
  const isSm = useBreakpoint('md')
  const Links = useMemo(
    () => [
      {
        title: 'Medium',
        icon: MediumIcon,
        href: 'https://medium.com/@bouncefinance'
      },
      {
        title: 'Twitter',
        icon: TwitterIcon,
        href: 'https://twitter.com/bounce_finance?s=21'
      },
      {
        title: 'Telegram',
        icon: TelegramIcon,
        href: 'https://t.me/bounce_finance'
      },
      {
        title: 'Github',
        icon: GithubIcon,
        href: 'https://github.com/bouncefinance'
      },
      {
        title: 'API',
        icon: APIIcon,
        href: 'https://docs.bounce.finance/'
      }
    ],
    []
  )
  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-start',
        marginBottom: 20,
        ...sx
      }}
    >
      {Links.map((item, index) => {
        return (
          <ExternalLink key={'link' + index} target="_blank" href={item.href}>
            <img
              src={item.icon}
              style={{ width: isSm ? 44 : 36, height: isSm ? 44 : 36, marginRight: isSm ? 12 : 8, cursor: 'pointer' }}
            />
          </ExternalLink>
        )
      })}
    </Box>
  )
}

export const FooterSocialLink: React.FC = () => {
  // const isDark = useContext(FooterThemeContext)
  return (
    <Box
      sx={{
        position: 'relative',
        width: 213,
        display: 'flex',
        flexFlow: 'column nowrap',
        justifyContent: 'flex-start',
        alignItems: 'flex-start'
      }}
    >
      <ExternalLink href={routes.market.index} role="link" rel="noopener noreferrer" aria-disabled={true}>
        <img src={WhiteFooterLogo} style={{ display: 'block', width: 158, height: 32, marginBottom: 24 }} />
      </ExternalLink>
      <SocialLinkList />
      <Box
        id={'123'}
        sx={{
          position: 'relative',
          width: '100%'
        }}
      >
        <iframe
          // src={isDark ? '/darkCrypotoWidget.html' : '/crypotoWidget.html'}
          src={'/crypotoWidget.html'}
          width="100%"
          height="230px"
          style={{
            border: '0 none',
            position: 'relative',
            top: 0,
            left: -42,
            width: 280,
            overflow: 'hidden'
          }}
        ></iframe>
      </Box>
    </Box>
  )
}

interface FooterLinksProps {
  title: string
  links: {
    label: string
    isExternal: boolean
    href: string
    isDisabled: boolean
    extraIcon: string
    className: string
  }[]
}

export const FooterLinks: React.FC<FooterLinksProps> = ({ title, links }) => {
  const isDark = useContext(FooterThemeContext)
  return (
    <div>
      <Typography
        variant="h5"
        sx={{
          fontFamily: `'Public Sans'`,
          fontSize: 12,
          marginBottom: 24,
          color: isDark ? FooterDarkStyle.linkTextColor : ''
        }}
      >
        {title}
      </Typography>
      <ul
        style={{
          margin: 0,
          padding: 0
        }}
      >
        {links.map((item, index) => {
          return (
            <li
              key={index}
              style={{
                listStyle: 'none',
                marginBottom: 16
              }}
            >
              {item.isDisabled ? (
                <a
                  style={{
                    color: `${isDark ? FooterDarkStyle.linkTextColor : '#919191'}!important`,
                    fontFamily: `'Inter'`
                  }}
                >
                  {item.label}
                </a>
              ) : item.isExternal ? (
                <ExternalLink
                  // className={linkClass}
                  sx={{
                    color: isDark ? FooterDarkStyle.linkTextColor : 'white',
                    padding: 0,
                    height: 18,
                    fontFamily: `'Inter'`,
                    '&:hover': {
                      textDecoration: 'underline'
                    }
                  }}
                  href={item.href as string}
                  role="link"
                  rel="noopener noreferrer"
                  target="_blank"
                  aria-disabled={true}
                >
                  {item.label}
                </ExternalLink>
              ) : (
                <ExternalLink href={item.href}>
                  <a
                    style={{
                      color: isDark ? FooterDarkStyle.linkTextColor : 'white',
                      padding: 0,
                      height: 18,
                      fontFamily: `'Inter'`
                    }}
                  >
                    {item.label}
                  </a>
                </ExternalLink>
              )}
              {item.extraIcon ? (
                <img
                  src={item.extraIcon}
                  style={{
                    width: 10,
                    height: 10,
                    marginLeft: 6
                  }}
                  alt=""
                />
              ) : (
                ''
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
export const ResourcesLinks = [
  {
    label: 'Document',
    isExternal: true,
    href: 'https://docs.bounce.finance/welcome-to-bounce-docs/welcome',
    isDisabled: false,
    extraIcon: '',
    className: ''
  },
  {
    label: 'Help Center',
    isExternal: true,
    href: 'https://www.bounce.finance/FAQ',
    isDisabled: false,
    extraIcon: '',
    className: ''
  },
  {
    label: 'Bounce Token',
    isExternal: true,
    href: 'https://token.bounce.finance/staking',
    isDisabled: false,
    extraIcon: '',
    className: ''
  },
  //   {
  //     label: 'Token Authentication',
  //     isExternal: true,
  //     href: '',
  //     isDisabled: false,
  //     extraIcon: '',
  //     className: ''
  //   },
  {
    label: 'SDKs&Plug-Ins',
    isExternal: true,
    href: 'https://www.bounce.finance/sdkAndPlugins',
    isDisabled: false,
    extraIcon: '',
    className: ''
  },
  {
    label: 'Community',
    isExternal: true,
    href: 'https://community.bounce.finance/',
    isDisabled: false,
    extraIcon: '',
    className: ''
  },
  {
    label: 'Become a Partner',
    isExternal: true,
    href: 'https://www.bounce.finance/joinCommunity',
    isDisabled: false,
    extraIcon: '',
    className: ''
  },
  {
    label: 'Contact Us',
    isExternal: true,
    href: 'https://docs.google.com/forms/d/1DJxbqqfv6MnN5-kOwDGU-_DGpXDxbJJkUT2UqKgvbUs/viewform?edit_requested=true',
    isDisabled: false,
    extraIcon: '',
    className: ''
  }
]
const FooterPc: React.FC<{ isDark?: boolean }> = ({ isDark }) => {
  const isSm = useBreakpoint('sm')
  const theme = useTheme()
  const LinksIcon = isDark ? WhiteArrowSvg : ArrowSvg

  const ProductsLinks = useMemo(
    () => [
      {
        label: 'Auction Homepage',
        isExternal: true,
        href: 'https://www.bounce.finance/',
        isDisabled: false,
        extraIcon: '',
        className: ''
      },
      {
        label: 'Token&NFT Latest Auctions',
        isExternal: true,
        href: 'https://www.bounce.finance/tokenAndnftAuction',
        isDisabled: false,
        extraIcon: LinksIcon,
        className: ''
      },
      {
        label: 'Real-World Collectible Auction',
        isExternal: true,
        href: 'https://www.bounce.finance/realWorldCollectAuction',
        isDisabled: false,
        extraIcon: LinksIcon,
        className: ''
      },
      {
        label: 'Ad Space Auction',
        isExternal: true,
        href: 'https://www.bounce.finance/adsAuction',
        isDisabled: false,
        extraIcon: LinksIcon,
        className: ''
      },
      {
        label: 'SDKs&Plug-ins',
        isExternal: true,
        href: 'https://www.bounce.finance/sdkAndPlugins',
        isDisabled: false,
        extraIcon: LinksIcon,
        className: ''
      }
    ],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )
  const SolutionsLinks = useMemo(
    () => [
      {
        label: 'Advertising',
        isExternal: true,
        href: 'https://www.bounce.finance/advertisementSolution',
        isDisabled: false,
        extraIcon: '',
        className: ''
      },
      {
        label: 'AI+Auction ',
        isExternal: true,
        href: 'https://www.bounce.finance/aiAuctionSolution',
        isDisabled: false,
        extraIcon: '',
        className: ''
      }
    ],
    []
  )

  return (
    <footer
      id={'footer'}
      style={{
        position: 'relative',
        background: isDark ? FooterDarkStyle.layoutBackground : '#121212',
        width: '100%'
      }}
    >
      <FooterThemeContext.Provider value={isDark as boolean}>
        <Container
          disableGutters
          sx={{
            width: '100%',
            maxWidth: '1296px !important',
            padding: '52px 0',
            [theme.breakpoints.down('md')]: {
              padding: '40px 30px'
            }
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexFlow: isSm ? 'column' : 'row nowrap',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              paddingBottom: 32,
              marginBottom: 32,
              '&::after': {
                position: 'absolute',
                content: `''`,
                display: 'block',
                bottom: 0,
                left: 0,
                width: '100%',
                height: '1px',
                background: isDark ? FooterDarkStyle.textColor : 'var(--ps-text-3)'
              }
            }}
          >
            <FooterSocialLink />
            {isSm && <Box sx={{ border: '1px solid #D7D6D9', width: '100%', mb: '40px' }} />}
            <Box
              sx={{
                display: 'flex',
                flexFlow: isSm ? 'column' : 'row nowrap',
                justifyContent: 'flex-end',
                alignItems: 'flex-start'
              }}
              gap={isSm ? 32 : 120}
            >
              <FooterLinks title={'Products'} links={ProductsLinks} />
              <FooterLinks title={'Solutions'} links={SolutionsLinks} />
              <FooterLinks title={'Resources'} links={ResourcesLinks} />
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexFlow: isSm ? 'column' : 'row nowrap',
              justifyContent: 'space-between',
              alignItems: isSm ? 'left' : 'center'
            }}
          >
            <Typography
              sx={{
                color: isDark ? FooterDarkStyle.textColor : 'white',
                opacity: '0.6',
                fontFamily: `'Inter'`,
                fontSize: 13
              }}
            >{`©${new Date().getFullYear()} Bounce dao Ltd. All rights reserved.`}</Typography>
            <Box>
              <ExternalLink
                href={'https://www.bounce.finance/termsOfService'}
                role="link"
                rel="noopener noreferrer"
                target="_blank"
                sx={{
                  color: isDark ? FooterDarkStyle.textColor : 'white',
                  opacity: '0.6',
                  fontFamily: `'Inter'`,
                  fontSize: 13,
                  marginRight: 40
                }}
              >
                Terms Of Service
              </ExternalLink>
              <ExternalLink
                href={'https://www.bounce.finance/privacyPolicy'}
                role="link"
                rel="noopener noreferrer"
                target="_blank"
                sx={{
                  color: isDark ? FooterDarkStyle.textColor : 'white',
                  fontFamily: `'Inter'`,
                  fontSize: 13,
                  opacity: '0.6'
                }}
              >
                Privacy Policy
              </ExternalLink>
            </Box>
          </Box>
        </Container>
      </FooterThemeContext.Provider>
    </footer>
  )
}

export default FooterPc
