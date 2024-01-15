import { Stack, Tab, Tabs, Typography, styled } from '@mui/material'
// import useBreakpoint from 'hooks/useBreakpoint'
import { useState } from 'react'
import Icon1 from 'assets/imgs/nftLottery/tokenInformation/token-icon1.svg'
import Icon2 from 'assets/images/eth_logo.png'
const TabsCom = styled(Tabs)({
  display: 'flex',
  width: '100%',
  height: 'auto',
  minHeight: 40,
  padding: '6px',
  borderRadius: '100px',
  justifyContent: 'center',
  color: '#959595',
  textAlign: 'center',
  '& button': {
    padding: '4px 16px',
    height: 32
  },
  '&.active': {
    background: '#E1F25C',
    button: {
      color: '#121212'
    }
  }
})

export default function Page() {
  const Tabs = [
    {
      name: 'SAVM',
      icon: Icon1
    },
    {
      name: 'ETH',
      icon: Icon2
    }
  ]
  const [curTab, setCurTab] = useState(0)
  // const isSm = useBreakpoint('sm')
  return (
    <Stack
      spacing={40}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '24px',
        margin: '40px 72px',
        padding: '24px 56px 65px',
        background: '#fff'
      }}
    >
      <Stack
        sx={{
          width: '100%',
          maxWidth: 1440,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'row',
          margin: '0 auto',
          justifyContent: 'center',
          padding: '6px',
          borderRadius: '100px',
          border: '1px solid #959595'
        }}
      >
        {Tabs.map((tab, idx) => (
          <TabsCom
            sx={{ cursor: idx === curTab ? 'auto' : 'pointer' }}
            key={idx}
            onClick={() => setCurTab(idx)}
            className={idx === curTab ? 'active' : ''}
          >
            <Tab
              className={idx === curTab ? 'active' : ''}
              label={tab.name}
              sx={{ textAlign: 'center', margin: '0 auto', fontSize: 16, fontWeight: 500, color: '#959595' }}
            ></Tab>
          </TabsCom>
        ))}
      </Stack>
      <Typography sx={{ width: '100%', textAlign: 'center' }} fontSize={28} fontWeight={600} color={'#000'}>
        Price Range
      </Typography>
      <Stack direction={'row'} alignItems={'center'} spacing={16}>
        <Stack
          spacing={24}
          sx={{
            width: '100%',
            textAlign: 'center',
            padding: '20px 40px',
            borderRadius: '12px',
            background: '#F6F6F3'
          }}
        >
          <Typography sx={{ width: '100%', textAlign: 'left' }} fontSize={20} color={'#20201E'} fontWeight={600}>
            Min Price
          </Typography>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Stack direction={'row'} alignItems={'center'} spacing={16}>
              <img width={32} height={32} src={Tabs[curTab].icon} alt="icon-eth" />
              <Typography fontSize={16} color={'#20201E'} fontWeight={500}>
                {Tabs[curTab].name.toLocaleUpperCase()}
              </Typography>
            </Stack>
            <Typography fontSize={16} color={'#20201E'} fontWeight={500}>
              $ 18.82
            </Typography>
          </Stack>
        </Stack>
        <Stack
          spacing={24}
          sx={{
            width: '100%',
            textAlign: 'center',
            padding: '20px 40px',
            borderRadius: '12px',
            background: '#F6F6F3'
          }}
        >
          <Typography sx={{ width: '100%', textAlign: 'left' }} fontSize={20} color={'#20201E'} fontWeight={600}>
            Max Price
          </Typography>
          <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'}>
            <Stack direction={'row'} alignItems={'center'} spacing={16}>
              <img width={32} height={32} src={Tabs[curTab].icon} alt="icon-eth" />
              <Typography fontSize={16} color={'#20201E'} fontWeight={500}>
                {Tabs[curTab].name.toLocaleUpperCase()}
              </Typography>
            </Stack>
            <Typography fontSize={16} color={'#20201E'} fontWeight={500}>
              $ 18.82
            </Typography>
          </Stack>
        </Stack>
      </Stack>
      <Stack
        spacing={24}
        sx={{
          width: '100%',
          textAlign: 'center',
          padding: '20px 40px',
          borderRadius: '12px',
          background: '#F6F6F3'
        }}
      >
        <Typography fontSize={20} color={'#20201E'} fontWeight={600}>
          Current Price
        </Typography>
        <Typography fontSize={36} color={'#2B51DA'} fontWeight={600}>
          $ 18.82
        </Typography>
        <Typography fontSize={16} color={'#20201E'} fontWeight={500}>
          {Tabs[0].name.toLocaleUpperCase()} per {Tabs[1].name.toLocaleUpperCase()}
        </Typography>
      </Stack>
    </Stack>
  )
}
