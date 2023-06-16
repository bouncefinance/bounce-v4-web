import { Box, styled, Typography, useTheme } from '@mui/material'
import Logo from 'components/Fundo/assets/img/logo2.png'
import { Link } from 'react-router-dom'
import { routes } from 'constants/routes'
import CenterSection from '../CenterSection'
import ArrowRight from 'components/Fundo/assets/img/arrow-right.svg'
import { useIsSMDown } from 'themes/useTheme'
import MenuAddIcon from 'components/Fundo/assets/img/mobile/add.svg'
import MenuDecIcon from 'components/Fundo/assets/img/mobile/dec.svg'
import { useState } from 'react'
const LinkItem = styled(Typography)(() => ({
  fontFamily: `'Public Sans'`,
  fontWeight: 600,
  fontSize: 14,
  color: '#D7D6D9',
  height: 60,
  lineHeight: '60px',
  textDecoration: 'none',
  '&:after': {
    content: `''`,
    display: 'inline-block',
    width: '0',
    height: '8px',
    background: `url(${ArrowRight}) no-repeat center center / 100% auto`,
    verticalAlign: 'middle',
    marginLeft: '8px',
    transition: 'all .6s',
    overflow: 'hidden'
  },
  '&.hover': {
    '&:after': {
      width: '24px'
    }
  },
  '&:hover': {
    '&:after': {
      width: '24px'
    }
  }
}))
export default function Header() {
  const isSm = useIsSMDown()
  const [isOpen, setIsOpen] = useState(false)
  const theme = useTheme()
  const menuList = [
    {
      title: 'TOKEN DETAILS',
      link: routes.fundo.detail,
      external: false
    },
    {
      title: 'AUCTION  DETAILS',
      link: routes.fundo.detail,
      external: false
    },
    {
      title: 'JOIN DISCORD',
      link: 'https://discord.com/invite/EFQC6jYd8e',
      external: true
    }
  ]
  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: theme.height.header,
        zIndex: 999,
        background: '#000'
      }}
    >
      <CenterSection
        style={{
          height: theme.height.header
        }}
      >
        <>
          <Link
            to={routes.realAuction.index}
            style={{
              zIndex: 999
            }}
            onClick={() => {
              setIsOpen(false)
            }}
          >
            <img
              src={Logo}
              style={{
                cursor: 'pointer',
                height: 22
              }}
              alt={'Bounce'}
            />
          </Link>
          {isSm && (
            <Box
              sx={{
                width: '60px',
                height: '60px',
                lineHeight: '60px',
                textAlign: 'center',
                cursor: 'pointer',
                zIndex: 998
              }}
              onClick={() => {
                const resulte = !isOpen
                setIsOpen(resulte)
              }}
            >
              {isOpen && <img src={MenuDecIcon} alt="" />}
              {!isOpen && <img src={MenuAddIcon} alt="" />}
            </Box>
          )}
          {isSm && isOpen && (
            <Box
              sx={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                display: 'flex',
                flexFlow: 'column nowrap',
                justifyContent: 'flex-start',
                alignItems: 'flex-end',
                padding: '72px 24px 24px',
                background: 'rgba(18, 18, 18, 0.6)',
                zIndex: 997
              }}
              onClick={() => {
                setIsOpen(false)
              }}
              gap={'16px'}
            >
              {menuList.reverse().map((item, index) => {
                if (item.external) {
                  return (
                    <a
                      key={index}
                      href={item.link}
                      target={'_blank'}
                      style={{
                        textDecoration: 'none'
                      }}
                      onClick={() => {
                        setIsOpen(false)
                      }}
                      rel="noreferrer"
                    >
                      <LinkItem key={index} className={index === 0 ? 'hover' : ''}>
                        {item.title}
                      </LinkItem>
                    </a>
                  )
                } else {
                  return (
                    <Link
                      key={index}
                      to={item.link}
                      style={{
                        textDecoration: 'none'
                      }}
                      onClick={() => {
                        setIsOpen(false)
                      }}
                    >
                      <LinkItem key={index} className={index === 0 ? 'hover' : ''}>
                        {item.title}
                      </LinkItem>
                    </Link>
                  )
                }
              })}
            </Box>
          )}
          {!isSm && (
            <Box
              sx={{
                display: 'flex',
                flexFlow: 'row nowrap',
                justifyContent: 'flex-end',
                alignItems: 'center',
                height: 60
              }}
              gap={'64px'}
            >
              {menuList.map((item, index) => {
                if (item.external) {
                  return (
                    <a
                      key={index}
                      href={item.link}
                      target={'_blank'}
                      style={{
                        textDecoration: 'none'
                      }}
                      onClick={() => {
                        setIsOpen(false)
                      }}
                      rel="noreferrer"
                    >
                      <LinkItem key={index} className={index === 0 ? 'hover' : ''}>
                        {item.title}
                      </LinkItem>
                    </a>
                  )
                } else {
                  return (
                    <Link
                      key={index}
                      to={item.link}
                      style={{
                        textDecoration: 'none'
                      }}
                    >
                      <LinkItem key={index}>{item.title}</LinkItem>
                    </Link>
                  )
                }
              })}
            </Box>
          )}
        </>
      </CenterSection>
    </Box>
  )
}
