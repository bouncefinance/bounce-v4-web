import { Box, Button, Container, Stack, Typography } from '@mui/material'
import { Add } from '@mui/icons-material'
import AccountLayout from 'bounceComponents/account/AccountLayout'
import { useState } from 'react'
import tabStyles from './tabStyles'
import ChainSelect from 'bounceComponents/common/ChainSelect'
import AuctionTypeSelect from 'bounceComponents/common/AuctionTypeSelect'
import { PoolType } from 'api/pool/type'
import { useNavigate } from 'react-router-dom'
import { routes } from 'constants/routes'
enum ETabList {
  All = 'All',
  Upcoming = 'Upcoming',
  Live = 'Live',
  Close = 'Close'
}
const tabList = [ETabList.All, ETabList.Close, ETabList.Live, ETabList.Upcoming]
export default function AccountPrivateLaunchpad() {
  const [curTab, setCurTab] = useState(ETabList.All)
  const [curChain, setCurChain] = useState(0)
  const [curPoolType, setCurPoolType] = useState<PoolType | 0>(0)
  const navigate = useNavigate()
  return (
    <AccountLayout>
      <Box padding="40px 20px">
        <Container
          sx={{
            maxWidth: '1080px !important',
            position: 'relative'
          }}
        >
          <Typography variant="h3" fontSize={30}>
            Private Launchpad
          </Typography>
          <Stack sx={{ flexDirection: 'row', justifyContent: 'flex-start' }} mt={28}>
            {tabList.map((item, index) => (
              <Typography
                onClick={() => setCurTab(item)}
                sx={{
                  ...tabStyles.menu,
                  ...(item === curTab ? tabStyles.menuActive : ({} as any)),
                  padding: '16px 32px 12px 32px',
                  fontFamily: 'Public Sans',
                  borderRadius: '12px 12px 0px 0px'
                }}
                key={index}
              >
                {item}
              </Typography>
            ))}
          </Stack>
          <Box
            sx={{
              height: '100%',
              padding: '48px 40px',
              background: '#F6F6F3'
            }}
          >
            <Stack sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Stack sx={{ flexDirection: 'row', gap: 8 }}>
                <AuctionTypeSelect curPoolType={curPoolType} setCurPoolType={v => setCurPoolType(v)} />
                <ChainSelect curChain={curChain} setCurChain={i => setCurChain(i)} />
              </Stack>
              <Box>
                <Button
                  sx={{ height: 44 }}
                  variant="contained"
                  color="secondary"
                  onClick={() => navigate(routes.thirdPart.CreateLaunchpad)}
                >
                  <Add /> Create a pool
                </Button>
              </Box>
            </Stack>
          </Box>
        </Container>
      </Box>
    </AccountLayout>
  )
}
