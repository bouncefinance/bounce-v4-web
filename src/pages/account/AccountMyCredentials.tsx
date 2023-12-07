import { Box, Container, Typography, Skeleton, Stack, Chip } from '@mui/material'
import AccountAvatar from 'bounceComponents/account/AccountAvatar'
import AccountLayout from 'bounceComponents/account/AccountLayout'
import VerifiedIcon from 'bounceComponents/common/VerifiedIcon'
import SocialMediaButtonGroup from 'bounceComponents/fixed-swap/CreatorInfoCard/SocialMediaButtonGroup'
import countries from 'i18n-iso-countries'
import useBreakpoint from 'hooks/useBreakpoint'
import { useState } from 'react'
import { useUserInfo } from 'state/users/hooks'
import WhitelistAuctionTab from 'bounceComponents/account/PreAuctionTab/WhitelistAuctionTab'
import MyCredentialTab from 'bounceComponents/account/PreAuctionTab/CredentialTab'
import PreAuctionActivityTab from 'bounceComponents/account/PreAuctionTab/PreAuctionActivityTab'

enum TabListProp {
  'My_Credentials' = 'My Credentials',
  'My_Pre_Auction_Activity' = 'My Pre-Auction Activity',
  'Whitelist_Management' = 'Whitelist Management'
}

const tabsList = [TabListProp.My_Credentials, TabListProp.My_Pre_Auction_Activity, TabListProp.Whitelist_Management]

export default function AccountMyCredentials() {
  const isSm = useBreakpoint('sm')
  const [curTab, setCurTab] = useState(TabListProp.My_Pre_Auction_Activity)
  const { userInfo } = useUserInfo()

  return (
    <AccountLayout>
      <Box padding="40px 20px">
        <Container
          maxWidth="lg"
          sx={{
            position: 'relative'
          }}
        >
          <Typography variant="h3" fontSize={isSm ? 22 : 36} fontWeight={600} fontFamily={'Public Sans'}>
            My Pre-Auction Activity
          </Typography>
          <Box display="flex" alignItems={'center'} pt={'40px'}>
            <Box sx={{ position: 'relative', width: '120px' }}>
              {!userInfo?.avatar ? (
                <Skeleton variant="circular" width={120} height={120} sx={{ background: 'var(--ps-gray-50)' }} />
              ) : (
                <AccountAvatar src={userInfo?.avatar?.fileThumbnailUrl || userInfo?.avatar?.fileUrl} />
              )}
              {userInfo?.ifKyc && (
                <VerifiedIcon
                  ifKyc={userInfo.ifKyc}
                  width={42}
                  height={42}
                  sx={{ position: 'absolute', right: 0, bottom: 0 }}
                />
              )}
            </Box>
            <Stack sx={{ width: '100%', ml: 16 }} spacing={5}>
              <Stack direction={'row'} alignItems={'center'}>
                {!userInfo?.fullName && !userInfo?.fullNameId ? (
                  <Skeleton variant="rectangular" width={280} height={46} sx={{ background: 'var(--ps-gray-50)' }} />
                ) : (
                  <Stack direction={'row'} alignItems="center">
                    <Typography variant="h1" fontWeight={500}>
                      {userInfo?.fullName}
                    </Typography>
                    <Typography variant="body1" color="#2663FF" ml={10} sx={{ fontSize: 20 }}>
                      {userInfo?.fullNameId && `#${userInfo?.fullNameId}`}
                    </Typography>
                  </Stack>
                )}
              </Stack>
              {userInfo?.location && (
                <Box height={32}>
                  <Chip
                    sx={{
                      width: 84,
                      height: '100%'
                    }}
                    label={countries.getName(userInfo.location, 'en')}
                  />
                </Box>
              )}
              <Stack direction={'row'} alignItems="center" justifyContent="start" spacing={12}>
                <SocialMediaButtonGroup
                  showAll
                  email={userInfo?.contactEmail}
                  shouldShowEmailButton
                  twitter={userInfo?.twitter || userInfo?.twitterName}
                  instagram={userInfo?.instagram}
                  website={userInfo?.website}
                  // linkedin={userInfo?.linkedin}
                  discord={userInfo?.discord}
                  github={userInfo?.github}
                />
              </Stack>
            </Stack>
          </Box>
          <Box mt={40} mb={30}>
            <Stack direction={'row'} sx={{}}>
              <Stack
                direction="row"
                alignItems="center"
                sx={{
                  overflowX: 'scroll',
                  whiteSpace: 'nowrap',
                  '&::-webkit-scrollbar': {}
                }}
              >
                {tabsList?.map(item => {
                  return (
                    <Typography
                      variant="h4"
                      onClick={() => setCurTab(item)}
                      key={item}
                      sx={{
                        borderBottom: curTab === item ? '2px solid #121212' : 'none',
                        padding: isSm ? '12px 16px 36px' : '16px 32px 40px',
                        fontFamily: 'Inter',
                        cursor: 'pointer',
                        color: curTab === item ? '#121212' : '#959595'
                      }}
                    >
                      {item}
                    </Typography>
                  )
                })}
              </Stack>
            </Stack>
            <Box
              padding={isSm ? '16px' : '40px'}
              sx={{
                background: '#fff',
                borderRadius: '20px',
                mt: -24,
                position: 'relative'
              }}
            >
              <>
                {curTab === TabListProp.My_Credentials && <MyCredentialTab />}
                {curTab === TabListProp.My_Pre_Auction_Activity && <PreAuctionActivityTab />}
                {curTab === TabListProp.Whitelist_Management && <WhitelistAuctionTab />}
              </>
            </Box>
          </Box>
        </Container>
      </Box>
    </AccountLayout>
  )
}
