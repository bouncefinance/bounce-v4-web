import { useState } from 'react'
import { ArrowBackIosNew } from '@mui/icons-material'
import { Box, Drawer, Stack, Typography } from '@mui/material'
import Search from '../../bounceComponents/common/Header/Search'
import { CenterRow } from '../Layout'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos'
import CreateBtn from '../../bounceComponents/common/Header/CreateBtn'
import { ResourcesLinks, SocialLinkList } from '../Footer/FooterPc'
import { routes } from '../../constants/routes'
import { useNavigate } from 'react-router-dom'

interface MenuItem {
  title: string
  link?: string
  subTitle?: MenuItem[]
}

export default function MobileMenu({ isOpen, onDismiss }: { isOpen: boolean; onDismiss: () => void }) {
  const [currentTab, setCurrentTab] = useState<MenuItem>()
  const nav = useNavigate()
  const menuContent: MenuItem[] = [
    {
      title: 'Auction',
      subTitle: [
        { link: routes.market.index, title: 'Home' },
        { link: routes.launchpad.index, title: 'Private Launchpad' },
        { link: routes.tokenAuction.index, title: 'Token Auction' },
        { link: routes.nftAuction.index, title: 'NFT Auction' },
        { link: routes.realAuction.index, title: 'Real World Collectibles Auction' },
        { link: routes.adsAuction.index, title: 'Ads Auction' }
      ]
    },
    {
      title: 'Token',
      link: ''
    },
    {
      title: 'Resources',
      subTitle: ResourcesLinks.map(res => {
        return { link: res.href, title: res.label }
      })
    }
  ]

  function openLink(m: MenuItem) {
    if (m.link?.startsWith('/')) {
      nav(m.link)
    } else {
      window.open(m.link, '_blank')
    }
    onDismiss()
  }

  return (
    <Drawer
      open={isOpen}
      onClose={onDismiss}
      anchor="top"
      BackdropProps={{ sx: { backgroundColor: 'transparent' } }}
      PaperProps={{
        sx: {
          height: '100%',
          paddingBottom: theme => ({ xs: theme.height.mobileHeader, sm: theme.height.header }),
          top: theme => ({ xs: theme.height.mobileHeader, sm: theme.height.header })
        }
      }}
      sx={{
        zIndex: theme => theme.zIndex.appBar,
        overflow: 'hidden',
        top: theme => ({ xs: theme.height.mobileHeader, sm: theme.height.header })
      }}
    >
      <Box
        sx={{
          height: '100%',
          background: '#F6F6F3',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
      >
        <Stack spacing={10} padding={16}>
          <Search />
          {!currentTab &&
            menuContent.map((m, i) => (
              <Box
                key={i}
                onClick={() => {
                  if (m.subTitle) {
                    setCurrentTab(m)
                  } else {
                    openLink(m)
                  }
                }}
              >
                <MenuSubTitle menuItem={m} />
              </Box>
            ))}
          {currentTab && (
            <>
              <Box
                onClick={() => {
                  setCurrentTab(undefined)
                }}
              >
                <MenuTitle title={currentTab.title} />
              </Box>
              {currentTab.subTitle?.map((m, i) => (
                <Box
                  key={i}
                  onClick={() => {
                    openLink(m)
                  }}
                >
                  <MenuSubTitle menuItem={m} />
                </Box>
              ))}
            </>
          )}
        </Stack>
        {!currentTab && (
          <Stack spacing={22} p={'0 16px 22px'} onClick={onDismiss}>
            <CreateBtn
              sx={{
                width: '100%'
              }}
            />
            <SocialLinkList
              sx={{
                justifyContent: 'center'
              }}
            />
          </Stack>
        )}
      </Box>
    </Drawer>
  )
}

function MenuSubTitle({ menuItem }: { menuItem: MenuItem }) {
  return (
    <CenterRow justifyContent={'space-between'} sx={{ height: 45, paddingLeft: 14 }}>
      <Typography>{menuItem.title}</Typography>
      {menuItem.subTitle && <ArrowForwardIosIcon sx={{ fontSize: 16 }} />}
    </CenterRow>
  )
}

function MenuTitle({ title }: { title: string }) {
  return (
    <CenterRow
      sx={{
        gap: 4,
        height: 45,
        background: '#E1F25C',
        paddingLeft: 10,
        marginLeft: '-16px !important',
        marginRight: '-16px !important'
      }}
    >
      <ArrowBackIosNew sx={{ fontSize: 16 }} />
      <Typography>{title}</Typography>
    </CenterRow>
  )
}
