import { Box, Container, useTheme, keyframes, Grid, Typography } from '@mui/material'
import CreatorBlock from './components/creatorBlock'
import UserBlock from './components/userBlock'
import { useMemo } from 'react'
import { useActiveWeb3React } from 'hooks'
import { BounceAnime } from 'bounceComponents/common/BounceAnime'
import { useErc20EnglishAuctionInfo } from 'bounceHooks/auction/useErc20EnglishAuctionInfo'
import ActionHistory from './components/auctionHistory'
import ValuesProvider from './ValuesProvider'
import CreatorInfoCard from '../dutchAuction/components/creatorInfoCard'
import Header from '../dutchAuction/components/header'
import { useIsMDDown } from 'themes/useTheme'
import EnglishAuctionMobile from './mobile/englishAuctionMobile'
import TimeStageLine from './components/timeStageLine'

function ERC20EnglishAuctionPoolContent() {
  const theme = useTheme()
  const isMd = useIsMDDown()
  const { account } = useActiveWeb3React()
  const myAnimation = keyframes`
  0% {
    transform: translateX(0px,0px); }
  10% {
    transform: translate(-100px, 100px);
  }
  20% {
    transform: translate(150px, -100px);
  }
  30% {
    transform: translate(-100px,100px);
  }
  40% {
    transform: translate(100px, -150px);
  }
  50% {
    transform: translate(-100px, 200px);
  }
  60% {
    transform: translate(-200px, -100px);
  }
  70% {
    transform: translateY(50px, 100px);
  }
  80% {
    transform: translate(100px, -150px);
  }
  90% {
    transform: translate(0px, 200px);
  }
  100% {
    transform: translate(-100px, 100px);
  }
`
  const { poolInfo, run: getPoolInfo } = useErc20EnglishAuctionInfo()
  console.log('pool>>>', poolInfo)
  const isCreator = useMemo(() => poolInfo?.creator === account, [account, poolInfo?.creator])
  if (!poolInfo) {
    return (
      <Box sx={{ width: '100%', height: '70vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <BounceAnime />
      </Box>
    )
  }
  if (isMd) {
    return <EnglishAuctionMobile poolInfo={poolInfo} getPoolInfo={getPoolInfo} />
  }
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        height: `calc(100vh - ${theme.height.header})`,
        minWidth: '1296px'
      }}
    >
      <Container
        sx={{
          position: 'relative',
          width: '100%',
          borderRadius: '30px',
          overflow: 'hidden',
          '& .noise-wrapper': {
            position: 'absolute',
            left: 0,
            top: 0,
            width: '100%',
            height: '100%',
            opacity: 1,
            overflow: 'hidden',
            zIndex: -1,
            '&:after': {
              content: '""',
              position: 'absolute',
              top: 0,
              right: 0,
              bottom: 0,
              left: 0,
              // background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 0%,rgba(0,0,0,0.75) 100%)'
              background: '#121212'
            },
            '& .noise': {
              position: 'absolute',
              zIndex: 1,
              top: '-500px',
              right: '-500px',
              bottom: '-500px',
              left: '-500px',
              background: 'transparent url(https://www.dropbox.com/s/h7ab1c82ctzy83n/noise.png?raw=1) 0 0',
              backgroundSize: '230px 230px',
              opacity: 0.35,
              animation: `${myAnimation} 1s steps(8,end) infinite both`
            }
          },
          '& .content': {
            width: '100%',
            padding: '30px 48px',
            zIndex: 1
          }
        }}
      >
        <Box className="noise-wrapper">
          <Box className="noise"></Box>
        </Box>
        <Box className={'content'}>
          <Header />
          <Grid container spacing={{ xs: 10, xl: 18 }}>
            <Grid item xs={'auto'}>
              <CreatorInfoCard poolInfo={poolInfo} creator={poolInfo.creator} getPoolInfo={getPoolInfo} />
            </Grid>
            <Grid
              item
              xs
              sx={{
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  background: 'rgba(18, 18, 18, 0.6)',
                  backdropFilter: 'blur(5px)',
                  borderRadius: '24px',
                  padding: '20px',
                  minHeight: '100vh'
                }}
              >
                {isCreator ? <CreatorBlock poolInfo={poolInfo} /> : <UserBlock poolInfo={poolInfo} />}
                <Box
                  sx={{
                    marginBottom: 40,
                    width: '100%',
                    padding: '56px 48px',
                    borderRadius: '24px',
                    background: '#121212'
                  }}
                >
                  <Typography
                    sx={{
                      color: '#D7D6D9',
                      fontFamily: `'Inter'`,
                      fontSize: 20,
                      fontWeight: 600
                    }}
                    mb={'33px'}
                  >
                    Subscription Timeline
                  </Typography>
                  <TimeStageLine poolInfo={poolInfo} />
                </Box>
                <ActionHistory poolInfo={poolInfo}></ActionHistory>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}

const ERC20EnglishAuctionPoolId = () => {
  return (
    <ValuesProvider>
      <ERC20EnglishAuctionPoolContent />
    </ValuesProvider>
  )
}

export default ERC20EnglishAuctionPoolId
