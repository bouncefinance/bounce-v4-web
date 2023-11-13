import { Box, Link as ExternalLink, SxProps, Typography, useTheme } from '@mui/material'
import React, { createContext, useContext, useMemo } from 'react'
import APIIcon from 'assets/socialLinksIcon/API-mini.svg'
import GithubIcon from 'assets/socialLinksIcon/github-mini.svg'
import MediumIcon from 'assets/socialLinksIcon/midium-mini.svg'
import TelegramIcon from 'assets/socialLinksIcon/telegram-mini.svg'
import TwitterIcon from 'assets/socialLinksIcon/twitter-mini.svg'
import WhiteFooterLogo from 'assets/svg/logo-white.svg'
import { routes } from 'constants/routes'
// import ArrowSvg from 'assets/imgs/common/footerArrow.svg'
import WhiteArrowSvg from 'assets/imgs/common/whiteFooterArrow.svg'
import useBreakpoint from '../../hooks/useBreakpoint'
import { H6 } from '../Text'

const FooterDarkStyle = {
  layoutBackground: '#20201E',
  linkTextColor: '#FFF',
  textColor: '#D7D6D9'
}

const FooterThemeContext = createContext(false)

export function SocialLinkList({ sx }: { sx?: SxProps }) {
  const isSm = useBreakpoint('md')
  const theme = useTheme()
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
        width: 'wrap-content',
        display: 'flex',
        flexFlow: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        marginBottom: 20,
        [theme.breakpoints.down('md')]: {
          flexFlow: 'column',
          alignItems: 'center'
        },
        ...sx
      }}
    >
      <Box
        sx={{
          [theme.breakpoints.down('md')]: {
            display: 'flex',
            gap: 12
          }
        }}
      >
        {Links.map((item, index) => {
          return (
            <ExternalLink
              key={'link' + index}
              target="_blank"
              href={item.href}
              sx={{
                [theme.breakpoints.down('md')]: {
                  flexGrow: 1
                }
              }}
            >
              <Box
                component="img"
                src={item.icon}
                sx={{
                  width: isSm ? 44 : 48,
                  height: isSm ? 44 : 48,
                  marginRight: isSm ? 0 : 8,
                  cursor: 'pointer',
                  padding: '13px',
                  background: 'var(--ps-yellow-1)',
                  borderRadius: '100px',
                  '&:hover': {
                    background: 'transparent',
                    border: '1px solid var(--ps-yellow-1)',
                    '.svg': { fill: 'var(--ps-yellow-1)' }
                  }
                }}
              />
            </ExternalLink>
          )
        })}
      </Box>
    </Box>
  )
}

export const FooterSocialLink: React.FC = () => {
  // const isDark = useContext(FooterThemeContext)
  const theme = useTheme()
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexFlow: 'column',
        alignItems: 'flex-start',
        [theme.breakpoints.down('md')]: {
          alignItems: 'center'
        }
      }}
    >
      <ExternalLink href={routes.market.index} role="link" rel="noopener noreferrer" aria-disabled={true}>
        <img src={WhiteFooterLogo} style={{ display: 'block', width: 158, height: 32, marginBottom: 24 }} />
      </ExternalLink>
      <SocialLinkList />
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
  const theme = useTheme()
  return (
    <Box
      sx={{
        [theme.breakpoints.down('md')]: {
          flexDirection: 'column',
          display: 'flex',
          alignItems: 'center'
        }
      }}
    >
      <H6
        sx={{
          fontFamily: `'Inter'`,
          marginBottom: 24,
          color: isDark ? FooterDarkStyle.linkTextColor : 'white'
        }}
      >
        {title}
      </H6>
      <Box
        sx={{
          margin: 0,
          padding: 0,
          [theme.breakpoints.down('md')]: {
            flexDirection: 'column',
            display: 'flex',
            alignItems: 'center'
          }
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
                    textDecoration: 'none',
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
                    textDecoration: 'none',
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
                      textDecoration: 'none',
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
      </Box>
    </Box>
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
  const LinksIcon = WhiteArrowSvg

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
        <Box
          sx={{
            width: '100%',
            padding: '40px 72px',
            [theme.breakpoints.down('md')]: {
              padding: '40px 30px'
            }
          }}
        >
          <Box
            sx={{
              position: 'relative',
              display: 'flex',
              flexFlow: isSm ? 'column' : 'row',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              width: '100%',
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
            {/* icon area */}
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <FooterSocialLink />
              <Box
                id={'123'}
                sx={{
                  position: 'relative'
                }}
              >
                <iframe
                  // src={isDark ? '/darkCrypotoWidget.html' : '/crypotoWidget.html'}
                  src={'/darkCrypotoWidget.html'}
                  width="100%"
                  height="230px"
                  style={{
                    border: '0 none',
                    position: 'relative',
                    top: 0,
                    left: isSm ? 0 : -42,
                    width: isSm ? '100%' : 280,
                    overflow: 'hidden'
                  }}
                ></iframe>
              </Box>
            </Box>
            {/* link area */}
            <Box
              sx={{
                display: 'flex',
                width: isSm ? '100%' : 'unset',
                flexFlow: isSm ? 'column' : 'row nowrap',
                alignItems: isSm ? 'center' : 'flex-start'
              }}
              gap={isSm ? 60 : 120}
            >
              <FooterLinks title={'Products'} links={ProductsLinks} />
              <Box
                sx={{
                  display: 'flex',
                  flexFlow: 'row',
                  alignItems: 'flex-start'
                }}
                gap={isSm ? 60 : 120}
              >
                <FooterLinks title={'Solutions'} links={SolutionsLinks} />
                <FooterLinks title={'Resources'} links={ResourcesLinks} />
              </Box>
            </Box>
          </Box>
          {/* police area */}
          <Box sx={{ borderBottom: '1px solid #FFFFFF1A', width: '100%', mb: '40px' }} />
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
        </Box>
      </FooterThemeContext.Provider>
    </footer>
  )
}

export default FooterPc
