import { Box, Container, Stack, Typography } from '@mui/material'
import AccountLayout from 'bounceComponents/account/AccountLayout'
import { useState } from 'react'
import tabStyles from './tabStyles'
enum ETabList {
  All = 'All',
  Upcoming = 'Upcoming',
  Live = 'Live',
  Close = 'Close'
}
const tabList = [ETabList.All, ETabList.Close, ETabList.Live, ETabList.Upcoming]
export default function AccountPrivateLaunchpad() {
  const [curTab, setCurTab] = useState(ETabList.All)

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
                  fontFamily: 'Public Sans'
                }}
                key={index}
              >
                {item}
              </Typography>
            ))}
          </Stack>
        </Container>
      </Box>
    </AccountLayout>
  )
}
