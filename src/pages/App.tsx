import React, { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Polling from '../components/essential/Polling'
import Popups from '../components/essential/Popups'
import BigNumber from 'bignumber.js'

BigNumber.config({ EXPONENTIAL_AT: [-20, 40], ROUNDING_MODE: BigNumber.ROUND_DOWN })
import { Box } from '@mui/material'
import Lottie from 'lottie-react'
import bounce_loading from 'bounceComponents/common/BounceAnime/bounce-loading.json'
import { ModalProvider } from 'context/ModalContext'
import { routes } from 'constants/routes'
import { Provider as NiceModalProvider } from '@ebay/nice-modal-react'
import { ToastContainer } from 'react-toastify'
import { useGetOptionsData } from 'bounceHooks/useOptionsData'
import { AppWrapper, BodyWrapper, ContentWrapper } from './style'
import 'react-toastify/dist/ReactToastify.css'

import CreateAuctionPool from 'pages/auction/create-auction-pool/index'
import CreateAuctionPoolType from 'pages/auction/create-auction-pool/auctionType'
import AuctionFixedPricePoolId from 'pages/auction/fixed-price/poolId'
import RandomSelectionPricePoolId from 'pages/auction/randomSelection/poolId'
import AuctionFixedSwap1155PoolId from 'pages/auction/fixedSwap1155/poolId'
import EnglishAuctionNFTPoolId from 'pages/auction/englishAuctionNFT/poolId'
import DutchAuctionPoolId from './auction/dutchAuction/poolId'

import Login from 'pages/login'
import FirstLoginInfo from 'pages/login/FirstLoginInfo'

import Market from 'pages/market'
// import MarketPools from 'pages/market/pools'
import MarketNFTPools from 'pages/market/nftAuctionPool'
import NFTAuction from 'pages/nftAuction'
import RealWorldAuction from 'pages/realWorldAuction'
import AdsAuction from 'pages/adsAuction'

import TokenAuctionPage from 'pages/tokenAuction'
import ProfileHome from 'pages/profile/home'

import AccountDashboard from 'pages/account/Dashboard'
import AccountMyProfile from 'pages/account/MyProfile'
import AccountMyAccount from 'pages/account/MyAccount'
import AccountMyCredentials from 'pages/account/AccountMyCredentials'
import MyTokenOrNFT from 'pages/account/MyTokenOrNFT'

import AccountRealAuction from 'pages/account/AccountRealAuction'
import AccountAdsAuction from 'pages/account/AccountAdsAuction'
import AccountPrivateLaunchpad from 'pages/account/AccountPrivateLaunchpadComing'

import { useLocationBlockInit } from 'hooks/useLocationBlock'
import { useRefreshUserInfoByFirstLoad } from 'state/users/hooks'
import { Launchpad } from './launchpad'

import LaunchpadCoin from 'pages/launchpadCoin'

import LoginModal from 'components/Header/LoginModal'
import ERC20EnglishAuctionPoolId from './auction/erc20EnglishAuction/poolId'

import GoogleAnalyticsReporter from 'components/analytics/GoogleAnalyticsReporter'
// import MetaBlox from './projectIntro/MetaBloxProjectInfo'
import MultiToken from 'pages/multiToken'
import CreateMultiTokenPool from 'pages/multiToken/createPool'
import useBreakpoint from '../hooks/useBreakpoint'

const NftLottery = React.lazy(() => import('./nftLottery'))
const CreateLaunchpad = React.lazy(() => import('./launchpad/create-launchpad'))
const PoseiProjectInfo = React.lazy(() => import('./projectIntro/PoseiProjectInfo'))
const OkxActivity = React.lazy(() => import('./okxActivity/OkxActivity'))
const DidStakeAuctionPool = React.lazy(() => import('./stakeAuctionPool'))
const DidStakeDaiiPool = React.lazy(() => import('./stakeDAIIPool'))
const GoDidRs = React.lazy(() => import('./auction/randomSelection/GoDID/GoDIDRS'))
const AmmxStakeAuctionPool = React.lazy(() => import('./stakeAuctionAMMX'))
const AmmxStakeAuctionPoolTest = React.lazy(() => import('./stakeAuctionAMMXTest'))
const AmmxStakeDaiiPool = React.lazy(() => import('./stakeDaiiAMMX'))
const AmmxRandomSelection = React.lazy(() => import('./auction/randomSelection/Ladder-BitSwap/Index'))
const CreateNFTLotteryPool = React.lazy(() => import('./auction/create-auction-pool/createNFTLotteryPool'))
const DigitalAssetsOffering = React.lazy(() => import('pages/thirdPart/digitalAssetsOffering'))
const FundoHome = React.lazy(() => import('pages/fundo/home'))
const FundoDetail = React.lazy(() => import('pages/fundo/detail'))
const FoundoDetail = React.lazy(() => import('pages/thirdPart/foundoBidDetail'))
const FoundoNfcDetail = React.lazy(() => import('pages/thirdPart/nfcDetail'))
const IphoneDetail = React.lazy(() => import('./thirdPart/iphoneDetail'))
const ApplyToBeSeller = React.lazy(() => import('./realWorldAuction/applyToBeSeller'))
const BounceShop = React.lazy(() => import('./realWorldAuction/shop/bounce'))
const FoundoShop = React.lazy(() => import('./realWorldAuction/shop/foundo'))
const DipExchange = React.lazy(() => import('./dipExchange'))
const TelegramBot = React.lazy(() => import('pages/tgBot/index'))
const TelegramBotGuide = React.lazy(() => import('pages/tgBot/guider'))
const TelegramBotCreate = React.lazy(() => import('pages/tgBot/create'))
const TelegramBotHome = React.lazy(() => import('pages/tgBot/home'))
const Loyaltyprogram = React.lazy(() => import('./loyaltyprogram'))
const LaunchpadDetail = React.lazy(() => import('./launchpad/detail'))
const Party = React.lazy(() => import('./launchpad/detail/party'))
const ZataShop = React.lazy(() => import('./realWorldAuction/shop/zeta'))
const TokenToolBox = React.lazy(() => import('./tokenToolBox'))
const TokenLocker = React.lazy(() => import('./tokenToolBox/page/tokenlocker/tokenLocker'))
const Disperse = React.lazy(() => import('./tokenToolBox/page/disperse/disperse'))
const MyDisperse = React.lazy(() => import('./tokenToolBox/page/disperse/myDiperse'))
const TokenMinter = React.lazy(() => import('./tokenToolBox/page/tokenMinter/tokenMinter'))
const TokenInfo = React.lazy(() => import('./tokenToolBox/page/tokenMinter/TokenInfo'))
const LockerInfo = React.lazy(() => import('./tokenToolBox/page/tokenlocker/LockerInfo'))
const LockerLpInfo = React.lazy(() => import('./tokenToolBox/page/tokenlocker/LockerLpInfo'))
const MyToken = React.lazy(() => import('./tokenToolBox/page/tokenMinter/myToken'))
const MyLock = React.lazy(() => import('./tokenToolBox/page/tokenlocker/myLock'))
const MultiBitBridgeProjectInfo = React.lazy(() => import('./projectIntro/MultiBitBridgeProjectInfo'))
const LasmetaProjectInfo = React.lazy(() => import('./projectIntro/LasmetaProjectInfo'))
const BitStableProjectInfo = React.lazy(() => import('./projectIntro/BitStableProjectInfo'))
const SolaceProjectInfo = React.lazy(() => import('./projectIntro/SolaceProjectInfo'))
const CreateProtocolProjectInfo = React.lazy(() => import('./projectIntro/CreateProtocolProjectInfo'))
const FinceptorProjectInfo = React.lazy(() => import('./projectIntro/FinceptorProjectInfo'))
const OmegaProjectInfo = React.lazy(() => import('./projectIntro/OmegaProjectInfo'))
const TypeitProjectInfo = React.lazy(() => import('./projectIntro/TypeitProjectInfo'))
const TypeitProjectInfoWhiteList = React.lazy(() => import('./projectIntro/TypeitProjectInfoWhiteList'))
const OpenfabricProjectInfo = React.lazy(() => import('./projectIntro/OpenfabricProjectInfo'))
const DeelanceProjectInfo = React.lazy(() => import('./projectIntro/DeelanceProjectInfo'))
const DeelanceWhitelistProjectInfo = React.lazy(() => import('./projectIntro/DeelanceWhiteListProjectInfo'))
const SatoshiLpProjectInfo = React.lazy(() => import('./projectIntro/SatoshiLpProjectInfo'))
const SatoshiRandomProjectInfo = React.lazy(() => import('./projectIntro/SatoshiRandomProjectInfo'))
const GlobalHooks = () => {
  useGetOptionsData()
  useLocationBlockInit()
  useRefreshUserInfoByFirstLoad()
  return null
}

const UnSupportedMobileRouter = () => {
  return null
  // const { pathname } = useLocation()

  // const show = !pathname.includes('okxActivity')
  // return show ? (
  //   <ShowOnMobile breakpoint="md">
  //     <Mobile />
  //   </ShowOnMobile>
  // ) : null
}

function Loading() {
  return (
    <Box display={'flex'} justifyContent={'center'} marginTop={200}>
      <Lottie animationData={bounce_loading} loop={true} autoplay={true} style={{ width: 200, height: 200 }} />
    </Box>
  )
}

export default function App() {
  const { pathname } = useLocation()
  const isSm = useBreakpoint('sm')
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <Suspense fallback={<Loading />}>
      <ModalProvider>
        <NiceModalProvider>
          <AppWrapper id="app">
            <ContentWrapper>
              <GlobalHooks />
              <GoogleAnalyticsReporter />
              <LoginModal />
              <Header />
              <ToastContainer />
              {/* <Questions /> */}
              <UnSupportedMobileRouter />
              <BodyWrapper id="body" mt={isSm ? -51 : 'inherit'}>
                <Popups />
                <Polling />
                {/* <PerformKYCVerification /> */}
                {/* <WarningModal /> */}
                {/* <Web3ReactManager> */}
                <Routes>
                  <Route path={routes.auction.createAuctionPool} element={<CreateAuctionPool />} />
                  <Route path={routes.auction.createAuctionPoolType} element={<CreateAuctionPoolType />} />

                  <Route path={routes.auction.fixedPrice} element={<AuctionFixedPricePoolId />} />
                  <Route path={routes.auction.fixedSwapNft} element={<AuctionFixedSwap1155PoolId />} />
                  {/* <Route path={routes.auction.mutantEnglishAuction} element={<AuctionFixedSwap1155PoolId />} /> */}
                  <Route path={routes.auction.englishAuction} element={<EnglishAuctionNFTPoolId />} />
                  <Route path={routes.auction.randomSelection} element={<RandomSelectionPricePoolId />} />
                  <Route path={routes.auction.erc20EnglishAuction} element={<ERC20EnglishAuctionPoolId />} />
                  <Route path={routes.auction.dutchAuction} element={<DutchAuctionPoolId />} />
                  <Route path={routes.auction.createNftLotteryPool} element={<CreateNFTLotteryPool />} />
                  <Route path={routes.auction.v2.erc20EnglishAuction} element={<ERC20EnglishAuctionPoolId />} />
                  <Route path={routes.auction.v2.dutchAuction} element={<DutchAuctionPoolId />} />
                  <Route path={routes.auction.v2.fixedPrice} element={<AuctionFixedPricePoolId />} />
                  <Route path={routes.auction.v2.fixedSwapNft} element={<AuctionFixedSwap1155PoolId />} />
                  {/* <Route path={routes.auction.v2.mutantEnglishAuction} element={<AuctionFixedSwap1155PoolId />} /> */}
                  <Route path={routes.auction.v2.englishAuction} element={<EnglishAuctionNFTPoolId />} />
                  <Route path={routes.auction.v2.randomSelection} element={<RandomSelectionPricePoolId />} />

                  <Route path={routes.login} element={<Login />} />
                  <Route path={routes.loginBase} element={<FirstLoginInfo />} />

                  <Route path={routes.market.index} element={<Market />} />
                  {/* <Route path={routes.market.pools} element={<MarketPools />} /> */}
                  <Route path={routes.market.nftPools} element={<MarketNFTPools />} />
                  <Route path={routes.nftAuction.index} element={<NFTAuction />} />
                  <Route path={routes.tokenAuction.index} element={<TokenAuctionPage />} />

                  <Route path={routes.launchpad.index} element={<Launchpad />} />
                  {/* <Route
                      path={routes.launchpad.bladeDao}
                      element={<Navigate to={{ pathname: routes.launchpad.bladeDao + `/zksyncera/13` }} replace />}
                    />
                    <Route path={routes.launchpad.bladeDao} element={<BladeDao />} />
                    <Route path={routes.launchpad.bladeDaoInfo} element={<ProjectInfo />} /> */}

                  <Route path={routes.realAuction.index} element={<RealWorldAuction />} />
                  <Route path={routes.realAuction.applySeller} element={<ApplyToBeSeller />} />
                  <Route path={routes.realAuction.bounceShop} element={<BounceShop />} />
                  <Route path={routes.realAuction.foundoShop} element={<FoundoShop />} />
                  <Route path={routes.realAuction.zetaShop} element={<ZataShop />} />
                  <Route path={routes.adsAuction.index} element={<AdsAuction />} />

                  <Route path={routes.profile.summary} element={<ProfileHome />} />

                  <Route path={routes.account.dashboard} element={<AccountDashboard />} />
                  <Route path={routes.account.myProfile} element={<AccountMyProfile />} />
                  <Route path={routes.account.myAccount} element={<AccountMyAccount />} />
                  <Route path={routes.account.myCredentials} element={<AccountMyCredentials />} />
                  <Route path={routes.account.tokenAuction} element={<MyTokenOrNFT backedTokenType={1} />} />
                  <Route path={routes.account.nftAuction} element={<MyTokenOrNFT backedTokenType={2} />} />
                  <Route path={routes.account.realAuction} element={<AccountRealAuction />} />
                  <Route path={routes.account.adsAuction} element={<AccountAdsAuction />} />
                  <Route path={routes.account.myPrivateLaunchpad} element={<AccountPrivateLaunchpad />} />
                  <Route path={routes.thirdPart.digitalAssetsOffering} element={<DigitalAssetsOffering />} />
                  <Route path={routes.foundo.foundoDetail + '/*'} element={<FoundoDetail />} />
                  <Route path={routes.foundo.foundoNfcDetail + '/*'} element={<FoundoNfcDetail />} />
                  <Route path={routes.thirdPart.MultiBitBridge} element={<MultiBitBridgeProjectInfo />} />
                  <Route path={routes.thirdPart.AmmxAuction} element={<AmmxStakeAuctionPool />} />
                  <Route path={routes.thirdPart.AmmxAuctionTest} element={<AmmxStakeAuctionPoolTest />} />
                  <Route path={routes.thirdPart.AmmxDaii} element={<AmmxStakeDaiiPool />} />
                  <Route path={routes.thirdPart.AmmxRandom} element={<AmmxRandomSelection />} />
                  <Route path={routes.auction.createMultiTokenPool} element={<CreateMultiTokenPool />} />
                  <Route path={routes.thirdPart.SatoshiVMLp} element={<SatoshiLpProjectInfo />} />
                  <Route path={routes.thirdPart.SatoshiVMRandom} element={<SatoshiRandomProjectInfo />} />
                  <Route path={routes.auction.createMultiTokenPool} element={<CreateMultiTokenPool />} />

                  <Route
                    path={routes.thirdPart.digitalAssetsOffering + '/:referral'}
                    element={<DigitalAssetsOffering />}
                  />
                  <Route path={routes.foundo.home} element={<FundoHome />} />
                  <Route path={routes.foundo.detail} element={<FundoDetail />} />
                  <Route path={routes.thirdPart.digitalAssetsOffering} element={<DigitalAssetsOffering />} />
                  <Route path={routes.thirdPart.poseiswapAuction} element={<PoseiProjectInfo />} />
                  <Route path={routes.thirdPart.OmegaAuction} element={<OmegaProjectInfo />} />
                  <Route path={routes.thirdPart.TypeitAuction} element={<TypeitProjectInfo />} />
                  <Route path={routes.thirdPart.TypeitAuctionWhitelist} element={<TypeitProjectInfoWhiteList />} />
                  <Route path={routes.thirdPart.OpenfabricAuction} element={<OpenfabricProjectInfo />} />
                  <Route path={routes.thirdPart.DeelanceAuction} element={<DeelanceProjectInfo />} />
                  <Route path={routes.thirdPart.DeelanceAuctionWhitelist} element={<DeelanceWhitelistProjectInfo />} />
                  {/* <Route path={routes.thirdPart.BitStable} element={<BitStableProjectInfoAuction />} /> */}
                  <Route path={routes.thirdPart.BitStableAuction} element={<LaunchpadCoin />} />
                  <Route path={routes.thirdPart.LasMetaAuction} element={<LasmetaProjectInfo />} />
                  <Route path={routes.thirdPart.DipExchange} element={<DipExchange />} />
                  {/* <Route path={routes.thirdPart.MetaBloxAuction} element={<MetaBlox />} /> */}
                  <Route path={routes.thirdPart.SolaceAuction} element={<SolaceProjectInfo />} />
                  <Route path={routes.thirdPart.CreateProtocolAuction} element={<CreateProtocolProjectInfo />} />
                  <Route path={routes.thirdPart.CreateLaunchpad} element={<CreateLaunchpad />} />
                  <Route path={routes.launchpad.account.launchpadDetail} element={<LaunchpadDetail />} />
                  <Route path={routes.launchpad.account.launchpadParty} element={<Party />} />
                  {/* <Route path={routes.thirdPart.MetaBloxAuction} element={<MetaBlox />} /> */}
                  <Route path={routes.thirdPart.CreateLaunchpad} element={<CreateLaunchpad />} />
                  <Route path={routes.thirdPart.FinceptorAuction} element={<FinceptorProjectInfo />} />
                  <Route path={routes.thirdPart.BitStable} element={<BitStableProjectInfo />} />
                  <Route path={routes.thirdPart.Did.stake} element={<DidStakeAuctionPool />} />
                  <Route path={routes.thirdPart.Did.dll} element={<DidStakeDaiiPool />} />
                  <Route path={routes.thirdPart.Did.pool} element={<GoDidRs />} />
                  <Route path={routes.thirdPart.Port3} element={<MultiToken />} />

                  <Route path={routes.tokenToolBox.index} element={<TokenToolBox />} />
                  <Route path={routes.tokenToolBox.tokenLocker} element={<TokenLocker />} />
                  <Route path={routes.tokenToolBox.myLock} element={<MyLock />} />
                  <Route path={routes.tokenToolBox.tokenLockerInfo} element={<LockerInfo />} />
                  <Route path={routes.tokenToolBox.TokenLPLockerInfo} element={<LockerLpInfo />} />
                  <Route path={routes.tokenToolBox.disperse} element={<Disperse />} />
                  <Route path={routes.tokenToolBox.myDisperse} element={<MyDisperse />} />
                  <Route path={routes.tokenToolBox.tokenMinter} element={<TokenMinter />} />
                  <Route path={`${routes.tokenToolBox.tokenMinterInfo}/:chain/:token`} element={<TokenInfo />} />
                  <Route path={routes.tokenToolBox.tokenMinterList} element={<MyToken />} />
                  <Route path={routes.telegramBot.index} element={<TelegramBot />} />
                  <Route path={routes.telegramBot.guide} element={<TelegramBotGuide />} />
                  <Route path={routes.telegramBot.create} element={<TelegramBotCreate />} />
                  <Route path={routes.telegramBot.home} element={<TelegramBotHome />} />

                  <Route path={routes.loyaltyprogram.index} element={<Loyaltyprogram />} />
                  <Route path={routes.thirdPart.IphoneAuctionDetail} element={<IphoneDetail />} />

                  <Route path={routes.nftLottery.index} element={<NftLottery />} />

                  {/* <Route path={routes.game.bladeDaoIndex} element={<Game />} /> */}
                  {/* <Route
                      path={routes.game.bladeDaoIndex}
                      element={<Navigate to={{ pathname: routes.game.bladeDaoIndex + `/zksyncera/6` }} replace />}
                    />
                    <Route
                      path={routes.game.equilibriaIndex}
                      element={<Navigate to={{ pathname: routes.game.equilibriaIndex + `/ARBI/15` }} replace />}
                    /> */}
                  {/* <Route path={routes.game.bladeDaoRank} element={<Rank />} /> */}
                  {/* <Route path={routes.game.equilibriaIndex} element={<Equilibria />} /> */}
                  {/* <Route path={routes.game.equilibriaDetail} element={<Equilibria />} /> */}
                  {/* <Route path={routes.game.bladeDaoPoolDetail} element={<Game />} /> */}
                  <Route path={routes.okxActivity} element={<OkxActivity />} />
                  <Route path="*" element={<Navigate to={routes.market.index} replace />} />
                  <Route path="/" element={<Navigate to={routes.market.index} replace />} />
                </Routes>
                {/* </Web3ReactManager> */}
              </BodyWrapper>
              {/* <Footer /> */}
            </ContentWrapper>
          </AppWrapper>
        </NiceModalProvider>
      </ModalProvider>
    </Suspense>
  )
}
