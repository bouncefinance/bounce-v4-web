export const routes = {
  auction: {
    createAuctionPool: '/auction/create-auction-pool',
    createAuctionPoolType: '/auction/create-auction-pool/:auctionType/:chainIdOrName/:tokenType',
    fixedSwapNft: '/auction/fixed-swap-1155/:chainShortName/:poolId',
    fixedPrice: '/auction/fixed-price/:chainShortName/:poolId',
    englishAuction: '/auction/english-auction/:chainShortName/:poolId',
    randomSelection: '/auction/random-selection/:chainShortName/:poolId',
    dutchAuction: '/auction/dutch-auction/:chainShortName/:poolId',
    erc20EnglishAuction: '/auction/erc20-english-auction/:chainShortName/:poolId',
    // mutantEnglishAuction: '/auction/mutant-english-auction/:chainShortName/:poolId',
    v2: {
      fixedSwapNft: '/auction/fixed-swap-1155/:sysId',
      fixedPrice: '/auction/fixed-price/:sysId',
      englishAuction: '/auction/english-auction/:sysId',
      randomSelection: '/auction/random-selection/:sysId',
      dutchAuction: '/auction/dutch-auction/:sysId',
      erc20EnglishAuction: '/auction/erc20-english-auction/:sysId'
      // mutantEnglishAuction: '/auction/mutant-english-auction/:sysId'
    }
  },
  okxActivity: '/okxActivity/:chainShortName/:poolId',
  login: '/login',
  loginBase: '/login_base',
  market: {
    index: '/market',
    // pools: '/market/pools',
    nftPools: '/market/nft-pools'
  },
  nftAuction: {
    index: '/NFTAuction'
  },
  tokenAuction: {
    index: '/TokenAuction'
  },
  telegramBot: {
    index: '/TelegramBot',
    guide: '/TelegramBot/guide',
    create: '/TelegramBot/create',
    home: '/TelegramBot/home'
  },
  dutchAuction: {
    index: '/DutchAuction'
  },
  launchpad: {
    index: '/launchpad',
    bladeDao: '/launchpad/bladedao',
    bladeDaoInfo: '/launchpad/bladedao/:chainShortName/:poolId',
    account: {
      launchpadDetail: '/account/launchpad/:id',
      launchpadParty: '/launchpad/party/:id'
    }
  },
  realAuction: {
    index: '/real-auction',
    applySeller: '/real-auction/apply-seller',
    bounceShop: '/real-auction/bounce',
    zetaShop: '/real-auction/zeta',
    foundoShop: '/real-auction/foundo'
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
    digitalAssetsOffering: '/launchpad/poseiswap-intro',
    OmegaAuction: '/launchpad/omega/auction/:sysId',
    TypeitAuction: '/launchpad/typeit/:sysId',
    TypeitAuctionWhitelist: '/launchpad/typeit/whitelist/:sysId',
    OpenfabricAuction: '/launchpad/openfabric',
    DeelanceAuction: '/launchpad/deelance',
    DeelanceAuctionWhitelist: '/launchpad/deelance/whitelist',
    LasMetaAuction: '/launchpad/lasmeta',
    DipExchange: '/launchpad/dip_exchange',
    CreateLaunchpad: '/launchpad/create',
    MetaBloxAuction: '/launchpad/metablox',
    SolaceAuction: '/launchpad/solace',
    CreateProtocolAuction: '/launchpad/create_protocol',
    IphoneAuctionDetail: '/rwa/iphone15',
    FinceptorAuction: '/launchpad/finceptor',
    MultiBitBridge: '/launchpad/multi-bit'
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
    detail: '/foundo/detail/index',
    foundoDetail: '/rwa/detail',
    foundoNfcDetail: '/rwa/nfc_detail'
  },
  tokenToolBox: {
    index: '/TokenToolBox',
    tokenLocker: '/TokenToolBox/TokenLocker',
    myLock: '/TokenToolBox/TokenLocker/myLock',
    tokenLockerInfo: '/TokenToolBox/TokenLockerInfo/:chain/:hash',
    TokenLPLockerInfo: '/TokenToolBox/TokenLPLockerInfo/:chain/:hash',
    disperse: '/TokenToolBox/Disperse',
    tokenMinter: '/TokenToolBox/tokenMinter',
    tokenMinterInfo: '/TokenToolBox/tokenMinterInfo',
    tokenMinterList: '/TokenToolBox/tokenMinterList',
    myDisperse: '/TokenToolBox/MyDisperse'
  },
  loyaltyprogram: {
    index: '/Loyaltyprogram'
  }
}
