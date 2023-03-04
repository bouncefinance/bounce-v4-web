import { Suspense, useEffect } from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { Container, styled } from '@mui/material'
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

import Login from 'pages/login'
import Signup from 'pages/signup'
import { Mobile } from 'bounceComponents/common/Mobile'
import { ShowOnMobile } from 'themes/context'
import { ToastContainer } from 'react-toastify'

const AppWrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'flex-start',
  overflowX: 'hidden',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    minHeight: '100vh'
  }
}))

const ContentWrapper = styled('div')({
  width: '100%'
  // maxHeight: '100vh',
  // overflow: 'auto',
  // alignItems: 'center'
})

const BodyWrapper = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  minHeight: `calc(100vh - ${theme.height.header})`,
  padding: '50px 0 80px',
  justifyContent: 'center',
  alignItems: 'center',
  flex: 1,
  // overflowY: 'auto',
  overflowX: 'hidden',
  position: 'relative',
  [theme.breakpoints.down('md')]: {
    minHeight: `calc(100vh - ${theme.height.header} - ${theme.height.mobileHeader})`,
    paddingTop: 20
  }
}))

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
              <Header />
              <ToastContainer />
              <Questions />
              <ShowOnMobile breakpoint="md">
                <Mobile />
              </ShowOnMobile>
              <BodyWrapper id="body" maxWidth="xl">
                <Popups />
                <Polling />
                {/* <WarningModal /> */}
                <Web3ReactManager>
                  <Routes>
                    <Route path={routes.login} element={<Login />} />
                    <Route path={routes.signup.index} element={<Signup />} />
                    {/* <Route path={routes.test2} element={<ComingSoon />} />
                      <Route path={routes.test3 + routes.test3Desc} element={<ComingSoon />} />
                    </Route> */}
                    <Route path="*" element={<Navigate to={routes.login} replace />} />
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
