import React, {
  useState
  // , useCallback, useEffect
} from 'react'
import { Tab, Tabs, styled, Box } from '@mui/material'
import { useValuesState } from 'bounceComponents/create-auction-pool/ValuesProvider'
import { TgBotTabValue } from 'bounceComponents/create-auction-pool/types'
import Dashboard from '../dashboard'
import Account from '../account'
import BotSetup from '../botSetup'
import ValuesProvider from 'bounceComponents/create-auction-pool/ValuesProvider'
import HeaderTab from 'bounceComponents/auction/HeaderTab'
import FooterPc from 'components/Footer/FooterPc'
// import { useActiveWeb3React } from 'hooks'
// import { routes } from 'constants/routes'
// import { useNavigate } from 'react-router-dom'

const CusTabs = styled(Tabs)`
  margin-top: 24px;
  .MuiTabs-scroller {
    border-bottom: 1px solid rgba(18, 18, 18, 0.1);
  }
  .MuiTabs-indicator {
    background-color: #121212;
  }
  .MuiTab-textColorInherit {
    color: rgba(18, 18, 18, 0.6);
  }
  .Mui-selected {
    color: #121212 !important;
  }
  .MuiTabs-flexContainer {
    gap: 64px;
  }
`
const ContexContainer = styled(Box)`
  width: 100%;
  @media (min-width: 640px) {
    padding: 0 72px;
  }
`
const TabItemContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  margin: 60px 0 42px;
`

const TabItem = ({ tabValue }: { tabValue: TgBotTabValue }) => {
  if (tabValue === TgBotTabValue.AUCTION) {
    return <Dashboard />
  }
  if (tabValue === TgBotTabValue.ACCOUNT) {
    return <Account />
  }
  if (tabValue === TgBotTabValue.BOTSETUP) {
    return <BotSetup />
  }
  return null
}

const HomePage = () => {
  const valuesState = useValuesState()
  const [tgBotTab, setTgBotTab] = useState(valuesState.tgBotTabValue)
  // const { account } = useActiveWeb3React()
  // const navigate = useNavigate()

  // const unAccount = useCallback(() => {
  //   if (!account) {
  //     navigate(routes.telegramBot.guide)
  //   }
  // }, [navigate, account])
  // unAccount()

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (event: React.ChangeEvent<{}>, newValue: TgBotTabValue) => {
    setTgBotTab(newValue)
  }
  return (
    <ValuesProvider>
      <ContexContainer>
        <CusTabs
          value={tgBotTab}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
        >
          <Tab label="Auction" value={TgBotTabValue.AUCTION} />
          <Tab label="Account" value={TgBotTabValue.ACCOUNT} />
          <Tab label="Bot setup" value={TgBotTabValue.BOTSETUP} />
        </CusTabs>
        <TabItemContainer>
          <TabItem tabValue={tgBotTab} />
        </TabItemContainer>
      </ContexContainer>
    </ValuesProvider>
  )
}
export default function Home() {
  return (
    <ValuesProvider>
      <HeaderTab onTabChange={(tab: any) => console.log(tab)} />
      <HomePage />
      <FooterPc />
    </ValuesProvider>
  )
}
