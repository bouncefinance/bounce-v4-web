export const routes = {
  auction: {
    createAuctionPool: '/auction/create-auction-pool',
    createAuctionPoolType: '/auction/create-auction-pool/:auctionType/:chainIdOrName/:tokenType',
    fixedSwapNft: '/auction/fixed-swap-1155/:chainShortName/:poolId',
    fixedPrice: '/auction/fixed-price/:chainShortName/:poolId',
    englishAuction: '/auction/english-auction/:chainShortName/:poolId',
    randomSelection: '/auction/random-selection/:chainShortName/:poolId'
  },
  login: '/login',
  loginBase: '/login_base',
  market: {
    index: '/market',
    pools: '/market/pools',
    nftPools: '/market/nft-pools'
  },
  nftAuction: {
    index: '/NFTAuction'
  },
  tokenAuction: {
    index: '/TokenAuction'
  },
  launchpad: {
    index: '/launchpad',
    bladeDao: '/launchpad/bladedao',
    projectInfo: '/launchpad/bladedao/:chainShortName/:poolId'
  },
  realAuction: {
    index: '/real-auction'
  },
  adsAuction: {
    index: '/ads-auction'
  },
  profile: {
    account: {
      settings: '/profile/account/settings'
    },
    activities: '/profile/activities',
    basic: '/profile/basic',
    edit: {
      investments: '/profile/edit/investments',
      overview: '/profile/edit/overview',
      social: '/profile/edit/social'
    },
    portfolio: '/profile/portfolio',
    summary: '/profile/summary',
    summaryReal: '/profile/summary/real',
    summaryAds: '/profile/summary/ads'
  },
  signup: {
    account: '/signup/account',
    thirdPartiesAccount: '/signup/thirdPartiesAccount'
  },
  account: {
    dashboard: '/account/dashboard',
    myProfile: '/account/my_profile',
    myAccount: '/account/my_account',
    myCredentials: '/account/my_credentials',
    tokenAuction: '/account/token_auction',
    nftAuction: '/account/nft_auction',
    realAuction: '/account/real_auction',
    adsAuction: '/account/ads_auction',
    myPrivateLaunchpad: '/account/private_launchpad'
  },
  thirdPart: {
    digitalAssetsOffering: '/launchpad/poseiswap-intro'
  },
  game: {
    bladeDaoIndex: '/playable/ghositerunner',
    equilibriaIndex: '/playable/ghositerunner/equilibria',
    bladeDaoPoolDetail: '/playable/ghositerunner/:chainShortName/:poolId'
  }
}
