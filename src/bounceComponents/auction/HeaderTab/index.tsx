import React, { useState } from 'react'
import { Box, Button, styled } from '@mui/material'
import { routes } from 'constants/routes'
import { useNavigate } from 'react-router-dom'
import useBreakpoint from '../../../hooks/useBreakpoint'

const StyledTab = styled(Button)(({ theme }) => ({
  padding: '8px 12px',
  color: 'white',
  borderRadius: '8px',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '150%',
  height: '40px',
  background: 'transparent',
  '&:hover': {
    border: 'none',
    background: '#FFFFFF33'
  },
  '&.selected': {
    background: '#E1F25C',
    color: '#121212'
  },
  [theme.breakpoints.down('sm')]: {
    fontSize: '14px',
    height: 'auto'
  }
}))

const HeaderTab: React.FC<{ onTabChange?: (currentTab: string) => void; style?: React.CSSProperties }> = ({
  onTabChange,
  style
}) => {
  const navigate = useNavigate()
  const isSm = useBreakpoint('sm')
  const tabs = [
    'All',
    'Private Launchpad',
    'Token Auction',
    'NFT Auction',
    'Real World Collectibles Auction',
    'Ads Auction'
  ]
  const path =
    location.pathname === '/TokenAuction'
      ? tabs[2]
      : location.pathname === '/NFTAuction'
      ? tabs[3]
      : location.pathname === '/real-auction'
      ? tabs[4]
      : location.pathname === '/ads-auction'
      ? tabs[5]
      : location.pathname === '/launchpad'
      ? tabs[1]
      : tabs[0]
  const [currentTab, setCurrentTab] = useState(path)

  const linkTo = (route: string) => {
    switch (route) {
      case 'All':
        navigate(routes.market.index)
        break
      case 'Token Auction':
        navigate(routes.tokenAuction.index)
        break
      case 'NFT Auction':
        navigate(routes.nftAuction.index)
        break
      case 'Real World Collectibles Auction':
        navigate(routes.realAuction.index)
        break
      case 'Ads Auction':
        navigate(routes.adsAuction.index)
        break
      case 'Private Launchpad':
        navigate(routes.launchpad.index)
        break
    }
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        // maxWidth: '1296px',
        padding: '0 72px',
        margin: '0 auto',
        ...style
      }}
    >
      <Box
        sx={{
          marginTop: '32px',
          flexFlow: 'row nowrap',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: '6px',
          background: '#20201E',
          backdropFilter: 'blur(4px)',
          borderRadius: '10px',
          overflowX: 'scroll',
          whiteSpace: 'nowrap',
          maxWidth: 1100,
          margin: isSm ? ' 8px 14px' : '',
          '&::-webkit-scrollbar': {
            display: 'none'
          },
          '@media(max-width:1296px)': {
            margin: '0 16px'
          }
        }}
      >
        <Box gap={'6px'}>
          {tabs.map((tab: string, index: number) => (
            <StyledTab
              variant="contained"
              id={`tab${index}`}
              key={tab}
              className={tab === currentTab ? 'selected' : ''}
              onClick={() => {
                setCurrentTab(tab)
                onTabChange && onTabChange(tab)
                linkTo(tab)
              }}
            >
              {tab}
            </StyledTab>
          ))}
        </Box>
      </Box>
    </Box>
  )
}

export default HeaderTab
