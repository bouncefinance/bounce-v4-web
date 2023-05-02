import { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Polling from '../components/essential/Polling'
import Popups from '../components/essential/Popups'
import Web3ReactManager from '../components/essential/Web3ReactManager'
// import WarningModal from '../components/Modal/WarningModal'
// import ComingSoon from './ComingSoon'
import { ModalProvider } from 'context/ModalContext'
import { routes } from 'constants/routes'
// import Footer from 'components/Footer'
import { Questions } from 'bounceComponents/common/Questions'
import { Provider as NiceModalProvider } from '@ebay/nice-modal-react'
import { Mobile } from 'bounceComponents/common/Mobile'
import { ShowOnMobile } from 'themes/context'
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

import Login from 'pages/login'

import Market from 'pages/market'
import MarketPools from 'pages/market/pools'
import MarketNFTPools from 'pages/market/nftAuctionPool'
import NFTAuction from 'pages/nftAuction'
import TokenAuctionPage from 'pages/tokenAuction'
// import AccountSettings from 'pages/profile/account/settings'
// import ProfileActivities from 'pages/profile/activities'
// import ProfileBasic from 'pages/profile/basic'
// import ProfileEditInvestments from 'pages/profile/edit/investments'
// import ProfileEditOverview from 'pages/profile/edit/overview'
// import ProfileEditSocial from 'pages/profile/edit/social'
import ProfileHome from 'pages/profile/home'

// import SignupThirdPartiesAccount from 'pages/signup/thirdPartiesAccount'

import SignupAccount from 'pages/signup/account'
import ComingSoon from './ComingSoon'

import AccountDashboard from 'pages/account/Dashboard'
import AccountMyProfile from 'pages/account/MyProfile'
import AccountMyAccount from 'pages/account/MyAccount'
import MyTokenOrNFT from 'pages/account/MyTokenOrNFT'

import AccountRealAuction from 'pages/account/AccountRealAuction'
import AccountAdsAuction from 'pages/account/AccountAdsAuction'

import { useLocationBlockInit } from 'hooks/useLocationBlock'
import { useRefreshUserInfoByFirstLoad } from 'state/users/hooks'

const GlobalHooks = () => {
  useGetOptionsData()
  useLocationBlockInit()
  useRefreshUserInfoByFirstLoad()
  return null
}

export default function App() {
  const { pathname } = useLocation()

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
              <Header />
              <ToastContainer />
              <Questions />
              <ShowOnMobile breakpoint="md">
                <Mobile />
              </ShowOnMobile>
              <BodyWrapper id="body">
                <Popups />
                <Polling />
                {/* <WarningModal /> */}
                <Web3ReactManager>
                  <Routes>
                    <Route path={routes.auction.createAuctionPool} element={<CreateAuctionPool />} />
                    <Route path={routes.auction.createAuctionPoolType} element={<CreateAuctionPoolType />} />

                    <Route path={routes.auction.fixedPrice} element={<AuctionFixedPricePoolId />} />
                    <Route path={routes.auction.fixedSwapNft} element={<AuctionFixedSwap1155PoolId />} />
                    <Route path={routes.auction.englishAuction} element={<EnglishAuctionNFTPoolId />} />
                    <Route path={routes.auction.randomSelection} element={<RandomSelectionPricePoolId />} />

                    <Route path={routes.login} element={<Login />} />

                    <Route path={routes.market.index} element={<Market />} />
                    <Route path={routes.market.pools} element={<MarketPools />} />
                    <Route path={routes.market.nftPools} element={<MarketNFTPools />} />
                    <Route path={routes.nftAuction.index} element={<NFTAuction />} />
                    <Route path={routes.tokenAuction.index} element={<TokenAuctionPage />} />

                    <Route path={routes.realAuction.index} element={<ComingSoon />} />
                    <Route path={routes.adsAuction.index} element={<ComingSoon />} />

                    {/* <Route path={routes.profile.account.settings} element={<AccountSettings />} />
                    <Route path={routes.profile.activities} element={<ProfileActivities />} />
                    <Route path={routes.profile.basic} element={<ProfileBasic />} />
                    <Route path={routes.profile.edit.investments} element={<ProfileEditInvestments />} />
                    <Route path={routes.profile.edit.overview} element={<ProfileEditOverview />} />
                    <Route path={routes.profile.edit.social} element={<ProfileEditSocial />} /> */}

                    <Route path={routes.profile.summary} element={<ProfileHome />} />

                    <Route path={routes.signup.account} element={<SignupAccount />} />
                    {/* <Route path={routes.signup.thirdPartiesAccount} element={<SignupThirdPartiesAccount />} /> */}

                    <Route path={routes.account.dashboard} element={<AccountDashboard />} />
                    <Route path={routes.account.myProfile} element={<AccountMyProfile />} />
                    <Route path={routes.account.myAccount} element={<AccountMyAccount />} />
                    <Route path={routes.account.tokenOrNFT} element={<MyTokenOrNFT />} />
                    <Route path={routes.account.realAuction} element={<AccountRealAuction />} />
                    <Route path={routes.account.adsAuction} element={<AccountAdsAuction />} />

                    <Route path="*" element={<Navigate to={routes.market.index} replace />} />
                    <Route path="/" element={<Navigate to={routes.market.index} replace />} />
                  </Routes>
                </Web3ReactManager>
              </BodyWrapper>
              {/* <Footer /> */}
            </ContentWrapper>
          </AppWrapper>
        </NiceModalProvider>
      </ModalProvider>{' '}
    </Suspense>
  )
}
