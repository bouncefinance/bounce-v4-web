import React, { useState } from 'react'
import { Box, Button, styled } from '@mui/material'
import { routes } from 'constants/routes'
import { useNavigate } from 'react-router-dom'

const StyledTab = styled(Button)(({}) => ({
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
  }
}))

const HeaderTab: React.FC<{ onTabChange?: (currentTab: string) => void }> = ({ onTabChange }) => {
  const navigate = useNavigate()
  const tabs = [
    'All',
    'Private Launchpad',
    'Token Auction',
    'NFT Auction',
    'Real World collectibles Auction',
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
      case 'Real World collectibles Auction':
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
        marginTop: '32px',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        padding: '6px',
        gap: '6px',
        background: '#20201E',
        backdropFilter: 'blur(4px)',
        borderRadius: '10px',
        width: '100%',
        maxWidth: 1296,
        margin: '0 auto'
      }}
    >
      {tabs.map((tab: string) => (
        <StyledTab
          variant="contained"
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
  )
}

export default HeaderTab
