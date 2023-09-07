import { Box, Stack, styled, Typography } from '@mui/material'
import { useEffect, useState } from 'react'
import { useActiveWeb3React } from 'hooks'
import { Body02 } from 'components/Text'
import { useShowLoginModal } from 'state/users/hooks'
import TokenLockerForm from '../components/tokenLockerForm'
import TOkenLPLockerForm from '../components/tokenLPLockerForm'

enum Tabstype {
  'Token' = 0,
  'LP Token' = 1
}
const Tab = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  padding: 24px;
  gap: 10px;
  width: 240px;
  height: 76px;
  background: transparent;
  border-radius: 20px 20px 0px 0px;
  font-family: Public Sans;
  font-size: 20px;
  color: #626262;
  font-weight: 600;
  &.active {
    background: #ffffff;
    border-radius: 10px 10px 0 0;
    color: #121212;
  }

  &:hover {
    background: var(--ps-yellow-1);
    border-radius: 10px 10px 0 0;
  }

  &.active:hover {
    background: #ffffff;
    border-radius: 10px 10px 0 0;
  }

  @media (max-width: 600px) {
    padding: 12px 16px;
    height: 45px;
    width: max-content;
  }
`
const TokenLocker = () => {
  const Tabs = [Tabstype.Token, Tabstype['LP Token']]
  const [currentTab, setCurrentTab] = useState(Tabstype.Token)
  const showLoginModal = useShowLoginModal()
  const { account } = useActiveWeb3React()
  useEffect(() => {
    !account && showLoginModal()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])
  return (
    <>
      <ContainerBox>
        <Title
          sx={{
            marginBottom: '48px'
          }}
        >
          Token locker
        </Title>
        <Stack direction={'row'} justifyContent={'flex-start'}>
          {Tabs.map((tab, index) => {
            return (
              <Tab
                key={index}
                sx={{ cursor: tab === currentTab ? 'auto' : 'pointer' }}
                onClick={() => setCurrentTab(tab)}
                className={tab === currentTab ? 'active' : ''}
              >
                {Tabstype[tab]}
              </Tab>
            )
          })}
        </Stack>
        {currentTab === Tabstype.Token && <TokenLockerForm />}
        {currentTab === Tabstype['LP Token'] && <TOkenLPLockerForm />}
      </ContainerBox>
      <FooterBox>
        <Body02 sx={{ fontSize: 13, color: '#959595' }}>©2023 Bounce dao Ltd. All rights reserved.</Body02>
        <Stack flexDirection={'row'} gap={40}>
          <Body02 sx={{ fontSize: 13, color: '#959595' }}>Terms Of Service</Body02>
          <Body02 sx={{ fontSize: 13, color: '#959595' }}>Privacy Policy</Body02>
        </Stack>
      </FooterBox>
    </>
  )
}
export const ContainerBox = styled(Box)({
  width: '100%',
  maxWidth: 1164,
  margin: '48px auto',
  padding: '0 82px',
  '@media(max-width:600px)': {
    padding: '0'
  }
})
export const Title = styled(Typography)({
  fontFamily: 'Public Sans',
  fontSize: '36px',
  fontStyle: 'normal',
  fontWeight: 600,
  lineHeight: '130%',
  letterSpacing: '-0.56px',
  textTransform: 'capitalize',
  textAlign: 'left',
  color: '#20201E'
})
const FooterBox = styled(Box)({
  width: '100%',
  maxWidth: '100%',
  height: 72,
  margin: '72px auto 20px',
  padding: '0 40px',
  display: 'flex',
  alignItems: 'end',
  justifyContent: 'space-between',
  '& p': {
    color: 'rgba(18, 18, 18, 0.60)'
  },
  '@media(max-width:600px)': {
    flexDirection: 'column-reverse',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    margin: '24px auto 32px'
  }
})
export default TokenLocker
