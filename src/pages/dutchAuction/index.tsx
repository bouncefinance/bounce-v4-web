import { Box, Container, useTheme, keyframes, Grid } from '@mui/material'
import Header from './components/header'
import PoolInfo from './components/poolInfo'
import CreatorBlock from './components/creatorBlock'
import UserBlock from './components/userBlock'
import { useMemo } from 'react'
import { useActiveWeb3React } from 'hooks'
import ActionHistory from './components/auctionHistory'
import { DutchAuctionPoolProp } from 'api/pool/type'
const DutchCreatePage = () => {
  const theme = useTheme()
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
  const testCurrencyAmount = undefined
  const testPoolInfo: DutchAuctionPoolProp = {
    currencyAmountTotal0: testCurrencyAmount,
    currencyAmountTotal1: testCurrencyAmount,
    currencySwappedAmount0: testCurrencyAmount,
    currencySwappedTotal1: testCurrencyAmount,
    highestPrice: testCurrencyAmount,
    lowestPrice: testCurrencyAmount,
    currencyCurrentPrice: testCurrencyAmount,
    currencyLowestBidPrice: testCurrencyAmount,
    nextRoundInSeconds: 100000,
    times: 10,
    id: 18198,
    ethChainId: 25,
    poolPrice: 20,
    chainId: 25,
    tokenType: 2,
    contract: '0x9B8B850d00c24bC2684530388F8A02C1Cf9d023b',
    createdTxHash: '0x18faae9990031df8ac606f73ad04636af79cb4293b93afa901f6ab7840063aa1',
    poolId: '25',
    category: 1,
    creator: '0x1ED99D7564B93E9a1086F36ea42bad5B7dC4923F',
    creatorClaimed: false,
    name: 'zatrefund03',
    description: '',
    posts: [],
    enableWhiteList: false,
    token0: {
      address: '0x47EF4A5641992A72CFd57b9406c9D9cefEE8e0C4',
      decimals: 18,
      name: 'zkApes token',
      symbol: 'ZAT',
      thumbUrl: '',
      smallUrl: '',
      largeUrl: '',
      coingeckoId: '',
      currentPrice: 0
    },
    openAt: 1687973041,
    closeAt: 1688973041,
    claimAt: 1689973041,
    tokenId: '',
    status: 4,
    token1: {
      address: '0x0000000000000000000000000000000000000000',
      decimals: 18,
      name: 'Ethereum',
      symbol: 'eth',
      thumbUrl: 'https://assets.coingecko.com/coins/images/279/thumb/ethereum.png?1595348880',
      smallUrl: 'https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880',
      largeUrl: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
      coingeckoId: 'ethereum',
      currentPrice: 1881.9
    },
    amountTotal0: '10000000000000000000',
    amountTotal1: '100000000000000',
    swappedAmount0: '10000000000000000000',
    currentTotal0: '0',
    currentTotal1: '100000000000000',
    ratio: '0.00001',
    maxAmount1PerWallet: '0',
    participant: {
      address: '',
      swappedAmount0: '',
      claimed: false,
      regreted: false,
      currencySwappedAmount0: undefined,
      currencySwappedAmount1: undefined,
      currencyCurReleasableAmount: undefined,
      currencyCurClaimableAmount: undefined,
      currencyMyReleased: undefined
    },
    creatorUserInfo: {
      userId: 3018,
      name: '',
      avatar: '',
      publicRole: [],
      userType: 1,
      companyName: '',
      companyAvatar: '',
      companyIntroduction: '',
      isVerify: 0
    },
    likeInfo: {
      likeCount: 0,
      dislikeCount: 0,
      myLike: 1,
      myDislike: 1
    },
    ifCollect: false
  }
  const { account } = useActiveWeb3React()
  const isCreator = useMemo(() => testPoolInfo.creator === account, [account, testPoolInfo.creator])
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
              <PoolInfo />
            </Grid>
            <Grid item xs>
              <Box
                sx={{
                  background: 'rgba(18, 18, 18, 0.6)',
                  backdropFilter: 'blur(5px)',
                  borderRadius: '24px',
                  padding: '20px',
                  minHeight: '100vh'
                }}
              >
                {isCreator ? <CreatorBlock poolInfo={testPoolInfo} /> : <UserBlock poolInfo={testPoolInfo} />}
                <ActionHistory poolInfo={testPoolInfo}></ActionHistory>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  )
}
export default DutchCreatePage
