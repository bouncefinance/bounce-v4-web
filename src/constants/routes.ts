export const routes = {
  auction: {
    createAuctionPool: '/auction/create-auction-pool',
    createAuctionPoolType: '/auction/create-auction-pool/:auctionType/:chainIdOrName/:tokenType',

    fixedSwapNft: '/auction/fixed-swap-1155/:chainShortName/:poolId',
    fixedPrice: '/auction/fixed-price/:chainShortName/:poolId',
    englishAuction: '/auction/english-auction/:chainShortName/:poolId',
    randomSelection: '/auction/random-selection/:chainShortName/:poolId',
    v2: {
      fixedSwapNft: '/auction/fixed-swap-1155/:sysId',
      fixedPrice: '/auction/fixed-price/:sysId',
      englishAuction: '/auction/english-auction/:sysId',
      randomSelection: '/auction/random-selection/:sysId'
    }
  },
  okxActivity: '/okxActivity/:chainShortName/:poolId',
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
    bladeDaoInfo: '/launchpad/bladedao/:chainShortName/:poolId'
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
    poseiswapAuction: '/launchpad/poseiswap/auction/:sysId',
    OmegaAuction: '/launchpad/omega/auction/:sysId',
    digitalAssetsOffering: '/launchpad/poseiswap-intro'
  },
  game: {
    bladeDaoIndex: '/playable/ghositerunner',
    bladeDaoRank: '/playable/bladedao/rank',
    bladeDaoPoolDetail: '/playable/ghositerunner/:chainShortName/:poolId',
    equilibriaIndex: '/playable/ghostierunner/equilibria',
    equilibriaDetail: '/playable/ghostierunner/equilibria/:chainShortName/:poolId'
  },
  foundo: {
    home: '/foundo/home/index',
    detail: 'foundo/detail/index'
  }
}
