import React, { useState } from 'react'
import { Box, Button, styled, Stack } from '@mui/material'
import { routes } from 'constants/routes'
import { useNavigate } from 'react-router-dom'
import useBreakpoint from '../../../hooks/useBreakpoint'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import PopperCard from 'components/PopperCard'

const StyledTab = styled(Button)(({ theme }) => ({
  padding: '8px 12px',
  color: '#9C9C9C',
  borderRadius: '8px',
  fontWeight: '500',
  fontSize: '16px',
  lineHeight: '150%',
  height: '40px',
  background: 'transparent',
  '&:hover': {
    border: 'none',
    color: 'white',
    background: 'transparent'
  },
  '&.selected': {
    background: '#E1F25C',
    color: '#121212',
    borderRadius: '100px'
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
  const tabsMap: { [key: string]: string } = {
    '/real-auction': 'Real World Collectibles Auction',
    '/ads-auction': 'Ads Auction',
    '/launchpad': 'Private Launchpad',
    '/TokenToolBox': 'Token ToolBox',
    '/Loyaltyprogram': 'Bounce Loyalty program'
  }
  const auctionTabMap: { [key: string]: string } = {
    '/TokenAuction': 'Token Auction',
    '/NFTAuction': 'NFT Auction'
  }
  const botTabMap: { [key: string]: string } = {
    '/TelegramBot/home': 'Telegram bot',
    '/TelegramBot/guide': 'Telegram bot',
    '/TelegramBot/create': 'Telegram bot'
  }
  const tabs = [
    'All',
    'Private Launchpad',
    'Auction',
    'Real World Collectibles Auction',
    'Ads Auction',
    'Token ToolBox',
    'Telegram bot',
    'Bounce Loyalty program'
  ]
  const auctionTabs = Object.values(auctionTabMap)

  const getPath = () => {
    const path = location.pathname
    if (auctionTabMap[path]) return auctionTabMap[path]
    if (botTabMap[path]) return botTabMap[path]
    if (tabsMap[path]) return tabsMap[path]
    return 'All'
  }
  const [currentTab, setCurrentTab] = useState(getPath())

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
      case 'Token ToolBox':
        navigate(routes.tokenToolBox.index)
        break
      case 'Telegram bot':
        navigate(routes.telegramBot.index)
        break
      case 'Bounce Loyalty program':
        navigate(routes.loyaltyprogram.index)
        break
    }
  }
  return (
    <Box
      sx={{
        display: 'flex',
        flexFlow: 'row nowrap',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        // maxWidth: '1296px',
        padding: { xs: 0, sm: '0 72px' },
        margin: '0 auto',
        ...style
      }}
    >
      <Box
        sx={{
          width: 'max-content',
          maxWidth: '100%',
          marginTop: '32px',
          flexFlow: 'row nowrap',
          justifyContent: 'flex-start',
          alignItems: 'center',
          padding: '6px',
          backdropFilter: 'blur(4px)',
          background: 'rgba(255, 255, 255, 0.15)',
          borderRadius: '100px',
          overflowX: 'scroll',
          whiteSpace: 'nowrap',
          border: '1px solid #959595',

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
          {tabs.map((tab: string, index: number) => {
            if (tab === 'Auction') {
              return (
                <Box sx={{ width: 'max-content !important', display: 'inline-flex' }}>
                  <PopperCard
                    placement="bottom-start"
                    popperSx={{
                      top: isSm ? 0 : '6px !important'
                    }}
                    targetElement={
                      <StyledTab
                        variant="contained"
                        id={`tab${index}`}
                        className={auctionTabs.includes(currentTab) ? 'selected' : ''}
                        endIcon={auctionTabs.includes(currentTab) ? <ExpandMoreIcon /> : <></>}
                      >
                        {tab}
                      </StyledTab>
                    }
                  >
                    <Stack flexDirection={'column'} gap={5}>
                      {auctionTabs.map((auctionTab: string, index: number) => (
                        <StyledTab
                          sx={{
                            color: '#121212 !important',
                            border: isSm ? '1px solid #E1F25C' : 'none',
                            '&:hover': {
                              background: '#E1F25C !important'
                            }
                          }}
                          variant="contained"
                          id={`auctionTab${index}`}
                          key={auctionTab}
                          className={auctionTab === currentTab ? 'selected' : ''}
                          onClick={() => {
                            setCurrentTab(auctionTab)
                            onTabChange && onTabChange(auctionTab)
                            linkTo(auctionTab)
                          }}
                        >
                          {auctionTab}
                        </StyledTab>
                      ))}
                    </Stack>
                  </PopperCard>
                </Box>
              )
            }
            return (
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
            )
          })}
        </Box>
      </Box>
    </Box>
  )
}

export default HeaderTab
