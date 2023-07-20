import { Box, Button, Container, Stack, Typography, styled, Link } from '@mui/material'
import { Add } from '@mui/icons-material'
import AccountLayout from 'bounceComponents/account/AccountLayout'
import { useState } from 'react'
import tabStyles from './tabStyles'
import ChainSelect from 'bounceComponents/common/ChainSelect'
import AuctionTypeSelect from 'bounceComponents/common/AuctionTypeSelect'
import { PoolType } from 'api/pool/type'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
import Image from 'components/Image'
import TokenImage from 'bounceComponents/common/TokenImage'
import { ChainListMap, ChainId } from 'constants/chain'
import { ReactComponent as Web } from 'assets/imgs/auction/round-icon-web.svg'
import { ReactComponent as DiscordSVG } from 'assets/imgs/profile/links/discord.svg'
import { AuctionProgressPrimaryColor } from 'constants/auction/color'
enum ETabList {
  All = 'All',
  Upcoming = 'Upcoming',
  Live = 'Live',
  Close = 'Close'
}
const tabList = [ETabList.All, ETabList.Close, ETabList.Live, ETabList.Upcoming]
const launchpadData = {
  chainId: 1
}
const LaunchpadCard = () => {
  return (
    <Row
      sx={{
        height: 292,
        borderRadius: 18,
        overflow: 'hidden',
        cursor: 'pointer',
        '& .left_banner': {
          transform: 'scale(1)',
          transition: 'all .6s'
        },
        '&:hover': {
          '& .left_banner': {
            transform: 'scale(1.2)'
          }
        }
      }}
      mt={48}
    >
      <Box
        sx={{
          width: 375,
          height: 292,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Image
          className="left_banner"
          style={{ width: '100%', height: '100%', position: 'absolute', left: 0, top: 0 }}
          src="http://localhost:3000/static/media/deelance.883555954fb281ea1f93.png"
        />
        <Row sx={{ position: 'absolute', top: 0, left: 0, gap: 8, padding: 15 }}>
          <RoundedBox>
            <TokenImage src={ChainListMap[launchpadData.chainId as ChainId]?.logo} size={15} />
            <SansTitle sx={{ color: '#FFF', fontSize: 10 }}>{ChainListMap[1]?.name}</SansTitle>
          </RoundedBox>
          <RoundedBox sx={{ color: '#B5E529', fontSize: 10 }}>Fixed Swap Auction</RoundedBox>
        </Row>
      </Box>
      <Box sx={{ flex: 1, background: '#E8E9E4', padding: 24 }}>
        <Row sx={{ justifyContent: 'space-between' }}>
          <Row gap={10} sx={{ alignItems: 'center', gap: 10 }}>
            <Image
              style={{ width: 37, height: 37, borderRadius: 4 }}
              src="https://images-v3.bounce.finance/2fb011f35fc0c258b50d44f1fb6b70c0-1683626370.png"
            />
            <SansTitle sx={{ fontSize: 17, fontWeight: 600 }}>BladeDAO</SansTitle>
          </Row>
          <Box>
            <RoundedBox sx={{ color: AuctionProgressPrimaryColor[1] }}>Upcoming in 32h : 12m : 10s</RoundedBox>
          </Box>
        </Row>

        <Box sx={{ paddingLeft: 6 }} mt={18}>
          <InterTitle
            sx={{
              fontSize: 14,
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {`LasMeta is an AI-powered "Virtual Reality" Poker Gaming Metaverse that merges blockchain technology,
      Polygon Network, and Unreal Engine 5 to deliver an unmatched and free-to-play gaming experience. By
      leveraging the power of NFTs, utility token, and the immersive Metaverse, we are transforming the
      gaming landscape. LasMeta, empowers players to truly own their in-game assets, participate in
      vibrant player-driven economies, and shape their own destinies within a dynamic virtual world.`}
          </InterTitle>
          <Row
            mt={10}
            gap={6}
            sx={{
              '&>a': {
                width: 20,
                height: 20
              },
              '&>a>svg': {
                width: 20,
                height: 20
              }
            }}
          >
            <Link key={0} href="https://deelance.com/en" target="_blank">
              <Web />
            </Link>
            <Link key={2} href="https://discord.gg/vhH3Sbt9NQ" target="_blank">
              <DiscordSVG />
            </Link>
          </Row>
        </Box>
        <Box
          mt={12}
          sx={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridRowGap: 8,
            paddingLeft: 6
          }}
        >
          <Box>
            <InterTitle sx={{ fontSize: 8 }}>Token Name</InterTitle>
            <InterTitle mt={4} sx={{ fontSize: 10, fontWeight: 500 }}>
              BLADE
            </InterTitle>
          </Box>
          <Box>
            <InterTitle sx={{ fontSize: 8 }}>Token Price</InterTitle>
            <InterTitle mt={4} sx={{ fontSize: 10, fontWeight: 500 }}>
              ZKSYNC
            </InterTitle>
          </Box>
          <Box>
            <InterTitle sx={{ fontSize: 8 }}>Token Amount</InterTitle>
            <InterTitle mt={4} sx={{ fontSize: 10, fontWeight: 500 }}>
              1,000,000
            </InterTitle>
          </Box>
          <Box>
            <InterTitle sx={{ fontSize: 8 }}>Blockchain / Platform</InterTitle>
            <InterTitle mt={4} sx={{ fontSize: 10, fontWeight: 500 }}>
              BLADE
            </InterTitle>
          </Box>
        </Box>
      </Box>
    </Row>
  )
}
export default function AccountPrivateLaunchpad() {
  const [curTab, setCurTab] = useState(ETabList.All)
  const [curChain, setCurChain] = useState(0)
  const [curPoolType, setCurPoolType] = useState<PoolType | 0>(0)
  const navigate = useNavigate()

  return (
    <AccountLayout>
      <Box padding="40px 20px">
        <Container
          sx={{
            maxWidth: '1080px !important',
            position: 'relative'
          }}
        >
          <Typography variant="h3" fontSize={30}>
            Private Launchpad
          </Typography>
          <Row sx={{ justifyContent: 'flex-start' }} mt={28}>
            {tabList.map((item, index) => (
              <Typography
                onClick={() => setCurTab(item)}
                sx={{
                  ...tabStyles.menu,
                  ...(item === curTab ? tabStyles.menuActive : ({} as any)),
                  padding: '16px 32px 12px 32px',
                  fontFamily: 'Public Sans',
                  borderRadius: '12px 12px 0px 0px'
                }}
                key={index}
              >
                {item}
              </Typography>
            ))}
          </Row>
          <Box
            sx={{
              height: '100%',
              padding: '48px 40px',
              background: '#F6F6F3'
            }}
          >
            <Row sx={{ justifyContent: 'space-between' }}>
              <Row sx={{ gap: 8 }}>
                <AuctionTypeSelect curPoolType={curPoolType} setCurPoolType={v => setCurPoolType(v)} />
                <ChainSelect curChain={curChain} setCurChain={i => setCurChain(i)} />
              </Row>
              <Box>
                <Button
                  sx={{ height: 44 }}
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate(routes.thirdPart.CreateLaunchpad)}
                >
                  <Add /> Create a pool
                </Button>
              </Box>
            </Row>
            <Stack sx={{ flexDirection: 'column', gap: 48 }}>
              <LaunchpadCard />
              <LaunchpadCard />
              <LaunchpadCard />
              <LaunchpadCard />
              <LaunchpadCard />
            </Stack>
          </Box>
        </Container>
      </Box>
    </AccountLayout>
  )
}

const Row = styled(Box)({
  display: 'flex',
  flexDirection: 'row'
})
const RoundedBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  gap: 6,
  padding: '2px 9px',
  background: 'rgba(18, 18, 18, 0.60)',
  borderRadius: 62
})
const SansTitle = styled(Typography)({
  color: '#121212',
  fontFamily: 'Public Sans',
  fontStyle: 'normal',
  fontWeight: 500,
  lineHeight: '150%',
  letterSpacing: -0.2
})
const InterTitle = styled(Typography)({
  color: '#121212',
  fontFamily: 'Inter',
  fontStyle: 'normal',
  fontWeight: 400,
  lineHeight: '150%',
  fontFeatureSettings: 'calt',
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
  textEdge: 'cap',
  textTransform: 'lowercase',
  leadingTrim: 'both'
})
