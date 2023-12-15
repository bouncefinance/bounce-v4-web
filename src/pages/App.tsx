import { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Polling from '../components/essential/Polling'
import Popups from '../components/essential/Popups'
import BigNumber from 'bignumber.js'

BigNumber.config({ EXPONENTIAL_AT: [-10, 40] })
import { ModalProvider } from 'context/ModalContext'
import { routes } from 'constants/routes'
// import Footer from 'components/Footer'
// import { Questions } from 'bounceComponents/common/Questions'
import { Provider as NiceModalProvider } from '@ebay/nice-modal-react'
// import { Mobile } from 'bounceComponents/common/Mobile'
// import { ShowOnMobile } from 'themes/context'
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
import TelegramBot from 'pages/tgBot/index'
import TelegramBotGuide from 'pages/tgBot/guider'
import TelegramBotCreate from 'pages/tgBot/create'
import TelegramBotHome from 'pages/tgBot/home'
import DigitalAssetsOffering from 'pages/thirdPart/digitalAssetsOffering'
import FundoHome from 'pages/fundo/home'
import FundoDetail from 'pages/fundo/detail'
import FoundoDetail from 'pages/thirdPart/foundoBidDetail'
import FoundoNfcDetail from 'pages/thirdPart/nfcDetail'
import { useLocationBlockInit } from 'hooks/useLocationBlock'
import { useRefreshUserInfoByFirstLoad } from 'state/users/hooks'
import { Launchpad } from './launchpad'
// import { BladeDao } from './projectIntro'
// import { Game } from './game'
import { ProjectInfo as PoseiProjectInfo } from './projectIntro/PoseiProjectInfo'
import OmegaProjectInfo from './projectIntro/OmegaProjectInfo'
import TypeitProjectInfo from './projectIntro/TypeitProjectInfo'
import TypeitProjectInfoWhiteList from './projectIntro/TypeitProjectInfoWhiteList'
import OpenfabricProjectInfo from './projectIntro/OpenfabricProjectInfo'
import DeelanceProjectInfo from './projectIntro/DeelanceProjectInfo'
import DeelanceWhitelistProjectInfo from './projectIntro/DeelanceWhiteListProjectInfo'
import CreateLaunchpad from './launchpad/create-launchpad'
import LasmetaProjectInfo from './projectIntro/LasmetaProjectInfo'
import BitStableProjectInfo from './projectIntro/BitStableProjectInfo'
// import BitStableProjectInfoAuction from './projectIntro/BitStableProjectInfoAuction'
import DipExchange from './dipExchange'
import SolaceProjectInfo from './projectIntro/SolaceProjectInfo'
import CreateProtocolProjectInfo from './projectIntro/CreateProtocolProjectInfo'
import FinceptorProjectInfo from './projectIntro/FinceptorProjectInfo'
import LaunchpadCoin from 'pages/launchpadCoin'

import MultiBitBridgeProjectInfo from './projectIntro/MultiBitBridgeProjectInfo'
// import { Equilibria } from './game/equilibria'
// import { Rank } from './launchpad/rank'

import OkxActivity from './okxActivity/OkxActivity'
import LoginModal from 'components/Header/LoginModal'
import ERC20EnglishAuctionPoolId from './auction/erc20EnglishAuction/poolId'
// import PerformKYCVerification from 'bounceComponents/profile/account/components/PerformKYCVerification'
import { ApplyToBeSeller } from './realWorldAuction/applyToBeSeller'
import BounceShop from './realWorldAuction/shop/bounce'
import FoundoShop from './realWorldAuction/shop/foundo'
import TokenToolBox from './tokenToolBox'
import TokenLocker from './tokenToolBox/page/tokenlocker/tokenLocker'
import Loyaltyprogram from './loyaltyprogram'
import GoogleAnalyticsReporter from 'components/analytics/GoogleAnalyticsReporter'
// import MetaBlox from './projectIntro/MetaBloxProjectInfo'
import LaunchpadDetail from './launchpad/detail'
import Party from './launchpad/detail/party'
import ZataShop from './realWorldAuction/shop/zeta'
import IphoneDetail from './thirdPart/iphoneDetail'
import Disperse from './tokenToolBox/page/disperse/disperse'
import MyDisperse from './tokenToolBox/page/disperse/myDiperse'
import TokenMinter from './tokenToolBox/page/tokenMinter/tokenMinter'
import TokenInfo from './tokenToolBox/page/tokenMinter/TokenInfo'
import LockerInfo from './tokenToolBox/page/tokenlocker/LockerInfo'
import LockerLpInfo from './tokenToolBox/page/tokenlocker/LockerLpInfo'
import MyToken from './tokenToolBox/page/tokenMinter/myToken'
import MyLock from './tokenToolBox/page/tokenlocker/myLock'
import useBreakpoint from '../hooks/useBreakpoint'
import DidStakeAuctionPool from './stakeAuctionPool'
import DidStakeDaiiPool from './stakeDAIIPool'
import GoDidRs from './auction/randomSelection/GoDID/GoDIDRS'
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

export default function App() {
  const { pathname } = useLocation()
  const isSm = useBreakpoint('sm')
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return (
    <Suspense fallback={null}>
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
